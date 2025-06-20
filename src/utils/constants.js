// 에러 메시지 상수
export const ERROR_MESSAGES = {
  // 네트워크 에러
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  SERVER_ERROR: '서버에 일시적인 문제가 발생했습니다.',

  // 인증 에러
  UNAUTHORIZED: '로그인이 필요합니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  TOKEN_EXPIRED: '로그인이 만료되었습니다. 다시 로그인해주세요.',

  // 검증 에러
  INVALID_EMAIL: '올바른 이메일 형식을 입력해주세요.',
  INVALID_PASSWORD: '비밀번호 형식이 올바르지 않습니다.',
  INVALID_NICKNAME: '닉네임 형식이 올바르지 않습니다.',

  // 일반적인 에러
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
  FORM_VALIDATION_ERROR: '입력 정보를 확인해주세요.',
};

// 성공 메시지 상수
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: '로그인에 성공했습니다!',
  REGISTER_SUCCESS: '회원가입이 완료되었습니다!',
  LOGOUT_SUCCESS: '로그아웃되었습니다.',
};

// 에러 코드별 메시지 매핑
export const getErrorMessage = (error) => {
  if (!error) return ERROR_MESSAGES.UNKNOWN_ERROR;

  if (typeof error === 'string') return error;

  if (error.response?.status) {
    switch (error.response.status) {
      case 400:
        return ERROR_MESSAGES.FORM_VALIDATION_ERROR;
      case 401:
        return ERROR_MESSAGES.UNAUTHORIZED;
      case 403:
        return ERROR_MESSAGES.FORBIDDEN;
      case 409:
        return '이미 존재하는 정보입니다.';
      case 429:
        return '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.';
      case 500:
        return ERROR_MESSAGES.SERVER_ERROR;
      default:
        return error.response.data?.message || ERROR_MESSAGES.UNKNOWN_ERROR;
    }
  }

  if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network')) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  return error.message || ERROR_MESSAGES.UNKNOWN_ERROR;
};
