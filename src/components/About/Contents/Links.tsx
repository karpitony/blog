import SplitTextNoSSR from '@/components/common/SplitTextNoSSR';
import LinkBox from '@/components/About/LinkBox';
import { LINK_DATA } from '@/data/Links.data';

export default function Links() {
  return (
    <div>
      <SplitTextNoSSR text="링크" />
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 gap-6 w-full max-w-3xl justify-items-center">
          {LINK_DATA.map((link, index) => (
            <LinkBox key={index} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
}
