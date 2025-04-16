import { DiaryMeta } from "@/libs/Diary/metaDataParser";
import MarkdownRender from "@/components/MarkdownRender/MarkdownRender";
import WongojiTitle from "./WongojiTitle";
import cn from "@yeahx4/cn";
// import TableOfContent from "@/components/MarkdownRender/TableOfContent";

interface DiaryTextProps {
  meta: DiaryMeta;
  body: string[];
}

export default function DiaryText({
  meta,
  body,
}: DiaryTextProps) {
  return (
    <div className="w-full mx-auto max-w-full md:max-w-3xl relative min-h-[70vh]">
      <div className={cn(
        "bg-gray-900 bg-opacity-50 rounded-lg shadow-lg", 
        "border border-gray-700 md:border-none mt-4",
        "p-4 md:p-8"
      )}>
        <WongojiTitle text={meta.title} size={32} />
        <MarkdownRender markdownText={body.join("\n")} />
      </div>
      {/* <TableOfContent content={body.join("\n")} /> */}
    </div>
  );
}