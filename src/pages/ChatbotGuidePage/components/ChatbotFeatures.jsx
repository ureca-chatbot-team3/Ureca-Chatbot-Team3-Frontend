import FeaturesYopleming from '@/assets/svg/features-yopleming.svg';
import FeatherLeft from '@/assets/svg/feather-left.svg';
import FeatherRight from '@/assets/svg/feather-right.svg';
import { motion } from 'motion/react';

const features = [
  {
    title: '🔍 요금제 진단',
    description:
      '사용자의 데이터 사용량·통화 습관·연령대를 바탕으로\n AI가 가장 적합한 LG U+ 요금제를 분석해 추천합니다.\n 나에게 꼭 맞는 요금제를 쉽게 찾아보세요!',
  },
  {
    title: '⚡ 실시간 맞춤 추천',
    description:
      '입력한 정보에 따라 추천 결과가 실시간으로 업데이트되며,\n 조건을 바꾸면 언제든 다시 추천받을 수 있습니다.',
  },

  {
    title: '❓ FAQ 자동 응답',
    description:
      '자주 묻는 질문은 미리 학습된 내용을 기반으로\n 챗봇이 빠르고 정확하게 답변해드립니다.\n 예) "진단은 무료인가요?", "개인정보는 저장되나요?"',
  },
  {
    title: '🔘 추천 질문 버튼',
    description:
      '무엇을 물어볼지 고민된다면\n 챗봇이 상황에 맞는 추천 질문 버튼을 제시하여\n 초보자도 쉽게 대화를 시작할 수 있습니다.',
  },
  {
    title: '💾 진단 결과 저장',
    description:
      '추천받은 요금제는 ‘내 요금제’ 탭에 저장되며 나중에 다시 확인하거나 비교해볼 수 있습니다.\n*로그인한 사용자만 이용 가능합니다.',
  },
];
const ChatbotFeatures = () => {
  return (
    <motion.div
      className="flex flex-col items-center overflow-hidden"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
    >
      <div className="flex md:gap-md text-center items-center">
        <div className="max-w-[80px] md:max-w-[183px] self-end">
          <img src={FeaturesYopleming} alt="챗봇 기능" />
        </div>
        <div className="flex flex-col gap-xs md:gap-sm">
          <h2 className="m-heading-3 md:heading-1 font-700">어떤 기능을 하나요?</h2>
          <h3 className="pb-xs body-medium md:heading-3">
            요플랜 AI 챗봇은 통신 요금제 선택을
            <br /> 더 쉽고 똑똑하게 도와주는 서비스입니다.
          </h3>
        </div>
      </div>

      <div className="relative flex flex-col gap-xs md:gap-md max-w-[710px] w-full">
        {features.map(({ title, description }, index) => (
          <FeautureItem key={index} title={title} description={description} />
        ))}

        {/* 깃털 이미지 */}
        <div className="hidden md:block absolute bottom-2 -left-50 ">
          <img src={FeatherLeft} alt="왼쪽 깃털" />
        </div>
        <div className="hidden md:block absolute -top-20 -right-50 ">
          <img src={FeatherRight} alt="오른쪽 깃털" />
        </div>
      </div>
    </motion.div>
  );
};

const FeautureItem = ({ title, description }) => {
  return (
    <dl className="px-sm md:px-md py-sm m-body-small md:body-medium rounded-[20px] shadow-soft-black bg-white z-10 space-y-1">
      <dt className="font-700">{title}</dt>
      <dd className="text-[12px] md:body-medium font-300 whitespace-pre-line">{description}</dd>
    </dl>
  );
};

export default ChatbotFeatures;
