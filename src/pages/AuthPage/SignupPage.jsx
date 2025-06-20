import AuthHeader from './components/AuthHeader';

const SignupPage = () => {
  return (
    <div className="bg-white flex justify-center min-h-screen">
      <div className="w-[675px] flex flex-col min-h-screen">
        <AuthHeader title="회원가입" />
        <div className="flex flex-col flex-1 px-5">
          {/* 안내 문구 */}
          <p className="heading-2 font-500 text-black mt-[40px] mb-[40px] leading-relaxed">
            회원 정보를
            <br />
            입력해 주세요.
          </p>

          {/* 회원가입 폼 */}
          <form className="flex flex-col gap-6">
            <div className="flex gap-6">
              {/* 닉네임 */}
              <div className="flex flex-col gap-6 flex-1">
                <label className="heading-3 font-500 text-gray-700">닉네임</label>
                <input
                  type="text"
                  placeholder="띄어쓰기 없이 2~8자 입력"
                  onInput={(e) => {
                    if (e.target.value.length > 8) {
                      e.target.value = e.target.value.slice(0, 8);
                    }
                  }}
                  className="w-full pb-2 border-b border-gray-500 focus:outline-none focus:border-gray-700 px-2 heading-3 font-700 text-gray-700 placeholder:text-gray-500 placeholder:font-normal"
                />
              </div>

              {/* 출생연도 */}
              <div className="flex flex-col gap-6 flex-1">
                <label className="heading-3 font-500 text-gray-700">출생연도</label>
                <input
                  type="number"
                  placeholder="숫자 4자리 입력"
                  min="1900"
                  max="2099"
                  onInput={(e) => {
                    if (e.target.value.length > 4) {
                      e.target.value = e.target.value.slice(0, 4);
                    }
                  }}
                  className="w-full pb-2 border-b border-gray-500 focus:outline-none focus:border-gray-700 px-2 heading-3 font-700 text-gray-700 placeholder:text-gray-500 placeholder:font-normal"
                />
              </div>
            </div>

            {/* 아이디 */}
            <div className="flex flex-col gap-6">
              <label className="heading-3 font-500 text-gray-700">아이디</label>
              <input
                type="email"
                placeholder="이메일 입력"
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

            {/* 비밀번호 확인 */}
            <div className="flex flex-col gap-6">
              <label className="heading-3 font-500 text-gray-700">비밀번호 확인</label>
              <input
                type="password"
                placeholder="비밀번호 확인"
                className="w-full pb-2 border-b border-gray-500 focus:outline-none focus:border-gray-700 px-2 heading-3 font-700 text-gray-700 placeholder:text-gray-500 placeholder:font-normal"
              />
            </div>

            <p className="body-medium font-300 text-gray-700 mt-2 px-2">
              * 비밀번호는 영문, 숫자, 특수문자를 조합하여 10~20자 이내로 입력해 주세요.
            </p>
          </form>

          {/* 하단 버튼 그룹 */}
          <div className="mt-auto w-full pb-[56px]">
            <div className="flex flex-col gap-[14px] w-full">
              {/* 기본 회원가입 버튼 */}
              <button className="w-full h-[58px] bg-pink-700 text-white rounded-[16px] heading-3 font-500 hover:brightness-110 transition">
                회원가입
              </button>
              {/* 카카오 회원가입 버튼 */}
              <button className="w-full h-[58px] bg-[#FAE100] text-[#371C1D] rounded-[16px] heading-3 font-500 hover:brightness-110 transition relative flex justify-center items-center">
                <img
                  src="/src/assets/svg/kakaoIcon.svg"
                  alt="카카오 아이콘"
                  className="absolute left-5"
                />
                카카오 간편 회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
