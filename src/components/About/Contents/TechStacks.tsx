import SplitTextNoSSR from '@/components/common/SplitTextNoSSR';
import MarkdownBox from '@/components/About/MarkdownBox';

const TechStackData = [
  {
    title: 'React',
    programs: [
      {
        description:
          '- `React`를 활용하여 사용자 친화적인 프론트엔드 개발을 수행한 경험이 있습니다.\n' +
          '- `Zustand`로 전역 상태 관리룰 구현하며 효율적인 상태 관리 구조를 설계한 경험이 있습니다.\n' +
          '- `React Router`를 이용해 페이지 간 라우팅을 매끄럽게 처리하였습니다.\n' +
          '- `Axios`를 사용하여 RESTful API와의 통신을 구현하며 비동기 데이터 처리를 효과적으로 수행하였습니다.\n',
        year: '',
      },
    ],
  },
  {
    title: 'Next.js',
    programs: [
      {
        description:
          '- SSR, CSR, SSG 등 다양한 렌더링 방식을 프로젝트의 요구사항에 맞게 선택 및 활용할 수 있습니다.\n' +
          '- 서버와 클라이언트의 역할을 명확히 이해하며, 상황에 따라 최적의 렌더링 방식을 결정합니다.\n' +
          '- `Firebase`와의 연동을 통해 푸시 알림 기능을 지원하는 PWA를 개발한 경험이 있습니다.\n',
        year: '',
      },
    ],
  },
];

export default function TechStacks() {
  return (
    <div>
      <SplitTextNoSSR text="기술스택" />
      <div className="flex flex-col space-y-6">
        {TechStackData.map((techstack, index) => (
          <MarkdownBox key={index} data={techstack} />
        ))}
      </div>
    </div>
  );
}
