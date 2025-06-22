import axios from 'axios';

export const askChatbot = async (message) => {
  try {
    const res = await axios.post('/api/chat', { message });
    return res.data.reply; // 성공 시 응답
  } catch (err) {
    console.error('챗봇 API 호출 실패:', err);
    throw new Error('요청 실패');
  }
};
