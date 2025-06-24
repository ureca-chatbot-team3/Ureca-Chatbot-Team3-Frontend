import { useState, useEffect } from 'react';

const useScrollHashSync = (sectionIds) => {
  const [activeId, setActiveId] = useState(sectionIds[0] || '');

  useEffect(() => {
    const handleScroll = () => {
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

      if (maxSection.id && maxSection.id !== activeId) {
        setActiveId(maxSection.id);
        window.history.replaceState(null, '', `#${maxSection.id}`);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeId, sectionIds]);

  return activeId;
};

export default useScrollHashSync;
