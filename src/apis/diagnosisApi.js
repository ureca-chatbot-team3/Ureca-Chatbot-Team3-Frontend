// 진단 관련 API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// HTTP 클라이언트 설정
class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // 쿠키 포함
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body });
  }

  put(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body });
  }

  patch(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PATCH', body });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

const apiClient = new ApiClient();

// 진단 관련 API
export const diagnosisApi = {
  // 진단 질문 목록 조회
  getQuestions: () => {
    return apiClient.get('/diagnosis/questions');
  },

  // 진단 결과 제출 및 처리
  submitAnswers: (answers, sessionId = null) => {
    return apiClient.post('/diagnosis/result', {
      answers,
      sessionId,
    });
  },

  // 진단 결과 조회
  getResult: (sessionId) => {
    return apiClient.get(`/diagnosis/result/${sessionId}`);
  },

  // 사용자별 진단 기록 조회 (로그인 필요)
  getHistory: (page = 1, limit = 10) => {
    return apiClient.get(`/diagnosis/history?page=${page}&limit=${limit}`);
  },

  // 진단 통계 조회 (관리자용)
  getStats: () => {
    return apiClient.get('/diagnosis/stats');
  },
};

// 헬스체크 API
export const healthApi = {
  check: () => {
    return apiClient.get('/health');
  },
};

export default diagnosisApi;
