import { useRef } from 'react';
import BackgroundWrapper from './components/BackgroundWrapper';
import MainIntro from './components/MainIntro';
import DiagnosisIntro from './components/DiagnosisIntro';
import ChatbotIntro from './components/ChatbotIntro';
import { useAutoScrollToSection } from '@/hooks/useAutoScroll';
import useIsMobile from '../../hooks/useIsMobile';

const MainPage = () => {
  const secondRef = useRef(null);
  const isMobile = useIsMobile();

  useAutoScrollToSection(secondRef);

  return (
    <main>
      <MainIntro />
      <BackgroundWrapper>
        <div ref={isMobile ? undefined : secondRef}>
          <DiagnosisIntro />
        </div>
        <ChatbotIntro />
      </BackgroundWrapper>
    </main>
  );
};

export default MainPage;
