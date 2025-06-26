import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { planApi } from '../../apis/planApi';
import { formatter } from '@/utils/formatter';
import { getImageUrl } from '@/utils/imageUtils';
import dataImg from '@/assets/images/data.png';
import shareImg from '@/assets/images/share.png';
import callImg from '@/assets/images/call.png';
import messageImg from '@/assets/images/message.png';
import giftImg from '@/assets/images/gift.png';
import PlanCard from '@/components/PlanCard';
import DetailAccordion from './DetailAccordion';
import { useAuth } from '@/contexts/AuthContext';
import { useBookmark } from '@/hooks/useBookmark';
import { toast } from 'react-hot-toast';
import LoginRequiredModal from '@/components/modals/LoginRequiredModal';

const DetailPage = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [recommendPlans, setRecommendPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { isBookmarked, isLoading: bookmarkLoading, toggleBookmark } = useBookmark(id);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPlanDetail = async () => {
      try {
        const response = await planApi.getPlanDetail(id);
        const onlyPlan = response?.data?.plan;
        setPlan(onlyPlan);
      } catch (err) {
        setError('요금제 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlanDetail();
  }, [id]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await planApi.getRecommendedPlans({ baseId: id });
        setRecommendPlans(res?.data?.recommendedPlans || []);
      } catch (err) {
        // 추천 요금제 조회 실패
      }
    };

    if (id) fetchRecommendations();
  }, [id]);

  const handleBookmarkClick = async () => {
    if (authLoading) return;
    if (!isAuthenticated) return setShowLoginModal(true);

    const result = await toggleBookmark();
    if (result.success) {
      toast.success(result.message);
    } else if (result.needsLogin) {
      setShowLoginModal(true);
    } else {
      toast.error(result.message);
    }
  };

  if (loading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  if (error || !plan) {
    return <div className="text-center py-10 text-red-600">{error || '데이터 없음'}</div>;
  }

  const infoItems = [
    { img: dataImg, label: '데이터', value: plan.infos?.[0] || '-' },
    { img: shareImg, label: '공유데이터', value: plan.infos?.[1] || '-' },
    { img: callImg, label: '음성통화', value: plan.benefits?.['음성통화'] || '-' },
    { img: messageImg, label: '문자메세지', value: plan.benefits?.['문자메시지'] || '-' },
    { img: giftImg, label: '추가혜택', value: plan.benefits?.['기본혜택'] || '-' },
  ];

  return (
    <div className="px-10 py-[32px] md:py-[60px]">
      {/* 상단 박스 */}
      <div className="w-full h-[174px] bg-white rounded-[20px] px-[22px] flex items-center justify-between shadow-soft-black">
        <div className="flex items-center gap-[22px]">
          <div className="w-[130px] h-[130px] rounded-[20px] overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={getImageUrl(plan.imagePath)}
              alt={plan.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-y-6">
            <div className="heading-1 font-500 text-black mb-[12px]">{plan.name}</div>
            <div className="flex gap-2">
              {/* 신청 사이트 이동 버튼 */}
              <a
                href="https://www.lguplus.com/mobile/plan/mplan/plan-all"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-[16px] bg-pink-700 text-white body-small font-500 inline-flex items-center justify-center"
              >
                신청 사이트 이동
              </a>

              {/* 보관함 추가/삭제 버튼 */}
              <button
                onClick={handleBookmarkClick}
                disabled={bookmarkLoading || authLoading}
                className={`px-4 py-2 rounded-[16px] body-small font-500 transition-colors duration-200 ${
                  isBookmarked
                    ? 'bg-pink-700 text-white hover:bg-pink-500'
                    : 'bg-gray-500 text-black hover:bg-pink-700 hover:text-white'
                } ${bookmarkLoading || authLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {bookmarkLoading || authLoading
                  ? '로딩중...'
                  : isBookmarked
                    ? '보관함 삭제'
                    : '보관함 추가'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-center gap-y-3 text-right">
          <div className="heading-1 font-500 text-black">
            {plan.price_value ? `월 ${formatter.price(plan.price_value)}` : '-'}
          </div>
          <div className="heading-3 font-500 text-black">
            약정 할인 시{' '}
            <span className="text-pink-700">
              {plan.sale_price_value ? `월 ${formatter.price(plan.sale_price_value)}` : '-'}
            </span>
          </div>
          <div className="body-small font-300 text-gray-700">부가세 포함 금액</div>
        </div>
      </div>

      {/* 하단 정보 박스 5개 */}
      <div className="h-[220px] mt-10 grid grid-cols-5 gap-x-10">
        {infoItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-white rounded-[20px] px-6 py-[20px] shadow-soft-black gap-y-3"
          >
            <img src={item.img} alt={item.label} className="w-[48px] h-[48px]" />
            <span className="heading-3 text-black font-500">{item.label}</span>
            <span className="body-small text-gray-700 font-300 text-center whitespace-pre-line">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* 추천 요금제 */}
      <div className="mt-20">
        <h2 className="heading-1 font-500 text-black mb-10">비슷한 요금제 추천</h2>
        <div className="grid grid-cols-4 gap-6">
          {recommendPlans.map((item) => (
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
          ))}
        </div>
      </div>

      {/* 상세정보 아코디언 */}
      <DetailAccordion />

      {/* 로그인 필요 모달 */}
      <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
};

export default DetailPage;
