import FAQYopleming from '@/assets/svg/faq-yopleming.svg';
import QIcon from '@/assets/svg/q-icon.svg';
import AIcon from '@/assets/svg/a-icon.svg';
import { motion } from 'motion/react';

const faqs = [
  {
    question: '요금제 진단은 무료인가요?',
    answer: '네, 챗봇을 통한 요금제 진단 및 추천은 무료입니다.',
  },
  {
    question: '개인정보를 저장하나요??',
    answer: '진단에 필요한 최소한의 정보만 일시적으로 사용하며, 저장하지 않습니다.',
  },
  {
    question: '어떤 통신사의 요금제를 추천하나요?',
    answer: 'LG U+ 통신사 요금제를 기준으로 추천합니다.',
  },
  {
    question: '질문은 몇 번까지 할 수 있나요?',
    answer: '제한 없이 자유롭게 질문 가능합니다.',
  },
  {
    question: '챗봇을 언제 이용할 수 있나요?',
    answer: '챗봇은 24시간 언제든지 이용 가능하며, 실시간으로 응답합니다.',
  },
  {
    question: '사용자가 많을 경우 느려질 수 있나요?',
    answer:
      '드물지만 서버 접속량이 급증할 경우 응답이 지연될 수 있습니다. 이 경우 잠시 후 다시 시도해 주세요.',
  },
];

const FAQ = () => {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
    >
      <div className="flex gap-md text-center items-center">
        <div className="flex gap-xs md:gap-md text-center items-end">
          <div className="max-w-[100px] md:max-w-[247px]">
            <img src={FAQYopleming} alt="챗봇 사용법" />
          </div>
          <h2 className="m-heading-3 md:heading-1 font-700 -translate-y-4">자주 묻는 질문 (FAQ)</h2>
        </div>
      </div>

      <div className="bg-white max-w-[955px] w-full flex flex-col gap-xs shadow-soft-black px-8 py-5 rounded-[20px]">
        {faqs.map(({ answer, question }, index) => (
          <FQAItem key={index} question={question} answer={answer} />
        ))}
      </div>
    </motion.div>
  );
};

const FQAItem = ({ question, answer }) => {
  return (
    <div className="flex flex-col m-body-add md:body-medium">
      {/* 질문 */}
      <div className="grid gap-1 font-500 grid-cols-[12px_auto] grid-rows-[12px_auto] md:grid-cols-[15px_auto] md:grid-rows-[15px_auto]">
        <div className="col-start-1 row-start-1">
          <img src={QIcon} alt="질문" />
        </div>
        <div className="col-start-2 row-start-2">
          <div className="w-fit py-2 px-3 md:p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl md:rounded-tr-2xl md:rounded-br-2xl md:rounded-bl-2xl bg-[#2BB3CD50]">
            {question}
          </div>
        </div>
      </div>
      {/* 답변 */}
      <div className="grid gap-1 justify-end grid-cols-[auto_12px] grid-rows-[15px_auto] md:grid-cols-[auto_15px] md:grid-rows-[17px_auto]">
        <div className="col-start-2 row-start-1">
          <img src={AIcon} alt="답변" />
        </div>
        <div className="col-start-1 row-start-2">
          <div className="w-fit py-2 px-3 md:p-3 rounded-tl-xl rounded-br-xl rounded-bl-xl md:rounded-tl-2xl md:rounded-br-2xl md:rounded-bl-2xl bg-pink-300">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
