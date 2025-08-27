export interface ProjectMeta {
  index: number;
  title: string;
  thumbnail: string;
  date: string;
  status: 'ACTIVE' | 'MAINTENANCE' | 'INACTIVE';
  tags: string[];
  description: string;
  githubLink?: string;
  demoLink?: string;
  videoLink?: string;
}

export interface ProjectData {
  meta: ProjectMeta;
  slug: string;
}

export interface ProjectJson {
  projects: ProjectData[];
  tags: string[];
}
