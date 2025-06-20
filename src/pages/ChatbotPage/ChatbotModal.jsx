import { useEffect, useState } from 'react';
import ChatbotMenuModal from './components/ChatbotMenuModal';
import ChatbotHeader from './components/ChatbotHeader';
import ChatbotToast from './components/ChatbotToast';
import ChatbotNoticeBar from './components/ChatbotNoticeBar';
import ChatbotInput from './components/ChatbotInput';
import ChatMessages from './components/ChatMessage';
import ChatbotQuickQuestionBubble from './components/ChatbotQuickQuestionBubble';
import axios from 'axios';

export default function ChatbotModal({ onClose }) {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [messages, setMessages] = useState([]);
  const [faqList, setFaqList] = useState([]);

  useEffect(() => {
    setIsVisible(true);

    const toastTimer = setTimeout(() => setShowToast(true), 400);
    const hideToast = setTimeout(() => setShowToast(false), 3400);

    const fetchFAQ = async () => {
      try {
        const res = await axios.get('/api/faq');
        const allFaqs = res.data.faq || [];

        const shuffled = allFaqs.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4).map((item) => item.question);
        console.log('✅ 추출된 추천 질문:', selected);
        setFaqList(allFaqs);

        setMessages([
          {
            type: 'bot',
            content: `반가워요! 🦩 저는 요플랜의 AI 챗봇, 요플밍이에요.\n데이터, 통화, 예산까지 딱 맞는 요금제를 똑똑하게 찾아드릴게요.\n궁금한 걸 채팅창에 말씀해주세요! ✨`,
          },
          {
            type: 'bot',
            content: (
              <ChatbotQuickQuestionBubble onSelect={handleQuickQuestion} questions={selected} />
            ),
          },
        ]);
      } catch (err) {
        console.error('❌ FAQ 불러오기 실패:', err);
      }
    };

    fetchFAQ();

    return () => {
      clearTimeout(toastTimer);
      clearTimeout(hideToast);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const handleQuickQuestion = (text) => {
    sendMessage(text);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message.trim());
  };

  const sendMessage = async (text) => {
    const userMsg = { type: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);

    // ✅ 소문자 기준으로 비교 (FAQ 매칭 강화)
    const normalizedText = text.trim().toLowerCase();
    const match = faqList.find((item) => item.question.trim().toLowerCase() === normalizedText);

    if (match) {
      setMessages((prev) => [...prev, { type: 'bot', content: match.answer }]);
      return;
    }

    // OpenAI API 호출 (비FAQ 질문)
    const loadingMsg = {
      type: 'bot',
      content: '요플밍이 생각 중이에요... 🤔',
      isLoading: true,
    };
    setMessages((prev) => [...prev, loadingMsg]);
    setMessage('');

    try {
      const res = await axios.post('/api/chat', { message: text });
      const reply = res.data.reply;

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop(); // 로딩 제거
        return [...updated, { type: 'bot', content: reply }];
      });
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
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
            w-[360px] max-h-[90vh] h-full
            bg-[var(--color-gray-200)] border-[3px] border-[var(--color-gray-700)]
            rounded-[20px] shadow-xl pointer-events-auto
            overflow-hidden flex flex-col
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
          <ChatMessages messages={messages} />

          <ChatbotInput message={message} setMessage={setMessage} onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}
