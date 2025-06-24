// src/pages/ChatbotPage/components/ChatbotRedirectBubble.jsx
import { useNavigate } from 'react-router-dom';

export default function ChatbotRedirectBubble({ label, route }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div className="flex items-start gap-2">
      <div className="flex flex-col mt-1.5">
        <div className="mb-3">도움이 될 만한 페이지로 연결해드릴게요! 아래 버튼을 눌러주세요!</div>
        <ul className="flex flex-col gap-1">
          <li>
            <button
              onClick={handleClick}
              className="
                w-full px-3 py-2 mb-3
                body-medium font-500
                text-[var(--color-black)]
                border border-[rgba(217,218,219,0.5)]
                rounded-[16px] 
                bg-white hover:bg-[var(--color-gray-400)]
                transition-colors
              "
            >
              {label}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
