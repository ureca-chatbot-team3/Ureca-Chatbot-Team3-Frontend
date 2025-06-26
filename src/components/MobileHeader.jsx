import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '@/assets/images/Logo.png';
import searchIcon from '@/assets/svg/searchIcon.svg';
import cartIcon from '@/assets/svg/cartIcon.svg';
import menuIcon from '@/assets/svg/menuIcon.svg';
import closeArrowIcon from '@/assets/svg/closeArrowIcon.svg';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const MobileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast.success('로그아웃되었습니다.');
      navigate('/', { replace: true });
    }
  };

  return (
    <header className="bg-white border-b border-gray-300 fixed top-0 left-0 w-full z-50">
      {/* 상단바 */}
      <div className="h-[41px] flex items-center justify-between px-4">
        {/* 로고 */}
        <Link to="/">
          <img src={logoImage} alt="요플랜 로고" className="h-[29px] block" />
        </Link>

        {/* 오른쪽 아이콘 */}
        <div className="flex items-center gap-4">
          <button
            className="p-0 m-0 bg-transparent border-none"
            onClick={() => {
              navigate('/plans?focusSearch=true', { replace: false });
              setMenuOpen(false);
            }}
          >
            <img src={searchIcon} alt="검색" className="w-5 h-5" />
          </button>
          <button
            className="p-0 m-0 bg-transparent border-none"
            onClick={() => {
              navigate('/mypage/bookmarks', { replace: false });
              setMenuOpen(false);
            }}
          >
            <img src={cartIcon} alt="보관함" className="w-5 h-5" />
          </button>
          <button onClick={() => setMenuOpen(true)} className="p-0 m-0 bg-transparent border-none">
            <img src={menuIcon} alt="메뉴" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 슬라이드 메뉴 */}
      <div
        className={`  bg-white fixed top-0 right-0 w-[70%] h-full  shadow-lg z-110 px-4 py-3
          transform transition-transform duration-300 ease-in-out
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* 닫기 버튼 */}
        <div className="flex justify-start mb-5">
          <button onClick={() => setMenuOpen(false)} className="p-0 m-0 bg-transparent border-none">
            <img src={closeArrowIcon} alt="닫기" className="w-6 h-6" />
          </button>
        </div>

        {/* 메뉴 항목 */}
        <nav className="flex flex-col items-center gap-4">
          {isAuthenticated ? (
            <div className="flex w-full justify-start items-center">
              <span className="m-body-large font-700 text-pink-700">{user?.nickname}</span>
              <span className="m-body-large font-700 text-black">님 환영합니다.</span>

              <span className="text-gray-600 mx-2">|</span>

              <button onClick={handleLogout} className="m-body-add text-gray-600  text-left">
                로그아웃
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <span className="m-body-large font-700 text-pink-700">로그인</span>
            </Link>
          )}

          <Link to="/mypage" onClick={() => setMenuOpen(false)} className="m-body-large font-700">
            마이페이지
          </Link>
          <Link to="/plans" onClick={() => setMenuOpen(false)} className="m-body-large font-700">
            요금제
          </Link>
          <Link
            to="/diagnosis"
            onClick={() => setMenuOpen(false)}
            className="m-body-large font-700"
          >
            요금제 진단 <span className="text-pink-700 relative -top-2">•</span>
          </Link>
          <Link to="/compare" onClick={() => setMenuOpen(false)} className="m-body-large font-700">
            요금제 비교
          </Link>
          <Link
            to="/chatbot-guide"
            onClick={() => setMenuOpen(false)}
            className="m-body-large font-700"
          >
            챗봇 안내
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default MobileHeader;
