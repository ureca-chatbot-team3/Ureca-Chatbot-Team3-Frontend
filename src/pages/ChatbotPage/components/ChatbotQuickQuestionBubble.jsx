// components/ChatbotQuickQuestionBubble.jsx
export default function ChatbotQuickQuestionBubble({ onSelect, questions = [] }) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex flex-col mt-1.5">
        <div className="mb-2">아래 질문들 중 궁금한 게 있나요?</div>
        <ul className="flex flex-col gap-1">
          {questions.map((q, i) => (
            <li key={i}>
              <button
                onClick={() => onSelect(q)}
                className="text-left w-full text-sm text-gray-800 font-normal bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-200)] transition px-3 py-2 rounded-md"
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
