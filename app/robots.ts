import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function robots(): MetadataRoute.Robots {
  const dbPath = path.join(process.cwd(), "data", "seo-db.json");
  const defaultSitemap = "https://ddspune.com/sitemap.xml";

  let sitemapUrl = defaultSitemap;
  let disallowRules: string[] = [];

  try {
    if (fs.existsSync(dbPath)) {
      const fileContent = fs.readFileSync(dbPath, "utf8");
      const db = JSON.parse(fileContent);
      sitemapUrl = `${db.seo_settings?.websiteUrl || "https://ddspune.com"}/sitemap.xml`;
      
      // Load disallows from noindexed pages
      Object.keys(db.pages || {}).forEach((pKey) => {
        const page = db.pages[pKey];
        if (page.indexing?.noindex && page.url !== "/") {
          disallowRules.push(page.url);
        }
      });

      // Load disallows from noindexed blogs
      (db.blogs || []).forEach((blog: any) => {
        if (blog.indexing?.noindex) {
          disallowRules.push(`/blog/${blog.slug}`);
        }
      });
    }
  } catch (error) {
    // Fallback if read fails
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", ...disallowRules],
    },
    sitemap: sitemapUrl,
  };
}
