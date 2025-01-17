import SimpleAboutMe from "@/components/About/SimpleAboutMe";
import TechStacks from "@/components/About/TechStacks";
import Educations from "@/components/About/Educations";
import Projects from "@/components/About/Projects";
import Activities from "@/components/About/Activities";
import Links from "@/components/About/Links";
import StickyNavBar from "@/components/About/StickyNavBar";

const sections = [
  { id: "about", label: "자기소개" },
  { id: "links", label: "링크" },
  { id: "techstacks", label: "기술스택" },
  { id: "educations", label: "교육" },
  { id: "projects", label: "프로젝트" },
  { id: "activities", label: "대외활동" },
];

export default function About() {
  return (
    <div className="w-full max-w-full md:max-w-3xl">
      <div className="px-2 mb-8" id="about">
        <SimpleAboutMe />
      </div>
      {/* 소개 페이지 NavBar */}
      <hr className="border-t-2" />
      <StickyNavBar sections={sections} />
      <hr className="border-t-2 mb-8" />
      {/* 섹션 별 내용 */}
      <div className="space-y-12 mt-4">
        <div className="px-2" id="techstacks">
          <TechStacks />
        </div>
        <div className="px-2" id="links">
          <Links />
        </div>
        <div className="px-2" id="educations">
          <Educations />
        </div>
        <div className="px-2" id="projects">
          <Projects />
        </div>
        <div className="px-2" id="activities">
          <Activities />
        </div>
      </div>
    </div>
  );
}