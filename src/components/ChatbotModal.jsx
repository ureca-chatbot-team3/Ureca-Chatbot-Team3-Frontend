import sendIcon from '../assets/send-icon.png';
import menuIcon from '../assets/menu-icon.png';

export default function ChatbotModal({ onClose }) {
  return (
    // 배경 클릭 시 닫힘
    <div
      className="fixed inset-0 z-50 pointer-events-auto"
      onClick={onClose}
    >
      <div className="max-w-[1440px] w-full h-full mx-auto relative">
        {/* 모달 본체 */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2
                     w-[360px] h-[900px] bg-[#F8F9FA] border-[3px] border-[#6B6B6B]
                     rounded-[20px] shadow-xl pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between px-4 py-3 relative">
            {/* 닫기 버튼 (왼쪽) */}
            <button
              onClick={onClose}
              className="text-xl font-bold"
            >
              ✕
            </button>

            {/* 가운데 타이틀 */}
            <div className="absolute left-1/2 -translate-x-1/2 text-base font-semibold">
              요플랜 상담챗봇
            </div>

            {/* 햄버거 메뉴 (오른쪽) */}
            <button>
              <img
                src={menuIcon}
                alt="메뉴"
                className="w-6 h-6"
              />
            </button>
          </div>
  <div className="w-full h-[45px] bg-[#F5F8FF] shadow-[0_2px_8px_rgba(0,0,0,0.08)]" />

          {/* 본문 콘텐츠 영역 */}
          <div className="p-4">
            <p className="text-sm text-gray-600">무엇을 도와드릴까요?</p>
            {/* 추후 대화 내용, 입력창 등 여기에 배치 */}
          </div>

          {/* 전송 버튼 (고정 위치) */}
          <img
            src={sendIcon}
            alt="전송"
            className="absolute w-[43px] h-[43px] bottom-[13px] right-[22px] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
