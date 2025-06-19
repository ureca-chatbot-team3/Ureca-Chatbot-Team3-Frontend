import { useEffect, useState } from 'react';

// 스크롤 위치를 추적하는 훅
export const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId = null;
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // 스크롤 방향 결정
      if (currentScrollTop > lastScrollTop) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      setScrollPosition(currentScrollTop);
      setIsScrolling(true);

      // 스크롤이 끝났는지 감지
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return {
    scrollPosition,
    scrollDirection,
    isScrolling,
    isAtTop: scrollPosition === 0,
    isScrolledDown: scrollPosition > 100,
  };
};

// API 호출 상태를 관리하는 훅
export const useApiState = (initialLoading = false) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const reset = () => {
    setIsLoading(false);
    setError(null);
    setData(null);
  };

  const execute = async (apiCall) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || '오류가 발생했습니다');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    data,
    setData,
    setError,
    setIsLoading,
    reset,
    execute,
  };
};

// 로컬 스토리지를 사용하는 훅
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

// 디바운스된 값을 반환하는 훅
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// 윈도우 크기를 추적하는 훅
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기값 설정

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// 컴포넌트 밖 클릭을 감지하는 훅
export const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);
};

// 이전 값을 추적하는 훅
export const usePrevious = (value) => {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState();

  if (value !== current) {
    setPrevious(current);
    setCurrent(value);
  }

  return previous;
};

// 토글 상태를 관리하는 훅
export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((v) => !v);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return [value, { toggle, setTrue, setFalse, setValue }];
};

// 타이머를 관리하는 훅
export const useTimer = (initialTime = 0, onComplete = null) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime((time) => {
          if (time <= 1) {
            setIsRunning(false);
            if (onComplete) onComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, time, onComplete]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = (newTime = initialTime) => {
    setTime(newTime);
    setIsRunning(false);
  };

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
  };
};

export default {
  useScroll,
  useApiState,
  useLocalStorage,
  useDebounce,
  useWindowSize,
  useClickOutside,
  usePrevious,
  useToggle,
  useTimer,
};
