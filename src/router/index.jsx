import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import MainPage from '../pages/MainPage/MainPage';
import PlanListPage from '../pages/PlanListPage/PlanListPage';

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
    ],
  },
]);
