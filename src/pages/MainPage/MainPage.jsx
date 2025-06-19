import BackgroundWrapper from './components/BackgroundWrapper';
import FirstSection from './components/FirstSection';
import SecondSection from './components/SecondSection';
import ThirdSection from './components/ThirdSection';

const MainPage = () => {
  return (
    <main>
      <FirstSection />
      <BackgroundWrapper>
        <SecondSection />
        <ThirdSection />
      </BackgroundWrapper>
    </main>
  );
};

export default MainPage;
