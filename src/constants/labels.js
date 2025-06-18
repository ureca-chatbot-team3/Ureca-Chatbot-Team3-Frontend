// 진단 관련 라벨과 텍스트
export const diagnosisLabels = {
  // 페이지 제목
  pageTitle: '요금제 진단',
  pageSubtitle: '몇 가지 질문으로 고객님에게 맞는 요금제를 찾아드립니다.',

  // 진행 상태
  progressLabel: '요금제 추천 질문',

  // 버튼 텍스트
  buttons: {
    previous: '이전 질문',
    next: '다음 질문',
    complete: '진단 완료',
    retry: '다시 진단하기',
    goHome: '홈으로 가기',
    startDiagnosis: '진단 시작하기',
    tryAgain: '다시 시도',
  },

  // 상태 메시지
  messages: {
    loading: '질문을 불러오는 중입니다...',
    loadingResult: '진단 결과를 불러오는 중입니다...',
    preparing: '질문을 준비 중입니다...',
    selectAnswer: '답변을 선택해주세요.',
    noResult: '진단 결과가 없습니다',
    noResultDesc: '먼저 요금제 진단을 받아보세요.',
    errorOccurred: '오류가 발생했습니다',
    cannotLoadResult: '결과를 불러올 수 없습니다',
    completedTitle: '진단이 완료되었습니다!',
    completedDesc: '고객님께 맞는 요금제를 추천해드립니다.',
    noRecommendation: '조건에 맞는 요금제를 찾을 수 없습니다.',
    submitFailed: '진단 제출에 실패했습니다. 다시 시도해주세요.',
  },

  // 결과 페이지
  result: {
    analysisTitle: '분석 결과',
    recommendationTitle: '추천 요금제',
    budget: '예산',
    dataUsage: '예상 데이터 사용량',
    age: '연령대',
    matchingScore: '매칭 점수',
    matchingRate: '매칭률',
    recommendationReason: '추천 이유:',
  },

  // 단위
  units: {
    won: '원',
    gb: 'GB',
    age: '세',
    score: '점',
    percent: '%',
  },
};

// 일반적인 UI 라벨
export const commonLabels = {
  // 네비게이션
  navigation: {
    home: '홈',
    plans: '요금제',
    compare: '요금제 비교',
    diagnosis: '요금제 진단',
    chatbot: '챗봇 안내',
    store: '매장 찾기',
    login: '로그인',
    logout: '로그아웃',
    profile: '프로필',
  },

  // 공통 버튼
  buttons: {
    confirm: '확인',
    cancel: '취소',
    save: '저장',
    delete: '삭제',
    edit: '편집',
    add: '추가',
    remove: '제거',
    search: '검색',
    filter: '필터',
    sort: '정렬',
    refresh: '새로고침',
    submit: '제출',
    reset: '초기화',
    close: '닫기',
    back: '이전',
    next: '다음',
    more: '더보기',
    less: '접기',
  },

  // 상태 메시지
  status: {
    loading: '로딩 중...',
    success: '성공',
    error: '오류',
    warning: '경고',
    info: '정보',
    empty: '데이터가 없습니다',
    notFound: '찾을 수 없습니다',
    unauthorized: '권한이 없습니다',
    forbidden: '접근이 금지되었습니다',
    serverError: '서버 오류가 발생했습니다',
    networkError: '네트워크 오류가 발생했습니다',
  },

  // 폼 관련
  form: {
    required: '필수 입력 항목입니다',
    invalid: '올바르지 않은 형식입니다',
    tooShort: '너무 짧습니다',
    tooLong: '너무 깁니다',
    invalidEmail: '올바른 이메일 주소를 입력해주세요',
    invalidPhone: '올바른 전화번호를 입력해주세요',
    passwordMismatch: '비밀번호가 일치하지 않습니다',
    weakPassword: '비밀번호가 너무 약합니다',
  },

  // 시간 관련
  time: {
    just: '방금',
    minute: '분',
    hour: '시간',
    day: '일',
    week: '주',
    month: '개월',
    year: '년',
    ago: '전',
    later: '후',
    today: '오늘',
    yesterday: '어제',
    tomorrow: '내일',
  },
};

// API 관련 상수
export const apiConstants = {
  // HTTP 상태 코드
  statusCodes: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  },

  // 요청 타임아웃 (밀리초)
  timeouts: {
    default: 10000,
    upload: 30000,
    download: 60000,
  },

  // 에러 메시지
  errors: {
    network: '네트워크 연결을 확인해주세요',
    timeout: '요청 시간이 초과되었습니다',
    server: '서버에서 오류가 발생했습니다',
    notFound: '요청한 리소스를 찾을 수 없습니다',
    unauthorized: '로그인이 필요합니다',
    forbidden: '접근 권한이 없습니다',
    validation: '입력 데이터가 올바르지 않습니다',
    conflict: '이미 존재하는 데이터입니다',
  },
};

// 진단 질문 타입
export const diagnosisQuestionTypes = {
  SINGLE: 'single',
  MULTIPLE: 'multiple',
  RANGE: 'range',
  INPUT: 'input',
};

// 진단 카테고리
export const diagnosisCategories = {
  DATA: 'data',
  BUDGET: 'budget',
  USAGE: 'usage',
  AGE: 'age',
  PREFERENCE: 'preference',
};

// 애니메이션 지속시간 (밀리초)
export const animationDurations = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// 브레이크포인트
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// 색상 (CSS 변수명)
export const colors = {
  primary: 'var(--color-pink-700)',
  secondary: 'var(--color-gray-500)',
  success: 'var(--color-mint-700)',
  warning: 'var(--color-peach-400)',
  error: '#ef4444',
  black: 'var(--color-black)',
  white: 'var(--color-white)',
  gray: {
    100: 'var(--color-gray-200)',
    300: 'var(--color-gray-400)',
    500: 'var(--color-gray-500)',
    700: 'var(--color-gray-700)',
  },
  pink: {
    100: 'var(--color-pink-200)',
    300: 'var(--color-pink-300)',
    400: 'var(--color-pink-400)',
    500: 'var(--color-pink-500)',
    700: 'var(--color-pink-700)',
  },
};

// 레이아웃 상수
export const layout = {
  headerHeight: 112,
  maxWidth: 1440,
  sidebarWidth: 280,
  containerPadding: 40,
};

export default {
  diagnosisLabels,
  commonLabels,
  apiConstants,
  diagnosisQuestionTypes,
  diagnosisCategories,
  animationDurations,
  breakpoints,
  colors,
  layout,
};
