import SplitTextNoSSR from '@/components/common/SplitTextNoSSR';
import LinkBox from '@/components/About/LinkBox';
import { PiGithubLogo, PiLinkedinLogo, PiGlobe } from 'react-icons/pi';
import { SiVelog } from 'react-icons/si';

const LinkData = [
  {
    icon: <PiGithubLogo />,
    text: 'Github',
    url: 'https://github.com/karpitony',
  },
  {
    icon: <PiLinkedinLogo />,
    text: 'Linkedin',
    url: 'https://www.linkedin.com/in/yunseok-song-549286261/',
  },
  {
    icon: <PiGlobe />,
    text: 'Portfolio',
    url: 'https://yunseok.vercel.app/about',
  },
  {
    icon: <SiVelog />,
    text: 'Velog',
    url: 'https://velog.io/@karpitony/posts',
  },
];

export default function Links() {
  return (
    <div>
      <SplitTextNoSSR text="링크" />
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 gap-6 w-full max-w-3xl justify-items-center">
          {LinkData.map((link, index) => (
            <LinkBox key={index} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
}
