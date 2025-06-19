import { motion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const MainIntro = () => {
  return (
    <section className="border border-[3px] border-red-400 px-[40px] bg-linear-[to_bottom,var(--color-pink-300),var(--color-white)] h-[calc(100vh-var(--header-height))]">
      <div
        className={`border border-[3px] content-max-width mx-auto flex flex-col items-center h-full`}
      >
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
          className="w-full h-full"
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>
        {/* 임시 화살표 */}
        <motion.div
          className="text-4xl font-bold h-[100px] flex items-end"
          animate={{ y: [0, -10, 0] }} // 위로 갔다가 다시 제자리
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        >
          ⬇️
        </motion.div>
      </div>
    </section>
  );
};

export default MainIntro;
