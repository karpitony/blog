import path from 'path';
import fs, { readFile } from 'fs/promises';
import { ProjectMeta, parseProject } from '@/libs/Project/metaDataParser';
import { readJsonPublic } from '@/libs/jsonPublicCache';

export interface ProjectData {
  meta: ProjectMeta;
  slug: string;
}

const projectDirectory = path.join(process.cwd(), 'contents/projects');

export async function getAllProjectMarkdownFiles(): Promise<{ 
  filePath: string;
  fileName: string
}[]> {
  const projectFiles = await fs.readdir(projectDirectory, { withFileTypes: true });

  const projectEntries: { 
    filePath: string;
    fileName: string
  }[] = [];

  for (const projectEntry of projectFiles) {
    if (!projectEntry.isDirectory()) continue;

    const contentPath = path.join(projectDirectory, projectEntry.name, 'project.md');
    try {
      await fs.access(contentPath);
      projectEntries.push({
        filePath: contentPath,
        fileName: projectEntry.name
      });
    } catch {
      continue;
    }
  }

  return projectEntries;
}

export async function generateProjectList(): Promise<{ projects: ProjectData[] }> {
  const projectEntries = await getAllProjectMarkdownFiles();

  const projects: ProjectData[] = await Promise.all(
    projectEntries.map(async ({ filePath, fileName }) => {
      const content = await readFile(filePath, 'utf-8');
      const data = await parseProject(content, fileName);
      return {
        meta: data.meta,
        slug: fileName
      };
    })
  );

  return { projects };
}

export const getProjectList = async (): Promise<{ projects: ProjectData[] }> => {
  const cached = await readJsonPublic<{ projects: ProjectData[] }>('projectList.json');
  if (cached) return cached;

  return generateProjectList();
};

export const getProjectData = async (
  slug: string
): Promise<{
  meta: ProjectMeta;
  body: string[];
}> => {
  const cachedData = await getProjectList();
  const project = cachedData.projects.find((project) => project.slug === slug);
  if (!project) {
    throw new Error(`Project with slug "${slug}" not found`);
  }
  
  const fullPath = path.join(projectDirectory, slug, 'project.md');
  const content = await readFile(fullPath, 'utf-8');
  const { meta, body } = parseProject(content, project.meta.title);
  
  return { meta, body };
}