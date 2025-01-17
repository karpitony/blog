import { ReactNode } from "react";
import cn from '@yeahx4/cn';

interface LinkBoxProps {
  icon: ReactNode;
  text: string;
  url: string;
}

export default function LinkBox({ icon, text, url }: LinkBoxProps) {
  return (
    <div className={cn(
      "flex border-2 border-gray-500 p-2 rounded-md w-80 items-center justify-center",
      "hover:border-blue-500 hover:bg-blue-500 hover:text-white",
      "transition duration-300 ease-in-out"
    )}>
      <a 
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center space-x-2 text-xl md:text-2xl font-semibold"
      >
        {icon}
        <span>{text}</span> 
      </a>
    </div>
  );
}