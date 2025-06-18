import checkIcon from '../../../assets/images/checkIcon.png';

export default function ChatbotToast({ visible }) {
  return (
    <div
      className={`
        absolute bottom-[80px] left-1/2 -translate-x-1/2 w-[323px] h-[33.83px]
        bg-[rgba(51,51,51,0.83)] rounded-[16px] shadow-[0_2px_2px_rgba(0,0,0,0.08)]
        flex items-center px-4 z-40 transition-all duration-500 ease-in-out
        ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'}
      `}
    >
      <img src={checkIcon} alt="확인" className="w-5 h-5 mr-2" />
      <span className="text-white text-[10px] font-500 leading-[35px]">
        주민등록번호, 전화번호 등 개인정보를 입력하지 마세요.
      </span>
    </div>
  );
}
