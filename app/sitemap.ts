import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

function parseValidDate(dateStr?: string): Date | undefined {
  if (!dateStr) return undefined;
  // Handle DD/MM/YYYY format
  if (dateStr.includes("/")) {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const [d, m, y] = parts;
      const iso = `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}T00:00:00.000Z`;
      const dt = new Date(iso);
      if (!isNaN(dt.getTime())) return dt;
    }
  }
  const dt = new Date(dateStr);
  return isNaN(dt.getTime()) ? undefined : dt;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const dbPath = path.join(process.cwd(), "data", "seo-db.json");
  const defaultBaseUrl = "https://ddspune.com";

  let baseUrl = defaultBaseUrl;
  let dbPages: { [key: string]: any } = {};
  let dbBlogs: any[] = [];

  try {
    if (fs.existsSync(dbPath)) {
      const fileContent = fs.readFileSync(dbPath, "utf8");
      const db = JSON.parse(fileContent);
      baseUrl = db.seo_settings?.websiteUrl || defaultBaseUrl;
      dbPages = db.pages || {};
      dbBlogs = db.blogs || [];
    }
  } catch (error) {
    // Fallback if read fails
  }

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Static and Service Pages
  for (const pageKey in dbPages) {
    // Exclude obsolete ghost route
    if (pageKey === "achievements") continue;

    const page = dbPages[pageKey];

    // Exclude noindexed pages
    if (page.indexing?.noindex) continue;

    // Exclude internal admin or API routes
    if (page.url.startsWith("/admin") || page.url.startsWith("/api")) continue;

    // Exclude custom non-canonical URLs
    if (
      page.canonical?.mode === "custom" &&
      page.canonical?.customUrl &&
      page.canonical.customUrl !== `${baseUrl}${page.url === "/" ? "" : page.url}`
    ) {
      continue;
    }

    const pathUrl = page.url === "/" ? "" : page.url;
    const isHome = page.url === "/";
    const isHighPriority = isHome || page.url === "/services" || page.url === "/book";

    // Use actual lastUpdated timestamp, fallback to undefined (no fake new Date())
    const lastMod = parseValidDate(page.lastUpdated);

    sitemapEntries.push({
      url: `${baseUrl}${pathUrl}`,
      lastModified: lastMod,
      changeFrequency: isHome ? "weekly" : isHighPriority ? "weekly" : "monthly",
      priority: isHome ? 1.0 : isHighPriority ? 0.9 : 0.8,
    });
  }

  // 2. Published Dynamic Blog Articles
  for (const blog of dbBlogs) {
    // Only published blogs
    if (blog.status !== "published") continue;

    // Exclude noindexed blogs
    if (blog.indexing?.noindex) continue;

    const blogDate = parseValidDate(blog.lastUpdated || blog.date);

    sitemapEntries.push({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blogDate,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return sitemapEntries;
}
