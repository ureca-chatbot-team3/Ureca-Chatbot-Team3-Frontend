import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { authApi } from '../../apis/authApi';
import MyPageSidebar from './components/MyPageSidebar';
import toast from 'react-hot-toast';

const PasswordChangePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // 에러 메시지 상태
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // 카카오 사용자인 경우 마이페이지로 리다이렉트
  useEffect(() => {
    if (user && (user.kakaoId || user.isKakaoUser)) {
      toast.error('카카오 로그인 사용자는 비밀번호를 변경할 수 없습니다.');
      navigate('/mypage');
    }
  }, [user, navigate]);

  // 메뉴 토글 핸들러
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 메뉴 아이템 클릭 핸들러
  const handleMenuClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  // 사용자 정보 로딩 중이거나 카카오 사용자인 경우 로딩 화면 표시
  if (!user || user.kakaoId || user.isKakaoUser) {
    return (
      <>
        {/* 모바일 로딩 */}
        <div className="md:hidden">
          <main className="min-h-screen bg-gray-200 px-[20px] py-[20px]">
            <div className="max-w-[430px] mx-auto">
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-700"></div>
              </div>
            </div>
          </main>
        </div>
        {/* 데스크톱 로딩 */}
        <div className="hidden md:block">
          <main className="max-w-[1440px] mx-auto py-[60px]">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-700"></div>
            </div>
          </main>
        </div>
      </>
    );
  }

  // 입력 필드 변경 핸들러
  const handleInputChange = (field, value) => {
    // 에러 메시지 초기화
    setErrors((prev) => ({ ...prev, [field]: '' }));

    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // 실시간 검증
    if (field === 'newPassword') {
      // 비밀번호 강도 검사
      if (value.length > 0 && value.length < 10) {
        setErrors((prev) => ({ ...prev, newPassword: '비밀번호는 10자 이상이어야 합니다.' }));
      } else if (value.length > 20) {
        setErrors((prev) => ({ ...prev, newPassword: '비밀번호는 20자 이하여야 합니다.' }));
      } else if (
        value.length >= 10 &&
        value.length <= 20 &&
        !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(value)
      ) {
        setErrors((prev) => ({
          ...prev,
          newPassword: '영문, 숫자, 특수문자를 모두 포함해야 합니다.',
        }));
      }

      // 비밀번호 확인 재검증
      if (passwordData.confirmPassword && value !== passwordData.confirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: '비밀번호가 일치하지 않습니다.' }));
      }
    }

    if (field === 'confirmPassword') {
      // 비밀번호 확인 검사
      if (value && value !== passwordData.newPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: '비밀번호가 일치하지 않습니다.' }));
      }
    }
  };

  // 비밀번호 변경 핸들러
  const handlePasswordUpdate = async () => {
    // 최종 검증
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = '현재 비밀번호를 입력해주세요.';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = '새 비밀번호를 입력해주세요.';
    } else {
      if (passwordData.newPassword.length < 10) {
        newErrors.newPassword = '비밀번호는 10자 이상이어야 합니다.';
      } else if (passwordData.newPassword.length > 20) {
        newErrors.newPassword = '비밀번호는 20자 이하여야 합니다.';
      } else if (
        !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(passwordData.newPassword)
      ) {
        newErrors.newPassword = '영문, 숫자, 특수문자를 모두 포함해야 합니다.';
      }
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    // 현재 비밀번호와 새 비밀번호가 같은지 검사
    if (
      passwordData.currentPassword &&
      passwordData.newPassword &&
      passwordData.currentPassword === passwordData.newPassword
    ) {
      newErrors.newPassword = '새 비밀번호는 현재 비밀번호와 달라야 합니다.';
    }

    // 에러가 있으면 설정하고 리턴
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // API 호출
      await authApi.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      // 성공 메시지
      toast.success('비밀번호가 성공적으로 변경되었습니다.');

      // 마이페이지로 이동
      navigate('/mypage');
    } catch (error) {
      // 에러 메시지 처리
      if (error.message.includes('현재 비밀번호가 일치하지 않습니다')) {
        setErrors((prev) => ({ ...prev, currentPassword: '현재 비밀번호가 일치하지 않습니다.' }));
      } else {
        toast.error('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleCancel = () => {
    navigate('/mypage');
  };

  // 변경 버튼 활성화 조건
  const isChangeEnabled =
    passwordData.currentPassword &&
    passwordData.newPassword &&
    passwordData.confirmPassword &&
    !errors.currentPassword &&
    !errors.newPassword &&
    !errors.confirmPassword;

  return (
    <>
      {/* 모바일 레이아웃 (md 미만) */}
      <div className="md:hidden">
        <main className="min-h-screen bg-gray-200 px-[20px] py-[20px]">
          <div className="max-w-[430px] mx-auto">
            {/* 마이페이지 타이틀과 드롭다운 화살표 */}
            <div className="flex items-center justify-between pb-[16px]">
              <h1 className="m-heading-2 font-700 text-black">마이페이지</h1>
              <button 
                onClick={toggleMenu}
                className="p-[8px] cursor-pointer"
                aria-label="메뉴 토글"
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'transform rotate-180' : ''
                  }`}
                >
                  <path 
                    d="M14.3517 3.636C14.1642 3.44853 13.9099 3.34321 13.6447 3.34321C13.3796 3.34321 13.1253 3.44853 12.9377 3.636L7.98774 8.586L3.03774 3.636C2.84914 3.45384 2.59654 3.35305 2.33434 3.35533C2.07215 3.3576 1.82133 3.46277 1.63593 3.64818C1.45052 3.83359 1.34535 4.0844 1.34307 4.3466C1.34079 4.6088 1.44159 4.8614 1.62374 5.05L7.28075 10.707C7.46827 10.8945 7.72258 10.9998 7.98774 10.9998C8.25291 10.9998 8.50722 10.8945 8.69474 10.707L14.3517 5.05C14.5392 4.86247 14.6445 4.60816 14.6445 4.343C14.6445 4.07784 14.5392 3.82353 14.3517 3.636Z" 
                    fill="#6B6B6B"
                  />
                </svg>
              </button>
            </div>

            {/* 마이페이지 아래 굵은 선 */}
            <div className="w-full h-[2px] bg-black mb-[16px]"></div>

            {/* 드롭다운 메뉴 - 애니메이션 적용 */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="pb-[16px]">
                {/* 개인정보 수정 */}
                <div 
                  className="py-[12px] cursor-pointer"
                  onClick={() => handleMenuClick('/mypage')}
                >
                  <span className="m-body-large font-500 text-black">개인정보 수정</span>
                </div>
                {/* 개인정보 수정 아래 얇은 선 */}
                <div className="w-full h-[1px] bg-gray-500"></div>

                {/* 요금제 보관함 */}
                <div 
                  className="py-[12px] cursor-pointer"
                  onClick={() => handleMenuClick('/mypage/bookmarks')}
                >
                  <span className="m-body-large font-500 text-black">요금제 보관함</span>
                </div>
                {/* 요금제 보관함 아래 얇은 선 */}
                <div className="w-full h-[1px] bg-gray-500"></div>

                {/* 챗봇 상담 내역 */}
                <div 
                  className="py-[12px] cursor-pointer"
                  onClick={() => handleMenuClick('/mypage/chat-history')}
                >
                  <span className="m-body-large font-500 text-black">챗봇 상담 내역</span>
                </div>
                {/* 마지막 페이지 아래 굵은 선 */}
                <div className="w-full h-[2px] bg-black"></div>
              </div>
            </div>

            {/* 모바일 비밀번호 변경 타이틀 */}
            <div className="mt-[20px]">
              <h2 className="m-heading-3 font-500 text-black mb-[20px]">비밀번호 변경</h2>
              {/* 현재 비밀번호 */}
              <div className="mb-[20px]">
                <label className="block m-body-medium font-500 text-black mb-[8px]">현재 비밀번호</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                  className={`w-full h-[44px] px-[16px] border bg-white text-black rounded-[8px] m-body-medium font-400 focus:outline-none ${
                    errors.currentPassword
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-400 focus:border-pink-700'
                  }`}
                  placeholder="현재 비밀번호를 입력해 주세요"
                />
                {errors.currentPassword && (
                  <p className="text-red-500 mt-2 m-body-small font-400">
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              {/* 새 비밀번호 */}
              <div className="mb-[20px]">
                <label className="block m-body-medium font-500 text-black mb-[8px]">새 비밀번호</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  className={`w-full h-[44px] px-[16px] border bg-white text-black rounded-[8px] m-body-medium font-400 focus:outline-none ${
                    errors.newPassword
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-400 focus:border-pink-700'
                  }`}
                  placeholder="새로운 비밀번호를 입력해 주세요"
                />
                {errors.newPassword && (
                  <p className="text-red-500 mt-2 m-body-small font-400">{errors.newPassword}</p>
                )}
                <p className="text-gray-700 mt-1 m-body-small font-400">
                  영문, 숫자, 특수문자를 조합하여 10~20자 내로 입력해 주세요.
                </p>
              </div>

              {/* 새 비밀번호 확인 */}
              <div className="mb-[20px]">
                <label className="block m-body-medium font-500 text-black mb-[8px]">
                  새 비밀번호 확인
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full h-[44px] px-[16px] border bg-white text-black rounded-[8px] m-body-medium font-400 focus:outline-none ${
                    errors.confirmPassword
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-400 focus:border-pink-700'
                  }`}
                  placeholder="새로운 비밀번호를 다시 입력해 주세요"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 mt-2 m-body-small font-400">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* 버튼들 */}
              <div className="flex gap-[8px]">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-[16px] border border-gray-400 bg-white text-black rounded-[8px] m-body-medium font-500 hover:border-pink-700 hover:bg-pink-200 hover:text-pink-700 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handlePasswordUpdate}
                  disabled={!isChangeEnabled}
                  className={`flex-1 py-[16px] rounded-[8px] m-body-medium font-500 transition-colors ${
                    isChangeEnabled
                      ? 'bg-pink-700 text-white hover:opacity-90'
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  변경
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 데스크톱 레이아웃 (md 이상) */}
      <div className="hidden md:block">
        <main className="max-w-[1440px] mx-auto py-[60px]">
          <div className="flex">
            <MyPageSidebar />

            <div className="flex-1">
              {/* 비밀번호 변경 타이틀 */}
              <h2 className="heading-1 font-500 text-black mb-[44px]">비밀번호 변경</h2>

              {/* 현재 비밀번호 입력 */}
              <div className="mb-[30px]">
                <label className="block heading-3 font-500 text-black mb-[16px]">현재 비밀번호</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                  className={`w-full h-[56px] px-[20px] border bg-white text-black rounded-[16px] heading-3 font-400 focus:outline-none ${
                    errors.currentPassword
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-400 focus:border-pink-700'
                  }`}
                  placeholder="현재 비밀번호를 입력해 주세요"
                />
                {errors.currentPassword && (
                  <p className="text-red-500 text-sm mt-2 heading-4 font-400">
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              {/* 새 비밀번호 입력 */}
              <div className="mb-[30px]">
                <label className="block heading-3 font-500 text-black mb-[16px]">새 비밀번호</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  className={`w-full h-[56px] px-[20px] border bg-white text-black rounded-[16px] heading-3 font-400 focus:outline-none ${
                    errors.newPassword
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-400 focus:border-pink-700'
                  }`}
                  placeholder="새로운 비밀번호를 입력해 주세요"
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-2 heading-4 font-400">{errors.newPassword}</p>
                )}
                <p className="text-gray-500 text-sm mt-1 heading-4 font-400">
                  영문, 숫자, 특수문자를 조합하여 10~20자 내로 입력해 주세요.
                </p>
              </div>

              {/* 새 비밀번호 확인 */}
              <div className="mb-[30px]">
                <label className="block heading-3 font-500 text-black mb-[16px]">
                  새 비밀번호 확인
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full h-[56px] px-[20px] border bg-white text-black rounded-[16px] heading-3 font-400 focus:outline-none ${
                    errors.confirmPassword
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-400 focus:border-pink-700'
                  }`}
                  placeholder="새로운 비밀번호를 다시 입력해 주세요"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-2 heading-4 font-400">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* 버튼 그룹 */}
              <div className="flex justify-end gap-[16px]">
                <button
                  onClick={handleCancel}
                  className="py-[20px] px-[30px] border border-gray-400 bg-white text-black rounded-[16px] heading-3 font-500 hover:border-pink-700 hover:bg-pink-200 hover:text-pink-700 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handlePasswordUpdate}
                  disabled={!isChangeEnabled}
                  className={`py-[20px] px-[30px] rounded-[16px] heading-3 font-500 transition-colors ${
                    isChangeEnabled
                      ? 'bg-pink-700 text-white hover:opacity-90'
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  변경
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PasswordChangePage;