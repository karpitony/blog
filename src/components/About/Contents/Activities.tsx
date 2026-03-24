import SplitTextNoSSR from '@/components/common/SplitTextNoSSR';
import MarkdownBox from '@/components/About/MarkdownBox';
import { ACTIVITY_DATA } from '@/data/Activities.data';

export default function Activities() {
  return (
    <div>
      <SplitTextNoSSR text="대외활동" />
      <div className="flex flex-col space-y-6">
        {ACTIVITY_DATA.map((activity, index) => (
          <MarkdownBox key={index} data={activity} />
        ))}
      </div>
    </div>
  );
}
