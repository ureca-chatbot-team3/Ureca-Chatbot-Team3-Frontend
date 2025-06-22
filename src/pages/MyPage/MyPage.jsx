import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../apis/authApi';
import MyPageSidebar from './components/MyPageSidebar';
import toast from 'react-hot-toast';

const MyPage = () => {
  const { user, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    birthYear: '',
    nickname: '',
  });
  
  // 에러 메시지 상태
  const [errors, setErrors] = useState({
    birthYear: '',
    nickname: ''
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

  // 입력 필드 변경 핸들러
  const handleInputChange = (field, value) => {
    // 에러 메시지 초기화
    setErrors(prev => ({ ...prev, [field]: '' }));
    
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
        setErrors(prev => ({ ...prev, birthYear: '숫자만 입력 가능합니다.' }));
        return;
      }
      
      // 4자리 초과 시 에러
      if (value.length > 4) {
        setErrors(prev => ({ ...prev, birthYear: '4자리까지만 입력 가능합니다.' }));
        return;
      }
      
      // 4자리 입력 완료 시 범위 검사
      if (value.length === 4) {
        const numValue = parseInt(value);
        if (numValue < 1900) {
          setErrors(prev => ({ ...prev, birthYear: '1900년 이후의 연도를 입력해주세요.' }));
          return;
        }
        if (numValue > currentYear) {
          setErrors(prev => ({ ...prev, birthYear: `${currentYear}년 이전의 연도를 입력해주세요.` }));
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
        setErrors(prev => ({ ...prev, nickname: '닉네임에는 공백을 포함할 수 없습니다.' }));
        // 공백을 제거한 값으로 설정
        value = value.replace(/\s/g, '');
      }
      
      // 길이 검사
      if (value.length > 8) {
        setErrors(prev => ({ ...prev, nickname: '닉네임은 8자 이하로 입력해주세요.' }));
        return;
      }
      
      // 허용되지 않는 문자 검사
      if (value && !/^[가-힣a-zA-Z0-9]*$/.test(value)) {
        setErrors(prev => ({ ...prev, nickname: '한글, 영문, 숫자만 사용 가능합니다.' }));
        return;
      }
    }
    
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 저장 버튼 활성화 조건 - 현재 사용자 정보와 다르고 에러가 없을 때만 활성화
  const isSaveEnabled = (
    ((formData.nickname.trim() && formData.nickname.trim() !== user?.nickname) ||
    (formData.birthYear.trim() && formData.birthYear !== String(user?.birthYear || ''))) &&
    !errors.birthYear && !errors.nickname
  );

  // 저장 핸들러
  const handleSave = async () => {
    if (!isSaveEnabled) {
      console.log('저장 버튼 비활성화 상태');
      return;
    }
    
    console.log('저장 시도 시작:', { user, formData, isSaveEnabled });
    
    try {
      // 업데이트할 데이터 준비
      const updateData = {};
      
      // 닉네임 변경 반영
      if (formData.nickname.trim() && formData.nickname.trim() !== user?.nickname) {
        updateData.nickname = formData.nickname.trim();
        console.log('닉네임 변경:', formData.nickname.trim(), '→', user?.nickname);
      }
      
      // 출생연도 변경 반영
      if (formData.birthYear.trim() && formData.birthYear !== String(user?.birthYear || '')) {
        updateData.birthYear = parseInt(formData.birthYear);
        console.log('출생연도 변경:', formData.birthYear, '→', user?.birthYear);
      }
      
      console.log('전송할 데이터:', updateData);
      
      // 실제로 변경사항이 없으면 알림 (이론적으로 여기에 도달하지 않습니다)
      if (Object.keys(updateData).length === 0) {
        console.log('변경사항 없음');
        toast.info('변경된 사항이 없습니다.');
        return;
      }
      
      // API 호출
      console.log('API 호출 시작');
      const response = await authApi.updateProfile(updateData);
      console.log('API 응답:', response);
      
      // 성공 메시지
      toast.success('정보가 성공적으로 업데이트되었습니다.');
      
      // 사용자 정보 재로드로 새로운 데이터 반영
      console.log('checkAuth 호출 시작');
      await checkAuth();
      console.log('checkAuth 완료');
      
    } catch (error) {
      console.error('사용자 정보 업데이트 오류:', error);
      toast.error('정보 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 비밀번호 변경 페이지로 이동
  const handlePasswordChange = () => {
    navigate('/mypage/password-change');
  };

  return (
    <main className="max-w-[1440px] mx-auto px-[20px] py-[60px]">
      <div className="flex">
        <MyPageSidebar />

        <div className="flex-1">
          {/* 1. 개인정보 수정 타이틀 - heading-1 font-500 */}
          <h2 className="heading-1 font-500 text-black mb-[44px]">개인정보 수정</h2>

          {/* 2-5. 폼 필드들 - 16px gap */}
          <div className="space-y-[16px] mb-[30px]">
            {/* 2. 이메일 */}
            <div>
              <label className="block heading-3 font-500 text-black mb-[16px]">이메일</label>
              <div className="text-black heading-3 font-400">{formData.email}</div>
            </div>

            {/* 3. 출생연도 */}
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
                <p className="text-red-500 text-sm mt-2 heading-4 font-400">{errors.birthYear}</p>
              )}
            </div>

            {/* 4. 닉네임 */}
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
                <p className="text-red-500 text-sm mt-2 heading-4 font-400">{errors.nickname}</p>
              )}
            </div>
          </div>

          {/* 6. 비밀번호 변경과 저장 버튼 - 오른쪽 정렬 */}
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

            {/* 7. 저장 버튼 - 조건부 활성화 */}
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
  );
};

export default MyPage;
