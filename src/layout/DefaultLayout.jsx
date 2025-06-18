import { Outlet } from 'react-router-dom';
import ChatbotModal from '../components/ChatbotModal.jsx';
import ChatbotLauncher from '../components/ChatbotLauncher';
import { useState } from 'react';

const DefaultLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-[40px]">
        <div className="max-w-[1440px] mx-auto">
          <header>헤더</header>
        </div>
      </div>

      <div className="bg-gray-200 px-[40px] flex-1">
        <div className="max-w-[1440px] mx-auto relative z-10">
          <Outlet />
          <ChatbotLauncher onClick={() => setIsOpen(true)} />
          {isOpen && <ChatbotModal onClose={() => setIsOpen(false)} />}
        </div>
      </div>
    </div>
  );
};
export default DefaultLayout;
