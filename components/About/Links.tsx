import SplitTextNoSSR from '@/components/common/SplitTextNoSSR';
import LinkBox from '@/components/common/LinkBox';
import { PiGithubLogo, PiLinkedinLogo, PiGlobe } from "react-icons/pi";

const LinkData = [
  {
    icon: <PiGithubLogo />,
    text: "Github",
    url: "https://github.com/karpitony",
  },
  {
    icon: <PiLinkedinLogo />,
    text: "Linkedin",
    url: "https://www.linkedin.com/in/%EC%9C%A4%EC%84%9D-%EC%86%A1-549286261/",
  },
  {
    icon: <PiGlobe />,
    text: "Portfolio",
    url: "https://yunseok.vercel.app/about",
  },
];


export default function Links() {
  return (
    <div>
      <SplitTextNoSSR text="링크" />
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl justify-items-center">
          {LinkData.map((link, index) => (
            <LinkBox key={index} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
}