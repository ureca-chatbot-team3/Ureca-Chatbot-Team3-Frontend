import { createContext } from 'react';

export const ChatbotContext = createContext({
  isArrowVisible: false,
  setIsArrowVisible: () => {},
});
