import MyPageSidebar from './components/MyPageSidebar';

const ChatHistoryPage = () => {
  return (
    <main className="max-w-[1440px] mx-auto py-[60px]">
      <div className="flex">
        <MyPageSidebar />

        <div className="flex-1">
          {/* 챗봇 상담 내역 타이틀 */}
          <h2 className="heading-1 font-500 text-black mb-[44px]">챗봇 상담 내역</h2>
        </div>
      </div>
    </main>
  );
};

export default ChatHistoryPage;
