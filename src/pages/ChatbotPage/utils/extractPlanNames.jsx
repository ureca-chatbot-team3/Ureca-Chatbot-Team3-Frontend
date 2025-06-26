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



      cachedPlans = res?.data?.data?.plans;

      if (!Array.isArray(cachedPlans)) {
        return [];
      }


    }

    const normalizedText = normalize(text);
    const matched = cachedPlans.filter((plan) => normalizedText.includes(normalize(plan.name)));

    return matched;
  } catch (err) {
    return [];
  }
}
