import { useEffect, useRef } from 'react';

const HEADER_HEIGHT = 112;

export function useAutoScrollToSection(targetRef) {
  const isAutoScrolling = useRef(false);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    if (!targetRef.current) return;

    const handleScroll = () => {
      if (!targetRef.current || isAutoScrolling.current) return;

      const currentScrollY = window.scrollY;
      // 아래로 스크롤 할 때만 작동
      if (currentScrollY <= lastScrollY.current) {
        lastScrollY.current = currentScrollY;
        return;
      }

      const rect = targetRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const visibleRatio = visibleHeight / rect.height;

      if (visibleRatio > 0.2 && rect.top > HEADER_HEIGHT) {
        isAutoScrolling.current = true;

        window.scrollTo({
          top: window.scrollY + rect.top - HEADER_HEIGHT,
          behavior: 'smooth',
        });

        setTimeout(() => {
          isAutoScrolling.current = false;
        }, 500);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetRef]);
}
