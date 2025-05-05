"use client";
import FuzzyText from "@/components/ReactBits/FuzzyText";
import ArrowButton from "@/components/common/ArrowButton";
import { useTheme } from "next-themes";

export default function  NotFound() {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col items-center justify-center w-full h-[80vh] text-black dark:text-white">
    <FuzzyText 
      baseIntensity={0.1} 
      hoverIntensity={0.3} 
      enableHover={true}
      color={theme === "dark" ? "#fff" : "#000"}
    >
      404
    </FuzzyText>
      <p className="mt-12 text-lg">해당 페이지는 존재하지 않거나 준비되지 않은 것 같습니다. 다른 페이지를 확인해보세요.</p>

      <p className="mt-4 text-lg">This Page is not exist or not ready. Please check other pages.</p>
      <div className="mt-2">
        <ArrowButton
          href="/"
          text="홈으로 돌아가기"
        />
      </div>

    </div>
  );
}