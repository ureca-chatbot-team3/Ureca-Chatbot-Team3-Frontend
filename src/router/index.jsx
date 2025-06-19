import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import MainPage from '../pages/MainPage/MainPage';
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
    ],
  },
]);
