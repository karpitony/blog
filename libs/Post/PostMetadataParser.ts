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
  content: string
): { meta: PostMeta; body: string[] } => {
  const lines = content.split("\n");
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
    const line = lines[i];

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
      meta.cover = value;
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