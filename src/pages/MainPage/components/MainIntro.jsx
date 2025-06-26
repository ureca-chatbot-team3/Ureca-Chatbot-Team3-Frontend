import { motion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import LongArrowDownIcon from '@/assets/svg/longArrowDownIcon.svg';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import IntroSection1 from './IntroSection1';
import { IntroSection2 } from './IntroSection2';
import { useState } from 'react';
import { IntroSection3 } from './IntroSection3';

const MainIntro = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative z-10 px-[20px] h-full md:px-[40px] bg-linear-[to_bottom,var(--color-pink-300),var(--color-white)] min-h-[330px] md:h-[calc(100vh-var(--header-height))]">
      <div className="content-max-width mx-auto flex flex-col items-center h-full gap-3 relative">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-full h-full md:mb-[100px]"
        >
          <SwiperSlide>
            <IntroSection1 isActive={activeIndex === 0} />
          </SwiperSlide>
          <SwiperSlide>
            <IntroSection2 isActive={activeIndex === 1} />
          </SwiperSlide>
          <SwiperSlide>
            <IntroSection3 isActive={activeIndex === 2} />
          </SwiperSlide>
        </Swiper>

        <motion.div
          className="hidden md:block absolute bottom-0"
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
