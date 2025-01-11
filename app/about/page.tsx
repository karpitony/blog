import SimpleAboutMe from "@/components/About/SimpleAboutMe";
import Educations from "@/components/About/Educations";
import Projects from "@/components/About/Projects";

export default async function About() {
  return (
    <div className="w-full max-w-full md:max-w-3xl">
      <div className="px-2 mb-8">
        <SimpleAboutMe />
      </div>
      <hr className="border-t-2 my-3"/>
        목차 여기에
      <hr className="border-t-2 my-3"/>
      <div className="space-y-8">
        <div className="px-2">
          <Educations />
        </div>
        <div className="px-2">
          <Projects />
        </div>
      </div>
    </div>
  );
}