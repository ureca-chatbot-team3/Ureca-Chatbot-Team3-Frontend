import { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { formatter } from '../utils/formatter';
import { getImageUrl } from '../utils/imageUtils';
import { useAuth } from '../contexts/AuthContext';
import { useBookmark } from '../hooks/useBookmark';
import LoginRequiredModal from './modals/LoginRequiredModal';

const PlanCard = ({
  id,
  imagePath,
  name,
  infos,
  plan_speed,
  price_value,
  sale_price_value,
  benefits = [],
  onBookmarkRemoved,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { isBookmarked, isLoading: bookmarkLoading, toggleBookmark } = useBookmark(id);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(!!imagePath);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const benefitsList = (() => {
    if (Array.isArray(benefits)) {
      // 내부가 이중 배열인지 확인
      if (benefits.length > 0 && Array.isArray(benefits[0])) {
        return benefits.map(([k, v]) => `${k}: ${v}`);
      }
      return benefits;
    } else if (typeof benefits === 'object' && benefits !== null) {
      return Object.entries(benefits).map(([k, v]) => `${k}: ${v}`);
    }
    return [];
  })();

  const infosText = Array.isArray(infos) ? infos.join(', ') : infos;
  const imageUrl = getImageUrl(imagePath);

  const handleCompareClick = () => {
    if (id) navigate(`/compare?planId=${id}`);
  };

  const handleBookmarkClick = async () => {
    if (authLoading) return;
    if (!isAuthenticated) return setShowLoginModal(true);

    const result = await toggleBookmark();
    if (result.success) {
      toast.success(result.message);
      if (result.action === 'removed' && onBookmarkRemoved) {
        onBookmarkRemoved(id);
      }
    } else if (result.needsLogin) {
      setShowLoginModal(true);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <div className="w-full max-w-[300px] bg-white rounded-2xl flex flex-col items-center p-4 sm:p-5 box-border shadow-soft-black relative">
        <div className="h-1" />

        {/* 이미지 */}
        <div className="w-full aspect-[246/224] relative rounded-[20px] overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: imageLoading ? 0 : 1 }}
            onLoad={() => {
              setImageLoading(false);
              setImageError(false);
            }}
            onError={() => {
              setImageLoading(false);
              if (!imageError) setImageError(true);
            }}
          />
        </div>

        <div className="h-4" />

        {/* 이름 */}
        <h2 className="heading-3 font-700 text-black text-center w-full h-[48px] overflow-hidden text-ellipsis break-words line-clamp-2">
          {name || '\u00A0'}
        </h2>

        <div className="h-5" />
        <div className="w-full border-t border-gray-500" />
        <div className="h-2.5" />

        {/* infos, plan_speed */}
        <div className="flex flex-col items-start w-full px-1 space-y-1">
          <div className="w-full h-[24px] overflow-hidden text-ellipsis whitespace-nowrap break-words heading-3 font-500 text-black">
            {infosText}
          </div>
          <div className="w-full h-[24px] overflow-hidden text-ellipsis whitespace-nowrap break-words heading-3 font-500 text-black">
            {plan_speed || '\u00A0'}
          </div>
        </div>

        <div className="h-5" />

        {/* 가격 */}
        <div className="flex flex-col w-full space-y-2 px-1">
          <div className="flex justify-between items-center w-full">
            <span className="body-large font-500 text-gray-700">월정액</span>
            <span className="body-large font-500 text-pink-700">
              {formatter.price(price_value)}
            </span>
          </div>

          <div className="flex justify-between items-center w-full">
            <span className="body-large font-500 text-gray-700">약정할인가</span>
            <span className="body-large font-500 text-gray-700">
              {formatter.price(sale_price_value)}
            </span>
          </div>
        </div>

        <div className="h-2.5" />
        <div className="w-full border-t border-gray-500" />
        <div className="h-2.5" />

        {/* 혜택 */}
        <div className="flex flex-col items-start w-full px-1 min-h-[88px] justify-start">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="w-full py-[1px] h-[22px]">
              <span
                className="body-small font-400 text-black block w-full overflow-hidden text-ellipsis whitespace-nowrap break-words"
                title={benefitsList[i]}
              >
                {benefitsList[i] || '\u00A0'}
              </span>
            </div>
          ))}
        </div>

        <div className="h-4" />

        {/* 버튼 영역 */}
        <div className="flex flex-nowrap justify-center gap-2 w-full overflow-hidden">
          <button
            type="button"
            onClick={(e) => {
              const currentPath = window.location.pathname;
              const targetPath = `/plans/${encodeURIComponent(id)}`;

              if (currentPath === targetPath) {
                window.location.reload();
              } else {
                navigate(targetPath);
              }
            }}
            className="w-[120px] h-[38px] rounded-[5px] border border-gray-700 bg-white body-medium font-500 text-gray-700 hover:border-pink-700 hover:bg-pink-200 hover:text-pink-700 transition-colors"
          >
            자세히 보기
          </button>

          <button
            onClick={handleCompareClick}
            className="w-[78px] h-[38px] rounded-[5px] border border-pink-700 bg-white body-medium font-500 text-pink-700 hover:bg-pink-50 transition-colors"
          >
            비교하기
          </button>

          <button
            onClick={handleBookmarkClick}
            disabled={bookmarkLoading || authLoading}
            className={`w-[45px] h-[38px] rounded-[5px] flex items-center justify-center transition-all duration-200 ${
              isBookmarked ? 'bg-pink-700 hover:bg-pink-500' : 'bg-gray-700 hover:bg-pink-700'
            } ${bookmarkLoading || authLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {bookmarkLoading || authLoading ? (
              <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : isBookmarked ? (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <img src="/cart2Icon.svg" alt="장바구니" className="w-[20px] h-[20px] mr-[2px]" />
            )}
          </button>
        </div>
      </div>

      <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default memo(PlanCard);
