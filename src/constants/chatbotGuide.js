import AIYopleming from '../pages/ChatbotGuidePage/components/AIYopleming';
import ChatbotUsage from '../pages/ChatbotGuidePage/components/ChatbotUsage';
import ChatbotFeatures from '../pages/ChatbotGuidePage/components/ChatbotFeatures';
import FAQ from '../pages/ChatbotGuidePage/components/FAQ';
import ChatbotNotice from '../pages/ChatbotGuidePage/components/ChatbotNotice';

export const CHATBOT_GUIDE_SECTIONS = [
  {
    id: 'intro',
    label: {
      desktop: '챗봇 소개',
      mobile: '요필밍 소개',
    },
    content: AIYopleming,
  },
  {
    id: 'usage',
    label: {
      desktop: '어떻게 사용하나요?',
      mobile: '사용 가이드',
    },
    content: ChatbotUsage,
  },
  {
    id: 'features',
    label: {
      desktop: '어떤 기능을 하나요',
      mobile: '주요 기능 소개',
    },
    content: ChatbotFeatures,
  },
  {
    id: 'faq',
    label: {
      desktop: '자주 묻는 질문',
      mobile: '자주 묻는 질문',
    },
    content: FAQ,
  },
  {
    id: 'notice',
    label: {
      desktop: '유의사항 안내',
      mobile: '유의 사항',
    },
    content: ChatbotNotice,
  },
];
