import { useNavigate } from 'react-router-dom';
import AuthHeader from './components/AuthHeader';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white flex justify-center min-h-screen">
      <div className="w-[675px] flex flex-col min-h-screen">
        <AuthHeader title="로그인" />

        <div className="flex flex-col flex-1 px-5">
          {/* 안내 문구 */}
          <p className="heading-2 font-500 text-black mt-[60px] mb-[60px] leading-relaxed">
            로그인 정보를
            <br />
            입력해 주세요.
          </p>

          {/* 로그인 폼 */}
          <form className="flex flex-col gap-9">
            {/* 아이디 */}
            <div className="flex flex-col gap-6">
              <label className="heading-3 font-500 text-gray-700">아이디</label>
              <input
                type="email"
                placeholder="이메일"
                className="w-full pb-2 border-b border-gray-500 focus:outline-none focus:border-gray-700 px-2 heading-3 font-700 text-gray-700 placeholder:text-gray-500 placeholder:font-normal"
              />
            </div>

            {/* 비밀번호 */}
            <div className="flex flex-col gap-6">
              <label className="heading-3 font-500 text-gray-700">비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호"
                className="w-full pb-2 border-b border-gray-500 focus:outline-none focus:border-gray-700 px-2 heading-3 font-700 text-gray-700 placeholder:text-gray-500 placeholder:font-normal"
              />
            </div>
          </form>

          {/* 회원가입 버튼 */}
          <div className="mt-[50px] flex justify-center mb-[100px]">
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="heading-3 font-500 text-gray-700 border-b border-gray-700 hover:text-gray-500 hover:border-gray-500 transition"
            >
              회원가입
            </button>
          </div>

          {/* 하단 버튼 그룹 */}
          <div className="mt-auto w-full pb-[56px]">
            <div className="flex flex-col gap-[14px] w-full">
              {/* 기본 로그인 버튼 */}
              <button className="w-full h-[58px] bg-pink-700 text-white rounded-[16px] heading-3 font-500 hover:brightness-110 transition">
                로그인
              </button>
              {/* 카카오 로그인 버튼 */}
              <button className="w-full h-[58px] bg-[#FAE100] text-[#371C1D] rounded-[16px] heading-3 font-500 hover:brightness-110 transition relative flex justify-center items-center">
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
