import AskHelpImage from '@/assets/images/AskHelpImage.png';
import { motion } from 'motion/react';

export const IntroSection3 = ({ isActive }) => {
  return (
    <section className="flex w-full flex-col h-full px-xl max-w-[1114px] gap-4">
      <h1 className="heading-1 font-500">
        AI 챗봇이 처음이라면 걱정 마세요! <br />
        무엇을 물어봐야 할지 모를 땐,
        <span className="text-pink-700"> 사용 꿀팁</span>을 확인해보세요!
      </h1>
      <motion.div
        className="flex gap-5 flex-1 justify-between"
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
        <div className="relative aspect-square" initial={{ opacity: 0, scale: 0.95 }}>
          <img
            src={AskHelpImage}
            alt="번거로운 요금제 상담"
            className="absolute h-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-end py-md gap-xl  px-sm" initial={{ opacity: 0 }}>
          <p className="heading-2 font-300">
            챗봇 사용이 처음이라면
            <br />
            <span className="font-500">이 페이지에서 자세히 안내해드려요!</span>
          </p>
          <button className="bg-linear-[135deg,var(--color-pink-700),var(--color-purple-700)] px-md py-sm body-midium font-500 self-start rounded-(--spacing-sm) text-white">
            챗봇 안내 페이지로 이동
          </button>
        </div>
      </motion.div>
    </section>
  );
};
