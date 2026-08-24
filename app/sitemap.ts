import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const dbPath = path.join(process.cwd(), "data", "seo-db.json");
  const defaultBaseUrl = "https://ddspune.com";

  let baseUrl = defaultBaseUrl;
  let dbPages: { [key: string]: any } = {};

  try {
    if (fs.existsSync(dbPath)) {
      const fileContent = fs.readFileSync(dbPath, "utf8");
      const db = JSON.parse(fileContent);
      baseUrl = db.seo_settings?.websiteUrl || defaultBaseUrl;
      dbPages = db.pages || {};
    }
  } catch (error) {
    // Fallback to defaults if read fails
  }

  // Construct sitemap entries dynamically
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const pageKey in dbPages) {
    const page = dbPages[pageKey];
    
    // Skip if page is set to noindex
    if (page.indexing?.noindex) {
      continue;
    }

    const pathUrl = page.url === "/" ? "" : page.url;
    const isHome = page.url === "/";

    sitemapEntries.push({
      url: `${baseUrl}${pathUrl}`,
      lastModified: new Date(),
      changeFrequency: isHome ? "weekly" : "monthly",
      priority: isHome ? 1.0 : 0.8,
    });
  }

  // Include dynamic blog slug routes from database
  let dbBlogs: any[] = [];
  try {
    if (fs.existsSync(dbPath)) {
      const fileContent = fs.readFileSync(dbPath, "utf8");
      const db = JSON.parse(fileContent);
      dbBlogs = db.blogs || [];
    }
  } catch (e) {}

  // Fallback to default posts if database blogs are empty
  if (dbBlogs.length === 0) {
    dbBlogs = [
      { slug: "teeth-whitening-safe-effective" },
      { slug: "braces-vs-clear-aligners" },
      { slug: "protect-child-teeth-prevent-cavities" }
    ];
  }

  for (const blog of dbBlogs) {
    sitemapEntries.push({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  return sitemapEntries;
}
