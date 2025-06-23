import { useEffect, useState } from 'react';
import axios from 'axios';
import MyPageSidebar from './components/MyPageSidebar';
import BotBubble from '../ChatbotPage/components/BotBubble';
import UserBubble from '../ChatbotPage/components/UserBubble';

import upIcon from '../../assets/svg/upIcon.svg';
import downIcon from '../../assets/svg/downIcon.svg';

const ChatHistoryPage = () => {
  const [conversationList, setConversationList] = useState([]);
  const [nickname, setNickname] = useState('나');
  const [expandedSessions, setExpandedSessions] = useState({});

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

  const toggleSession = (sessionId) => {
    setExpandedSessions((prev) => ({
      ...prev,
      [sessionId]: !prev[sessionId],
    }));
  };

  return (
    <main className="max-w-[1440px] mx-auto px-[20px] py-[60px]">
      <div className="flex relative min-h-[600px]">
        <MyPageSidebar />

        <div className="flex-1 relative">
          <h2 className="heading-1 font-500 text-black mb-[24px]">챗봇 상담 내역</h2>
          <div>
            {conversationList.length === 0 ? (
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
                      <div className="body-large font-700 text-[var(--color-black)] truncate"></div>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2  text-[var(--color-gray-700)]">
                        <img
                          src={isExpanded ? upIcon : downIcon}
                          alt={isExpanded ? '접기' : '펼치기'}
                        />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="flex flex-col gap-4 border border-[var(--color-gray-500)] rounded-b-[16px] rounded-t-none bg-[var(--color-gray-400)]  px-6 py-4 max-h-[500px] overflow-y-auto">
                        {conv.messages.map((msg, index) => (
                          <div key={index}>
                            {msg.role === 'user' ? (
                              <>
                                <div className="mb-3 text-right  text-gray-700">{nickname}</div>
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
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChatHistoryPage;
