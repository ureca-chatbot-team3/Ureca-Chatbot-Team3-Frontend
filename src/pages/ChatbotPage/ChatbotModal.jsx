import { useEffect, useState } from 'react';
import ChatbotMenuModal from './components/ChatbotMenuModal';
import ChatbotHeader from './components/ChatbotHeader';
import ChatbotToast from './components/ChatbotToast';
import ChatbotNoticeBar from './components/ChatbotNoticeBar';
import ChatbotInput from './components/ChatbotInput';
import ChatMessages from './components/ChatMessage';
import axios from 'axios';

export default function ChatbotModal({ onClose }) {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setIsVisible(true);

    const toastTimer = setTimeout(() => setShowToast(true), 400);
    const hideToast = setTimeout(() => setShowToast(false), 3400);

    setMessages([
      {
        type: 'bot',
        content:
          '반가워요! 🦩 저는 요플랜의 AI 챗봇, 요플밍이에요.\n데이터, 통화, 예산까지 딱 맞는 요금제를 똑똑하게 찾아드릴게요.\n궁금한 걸 채팅창에 말씀해주세요! ✨',
      },
    ]);

    return () => {
      clearTimeout(toastTimer);
      clearTimeout(hideToast);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = { type: 'user', content: message.trim() };
    const loadingMsg = { type: 'bot', content: '요플밍이 생각 중이에요... 🤔', isLoading: true };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setMessage('');

    try {
      const res = await axios.post('/api/chat', { message });
      const reply = res.data.reply;

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop(); // 로딩 메시지 제거
        return [...updated, { type: 'bot', content: reply }];
      });
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop(); // 로딩 메시지 제거
        return [...updated, { type: 'bot', content: '죄송해요, 지금은 응답할 수 없어요 😢' }];
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto" onClick={handleClose}>
      <div className="max-w-[1440px] w-full h-full mx-auto relative">
        <div
          className={`
            absolute right-8 top-1/2 -translate-y-1/2
            w-[360px] h-[884px]
            bg-[var(--color-gray-200)] border-[3px] border-[var(--color-gray-700)] rounded-[20px]
            shadow-xl pointer-events-auto
            transition-all duration-300 ease-in-out
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {showMenu && (
            <div className="absolute top-0 left-0 w-full z-50">
              <ChatbotMenuModal onClose={() => setShowMenu(false)} />
            </div>
          )}

          <ChatbotToast visible={showToast} />
          <ChatbotHeader onClose={handleClose} onOpenMenu={() => setShowMenu(true)} />
          <ChatbotNoticeBar />

          {/* 메시지 영역 */}
          <ChatMessages messages={messages} />

          {/* 입력창 */}
          <ChatbotInput
            message={message}
            setMessage={setMessage}
            onSend={handleSend}
          />
        </div>
      </div>
    </div>
  );
}
