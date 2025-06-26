import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import MyPageSidebar from './components/MyPageSidebar';
import BotBubble from '../ChatbotPage/components/BotBubble';
import UserBubble from '../ChatbotPage/components/UserBubble';

import { splitIntoSessions } from '../../utils/splitConversationSessions';

import upIcon from '../../assets/svg/upIcon.svg';
import downIcon from '../../assets/svg/downIcon.svg';
import EmptyImage from '@/assets/svg/empty.svg';
import NoticeIcon from '@/assets/svg/notice.svg';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const ChatHistoryPage = () => {
  const navigate = useNavigate();
  const [conversationList, setConversationList] = useState([]);
  const [nickname, setNickname] = useState('나');
  const [expandedSessions, setExpandedSessions] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const profileRes = await axios.get(`${API_BASE_URL}/auth/profile`, {
          withCredentials: true,
        });
        const userId = profileRes.data?.data?._id;
        const nick = profileRes.data?.data?.nickname || '나';
        setNickname(nick);

        if (userId) {
          const res = await axios.get(`${API_BASE_URL}/conversations?userId=${userId}&full=true`, {
            withCredentials: true,
          });
          const fullConversations = res.data;

          const splitSessions = Array.isArray(fullConversations)
            ? fullConversations.flatMap((conv) =>
                splitIntoSessions(conv.messages).map((sessionMessages, index) => ({
                  _id: `${conv._id}-${index}`,
                  updatedAt: conv.updatedAt,
                  messages: sessionMessages,
                }))
              )
            : [];

          setConversationList(splitSessions);
        }
      } catch (err) {
        console.error('❌ 대화 불러오기 실패:', err);
      }
    };

    fetchChatHistory();
  }, []);

  const toggleSession = (sessionId) => {
    setExpandedSessions((prev) => ({
      ...prev,
      [sessionId]: !prev[sessionId],
    }));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const renderConversations = () =>
    conversationList.length === 0 ? (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <img
          src={EmptyImage}
          alt="보관함이 비어있습니다"
          className="mb-[20px] w-[200px] h-[200px]"
        />
        <p className="m-body-large font-500 text-black mb-[20px] text-center">
          챗봇과 상담 내역이 없습니다.
        </p>
      </div>
    ) : (
      conversationList.map((conv) => {
        const isExpanded = expandedSessions[conv._id];
        return (
          <div key={conv._id} className="mb-6">
            <button
              onClick={() => toggleSession(conv._id)}
              className={`w-full border px-6 py-4 relative text-left ${
                isExpanded ? 'rounded-t-[16px] rounded-b-none' : 'rounded-[16px]'
              } bg-[var(--color-white)] border-[var(--color-gray-500)] shadow-soft-black`}
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
      {/* 모바일 */}
      <div className="md:hidden">
        <main className="min-h-screen bg-gray-200 py-[20px]">
          <div className="max-w-[430px] mx-auto">
            {/* 마이페이지 타이틀과 드롭다운 화살표 */}
            <div className="flex items-center justify-between pb-[16px]">
              <h1 className="m-heading-2 font-700 text-black">마이페이지</h1>
              <button
                onClick={toggleMenu}
                className="p-[8px] cursor-pointer"
                aria-label="메뉴 토글"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'transform rotate-180' : ''
                  }`}
                >
                  <path
                    d="M14.3517 3.636C14.1642 3.44853 13.9099 3.34321 13.6447 3.34321C13.3796 3.34321 13.1253 3.44853 12.9377 3.636L7.98774 8.586L3.03774 3.636C2.84914 3.45384 2.59654 3.35305 2.33434 3.35533C2.07215 3.3576 1.82133 3.46277 1.63593 3.64818C1.45052 3.83359 1.34535 4.0844 1.34307 4.3466C1.34079 4.6088 1.44159 4.8614 1.62374 5.05L7.28075 10.707C7.46827 10.8945 7.72258 10.9998 7.98774 10.9998C8.25291 10.9998 8.50722 10.8945 8.69474 10.707L14.3517 5.05C14.5392 4.86247 14.6445 4.60816 14.6445 4.343C14.6445 4.07784 14.5392 3.82353 14.3517 3.636Z"
                    fill="#6B6B6B"
                  />
                </svg>
              </button>
            </div>

            {/* 마이페이지 아래 굵은 선 */}
            <div className="w-full h-[2px] bg-black"></div>

            {/* 드롭다운 메뉴 - 애니메이션 적용 */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pb-[16px]">
                {/* 개인정보 수정 */}
                <div
                  className="py-[12px] cursor-pointer"
                  onClick={() => handleMenuClick('/mypage')}
                >
                  <span className="m-body-large font-500 text-black">개인정보 수정</span>
                </div>
                {/* 개인정보 수정 아래 얇은 선 */}
                <div className="w-full h-[1px] bg-gray-500"></div>

                {/* 요금제 보관함 */}
                <div
                  className="py-[12px] cursor-pointer"
                  onClick={() => handleMenuClick('/mypage/bookmarks')}
                >
                  <span className="m-body-large font-500 text-black">요금제 보관함</span>
                </div>
                {/* 요금제 보관함 아래 얇은 선 */}
                <div className="w-full h-[1px] bg-gray-500"></div>

                {/* 챗봇 상담 내역 */}
                <div className="py-[12px]">
                  <span className="m-body-large font-500 text-pink-700">챗봇 상담 내역</span>
                </div>
                {/* 마지막 페이지 아래 굵은 선 */}
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

              {/* 이용안내 (데스크톱) */}
              <div className="mt-[80px] p-[24px] bg-white rounded-[12px] border border-gray-700">
                <div className="flex items-center mb-[12px]">
                  <img
                    src={NoticeIcon}
                    alt="이용안내"
                    className="w-5 h-5 mr-2 mt-[2px] flex-shrink-0"
                  />
                  <h3 className="body-large font-500 text-black leading-5">이용안내</h3>
                </div>
                <div className="space-y-[6px] ml-2">
                  <p className="body-large font-500 text-gray-700">
                    • 챗봇 상담 내역은 최대 90일까지 보관됩니다.
                  </p>
                  <p className="body-large font-500 text-gray-700">
                    • 상담 종료 시점 기준으로 저장되며, 수정은 불가합니다.
                  </p>
                  <p className="body-large font-500 text-gray-700">
                    • 상담 내역은 읽기 전용입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ChatHistoryPage;
