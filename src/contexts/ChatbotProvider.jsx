import { useState } from 'react';
import { ChatbotContext } from './ChatbotContext';

const ChatbotProvider = ({ children }) => {
  const [isArrowVisible, setIsArrowVisible] = useState(false);

  return (
    <ChatbotContext.Provider value={{ isArrowVisible, setIsArrowVisible }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export default ChatbotProvider;
