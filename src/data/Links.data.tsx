import { PiGithubLogo, PiLinkedinLogo, PiGlobe } from 'react-icons/pi';
import { SiVelog } from 'react-icons/si';
import { LinkData } from '@/types/about';

export const LINK_DATA: LinkData[] = [
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
