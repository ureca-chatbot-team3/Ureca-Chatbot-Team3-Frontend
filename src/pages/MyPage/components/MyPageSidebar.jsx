import { Link, useLocation } from 'react-router-dom';

const MyPageSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/mypage', label: '개인정보 수정' },
    { path: '/mypage/plans', label: '요금제 보관함' },
    { path: '/mypage/history', label: '챗봇 상담 내역' },
  ];

  return (
    <div className="w-[280px] mr-[60px]">
      {/* 1. 마이페이지 제목 - heading-1 font-500 */}
      <h1 className="heading-1 font-500 text-black mb-[20px]">마이페이지</h1>

      {/* 2. 구분선 */}
      <div className="w-full h-[1px] bg-gray-500 mb-[20px]"></div>

      {/* 3. 메뉴 - heading-3 font-500, gap 16px, 패딩 없음 */}
      <nav className="space-y-[16px]">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`block text-left heading-3 font-500 transition-colors ${
                isActive ? 'text-pink-700' : 'text-black hover:text-pink-700'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MyPageSidebar;
