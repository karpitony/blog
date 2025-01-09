import Image from "next/image"

const EducationData = [
  {
    logo: "/assets/education/dongguk.ico",
    title: "동국대학교",
    programs: [
      {
        description: "경영정보학과",
        year: "2024.03 ~ 2025.01",
      },
      {
        description: "컴퓨터 • AI학부",
        year: "2025.03 ~ 재학중",
      }
    ]
  },
]

export default function Education() {
  return (
    <div>
      <h2 className="text-2xl font-bold my-4">교육</h2>
      <div className="flex flex-col items-center space-y-4">
      {EducationData.map((education, index) => (
        <div key={index} className="flex flex-row items-start mb-6">
          <div className="flex items-center border-2 border-white bg-black rounded-full p-[6px]">
            <Image 
              src={education.logo}
              alt={education.title}
              width={25}
              height={25} 
            />
          </div>
          <div className="flex flex-col items-start ml-4 w-64">
            <div className="text-xl font-bold mb-2">{education.title}</div>
            {education.programs.map((program, programIndex) => (
              <div key={programIndex} className="flex flex-row justify-between items-center w-full">
                <div className="text-base font-semibold">{program.description}</div>
                <div className="text-sm opacity-80">{program.year}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}