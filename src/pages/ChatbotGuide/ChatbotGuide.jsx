import ChatbotSidebar from './components/ChatbotSidebar';

const ChatbotGuide = () => {
  return (
    <div className="flex">
      <ChatbotSidebar />
      <div className="flex-1 pt-[60px]">
        <section id="intro" className="min-h-screen mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">요플랜 AI 챗봇 요플밍 소개</h2>
        </section>
        <section id="how-to-use" className="min-h-screen mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">어떻게 사용하나요?</h2>
        </section>
        <section id="features" className="min-h-screen mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">어떤 기능을 하나요?</h2>
        </section>
        <section id="questions" className="min-h-screen mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">자주 묻는 질문</h2>
        </section>
        <section id="terms" className="min-h-screen mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">유의사항 안내</h2>
        </section>
      </div>
    </div>
  );
};

export default ChatbotGuide;
