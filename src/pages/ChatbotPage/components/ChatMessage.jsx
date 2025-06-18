// src/components/ChatMessages.jsx

import BotBubble from './BotBubble';
import UserBubble from './UserBubble';

export default function ChatMessages({ messages }) {
  return (
    <div className="p-4 pb-[66px] overflow-y-auto h-[calc(100%-66px-45px-66px)]">
      {messages.map((msg, idx) =>
        msg.type === 'bot' ? (
          <div key={idx} className="mb-3">
            <BotBubble message={msg.content} />
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
