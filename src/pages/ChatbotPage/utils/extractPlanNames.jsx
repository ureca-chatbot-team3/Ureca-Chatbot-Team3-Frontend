import axios from 'axios';

let cachedPlans = null;

function normalize(str) {
  return str.toLowerCase().replace(/\s+/g, '').trim();
}

export async function extractPlanNamesFromText(text) {
  if (!text) return [];

  try {
    if (!cachedPlans) {
      const res = await axios.get('/api/plans');
      cachedPlans = res?.data?.plans || res?.data?.data?.plans;

      if (!Array.isArray(cachedPlans)) {
        console.error('❌ 요금제 데이터가 배열이 아님:', cachedPlans);
        return [];
      }

      console.log('📦 요금제 데이터 캐싱 완료 (API 요청)');
    }

    const normalizedText = normalize(text);
    const matched = cachedPlans.filter((plan) => normalizedText.includes(normalize(plan.name)));

    return matched;
  } catch (err) {
    console.error('❌ 요금제 추출 실패:', err.message);
    return [];
  }
}
