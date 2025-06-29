import PhoneImage from '@/assets/svg/Phone.svg';
import LaptopImage from '@/assets/svg/Laptop.svg';
import { motion } from 'motion/react';
import useIsMobile from '../../../hooks/useIsMobile';

const IntroSection1 = ({ isActive }) => {
  const isMobile = useIsMobile();

  return (
    <section className="text-center w-full flex flex-col md:gap-3">
      <h1 className="m-heading-3 font-700 md:heading-1 md:font-500">
        통신 요금제,&nbsp; <br className="md:block hidden" />
        <span className="text-pink-700">AI 챗봇</span>이 <br className="md:hidden block" />
        똑똑하게 추천합니다
      </h1>
      <div className="flex justify-evenly gap-5 flex-1 overflow-hidden">
        <motion.div
          className="hidden md:flex flex-col justify-center gap-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isActive
              ? {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.6, delay: 0.4, ease: 'easeOut' },
                }
              : {
                  opacity: 0,
                  scale: 0.95,
                  transition: { delay: 0, ease: 'easeOut' },
                }
          }
          viewport={{ once: false }}
        >
          <div className="max-h-[334px] mx-auto">
            <img src={PhoneImage} alt="번거로운 요금제 상담" className=" h-full object-contain" />
          </div>
          <p className="heading-2 font-500">
            <span className="text-pink-700">이전엔 번거로운</span> 요금제 상담
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:justify-center gap-1 md:gap-3"
          initial={{ opacity: 0 }}
          animate={
            isActive
              ? {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.6, delay: isMobile ? 0.4 : 1, ease: 'easeOut' },
                }
              : {
                  opacity: 0,
                  scale: 0.95,
                  transition: { delay: 0, ease: 'easeOut' },
                }
          }
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
          <div className="max-h-[160px] md:max-h-[310px] xl:max-h-[334px] mx-auto">
            <img src={LaptopImage} alt="AI 챗봇 요플밍" className="h-full object-contain" />
          </div>
          <p className="m-bdoy-medium md:heading-2 font-500">
            이제는 24시간 AI 챗봇으로 간편하게 <br />
            요플랜의 AI 챗봇 <span className="text-pink-700">요플밍</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection1;
