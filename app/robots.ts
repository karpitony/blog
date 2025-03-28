export default function robots() {
  return {
    rules: [
      { 
        userAgent: "*",
        disallow: "/" 
      },
      {
      userAgent: "Yeti",
      allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
      }
    ],
    sitemap: "https://yunseok.vercel.app/sitemap.xml",
  };
}
