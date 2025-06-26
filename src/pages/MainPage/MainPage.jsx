import { useRef } from 'react';
import BackgroundWrapper from './components/BackgroundWrapper';
import MainIntro from './components/MainIntro';
import DiagnosisIntro from './components/DiagnosisIntro';
import ChatbotIntro from './components/ChatbotIntro';
import { useAutoScrollToSection } from '@/hooks/useAutoScroll';
import useIsMobile from '../../hooks/useIsMobile';
import { useChatbotContext } from '../../hooks/useChatbotContext';
import { useEffect } from 'react';

const MainPage = () => {
  const secondRef = useRef(null);
  const isMobile = useIsMobile();

  useAutoScrollToSection(secondRef);

  const chatbotRef = useRef(null);
  const { setIsArrowVisible } = useChatbotContext();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsArrowVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    const target = chatbotRef.current;

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [setIsArrowVisible]);

  return (
    <main>
      <MainIntro />
      <BackgroundWrapper>
        <div ref={isMobile ? undefined : secondRef}>
          <DiagnosisIntro />
        </div>
        <div ref={chatbotRef}>
          <ChatbotIntro />
        </div>
      </BackgroundWrapper>
    </main>
  );
};

export default MainPage;
