// 인증 관련 API
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

// 인증 관련 API
export const authApi = {
  // 로그인
  login: (email, password) => {
    return apiClient.post('/auth/login', { email, password });
  },

  // 회원가입
  register: (userData) => {
    return apiClient.post('/auth/register', userData);
  },

  // 카카오 로그인 URL 가져오기
  getKakaoLoginUrl: () => {
    return `${API_BASE_URL}/auth/kakao`;
  },

  // 프로필 조회
  getProfile: () => {
    return apiClient.get('/auth/profile');
  },

  // 로그아웃
  logout: () => {
    return apiClient.post('/auth/logout');
  },

  // 회원탈퇴
  deleteAccount: () => {
    return apiClient.delete('/auth/delete-account');
  },

  // 사용자 정보 업데이트
  updateProfile: (userData) => {
    return apiClient.put('/auth/profile', userData);
  },

  // 비밀번호 변경
  changePassword: (passwordData) => {
    return apiClient.put('/auth/change-password', passwordData);
  },
};

export default authApi;
