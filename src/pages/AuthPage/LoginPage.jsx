import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthHeader from './components/AuthHeader';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';
import { validateLoginForm } from '../../utils/validation';
import { authApi } from '../../apis/authApi';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    {
      email: '',
      password: '',
    },
    validateLoginForm
  );

  // 로그인된 사용자는 메인 페이지로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // 로그인 제출 핸들러
  const onSubmit = async (formData) => {
    const result = await login(formData.email, formData.password);

    if (result.success) {
      toast.success('로그인에 성공했습니다!');
      navigate('/', { replace: true });
    } else {
      toast.error(result.error || '로그인에 실패했습니다.');
    }

    return result;
  };

  // 카카오 로그인 핸들러
  const handleKakaoLogin = () => {
    window.location.href = authApi.getKakaoLoginUrl();
  };

  return (
    <div className="bg-white flex justify-center min-h-screen">
      <div className="w-[560px] flex flex-col min-h-screen">
        <AuthHeader title="로그인" />

        <div className="flex flex-col flex-1 px-5">
          {/* 안내 문구 */}
          <p className="heading-2 font-500 text-black mt-[60px] mb-[60px] leading-relaxed">
            로그인 정보를
            <br />
            입력해 주세요.
          </p>

          {/* 로그인 폼 */}
          <form
            id="loginForm"
            className="flex flex-col gap-9"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit);
            }}
          >
            {/* 아이디 */}
            <div className="flex flex-col gap-6">
              <label className="heading-3 font-500 text-gray-700">아이디</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="이메일"
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

            {/* 회원가입 버튼 */}
            <div className="mt-[50px] flex justify-center">
              <Link
                to="/signup"
                className="heading-3 font-500 text-gray-700 border-b border-gray-700 hover:text-pink-700 hover:border-pink-700 transition"
              >
                회원가입
              </Link>
            </div>
          </form>

          {/* 하단 버튼 그룹 - 화면 맨 아래 고정 */}
          <div className="mt-auto w-full pb-6">
            <div className="flex flex-col gap-[14px] w-full">
              {/* 기본 로그인 버튼 */}
              <button
                type="submit"
                form="loginForm"
                disabled={isSubmitting}
                className={`w-full h-[58px] bg-pink-700 text-white rounded-[16px] heading-3 font-500 transition ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'
                }`}
              >
                {isSubmitting ? '로그인 중...' : '로그인'}
              </button>

              {/* 카카오 로그인 버튼 */}
              <button
                type="button"
                onClick={handleKakaoLogin}
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
                카카오 간편 로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
