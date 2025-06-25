import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import PlanCard from '../../../components/PlanCard';

export default function PlanCardSlider({ plans }) {
  return (
    <div className="w-full py-2 overflow-x-visible">
      <Swiper
        className="chatbot-plan-swiper"
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        spaceBetween={10}
        pagination={{ clickable: true }}
        navigation
        style={{ overflow: 'visible' }}
      >
        {plans.map((plan, i) => (
          <SwiperSlide key={plan._id || i}>
            <div className="w-full h-full flex justify-center px-1">
              <div className="w-full max-w-[360px]">
                <PlanCard {...plan} id={plan._id} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
