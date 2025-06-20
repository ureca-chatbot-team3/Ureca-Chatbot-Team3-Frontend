import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

// 인증이 필요한 페이지를 보호하는 컴포넌트
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000); // 3초 후 로딩 강제 종료

    return () => clearTimeout(timer);
  }, []);

  if (isLoading && showLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // 로그인 후 원래 페이지로 돌아갈 수 있도록 현재 위치를 state에 저장
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// 인증된 사용자가 접근하면 안 되는 페이지를 보호하는 컴포넌트 (로그인, 회원가입)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000); // 2초 후 로딩 강제 종료

    return () => clearTimeout(timer);
  }, []);

  if (isLoading && showLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    // 로그인된 사용자는 원래 가려던 페이지 또는 메인 페이지로 리다이렉트
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return children;
};

export { ProtectedRoute, PublicRoute };
