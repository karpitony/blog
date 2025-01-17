import { ReactNode } from "react";

interface LinkBoxProps {
  icon: ReactNode;
  text: string;
  url: string;
}

export default function LinkBox({ icon, text, url }: LinkBoxProps) {
  return (
    <div className="flex border-2 border-gray-500 p-2 rounded-md w-80 items-center justify-center">
      <a 
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center space-x-2 text-2xl font-semibold"
      >
        {icon}
        <span>{text}</span> 
      </a>
    </div>
  );
}