import SplitTextNoSSR from '@/components/common/SplitTextNoSSR';
import SimpleBox from '@/components/About/SimpleBox';
import { EDUCATION_DATA } from '@/data/Educations.data';

export default function Educations() {
  return (
    <div>
      <SplitTextNoSSR text="교육" />
      <div className="flex flex-col space-y-6">
        {EDUCATION_DATA.map((education, index) => (
          <SimpleBox key={index}>
            {/* 큰 제목 */}
            <div className="flex flex-col md:flex-row items-start w-full md:space-x-4">
              <h2 className="text-lg font-bold mb-2 md:w-1/5">{education.title}</h2>
              <div className="flex flex-col w-full md:w-4/5 space-y-2">
                {education.programs.map((program, programIndex) => (
                  <div key={programIndex} className="grid grid-cols-12 items-start w-full">
                    {/* 내용 */}
                    <p className="col-span-7 md:col-span-8 text-sm md:text-base break-words whitespace-pre-wrap">
                      {program.description}
                    </p>
                    {/* 기간 */}
                    <p className="col-span-5 md:col-span-4 text-xs md:text-sm text-right opacity-80 whitespace-pre-wrap">
                      {program.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SimpleBox>
        ))}
      </div>
    </div>
  );
}
