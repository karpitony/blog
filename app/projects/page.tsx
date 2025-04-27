import { getProjectList } from "@/libs/Project/getProjectList";
import ProjectCard from "@/components/Projects/ProjectCard";

export const metadata = {
  title: "Projects | 프로젝트",
  description: "그동안 한 프로젝트들",
  openGraph: {
    title: "Projects",
    description: "Projects",
  },
};

export default async function Projects() {
  const { projects } = await getProjectList();
  projects.sort((a, b) => {
    return a.meta.index - b.meta.index;
  });

  return (
    <div className="w-full max-w-full md:max-w-3xl min-h-[80vh]">
      <h2 className="text-3xl font-bold">Tags</h2>
      {/* <ProjectsKeyWords /> */}
      <h2 className="text-3xl font-bold">Projects</h2>
      <div className="mt-8 flex flex-col gap-8 md:grid md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            meta={project.meta}
          />
        ))}
      </div>
    </div>
  );
}