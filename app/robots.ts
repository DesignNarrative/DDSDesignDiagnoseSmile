import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function robots(): MetadataRoute.Robots {
  const dbPath = path.join(process.cwd(), "data", "seo-db.json");
  const defaultBaseUrl = "https://www.ddspune.com";

  let baseUrl = defaultBaseUrl;

  try {
    if (fs.existsSync(dbPath)) {
      const fileContent = fs.readFileSync(dbPath, "utf8");
      const db = JSON.parse(fileContent);
      baseUrl = db.seo_settings?.websiteUrl || defaultBaseUrl;
    }
  } catch (error) {
    // Fallback if read fails
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/",
        "/api",
        "/api/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
