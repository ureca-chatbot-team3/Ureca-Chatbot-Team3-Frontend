import YoplemingBackgroundImage from '@/assets/svg/yopleming-background.svg';
import Yopleming from '@/assets/svg/yopleming.svg';
import { motion } from 'motion/react';

const AIYopleming = () => {
  return (
    <div className="md:max-h-[calc(100vh-var(--header-height)-123px)] md:h-full flex flex-col">
      <div className="flex flex-col text-center">
        <h2 className="m-heading-3 md:heading-1 font-700">요플랜 AI 챗봇 요플밍 소개</h2>
        <p className="mt-2 md:heading-2 m-body-large">요금제 고민? 플밍이가 도와드릴게요!</p>
      </div>
      <div className="relative flex items-end w-full h-full overflow-hidden rounded-2xl">
        <img
          src={YoplemingBackgroundImage}
          alt="요플밍 소개 배경"
          className="w-full h-full object-cover object-[center_90%]"
        />
        <motion.div
          className="absolute bottom-1/20 md:bottom-1/2 left-1/2 -translate-x-1/2 md:translate-y-1/2 w-full flex gap-sm md:gap-lg pr-sm lg:pr-lg max-w-[959px] max-h-full"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="md:flex-1 max-w-[123px] sm:max-w-[200px] md:max-w-[300px] min-w-[100px] w-full overflow-hidden self-end">
            <img src={Yopleming} alt="AI 챗봇 요플밍" className="w-full h-full object-contain" />
          </div>
          <div className="md:flex-2 relative bg-white border border-pink-700 p-[12px] md:p-md lg:p-lg rounded-lg max-w-full w-full h-fit">
            <p className="text-gray-800 m-body-add md:body-large md:font-300 text-md-range">
              🦩 안녕하세요! <br />
              저는 요플랜의 AI 요금제 추천 챗봇 <span className="text-pink-700">요플밍</span>
              이에요. <br />
              <br />
              ✔️ 통화량, 데이터 사용량, 예산에 따라 <br />
              ✔️ 여러분에게 꼭 맞는 요금제를 추천해드려요. <br />
              <br />
              복잡한 요금제 비교는 이제 그만! <br />
              저랑 대화하면서 쉽고 빠르게 해결하세요.
            </p>
            <div
              className="absolute -left-[18px] bottom-[59px] md:bottom-[79px] w-0 h-0 border-t-[10px] border-b-[10px]
            border-r-[18px] border-t-transparent border-b-transparent border-r-pink-700 z-0"
            />
            <div
              className="absolute -left-4 bottom-15 md:bottom-20 w-0 h-0 
      border-t-[9px] border-b-[9px] border-r-[17px] 
      border-t-transparent border-b-transparent border-r-white z-10"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIYopleming;
