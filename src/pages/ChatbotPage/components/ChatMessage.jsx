import { useEffect, useRef } from 'react';
import BotBubble from './BotBubble';
import UserBubble from './UserBubble';
import ChatbotQuickQuestionBubble from './ChatbotQuickQuestionBubble';

export default function ChatMessages({ messages, onQuickQuestionSelect }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="p-4 pb-[66px] overflow-y-auto h-[calc(100%-66px-45px-66px)]">
      {messages.map((msg, idx) => {
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
