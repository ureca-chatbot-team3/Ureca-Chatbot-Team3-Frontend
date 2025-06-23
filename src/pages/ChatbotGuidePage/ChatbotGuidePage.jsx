import AIYopleming from './components/AIYopleming';
import ChatbotFeatures from './components/ChatbotFeatures';
import ChatbotUsage from './components/ChatbotUsage';
import FAQ from './components/FAQ';

const sections = [
  {
    id: 'intro',
    label: '챗봇 소개',
    content: <AIYopleming />,
  },
  {
    id: 'usage',
    label: '어떻게 사용하나요?',
    content: <ChatbotUsage />,
  },
  {
    id: 'features',
    label: '어떤 기능을 하나요',
    content: <ChatbotFeatures />,
  },
  {
    id: 'faq',
    label: '자주 묻는 질문',
    content: <FAQ />,
  },
  {
    id: 'notice',
    label: '유의사항 안내',
    content: (
      <>
        <h2>FAQ</h2>
        <p>자주 묻는 질문들</p>
      </>
    ),
  },
];

const ChatbotGuidePage = () => {
  const sectionClass = 'border scroll-mt-[var(--header-height)] py-[60px] w-full';

  return (
    <main className="flex gap-[60px]">
      {/* 목차 */}
      <nav className="sticky top-[calc(var(--header-height)+var(--spacing-2xl))] h-fit border bg-white p-4">
        <ul className="space-y-2 text-sm font-medium">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className="hover:underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 본문 */}
      <div className="flex-1">
        {sections.map(({ id, content }) => (
          <section key={id} id={id} className={sectionClass}>
            {content}
          </section>
        ))}
      </div>
    </main>
  );
};

export default ChatbotGuidePage;
