import type { MetadataRoute } from "next";
import { getPostList } from "@/libs/Post/GetPostList";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://yunseok.vercel.app";

  // 기본 경로들 정의
  const staticPaths = [
    { loc: "", lastmod: new Date().toISOString() }, // Home
    { loc: "about", lastmod: new Date().toISOString() }, // About page
  ];

  // 게시글 경로 가져오기
  const posts = await getPostList();
  const postPaths = posts.map((post) => ({
    loc: `posts/${post.slug}`,
    lastmod: post.meta.date,
  }));

  // 경로들을 결합
  const allPaths = [...staticPaths, ...postPaths].map((path) => ({
    url: `${baseUrl}/${path.loc}`,
    lastModified: path.lastmod,
  }));

  return allPaths;
}
