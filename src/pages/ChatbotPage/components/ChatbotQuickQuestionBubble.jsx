// components/ChatbotQuickQuestionBubble.jsx
export default function ChatbotQuickQuestionBubble({ onSelect, questions = [] }) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex flex-col mt-1.5">
        <div className="mb-2">
          어떤 질문으로 시작해야 할지 모르겠다면, 아래 질문들로 시작 해 보세요!
        </div>
        <ul className="flex flex-col gap-1">
          {questions.map((q, i) => (
            <li key={i}>
              <button
                onClick={() => onSelect(q.trim())} // ✅ 공백 제거
                className="w-full text-sm text-gray-800 font-normal bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-200)] transition px-3 py-2 rounded-md text-left !text-left"
              >
                💬 {q}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
