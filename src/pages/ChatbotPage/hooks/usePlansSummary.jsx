import { useEffect, useState } from 'react';
import axios from 'axios';

export default function usePlansSummary() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get('/api/plans/chatbot');
        if (res.data.success) {
          setSummary(res.data.data.join('\n'));
        }
      } catch (err) {
        // 요금제 요약 로딩 실패
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return { summary, loading };
}
