// src/utils/imageUtils.js
import { useState, useEffect } from 'react';

/**
 * 이미지 URL을 처리하는 유틸리티 함수
 * @param {string} imagePath - 이미지 경로
 * @param {string} fallbackImage - 기본 이미지 경로
 * @returns {string} 처리된 이미지 URL
 */
export const getImageUrl = (imagePath, fallbackImage = '/noImageImg.svg') => {
  if (!imagePath) {
    return fallbackImage;
  }

  // 이미 완전한 URL인 경우
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // 상대 경로인 경우 백엔드 서버 URL 추가
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000';
  const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

  return `${baseUrl}${path}`;
};

/**
 * 요금제 데이터에서 혜택을 배열로 변환하는 함수
 * @param {object|array} benefits - 혜택 데이터
 * @returns {array} 혜택 배열
 */
export const processBenefits = (benefits) => {
  if (!benefits) return [];

  if (Array.isArray(benefits)) {
    return benefits;
  }

  if (typeof benefits === 'object') {
    return Object.entries(benefits).map(([key, value]) => `${key}: ${value}`);
  }

  return [];
};

/**
 * 이미지 로드 상태를 관리하는 커스텀 훅
 * @param {string} imageUrl - 이미지 URL
 * @returns {object} { isLoading, hasError, reload }
 */
export const useImageLoader = (imageUrl) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    const img = new Image();

    img.onload = () => {
      setIsLoading(false);
      setHasError(false);
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };

    img.src = imageUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  const reload = () => {
    setIsLoading(true);
    setHasError(false);
    const img = new Image();
    img.onload = () => {
      setIsLoading(false);
      setHasError(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
    img.src = imageUrl;
  };

  return { isLoading, hasError, reload };
};
