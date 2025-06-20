const PlanCard = ({ imagePath, name, infos, plan_speed, price, sale_price, benefits = [] }) => {
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatter } from '../utils/formatter';
import { getImageUrl } from '../utils/imageUtils';

const PlanCard = ({
  id,
  imagePath,
  name,
  infos,
  plan_speed,
  price,
  sale_price,
  price_value,
  sale_price_value,
  benefits = [],
}) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(!!imagePath); // imagePath가 있을 때만 로딩 상태로 시작
  // benefits가 객체인 경우 배열로 변환
  const benefitsList = React.useMemo(() => {
    if (Array.isArray(benefits)) {
      return benefits;
    }
    if (typeof benefits === 'object' && benefits !== null) {
      return Object.entries(benefits).map(([key, value]) => `${key}: ${value}`);
    }
    return [];
  }, [benefits]);

  // infos가 배열인 경우 문자열로 변환
  const infosText = Array.isArray(infos) ? infos.join(', ') : infos;

  // 비교 페이지로 이동하는 함수
  const handleCompareClick = () => {
    if (id) {
      navigate(`/compare?planId=${id}`);
    }
  };

  // 이미지 URL 처리
  const imageUrl = getImageUrl(imagePath);

  return (
    <div className="w-[300px] h-[592px] bg-white rounded-[20px] flex flex-col items-center p-4 box-border shadow-soft-black">
      <div className="h-[24px]" />

      {/* 이미지 */}
      <div className="w-[246px] h-[224px] rounded-[20px] overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
        {!imagePath || imageError ? (
          // 이미지 경로가 없거나 에러 상태일 때 대체 UI 표시
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm font-medium">이미지 없음</p>
            </div>
          </div>
        ) : (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}
            <img
              src={imageUrl}
              alt={name}
              className="w-[246px] h-[224px] object-cover transition-opacity duration-200"
              style={{
                opacity: imageLoading ? 0 : 1,
                minWidth: '246px',
                minHeight: '224px',
                maxWidth: '246px',
                maxHeight: '224px',
              }}
              onLoad={() => {
                setImageLoading(false);
                setImageError(false);
              }}
              onError={(e) => {
                setImageLoading(false);
                if (!imageError) {
                  setImageError(true);
                }
              }}
            />
          </>
        )}
      </div>
      <div className="h-[22px]" />

      {/* 이름 */}
      <h2 className="heading-3 font-700 text-black">{name}</h2>
      <div className="h-[25px]" />
      <div className="w-full border-t border-gray-500" />
      <div className="h-[10px]" />

      {/* infos, plan_speed */}
      <div className="flex flex-col items-start w-full px-1">
        <span className="heading-3 font-500 text-black">{infosText}</span>
        {plan_speed && <span className="heading-3 font-500 text-black">{plan_speed}</span>}
      </div>
      <div className="h-[20px]" />

      {/* price, sale_price */}
      <div className="flex flex-col w-full space-y-2 px-1">
        <div className="flex justify-between items-center w-full">
          <span className="body-large font-500 text-gray-600">월정액</span>
          <span className="body-large font-500 text-pink-600">{formatter.price(price_value)}</span>
        </div>

        <div className="flex justify-between items-center w-full">
          <span className="body-large font-500 text-gray-600">약정할인가</span>
          <span className="body-large font-500 text-gray-800">
            {formatter.price(sale_price_value)}
          </span>
        </div>
      </div>

      <div className="h-[10px]" />
      <div className="w-full border-t border-gray-500" />
      <div className="h-[10px]" />

      {/* benefits */}
      <div className="flex flex-col items-start w-full px-1">
        {benefitsList.slice(0, 3).map((benefit, index) => (
          <div key={index} className="w-full py-[2px] mb-[2px] last:mb-0">
            <span
              className="body-small font-400 text-black"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {benefit}
            </span>
          </div>
        ))}
        {benefitsList.length > 3 && (
          <div className="py-[2px]">
            <span className="body-small font-300 text-gray-500">...</span>
          </div>
        )}
      </div>
      <div className="h-[25px]" />

      {/* 버튼 영역 */}
      <div className="flex items-center justify-center gap-[8px]">
        {/* 자세히 보기 버튼 */}
        <button className="w-[120px] h-[38px] rounded-[5px] border border-gray-700 bg-white body-medium font-500 text-gray-700 cursor-pointer">
          자세히 보기
        </button>

        {/* 비교하기 버튼 */}
        <button
          onClick={handleCompareClick}
          className="w-[78px] h-[38px] rounded-[5px] border border-pink-600 bg-white body-medium font-500 text-pink-600 cursor-pointer hover:bg-pink-50 transition-colors"
        >
          비교하기
        </button>

        {/* 장바구니 버튼 */}
        <button className="w-[45px] h-[38px] rounded-[5px] bg-gray-700 flex items-center justify-center cursor-pointer">
          <img src="/src/assets/svg/cart2Icon.svg" alt="장바구니" className="w-[20px] h-auto" />
        </button>
      </div>

      <div className="h-[24px]" />
    </div>
  );
};

export default PlanCard;
