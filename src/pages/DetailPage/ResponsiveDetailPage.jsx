import { useMediaQuery } from 'react-responsive';
import DetailPage from './DetailPage';
import MobileDetailPage from './MobileDetailPage';

const ResponsiveDetailPage = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return isMobile ? <MobileDetailPage /> : <DetailPage />;
};

export default ResponsiveDetailPage;
