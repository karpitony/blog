import SimpleAboutMe from "@/components/About/SimpleAboutMe";
import Education from "@/components/About/Education";

export default async function About() {
  return (
    <div className="w-full max-w-full md:max-w-3xl space-y-8">
      <div className="px-2">
        <SimpleAboutMe />
        <hr className="border-t-2"/>
        <Education />
      </div>
    </div>
  );
}