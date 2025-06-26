import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { planApi } from '@/apis/planApi'; // '@/' alias 가 작동할 때만
// import { planApi } from '../../apis/planApi';   // alias가 안 된다면 이 상대경로를 사용
import { formatter } from '@/utils/formatter';
import { getImageUrl } from '@/utils/imageUtils';
import ChatbotLauncher from '@/components/ChatbotLauncher';
import PlanCard from '@/components/PlanCard';
import DetailAccordion from './DetailAccordion';
import LoginRequiredModal from '@/components/modals/LoginRequiredModal';

import dataImg from '@/assets/images/data.png';
import shareImg from '@/assets/images/share.png';
import callImg from '@/assets/images/call.png';
import messageImg from '@/assets/images/message.png';
import giftImg from '@/assets/images/gift.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const MobileDetailPage = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [recommendPlans, setRecommendPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 1) 요금제 상세정보
  useEffect(() => {
    (async () => {
      try {
        const { data } = await planApi.getPlanDetail(id);
        setPlan(data.plan);
      } catch {
        console.error('요금제 상세 조회 실패');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // 2) 추천 요금제
  useEffect(() => {
    (async () => {
      try {
        const { data } = await planApi.getRecommendedPlans({ baseId: id });
        setRecommendPlans(data.recommendedPlans || []);
      } catch {
        console.error('추천 요금제 조회 실패');
      }
    })();
  }, [id]);

  // 3) 스크롤 방향으로 바 숨기기
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      setShowBottomBar(currentY <= lastY);
      lastY = currentY;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (loading) return <div className="text-center py-10">로딩 중...</div>;
  if (!plan)
    return <div className="text-center py-10 text-red-500">요금제 정보를 불러올 수 없습니다.</div>;

  const infoItems = [
    { img: dataImg, label: '데이터', value: plan.infos?.[0] || '-' },
    { img: shareImg, label: '공유데이터', value: plan.infos?.[1] || '-' },
    { img: callImg, label: '음성통화', value: plan.benefits?.['음성통화'] || '-' },
    { img: messageImg, label: '문자메세지', value: plan.benefits?.['문자메시지'] || '-' },
    { img: giftImg, label: '추가혜택', value: plan.benefits?.['기본혜택'] || '-' },
  ];

  return (
    <div className=" mt-5 min-h-screen">
      {/*상단 카드 */}
      <div className="bg-white rounded-[16px] h-[130px] shadow-[0_0_4px_rgba(0,0,0,0.25)] p-3 max-w-[1440px] mx-auto">
        <div className="flex items-center space-x-4">
          <div className=" overflow-hidden flex-shrink-0">
            <img
              src={getImageUrl(plan.imagePath)}
              alt={plan.name}
              className="w-[105px] h-[105px] rounded-[9.4px] object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="m-heading-3 font-700 text-blac text-gray-900 mb-2">{plan.name}</h1>
            <div className="grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1">
              <span className="m-body-small font-700 text-gray-700">
                월 {formatter.price(plan.price_value)}
              </span>
              <br />
              <span className="m-body-small font-700 text-pink-700text-sm text-gray-600">
                약정 할인 시
              </span>
              <span className="m-body-small font-700 text-pink-700">
                {formatter.price(plan.sale_price_value)}
              </span>
            </div>
            <p className="m-body-add font-400 text-gray-00 mt-1">부가세 포함 금액</p>
          </div>
        </div>
      </div>

      {/* 정보 카드 리스트 */}
      <div className="mt-4 flex flex-col gap-4">
        {infoItems.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-[0_0_4px_rgba(0,0,0,0.25)]"
          >
            <img src={item.img} alt={item.label} className="w-[32px] h-[32px]" />
            <div>
              <div className="m-body-small font-500 text-black">{item.label}</div>
              <div className="m-body-add text-gray-700 whitespace-pre-line">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/*  추천 요금제  */}

      <div className="mt-5 max-w-[1440px] mx-auto px-4">
        <h2 className="m-heading-3 font-500 text-black ">비슷한 요금제 추천</h2>

        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {recommendPlans.map((item) => (
            <SwiperSlide key={item._id}>
              <PlanCard
                key={item.name}
                id={item._id}
                imagePath={item.imagePath}
                name={item.name}
                infos={item.infos}
                plan_speed={item.plan_speed}
                price={item.price}
                sale_price={item.sale_price}
                price_value={item.price_value}
                sale_price_value={item.sale_price_value}
                benefits={item.benefits}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 로그인 모달  */}
      <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      {/*  챗봇 & 하단 바  */}
      <ChatbotLauncher onClick={() => setShowLoginModal(true)} behind={showBottomBar} />
      <div
        className={`fixed bottom-0 left-0 w-full bg-white rounded-t-2xl
          shadow-[0_0_4px_rgba(0,0,0,0.25)] z-50 transition-transform duration-300
          ${showBottomBar ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="max-w-[1440px] mx-auto px-4 py-3 space-y-2">
          <div className="flex justify-between">
            <div className="flex flex-col space-y-1">
              <span className="m-heading-3 font-500 text-black">월정액</span>
              <span className="m-heading-3 font-500 text-black">약정 할인 시</span>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <span className="m-heading-3 font-500 text-pink-700">
                월 {formatter.price(plan.price_value)}
              </span>
              <span className="m-body-large font-700 text-gray-900">
                월 {formatter.price(plan.sale_price_value)}
              </span>
            </div>
          </div>
          <div className="flex justify-between space-x-2">
            <button className="flex-1 h-[35px] m-body-medium font-medium text-gray-700 border border-gray-300 rounded-[12px]">
              보관함 추가
            </button>
            <a
              href="https://www.lguplus.com/mobile/plan/mplan/plan-all"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-[35px] m-body-medium text-white bg-pink-600 rounded-[12px] flex items-center justify-center"
            >
              신청 사이트 이동
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDetailPage;
