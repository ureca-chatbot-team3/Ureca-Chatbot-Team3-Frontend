import { useEffect, useState, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

import ChatbotMenuModal from './components/ChatbotMenuModal';
import ChatbotHeader from './components/ChatbotHeader';
import ChatbotToast from './components/ChatbotToast';
import ChatbotNoticeBar from './components/ChatbotNoticeBar';
import ChatbotInput from './components/ChatbotInput';
import ChatMessages from './components/ChatMessage';
import ChatbotQuickQuestionBubble from './components/ChatbotQuickQuestionBubble';

export default function ChatbotModal({ onClose }) {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [messages, setMessages] = useState([]);
  const [faqList, setFaqList] = useState([]);
  const socketRef = useRef(null);
  const sessionIdRef = useRef(null);
  const tempMessageIdRef = useRef(null);
  const tempContentRef = useRef('');

  const getOrCreateSessionId = () => {
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
      const allFaqs = res.data.faq || [];
      setFaqList(allFaqs);

      const shuffled = allFaqs.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 4).map((item) => item.question);

      const greetingMessage = {
        id: 'greeting',
        type: 'bot',
        content:
          '반가워요! 🦩 저는 요플랜의 AI 챗봇, 요플밍이에요.\n데이터, 통화, 예산까지 딱 맞는 요금제를 똑똑하게 찾아드릴게요.\n궁금한 걸 채팅창에 말씀해주세요! ✨',
        role: 'assistant',
      };

      const quickQuestionMessage = {
        id: 'quick-questions',
        type: 'bot',
        content: <ChatbotQuickQuestionBubble onSelect={handleQuickQuestion} questions={selected} />,
        role: 'assistant',
      };

      setMessages([greetingMessage, quickQuestionMessage]);
    } catch (err) {
      console.error('❌ FAQ 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    setIsVisible(true);
    const sessionId = getOrCreateSessionId();
    sessionIdRef.current = sessionId;

    axios
      .get(`/api/conversations/${sessionId}`)
      .then((res) => {
        const loadedMessages = (res.data.messages || []).map((msg) => ({
          id: msg._id,
          type: msg.role === 'user' ? 'user' : 'bot',
          content: msg.content,
          timestamp: msg.timestamp,
          role: msg.role,
        }));

        if (loadedMessages.length === 0) {
          initializeGreetingAndFAQ();
        } else {
          setMessages(loadedMessages);
        }
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          console.log('404 오류: 첫 대화시 DB에서 가져올 내용이 없어서 나오는 오류');
          initializeGreetingAndFAQ();
        } else {
          console.warn('대화 불러오기 실패:', err.message);
        }
      });

    const newSocket = io('http://localhost:5000', {
      query: { sessionId },
    });

    socketRef.current = newSocket;

    newSocket.on('connect', () => {
      console.log('✅ 소켓 연결됨:', newSocket.id);
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

    const toastTimer = setTimeout(() => setShowToast(true), 400);
    const hideToast = setTimeout(() => setShowToast(false), 3400);

    return () => {
      clearTimeout(toastTimer);
      clearTimeout(hideToast);
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = useCallback((text) => {
    const userMsg = { type: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);

    if (socketRef.current?.connected) {
      socketRef.current.emit('user-message', text);
    } else {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', content: '❌ 소켓 연결이 안 되어 있어요. 다시 시도해주세요.' },
      ]);
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

  // 대화 초기화 함수 (세션 삭제 및 상태 초기화)
  const clearConversation = async () => {
    try {
      const sessionId = sessionIdRef.current;
      if (!sessionId) return;

      // 서버에 대화 삭제 요청
      await axios.delete(`/api/conversations/${sessionId}`);

      // 상태 초기화
      setMessages([]);
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
              onClearConversation={clearConversation} // 초기화 함수 전달
            />
          )}
          <ChatbotToast visible={showToast} />
          <ChatbotHeader onClose={handleClose} onOpenMenu={() => setShowMenu(true)} />
          <ChatbotNoticeBar />
          <ChatMessages messages={messages} />
          <ChatbotInput message={message} setMessage={setMessage} onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}
