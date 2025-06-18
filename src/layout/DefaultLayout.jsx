import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';

const HEADER_HEIGHT = 112;

const DefaultLayout = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <div className="flex flex-col h-full">
      <div className="fixed w-full bg-white px-[40px] z-50" style={{ height: HEADER_HEIGHT }}>
        <div className="max-w-[1440px] mx-auto">
          <Header />
        </div>
      </div>

      {isMainPage ? (
        <div className="bg-gray-200 flex-1" style={{ paddingTop: HEADER_HEIGHT }}>
          <Outlet />
        </div>
      ) : (
        <div className="bg-gray-200 px-[40px] flex-1" style={{ paddingTop: HEADER_HEIGHT }}>
          <div className="max-w-[1440px] mx-auto">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default DefaultLayout;
