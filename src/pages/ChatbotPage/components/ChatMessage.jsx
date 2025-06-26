import { useEffect, useRef, useState } from 'react';
import BotBubble from './BotBubble';
import UserBubble from './UserBubble';
import ChatbotQuickQuestionBubble from './ChatbotQuickQuestionBubble';
import ChatbotRedirectBubble from './ChatbotRedirectBubble';
import chatEndIcon from '../../../assets/svg/chatEndIcon.svg';
import PlanCard from '../../../components/PlanCard';
import { extractPlanNamesFromText } from '../utils/extractPlanNames';
import PlanCardSlider from './PlanCardSlider';

export default function ChatMessages({ messages, onQuickQuestionSelect, onResetMessages }) {
  const scrollRef = useRef(null);
  const userEndRef = useRef(null); // ✅ 사용자 말풍선 위치 ref
  const [matchedPlansMap, setMatchedPlansMap] = useState({});

  // ✅ 사용자 말풍선 기준 자동 스크롤
  useEffect(() => {
    if (userEndRef.current) {
      userEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // ✅ 메시지에서 요금제 추출
  useEffect(() => {
    const updateMatchedPlans = async () => {
      const newMap = {};

      for (let idx = 0; idx < messages.length; idx++) {
        const msg = messages[idx];
        const isBotText =
          (msg.role === 'assistant' || ['bot', 'faq', 'text'].includes(msg.type)) &&
          typeof msg.content === 'string';

        if (isBotText) {
          const plans = await extractPlanNamesFromText(msg.content);
          const plansWithId = plans.filter((plan) => plan._id);
          if (plansWithId.length > 0) {
            newMap[idx] = plansWithId;
          }
        }
      }

      setMatchedPlansMap(newMap);
    };

    updateMatchedPlans();
  }, [messages]);

  return (
    <div ref={scrollRef} className="p-4 pb-[66px] overflow-y-auto h-[calc(100%-66px-45px-66px)]">
      {messages.map((msg, idx) => {
        const isSystemMessage = msg.role === 'system' || msg.type === 'notice';
        const isQuickQuestionRecommend = msg.type === 'faq-recommend' && Array.isArray(msg.content);
        const isTextWithQuickQuestions =
          msg.type === 'bot' &&
          typeof msg.content === 'string' &&
          msg.content.startsWith('이런 질문은 어떠세요?');
        const isRedirect =
          msg.role === 'assistant' && msg.type === 'redirect' && msg.label && msg.route;
        const isPlanCards = msg.type === 'plans' && Array.isArray(msg.content);
        const isUserMessage = msg.role === 'user' || msg.type === 'user';
        const isBotText =
          (msg.role === 'assistant' || ['bot', 'faq', 'text'].includes(msg.type)) && !isUserMessage;

        if (isSystemMessage) {
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
                      className="w-full px-3 py-2 mb-3 mt-3 body-medium font-500 text-[var(--color-black)] border border-[rgba(217,218,219,0.5)] rounded-[16px] bg-white hover:bg-[var(--color-gray-400)] transition-colors"
                    >
                      대화 새로 시작하기
                    </button>
                  </div>
                }
              />
            </div>
          );
        }

        if (isQuickQuestionRecommend) {
          const questions = msg.content.map((faq) =>
            typeof faq === 'string' ? faq : faq.question
          );

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

        if (isTextWithQuickQuestions) {
          const lines = msg.content.split('\n').slice(1);
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

        if (isRedirect) {
          return (
            <div key={idx} className="mb-3">
              <BotBubble message={<ChatbotRedirectBubble label={msg.label} route={msg.route} />} />
            </div>
          );
        }

        if (isPlanCards) {
          return (
            <div key={msg.id || idx} className="flex flex-col gap-4 px-4 py-2">
              {msg.content.map((plan, i) => (
                <PlanCard key={plan._id || i} {...plan} id={plan._id} />
              ))}
            </div>
          );
        }

        if (isUserMessage) {
          return (
            <div key={idx} className="mb-3 flex justify-end">
              <UserBubble message={msg.content} />
              <div ref={userEndRef} /> {/* ✅ 사용자 말풍선 기준 자동 스크롤 */}
            </div>
          );
        }

        if (isBotText) {
          const matchedPlans = matchedPlansMap[idx] || [];
          return (
            <div key={idx} className="mb-3">
              {/* 텍스트를 요금제 매칭이 없을 때만 보여줌 */}
              {matchedPlans.length === 0 && (
                <BotBubble message={msg.content} isLoading={msg.isLoading || msg.isStreaming} />
              )}
              {/* 카드가 있다면 카드만 보여줌 */}
              {matchedPlans.length > 0 && (
                <div className="mt-2">
                  <BotBubble
                    message={`추천 요금제를 카드로 보여줄게!\n 카드가 완성될 때까지 조금만 기다려줘!`}
                  />
                  <PlanCardSlider plans={matchedPlans} />
                </div>
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
