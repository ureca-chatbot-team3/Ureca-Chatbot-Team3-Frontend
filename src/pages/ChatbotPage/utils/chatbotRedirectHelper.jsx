// src/pages/ChatbotPage/utils/chatbotRedirectHelper.js
import ChatbotRedirectBubble from '../components/ChatbotRedirectBubble';

const REDIRECT_KEYWORDS = [
  {
    keywords: ['요금제 리스트', '전체'],
    route: '/plans',
    label: '전체 요금제 보기',
  },
  {
    keywords: ['비교'],
    route: '/compare',
    label: '요금제 비교하기',
  },
  {
    keywords: ['진단', '몰라', '모르'],
    route: '/diagnosis',
    label: '요금제 진단하러 가기',
  },
  {
    keywords: ['챗봇 안내', '챗봇', '도움말', '넌 누구니'],
    route: '/chatbot-guide',
    label: '챗봇 안내 페이지 보기',
  },
];

/**
 * 사용자 입력에 해당하는 리디렉션 응답을 반환
 * @param {string} message 사용자 입력 메시지
 * @returns {object|null} 자동 응답 메시지 or null
 */
export function getRedirectResponse(message) {
  const lowerMsg = message.toLowerCase();

  for (const entry of REDIRECT_KEYWORDS) {
    if (entry.keywords.some((k) => lowerMsg.includes(k))) {
      return {
        role: 'assistant',
        content: '아래 버튼을 눌러 이동해보세요!', // ✅ 문자열로만
        type: 'redirect',
        label: entry.label,
        route: entry.route,
      };
    }
  }

  return null;
}
