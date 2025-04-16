import SplitTextNoSSR from "@/components/common/SplitTextNoSSR";
import MarkdownBox from "@/components/About/MarkdownBox";

const ActivitiyData = [
  {
    title: "구름",
    programs: [
      {
        description: 
          "### 구름톤 유니브 3기 동국대학교\n" +
          "- 대학생 연합 IT 개발 동아리 [구름톤 유니브](https://9oormthon.university/)에서 7주동안 [리액트 스터디](https://my-react-study.vercel.app/)에 참여\n"+
          "- kakao x 구름톤 유니브 3기 연합해커톤 대상(1위) 수상. 2024.09.29\n",
        year: "2024.07 ~ 2025.01",
      },
      {
        description: 
          "### 구름톤 유니브 4기 동국대학교\n" +
          "- ... 제 활약을 기대해주세요!",
        year: "2025.03 ~ ",
      }
    ],
  },
  {
    title: "팜 시스템",
    programs: [
      {
        description: 
          "### 웹페이지 제작팀\n" +
          // 안어울리긴 한데 일단은 프로젝트보다 이쪽에 기술함
          "[**Github**](https://github.com/DguFarmSystem/Homepage-FE) | [**링크**](https://www.farmsystem.kr)\n" +
          "- **웹페이지 제작 팀**의 프론트엔드 파트로 참여\n" +
          "- 코드 재사용성을 생각해 `models`, `services`, `hooks`로 API 통신 로직을 분리함\n" +
          "- `TurboRepo`를 도입해 모노레포 구조로 분산된 레포를 통합하고 공통 패키지를 구축\n" +
          "- CI 단계에 캐싱을 적용해 빌드·테스트 속도를 대폭 개선\n",
        year: "2025.01 ~ ",
      },
      {
        description: 
          "### 보안/웹 트랙 4기\n" +
          "- ... 제 활약을 기대해주세요!",
        year: "2025.03 ~ ",
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