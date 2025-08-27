type Rule = {
  userAgent: string;
  allow?: string | string[];
  disallow?: string | string[];
};

export default function robots() {
  const searchBots = ['Yeti', 'Googlebot', 'Bingbot', 'DuckDuckBot'] as const;
  const seoAllows = ['/'];
  const seoDisallows = ['/diary'];

  const rules: Rule[] = [
    { userAgent: '*', disallow: ['/'] },
    ...searchBots.map(bot => ({
      userAgent: bot,
      allow: seoAllows,
      disallow: seoDisallows,
    })),
  ];

  return {
    rules,
    sitemap: 'https://yunseok.vercel.app/sitemap.xml',
  };
}
