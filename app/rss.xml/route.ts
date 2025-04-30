import { NextResponse } from 'next/server';
import { getPostList } from '@/libs/Post/getPostList';

export const dynamic = 'force-static';
const escapeCDATA = (str: string) => `<![CDATA[${str}]]>`;

async function generateRssFeed() {
  const { posts } = await getPostList();
  const rssItems = posts.map((post) => {
    const { title, date, description } = post.meta;
    const url = `https://yunseok.vercel.app/posts/${post.slug}`;
    return `
      <item>
        <title>${escapeCDATA(title)}</title>
        <link>${url}</link>
        <description>${escapeCDATA(description)}</description>
        <pubDate>${new Date(date).toUTCString()}</pubDate>
      </item>
    `;
  }).join('');
  return `
  <?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Yuniverse RSS Feed</title>
        <link>https://yunseok.vercel.app</link>
        <description>개발자 송윤석의 개인 블로그입니다.</description>
        <language>ko</language>
        ${rssItems}
      </channel>
    </rss>
  `.trim();
};

export async function GET() {
  const rssFeed = await generateRssFeed();
  return new NextResponse(rssFeed, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'  // 1 day
    },
  });
}

