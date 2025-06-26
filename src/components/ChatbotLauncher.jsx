import flamingo from '../assets/images/chatbot.gif';
import { useChatbotContext } from '../hooks/useChatbotContext';

export default function ChatbotLauncher({ onClick }) {
  const { isArrowVisible } = useChatbotContext();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 pointer-events-none">
      <div className="max-w-[1440px] mx-auto relative h-0">
        {/* 챗봇 버튼 */}
        <button
          onClick={onClick}
          className="absolute bottom-8 right-8 w-[61px] h-[61px] shadow-[0_0_4px_rgba(0,0,0,0.25)] flex items-center justify-center rounded-full pointer-events-auto cursor-pointer bg-white"
        >
          <img
            src={flamingo}
            alt="플밍이 GIF"
            className="w-[61px] h-[61px] object-contain pointer-events-none border border-white rounded-full"
          />
        </button>

        {/* 말풍선 */}
        {isArrowVisible && (
          <div className="animate-bounce absolute body-small right-0 bottom-27 bg-white border border-pink-700 text-pink-700 text-sm px-3 py-2 rounded-lg text-center">
            도움이 필요하시면 <br /> 요플밍을 눌러주세요!
            {/* 말풍선 꼬리 */}
            <div
              className="absolute left-1/2 -bottom-[9px] w-0 h-0
  border-l-[8px] border-r-[8px] border-t-[9px]
  border-l-transparent border-r-transparent border-t-pink-700
  transform -translate-x-1/2 z-0"
            />
            <div
              className="absolute left-1/2 -bottom-2 w-0 h-0
  border-l-[7px] border-r-[7px] border-t-[9px]
  border-l-transparent border-r-transparent border-t-white
  transform -translate-x-1/2 z-10"
            />
          </div>
        )}
      </div>
    </div>
  );
}
