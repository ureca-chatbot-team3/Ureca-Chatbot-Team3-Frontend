import { useNavigate } from 'react-router-dom';
import diagnoseIcon from '../../../assets/images/diagnoseIcon.png';

export default function ChatbotNoticeBar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/diagnosis');
  };

  return (
    <div className="w-full h-[45px] bg-[#F5F8FF] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <span className="body-small font-500 inline-flex items-center gap-1 text-[var(--color-gray-700)]">
        요금제 뭘 해야 할지 모를 땐? 맞춤형 요금제 진단하러 가기
        <img
          src={diagnoseIcon}
          alt="아이콘"
          className="w-[23px] h-[23px] cursor-pointer"
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleClick();
          }}
          aria-label="맞춤형 요금제 진단 페이지로 이동"
        />
      </span>
    </div>
  );
}
