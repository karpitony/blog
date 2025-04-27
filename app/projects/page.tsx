import { getProjectList } from "@/libs/Project/getProjectList";
import ProjectCard from "@/components/Projects/ProjectCard";

export default async function Projects() {
  const { projects } = await getProjectList();
  return (
    <div className="w-full max-w-full md:max-w-3xl">
      <h1>나의 활동</h1>
      <h2>CATEGORY</h2>
      <h2>TAGS</h2>
      {/* <ProjectsKeyWords /> */}
      <h2>PROJECTS</h2>
      <div className="mt-12 flex flex-col gap-8 md:grid md:grid-cols-2">
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