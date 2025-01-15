import SplitTextNoSSR from "../common/SplitTextNoSSR";
import MarkdownBox from "../common/MarkdownBox";

const ActivitiyData = [
  {
    title: "구름",
    programs: [
      {
        description: 
          "### 구름톤 유니브 3기 동국대학교\n" +
          "- 대학생 연합 IT 개발 동아리 [구름톤 유니브](https://9oormthon.university/)에서 주1회 [리액트 스터디](https://my-react-study.vercel.app/)에 참여\n"+
          "- kakao x 구름톤 유니브 3기 연합해커톤 대상(1위) 수상. 2024.09.29\n",
        year: "2024.07 ~ 2025.01",
      }
    ],
  }
];

export default function Activities() {
  return (
    <div>
      <SplitTextNoSSR text="대외활동" />
      <div className="flex flex-col space-y-6">
        {ActivitiyData.map((activitiy, index) => (
          <MarkdownBox key={index} data={activitiy} />
        ))}
      </div>
    </div>
  )
}