import { getProjectList } from "@/libs/Project/getProjectList";
import ProjectTagsAndList from "@/components/Projects/ProjectTagsAndList";

export const metadata = {
  title: "Projects | 프로젝트",
  description: "그동안 한 프로젝트들",
  openGraph: {
    title: "Projects",
    description: "Projects",
  },
};

export default async function Projects() {
  const { projects, tags } = await getProjectList();
  projects.sort((a, b) => a.meta.index - b.meta.index);

  return (
    <div className="w-full max-w-full md:max-w-3xl min-h-[80vh] text-black dark:text-gray-100">
      <ProjectTagsAndList tags={tags} projects={projects} />
    </div>
  );
}