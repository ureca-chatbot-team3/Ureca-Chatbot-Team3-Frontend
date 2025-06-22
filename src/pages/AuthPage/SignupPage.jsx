import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthHeader from './components/AuthHeader';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';
import { validateSignupForm } from '../../utils/validation';
import { authApi } from '../../apis/authApi';

const SignupPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, register } = useAuth();

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    {
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      birthYear: '',
    },
    validateSignupForm
  );

  // 로그인된 사용자는 메인 페이지로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // 회원가입 제출 핸들러
  const onSubmit = async (formData) => {
    const { passwordConfirm, ...submitData } = formData;
    submitData.birthYear = parseInt(submitData.birthYear);

    const result = await register(submitData);

    if (result.success) {
      toast.success('회원가입에 성공했습니다! 로그인해주세요.');
      navigate('/login', { replace: true });
    } else {
      toast.error(result.error || '회원가입에 실패했습니다.');
    }

    return result;
  };

  // 카카오 회원가입 핸들러
  const handleKakaoSignup = () => {
    window.location.href = authApi.getKakaoLoginUrl();
  };

  // 입력 제한 핸들러
  const handleNicknameChange = (e) => {
    const value = e.target.value.replace(/\s/g, ''); // 공백 제거
    if (value.length <= 8) {
      handleChange('nickname', value);
    }
  };

  const handleBirthYearChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // 숫자만 허용
    if (value.length <= 4) {
      handleChange('birthYear', value);
    }
  };

  return (
    <div className="bg-white flex justify-center min-h-screen">
      <div className="w-[560px] flex flex-col min-h-screen">
        <AuthHeader title="회원가입" />

        <div className="flex flex-col flex-1 px-5">
          {/* 안내 문구 */}
          <p className="heading-2 font-500 text-black mt-[40px] mb-[40px] leading-relaxed">
            회원 정보를
            <br />
            입력해 주세요.
          </p>

          {/* 회원가입 폼 */}
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit);
            }}
          >
            <div className="flex gap-6">
              {/* 닉네임 */}
              <div className="flex flex-col gap-6 flex-1">
                <label className="heading-3 font-500 text-gray-700">닉네임</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="띄어쓰기 없이 2~8자 입력"
                    value={values.nickname}
                    onChange={handleNicknameChange}
                    className={`w-full pb-2 border-b ${
                      errors.nickname ? 'border-red-500' : 'border-gray-500'
                    } focus:outline-none focus:border-gray-700 px-2 heading-3 font-700 text-gray-700 placeholder:text-gray-500 placeholder:font-normal`}
                    disabled={isSubmitting}
                  />
                  {errors.nickname && (
                    <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>
                  )}
                </div>
              </div>

              {/* 출생연도 */}
              <div className="flex flex-col gap-6 flex-1">
                <label className="heading-3 font-500 text-gray-700">출생연도</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="숫자 4자리 입력"
                    value={values.birthYear}
                    onChange={handleBirthYearChange}
                    className={`w-full pb-2 border-b ${
                      errors.birthYear ? 'border-red-500' : 'border-gray-500'
                    } focus:outline-none focus:border-gray-700 px-2 heading-3 font-700 text-gray-700 placeholder:text-gray-500 placeholder:font-normal`}
                    disabled={isSubmitting}
                  />
                  {errors.birthYear && (
                    <p className="text-red-500 text-sm mt-1">{errors.birthYear}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 아이디 */}
            <div className="flex flex-col gap-6">
              <label className="heading-3 font-500 text-gray-700">아이디</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="이메일 입력"
                  value={values.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full pb-2 border-b ${
                    errors.email ? 'border-red-500' : 'border-gray-500'
                  } focus:outline-none focus:border-gray-700 px-2 heading-3 font-700 text-gray-700 placeholder:text-gray-500 placeholder:font-normal`}
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* 비밀번호 */}
            <div className="flex flex-col gap-6">
              <label className="heading-3 font-500 text-gray-700">비밀번호</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={values.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={`w-full pb-2 border-b ${
                    errors.password ? 'border-red-500' : 'border-gray-500'
                  } focus:outline-none focus:border-gray-700 px-2 heading-3 font-700 text-gray-700 placeholder:text-gray-500 placeholder:font-normal`}
                  disabled={isSubmitting}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            </div>

            {/* 비밀번호 확인 */}
            <div className="flex flex-col gap-6">
              <label className="heading-3 font-500 text-gray-700">비밀번호 확인</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="비밀번호 확인"
                  value={values.passwordConfirm}
                  onChange={(e) => handleChange('passwordConfirm', e.target.value)}
                  className={`w-full pb-2 border-b ${
                    errors.passwordConfirm ? 'border-red-500' : 'border-gray-500'
                  } focus:outline-none focus:border-gray-700 px-2 heading-3 font-700 text-gray-700 placeholder:text-gray-500 placeholder:font-normal`}
                  disabled={isSubmitting}
                />
                {errors.passwordConfirm && (
                  <p className="text-red-500 text-sm mt-1">{errors.passwordConfirm}</p>
                )}
              </div>
            </div>

            <p className="body-medium font-300 text-gray-700 mt-2 px-2">
              * 비밀번호는 영문, 숫자, 특수문자를 조합하여 10~20자 이내로 입력해 주세요.
            </p>

            {/* 하단 버튼 그룹 */}
            <div className="mt-auto w-full pt-[63px]">
              <div className="flex flex-col gap-[14px] w-full">
                {/* 기본 회원가입 버튼 */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full h-[58px] bg-pink-700 text-white rounded-[16px] heading-3 font-500 transition ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'
                  }`}
                >
                  {isSubmitting ? '회원가입 중...' : '회원가입'}
                </button>

                {/* 카카오 회원가입 버튼 */}
                <button
                  type="button"
                  onClick={handleKakaoSignup}
                  disabled={isSubmitting}
                  className={`w-full h-[58px] bg-[#FAE100] text-[#371C1D] rounded-[16px] heading-3 font-500 transition relative flex justify-center items-center ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'
                  }`}
                >
                  <img
                    src="/src/assets/svg/kakaoIcon.svg"
                    alt="카카오 아이콘"
                    className="absolute left-5"
                  />
                  카카오 간편 회원가입
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
