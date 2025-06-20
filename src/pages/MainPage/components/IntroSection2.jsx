import ChatExample1Image from '@/assets/images/ChatExample1.png';
import ChatExample2Image from '@/assets/images/ChatExample2.png';
import ChatExample3Image from '@/assets/images/ChatExample3.png';
import { motion } from 'motion/react';

const baseHeight = 'calc(100vh - 438px)';

export const IntroSection2 = ({ isActive }) => {
  const heights = [`calc(${baseHeight} - 40px)`, `calc(${baseHeight} - 20px)`, baseHeight];

  return (
    <section className="flex flex-col w-full h-full px-xl max-w-[1114px] gap-4">
      <h1 className="heading-1 font-500 px-4">
        전화 기다릴 필요 없이 <br />
        <span className="text-pink-700">지금 바로 AI 챗봇에게 요금제를 물어보세요!</span>
      </h1>

      <div className="flex items-end">
        {[ChatExample1Image, ChatExample2Image, ChatExample3Image].map((src, idx) => (
          <motion.div
            key={idx}
            className="flex"
            style={{ maxHeight: heights[idx] }}
            initial={{ opacity: 0, x: -50 }}
            animate={
              isActive
                ? {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.6, delay: 0.4 + idx * 0.8, ease: 'easeOut' },
                  }
                : {
                    opacity: 0,
                    x: -50,
                    transition: { delay: 0, ease: 'easeOut' },
                  }
            }
          >
            <img src={src} alt={`요금제 예시${idx + 1}`} className="max-h-full object-contain" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
