import NoticeYopleming from '@/assets/svg/notice-yopleming.svg';
import { motion } from 'motion/react';

const notices = [
  {
    title: '가입은 공식 채널에서',
    descriptions: [
      '본 서비스는 정보 제공용입니다.',
      '실제 가입·결제는 통신사 공식 홈페이지 또는 매장에서 진행해 주세요.',
    ],
  },
  {
    title: '추천은 참고용입니다',
    descriptions: [
      '입력하신 정보를 바탕으로 계산됩니다.',
      '실제 요금·혜택과 차이가 있을 수 있으니, 꼭 최종 확인해 주세요.',
    ],
  },
  {
    title: '정보 최신화 안내',
    descriptions: [
      '일부 요금제 정보가 실시간 반영되지 않을 수 있습니다.',
      '최종 가입 전 통신사 공식 사이트를 다시 한 번 확인해 주세요.',
    ],
  },
  {
    title: '대상 통신사',
    descriptions: ['LG U+ 요금제를 기준으로 제공됩니다.', '실타사 요금제는 포함되지 않습니다.'],
  },
  {
    title: '문의할 땐 구체적으로',
    descriptions: ['오류나 누락 없이 빠른 답변을 위해, 가능한 자세히 입력해 주세요.'],
  },
];

const ChatbotNotice = () => {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
    >
      <div className="flex flex-col gap-xs md:gap-sm text-center">
        <h2 className="m-heading-3 md:heading-1 font-700">유의사항 안내</h2>
        <div className="max-w-[109px] md:max-w-[246px]">
          <img src={NoticeYopleming} alt="유의사항 안내" />
        </div>
      </div>
      <div className="p-md shadow-soft-black rounded-[20px] max-w-[640px] w-full flex flex-col gap-1 bg-white">
        {notices.map(({ title, descriptions }, index) => (
          <NoticeItem key={index} number={index + 1} title={title} descriptions={descriptions} />
        ))}
      </div>
    </motion.div>
  );
};

const NoticeItem = ({ number, title, descriptions }) => {
  return (
    <div className="flex flex-col m-body-add gap-[2px] md:body-medium">
      <span className="font-700">
        {number}. {title}
      </span>
      <ul className="">
        {descriptions.map((description, index) => (
          <li key={index} className="font-300 pl-4">
            • {description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatbotNotice;
