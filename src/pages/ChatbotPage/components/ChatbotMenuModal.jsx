import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../../assets/svg/backIcon.svg';

export default function ChatbotMenuModal({ onClose, onClearConversation }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const handleClearConversation = () => {
    if (window.confirm('대화를 초기화하시겠습니까? 이전 대화 내용은 복구할 수 없습니다.')) {
      onClearConversation();
      handleClose();
    }
  };

  const handleGoToGuide = () => {
    navigate('/chatbotGuide');
    handleClose();
  };

  return (
    <div
      className={`
        absolute top-0 left-0 w-full h-full z-50 flex justify-end
        transition-all duration-300 ease-in-out
        ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
      `}
    >
      <div
        className="w-[360px] h-[431px] bg-[var(--color-white)] border-[3px] border-[var(--color-gray-700)] rounded-[20px] shadow-soft-black relative px-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="absolute top-[35px] left-[25px] cursor-pointer"
          aria-label="뒤로가기"
        >
          <img src={backIcon} alt="뒤로가기" className="w-4 h-4" />
        </button>

        {/* 타이틀 */}
        <div className="absolute top-[24px] left-1/2 -translate-x-1/2 heading-2 font-700 text-[var(--color-black)]">
          챗봇 메뉴
        </div>

        {/* 메뉴 항목 */}
        <ul className="mt-24 heading-3 font-500 text-[var(--color-black)] divide-y divide-[var(--color-gray-500)]">
          <li className="py-5 cursor-pointer" onClick={handleGoToGuide}>
            사용법 안내 및 주의사항
          </li>
          <li className="py-5">챗봇 상담 내역</li>
          <li className="py-5">이전 질문에서 찾아보기</li>
          <li
            className="py-5 cursor-pointer hover:text-red-600 transition-colors duration-200"
            onClick={handleClearConversation}
          >
            대화 초기화
          </li>
        </ul>
      </div>
    </div>
  );
}
