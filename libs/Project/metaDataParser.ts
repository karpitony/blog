import { ProjectMeta } from "@/types/project";

export const parseProject = (
  content: string,
  projectTitle: string,
): { meta: ProjectMeta; body: string[]; }=> {
  // 모든 줄바꿈 문자를 \n으로 통일
  const normalizedContent = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = normalizedContent.split("\n");

  const meta: ProjectMeta = {
    index: 999,
    title: projectTitle || "",
    thumbnail: "",
    date: "",
    status: "INACTIVE",
    tags: [],
    description: "",
    githubLink: "",
    demoLink: "",
    videoLink: "",
  };

  let body: string[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim(); // 각 라인을 trim 처리

    if (line === "---") {
      body = lines.slice(i + 1);
      break;
    }

    const colon = line.indexOf(":");

    if (colon === -1) {
      console.warn(`Invalid meta line: ${line}`);
      continue;
    }

    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim();

    if (key === "status") {
      const status = value.split(",").map((s) => s.trim());
      if (status.length > 0) {
        meta.status = status[0] as ProjectMeta["status"];
      }
    } else if (key === "index") {
      const index = parseInt(value, 10);
      if (!isNaN(index)) {
        meta.index = index;
      } else {
        console.warn(`Invalid index value: ${value} on project title: ${meta.title}`);
      }
    } else if (key === "title") {
      meta.title = value;
    } else if (key === "thumbnail") {
      if (value.startsWith("./")) {
        meta.thumbnail = `/contents/projects/${projectTitle}/${value.slice(2)}`;
      } else {
        meta.thumbnail = value;
      }
    } else if (key === "date") {
      meta.date = value;
    } else if (key === "tags") {
      const tags = value.split(",").map((s) => s.trim());
      if (tags.length > 0) {
        meta.tags = tags;
      }
    } else if (key === "description") {
      meta.description = value;
    } else if (key === "githubLink") {
      meta.githubLink = value;
    } else if (key === "demoLink") {
      meta.demoLink = value;
    } else if (key === "videoLink") {
      meta.videoLink = value; 
    } else {
      console.warn(`Invalid meta key: ${key} on project tite: ${meta.title}`);
    }
  }

  return { meta, body };
};