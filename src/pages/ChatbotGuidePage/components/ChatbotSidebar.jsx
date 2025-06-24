import useScrollHashSync from '../../../hooks/useScrollHashSync';
import { CHATBOT_GUIDE_SECTIONS } from '../../../constants/chatbotGuide';

const ChatbotSidebar = () => {
  const sectionIds = CHATBOT_GUIDE_SECTIONS.map((s) => s.id);
  const activeId = useScrollHashSync(sectionIds);

  const handleSectionScroll = (id) => (e) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <div className="w-[280px] sticky top-[calc(var(--header-height)+var(--spacing-2xl))] h-fit flex flex-col gap-md">
      <h1 className="heading-1 font-500">챗봇 안내</h1>
      <div className="w-full h-[1px] bg-gray-500"></div>
      <ul className="space-y-2">
        {CHATBOT_GUIDE_SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <button
              onClick={handleSectionScroll(id)}
              className={`heading-3 transition-colors duration-200 ${activeId === id ? 'text-pink-700' : 'hover:text-pink-700'}`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatbotSidebar;
