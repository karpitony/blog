export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://yunseok.vercel.app/sitemap.xml",
  };
}
