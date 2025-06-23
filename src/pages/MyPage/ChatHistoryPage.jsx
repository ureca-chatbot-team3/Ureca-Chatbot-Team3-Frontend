import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import MyPageSidebar from './components/MyPageSidebar';
import BotBubble from '../ChatbotPage/components/BotBubble';
import UserBubble from '../ChatbotPage/components/UserBubble';

import upIcon from '../../assets/svg/upIcon.svg';
import downIcon from '../../assets/svg/downIcon.svg';

const ChatHistoryPage = () => {
  const navigate = useNavigate();
  const [conversationList, setConversationList] = useState([]);
  const [nickname, setNickname] = useState('나');
  const [expandedSessions, setExpandedSessions] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ 대화 불러오기
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const profileRes = await axios.get('/api/auth/profile', { withCredentials: true });
        const userId = profileRes.data?.data?._id;
        const nick = profileRes.data?.data?.nickname || '나';
        setNickname(nick);

        if (userId) {
          const res = await axios.get(`/api/conversations?userId=${userId}&full=true`);
          setConversationList(res.data);
        }
      } catch (err) {
        console.error('❌ 대화 불러오기 실패:', err);
      }
    };

    fetchChatHistory();
  }, []);

  // ✅ 챗봇 세션 토글
  const toggleSession = (sessionId) => {
    setExpandedSessions((prev) => ({
      ...prev,
      [sessionId]: !prev[sessionId],
    }));
  };

  // ✅ 모바일 메뉴 토글
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const renderConversations = () =>
    conversationList.length === 0 ? (
      <p className="text-gray-500">아직 저장된 대화가 없어요.</p>
    ) : (
      conversationList.map((conv) => {
        const isExpanded = expandedSessions[conv._id];
        return (
          <div key={conv._id} className="mb-6">
            <button
              onClick={() => toggleSession(conv._id)}
              className={`w-full border px-6 py-4 relative text-left ${isExpanded ? 'rounded-t-[16px] rounded-b-none' : 'rounded-[16px]'} bg-[var(--color-white)] border-[var(--color-gray-500)] shadow-soft-black`}
            >
              <div className="body-medium text-[var(--color-black)] mb-2 text-left">
                최종 대화 시간: {new Date(conv.updatedAt).toLocaleString()}
              </div>
              {conv.messages?.find((msg) => msg.role === 'user') && (
                <div className="body-large font-700 text-[var(--color-black)] truncate text-left">
                  {conv.messages.find((msg) => msg.role === 'user').content}
                </div>
              )}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[var(--color-gray-700)]">
                <img src={isExpanded ? upIcon : downIcon} alt={isExpanded ? '접기' : '펼치기'} />
              </div>
            </button>

            {isExpanded && (
              <div className="flex flex-col gap-4 border border-[var(--color-gray-500)] rounded-b-[16px] rounded-t-none bg-[var(--color-gray-400)] px-6 py-4 max-h-[500px] overflow-y-auto">
                {conv.messages.map((msg, index) => (
                  <div key={index}>
                    {msg.role === 'user' ? (
                      <>
                        <div className="mb-3 text-right text-gray-700">{nickname}</div>
                        <UserBubble message={msg.content} />
                      </>
                    ) : (
                      <BotBubble message={msg.content} isLoading={false} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })
    );

  return (
    <>
      {/* 모바일 레이아웃 */}
      <div className="md:hidden">
        <main className="min-h-screen bg-gray-200 py-[20px]">
          <div className="max-w-[430px] mx-auto">
            <div className="flex items-center justify-between pb-[16px]">
              <h1 className="m-heading-2 font-700 text-black">마이페이지</h1>
              <button
                onClick={toggleMenu}
                className="p-[8px] cursor-pointer"
                aria-label="메뉴 토글"
              >
                <img
                  src={isMenuOpen ? upIcon : downIcon}
                  alt="토글 아이콘"
                  className={`transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            <div className="w-full h-[2px] bg-black"></div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pb-[16px]">
                <div
                  className="py-[12px] cursor-pointer"
                  onClick={() => handleMenuClick('/mypage')}
                >
                  <span className="m-body-large font-500 text-black">개인정보 수정</span>
                </div>
                <div className="w-full h-[1px] bg-gray-500"></div>
                <div
                  className="py-[12px] cursor-pointer"
                  onClick={() => handleMenuClick('/mypage/bookmarks')}
                >
                  <span className="m-body-large font-500 text-black">요금제 보관함</span>
                </div>
                <div className="w-full h-[1px] bg-gray-500"></div>
                <div className="py-[12px]">
                  <span className="m-body-large font-500 text-pink-700">챗봇 상담 내역</span>
                </div>
                <div className="w-full h-[2px] bg-black"></div>
              </div>
            </div>

            <div className="mt-[20px]">
              <h2 className="m-heading-3 font-500 text-black mb-[20px]">챗봇 상담 내역</h2>
              {renderConversations()}
            </div>
          </div>
        </main>
      </div>

      {/* 데스크톱 */}
      <div className="hidden md:block">
        <main className="max-w-[1440px] mx-auto py-[60px]">
          <div className="flex">
            <MyPageSidebar />
            <div className="flex-1">
              <h2 className="heading-1 font-500 text-black mb-[44px]">챗봇 상담 내역</h2>
              {renderConversations()}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ChatHistoryPage;
