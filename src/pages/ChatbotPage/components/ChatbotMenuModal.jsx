import { useEffect, useState } from 'react';
import backIcon from '../../../assets/svg/backIcon.svg';

export default function ChatbotMenuModal({ onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(), 300);
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
        className="w-[360px] h-[431px] bg-[var(--color-white)] border-[3px] border-[var(--color-gray-700)]
                   rounded-[20px] shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="absolute top-[35px] left-[25px]"
          aria-label="뒤로가기"
        >
          <img src={backIcon} alt="뒤로가기" className="w-4 h-4" />
        </button>

        {/* 타이틀 */}
        <div className="absolute top-[24px] left-1/2 -translate-x-1/2 heading-2 font-700 text-[var(--color-black)]">
          챗봇 메뉴
        </div>

        {/* 메뉴 항목 */}
        <ul className="absolute top-[110px] left-[25px] space-y-[22px] text-[20px] font-500 text-[var(--color-black)]">
          <li>사용법 안내 및 주의사항</li>
          <li>챗봇 상담 내역</li>
          <li>이전 질문에서 찾아보기</li>
          <li>대화 초기화</li>
        </ul>

        {/* 구분선 */}
        <div className="absolute left-[25px] top-[150px] w-[310px] border-t border-[var(--color-gray-500)]" />
        <div className="absolute left-[25px] top-[203px] w-[310px] border-t border-[var(--color-gray-500)]" />
        <div className="absolute left-[25px] top-[257px] w-[310px] border-t border-[var(--color-gray-500)]" />
      </div>
    </div>
  );
}
