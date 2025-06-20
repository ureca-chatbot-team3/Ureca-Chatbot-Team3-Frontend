import { useRef } from 'react';
import BackgroundWrapper from './components/BackgroundWrapper';
import MainIntro from './components/MainIntro';
import DiagnosisIntro from './components/DiagnosisIntro';
import ChatbotIntro from './components/ChatbotIntro';
import { useAutoScrollToSection } from '@/hooks/useAutoScroll';

const MainPage = () => {
  const secondRef = useRef(null);

  useAutoScrollToSection(secondRef);

  return (
    <main>
      <MainIntro />
      <BackgroundWrapper>
        <div ref={secondRef}>
          <DiagnosisIntro />
        </div>
        <ChatbotIntro />
      </BackgroundWrapper>
    </main>
  );
};

export default MainPage;
