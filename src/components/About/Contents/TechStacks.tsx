import SplitTextNoSSR from '@/components/common/SplitTextNoSSR';
import MarkdownBox from '@/components/About/MarkdownBox';
import { TECH_STACK_DATA } from '@/data/TechStacks.data';

export default function TechStacks() {
  return (
    <div>
      <SplitTextNoSSR text="기술스택" />
      <div className="flex flex-col space-y-6">
        {TECH_STACK_DATA.map((techstack, index) => (
          <MarkdownBox key={index} data={techstack} />
        ))}
      </div>
    </div>
  );
}
