// 북마크 관련 목업 데이터 및 함수
export const mockBookmarkApi = {
  // 북마크 상태 확인 (항상 false 반환)
  checkBookmarkStatus: async (planId) => {
    console.warn('목업 API 사용 중: checkBookmarkStatus');
    return {
      success: true,
      data: { isBookmarked: false },
    };
  },

  // 북마크 추가
  addBookmark: async (planId) => {
    console.warn('목업 API 사용 중: addBookmark');
    return {
      success: true,
      message: '보관함에 추가되었습니다. (목업 모드)',
    };
  },

  // 북마크 제거
  removeBookmark: async (planId) => {
    console.warn('목업 API 사용 중: removeBookmark');
    return {
      success: true,
      message: '보관함에서 제거되었습니다. (목업 모드)',
    };
  },

  // 보관함 조회
  getBookmarks: async () => {
    console.warn('목업 API 사용 중: getBookmarks');
    return {
      success: true,
      data: { bookmarks: [] },
    };
  },
};
