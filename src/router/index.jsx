import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import PlanListPage from '../pages/PlanListPage/PlanListPage';
import { ProtectedRoute, PublicRoute } from '../components/ProtectedRoute';
import MainPage from '@/pages/MainPage/MainPage';
import LoginPage from '@/pages/AuthPage/LoginPage';
import SignupPage from '@/pages/AuthPage/SignupPage';
import DiagnosisPage from '../pages/DiagnosisPage/DiagnosisPage';
import DiagnosisResultPage from '../pages/DiagnosisPage/DiagnosisResultPage';
import ComparePage from '../pages/ComparePage/ComparePage';
import MyPage from '../pages/MyPage/MyPage';
import ChatbotGuide from '../pages/ChatbotGuide/ChatbotGuide';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
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
    ],
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <PublicRoute>
        <SignupPage />
      </PublicRoute>
    ),
  },
]);
