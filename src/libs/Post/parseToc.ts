export interface HeadingItem {
  text: string;
  link: string;
  indent: number;
}

export default function parseToc(content: string): HeadingItem[] {
  const regex = /^(##|###) (.*$)/gim;
  const headingList = content.match(regex);
  return (
    headingList?.map((heading: string) => ({
      text: heading.replace('##', '').replace('#', ''),
      link:
        '#' +
        heading
          .replace('# ', '')
          .replace('#', '')
          .replace(/[`~!@#$%^&*()_+=\[\]{}|\\;:'",.<>/?]/g, '') // 모든 특수문자 제거
          .replace(/ /g, '-')
          .toLowerCase()
          .replace('?', '')
          .replace(/`/g, '') // 백틱 제거
          .replace(/[^\w\s가-힣-]/g, '') // 영어/숫자/한글/하이픈/공백만 유지
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '-') // 공백 → 하이픈
          .replace(/-+/g, '-') // 연속 하이픈 → 하나로
          .replace(/^-+|-+$/g, ''), // 앞뒤 하이픈 제거
      indent: (heading.match(/#/g)?.length || 2) - 2,
    })) || []
  );
}
