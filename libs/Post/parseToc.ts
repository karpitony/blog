export interface Toc {
  value: string;
  level: number;
}

interface TocProps {
  content: string;
}

export default function parseToc({ content } : TocProps) :  Toc[] {
  const toc: Toc[] = [];
  const lines = content.split("\n");

  let isInCodeBlock = false;
  for (const line of lines) {
    const match = line.match(/^#{1,6} (.*)$/);
    if (!isInCodeBlock && match) {
      toc.push({
        value: match[1],
        level: match[0].length - match[1].length - 1,
      });
    } else if (line.startsWith("```")) {
      isInCodeBlock = !isInCodeBlock;
    }
  }

  return toc;
};