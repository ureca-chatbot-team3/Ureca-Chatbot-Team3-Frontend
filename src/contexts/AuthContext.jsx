import { createContext, useContext, useReducer, useEffect } from 'react';
import { authApi } from '../apis/authApi';

// 초기 상태
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// 액션 타입
const actionTypes = {
  AUTH_START: 'AUTH_START',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// 리듀서
const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case actionTypes.AUTH_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// 컨텍스트 생성
const AuthContext = createContext(null);

// 프로바이더 컴포넌트
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 로그인
  const login = async (email, password) => {
    try {
      dispatch({ type: actionTypes.AUTH_START });
      const response = await authApi.login(email, password);
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        payload: response.data,
      });
      return { success: true, data: response.data };
    } catch (error) {
      dispatch({
        type: actionTypes.AUTH_FAILURE,
        payload: error.message,
      });
      return { success: false, error: error.message };
    }
  };

  // 회원가입
  const register = async (userData) => {
    try {
      dispatch({ type: actionTypes.AUTH_START });
      const response = await authApi.register(userData);
      dispatch({ type: actionTypes.REGISTER_SUCCESS }); // 회원가입 성공 후 로딩 상태 종료
      return { success: true, data: response.data };
    } catch (error) {
      dispatch({
        type: actionTypes.AUTH_FAILURE,
        payload: error.message,
      });
      return { success: false, error: error.message };
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      await authApi.logout();
      dispatch({ type: actionTypes.LOGOUT });
      return { success: true };
    } catch (error) {
      console.error('로그아웃 오류:', error);
      dispatch({ type: actionTypes.LOGOUT }); // 에러가 있어도 로컬 상태는 리셋
      return { success: true }; // 로그아웃은 항상 성공으로 처리
    }
  };

  // 프로필 확인 (페이지 새로고침 시 인증 상태 복원)
  const checkAuth = async () => {
    try {
      const response = await authApi.getProfile();
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: actionTypes.AUTH_FAILURE, payload: null });
    }
  };

  // 에러 클리어
  const clearError = () => {
    dispatch({ type: actionTypes.CLEAR_ERROR });
  };

  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    ...state,
    login,
    register,
    logout,
    checkAuth,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내에서 사용되어야 합니다.');
  }
  return context;
};

export default AuthContext;
