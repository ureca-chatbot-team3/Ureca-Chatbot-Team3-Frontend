import { useState, useEffect } from 'react';

const ChatbotSidebar = () => {
  const [activeSection, setActiveSection] = useState('intro');

  // 스크롤 스파이 기능
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'how-to-use', 'features', 'questions', 'terms'];
      const scrollPosition = window.scrollY + 200; // 헤더 + 여유분

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'intro', label: 'AI 챗봇 요금민 소개' },
    { id: 'how-to-use', label: '어떻게 사용하나요?' },
    { id: 'features', label: '어떤 기능을 하나요?' },
    { id: 'questions', label: '자주 묻는 질문' },
    { id: 'terms', label: '유의사항 안내' },
  ];

  // 헤더 높이를 고려한 스크롤
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 175;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-[280px] mr-[60px] h-screen sticky top-28 overflow-y-auto pt-[60px]">
      <h1 className="heading-1 font-500 text-black mb-[20px]">챗봇 가이드</h1>
      <div className="w-full h-[1px] bg-gray-500 mb-[20px]"></div>
      <nav className="space-y-[16px]">
        {menuItems.map((item, index) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={index}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left heading-3 font-500 transition-colors ${
                isActive ? 'text-pink-700' : 'text-black hover:text-pink-700'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default ChatbotSidebar;
