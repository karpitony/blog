import SimpleAboutMe from "@/components/SimpleAboutMe";

export default async function About() {
  return (
    <div className="w-full max-w-full md:max-w-3xl space-y-8">
      <div className="px-2">
        <SimpleAboutMe />
      </div>
    </div>
  );
}