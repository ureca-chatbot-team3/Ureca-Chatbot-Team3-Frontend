import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import MyPageSidebar from './components/MyPageSidebar';
import toast from 'react-hot-toast';

const MyPage = () => {
  const { user, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    birthYear: '',
    nickname: '',
  });

  // 에러 메시지 상태
  const [errors, setErrors] = useState({
    birthYear: '',
    nickname: '',
  });

  // 사용자 정보가 로드되면 폼 데이터 업데이트
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        birthYear: user.birthYear ? String(user.birthYear) : '',
        nickname: user.nickname || '',
      });
    }
  }, [user]);

  // 메뉴 토글 핸들러
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 입력 필드 변경 핸들러
  const handleInputChange = (field, value) => {
    // 에러 메시지 초기화
    setErrors((prev) => ({ ...prev, [field]: '' }));

    // 출생연도 검증
    if (field === 'birthYear') {
      const currentYear = new Date().getFullYear();

      // 빈 값이면 허용
      if (value === '') {
        setFormData((prev) => ({
          ...prev,
          [field]: value,
        }));
        return;
      }

      // 숫자가 아닌 문자 입력 시 에러
      if (!/^[0-9]*$/.test(value)) {
        setErrors((prev) => ({ ...prev, birthYear: '숫자만 입력 가능합니다.' }));
        return;
      }

      // 4자리 초과 시 에러
      if (value.length > 4) {
        setErrors((prev) => ({ ...prev, birthYear: '4자리까지만 입력 가능합니다.' }));
        return;
      }

      // 4자리 입력 완료 시 범위 검사
      if (value.length === 4) {
        const numValue = parseInt(value);
        if (numValue < 1900) {
          setErrors((prev) => ({ ...prev, birthYear: '1900년 이후의 연도를 입력해주세요.' }));
          return;
        }
        if (numValue > currentYear) {
          setErrors((prev) => ({
            ...prev,
            birthYear: `${currentYear}년 이전의 연도를 입력해주세요.`,
          }));
          return;
        }
      }

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      return;
    }

    // 닉네임 검증
    if (field === 'nickname') {
      // 공백 검사
      if (/\s/.test(value)) {
        setErrors((prev) => ({ ...prev, nickname: '닉네임에는 공백을 포함할 수 없습니다.' }));
        // 공백을 제거한 값으로 설정
        value = value.replace(/\s/g, '');
      }

      // 길이 검사
      if (value.length > 8) {
        setErrors((prev) => ({ ...prev, nickname: '닉네임은 8자 이하로 입력해주세요.' }));
        return;
      }

      // 허용되지 않는 문자 검사
      if (value && !/^[가-힣a-zA-Z0-9]*$/.test(value)) {
        setErrors((prev) => ({ ...prev, nickname: '한글, 영문, 숫자만 사용 가능합니다.' }));
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 저장 버튼 활성화 조건 - 현재 사용자 정보와 다르고 에러가 없을 때만 활성화
  const isSaveEnabled =
    ((formData.nickname.trim() && formData.nickname.trim() !== user?.nickname) ||
      (formData.birthYear.trim() && formData.birthYear !== String(user?.birthYear || ''))) &&
    !errors.birthYear &&
    !errors.nickname;

  // 저장 핸들러
  const handleSave = async () => {
    if (!isSaveEnabled) {
      console.log('저장 버튼 비활성화 상태');
      return;
    }

    try {
      // 업데이트할 데이터 준비
      const updateData = {};

      // 닉네임 변경 반영
      if (formData.nickname.trim() && formData.nickname.trim() !== user?.nickname) {
        updateData.nickname = formData.nickname.trim();
      }

      // 출생연도 변경 반영
      if (formData.birthYear.trim() && formData.birthYear !== String(user?.birthYear || '')) {
        updateData.birthYear = parseInt(formData.birthYear);
      }

      if (Object.keys(updateData).length === 0) {
        toast.info('변경된 사항이 없습니다.');
        return;
      }

      // API 호출
      toast.success('정보가 성공적으로 업데이트되었습니다.');
      await checkAuth();
    } catch (error) {
      console.error('사용자 정보 업데이트 오류:', error);
      toast.error('정보 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 비밀번호 변경 페이지로 이동
  const handlePasswordChange = () => {
    navigate('/mypage/password-change');
  };

  // 메뉴 아이템 클릭 핸들러
  const handleMenuClick = (path) => {
    navigate(path);
    setIsMenuOpen(false); // 메뉴 닫기
  };

  return (
    <>
      {/* 모바일 레이아웃 (md 미만) */}
      <div className="md:hidden">
        <main className="min-h-screen bg-gray-200 py-[32px] md:py-[60px]">
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
            <div className="w-full h-[2px] bg-black"></div>

            {/* 드롭다운 메뉴 - 애니메이션 적용 */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pb-[16px]">
                {/* 개인정보 수정 */}
                <div className="py-[12px]">
                  <span className="m-body-large font-500 text-pink-700">개인정보 수정</span>
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

            {/* 모바일 개인정보 수정 타이틀 */}
            <div className="mt-[20px]">
              <h2 className="m-heading-3 font-700 text-black mb-[20px]">개인정보 수정</h2>
              {/* 이메일 */}
              <div className="mb-[20px]">
                <label className="block m-body-medium font-500 text-black mb-[12px]">이메일</label>
                <div className="text-gray-700 m-body-medium font-400">{formData.email}</div>
              </div>

              {/* 출생연도 */}
              <div className="mb-[20px]">
                <label className="block m-body-medium font-500 text-black mb-[12px]">
                  출생연도
                </label>
                <input
                  type="text"
                  value={formData.birthYear}
                  onChange={(e) => handleInputChange('birthYear', e.target.value)}
                  className={`w-full h-[44px] px-[16px] border bg-white text-black rounded-[8px] m-body-medium font-400 focus:outline-none ${
                    errors.birthYear
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-400 focus:border-pink-700'
                  }`}
                  placeholder="출생 연도"
                  maxLength="4"
                />
                {errors.birthYear && (
                  <p className="text-red-500 mt-2 m-body-small font-400">{errors.birthYear}</p>
                )}
              </div>

              {/* 닉네임 */}
              <div className="mb-[20px]">
                <label className="block m-body-medium font-500 text-black mb-[12px]">닉네임</label>
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => handleInputChange('nickname', e.target.value)}
                  className={`w-full h-[44px] px-[16px] border bg-white text-black rounded-[8px] m-body-medium font-400 focus:outline-none ${
                    errors.nickname
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-400 focus:border-pink-700'
                  }`}
                  placeholder="사용하실 닉네임"
                  maxLength="8"
                />
                {errors.nickname && (
                  <p className="text-red-500 mt-2 m-body-small font-400">{errors.nickname}</p>
                )}
              </div>

              {/* 버튼들 */}
              <div className="flex gap-[8px]">
                {/* 카카오 로그인 사용자가 아닌 경우만 비밀번호 변경 버튼 표시 */}
                {!user?.isKakaoUser && !user?.kakaoId && (
                  <button
                    onClick={handlePasswordChange}
                    className="flex-1 py-[16px] border border-gray-400 bg-white text-black rounded-[8px] m-body-medium font-500 hover:border-pink-700 hover:bg-pink-200 hover:text-pink-700 transition-colors"
                  >
                    비밀번호 변경
                  </button>
                )}

                {/* 저장 버튼 */}
                <button
                  onClick={handleSave}
                  disabled={!isSaveEnabled}
                  className={`flex-1 py-[16px] rounded-[8px] m-body-medium font-500 transition-colors ${
                    isSaveEnabled
                      ? 'bg-pink-700 text-white hover:opacity-90'
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 데스크톱 레이아웃 (md 이상) */}
      <div className="hidden md:block">
        <main className="max-w-[1440px] mx-auto py-[32px] md:py-[60px]">
          <div className="flex">
            <MyPageSidebar />

            <div className="flex-1">
              {/* 개인정보 수정 타이틀 */}
              <h2 className="heading-1 font-500 text-black mb-[44px]">개인정보 수정</h2>

              {/* 폼 필드들 */}
              <div className="space-y-[16px] mb-[30px]">
                {/* 이메일 */}
                <div>
                  <label className="block heading-3 font-500 text-black mb-[16px]">이메일</label>
                  <div className="text-black heading-3 font-400">{formData.email}</div>
                </div>

                {/* 출생연도 */}
                <div>
                  <label className="block heading-3 font-500 text-black mb-[16px]">출생연도</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={formData.birthYear}
                      onChange={(e) => handleInputChange('birthYear', e.target.value)}
                      className={`w-[120px] h-[56px] px-[20px] border bg-white text-black rounded-[16px] heading-3 font-400 focus:outline-none ${
                        errors.birthYear
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-400 focus:border-pink-700'
                      }`}
                      placeholder="2000"
                      maxLength="4"
                    />
                    <span className="ml-[12px] heading-3 font-400 text-black">년</span>
                  </div>
                  {errors.birthYear && (
                    <p className="text-red-500 text-sm mt-2 heading-4 font-400">
                      {errors.birthYear}
                    </p>
                  )}
                </div>

                {/* 닉네임 */}
                <div>
                  <label className="block heading-3 font-500 text-black mb-[16px]">닉네임</label>
                  <input
                    type="text"
                    value={formData.nickname}
                    onChange={(e) => handleInputChange('nickname', e.target.value)}
                    className={`w-full h-[56px] px-[20px] border bg-white text-black rounded-[16px] heading-3 font-400 focus:outline-none ${
                      errors.nickname
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-400 focus:border-pink-700'
                    }`}
                    placeholder="닉네임을 입력해주세요"
                    maxLength="8"
                  />
                  {errors.nickname && (
                    <p className="text-red-500 text-sm mt-2 heading-4 font-400">
                      {errors.nickname}
                    </p>
                  )}
                </div>
              </div>

              {/* 비밀번호 변경과 저장 버튼 */}
              <div className="flex justify-end items-center gap-[16px] mb-[30px]">
                {/* 카카오 로그인 사용자가 아닌 경우만 비밀번호 변경 버튼 표시 */}
                {!user?.isKakaoUser && !user?.kakaoId && (
                  <button
                    onClick={handlePasswordChange}
                    className="py-[20px] px-[30px] border border-gray-400 bg-white text-black rounded-[16px] heading-3 font-500 hover:border-pink-700 hover:bg-pink-200 hover:text-pink-700 transition-colors"
                  >
                    비밀번호 변경
                  </button>
                )}

                {/* 저장 버튼 */}
                <button
                  onClick={handleSave}
                  disabled={!isSaveEnabled}
                  className={`py-[20px] px-[30px] rounded-[16px] heading-3 font-500 transition-colors ${
                    isSaveEnabled
                      ? 'bg-pink-700 text-white hover:opacity-90'
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MyPage;
