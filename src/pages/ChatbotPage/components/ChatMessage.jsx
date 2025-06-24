import { useEffect, useRef } from 'react';
import BotBubble from './BotBubble';
import UserBubble from './UserBubble';
import ChatbotQuickQuestionBubble from './ChatbotQuickQuestionBubble';
import ChatbotRedirectBubble from './ChatbotRedirectBubble';
import chatEndIcon from '../../../assets/svg/chatEndIcon.svg';

export default function ChatMessages({ messages, onQuickQuestionSelect, onResetMessages }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="p-4 pb-[66px] overflow-y-auto h-[calc(100%-66px-45px-66px)]">
      {messages.map((msg, idx) => {
        // ✅ 시스템 메시지 (대화 종료 안내)
        if (msg.role === 'system' || msg.type === 'notice') {
          return (
            <div key={idx} className="mb-3">
              <BotBubble
                message={
                  <div className="flex flex-col items-center">
                    15분 이상 응답이 없어 자동으로 상담이 종료됩니다.
                    {'\n'}추가 문의사항이 있으면 메시지를 남겨주세요.
                    <img src={chatEndIcon} alt="상담 종료 아이콘" />
                    {'\n'}상담한 내용은 대화창 단위로 저장되며,
                    {'\n'}마이페이지 → 챗봇 상담 내역에서 언제든 확인 가능합니다.
                    <button
                      onClick={onResetMessages}
                      className=" w-full px-3 py-2 mb-3 mt-3
                  body-medium font-500
                  text-[var(--color-black)]
                  border border-[rgba(217,218,219,0.5)]
                  rounded-[16px] 
                  bg-white hover:bg-[var(--color-gray-400)]
                  transition-colors"
                    >
                      대화 새로 시작하기
                    </button>
                  </div>
                }
              />
            </div>
          );
        }

        // ✅ 추천 질문 배열로 명시된 경우 (저장된 메시지)
        if (msg.type === 'faq-recommend' && Array.isArray(msg.content)) {
          return (
            <div key={idx} className="mb-3">
              <BotBubble
                message={
                  <ChatbotQuickQuestionBubble
                    questions={msg.content}
                    onSelect={onQuickQuestionSelect}
                  />
                }
              />
            </div>
          );
        }

        // ✅ 일반 텍스트 메시지이지만 추천 질문 포맷인 경우
        if (
          msg.type === 'bot' &&
          typeof msg.content === 'string' &&
          msg.content.startsWith('이런 질문은 어떠세요?')
        ) {
          const lines = msg.content.split('\n').slice(1); // 첫 줄 제거
          const questions = lines.map((line) => line.replace(/^- /, '').trim());

          return (
            <div key={idx} className="mb-3">
              <BotBubble
                message={
                  <ChatbotQuickQuestionBubble
                    questions={questions}
                    onSelect={onQuickQuestionSelect}
                  />
                }
              />
            </div>
          );
        }

        // ✅ 리디렉션 응답일 경우
        if (
          msg.type === 'bot' &&
          msg.role === 'assistant' &&
          msg.type !== 'faq-recommend' &&
          msg.label &&
          msg.route
        ) {
          return (
            <div key={idx} className="mb-3">
              <BotBubble message={<ChatbotRedirectBubble label={msg.label} route={msg.route} />} />
            </div>
          );
        }

        // ✅ 일반 봇 메시지 (텍스트 or 로딩)
        if (msg.type === 'bot') {
          return (
            <div key={idx} className="mb-3">
              <BotBubble message={msg.content} isLoading={msg.isLoading || msg.isStreaming} />
            </div>
          );
        }

        // ✅ 유저 메시지
        return (
          <div key={idx} className="mb-3 flex justify-end">
            <UserBubble message={msg.content} />
          </div>
        );
      })}
    </div>
  );
}
