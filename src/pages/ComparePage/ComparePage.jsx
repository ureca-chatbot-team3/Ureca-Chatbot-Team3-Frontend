import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { planApi } from '../../apis/planApi';
import { useBookmarkContext } from '../../contexts/BookmarkContext';
import { getImageUrl } from '../../utils/imageUtils';
import toast from 'react-hot-toast';

const ComparePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookmarkedPlanIds } = useBookmarkContext();

  // 최대 3개의 요금제를 비교할 수 있도록 설정 (데스크톱) / 모바일은 2개
  const [selectedPlans, setSelectedPlans] = useState([null, null, null]);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  // URL에서 전달된 초기 요금제 ID가 있다면 설정
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialPlanId = searchParams.get('planId');

    if (initialPlanId) {
      fetchPlanDetail(initialPlanId, 0);
    }
  }, [location.search]);

  // 사용 가능한 요금제 목록 가져오기
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await planApi.getPlans({
          limit: 100,
          sortBy: 'name',
          sortOrder: 'asc',
        });

        if (response.success) {
          setAvailablePlans(response.data.plans);
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        console.log(err, '요금제 목록 불러오기 실패');
        setError('요금제 목록을 불러오는데 실패했습니다.');
        toast.error('요금제 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // 특정 요금제 상세 정보 가져오기
  const fetchPlanDetail = async (planId, index) => {
    try {
      // mock 데이터 처리
      if (planId === 'mock-plan-1') {
        const mockPlan = {
          _id: 'mock-plan-1',
          name: '요금제 A',
          infos: '20GB + 100분',
          plan_speed: '5G 초고속',
          price_value: 50000,
          sale_price_value: 40000,
          category: '5G 초고속',
          benefits: {
            음성통화: '무제한',
            문자메시지: '무제한',
            기본혜택: '넷플릭스 3개월 제공',
          },
          brands: ['넷플릭스', '유튜브 프리미엄'],
          iconPath: null,
        };

        const newSelectedPlans = [...selectedPlans];
        newSelectedPlans[index] = mockPlan;
        setSelectedPlans(newSelectedPlans);
        return;
      }

      const response = await planApi.getPlanDetail(planId);
      if (response.success) {
        const newSelectedPlans = [...selectedPlans];
        newSelectedPlans[index] = response.data.plan || response.data;
        setSelectedPlans(newSelectedPlans);
      }
    } catch (err) {
      console.log(err, '요금제 목록 불러오기 실패');
      toast.error('요금제 정보를 불러오는데 실패했습니다.');
    }
  };

  // 요금제 선택 핸들러
  const handlePlanSelect = (planId, index) => {
    if (!planId) {
      const newSelectedPlans = [...selectedPlans];
      newSelectedPlans[index] = null;
      setSelectedPlans(newSelectedPlans);
      setOpenDropdownIndex(null);
      return;
    }

    // 이미 다른 슬롯에서 선택된 요금제인지 확인
    const isAlreadySelected = selectedPlans.some(
      (plan, i) => plan && plan._id === planId && i !== index
    );

    if (isAlreadySelected) {
      toast.error('이미 선택된 요금제입니다.');
      return;
    }

    fetchPlanDetail(planId, index);
    setOpenDropdownIndex(null);
  };

  // 드롭다운 토글
  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  // 요금제 정보 포맷팅 함수
  const formatPrice = (value) => {
    if (value === undefined || value === null || isNaN(value)) {
      return '-';
    }
    return `월 ${value.toLocaleString()}원`;
  };

  const formatDiscountPrice = (value) => {
    if (value === undefined || value === null || isNaN(value)) {
      return { prefix: '월', number: '-', suffix: '원' };
    }
    return {
      prefix: '월',
      number: value.toLocaleString(),
      suffix: '원',
    };
  };

  const formatBenefits = (benefits) => {
    if (!benefits || typeof benefits !== 'object') return {};
    return benefits;
  };

  // 드롭다운 렌더링
  const renderDropdown = (index, isMobile = false) => {
    const plan = selectedPlans[index];
    const isOpen = openDropdownIndex === index;
    const textColor = index === 0 ? 'text-black' : 'text-pink-700';

    return (
      <div className="relative w-full">
        <div
          className={`w-full ${
            isMobile ? 'h-[60px]' : 'h-[100px]'
          } border border-gray-300 rounded-lg px-4 flex items-center cursor-pointer bg-white ${textColor} ${isMobile ? 'min-w-0' : ''}`}
          onClick={() => toggleDropdown(index)}
        >
          {plan ? (
            <>
              {/* 텍스트와 화살표 그룹 */}
              <div className="flex items-center flex-1 min-w-0">
                <span
                  className={`${isMobile ? 'm-body-medium' : 'heading-3'} font-500 ${index === 0 ? 'text-black' : 'text-pink-700'} truncate`}
                >
                  {plan.name}
                </span>
                {!isMobile && (
                  <svg
                    className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''} ${textColor} ml-2`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </div>

              {/* 데스크톱: 아이콘이 오른쪽 끝 / 모바일: 화살표가 오른쪽 끝 */}
              {isMobile ? (
                <svg
                  className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''} ${textColor} flex-shrink-0 ml-auto`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              ) : (
                plan.iconPath && (
                  <img
                    src={getImageUrl(plan.iconPath)}
                    alt={plan.name}
                    className="w-[80px] h-[80px] object-contain flex-shrink-0 ml-auto"
                  />
                )
              )}
            </>
          ) : (
            <>
              {/* 선택되지 않은 상태 */}
              <div className="flex items-center flex-1 min-w-0">
                <span
                  className={`${isMobile ? 'm-body-medium' : 'heading-3'} font-500 text-black truncate`}
                >
                  요금제 선택해주세요
                </span>
                {!isMobile && (
                  <svg
                    className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''} ${textColor} ml-2`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </div>

              {/* 모바일에서만 화살표 오른쪽 끝 */}
              {isMobile && (
                <svg
                  className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''} ${textColor} flex-shrink-0 ml-auto`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </>
          )}
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {/* 북마크된 요금제가 있을 때만 표시 */}
            {availablePlans.filter((plan) => bookmarkedPlanIds.has(plan._id)).length > 0 && (
              <>
                <div className="p-3 border-b border-gray-200">
                  <span
                    className={`${isMobile ? 'm-body-small' : 'body-large'} font-500 text-pink-700`}
                  >
                    저장 목록
                  </span>
                </div>
                {availablePlans
                  .filter((plan) => bookmarkedPlanIds.has(plan._id))
                  .map((availablePlan) => {
                    const isSelected = selectedPlans.some(
                      (plan) => plan && plan._id === availablePlan._id
                    );
                    return (
                      <div
                        key={`bookmarked-${availablePlan._id}`}
                        className={`p-3 border-b border-gray-100 last:border-b-0 ${
                          isSelected
                            ? 'bg-gray-200 cursor-not-allowed'
                            : 'hover:bg-gray-50 cursor-pointer bg-pink-25'
                        }`}
                        onClick={() => !isSelected && handlePlanSelect(availablePlan._id, index)}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm ${isSelected ? 'text-gray-400' : 'text-pink-600'}`}
                          >
                            ★
                          </span>
                          <span
                            className={`${isMobile ? 'm-body-medium' : 'body-medium'} font-700 ${
                              isSelected ? 'text-gray-400' : 'text-black'
                            }`}
                          >
                            {availablePlan.name}
                          </span>
                          {isSelected && !isMobile && (
                            <span
                              className={`${isMobile ? 'm-body-small' : 'body-small'} text-gray-400 ml-auto`}
                            >
                              선택됨
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
            {/* 전체 요금제 */}
            <div className="p-3 border-b border-gray-200">
              <span
                className={`${isMobile ? 'm-body-small' : 'body-large'} font-500 text-gray-700`}
              >
                전체 요금제
              </span>
            </div>
            {availablePlans
              .filter((plan) => !bookmarkedPlanIds.has(plan._id))
              .map((availablePlan) => {
                const isSelected = selectedPlans.some(
                  (plan) => plan && plan._id === availablePlan._id
                );
                return (
                  <div
                    key={availablePlan._id}
                    className={`p-3 border-b border-gray-100 last:border-b-0 ${
                      isSelected
                        ? 'bg-gray-200 cursor-not-allowed'
                        : 'hover:bg-gray-50 cursor-pointer'
                    }`}
                    onClick={() => !isSelected && handlePlanSelect(availablePlan._id, index)}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`${isMobile ? 'm-body-medium' : 'body-medium'} font-700 ${
                          isSelected ? 'text-gray-400' : 'text-black'
                        }`}
                      >
                        {availablePlan.name}
                      </span>
                      {isSelected && !isMobile && (
                        <span
                          className={`${isMobile ? 'm-body-small' : 'body-small'} text-gray-400`}
                        >
                          선택됨
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  };

  // 요금제 상세 정보 렌더링
  const renderPlanDetails = (plan, index, isMobile = false) => {
    const textColor = index === 0 ? 'text-black' : 'text-pink-600';
    const benefits = plan ? formatBenefits(plan.benefits) : {};

    const sectionHeight = isMobile ? 'h-[80px]' : 'h-[120px]';
    const titleClass = isMobile ? 'm-body-medium font-700' : 'heading-3 font-700';
    // const contentClass = isMobile ? 'm-body-small font-500' : 'heading-3 font-500';
    const priceContentClass = isMobile ? 'm-body-medium font-500' : 'heading-3 font-500';
    const largePriceClass = isMobile ? 'm-body-large font-500' : 'heading-1 font-500';

    return (
      <div className={`${isMobile ? 'mt-3' : 'mt-6'}`}>
        {/* 월정액 */}
        <div className={`${sectionHeight} flex flex-col justify-center px-4`}>
          <div className={`flex items-baseline gap-2 ${isMobile ? 'mb-0.5' : 'mb-1'}`}>
            <span className={`${titleClass} text-black`}>월정액</span>
            {!isMobile && (
              <span className="body-medium font-700 text-gray-700">부가세 포함 금액</span>
            )}
          </div>
          <div className={`${priceContentClass} ${textColor}`}>
            {plan ? formatPrice(plan.price_value) : '-'}
          </div>
          <div
            className={`${isMobile ? 'm-body-add' : 'body-small'} font-500 text-gray-700 pt-0.5`}
          >
            정상가
          </div>
        </div>
        <div className="border-t border-gray-200"></div>

        {/* 할인상세내역 */}
        <div className={`${sectionHeight} flex flex-col justify-center px-4`}>
          <div className={`${titleClass} text-black ${isMobile ? 'mb-1' : 'mb-2'}`}>
            약정 할인 시
          </div>
          <div className="flex items-baseline gap-1">
            {plan ? (
              <>
                <span className={`${priceContentClass} ${textColor}`}>
                  {formatDiscountPrice(plan.sale_price_value).prefix}
                </span>
                <span className={`${largePriceClass} ${textColor}`}>
                  {formatDiscountPrice(plan.sale_price_value).number}
                </span>
                <span className={`${priceContentClass} ${textColor}`}>
                  {formatDiscountPrice(plan.sale_price_value).suffix}
                </span>
              </>
            ) : (
              <span className={`${priceContentClass} ${textColor}`}>-</span>
            )}
          </div>
        </div>
        <div className="border-t border-gray-200"></div>

        {/* 데이터 */}
        <div className={`${isMobile ? 'h-[80px]' : 'h-[150px]'} flex flex-col justify-center px-4`}>
          <div className={`${titleClass} text-black ${isMobile ? 'mb-1' : 'mb-2'}`}>데이터</div>
          <div className={`${priceContentClass} ${textColor}`}>
            {plan ? (Array.isArray(plan.infos) ? plan.infos.join(', ') : plan.infos || '-') : '-'}
          </div>
          {plan && plan.plan_speed && (
            <div className={`${isMobile ? 'm-body-add' : 'body-small'} font-400 ${textColor} mt-1`}>
              {plan.plan_speed}
            </div>
          )}
        </div>
        <div className="border-t border-gray-200"></div>

        {/* 데이터 속도 */}
        <div className={`${sectionHeight} flex flex-col justify-center px-4`}>
          <div className={`${titleClass} text-black ${isMobile ? 'mb-1' : 'mb-2'}`}>
            데이터 속도
          </div>
          <div className={`${priceContentClass} ${textColor}`}>
            {plan ? plan.category || '-' : '-'}
          </div>
        </div>
        <div className="border-t border-gray-200"></div>

        {/* 음성통화 */}
        <div className={`${sectionHeight} flex flex-col justify-center px-4`}>
          <div className={`${titleClass} text-black ${isMobile ? 'mb-1' : 'mb-2'}`}>음성통화</div>
          <div className={`${priceContentClass} ${textColor}`}>
            {plan ? benefits['음성통화'] || '-' : '-'}
          </div>
        </div>
        <div className="border-t border-gray-200"></div>

        {/* 문자메시지 */}
        <div className={`${sectionHeight} flex flex-col justify-center px-4`}>
          <div className={`${titleClass} text-black ${isMobile ? 'mb-1' : 'mb-2'}`}>문자메시지</div>
          <div className={`${priceContentClass} ${textColor}`}>
            {plan ? benefits['문자메시지'] || '-' : '-'}
          </div>
        </div>
        <div className="border-t border-gray-200"></div>

        {/* 기본혜택 */}
        <div className={`${sectionHeight} flex flex-col justify-center px-4`}>
          <div className={`${titleClass} text-black ${isMobile ? 'mb-1' : 'mb-2'}`}>기본혜택</div>
          <div className={`${priceContentClass} ${textColor} truncate`}>
            {plan ? benefits['기본혜택'] || '-' : '-'}
          </div>
        </div>
        <div className="border-t border-gray-200"></div>

        {/* 프리미엄 혜택 */}
        <div className={`${isMobile ? 'h-[80px]' : 'h-[150px]'} flex flex-col justify-center px-4`}>
          <div className={`${titleClass} text-black ${isMobile ? 'mb-1' : 'mb-2'}`}>
            프리미엄 혜택
          </div>
          <div className={`${priceContentClass} ${textColor} overflow-hidden`}>
            {plan
              ? Array.isArray(plan.brands) && plan.brands.length > 0
                ? plan.brands.join(', ')
                : '-'
              : '-'}
          </div>
        </div>
        <div className="border-t border-gray-200"></div>

        {/* 요금제 상세보기 버튼 */}
        <div className={`${isMobile ? 'pt-3' : 'pt-6'}`}>
          <button
            className="group w-full py-3 border border-gray-300 rounded-lg bg-white hover:border-pink-700 hover:bg-pink-200 transition-colors"
            onClick={() => navigate(`/plans/${plan._id}`)}
          >
            <span
              className={`${isMobile ? 'm-body-medium' : 'heading-3'} font-500 text-gray-700 group-hover:text-pink-700 transition-colors`}
            >
              요금제 상세보기
            </span>
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="m-body-large text-gray-700 md:body-large">요금제 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="m-body-large text-red-600 mb-4 md:body-large">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      {/* 모바일 레이아웃 */}
      <div className="md:hidden px-[20px] py-[32px] md:py-[60px] max-w-[430px] mx-auto">
        {/* 모바일 제목 */}
        <div className="mb-[20px]">
          <h1 className="m-heading-2 font-700 text-black text-center">요금제를 비교해보세요</h1>
        </div>

        {/* 모바일 2개 요금제 비교 */}
        <div className="flex gap-[10px] w-full">
          {[0, 1].map((index) => (
            <div key={index} className="flex-1 min-w-0 max-w-[50%]">
              <div className="bg-white rounded-[16px] p-[12px] shadow-soft-black w-full overflow-hidden">
                {/* 모바일 드롭다운 */}
                {renderDropdown(index, true)}

                {/* 모바일 요금제 상세 정보 */}
                {renderPlanDetails(selectedPlans[index], index, true)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 데스크톱 레이아웃 */}
      <div className="hidden md:block">
        <div className="max-w-[1440px] mx-auto px-0 py-[32px] md:py-[60px]">
          {/* 데스크톱 제목 */}
          <div className="mb-8">
            <h1 className="heading-1 font-700 text-black">요금제를 비교해보세요</h1>
          </div>

          {/* 데스크톱 3개 요금제 비교 */}
          <div className="flex gap-9">
            {[0, 1, 2].map((index) => (
              <div key={index} className="w-[454px]">
                <div className="bg-white rounded-[20px] p-6 shadow-soft-black">
                  {/* 데스크톱 드롭다운 */}
                  {renderDropdown(index, false)}

                  {/* 데스크톱 요금제 상세 정보 */}
                  {renderPlanDetails(selectedPlans[index], index, false)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
