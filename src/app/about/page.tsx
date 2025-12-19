import SimpleAboutMe from '@/components/common/SimpleAboutMe';
import TechStacks from '@/components/About/Contents/TechStacks';
import Educations from '@/components/About/Contents/Educations';
import Projects from '@/components/About/Contents/Projects';
import MoreProjects from '@/components/About/MoreProjects';
import Activities from '@/components/About/Contents/Activities';
import Links from '@/components/About/Contents/Links';
import StickyNavBar from '@/components/About/StickyNavBar';

const sections = [
  { id: 'about', label: '자기소개' },
  { id: 'techstacks', label: '기술스택' },
  { id: 'projects', label: '프로젝트' },
  { id: 'activities', label: '대외활동' },
  { id: 'links', label: '링크' },
  { id: 'educations', label: '교육' },
];

export default function About() {
  return (
    <div className="w-full max-w-full md:max-w-3xl text-black dark:text-gray-100">
      <div className="px-2 mb-12 py-4 md:py-10 w-full" id="about">
        <SimpleAboutMe />
      </div>
      {/* 소개 페이지 NavBar */}
      <hr className="border-t-2 border-gray-800 dark:border-white" />
      <StickyNavBar sections={sections} />
      <hr className="border-t-2 mb-8 border-gray-800 dark:border-white" />
      {/* 섹션 별 내용 */}
      <div className="space-y-12 mt-4">
        <div className="px-2" id="techstacks">
          <TechStacks />
        </div>

        <div className="px-2" id="projects">
          <Projects />
          <MoreProjects />
        </div>
        <div className="px-2" id="activities">
          <Activities />
        </div>
        <div className="px-2" id="links">
          <Links />
        </div>
        <div className="px-2" id="educations">
          <Educations />
        </div>
      </div>
    </div>
  );
}
