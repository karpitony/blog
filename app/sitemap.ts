import type { MetadataRoute } from "next";
import { getPostList } from "@/libs/Post/getPostList";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://yunseok.vercel.app";

  const posts = await getPostList();
  const latestDate = posts
    .map((post) => new Date(post.meta.date))
    .sort((a, b) => b.getTime() - a.getTime())[0];
  const latestDateISO = new Date(latestDate.toISOString().split("T")[0] + "T00:00:00Z").toISOString();

  const postPaths: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.meta.date + "T00:00:00Z").toISOString(),
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  const staticPaths: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, priority: 1.0, changeFrequency: "weekly"},
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${baseUrl}/posts`, lastModified: latestDateISO, priority: 0.8, changeFrequency: "weekly" },
  ];

  return [...staticPaths, ...postPaths];
}
