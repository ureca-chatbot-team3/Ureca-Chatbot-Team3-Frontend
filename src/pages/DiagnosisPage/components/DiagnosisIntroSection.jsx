import { motion } from 'framer-motion';
import { useRef } from 'react';
import DiagnosisImage from '../../../assets/svg/Diagnosis.svg';
import QuestionICon from '../../../assets/svg/questionIcon.svg';
import TimeIcon from '../../../assets/svg/timeIcon.svg';

const DiagnosisIntroSection = ({ onStartDiagnosis }) => {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      className="w-full pt-[40px] pb-[40px] bg-gray-200 min-h-screen md:pt-[40px] md:pb-[60px]"
    >
      <div className="content-max-width mx-auto px-[20px] w-full md:px-[40px]">
        <motion.div
          className="flex flex-col justify-center items-center h-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="m-heading-2 font-500 text-pink-700 text-center mb-[16px] md:heading-1 md:mb-[24px]">
            맞춤 요금제 진단
          </h2>
          <p className="m-body-large font-500 text-center text-black mb-[32px] md:heading-3 md:mb-[48px]">
            간단한 질문을 통해, 딱 맞는 요금제를 추천해 드려요
          </p>

          <motion.div
            className="p-[24px] max-w-[802px] bg-white flex flex-col w-full justify-center items-center rounded-[16px] shadow-soft-black md:p-[32px] md:rounded-[20px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={DiagnosisImage}
              alt="맞춤 요금제 진단 안내"
              className="max-w-full h-auto mb-[24px] md:mb-[32px]"
            />

            <div className="flex flex-col gap-[16px] max-w-[410px] w-full mb-[24px] md:flex-row md:justify-between md:gap-0 md:mb-[32px]">
              <div className="flex gap-[8px] items-center justify-center">
                <img src={QuestionICon} alt="질문 수" />
                <span className="m-body-medium text-gray-700 md:body-large font-500">
                  질문 수: 10개
                </span>
              </div>
              <div className="flex gap-[8px] items-center justify-center">
                <img src={TimeIcon} alt="예상 소요시간" />
                <span className="m-body-medium text-gray-700 md:body-large font-500">
                  예상 소요시간: 3 ~ 5분
                </span>
              </div>
            </div>

            <motion.button
              className="max-w-[270px] w-full bg-gradient-to-r from-pink-700 to-purple-700 px-[24px] py-[12px] m-body-medium font-500 rounded-[8px] text-white hover:shadow-lg transition-all duration-300 md:px-[32px] md:py-[16px] md:body-medium md:rounded-[12px]"
              onClick={onStartDiagnosis}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              진단 시작하기
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DiagnosisIntroSection;
