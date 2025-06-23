import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

const LoginRequiredModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLoginClick = () => {
    onClose();
    navigate('/login');
  };

  const handleCancelClick = () => {
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <>
      {/* 배경 블러 효과 */}
      <div className="fixed inset-0 backdrop-blur-sm z-40" />

      {/* 모달 컨텐츠 */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div
          className={`bg-white rounded-[16px] p-[30px] w-[380px] transform transition-all duration-300 ease-out shadow-xl ${
            isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}
        >
          <div className="text-center">
            {/* 아이콘 */}
            <div className="mb-[20px]">
              <svg
                className="w-[50px] h-[50px] mx-auto text-pink-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            {/* 제목 */}
            <h2 className="heading-3 font-600 text-black mb-[12px]">
              로그인이 필요한 서비스입니다
            </h2>

            {/* 설명 */}
            <p className="body-medium font-400 text-gray-700 mb-[25px]">
              요금제를 보관함에 저장하려면 로그인해주세요.
            </p>

            {/* 버튼 그룹 */}
            <div className="flex gap-[10px]">
              <button
                onClick={handleCancelClick}
                className="flex-1 h-[44px] border border-gray-400 bg-white text-gray-700 rounded-[10px] body-medium font-500 hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleLoginClick}
                className="flex-1 h-[44px] bg-pink-700 text-white rounded-[10px] body-medium font-500 hover:bg-pink-500 transition-colors"
              >
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Portal을 사용하여 document.body에 렌더링
  return createPortal(modalContent, document.body);
};

export default LoginRequiredModal;
