import { useEffect, useRef, useState } from 'react';

const useScrollHashSync = (sectionIds, initialId = '', enabled = true) => {
  const [activeId, setActiveId] = useState(initialId || sectionIds[0] || '');
  const activeIdRef = useRef(activeId);
  const ticking = useRef(false);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;

      window.requestAnimationFrame(() => {
        const viewportHeight = window.innerHeight;

        const visibleSections = sectionIds.map((id) => {
          const elem = document.getElementById(id);
          if (!elem) return { id, visibleHeight: 0 };

          const rect = elem.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > viewportHeight) {
            return { id, visibleHeight: 0 };
          }

          const visibleTop = Math.max(rect.top, 0);
          const visibleBottom = Math.min(rect.bottom, viewportHeight);
          const visibleHeight = visibleBottom - visibleTop;

          return { id, visibleHeight };
        });

        const maxSection = visibleSections.reduce(
          (max, section) => (section.visibleHeight > max.visibleHeight ? section : max),
          { id: '', visibleHeight: 0 }
        );

        if (maxSection.id && maxSection.id !== activeIdRef.current) {
          activeIdRef.current = maxSection.id;
          setActiveId(maxSection.id);
          window.history.replaceState(null, '', `#${maxSection.id}`);
        }

        ticking.current = false;
      });
    };

    const initId = initialId || (sectionIds.includes('intro') ? 'intro' : sectionIds[0]);
    setActiveId(initId);
    activeIdRef.current = initId;
    window.history.replaceState(null, '', `#${initId}`);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, enabled, initialId]);

  return activeId;
};

export default useScrollHashSync;
