import React, { useState, useRef, useEffect } from 'react';
import { getImageUrl } from '../utils/imageUtils';

const CompareDropdown = ({
  selectedPlan,
  availablePlans,
  bookmarkedPlans,
  onPlanSelect,
  isLoggedIn,
  index,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // 클릭 외부 영역 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 검색 필터링
  const filteredPlans = availablePlans.filter(
    (plan) =>
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (plan.infos &&
        plan.infos.some((info) => info.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  // 보관함 요금제 중 검색 조건에 맞는 것들
  const filteredBookmarkedPlans = bookmarkedPlans.filter(
    (plan) =>
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (plan.infos &&
        plan.infos.some((info) => info.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const handlePlanClick = (plan) => {
    onPlanSelect(plan._id, index);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClearSelection = () => {
    onPlanSelect(null, index);
    setIsOpen(false);
  };

  const getDropdownTitle = () => {
    if (index === 0) return '요금제 선택해주세요';
    return '요금제 선택해주세요';
  };

  const getTextColor = () => {
    if (index === 0) return 'text-black';
    return 'text-pink-600';
  };

  const getPlanItemText = (plan, isFromBookmark = false) => {
    if (index === 0) return 'text-black';
    return 'text-pink-600';
  };

  const renderPlanItem = (plan, isFromBookmark = false) => {
    const imageUrl = getImageUrl(plan.imagePath);

    return (
      <div
        key={plan._id}
        onClick={() => handlePlanClick(plan)}
        className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
      >
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 mr-3 flex items-center justify-center overflow-hidden">
          {plan.imagePath ? (
            <img
              src={imageUrl}
              alt={plan.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div
            className="w-full h-full flex items-center justify-center text-gray-400 text-xs"
            style={{ display: plan.imagePath ? 'none' : 'flex' }}
          >
            이미지 없음
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4
              className={`body-medium font-500 truncate ${getPlanItemText(plan, isFromBookmark)}`}
            >
              {plan.name}
            </h4>
            {isFromBookmark && (
              <span className="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full flex-shrink-0">
                보관함
              </span>
            )}
          </div>
          <p className="body-small text-gray-500 truncate">
            {Array.isArray(plan.infos) ? plan.infos.join(', ') : plan.infos || ''}
          </p>
          <p className={`body-small font-500 ${getPlanItemText(plan, isFromBookmark)}`}>
            {plan.sale_price_value
              ? `월 ${plan.sale_price_value.toLocaleString()}원`
              : '가격 정보 없음'}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 선택된 요금제 표시 또는 선택 버튼 */}
      {selectedPlan ? (
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h3 className={`heading-3 font-700 ${getTextColor()}`}>{selectedPlan.name}</h3>
            <button
              onClick={handleClearSelection}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="선택 해제"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
              {selectedPlan.imagePath ? (
                <img
                  src={getImageUrl(selectedPlan.imagePath)}
                  alt={selectedPlan.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className="w-full h-full flex items-center justify-center text-gray-400 text-xs"
                style={{ display: selectedPlan.imagePath ? 'none' : 'flex' }}
              >
                이미지 없음
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="body-small text-gray-600 mb-1">
                {Array.isArray(selectedPlan.infos)
                  ? selectedPlan.infos.join(', ')
                  : selectedPlan.infos || ''}
              </p>
              <p className={`body-medium font-500 ${getTextColor()}`}>
                {selectedPlan.sale_price_value
                  ? `월 ${selectedPlan.sale_price_value.toLocaleString()}원`
                  : '가격 정보 없음'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full mt-3 py-2 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors body-small font-500 text-gray-700"
          >
            다른 요금제 선택
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
        >
          <span className={`body-medium font-500 ${getTextColor()}`}>{getDropdownTitle()}</span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
          {/* 검색 입력 */}
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              placeholder="요금제 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg body-small focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              autoFocus
            />
          </div>

          <div className="max-h-80 overflow-y-auto">
            {/* 로그인 상태이고 보관함 요금제가 있는 경우 */}
            {isLoggedIn && filteredBookmarkedPlans.length > 0 && (
              <>
                <div className="p-3 bg-gray-50 border-b border-gray-200">
                  <h5 className="body-small font-700 text-gray-700">보관함 요금제</h5>
                </div>
                {filteredBookmarkedPlans.map((plan) => renderPlanItem(plan, true))}

                {/* 구분선 */}
                <div className="border-t-2 border-gray-300"></div>
              </>
            )}

            {/* 전체 요금제 목록 */}
            <div className="p-3 bg-gray-50 border-b border-gray-200">
              <h5 className="body-small font-700 text-gray-700">전체 요금제</h5>
            </div>

            {filteredPlans.length > 0 ? (
              filteredPlans.map((plan) => renderPlanItem(plan))
            ) : (
              <div className="p-6 text-center">
                <p className="body-medium text-gray-500">검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareDropdown;
