import AskHelpImage from '@/assets/images/AskHelpImage.png';
import { motion } from 'motion/react';

export const IntroSection3 = ({ isActive }) => {
  return (
    <section className="max-w-[306px] md:max-w-[1114px] min-h-[210px] flex w-full gap-5 flex-col items-center md:items-start h-full md:px-xl justify-between">
      <h1 className="text-center md:text-left m-heading-3 font-700 md:heading-1 md:font-500">
        AI 챗봇과의 대화가 처음이신가요? <br />
        <span className="text-pink-700"> 챗봇 사용 팁</span>을 보러가세요!
      </h1>
      <motion.div
        className="flex gap-2 md:gap-5 flex-1 justify-between items-end px-xs md:px-0 w-full"
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
      >
        <div
          className="flex-1 md:flex-initial max-w-[160px] md:max-w-[400px]"
          initial={{ opacity: 0, scale: 0.95 }}
        >
          <img src={AskHelpImage} alt="챗봇 안내 페이지 이동" className="w-full" />
        </div>

        <div
          className="flex-[1.5] md:flex-initial flex flex-col md:py-md gap-sm md:gap-lg md:px-sm md:-translate-y-5"
          initial={{ opacity: 0 }}
        >
          <p className="m-body-medium font-500 md:heading-2">
            <span className="hidden md:inline font-300">챗봇 사용이 처음이라면</span>
            <span className="md:hidden">챗봇 사용법에 대한 자세한 안내 페이지로 이동합니다</span>
            <br />
            <span className="hidden md:inline font-500">이 페이지에서 자세히 안내해드려요!</span>
          </p>
          <button className="bg-linear-[135deg,var(--color-pink-700),var(--color-purple-700)] px-sm py-xs m-body-add font-400 md:px-md md:py-sm md:body-medium md:font-500 rounded-[12px] md:rounded-(--spacing-sm) text-white w-fit">
            챗봇 안내 페이지로 이동
          </button>
        </div>
      </motion.div>
    </section>
  );
};
