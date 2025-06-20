import { createContext, useContext, useReducer } from 'react';
import { diagnosisApi } from '../apis/diagnosisApi';

// 초기 상태
const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  sessionId: null,
  result: null,
  isLoading: false,
  error: null,
  isComplete: false,
};

// 액션 타입
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_QUESTIONS: 'SET_QUESTIONS',
  SET_CURRENT_QUESTION: 'SET_CURRENT_QUESTION',
  ADD_ANSWER: 'ADD_ANSWER',
  UPDATE_ANSWER: 'UPDATE_ANSWER',
  SET_SESSION_ID: 'SET_SESSION_ID',
  SET_RESULT: 'SET_RESULT',
  SET_COMPLETE: 'SET_COMPLETE',
  RESET_DIAGNOSIS: 'RESET_DIAGNOSIS',
  PREVIOUS_QUESTION: 'PREVIOUS_QUESTION',
  NEXT_QUESTION: 'NEXT_QUESTION',
};

// 리듀서
const diagnosisReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload, error: null };

    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };

    case actionTypes.SET_QUESTIONS:
      return { ...state, questions: action.payload, isLoading: false };

    case actionTypes.SET_CURRENT_QUESTION:
      return { ...state, currentQuestionIndex: action.payload };

    case actionTypes.ADD_ANSWER:
      return {
        ...state,
        answers: [...state.answers, action.payload],
      };

    case actionTypes.UPDATE_ANSWER:
      return {
        ...state,
        answers: state.answers.map((answer) =>
          answer.questionId === action.payload.questionId
            ? { ...answer, answer: action.payload.answer }
            : answer
        ),
      };

    case actionTypes.SET_SESSION_ID:
      return { ...state, sessionId: action.payload };

    case actionTypes.SET_RESULT:
      return { ...state, result: action.payload, isLoading: false };

    case actionTypes.SET_COMPLETE:
      return { ...state, isComplete: action.payload };

    case actionTypes.PREVIOUS_QUESTION:
      return {
        ...state,
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
      };

    case actionTypes.NEXT_QUESTION:
      return {
        ...state,
        currentQuestionIndex: Math.min(state.questions.length - 1, state.currentQuestionIndex + 1),
      };

    case actionTypes.RESET_DIAGNOSIS:
      return {
        ...initialState,
        questions: state.questions, // 질문은 유지
      };

    default:
      return state;
  }
};

// Context 생성
const DiagnosisContext = createContext(null);

// Provider 컴포넌트
export const DiagnosisProvider = ({ children }) => {
  const [state, dispatch] = useReducer(diagnosisReducer, initialState);

  // 질문 목록 로드
  const loadQuestions = async () => {
    if (state.questions.length > 0) return; // 이미 로드된 경우 스킵

    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    try {
      const response = await diagnosisApi.getQuestions();
      if (response.success) {
        dispatch({ type: actionTypes.SET_QUESTIONS, payload: response.data });
      } else {
        throw new Error(response.message || '질문을 불러오는데 실패했습니다.');
      }
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
    }
  };

  // 답변 추가/업데이트
  const setAnswer = (questionId, answer) => {
    const existingAnswer = state.answers.find((a) => a.questionId === questionId);

    if (existingAnswer) {
      dispatch({
        type: actionTypes.UPDATE_ANSWER,
        payload: { questionId, answer },
      });
    } else {
      dispatch({
        type: actionTypes.ADD_ANSWER,
        payload: { questionId, answer },
      });
    }
  };

  // 이전 질문으로
  const previousQuestion = () => {
    if (state.currentQuestionIndex > 0) {
      dispatch({ type: actionTypes.PREVIOUS_QUESTION });
    }
  };

  // 다음 질문으로
  const nextQuestion = () => {
    if (state.currentQuestionIndex < state.questions.length - 1) {
      dispatch({ type: actionTypes.NEXT_QUESTION });
    }
  };

  // 특정 질문으로 이동
  const goToQuestion = (index) => {
    if (index >= 0 && index < state.questions.length) {
      dispatch({ type: actionTypes.SET_CURRENT_QUESTION, payload: index });
    }
  };

  // 진단 결과 제출
  const submitDiagnosis = async () => {
    if (state.answers.length === 0) {
      dispatch({ type: actionTypes.SET_ERROR, payload: '답변이 없습니다.' });
      return;
    }

    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    try {
      const response = await diagnosisApi.submitAnswers(state.answers, state.sessionId);
      if (response.success) {
        dispatch({ type: actionTypes.SET_SESSION_ID, payload: response.data.sessionId });
        dispatch({ type: actionTypes.SET_RESULT, payload: response.data });
        dispatch({ type: actionTypes.SET_COMPLETE, payload: true });
        return response.data;
      } else {
        throw new Error(response.message || '진단 제출에 실패했습니다.');
      }
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // 진단 결과 조회
  const getResult = async (sessionId) => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    try {
      const response = await diagnosisApi.getResult(sessionId);
      if (response.success) {
        dispatch({ type: actionTypes.SET_RESULT, payload: response.data });
        dispatch({ type: actionTypes.SET_SESSION_ID, payload: sessionId });
        return response.data;
      } else {
        throw new Error(response.message || '결과를 불러오는데 실패했습니다.');
      }
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // 진단 초기화
  const resetDiagnosis = () => {
    dispatch({ type: actionTypes.RESET_DIAGNOSIS });
  };

  // 컨텍스트 값
  const value = {
    // 상태
    ...state,
    // 현재 질문
    currentQuestion: state.questions[state.currentQuestionIndex] || null,
    // 현재 질문의 답변
    currentAnswer:
      state.answers.find((a) => a.questionId === state.questions[state.currentQuestionIndex]?._id)
        ?.answer || '',
    // 진행률
    progress:
      state.questions.length > 0
        ? ((state.currentQuestionIndex + 1) / state.questions.length) * 100
        : 0,
    // 전체 질문 수
    totalQuestions: state.questions.length,
    // 현재 질문 번호 (1부터 시작)
    currentQuestionNumber: state.currentQuestionIndex + 1,
    // 네비게이션 가능 여부
    canGoPrevious: state.currentQuestionIndex > 0,
    canGoNext: state.currentQuestionIndex < state.questions.length - 1,
    // 진단 완료 가능 여부
    canSubmit: state.answers.length === state.questions.length,

    // 액션
    loadQuestions,
    setAnswer,
    previousQuestion,
    nextQuestion,
    goToQuestion,
    submitDiagnosis,
    getResult,
    resetDiagnosis,
  };

  return <DiagnosisContext.Provider value={value}>{children}</DiagnosisContext.Provider>;
};

// Hook
export const useDiagnosis = () => {
  const context = useContext(DiagnosisContext);
  if (!context) {
    throw new Error('useDiagnosis must be used within a DiagnosisProvider');
  }
  return context;
};

export default DiagnosisContext;
