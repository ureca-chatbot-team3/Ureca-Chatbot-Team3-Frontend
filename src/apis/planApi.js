// 요금제 관련 API
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
        Accept: 'application/json',
        ...options.headers,
      },
      credentials: 'include', // 쿠키 포함 (매우 중요)
      mode: 'cors',
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);

      // 네트워크 에러 (서버 미실행 등)
      if (!response) {
        throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      // 네트워크 연결 실패 (CORS, 서버 미실행 등)
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error('서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.');
      }

      // CORS 에러
      if (error.message.includes('CORS')) {
        throw new Error('서버 설정 오류입니다. 관리자에게 문의해주세요.');
      }

      // API Request Error
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

// 요금제 관련 API
export const planApi = {
  // 요금제 목록 조회
  getPlans: (params = {}) => {
    const queryString = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryString.append(key, value);
      }
    });

    const query = queryString.toString();
    return apiClient.get(`/plans${query ? `?${query}` : ''}`);
  },

  // 요금제 상세 조회
  getPlanDetail: (planId) => {
    return apiClient.get(`/plans/${planId}`);
  },

  // 추천 요금제 조회
  getRecommendedPlans: (params = {}) => {
    const queryString = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryString.append(key, value);
      }
    });

    const query = queryString.toString();
    return apiClient.get(`/plans/recommend${query ? `?${query}` : ''}`);
  },

  // 요금제 비교
  comparePlans: (planIds) => {
    return apiClient.post('/plans/compare', { planIds });
  },

  // 요금제 통계
  getPlanStats: () => {
    return apiClient.get('/plans/stats');
  },

  // 보관함 요금제 조회
  getBookmarkedPlans: () => {
    return apiClient.get('/bookmarks');
  },

  // 보관함에 요금제 추가
  addBookmark: (planId) => {
    return apiClient.post('/bookmarks', { planId });
  },

  // 보관함에서 요금제 제거
  removeBookmark: (planId) => {
    return apiClient.delete(`/bookmarks/${planId}`);
  },

  // 보관함 상태 확인
  checkBookmarkStatus: (planId) => {
    return apiClient.get(`/bookmarks/status/${planId}`);
  },
};

export default planApi;
