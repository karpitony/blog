export interface DiaryMeta {
  title: string;
  description: string;
  cover: string;
  date: string;
}

export interface DiaryData {
  meta: DiaryMeta;
  slug: string;
}
