import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import PlanListPage from '../pages/PlanListPage/PlanListPage';
import { ProtectedRoute, PublicRoute } from '../components/ProtectedRoute';
import { AuthProvider } from '../contexts/AuthContext';
import { BookmarkProvider } from '../contexts/BookmarkContext';
import MainPage from '@/pages/MainPage/MainPage';
import LoginPage from '@/pages/AuthPage/LoginPage';
import SignupPage from '@/pages/AuthPage/SignupPage';
import DiagnosisPage from '../pages/DiagnosisPage/DiagnosisPage';
import DiagnosisResultPage from '../pages/DiagnosisPage/DiagnosisResultPage';
import ComparePage from '../pages/ComparePage/ComparePage';
import MyPage from '../pages/MyPage/MyPage';
import PasswordChangePage from '../pages/MyPage/PasswordChangePage';
import BookmarkPage from '../pages/MyPage/BookmarkPage';
import ChatHistoryPage from '../pages/MyPage/ChatHistoryPage';
import ChatbotGuidePage from '../pages/ChatbotGuidePage/ChatbotGuidePage';
import ResponsiveDetailPage from '../pages/DetailPage/ResponsiveDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <BookmarkProvider>
          <DefaultLayout />
        </BookmarkProvider>
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'plans',
        element: <PlanListPage />,
      },
      {
        path: '/plans/:id',
        element: <ResponsiveDetailPage />,
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
        path: 'chatbot-guide',
        element: <ChatbotGuidePage />,
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
      {
        path: 'mypage/chat-history',
        element: (
          <ProtectedRoute>
            <ChatHistoryPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <AuthProvider>
        <BookmarkProvider>
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        </BookmarkProvider>
      </AuthProvider>
    ),
  },
  {
    path: '/signup',
    element: (
      <AuthProvider>
        <BookmarkProvider>
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        </BookmarkProvider>
      </AuthProvider>
    ),
  },
]);
