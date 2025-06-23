import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyPageSidebar from './components/MyPageSidebar';

const ChatHistoryPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 메뉴 토글 핸들러
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 메뉴 아이템 클릭 핸들러
  const handleMenuClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

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
                <div
                  className="py-[12px] cursor-pointer"
                  onClick={() => handleMenuClick('/mypage/bookmarks')}
                >
                  <span className="m-body-large font-500 text-black">요금제 보관함</span>
                </div>
                {/* 요금제 보관함 아래 얇은 선 */}
                <div className="w-full h-[1px] bg-gray-500"></div>

                {/* 챗봇 상담 내역 */}
                <div className="py-[12px]">
                  <span className="m-body-large font-500 text-pink-700">챗봇 상담 내역</span>
                </div>
                {/* 마지막 페이지 아래 굵은 선 */}
                <div className="w-full h-[2px] bg-black"></div>
              </div>
            </div>

            {/* 모바일 챗봇 상담 내역 타이틀 */}
            <div className="mt-[20px]">
              <h2 className="m-heading-3 font-500 text-black mb-[20px]">챗봇 상담 내역</h2>
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
              {/* 챗봇 상담 내역 타이틀 */}
              <h2 className="heading-1 font-500 text-black mb-[44px]">챗봇 상담 내역</h2>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ChatHistoryPage;
