
const EducationData = [
  {
    year: "2024.03 ~ 2025.01",
    title: "동국대학교 경영정보학과",
    description: "학사과정"
  },
  {
    year: "2025.03 ~",
    title: "동국대학교 컴퓨터 • AI학부",
    description: "학사과정"
  }
]

export default function Education() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Education</h2>
      <div>
        {EducationData.map((education, index) => (
          <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="text-lg font-bold">{education.year}</div>
            <div className="text-lg font-bold">{education.title}</div>
            <div className="text-lg">{education.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}