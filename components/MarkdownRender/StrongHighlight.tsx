import cn from "@yeahx4/cn";

interface StrongHighlightProps {
  className: string | undefined;
  children: React.ReactNode;
}

export default function StrongHighlight({
  className,
  children,
}: StrongHighlightProps ) {
  return (
    <strong
      className={cn(
        "relative font-semibold inline-block text-black dark:text-white",
        className
      )}
    >
      {/* 형광펜 배경 */}
      <span
        className="absolute left-0 bottom-[0.2em] w-full h-[0.2em] 
                  bg-[#f8cc06] dark:bg-[#f8cc06]/80 
                  z-30 rounded-xs pointer-events-none"
        aria-hidden="true"
      />
      {/* 실제 내용 */}
      <span className="relative z-10">{children}</span>
    </strong>
  );
}