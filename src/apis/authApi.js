// 인증 관련 API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// 쿠키에서 토큰 존재 여부 확인 함수
const hasAuthToken = () => {
  // 쿠키에서 auth token 또는 session id 확인
  return document.cookie.includes('token') || document.cookie.includes('connect.sid');
};

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
      const data = await response.json();

      if (!response.ok) {
        // 401 에러의 경우 조용히 처리 (로그인하지 않은 상태는 정상적인 케이스)
        if (response.status === 401 && endpoint === '/auth/profile') {
          const error = new Error(data.message || 'Unauthorized');
          error.status = response.status;
          error.silent = true; // 조용한 에러 표시
          throw error;
        }
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
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
    // 쿠키에 인증 토큰이 없으면 API 호출하지 않음
    if (!hasAuthToken()) {
      return Promise.reject(new Error('No authentication token found'));
    }
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
