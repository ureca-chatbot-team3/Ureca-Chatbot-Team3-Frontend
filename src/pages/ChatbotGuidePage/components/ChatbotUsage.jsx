import UsageYopleming from '@/assets/svg/usage-yopleming.svg';
import { motion } from 'motion/react';

const steps = [
  {
    numberBgColor: 'bg-mint-400',
    title: '홈페이지 접속',
    description: '→ 요플랜 웹사이트에 접속합니다.',
  },
  {
    numberBgColor: 'bg-pink-400',
    title: '챗봇 클릭',
    description: '→ 우측 하단의 AI 챗봇 "요플밍" 버튼을 클릭합니다.',
  },
  {
    numberBgColor: 'bg-purple-400',
    title: '질문 또는 진단 시작',
    description: '→ 자유롭게 질문하거나, "맞춤 요금제 진단" 버튼을 눌러주세요.',
  },
  {
    numberBgColor: 'bg-mint-700',
    title: '챗봇 응답 확인',
    description: '→ 요금제 정보, 추천 결과 등을 확인하고 링크로 이동할 수 있어요.',
  },
  {
    numberBgColor: 'bg-peach-400',
    title: '대화 내용 저장',
    description: '→ 로그인하면 진단 결과와 대화 기록을 마이페이지에서 확인할 수 있어요.',
  },
];

const ChatbotUsage = () => {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
    >
      <div className="flex md:gap-md items-center">
        <h2 className="m-heading-3 md:heading-1 font-700">
          플밍이 어떻게 사용하시나요? <br /> 요플밍이 도와드릴게요!
        </h2>
        <div className="max-w-[90px] md:max-w-[223px] self-end">
          <img src={UsageYopleming} alt="챗봇 사용법" />
        </div>
      </div>
      <div className="p-sm md:p-lg shadow-soft-black rounded-[20px] flex flex-col gap-sm md:gap-lg max-w-[754px] w-full mx-auto bg-white">
        <h3 className="m-body-medium md:heading-2 font-700">
          어떻게 사용하나요? (Step-by-step 가이드)
        </h3>
        <div className="flex flex-col gap-xs md:gap-md">
          {steps.map(({ numberBgColor, title, description }, index) => (
            <StepItem
              key={index}
              number={index + 1}
              numberBgColor={numberBgColor}
              title={title}
              description={description}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const StepItem = ({ number, numberBgColor, title, description }) => {
  return (
    <div className="flex gap-2 md:gap-3">
      <span
        className={`flex items-center justify-center w-4 h-4 p-2 md:w-6 md:h-6 rounded-full text-white m-body-add md:body-large font-700 ${numberBgColor}`}
      >
        {number}
      </span>
      <dl className="-translate-y-[5%] md:-translate-y-1">
        <dt className="m-body-add md:body-large font-700">{title}</dt>
        <dd className="m-body-add md:body-medium">{description}</dd>
      </dl>
    </div>
  );
};

export default ChatbotUsage;
