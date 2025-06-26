import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import logoImage from '@/assets/images/Logo.png';
import searchIcon from '@/assets/svg/searchIcon.svg';
import cartIcon from '@/assets/svg/cartIcon.svg';
import userIcon from '@/assets/svg/userIcon.svg';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  // 로그아웃 핸들러
  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast.success('로그아웃되었습니다.');
      navigate('/', { replace: true });
    }
  };

  // 사용자 메뉴 클릭 핸들러
  const handleUserMenuClick = () => {
    if (isAuthenticated) {
      navigate('/mypage');
    } else {
      navigate('/login');
    }
  };

  const handleGoToSearch = () => {
    navigate('/plans?focusSearch=true');
  };

  return (
    <header className="bg-white relative">
      {/* 윗섹션 */}
      <div className="h-[56px] flex items-center justify-between max-w-[1440px] mx-auto px-4">
        {/* 왼쪽 로고 */}
        <Link to="/">
          <img src={logoImage} alt="요플랜 로고" />
        </Link>

        {/* 오른쪽 로그인/사용자 정보 */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="heading-3 font-300 text-pink-700">{user?.nickname}님</span>
              <button
                onClick={handleLogout}
                className="heading-3 font-300 text-gray-500 bg-transparent p-0 m-0 border-none cursor-pointer hover:text-gray-700 transition"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="heading-3 font-300 text-black bg-transparent p-0 m-0 border-none cursor-pointer hover:text-gray-700 transition">
                로그인
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* 윗섹션 하단 선 */}
      <div
        className="absolute top-[56px] left-0 w-full"
        style={{ borderTop: '0.5px solid var(--color-gray-500)' }}
      />

      {/* 아랫섹션 */}
      <div className="h-[56px] flex justify-between items-center max-w-[1440px] mx-auto px-4">
        {/* 왼쪽 내비게이션 버튼 */}
        <div className="flex gap-[40px] items-center relative">
          {/* 네비게이션 링크들 */}
          <Link
            to="/plans"
            className="body-medium font-500 text-black hover:text-pink-700 transition"
          >
            요금제
          </Link>
          <Link
            to="/compare"
            className="body-medium font-500 text-black hover:text-pink-700 transition"
          >
            요금제 비교
          </Link>

          {/* 요금제 진단 + 동그라미 + 말풍선 */}
          <div className="relative">
            <Link
              to="/diagnosis"
              className="body-medium font-500 text-black hover:text-pink-700 transition"
            >
              요금제 진단
            </Link>

            {/* 동그라미 표시 */}
            <div className="absolute top-[2px] right-[-9px] w-[5px] h-[5px] rounded-full z-50 bg-pink-700" />

            {/* 말풍선 */}
            <div
              className="absolute z-50 flex flex-col items-center"
              style={{
                top: '-34px',
                right: '-25px',
              }}
            >
              <div
                className="body-small"
                style={{
                  height: '22px',
                  borderRadius: '50px',
                  backgroundColor: 'white',
                  border: '1px solid var(--color-pink-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 500,
                  position: 'relative',
                  padding: '0 8px',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ color: 'var(--color-pink-700)' }}>맞춤형 요금제&nbsp;</span>
                <span style={{ color: 'var(--color-black)' }}>확인</span>

                {/* 꼬리 내부 */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '18px',
                    height: '12px',
                    backgroundColor: 'var(--color-white)',
                    clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                    zIndex: 1,
                  }}
                />
                {/* 꼬리 테두리 */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-12.5px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '18px',
                    height: '12px',
                    backgroundColor: 'var(--color-pink-700)',
                    clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                    zIndex: 0,
                  }}
                />
              </div>
            </div>
          </div>

          <Link to="/chatbot-guide" className="body-medium font-500 text-black">
            챗봇 안내
          </Link>
        </div>

        {/* 오른쪽 아이콘 버튼 */}
        <div className="flex gap-[28px] items-center">
          <button
            onClick={handleGoToSearch}
            className="p-0 m-0 bg-transparent border-none cursor-pointer"
          >
            <img src={searchIcon} alt="검색" className="h-6 w-6" />
          </button>
          <button
            className="p-0 m-0 bg-transparent border-none"
            onClick={() => {
              navigate('/mypage/bookmarks', { replace: false });
            }}
          >
            <img src={cartIcon} alt="보관함" className="w-6 h-6" />
          </button>
          <button
            onClick={handleUserMenuClick}
            className="p-0 m-0 bg-transparent border-none cursor-pointer"
          >
            <img src={userIcon} alt="유저" className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* 아랫섹션 하단 선 */}
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{ borderTop: '0.5px solid var(--color-gray-500)' }}
      />
    </header>
  );
};

export default Header;
