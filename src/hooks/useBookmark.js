import { useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBookmarkContext } from '../contexts/BookmarkContext';

export const useBookmark = (planId) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const {
    isBookmarked: checkIsBookmarked,
    toggleBookmark: contextToggleBookmark,
    isLoading,
  } = useBookmarkContext();

  const isBookmarked = checkIsBookmarked(planId);

  // 북마크 토글
  const toggleBookmark = useCallback(async () => {
    if (!planId) {
      console.error('planId가 없습니다.');
      return { success: false, message: '요금제 ID가 없습니다.' };
    }

    if (!isAuthenticated) {
      return { success: false, needsLogin: true };
    }

    return await contextToggleBookmark(planId);
  }, [planId, isAuthenticated, contextToggleBookmark]);

  return {
    isBookmarked,
    isLoading: authLoading || isLoading,
    toggleBookmark,
  };
};
