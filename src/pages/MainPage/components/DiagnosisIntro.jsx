import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import DiagnosisImage from '@/assets/images/Diagnosis.png';
import QuestionICon from '@/assets/svg/questionIcon.svg';
import TimeIcon from '@/assets/svg/timeIcon.svg';
import { useNavigate } from 'react-router-dom';

const SecondSection = () => {
  const naviagte = useNavigate();
  const ref = useRef(null);

  // 스크롤 진행도 가져오기
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // 스크롤에 따라 점점 투명해짐
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="content-max-width mx-auto h-[calc(100vh-var(--header-height))]">
      <div className="flex flex-col gap-md justify-center items-center h-full" style={{ opacity }}>
        <h2 className="heading-1 font-500">맞춤 요금제 진단</h2>
        <p className="heading-3 font-300">간단한 질문을 통해, 딱 맞는 요금제를 추천해 드려요</p>
        <div className="p-md max-w-[802px] bg-white flex flex-col w-full justify-center items-center gap-md rounded-[20px] shadow-[0px_0px_10px_0px_rgba(0,0,12,0.08)]">
          <div className="">
            <img src={DiagnosisImage} alt="맞춤 요금제 진단 안내" />
          </div>
          <div className="flex justify-between max-w-[410px] w-full">
            <div className="flex gap-2 items-center">
              <img src={QuestionICon} alt="질문 수" />
              <span>질문 수: 10개</span>
            </div>
            <div className="flex gap-2 items-center">
              <img src={TimeIcon} alt="예상 소요시간" />
              <span>예상 소요시간: 3 ~ 5분</span>
            </div>
          </div>
          <button
            className="max-w-[270px] w-full bg-linear-[135deg,var(--color-pink-700),var(--color-purple-700)] px-md py-sm body-midium font-500 rounded-(--spacing-sm) text-white"
            onClick={() => naviagte('/diagnosis')}
          >
            진단 시작하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
