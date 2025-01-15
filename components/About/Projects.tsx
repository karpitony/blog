import MarkdownBox from "../common/MarkdownBox";

const ProjectData = [
  {
    title: "구름다리",
    programs: [
      {
        description:
          "- 4인이 공통된 목표를 하루하루 이뤄가는 목표관리 웹앱\n" +
          "- 리액트를 사용하여 프론트엔드와 상태 관리 설계를 담당\n" +
          "- 기존 프롭스 드릴 방식의 비효율성을 개선하기 위해 Zustand를 도입\n" +
          "- 1주일간의 제한된 시간 내 프로젝트를 성공적으로 완성하여 대상을 수상",
        year: "2024.09",
      },
    ],
  },
  {
    title: "북로그",
    programs: [
      {
        description:
          "- 독서 기록 관리, 공유 웹페이지\n" +
          "- 코드 스타일과 폴더 구조를 통일하며 협업 효율성을 높임\n" +
          "- `Axios`와 커스텀 훅을 활용한 데이터 통신 로직 설계\n" +
          "- `React Router`를 사용해 페이지 간 라우팅 구현\n" +
          "- URL 파라미터를 활용해 페이지 간 데이터 전달 문제 해결\n" +
          "- 깃허브 프로젝트를 활용한 작업 관리와 코드 리뷰를 통해 팀워크와 기술력 향상",
        year: "2024.10",
      },
    ],
  },
  {
    title: "스마트 차수판 PWA",
    programs: [
      {
        description:
        "- 차수판을 스마트폰에서 조종할 수 있도록 개발한 PWA 웹앱\n" +
        "- PWA 기술을 활용하여 스마트폰 설치 가능한 웹앱 구현\n" +
        "- `Firebase`를 활용해 푸시 알림 기능 추가",
        year: "2024.11 ~ 2024.12",
      },
    ],
  },
];

export default function Projects() {
  return (
    <div>
      
      <h2 className="text-2xl font-bold mb-4">프로젝트</h2>
      <div className="flex flex-col space-y-6">
        {ProjectData.map((project, index) => (
          <MarkdownBox key={index} data={project} />
        ))}
      </div>
    </div>
  );
}
