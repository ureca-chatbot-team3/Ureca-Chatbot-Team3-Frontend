import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import { ProtectedRoute, PublicRoute } from '../components/ProtectedRoute';
import MainPage from '@/pages/MainPage/MainPage';
import LoginPage from '@/pages/AuthPage/LoginPage';
import SignupPage from '@/pages/AuthPage/SignupPage';
import DiagnosisPage from '../pages/DiagnosisPage/DiagnosisPage';
import DiagnosisResultPage from '../pages/DiagnosisPage/DiagnosisResultPage';
import ComparePage from '../pages/ComparePage/ComparePage';

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
      // 마이페이지는 이후 추가 예정
      // {
      //   path: 'mypage',
      //   element: (
      //     <ProtectedRoute>
      //       <MyPage />
      //     </ProtectedRoute>
      //   ),
      // },
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
