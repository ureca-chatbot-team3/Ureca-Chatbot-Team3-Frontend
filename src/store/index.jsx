import { DiagnosisProvider } from './DiagnosisContext';

// 전역 상태 관리를 위한 Provider 조합
export const StoreProvider = ({ children }) => {
  return <DiagnosisProvider>{children}</DiagnosisProvider>;
};

// 개별 Context들을 내보내기
export { DiagnosisProvider, useDiagnosis } from './DiagnosisContext';
