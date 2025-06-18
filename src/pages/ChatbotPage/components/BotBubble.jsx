import chatbotImg from '../../../assets/images/chatbotImg.png';

export default function BotBubble({ message }) {
  return (
    <div className="flex items-start gap-2">
      {/* 캐릭터 아이콘 */}
      <img
        src={chatbotImg}
        alt="플밍이"
        className="w-[28px] h-[28px] mt-1 shrink-0"
      />
      
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
            px-4 py-3
            min-w-[60px] max-w-[260px]
            whitespace-pre-line break-words
          "
          style={{ borderTopLeftRadius: 0 }}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
