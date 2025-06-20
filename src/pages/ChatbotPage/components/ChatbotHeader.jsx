import xIcon from '../../../assets/svg/xIcon.svg';
import menuIcon from '../../../assets/svg/menuIcon.svg';

export default function ChatbotHeader({ onClose, onOpenMenu }) {
  return (
    <div className="flex items-center justify-between px-4 h-[66px] bg-[var(--color-white)] rounded-t-[20px]">
      <button
        onClick={onClose}
        className="w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
      >
        <img src={xIcon} alt="닫기" className="w-[16px] h-[16px] mt-[1px]" />
      </button>
      <div className="heading-3 font-700 text-center">요플랜 상담챗봇</div>
      <button
        onClick={onOpenMenu}
        className="w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
      >
        <img src={menuIcon} alt="메뉴" className="w-6 h-6" />
      </button>
    </div>
  );
}
