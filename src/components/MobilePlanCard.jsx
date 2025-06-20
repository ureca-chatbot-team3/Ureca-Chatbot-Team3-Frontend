import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatter } from '../utils/formatter';
import { getImageUrl } from '../utils/imageUtils';

const MobilePlanCard = ({
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
  isLarge = false, // 진단결과 페이지에서 확대 여부
}) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(!!imagePath);

  // 크기에 따른 스타일 설정
  const cardStyles = isLarge
    ? {
        container: 'w-[220px] h-[437px]',
        spacing: {
          top: 'h-[15px]',
          afterImage: 'h-[16px]',
          afterTitle: 'h-[16px]',
          afterInfo: 'h-[16px]',
          afterPrice: 'h-[8px]',
          afterBenefits: 'h-[16px]',
          bottom: 'h-[15px]',
        },
        image: 'w-[180px] h-[164px]',
        buttons: {
          detail: 'w-[88px] h-[28px]',
          compare: 'w-[58px] h-[28px]',
          cart: 'w-[34px] h-[28px]',
          icon: 'w-[14px]',
          gap: 'gap-[6px]',
        },
        text: {
          title: 'm-body-large',
          info: 'm-body-medium',
          price: 'm-body-medium',
          benefit: 'm-body-small',
          button: 'text-xs',
        },
      }
    : {
        container: 'w-[164px] h-[326px]',
        spacing: {
          top: 'h-[12px]',
          afterImage: 'h-[12px]',
          afterTitle: 'h-[12px]',
          afterInfo: 'h-[12px]',
          afterPrice: 'h-[6px]',
          afterBenefits: 'h-[12px]',
          bottom: 'h-[12px]',
        },
        image: 'w-[134px] h-[122px]',
        buttons: {
          detail: 'w-[66px] h-[21px]',
          compare: 'w-[43px] h-[21px]',
          cart: 'w-[25px] h-[21px]',
          icon: 'w-[10px]',
          gap: 'gap-[4px]',
        },
        text: {
          title: 'm-body-medium',
          info: 'm-body-small',
          price: 'm-body-small',
          benefit: 'text-xs',
          button: 'text-xs',
        },
      };

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

  // 이미지 크기 추출 함수
  const getImageSize = (sizeClass) => {
    const widthMatch = sizeClass.match(/w-\[(\d+)px\]/);
    const heightMatch = sizeClass.match(/h-\[(\d+)px\]/);
    return {
      width: widthMatch ? widthMatch[1] + 'px' : 'auto',
      height: heightMatch ? heightMatch[1] + 'px' : 'auto',
    };
  };

  const imageSize = getImageSize(cardStyles.image);

  return (
    <div
      className={`${cardStyles.container} bg-white rounded-[16px] flex flex-col items-center p-3 box-border shadow-soft-black`}
    >
      <div className={cardStyles.spacing.top} />

      {/* 이미지 */}
      <div
        className={`${cardStyles.image} rounded-[16px] overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0`}
      >
        {!imagePath || imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-400">
              <svg
                className={`${isLarge ? 'w-12 h-12' : 'w-8 h-8'} mx-auto mb-2`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className={`${cardStyles.text.button} font-medium`}>이미지 없음</p>
            </div>
          </div>
        ) : (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                <svg
                  className={`${isLarge ? 'w-6 h-6' : 'w-4 h-4'} animate-spin`}
                  fill="none"
                  viewBox="0 0 24 24"
                >
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
              className={`${cardStyles.image} object-cover transition-opacity duration-200`}
              style={{
                opacity: imageLoading ? 0 : 1,
                minWidth: imageSize.width,
                minHeight: imageSize.height,
                maxWidth: imageSize.width,
                maxHeight: imageSize.height,
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
      <div className={cardStyles.spacing.afterImage} />

      {/* 이름 */}
      <h2 className={`${cardStyles.text.title} font-700 text-black text-center leading-tight`}>
        {name}
      </h2>
      <div className={cardStyles.spacing.afterTitle} />
      <div className="w-full border-t border-gray-500" />
      <div className={cardStyles.spacing.afterInfo} />

      {/* infos, plan_speed */}
      <div className="flex flex-col items-start w-full px-1">
        <span className={`${cardStyles.text.info} font-500 text-black`}>{infosText}</span>
        {plan_speed && (
          <span className={`${cardStyles.text.info} font-500 text-black`}>{plan_speed}</span>
        )}
      </div>
      <div className={cardStyles.spacing.afterInfo} />

      {/* price, sale_price */}
      <div className="flex flex-col w-full space-y-1 px-1">
        <div className="flex justify-between items-center w-full">
          <span className={`${cardStyles.text.price} font-500 text-gray-600`}>월정액</span>
          <span className={`${cardStyles.text.price} font-500 text-pink-600`}>
            {formatter.price(price_value)}
          </span>
        </div>

        <div className="flex justify-between items-center w-full">
          <span className={`${cardStyles.text.price} font-500 text-gray-600`}>약정할인가</span>
          <span className={`${cardStyles.text.price} font-500 text-gray-800`}>
            {formatter.price(sale_price_value)}
          </span>
        </div>
      </div>

      <div className={cardStyles.spacing.afterPrice} />
      <div className="w-full border-t border-gray-500" />
      <div className={cardStyles.spacing.afterPrice} />

      {/* benefits */}
      <div className="flex flex-col items-start w-full px-1">
        {benefitsList.slice(0, 3).map((benefit, index) => (
          <div key={index} className="w-full py-[1px] mb-[1px] last:mb-0">
            <span
              className={`${cardStyles.text.benefit} font-400 text-black`}
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
          <div className="py-[1px]">
            <span className={`${cardStyles.text.benefit} font-300 text-gray-500`}>...</span>
          </div>
        )}
      </div>
      <div className={cardStyles.spacing.afterBenefits} />

      {/* 버튼 영역 */}
      <div className={`flex items-center justify-center ${cardStyles.buttons.gap}`}>
        {/* 자세히 보기 버튼 */}
        <button
          className={`${cardStyles.buttons.detail} rounded-[4px] border border-gray-700 bg-white ${cardStyles.text.button} font-500 text-gray-700 cursor-pointer`}
        >
          자세히 보기
        </button>

        {/* 비교하기 버튼 */}
        <button
          onClick={handleCompareClick}
          className={`${cardStyles.buttons.compare} rounded-[4px] border border-pink-600 bg-white ${cardStyles.text.button} font-500 text-pink-600 cursor-pointer hover:bg-pink-50 transition-colors`}
        >
          비교하기
        </button>

        {/* 장바구니 버튼 */}
        <button
          className={`${cardStyles.buttons.cart} rounded-[4px] bg-gray-700 flex items-center justify-center cursor-pointer`}
        >
          <img
            src="/src/assets/svg/cart2Icon.svg"
            alt="장바구니"
            className={`${cardStyles.buttons.icon} h-auto`}
          />
        </button>
      </div>

      <div className={cardStyles.spacing.bottom} />
    </div>
  );
};

export default MobilePlanCard;
