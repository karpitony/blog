import { getProjectList, getProjectData } from '@/libs/Project/getProjectList';
import ProjectsClient from './ProjectsClient';

export default async function ProjectsPage({ searchParams }: { searchParams: { modal?: string } }) {
  const { projects, tags } = await getProjectList();
  projects.sort((a, b) => a.meta.index - b.meta.index);

  let modalProject = null;
  if (searchParams.modal) {
    modalProject = await getProjectData(searchParams.modal);
  }

  return (
    <div className="w-full max-w-full md:max-w-3xl lg:max-w-5xl min-h-[80vh] text-black dark:text-gray-100">
      <ProjectsClient projects={projects} tags={tags} modalProject={modalProject} />
    </div>
  );
}
