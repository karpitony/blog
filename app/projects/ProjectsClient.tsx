import ProjectTagsAndList from '@/components/Projects/ProjectTagsAndList';
import ProjectDetailDialog from '@/components/Projects/ProjectDetailDialog';
import { ProjectData, ProjectMeta } from '@/types/project';

interface Props {
  projects: ProjectData[];
  tags: string[];
  modalProject: { meta: ProjectMeta; body: string[] } | null;
}

export default function ProjectsClient({ projects, tags, modalProject }: Props) {
  return (
    <div>
      <ProjectTagsAndList projects={projects} tags={tags} />
      {modalProject && <ProjectDetailDialog meta={modalProject.meta} body={modalProject.body} />}
    </div>
  );
}
