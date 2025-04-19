import SplitTextNoSSR from "@/components/common/SplitTextNoSSR";
import SimpleBox from "@/components/About/SimpleBox";

const EducationData = [
  {
    title: "동국대학교",
    programs: [
      {
        description: "경영정보학과",
        year: "2024.03 ~ 2025.03",
      },
      {
        description: "컴퓨터 AI학부",
        year: "2025.03 ~ 재학중",
      },
    ],
  },
  {
    title: "자격증",
    programs: [
      {
        description: "정보처리기능사",
        year: "2025.04.18",
      }
    ],
  },
]; 

export default function Educations() {
  return (
    <div>
      <SplitTextNoSSR text="교육" />
      <div className="flex flex-col space-y-6">
        {EducationData.map((education, index) => (
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
