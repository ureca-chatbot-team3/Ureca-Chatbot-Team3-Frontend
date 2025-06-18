import { Link } from 'react-router-dom';
import logoImage from '@/assets/images/Logo.png';
import searchIcon from '@/assets/svg/searchIcon.svg';
import cartIcon from '@/assets/svg/cartIcon.svg';
import userIcon from '@/assets/svg/userIcon.svg';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-[112px] bg-white z-50">
      {/* 윗섹션 */}
      <div className="h-[56px] flex items-center justify-between max-w-[1440px] mx-auto">
        {/* 왼쪽 로고 */}
        <Link to="/">
          <img src={logoImage} alt="요플랜 로고" />
        </Link>
        {/* 오른쪽 로그인 버튼 */}
        <button
          className="font-300 heading-3 bg-transparent p-0 m-0 border-none cursor-pointer"
          style={{ color: 'var(--color-black)' }}
        >
          로그인
        </button>
      </div>

      {/* 윗섹션 하단 선 */}
      <div
        className="absolute top-[56px] left-0 w-full"
        style={{ borderTop: '0.5px solid var(--color-gray-500)' }}
      />

      {/* 아랫섹션 */}
      <div className="h-[56px] flex justify-between items-center max-w-[1440px] mx-auto">
        {/* 왼쪽 내비게이션 버튼 */}
        <div className="flex gap-[38px] items-center">
          <Link
            to="/plans"
            className="m-body-medium font-500"
            style={{ color: 'var(--color-black)' }}
          >
            요금제
          </Link>
          <Link
            to="/compare"
            className="m-body-medium font-500"
            style={{ color: 'var(--color-black)' }}
          >
            요금제 비교
          </Link>
          <Link
            to="/diagnosis"
            className="m-body-medium font-500"
            style={{ color: 'var(--color-black)' }}
          >
            요금제 진단
          </Link>
          <Link
            to="/chatbot"
            className="m-body-medium font-500"
            style={{ color: 'var(--color-black)' }}
          >
            챗봇 안내
          </Link>
          <Link
            to="/store"
            className="m-body-medium font-500"
            style={{ color: 'var(--color-black)' }}
          >
            매장 찾기
          </Link>
        </div>
        {/* 오른쪽 아이콘 버튼 */}
        <div className="flex gap-[28px] items-center">
          <img src={searchIcon} alt="검색" className="h-6 w-6" />
          <img src={cartIcon} alt="장바구니" className="h-6 w-6" />
          <img src={userIcon} alt="유저" className="h-6 w-6" />
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
