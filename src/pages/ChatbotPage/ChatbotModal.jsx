import { useEffect, useState, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';

import ChatbotMenuModal from './components/ChatbotMenuModal';
import ChatbotHeader from './components/ChatbotHeader';
import ChatbotToast from './components/ChatbotToast';
import ChatbotNoticeBar from './components/ChatbotNoticeBar';
import ChatbotInput from './components/ChatbotInput';
import ChatMessages from './components/ChatMessage';
import ChatbotQuickQuestionBubble from './components/ChatbotQuickQuestionBubble';

// 환경변수에서 API URL 가져오기
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const SOCKET_URL = API_BASE_URL.replace('/api', ''); // /api 제거

export default function ChatbotModal({ onClose }) {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [messages, setMessages] = useState([]);
  const [faqList, setFaqList] = useState([]);
  const [userId, setUserId] = useState(null);

  const socketRef = useRef(null);
  const sessionIdRef = useRef(null);
  const tempMessageIdRef = useRef(null);
  const tempContentRef = useRef('');
  const initializedRef = useRef(false);

  const getOrCreateSessionId = (userId) => {
    if (userId) return `user_${userId}`;
    let sessionId = localStorage.getItem('chat-session-id');
    if (!sessionId) {
      sessionId = 'client_' + Date.now();
      localStorage.setItem('chat-session-id', sessionId);
    }
    return sessionId;
  };

  const initializeGreetingAndFAQ = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/faq`, {
        credentials: 'include',
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const allFaqs = data.data || [];
      setFaqList(allFaqs);

      const shuffled = allFaqs.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 4);

      let nickname = '';
      try {
        const profileResponse = await fetch(`${API_BASE_URL}/auth/profile`, {
          credentials: 'include',
        });
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          nickname = profileData.data?.nickname || '';
        }
      } catch (e) {}

      const greetingText = nickname
        ? `반가워요, ${nickname}님! 🤹\n저는 요플랜의 AI 챗봇, 요플밍이에요.\n데이터, 통화, 예산까지 딱 맞는 요금제를 똑똑하게 찾아드릴게요.\n궁금한 걸 채팅창에 말씀해주세요! ✨`
        : `반가워요! 🤹 저는 요플랜의 AI 챗봇, 요플밍이에요.\n데이터, 통화, 예산까지 딱 맞는 요금제를 똑똑하게 찾아드릴게요.\n궁금한 걸 채팅창에 말씀해주세요! ✨`;

      const quickText = `이런 질문은 어떠세요?\n- ${selected.join('\n- ')}`;

      await new Promise((res) => {
        socketRef.current?.emit('stream-start', { role: 'assistant', content: greetingText });
        socketRef.current?.emit('stream-end', {});
        setTimeout(res, 300);
      });

      socketRef.current?.emit('stream-start', { role: 'assistant', content: quickText });
      socketRef.current?.emit('stream-end', {});

      setMessages([
        { id: 'greeting', type: 'bot', content: greetingText, role: 'assistant' },
        {
          id: 'quick-questions',
          type: 'bot',
          content: (
            <ChatbotQuickQuestionBubble onSelect={handleQuickQuestion} questions={selected} />
          ),
          role: 'assistant',
        },
      ]);
    } catch (err) {
      console.error('❌ 초기 인사말 구성 실패:', err);
    }
  };

  useEffect(() => {
    setIsVisible(true);
    let tempUserId = null;

    const fetchUserAndConnectSocket = async () => {
      try {
        const profileResponse = await fetch(`${API_BASE_URL}/auth/profile`, {
          credentials: 'include',
        });
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          tempUserId = profileData.data?._id || null;
          setUserId(tempUserId);
        }
      } catch (e) {}

      const sessionId = getOrCreateSessionId(tempUserId);
      sessionIdRef.current = sessionId;

      console.log('✅ userId:', tempUserId);
      console.log('✅ sessionId:', sessionId);

      const newSocket = io(SOCKET_URL, {
        query: { sessionId, userId: tempUserId || undefined },
      });

      socketRef.current = newSocket;

      newSocket.on('connect', () => {
        console.log('✅ 소켓 연결됨:', newSocket.id);
        if (tempUserId) {
          newSocket.emit('authenticate', { userId: tempUserId });
        }
      });

      newSocket.on('disconnect', () => {
        console.log('❌ 소켓 연결 끊김');
      });

      newSocket.on('stream-start', ({ messageId }) => {
        tempMessageIdRef.current = messageId;
        tempContentRef.current = '';
        setMessages((prev) => [
          ...prev,
          { id: messageId, type: 'bot', content: '', isLoading: true },
        ]);
      });

      newSocket.on('stream-chunk', (chunk) => {
        tempContentRef.current += chunk;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempMessageIdRef.current ? { ...msg, content: tempContentRef.current } : msg
          )
        );
      });

      newSocket.on('stream-end', ({ message }) => {
        const finalMessage = {
          ...(message || { content: '응답을 완료했어요.' }),
          id: message?.id || tempMessageIdRef.current,
          type: message?.role === 'assistant' ? 'bot' : 'user',
          isLoading: false,
        };
        setMessages((prev) => prev.map((msg) => (msg.id === finalMessage.id ? finalMessage : msg)));

        tempMessageIdRef.current = null;
        tempContentRef.current = '';
      });

      newSocket.on('error', ({ message }) => {
        setMessages((prev) => [...prev, { type: 'bot', content: `❌ 오류: ${message}` }]);
      });

      try {
        const url = tempUserId
          ? `${API_BASE_URL}/conversations?userId=${tempUserId}`
          : `${API_BASE_URL}/conversations/${sessionId}`;

        const response = await fetch(url, { credentials: 'include' });

        if (response.ok) {
          const data = await response.json();
          const loadedMessages = (data.messages || [])
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
            .map((msg) => ({
              id: msg._id,
              type: msg.role === 'user' ? 'user' : 'bot',
              content: msg.content,
              timestamp: msg.timestamp,
              role: msg.role,
            }));

          if (loadedMessages.length === 0 && !initializedRef.current) {
            initializedRef.current = true;
            initializeGreetingAndFAQ();
          } else {
            setMessages(loadedMessages);
          }
        } else if (response.status === 404 && !initializedRef.current) {
          initializedRef.current = true;
          initializeGreetingAndFAQ();
        }
      } catch (err) {
        console.warn('대화 불러오기 실패:', err.message);
        if (!initializedRef.current) {
          initializedRef.current = true;
          initializeGreetingAndFAQ();
        }
      }
    };

    fetchUserAndConnectSocket();

    const toastTimer = setTimeout(() => setShowToast(true), 400);
    const hideToast = setTimeout(() => setShowToast(false), 3400);

    return () => {
      clearTimeout(toastTimer);
      clearTimeout(hideToast);
      socketRef.current?.disconnect();
    };
  }, []);

  const sendMessage = useCallback((text) => {
    const userMsg = { type: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);

    if (socketRef.current?.connected) {
      socketRef.current.emit('user-message', text);
    } else {
      setMessages((prev) => [...prev, { type: 'bot', content: '❌ 소켓 연결이 안 되어 있어요.' }]);
    }

    setMessage('');
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message.trim());
  };

  const handleQuickQuestion = useCallback(
    (text) => {
      sendMessage(text.trim());
    },
    [sendMessage]
  );

  const clearConversation = async () => {
    try {
      const sessionId = sessionIdRef.current;
      const url = userId
        ? `${API_BASE_URL}/conversations?userId=${userId}`
        : `${API_BASE_URL}/conversations?sessionId=${sessionId}`;

      const response = await fetch(url, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setMessages([]);
        initializeGreetingAndFAQ();
      }
    } catch (err) {
      console.error('❌ 대화 초기화 실패:', err);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto" onClick={handleClose}>
      <div className="max-w-[1440px] w-full h-full mx-auto relative">
        <div
          className={`absolute right-8 top-1/2 -translate-y-1/2
            w-[360px] max-h-[90vh] h-full
            bg-[var(--color-gray-200)] border-[3px] border-[var(--color-gray-700)]
            rounded-[20px] shadow-xl pointer-events-auto
            overflow-hidden flex flex-col
            transition-all duration-300 ease-in-out
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {showMenu && (
            <ChatbotMenuModal
              onClose={() => setShowMenu(false)}
              onClearConversation={clearConversation}
            />
          )}
          <ChatbotToast visible={showToast} />
          <ChatbotHeader onClose={handleClose} onOpenMenu={() => setShowMenu(true)} />
          <ChatbotNoticeBar />
          <ChatMessages messages={messages} onQuickQuestionSelect={handleQuickQuestion} />
          <ChatbotInput message={message} setMessage={setMessage} onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}
