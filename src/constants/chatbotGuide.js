import AIYopleming from '../pages/ChatbotGuidePage/components/AIYopleming';
import ChatbotUsage from '../pages/ChatbotGuidePage/components/ChatbotUsage';
import ChatbotFeatures from '../pages/ChatbotGuidePage/components/ChatbotFeatures';
import FAQ from '../pages/ChatbotGuidePage/components/FAQ';
import ChatbotNotice from '../pages/ChatbotGuidePage/components/ChatbotNotice';

export const CHATBOT_GUIDE_SECTIONS = [
  {
    id: 'intro',
    label: '챗봇 소개',
    content: AIYopleming,
  },
  {
    id: 'usage',
    label: '어떻게 사용하나요?',
    content: ChatbotUsage,
  },
  {
    id: 'features',
    label: '어떤 기능을 하나요',
    content: ChatbotFeatures,
  },
  {
    id: 'faq',
    label: '자주 묻는 질문',
    content: FAQ,
  },
  {
    id: 'notice',
    label: '유의사항 안내',
    content: ChatbotNotice,
  },
];
