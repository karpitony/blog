import SimpleAboutMe from "@/components/About/SimpleAboutMe";
import Education from "@/components/About/Education";

export default async function About() {
  return (
    <div className="w-full max-w-full md:max-w-3xl space-y-6">
      <div className="px-2 mb-8">
        <SimpleAboutMe />
      </div>
      <hr className="border-t-2"/>
      <div className="px-2">
        <Education />
      </div>
      <hr className="border-t-2"/>
      <div className="px-2">
        {/* <Education />
        TBD */}
      </div>
    </div>
  );
}