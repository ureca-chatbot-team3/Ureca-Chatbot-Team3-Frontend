import { useNavigate } from 'react-router-dom';
import MyPageSidebar from './components/MyPageSidebar';

const BookmarkPage = () => {
  const navigate = useNavigate();

  // 요금제 보러가기 버튼 핸들러
  const handleViewPlans = () => {
    navigate('/plans'); // 임시로 /plans로 설정
  };

  return (
    <main className="max-w-[1440px] mx-auto px-[20px] py-[60px]">
      <div className="flex">
        <MyPageSidebar />

        <div className="flex-1">
          {/* 요금제 보관함 타이틀 */}
          <h2 className="heading-1 font-500 text-black mb-[44px]">요금제 보관함</h2>

          {/* 빈 보관함 상태 */}
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            {/* Empty 이미지 */}
            <img
              src="/src/assets/svg/empty.svg"
              alt="보관함이 비어있습니다"
              className="mb-[20px] w-[200px] h-[200px]"
            />

            {/* 안내 메시지 */}
            <p className="body-large font-500 text-black mb-[30px]">보관함에 요금제가 없습니다.</p>

            {/* 요금제 보러가기 버튼 */}
            <button
              onClick={handleViewPlans}
              className="w-[208px] h-[47px] bg-pink-700 text-white rounded-[16px] body-large font-500 hover:opacity-90 transition-colors"
            >
              요금제 보러가기
            </button>
          </div>

          {/* 이용안내 */}
          <div className="mt-[80px] p-[24px] bg-white rounded-[12px] border border-gray-700">
            <div className="flex items-center mb-[12px]">
              <img
                src="/src/assets/svg/notice.svg"
                alt="이용안내"
                className="w-5 h-5 mr-2 mt-[2px] flex-shrink-0"
              />
              <h3 className="body-large font-500 text-black leading-5">이용안내</h3>
            </div>

            <div className="space-y-[6px] ml-2">
              <p className="body-large font-500 text-gray-700">
                • 보관함에 저장된 상품은 최대 90일까지의 보관 가능합니다.
              </p>
              <p className="body-large font-500 text-gray-700">
                • 보관함에 저장된 상품의 지원금 및 정상가 등의 금액이 변경될 경우, 페이지 접근 시
                최신 금액으로 자동 업데이트 됩니다.
              </p>
              <p className="body-large font-500 text-gray-700">
                • 보관함에 저장된 상품은 지원금 및 정책 변경의 사유로 수정/삭제될 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookmarkPage;
