import { motion } from 'motion/react';
import PhonePlanQuestionImage from '@/assets/svg/PhonePlanQuestion.svg';
import PhonePlanQuestionListImage from '@/assets/svg/PhonePlanQuestionList.svg';

const ThirdSection = () => {
  return (
    <section className="content-max-width mx-auto h-[calc(100vh-var(--header-height))]">
      <motion.div
        className="flex flex-col gap-2xl justify-center items-center h-full"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 3 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <h2 className="heading-1 font-500">
          <span className="text-pink-700">AI 챗봇</span>을 사용해보세요
        </h2>

        <div className="max-w-[1080px] w-full flex justify-around items-center gap-md">
          <ChatCard
            title="요금제에 대한 궁금한 내용 질문"
            image={PhonePlanQuestionImage}
            alt="요금제 질문 이미지"
            description={`복잡한 요금제 정보도 AI 챗봇이 쉽고 친근하게 설명해드려요.\n데이터, 통화, 부가서비스까지 궁금한 모든 것을 물어보세요!`}
          />
          <ChatCard
            title="요금제에 대한 궁금한 내용 질문"
            image={PhonePlanQuestionListImage}
            alt="질문 리스트 이미지"
            description={`어떤 질문을 해야 할지 모르겠다면?\nAI가 당신의 상황에 맞는 맞춤형 질문 리스트를\n제안해서 더 정확한 답변을 받을 수 있어요!`}
            delay={0.3}
          />
        </div>
      </motion.div>
    </section>
  );
};

const ChatCard = ({ title, image, alt, description, delay = 0 }) => (
  <motion.div
    className="flex flex-col items-center bg-white gap-sm rounded-[20px] shadow-[0px_0px_10px_0px_rgba(0,0,12,0.08)] px-md py-xl max-w-[400px] w-full max-h-[508px] h-full"
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ type: 'spring', duration: 3, delay }}
    viewport={{ once: false, amount: 0.3 }}
  >
    <h3 className="heading-3 font-500">{title}</h3>
    <div className="gap-sm flex flex-col flex-1 justify-around">
      <div className="max-h-[240px] h-full flex justify-center items-center">
        <img src={image} alt={alt} className="object-contain h-full w-full" />
      </div>
      <p className="body-medium font-400 text-center whitespace-pre-line">{description}</p>
    </div>
  </motion.div>
);

export default ThirdSection;
