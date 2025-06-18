export default function UserBubble({ message }) {
  return (
    <div className="relative flex justify-end">
      <div
        className="
    bg-[#FFCECE] text-[14px] text-[#333] font-500
    shadow-[0_0_6px_rgba(43,43,43,0.08)]
    rounded-tl-[16px] rounded-br-[16px] rounded-bl-[16px]
    px-4 py-2
    min-w-[60px] max-w-[260px]
    whitespace-pre-line break-words
  "
  style={{ borderTopRightRadius: 0 }}
>
  {message}
</div>

    </div>
  );
}
