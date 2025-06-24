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

  const [selectedPlans, setSelectedPlans] = useState([null, null, null]);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialPlanId = searchParams.get('planId');

    if (initialPlanId) {
      fetchPlanDetail(initialPlanId, 0);
    }
  }, [location.search]);

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

  const fetchPlanDetail = async (planId, index) => {
    try {
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
      console.log(err, '요금제 상세정보 불러오기 실패');
      toast.error('요금제 정보를 불러오는데 실패했습니다.');
    }
  };

  const handlePlanSelect = (planId, index) => {
    if (!planId) {
      const newSelectedPlans = [...selectedPlans];
      newSelectedPlans[index] = null;
      setSelectedPlans(newSelectedPlans);
      setOpenDropdownIndex(null);
      return;
    }

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

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const formatPrice = (value) => {
    if (value === undefined || value === null || isNaN(value)) {
      return '-';
    }
    return `월 ${value.toLocaleString()}원`;
  };

  // eslint-disable-next-line no-unused-vars
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

  const renderDropdown = (index, isMobile = false) => {
    const plan = selectedPlans[index];
    const isOpen = openDropdownIndex === index;
    const textColor = index === 0 ? 'text-black' : 'text-pink-700';

    return (
      <div className="relative w-full">
        <div
          className={`w-full ${isMobile ? 'h-[80px]' : 'h-[150px]'} border border-gray-300 rounded-lg px-4 flex items-center cursor-pointer bg-white ${textColor} ${isMobile ? 'min-w-0' : ''}`}
          onClick={() => toggleDropdown(index)}
        >
          {plan ? (
            <>
              <div className="flex items-center flex-1 min-w-0">
                <span
                  className={`${isMobile ? 'm-body-medium' : 'heading-3'} font-500 ${textColor} truncate`}
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
                            className={`${isMobile ? 'm-body-medium' : 'body-medium'} font-700 ${isSelected ? 'text-gray-400' : 'text-black'}`}
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
                        className={`${isMobile ? 'm-body-medium' : 'body-medium'} font-700 ${isSelected ? 'text-gray-400' : 'text-black'}`}
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

  const renderPlanDetails = (plan, index, isMobile = false) => {
    const textColor = index === 0 ? 'text-black' : 'text-pink-600';
    const benefits = plan ? formatBenefits(plan.benefits) : {};

    const sectionHeight = isMobile ? 'h-[80px]' : 'h-[120px]';
    const titleClass = isMobile ? 'm-body-medium font-700' : 'heading-3 font-700';
    const contentClass = isMobile ? 'm-body-small font-500' : 'heading-3 font-500';
    const sectionBorderClass = 'border-b border-gray-300';

    if (!plan) {
      return (
        <div className={`flex flex-col justify-center items-center h-full ${textColor}`}>
          <span className={titleClass}>요금제를 선택해주세요</span>
        </div>
      );
    }

    return (
      <div
        className={`flex flex-col justify-between ${sectionHeight} ${sectionBorderClass} px-4 py-2 bg-white rounded-xl shadow-md min-w-[300px]`}
      >
        {/* 요금 */}
        <div className="flex justify-between items-center mb-1">
          <span className={`${titleClass}`}>요금</span>
          <div className="flex items-center gap-1">
            <span className={`${contentClass} line-through text-gray-400`}>
              {formatPrice(plan.price_value)}
            </span>
            <span className={`${contentClass} ${textColor}`}>
              {formatPrice(plan.sale_price_value)}
            </span>
          </div>
        </div>

        {/* 혜택 예시 */}
        {plan.benefits && (
          <div className="flex flex-col gap-1">
            {Object.entries(benefits).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className={`${contentClass} text-gray-500`}>{key}</span>
                <span className={`${contentClass} ${textColor}`}>{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* 상세보기 버튼 */}
        <button
          className={`mt-3 py-2 px-4 rounded-lg border ${textColor} border-current font-600 hover:bg-pink-100 transition`}
          onClick={() => navigate(`/detail/${plan._id}`)}
        >
          자세히 보기
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center text-gray-400">로딩중...</div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center text-red-500">{error}</div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <h1 className="heading-2 font-700 mb-6">요금제 비교하기</h1>
      <div className="flex flex-col gap-10">
        {selectedPlans.map((plan, index) => (
          <div key={index} className="flex flex-col gap-3">
            {/* 드롭다운 */}
            {renderDropdown(index)}

            {/* 상세정보 */}
            {renderPlanDetails(plan, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparePage;
