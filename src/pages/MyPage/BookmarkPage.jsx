import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { planApi } from '../../apis/planApi';
import { useAuth } from '../../contexts/AuthContext';
import { useBookmarkContext } from '../../contexts/BookmarkContext';
import MyPageSidebar from './components/MyPageSidebar';
import PlanCard from '../../components/PlanCard';

import EmptyImage from '@/assets/svg/empty.svg';
import NoticeIcon from '@/assets/svg/notice.svg';

const BookmarkPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { bookmarkedPlanIds, isLoading: contextLoading, hasLoaded } = useBookmarkContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 메뉴 토글 핸들러
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 메뉴 아이템 클릭 핸들러
  const handleMenuClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  // 보관함 데이터 조회 (상세 정보 포함)
  const fetchBookmarkDetails = async () => {
    if (!isAuthenticated || !hasLoaded) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await planApi.getBookmarkedPlans();
      setBookmarks(response.data.bookmarks || []);
    } catch (err) {
      console.error('보관함 조회 오류:', err);
      setError('보관함을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 또는 hasLoaded 변경 시 데이터 조회
  useEffect(() => {
    fetchBookmarkDetails();
  }, [isAuthenticated, hasLoaded]);

  // 요금제 보러가기 버튼 핸들러
  const handleViewPlans = () => {
    navigate('/plans');
  };

  // 재시도 핸들러
  const handleRetry = () => {
    fetchBookmarkDetails();
  };

  // 보관함에서 요금제 제거 시 목록 업데이트
  const handleBookmarkRemoved = (planId) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((bookmark) => bookmark.plan._id !== planId)
    );
  };

  // 로딩 상태 (컴텍스트 로딩 또는 데이터 로딩)
  if (contextLoading || isLoading) {
    return (
      <>
        {/* 모바일 로딩 */}
        <div className="md:hidden">
          <main className="min-h-screen bg-gray-200 px-[20px] py-[20px]">
            <div className="max-w-[430px] mx-auto">
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-700 mb-4"></div>
                  <p className="m-body-large font-400 text-gray-700">
                    보관함을 불러오고 있습니다...
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
        {/* 데스크톱 로딩 */}
        <div className="hidden md:block">
          <main className="max-w-[1440px] mx-auto py-[60px]">
            <div className="flex">
              <MyPageSidebar />
              <div className="flex-1">
                <h2 className="heading-1 font-500 text-black mb-[44px]">요금제 보관함</h2>
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-700 mb-4"></div>
                  <p className="body-large font-400 text-gray-700">보관함을 불러오고 있습니다...</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <>
        {/* 모바일 에러 */}
        <div className="md:hidden">
          <main className="min-h-screen bg-gray-200 px-[20px] py-[20px]">
            <div className="max-w-[430px] mx-auto">
              <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="text-red-500 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="m-body-large font-500 text-red-600 mb-6">{error}</p>
                <button
                  onClick={handleRetry}
                  className="py-[16px] px-[24px] bg-pink-700 text-white rounded-[8px] m-body-medium font-500 hover:bg-pink-500 transition-colors"
                >
                  다시 시도
                </button>
              </div>
            </div>
          </main>
        </div>
        {/* 데스크톱 에러 */}
        <div className="hidden md:block">
          <main className="max-w-[1440px] mx-auto py-[60px]">
            <div className="flex">
              <MyPageSidebar />
              <div className="flex-1">
                <h2 className="heading-1 font-500 text-black mb-[44px]">요금제 보관함</h2>
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                  <div className="text-red-500 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="body-large font-500 text-red-600 mb-6">{error}</p>
                  <button
                    onClick={handleRetry}
                    className="w-[160px] h-[47px] bg-pink-700 text-white rounded-[16px] body-large font-500 hover:bg-pink-500 transition-colors"
                  >
                    다시 시도
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      {/* 모바일 레이아웃 (md 미만) */}
      <div className="md:hidden">
        <main className="min-h-screen bg-gray-200 py-[20px]">
          <div className="max-w-[430px] mx-auto">
            {/* 마이페이지 타이틀과 드롭다운 화살표 */}
            <div className="flex items-center justify-between pb-[16px]">
              <h1 className="m-heading-2 font-700 text-black">마이페이지</h1>
              <button
                onClick={toggleMenu}
                className="p-[8px] cursor-pointer"
                aria-label="메뉴 토글"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'transform rotate-180' : ''
                  }`}
                >
                  <path
                    d="M14.3517 3.636C14.1642 3.44853 13.9099 3.34321 13.6447 3.34321C13.3796 3.34321 13.1253 3.44853 12.9377 3.636L7.98774 8.586L3.03774 3.636C2.84914 3.45384 2.59654 3.35305 2.33434 3.35533C2.07215 3.3576 1.82133 3.46277 1.63593 3.64818C1.45052 3.83359 1.34535 4.0844 1.34307 4.3466C1.34079 4.6088 1.44159 4.8614 1.62374 5.05L7.28075 10.707C7.46827 10.8945 7.72258 10.9998 7.98774 10.9998C8.25291 10.9998 8.50722 10.8945 8.69474 10.707L14.3517 5.05C14.5392 4.86247 14.6445 4.60816 14.6445 4.343C14.6445 4.07784 14.5392 3.82353 14.3517 3.636Z"
                    fill="#6B6B6B"
                  />
                </svg>
              </button>
            </div>

            {/* 마이페이지 아래 굵은 선 */}
            <div className="w-full h-[2px] bg-black"></div>

            {/* 드롭다운 메뉴 - 애니메이션 적용 */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pb-[16px]">
                {/* 개인정보 수정 */}
                <div
                  className="py-[12px] cursor-pointer"
                  onClick={() => handleMenuClick('/mypage')}
                >
                  <span className="m-body-large font-500 text-black">개인정보 수정</span>
                </div>
                {/* 개인정보 수정 아래 얇은 선 */}
                <div className="w-full h-[1px] bg-gray-500"></div>

                {/* 요금제 보관함 */}
                <div className="py-[12px]">
                  <span className="m-body-large font-500 text-pink-700">요금제 보관함</span>
                </div>
                {/* 요금제 보관함 아래 얇은 선 */}
                <div className="w-full h-[1px] bg-gray-500"></div>

                {/* 챗봇 상담 내역 */}
                <div
                  className="py-[12px] cursor-pointer"
                  onClick={() => handleMenuClick('/mypage/chat-history')}
                >
                  <span className="m-body-large font-500 text-black">챗봇 상담 내역</span>
                </div>
                {/* 마지막 페이지 아래 굵은 선 */}
                <div className="w-full h-[2px] bg-black"></div>
              </div>
            </div>

            {/* 모바일 요금제 보관함 타이틀 */}
            <div className="mt-[20px]">
              <h2 className="m-heading-3 font-500 text-black mb-[20px]">요금제 보관함</h2>
              {bookmarkedPlanIds.size === 0 ? (
                /* 빈 보관함 상태 */
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                  {/* Empty 이미지 */}
                  <img
                    src={EmptyImage}
                    alt="보관함이 비어있습니다"
                    className="mb-[20px] w-[150px] h-[150px]"
                  />

                  {/* 안내 메시지 */}
                  <p className="m-body-large font-500 text-black mb-[20px] text-center">
                    보관함에 요금제가 없습니다.
                  </p>

                  {/* 요금제 보러가기 버튼 */}
                  <button
                    onClick={handleViewPlans}
                    className="py-[16px] px-[24px] bg-pink-700 text-white rounded-[8px] m-body-medium font-500 hover:opacity-90 transition-colors"
                  >
                    요금제 보러가기
                  </button>
                </div>
              ) : (
                /* 보관함 요금제 목록 */
                <>
                  {/* 총 개수 표시 */}
                  {bookmarks.length > 0 && (
                    <div className="mb-[16px]">
                      <span className="m-body-medium font-400 text-gray-700">
                        총 {bookmarks.length}개의 요금제
                      </span>
                    </div>
                  )}

                  {/* 모바일 카드 그리드 - 1줄에 2개, 0.55배 크기 */}
                  <div className="flex flex-wrap justify-between gap-y-[10px] mb-[30px]">
                    {bookmarks.map((bookmark) => (
                      <div key={bookmark.plan._id} className="w-[165px] h-[330px] overflow-hidden">
                        <div className="transform scale-[0.55] origin-top-left">
                          <PlanCard
                            id={bookmark.plan._id}
                            imagePath={bookmark.plan.imagePath}
                            name={bookmark.plan.name}
                            infos={bookmark.plan.infos}
                            plan_speed={bookmark.plan.plan_speed}
                            price={bookmark.plan.price}
                            sale_price={bookmark.plan.sale_price}
                            price_value={bookmark.plan.price_value}
                            sale_price_value={bookmark.plan.sale_price_value}
                            benefits={bookmark.plan.benefits}
                            onBookmarkRemoved={() => handleBookmarkRemoved(bookmark.plan._id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 더 많은 요금제 보기 버튼 */}
                  <div className="flex justify-center mb-[20px]">
                    <button
                      onClick={handleViewPlans}
                      className="py-[16px] px-[24px] border border-pink-700 bg-white text-pink-700 rounded-[16px] m-body-medium font-500 hover:bg-pink-50 transition-colors"
                    >
                      더 많은 요금제 보기
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* 데스크톱 레이아웃 (md 이상) */}
      <div className="hidden md:block">
        <main className="max-w-[1440px] mx-auto py-[60px]">
          <div className="flex">
            <MyPageSidebar />

            <div className="flex-1">
              {/* 요금제 보관함 타이틀 */}
              <div className="flex items-center justify-between mb-[44px]">
                <h2 className="heading-1 font-500 text-black">요금제 보관함</h2>
                {bookmarks.length > 0 && (
                  <span className="body-large font-400 text-gray-700">
                    총 {bookmarks.length}개의 요금제
                  </span>
                )}
              </div>

              {/* 보관함 내용 */}
              {bookmarkedPlanIds.size === 0 ? (
                /* 빈 보관함 상태 */
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                  {/* Empty 이미지 */}
                  <img
                    src={NoticeIcon}
                    alt="보관함이 비어있습니다"
                    className="mb-[20px] w-[200px] h-[200px]"
                  />

                  {/* 안내 메시지 */}
                  <p className="body-large font-500 text-black mb-[30px]">
                    보관함에 요금제가 없습니다.
                  </p>

                  {/* 요금제 보러가기 버튼 */}
                  <button
                    onClick={handleViewPlans}
                    className="w-[208px] h-[47px] bg-pink-700 text-white rounded-[16px] body-large font-500 hover:opacity-90 transition-colors"
                  >
                    요금제 보러가기
                  </button>
                </div>
              ) : (
                /* 보관함 요금제 목록 */
                <>
                  <div className="flex flex-wrap justify-start gap-x-[34px] gap-y-[20px] mb-[60px]">
                    {bookmarks.map((bookmark) => (
                      <div key={bookmark.plan._id} className="flex-shrink-0">
                        <div className="transform scale-[0.83] origin-top-left -mr-[51px] -mb-[100px]">
                          <PlanCard
                            id={bookmark.plan._id}
                            imagePath={bookmark.plan.imagePath}
                            name={bookmark.plan.name}
                            infos={bookmark.plan.infos}
                            plan_speed={bookmark.plan.plan_speed}
                            price={bookmark.plan.price}
                            sale_price={bookmark.plan.sale_price}
                            price_value={bookmark.plan.price_value}
                            sale_price_value={bookmark.plan.sale_price_value}
                            benefits={bookmark.plan.benefits}
                            onBookmarkRemoved={() => handleBookmarkRemoved(bookmark.plan._id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 더 많은 요금제 보기 버튼 */}
                  <div className="flex justify-center mb-[40px]">
                    <button
                      onClick={handleViewPlans}
                      className="w-[240px] h-[50px] border-2 border-pink-700 bg-white text-pink-700 rounded-[16px] body-large font-500 hover:bg-pink-50 transition-colors"
                    >
                      더 많은 요금제 보기
                    </button>
                  </div>
                </>
              )}

              {/* 이용안내 */}
              <div className="mt-[80px] p-[24px] bg-white rounded-[12px] border border-gray-700">
                <div className="flex items-center mb-[12px]">
                  <img
                    src={NoticeIcon}
                    alt="이용안내"
                    className="w-5 h-5 mr-2 mt-[2px] flex-shrink-0"
                  />
                  <h3 className="body-large font-500 text-black leading-5">이용안내</h3>
                </div>

                <div className="space-y-[6px] ml-2">
                  <p className="body-large font-500 text-gray-700">
                    • 보관함에 저장된 상품은 최대 90일까지의 보관 가능합니다.
                  </p>
                  <p className="body-large font-500 text-gray-700">
                    • 보관함에 저장된 상품의 지원금 및 정상가 등의 금액이 변경될 경우, 페이지 접근
                    시 최신 금액으로 자동 업데이트 됩니다.
                  </p>
                  <p className="body-large font-500 text-gray-700">
                    • 보관함에 저장된 상품은 지원금 및 정책 변경의 사유로 수정/삭제될 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default BookmarkPage;
