import axios from 'axios';

let cachedPlans = null;

function normalize(str) {
  return str.toLowerCase().replace(/\s+/g, '').trim();
}

export async function extractPlanNamesFromText(text) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  if (!text) return [];

  try {
    if (!cachedPlans) {
      const res = await axios.get(`${API_BASE_URL}/plans`);

      console.log('🔍 API 응답 구조:', res.data);

      cachedPlans = res?.data?.data?.plans;

      if (!Array.isArray(cachedPlans)) {
        console.error('❌ 요금제 데이터가 배열이 아님:', res.data);
        return [];
      }

      console.log('📦 요금제 데이터 캐싱 완료');
    }

    const normalizedText = normalize(text);
    const matched = cachedPlans.filter((plan) => normalizedText.includes(normalize(plan.name)));

    return matched;
  } catch (err) {
    console.error('❌ 요금제 추출 실패:', err.message);
    return [];
  }
}
