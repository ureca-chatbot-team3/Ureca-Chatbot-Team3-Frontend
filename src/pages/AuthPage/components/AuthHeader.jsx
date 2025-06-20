import { useNavigate } from 'react-router-dom';

const AuthHeader = ({ title = '로그인' }) => {
  const navigate = useNavigate();

  return (
    <header className="h-[70px] border-b border-gray-500 bg-white">
      <div className="relative w-full max-w-[675px] h-full flex items-center px-5 mx-auto">
        {/* 뒤로가기 버튼 */}
        <button onClick={() => navigate(-1)} className="mr-4">
          <img src="/src/assets/svg/back2Icon.svg" alt="뒤로가기" />
        </button>

        {/* 왼쪽 정렬 타이틀 */}
        <h1 className="heading-3 font-500 text-black">{title}</h1>
      </div>
    </header>
  );
};

export default AuthHeader;
