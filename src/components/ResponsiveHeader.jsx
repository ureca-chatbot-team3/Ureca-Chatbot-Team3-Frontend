import { useEffect, useState } from 'react';
import Header from './Header';
import MobileHeader from './MobileHeader';

const ResponsiveHeader = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <MobileHeader /> : <Header />;
};

export default ResponsiveHeader;
