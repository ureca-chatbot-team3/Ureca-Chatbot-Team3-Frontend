import { useEffect } from 'react';
import { CHATBOT_GUIDE_SECTIONS } from '../../constants/chatbotGuide.js';
import ChatbotSidebar from './components/ChatbotSidebar';

const ChatbotGuidePage = () => {
  const sectionClass = 'scroll-mt-[var(--header-height)] py-[60px] w-full';

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <main className="flex gap-[60px]">
      {/* 목차 */}
      <ChatbotSidebar />

      {/* 본문 */}
      <div className="flex-1">
        {CHATBOT_GUIDE_SECTIONS.map((section) => {
          const { id, content: Content } = section;
          return (
            <section key={id} id={id} className={sectionClass}>
              <Content />
            </section>
          );
        })}
      </div>
    </main>
  );
};

export default ChatbotGuidePage;
