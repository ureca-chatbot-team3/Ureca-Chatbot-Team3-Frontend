import { useRef } from 'react';
import BackgroundWrapper from './components/BackgroundWrapper';
import FirstSection from './components/FirstSection';
import SecondSection from './components/SecondSection';
import ThirdSection from './components/ThirdSection';
import { useAutoScrollToSection } from '@/hooks/useAutoScroll';

const MainPage = () => {
  const secondRef = useRef(null);

  useAutoScrollToSection(secondRef);

  return (
    <main>
      <FirstSection />
      <BackgroundWrapper>
        <div ref={secondRef}>
          <SecondSection />
        </div>
        <ThirdSection />
      </BackgroundWrapper>
    </main>
  );
};

export default MainPage;
