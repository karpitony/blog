// thx to 5tarlight
// https://github.com/5tarlight/vlog/blob/main/lib/post/parser.tsx

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover: string;
  series: string;
  seriesIndex: number;
}

export const parsePost = (
  content: string,
  postTitle?: string,
  series?: string,
): { meta: PostMeta; body: string[] } => {
  // 모든 줄바꿈 문자를 \n으로 통일
  const normalizedContent = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = normalizedContent.split("\n");

  const meta: PostMeta = {
    title: "",
    description: "",
    cover: "",
    date: "",
    tags: [],
    series: "",
    seriesIndex: -1,
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

    if (key === "tags") {
      meta.tags = value.split(",").map((x) => x.trim());
    } else if (key === "seriesIndex") {
      meta.seriesIndex = parseInt(value);
    } else if (key === "title") {
      meta.title = value;
    } else if (key === "description") {
      meta.description = value;
    } else if (key === "cover") {
      if (value.startsWith("./")) {
        meta.cover = `/contents/posts/${series}/${postTitle}/${value.slice(2)}`;
      } else {
        meta.cover = value;
      }
    
    } else if (key === "date") {
      meta.date = value;
    } else if (key === "series") {
      meta.series = value;
    } else {
      console.warn(`Unknown key: ${key}`);
    }
  }

  return { meta, body };
};