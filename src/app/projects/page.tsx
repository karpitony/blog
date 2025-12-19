import { getProjectList } from '@/libs/Project/getProjectList';
import ProjectTagsAndList from '@/components/Projects/ProjectTagsAndList';

export default async function ProjectsPage() {
  const { projects, tags } = await getProjectList();
  projects.sort((a, b) => a.meta.index - b.meta.index);

  return (
    <div className="w-full max-w-full md:max-w-3xl lg:max-w-5xl min-h-[80vh] text-black dark:text-gray-100">
      <ProjectTagsAndList projects={projects} tags={tags} />
    </div>
  );
}
