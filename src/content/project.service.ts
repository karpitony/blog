import path from 'path';
import fs, { readFile } from 'fs/promises';
import {
  ProjectFrontmatterSchema,
  type ProjectMeta,
  type ProjectData,
  type ProjectJson,
} from './schemas/project.schema';
import { parseMarkdown } from './parser';
import { readJsonPublic } from '@/libs/jsonPublicCache';

const projectDirectory = path.join(process.cwd(), 'contents/projects');

// --- File Discovery ---

export async function getAllProjectMarkdownFiles(): Promise<
  {
    filePath: string;
    fileName: string;
  }[]
> {
  const projectFiles = await fs.readdir(projectDirectory, { withFileTypes: true });

  const projectEntries: {
    filePath: string;
    fileName: string;
  }[] = [];

  for (const projectEntry of projectFiles) {
    if (!projectEntry.isDirectory()) continue;

    const contentPath = path.join(projectDirectory, projectEntry.name, 'project.md');
    try {
      await fs.access(contentPath);
      projectEntries.push({
        filePath: contentPath,
        fileName: projectEntry.name,
      });
    } catch {
      continue;
    }
  }

  return projectEntries;
}

// --- Transformers ---

function transformThumbnailPath(thumbnail: string, projectTitle: string): string {
  if (thumbnail.startsWith('./')) {
    return `/contents/projects/${projectTitle}/${thumbnail.slice(2)}`;
  }
  return thumbnail;
}

// --- Public API ---

export async function generateProjectList(): Promise<ProjectJson> {
  const projectEntries = await getAllProjectMarkdownFiles();

  const projects: ProjectData[] = await Promise.all(
    projectEntries.map(async ({ filePath, fileName }) => {
      const content = await readFile(filePath, 'utf-8');
      const { frontmatter } = parseMarkdown(content, ProjectFrontmatterSchema, filePath);

      // thumbnail 경로 변환
      frontmatter.thumbnail = transformThumbnailPath(frontmatter.thumbnail, fileName);

      const meta: ProjectMeta = {
        ...frontmatter,
        slug: fileName,
      };

      return {
        meta,
        slug: fileName,
      };
    }),
  );

  const tagsSet = new Set<string>();
  projects.forEach(project => {
    project.meta.tags?.forEach(tag => tagsSet.add(tag));
  });

  return {
    projects,
    tags: Array.from(tagsSet),
  };
}

export const getProjectList = async (): Promise<ProjectJson> => {
  const cached = await readJsonPublic<ProjectJson>('projectList.json');
  if (cached) return cached;

  return generateProjectList();
};

export const getProjectData = async (
  slug: string,
): Promise<{
  meta: ProjectMeta;
  body: string[];
}> => {
  const cachedData = await getProjectList();
  const project = cachedData.projects.find(project => project.slug === slug);
  if (!project) {
    throw new Error(`Project with slug "${slug}" not found`);
  }

  const fullPath = path.join(projectDirectory, slug, 'project.md');
  const content = await readFile(fullPath, 'utf-8');
  const { frontmatter, body } = parseMarkdown(content, ProjectFrontmatterSchema, fullPath);

  frontmatter.thumbnail = transformThumbnailPath(frontmatter.thumbnail, slug);

  const meta: ProjectMeta = {
    ...frontmatter,
    slug,
  };

  return { meta, body: body.split('\n') };
};
