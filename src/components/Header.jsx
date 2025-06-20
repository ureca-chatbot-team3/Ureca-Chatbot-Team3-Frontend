import { Link } from 'react-router-dom';
import logoImage from '@/assets/images/Logo.png';
import searchIcon from '@/assets/svg/searchIcon.svg';
import cartIcon from '@/assets/svg/cartIcon.svg';
import userIcon from '@/assets/svg/userIcon.svg';

const Header = () => {
  return (
    <header className="bg-white">
      {/* 윗섹션 */}
      <div className="h-[56px] flex items-center justify-between max-w-[1440px] mx-auto">
        {/* 왼쪽 로고 */}
        <Link to="/">
          <img src={logoImage} alt="요플랜 로고" />
        </Link>
        {/* 오른쪽 로그인 버튼 */}
        <Link to="/login">
          <button className="heading-3 font-300 text-black bg-transparent p-0 m-0 border-none cursor-pointer">
            로그인
          </button>
        </Link>
      </div>

      {/* 윗섹션 하단 선 */}
      <div
        className="absolute top-[56px] left-0 w-full"
        style={{ borderTop: '0.5px solid var(--color-gray-500)' }}
      />

      {/* 아랫섹션 */}
      <div className="h-[56px] flex justify-between items-center max-w-[1440px] mx-auto">
        {/* 왼쪽 내비게이션 버튼 */}
        <div className="flex gap-[40px] items-center relative">
          {/* 네비게이션 링크들 */}
          <Link to="/plans" className="body-medium font-500 text-black">
            요금제
          </Link>
          <Link to="/compare" className="body-medium font-500 text-black">
            요금제 비교
          </Link>

          {/* 요금제 진단 + 동그라미 + 말풍선 */}
          <div className="relative">
            <Link to="/diagnosis" className="body-medium font-500 text-black">
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

          <Link to="/chatbot" className="body-medium font-500 text-black">
            챗봇 안내
          </Link>
          <Link to="/store" className="body-medium font-500 text-black">
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
