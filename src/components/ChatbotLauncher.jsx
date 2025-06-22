import flamingo from '../assets/images/chatbot.gif';

export default function ChatbotLauncher({ onClick }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-[1440px] mx-auto relative h-0">
        <button
          onClick={onClick}
          className="absolute bottom-8 right-8 w-[61px] h-[61px] shadow-[0_0_4px_rgba(0,0,0,0.25)] flex items-center justify-center rounded-full pointer-events-auto cursor-pointer"
        >
          <img
            src={flamingo}
            alt="플밍이 GIF"
            className="w-[61px] h-[61px] object-contain pointer-events-none"
          />
        </button>
      </div>
    </div>
  );
}
