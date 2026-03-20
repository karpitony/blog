import SplitTextNoSSR from '@/components/common/SplitTextNoSSR';
import MarkdownBox from '@/components/About/MarkdownBox';
import { PROJECT_DATA } from '@/data/Projects.data';

export default function Projects() {
  return (
    <div>
      <SplitTextNoSSR text="프로젝트" />
      <div className="flex flex-col space-y-6">
        {PROJECT_DATA.map((project, index) => (
          <MarkdownBox key={index} data={project} />
        ))}
      </div>
    </div>
  );
}

// const ProjectArchivedData = [
//   {
//     title: '구름다리',
//     programs: [
//       {
//         description:
//           '[**Github**](https://github.com/9oormDari/FrontEnd) | [**데모 페이지**](https://9oormdari.vercel.app/) | [**데모 영상**](https://youtu.be/qNGfDNsLch0)\n' +
//           '- 4인이 공통된 목표를 하루하루 이뤄가는 목표관리 웹앱\n' +
//           '- 리액트를 사용하여 프론트엔드와 상태 관리 설계를 담당\n' +
//           '- 기존 프롭스 드릴 방식의 비효율성을 개선하기 위해 Zustand를 도입\n' +
//           '- 1주일간의 제한된 시간 내 프로젝트를 성공적으로 완성하여 대상을 수상',
//         year: '2024.09',
//       },
//     ],
//   },
// ];
