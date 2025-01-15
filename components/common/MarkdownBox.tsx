import cn from '@yeahx4/cn';
import AnimatedContent from '@/components/ReactBits/AnimatedContent';
import MarkdownRender from '../MarkdownRender/MarkdownRender';
import { BoxData } from '@/types/BoxData';

export default function SimpleBox({ data }: { data?: BoxData }) {
  if (!data) {
    return <div>Loading...</div>; // 데이터가 없을 때의 대체 UI
  }

  return (
    <AnimatedContent
      distance={150}
      direction="horizontal"
      reverse={false}
      config={{ tension: 80, friction: 20 }}
      initialOpacity={0.2}
      animateOpacity
      scale={1.1}
      threshold={0.2}
    >
      <div 
        className={cn(
          "bg-gray-900 bg-opacity-50 rounded-lg p-4 md:p-8 shadow-lg"
        )}
      >
        {/* 큰 제목 */}
        <div className="flex flex-col md:flex-row items-start w-full md:space-x-4">
          <h2 className="text-lg font-bold mb-2 md:w-1/5">{data.title}</h2>
          <div className="flex flex-col w-full md:w-4/5 space-y-2">
            {data.programs.map((program, programIndex) => (
              <div key={programIndex}>
                <p className="mb-1 text-xs text-left opacity-80 whitespace-pre-wrap md:hidden">
                  {program.year}
                </p>
                <div key={programIndex} className="grid grid-cols-12 items-start w-full">
                  {/* 내용 */}
                  <div className="col-span-12 md:col-span-9">
                    <MarkdownRender markdownText={program.description} enableGap={false}/>
                  </div>
                  {/* 기간 */}
                  <p className={cn(
                    "col-span-3 text-sm text-right", 
                    "opacity-80 whitespace-pre-wrap hidden md:block"
                  )}>
                    {program.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedContent>
  )
}