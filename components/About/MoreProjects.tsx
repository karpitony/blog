import Link from "next/link";
import AnimatedContent from "@/components/ReactBits/AnimatedContent";
import cn from "@yeahx4/cn";

export default function MoreProjects() {
  return (
    <div className="w-full flex justify-end">
      <AnimatedContent
        distance={150}
        direction="horizontal"
        reverse={false}
        config={{ tension: 80, friction: 20 }}
        initialOpacity={0.2}
        animateOpacity
        scale={1.1}
        threshold={0.1}
      >
        <Link
          href="/projects"
          className={cn(
            "inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors", 
            "duration-200 mt-4"
          )}
        >
          <p className="text-lg font-bold gradient-wave animate-wave-text">더 많은 프로젝트 보기</p>
          <svg
            className="ml-2 w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </AnimatedContent>
    </div>
  );
}