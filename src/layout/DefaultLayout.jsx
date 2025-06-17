import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-[40px]">
        <div className="max-w-[1440px] mx-auto">
          {/*  Header 컴포넌트 영역 */}
          <header>헤더</header>
        </div>
      </div>

      <div className="bg-gray-200 px-[40px] flex-1">
        <div className="max-w-[1440px] mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
