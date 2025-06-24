import sendIcon from '../../../assets/images/send-icon.png';
import sendIconWhite from '../../../assets/images/sendIconWhite.png';

export default function ChatbotInput({ message, setMessage, onSend, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !disabled) onSend();
  };

  const handleClick = () => {
    if (!disabled) onSend();
  };

  return (
    <div className="absolute bottom-0 left-0 w-full h-[66px] bg-[var(--color-white)] rounded-b-[20px] flex items-center justify-center px-4">
      <div
        className={`w-[324px] h-[40px] px-4 flex items-center justify-between rounded-[16px] ${
          disabled ? 'bg-[var(--color-gray-300)] cursor-not-allowed' : 'bg-[var(--color-gray-400)]'
        }`}
      >
        <input
          type="text"
          placeholder={disabled ? '대화가 종료되어 입력할 수 없습니다.' : '메세지를 입력하세요.'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`flex-1 bg-transparent outline-none font-500 body-medium ${
            disabled ? 'text-gray-400' : 'text-[var(--color-black)]'
          } placeholder-[var(--color-gray-700)]`}
        />
        <img
          src={message.trim() && !disabled ? sendIcon : sendIconWhite}
          alt="전송"
          onClick={handleClick}
          className={`w-[43px] h-[43px] ml-2 transition duration-200 ${
            disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
          }`}
        />
      </div>
    </div>
  );
}
