import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import { ProtectedRoute, PublicRoute } from '../components/ProtectedRoute';
import { AuthProvider } from '../contexts/AuthContext';
import MainPage from '@/pages/MainPage/MainPage';
import LoginPage from '@/pages/AuthPage/LoginPage';
import SignupPage from '@/pages/AuthPage/SignupPage';
import DiagnosisPage from '../pages/DiagnosisPage/DiagnosisPage';
import DiagnosisResultPage from '../pages/DiagnosisPage/DiagnosisResultPage';
import ComparePage from '../pages/ComparePage/ComparePage';
import MyPage from '../pages/MyPage/MyPage';
import PasswordChangePage from '../pages/MyPage/PasswordChangePage';
import BookmarkPage from '../pages/MyPage/BookmarkPage';
import ChatbotGuide from '../pages/ChatbotGuide/ChatbotGuide';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <DefaultLayout />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'diagnosis',
        element: <DiagnosisPage />,
      },
      {
        path: 'diagnosis/result',
        element: <DiagnosisResultPage />,
      },
      {
        path: 'diagnosis/result/:sessionId',
        element: <DiagnosisResultPage />,
      },
      {
        path: 'compare',
        element: <ComparePage />,
      },
      {
        path: 'chatbotGuide',
        element: <ChatbotGuide />,
      },
      {
        path: 'mypage',
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'mypage/password-change',
        element: (
          <ProtectedRoute>
            <PasswordChangePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'mypage/bookmarks',
        element: (
          <ProtectedRoute>
            <BookmarkPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <AuthProvider>
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      </AuthProvider>
    ),
  },
  {
    path: '/signup',
    element: (
      <AuthProvider>
        <PublicRoute>
          <SignupPage />
        </PublicRoute>
      </AuthProvider>
    ),
  },
]);
