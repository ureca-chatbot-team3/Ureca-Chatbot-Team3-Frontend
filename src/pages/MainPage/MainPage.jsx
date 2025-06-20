import { useRef } from 'react';
import BackgroundWrapper from './components/BackgroundWrapper';
import MainIntro from './components/MainIntro';
import DiagnosisIntro from './components/DiagnosisIntro';
import ThirdSection from './components/ThirdSection';
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
        <ThirdSection />
      </BackgroundWrapper>
    </main>
  );
};

export default MainPage;
