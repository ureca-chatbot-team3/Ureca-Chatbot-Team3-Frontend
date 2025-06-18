import { Outlet } from 'react-router-dom';
import ChatbotModal from '../pages/ChatbotPage/ChatbotModal.jsx';
import ChatbotLauncher from '../components/ChatbotLauncher';
import { useState } from 'react';
import Header from '@/components/Header';

const HEADER_HEIGHT = 112;

const DefaultLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-white px-[40px] z-50">
        <div className="max-w-[1440px] mx-auto" style={{ height: HEADER_HEIGHT }}>
          <Header />
        </div>
      </div>

      <div
        className="bg-gray-200 px-[40px] flex-1 pt-[112px]"
        style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      >
        <div className="max-w-[1440px] mx-auto">
          <Outlet />
          <ChatbotLauncher onClick={() => setIsOpen(true)} />
          {isOpen && <ChatbotModal onClose={() => setIsOpen(false)} />}
        </div>
      </div>
    </>
  );
};
export default DefaultLayout;
