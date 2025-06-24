import sendIcon from '../../../assets/images/send-icon.png';
import sendIconWhite from '../../../assets/images/sendIconWhite.png';

export default function ChatbotInput({ message, setMessage, onSend }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSend();
  };

  return (
    <div className="absolute bottom-0 left-0 w-full h-[66px] bg-[var(--color-white)] rounded-b-[20px] flex items-center justify-center px-4">
      <div className="w-[324px] h-[40px] bg-[var(--color-gray-400)] rounded-[16px] px-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="메세지를 입력하세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none font-500 body-medium text-[var(--color-black)] placeholder-[var(--color-gray-700)]"
        />
        <img
          src={message.trim() ? sendIcon : sendIconWhite}
          alt="전송"
          onClick={onSend}
          className="w-[43px] h-[43px] ml-2 cursor-pointer transition duration-200"
        />
      </div>
    </div>
  );
}
