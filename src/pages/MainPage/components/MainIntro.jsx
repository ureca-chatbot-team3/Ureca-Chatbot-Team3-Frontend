import { motion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import LongArrowDownIcon from '@/assets/svg/longArrowDownIcon.svg';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import IntroSection1 from './IntroSection1';

const MainIntro = () => {
  return (
    <section className="px-[40px] bg-linear-[to_bottom,var(--color-pink-300),var(--color-white)] h-[calc(100vh-var(--header-height))]">
      <div className="content-max-width mx-auto flex flex-col items-center h-full gap-3 relative">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full h-full mb-[100px]"
        >
          <SwiperSlide>
            <IntroSection1 />
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>
        {/* 임시 화살표 */}
        <motion.div
          className="absolute bottom-0"
          style={{ aspectRatio: '16/102' }}
          animate={{ y: [0, -10, 0] }} // 위로 갔다가 다시 제자리
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        >
          <img src={LongArrowDownIcon} alt="아래로" />
        </motion.div>
      </div>
    </section>
  );
};

export default MainIntro;
