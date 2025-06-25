import { useEffect, useMemo, useState } from 'react';
import useScrollHashSync from '../../../hooks/useScrollHashSync';
import { CHATBOT_GUIDE_SECTIONS } from '../../../constants/chatbotGuide';
import useIsMobile from '../../../hooks/useIsMobile';

const ChatbotSidebar = () => {
  const isMobile = useIsMobile();

  const sectionIds = useMemo(() => CHATBOT_GUIDE_SECTIONS.map((s) => s.id), []);
  const [enableScrollSync, setEnableScrollSync] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setEnableScrollSync(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const activeId = useScrollHashSync(sectionIds, 'intro', enableScrollSync);

  const handleSectionScroll = (id) => (e) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });

      // 스크롤 후 해시 변경을 약간 지연
      setTimeout(() => {
        window.history.replaceState(null, '', `#${id}`);
      }, 500);
    }
  };

  return (
    <div className="md:w-[280px] bg-gray-200 sticky top-[calc(var(--m-header-height))] py-md md:py-0 md:top-[calc(var(--header-height)+var(--spacing-2xl))] md:h-fit flex flex-col gap-md z-20">
      <h1 className="m-heading-3 font-700 md:heading-1 md:font-500">챗봇 안내</h1>
      <div className="hidden md:block w-full h-[1px] bg-gray-500"></div>
      <ul className="grid grid-cols-3 gap-x-sm gap-y-xs md:inline-block md:space-y-2">
        {CHATBOT_GUIDE_SECTIONS.map(({ id, label }) => (
          <li
            key={id}
            className="border border-gray-500 rounded-[12px] md:border-none bg-white md:bg-transparent"
          >
            <button
              onClick={handleSectionScroll(id)}
              className={`m-body-small font-500 w-full py-2 md:py-0 md:w-fit md:heading-3 transition-colors duration-200 ${
                activeId === id ? 'text-pink-700' : 'hover:text-pink-700'
              }`}
            >
              {isMobile ? label.mobile : label.desktop}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatbotSidebar;
