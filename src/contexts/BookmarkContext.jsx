import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { planApi } from '../apis/planApi';
import { useAuth } from './AuthContext';

const BookmarkContext = createContext(null);

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedPlanIds, setBookmarkedPlanIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // 보관함 목록 가져오기 (한 번만 실행)
  const loadBookmarks = useCallback(async () => {
    if (!isAuthenticated || authLoading || hasLoaded) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await planApi.getBookmarkedPlans();
      const planIds = response.data.bookmarks.map((bookmark) => bookmark.plan._id);
      setBookmarkedPlanIds(new Set(planIds));
      setHasLoaded(true);
    } catch (error) {
      console.warn('보관함 목록 조회 실패:', error.message);
      setBookmarkedPlanIds(new Set());
      setHasLoaded(true);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, authLoading, hasLoaded]);

  // 북마크 추가
  const addBookmark = useCallback(
    async (planId) => {
      if (!planId || !isAuthenticated) {
        return { success: false, needsLogin: !isAuthenticated };
      }

      try {
        await planApi.addBookmark(planId);
        setBookmarkedPlanIds((prev) => new Set([...prev, planId]));
        return { success: true, action: 'added', message: '보관함에 추가되었습니다.' };
      } catch (error) {
        console.error('북마크 추가 오류:', error);
        const errorMessage = error?.response?.data?.message || error.message || '';

        if (errorMessage.includes('이미 보관함에 추가된')) {
          setBookmarkedPlanIds((prev) => new Set([...prev, planId]));
          return { success: false, message: '이미 보관함에 추가된 요금제입니다.' };
        }

        return {
          success: false,
          message: errorMessage || '오류가 발생했습니다. 다시 시도해주세요.',
        };
      }
    },
    [isAuthenticated]
  );

  // 북마크 제거
  const removeBookmark = useCallback(
    async (planId) => {
      if (!planId || !isAuthenticated) {
        return { success: false, needsLogin: !isAuthenticated };
      }

      try {
        await planApi.removeBookmark(planId);
        setBookmarkedPlanIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(planId);
          return newSet;
        });
        return { success: true, action: 'removed', message: '보관함에서 제거되었습니다.' };
      } catch (error) {
        console.error('북마크 제거 오류:', error);
        const errorMessage = error?.response?.data?.message || error.message || '';
        return {
          success: false,
          message: errorMessage || '오류가 발생했습니다. 다시 시도해주세요.',
        };
      }
    },
    [isAuthenticated]
  );

  // 북마크 토글
  const toggleBookmark = useCallback(
    async (planId) => {
      const isBookmarked = bookmarkedPlanIds.has(planId);

      if (isBookmarked) {
        return await removeBookmark(planId);
      } else {
        return await addBookmark(planId);
      }
    },
    [bookmarkedPlanIds, addBookmark, removeBookmark]
  );

  // 북마크 상태 확인
  const isBookmarked = useCallback(
    (planId) => {
      return bookmarkedPlanIds.has(planId);
    },
    [bookmarkedPlanIds]
  );

  // 인증 상태 변경 시 북마크 목록 로드
  useEffect(() => {
    if (!authLoading) {
      if (isAuthenticated) {
        loadBookmarks();
      } else {
        // 로그아웃 시 상태 초기화
        setBookmarkedPlanIds(new Set());
        setHasLoaded(false);
      }
    }
  }, [isAuthenticated, authLoading, loadBookmarks]);

  const value = {
    bookmarkedPlanIds,
    isLoading,
    hasLoaded,
    isBookmarked,
    toggleBookmark,
    addBookmark,
    removeBookmark,
    loadBookmarks,
  };

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
};

export const useBookmarkContext = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarkContext는 BookmarkProvider 내에서 사용되어야 합니다.');
  }
  return context;
};

export default BookmarkContext;
