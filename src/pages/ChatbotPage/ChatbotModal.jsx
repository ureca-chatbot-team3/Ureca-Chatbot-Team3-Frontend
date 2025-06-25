import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

import ChatbotMenuModal from './components/ChatbotMenuModal';
import ChatbotHeader from './components/ChatbotHeader';
import ChatbotToast from './components/ChatbotToast';
import ChatbotNoticeBar from './components/ChatbotNoticeBar';
import ChatbotInput from './components/ChatbotInput';
import ChatMessages from './components/ChatMessage';
import ChatbotQuickQuestionBubble from './components/ChatbotQuickQuestionBubble';
import { getRedirectResponse } from './utils/chatbotRedirectHelper';
import { getSocket, resetSocket } from '../../utils/socket';
import { extractPlanNamesFromText } from './utils/extractPlanNames';

export default function ChatbotModal({ onClose }) {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [messages, setMessages] = useState([]);
  const [faqList, setFaqList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [nickname, setNickname] = useState('');
  const [isChatEnded, setIsChatEnded] = useState(false);

  const sessionIdRef = useRef(null);
  const tempMessageIdRef = useRef(null);
  const tempContentRef = useRef('');
  const initializedRef = useRef(false);
  const socketRef = useRef(null);

  const getGreetingText = () => {
    return nickname
      ? `반가워요, ${nickname}님! 🦩\n저는 요플랜의 AI 챗봇, 요플밍이에요.\n데이터, 통화, 예산까지 딱 맞는 요금제를 똑똑하게 찾아드릴게요.\n궁금한 걸 채팅창에 말씀해주세요! ✨`
      : `반가워요! 🦩 저는 요플랜의 AI 챗봇, 요플밍이에요.\n데이터, 통화, 예산까지 딱 맞는 요금제를 똑똑하게 찾아드릴게요.\n궁금한 걸 채팅창에 말씀해주세요! ✨ \n 저희 플랫폼은 로그인 후 서비스를 이용하시기를 권장드립니다!`;
  };

  const handleResetMessages = () => {
    socketRef.current?.emit('force-end-session');
    setMessages([]);
    initializeGreetingAndFAQ();
    setIsChatEnded(false);
  };

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
      const res = await axios.get('/api/faq');
      const allFaqs = res.data || [];
      setFaqList(allFaqs);

      const shuffled = allFaqs.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 4);

      setMessages([
        {
          id: 'greeting',
          type: 'bot',
          role: 'assistant',
          content: getGreetingText(),
        },
        {
          id: 'faq-recommend',
          type: 'faq-recommend',
          role: 'assistant',
          content: selected,
        },
      ]);

      setIsChatEnded(false);
    } catch (err) {
      console.error('❌ 초기 인사말 구성 실패:', err);
    }
  };

  useEffect(() => {
    const lastMsg = messages.at(-1);
    if (
      (lastMsg?.role === 'system' || lastMsg?.type === 'notice') &&
      typeof lastMsg.content === 'string' &&
      lastMsg.content.includes('대화는 종료되었습니다')
    ) {
      setIsChatEnded(true);
    } else {
      setIsChatEnded(false);
    }
  }, [messages]);

  useEffect(() => {
    setIsVisible(true);
    let tempUserId = null;

    const fetchUserAndConnectSocket = async () => {
      try {
        const profileRes = await axios.get('/api/auth/profile', { withCredentials: true });
        tempUserId = profileRes.data?.data?._id || null;
        setUserId(tempUserId);
        setNickname(profileRes.data?.data?.nickname || '');
      } catch (e) {}

      const sessionId = getOrCreateSessionId(tempUserId);
      sessionIdRef.current = sessionId;

      const socket = getSocket(sessionId, tempUserId);
      socketRef.current = socket;

      socket.off('stream-start');
      socket.off('stream-chunk');
      socket.off('stream-end');
      socket.off('error');

      socket.on('stream-start', ({ messageId }) => {
        tempMessageIdRef.current = messageId;
        tempContentRef.current = '';
        setMessages((prev) => [
          ...prev,
          { id: messageId, type: 'bot', content: '', isLoading: true },
        ]);
      });

      socket.on('stream-chunk', (chunk) => {
        tempContentRef.current += chunk;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempMessageIdRef.current ? { ...msg, content: tempContentRef.current } : msg
          )
        );
      });

      socket.on('stream-end', async ({ message }) => {
        const finalMessage = {
          ...(message || { content: '응답을 완료했어요.' }),
          id: message?.id || tempMessageIdRef.current,
          type: message?.role === 'assistant' ? 'bot' : 'user',
          role: message?.role || 'assistant',
          isLoading: false,
        };

        if (typeof finalMessage.content !== 'string') {
          console.warn('❌ AI 응답 content가 문자열이 아님:', finalMessage.content);
          finalMessage.content = '⚠️ 알 수 없는 응답 형식입니다.';
        }

        setMessages((prev) => prev.map((msg) => (msg.id === finalMessage.id ? finalMessage : msg)));

        const matchedPlans = await extractPlanNamesFromText(finalMessage.content);
        if (matchedPlans.length > 0) {
          const alreadyHasSamePlans = messages.some(
            (msg) =>
              msg.type === 'plans' && JSON.stringify(msg.content) === JSON.stringify(matchedPlans)
          );
        }

        tempMessageIdRef.current = null;
        tempContentRef.current = '';
      });

      socket.on('error', ({ message }) => {
        setMessages((prev) => [...prev, { type: 'bot', content: `❌ 오류: ${message}` }]);
      });

      try {
        const res = tempUserId
          ? await axios.get(`/api/conversations?userId=${tempUserId}`)
          : await axios.get(`/api/conversations/${sessionId}`);

        const loadedMessages = (res.data.messages || [])
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
          .map((msg) => ({
            id: msg._id,
            type: msg.type || (msg.role === 'user' ? 'user' : 'bot'),
            content: msg.content,
            timestamp: msg.timestamp,
            role: msg.role,
            label: msg.label || null,
            route: msg.route || null,
          }));

        if (loadedMessages.length === 0 && !initializedRef.current) {
          initializedRef.current = true;
          initializeGreetingAndFAQ();
        } else {
          setMessages(loadedMessages);
        }
      } catch (err) {
        if (err.response?.status === 404 && !initializedRef.current) {
          initializedRef.current = true;
          initializeGreetingAndFAQ();
        } else {
          console.warn('대화 불러오기 실패:', err.message);
        }
      }
    };

    fetchUserAndConnectSocket();

    const toastTimer = setTimeout(() => setShowToast(true), 400);
    const hideToast = setTimeout(() => setShowToast(false), 3400);

    return () => {
      clearTimeout(toastTimer);
      clearTimeout(hideToast);

      const socket = socketRef.current;
      if (socket) {
        socket.off('stream-start');
        socket.off('stream-chunk');
        socket.off('stream-end');
        socket.off('error');
      }

      resetSocket();
    };
  }, []);

  const sendMessage = useCallback((text) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    socketRef.current?.emit('force-end');

    setMessages((prev) =>
      prev.map((msg) =>
        msg.isLoading
          ? { ...msg, isLoading: false, content: msg.content + '❗요청이 중단되었어요.' }
          : msg
      )
    );

    const userMsg = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: trimmedText,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage('');

    const redirectMsg = getRedirectResponse(trimmedText);
    if (redirectMsg) {
      const redirectId = `redirect-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: redirectId,
          type: 'redirect',
          role: 'assistant',
          content: redirectMsg.content,
          label: redirectMsg.label,
          route: redirectMsg.route,
        },
      ]);

      socketRef.current?.emit('stream-end', {
        message: {
          role: 'assistant',
          content: redirectMsg.content,
          type: 'redirect',
          label: redirectMsg.label,
          route: redirectMsg.route,
        },
        userMessage: userMsg,
      });

      return;
    }

    if (socketRef.current?.connected) {
      socketRef.current.emit('user-message', trimmedText);
    } else {
      setMessages((prev) => [...prev, { type: 'bot', content: '❌ 소켓 연결이 안 되어 있어요.' }]);
    }
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
      const params = userId ? { userId } : { sessionId };
      await axios.delete('/api/conversations', { params });
      setMessages([]);
      setIsChatEnded(false);
      initializeGreetingAndFAQ();
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
          <ChatMessages
            messages={messages}
            onQuickQuestionSelect={handleQuickQuestion}
            onResetMessages={handleResetMessages}
          />
          <ChatbotInput
            message={message}
            setMessage={setMessage}
            onSend={handleSend}
            disabled={isChatEnded}
          />
        </div>
      </div>
    </div>
  );
}
