// components/ChatbotQuickQuestionBubble.jsx
export default function ChatbotQuickQuestionBubble({ onSelect, questions = [] }) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex flex-col mt-1.5">
        <div className="mb-3">
          어떤 질문으로 시작해야 할지 모르겠다면, 아래 질문들로 시작 해 보세요!
        </div>
        <ul className="flex flex-col gap-1">
          {questions.map((q, i) => (
            <li key={i}>
              <button
                onClick={() => onSelect(q.trim())}
                className="
                  w-full px-3 py-2 mb-3
                  body-medium font-500
                  text-[var(--color-black)]
                  border border-[rgba(217,218,219,0.5)]
                  rounded-[16px] 
                  bg-white hover:bg-[var(--color-gray-400)]
                  transition-colors !text-left
                "
              >
                {q}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
