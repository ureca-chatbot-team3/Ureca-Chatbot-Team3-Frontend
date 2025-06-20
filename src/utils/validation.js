// 폼 검증 유틸리티 함수들

// 이메일 검증
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return '이메일을 입력해주세요.';
  }
  if (!emailRegex.test(email)) {
    return '올바른 이메일 형식을 입력해주세요.';
  }
  return '';
};

// 비밀번호 검증
export const validatePassword = (password) => {
  if (!password) {
    return '비밀번호를 입력해주세요.';
  }
  if (password.length < 10) {
    return '비밀번호는 최소 10자 이상이어야 합니다.';
  }
  if (password.length > 20) {
    return '비밀번호는 최대 20자까지 입력 가능합니다.';
  }

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasLetter || !hasNumber || !hasSpecialChar) {
    return '비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.';
  }

  return '';
};

// 비밀번호 확인 검증
export const validatePasswordConfirm = (password, passwordConfirm) => {
  if (!passwordConfirm) {
    return '비밀번호 확인을 입력해주세요.';
  }
  if (password !== passwordConfirm) {
    return '비밀번호가 일치하지 않습니다.';
  }
  return '';
};

// 닉네임 검증
export const validateNickname = (nickname) => {
  if (!nickname) {
    return '닉네임을 입력해주세요.';
  }
  if (nickname.length < 2) {
    return '닉네임은 최소 2자 이상이어야 합니다.';
  }
  if (nickname.length > 8) {
    return '닉네임은 최대 8자까지 입력 가능합니다.';
  }
  if (/\s/.test(nickname)) {
    return '닉네임에는 공백을 포함할 수 없습니다.';
  }
  return '';
};

// 출생연도 검증
export const validateBirthYear = (birthYear) => {
  const currentYear = new Date().getFullYear();
  const year = parseInt(birthYear);

  if (!birthYear) {
    return '출생연도를 입력해주세요.';
  }
  if (isNaN(year)) {
    return '올바른 년도를 입력해주세요.';
  }
  if (year < 1900) {
    return '1900년 이후의 년도를 입력해주세요.';
  }
  if (year > currentYear) {
    return '올바른 출생연도를 입력해주세요.';
  }
  return '';
};

// 로그인 폼 검증
export const validateLoginForm = (formData) => {
  const errors = {};

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  if (!formData.password) {
    errors.password = '비밀번호를 입력해주세요.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// 회원가입 폼 검증
export const validateSignupForm = (formData) => {
  const errors = {};

  const nicknameError = validateNickname(formData.nickname);
  if (nicknameError) errors.nickname = nicknameError;

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;

  const passwordConfirmError = validatePasswordConfirm(formData.password, formData.passwordConfirm);
  if (passwordConfirmError) errors.passwordConfirm = passwordConfirmError;

  const birthYearError = validateBirthYear(formData.birthYear);
  if (birthYearError) errors.birthYear = birthYearError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
