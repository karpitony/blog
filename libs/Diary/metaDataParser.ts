export interface DiaryMeta {
  title: string;
  cover: string;
  date: string;
}

export const parseDiary = (
  content: string
): { meta: DiaryMeta; body: string[] } => {
  // 모든 줄바꿈 문자를 \n으로 통일
  const normalizedContent = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = normalizedContent.split("\n");

  const meta: DiaryMeta = {
    title: "",
    cover: "",
    date: "",
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

    if (key === "title") {
      meta.title = value;
    } else if (key === "cover") {
      meta.cover = value;
    } else if (key === "date") {
      meta.date = value;
    } else {
      console.warn(`Unknown key: ${key}`);
    }
  }

  return { meta, body };
};