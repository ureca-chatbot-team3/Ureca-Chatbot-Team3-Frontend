// src/components/ChatMessage.jsx 또는 ChatMessages.jsx
import { useEffect, useRef } from 'react';
import BotBubble from './BotBubble';
import UserBubble from './UserBubble';

export default function ChatMessages({ messages }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="p-4 pb-[66px] overflow-y-auto h-[calc(100%-66px-45px-66px)]"
    >
      {messages.map((msg, idx) =>
        msg.type === 'bot' ? (
          <div key={idx} className="mb-3">
            <BotBubble message={msg.content} isLoading={msg.isLoading} />
          </div>
        ) : (
          <div key={idx} className="mb-3 flex justify-end">
            <UserBubble message={msg.content} />
          </div>
        )
      )}
    </div>
  );
}
