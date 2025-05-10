export interface PostMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover: string;
  series: string;
  seriesIndex: number;
  draft?: boolean;
}

export interface PostData {
  meta: PostMeta;
  slug: string;
}

export interface SeriesSummary {
  name: string;
  slugs: string[];
}
