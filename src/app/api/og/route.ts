import { NextRequest, NextResponse } from 'next/server';

interface OgData {
  title: string;
  description: string;
  image: string;
  favicon: string;
  siteName: string;
}

function extractMetaContent(html: string, property: string): string {
  // Match both property="og:..." and name="..." patterns
  const patterns = [
    new RegExp(
      `<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']*)["']`,
      'i',
    ),
    new RegExp(
      `<meta[^>]*content=["']([^"']*)["'][^>]*property=["']${property}["']`,
      'i',
    ),
    new RegExp(
      `<meta[^>]*name=["']${property}["'][^>]*content=["']([^"']*)["']`,
      'i',
    ),
    new RegExp(
      `<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${property}["']`,
      'i',
    ),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1];
  }
  return '';
}

function extractTitle(html: string): string {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match?.[1]?.trim() || '';
}

function resolveUrl(base: string, relative: string): string {
  if (!relative) return '';
  if (relative.startsWith('http')) return relative;
  try {
    return new URL(relative, base).href;
  } catch {
    return '';
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'url parameter is required' }, { status: 400 });
  }

  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; Yuniversebot/1.0; +https://yunseok.vercel.app)',
        Accept: 'text/html',
      },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch URL' }, { status: 502 });
    }

    const html = await response.text();
    const origin = new URL(url).origin;

    const ogImage = extractMetaContent(html, 'og:image');
    const favicon =
      html.match(/<link[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']*)["']/i)?.[1] ||
      '/favicon.ico';

    const data: OgData = {
      title:
        extractMetaContent(html, 'og:title') ||
        extractMetaContent(html, 'twitter:title') ||
        extractTitle(html),
      description:
        extractMetaContent(html, 'og:description') ||
        extractMetaContent(html, 'twitter:description') ||
        extractMetaContent(html, 'description'),
      image: resolveUrl(url, ogImage),
      favicon: resolveUrl(origin, favicon),
      siteName: extractMetaContent(html, 'og:site_name') || new URL(url).hostname,
    };

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    });
  } catch (err) {
    console.error('OG fetch error:', err);
    return NextResponse.json(
      {
        title: '',
        description: '',
        image: '',
        favicon: '',
        siteName: new URL(url).hostname,
      } satisfies OgData,
      {
        headers: {
          'Cache-Control': 'public, s-maxage=36000',
        },
      },
    );
  }
}
