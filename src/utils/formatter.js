// 숫자 포맷팅 함수들
export const formatter = {
  // 숫자를 천 단위 콤마로 포맷팅
  number: (value) => {
    if (typeof value !== 'number') return '0';
    return value.toLocaleString('ko-KR');
  },

  // 가격 포맷팅 (원 단위)
  price: (value) => {
    if (typeof value !== 'number') return '0원';
    return `${value.toLocaleString('ko-KR')}원`;
  },

  // 데이터 용량 포맷팅
  dataSize: (value, unit = 'GB') => {
    if (typeof value !== 'number') return `0${unit}`;
    return `${value.toLocaleString('ko-KR')}${unit}`;
  },

  // 퍼센트 포맷팅
  percent: (value, decimalPlaces = 1) => {
    if (typeof value !== 'number') return '0%';
    return `${value.toFixed(decimalPlaces)}%`;
  },

  // 날짜 포맷팅
  date: (date, options = {}) => {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    };

    if (typeof date === 'string') {
      date = new Date(date);
    }

    if (!(date instanceof Date) || isNaN(date)) {
      return '날짜 없음';
    }

    return date.toLocaleDateString('ko-KR', defaultOptions);
  },

  // 시간 포맷팅
  time: (date, options = {}) => {
    const defaultOptions = {
      hour: '2-digit',
      minute: '2-digit',
      ...options,
    };

    if (typeof date === 'string') {
      date = new Date(date);
    }

    if (!(date instanceof Date) || isNaN(date)) {
      return '시간 없음';
    }

    return date.toLocaleTimeString('ko-KR', defaultOptions);
  },

  // 상대 시간 포맷팅 (예: "2시간 전")
  relativeTime: (date) => {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    if (!(date instanceof Date) || isNaN(date)) {
      return '시간 없음';
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return '방금 전';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}분 전`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}시간 전`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}일 전`;
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months}개월 전`;
    } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `${years}년 전`;
    }
  },
};

// 유효성 검사 함수들
export const validators = {
  // 이메일 유효성 검사
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // 전화번호 유효성 검사 (한국)
  phone: (phone) => {
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    return phoneRegex.test(phone);
  },

  // 비밀번호 강도 검사
  password: (password) => {
    if (password.length < 8) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;
    if (!/[!@#$%^&*]/.test(password)) return false;
    return true;
  },

  // 필수 입력값 검사
  required: (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return true;
  },

  // 숫자 범위 검사
  numberRange: (value, min, max) => {
    const num = Number(value);
    if (isNaN(num)) return false;
    return num >= min && num <= max;
  },
};

// 기타 유틸리티 함수들
export const utils = {
  // 딥 클론
  deepClone: (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map((item) => utils.deepClone(item));
    if (typeof obj === 'object') {
      const clonedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = utils.deepClone(obj[key]);
        }
      }
      return clonedObj;
    }
    return obj;
  },

  // 배열에서 중복 제거
  uniqueArray: (arr, key = null) => {
    if (!Array.isArray(arr)) return [];

    if (key) {
      // 객체 배열에서 특정 키 기준으로 중복 제거
      const seen = new Set();
      return arr.filter((item) => {
        const value = item[key];
        if (seen.has(value)) return false;
        seen.add(value);
        return true;
      });
    } else {
      // 원시값 배열에서 중복 제거
      return [...new Set(arr)];
    }
  },

  // 디바운스 함수
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // 쓰로틀 함수
  throttle: (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // 랜덤 문자열 생성
  randomString: (length = 10) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  // URL 쿼리 파라미터 파싱
  parseQueryParams: (url = window.location.href) => {
    const params = {};
    const urlObj = new URL(url);
    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  },

  // 객체를 쿼리 파라미터 문자열로 변환
  objectToQueryString: (obj) => {
    return Object.keys(obj)
      .filter((key) => obj[key] !== null && obj[key] !== undefined && obj[key] !== '')
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join('&');
  },
};

export default { formatter, validators, utils };
