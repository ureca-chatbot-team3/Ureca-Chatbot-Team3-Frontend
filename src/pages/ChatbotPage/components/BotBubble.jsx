import chatbotImg from '../../../assets/images/chatbotImg.png';

export default function BotBubble({ message, isLoading }) {
  return (
    <div className="flex items-start gap-2">
      {/* 캐릭터 아이콘 */}
      <img
        src={chatbotImg}
        alt="플밍이"
        className="w-[28px] h-[28px] mt-1 shrink-0"
      />

      {/* 이름 + 말풍선 그룹을 캐릭터보다 약간 아래로 */}
      <div className="flex flex-col mt-1.5">
        {/* 이름 */}
        <span className="text-[12px] text-[#666] font-500 mb-1">
          상담사 요플밍
        </span>

        {/* 말풍선 */}
        <div
          className="
            bg-white text-[14px] text-[#333] font-500
            shadow-[0_0_6px_rgba(0,0,0,0.08)]
            rounded-br-[16px] rounded-bl-[16px] rounded-tr-[16px]
            px-4 py-3 max-w-[80%] w-fit whitespace-pre-line  min-w-[200px]
          "
          style={{ borderTopLeftRadius: 0 }}
        >
       {isLoading ? (
  <div className="flex items-center gap-2 text-sm">
    <span className="whitespace-nowrap">플밍이가 생각 중이에요</span>

    <div className="flex gap-[4px] h-[8px]">
      <span className="w-[8px] h-[8px] bg-[var(--color-pink-700)] rounded-full animate-blink" />
      <span className="w-[8px] h-[8px] bg-[var(--color-pink-700)] rounded-full animate-blink animate-blink-delay-200" />
      <span className="w-[8px] h-[8px] bg-[var(--color-pink-700)] rounded-full animate-blink animate-blink-delay-400" />
    </div>
  </div>
) : (
  message
)}




        </div>
      </div>
    </div>
  );
}

