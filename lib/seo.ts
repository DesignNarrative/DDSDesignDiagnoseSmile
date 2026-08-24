import { Metadata } from "next";

export function getSeoMetadata(pageKey: string): Metadata {
  try {
    const fs = eval('require')("fs");
    const path = eval('require')("path");
    const dbPath = path.join(process.cwd(), "data", "seo-db.json");
    if (!fs.existsSync(dbPath)) {
      return {};
    }

    const fileContent = fs.readFileSync(dbPath, "utf8");
    const db = JSON.parse(fileContent);
    let page = db.pages[pageKey];

    // Check if it's a dynamic blog post if not found in static pages
    if (!page && pageKey.startsWith("blog_")) {
      const blogSlug = pageKey.replace("blog_", "");
      const matchedBlog = (db.blogs || []).find((b: any) => b.slug === blogSlug);
      if (matchedBlog) {
        page = {
          title: matchedBlog.seoTitle || matchedBlog.title,
          description: matchedBlog.seoDescription || matchedBlog.excerpt,
          keywords: matchedBlog.seoKeywords || "",
          url: `/blog/${matchedBlog.slug}`,
          indexing: { noindex: false, nofollow: false, noarchive: false },
          canonical: { mode: "self", customUrl: "" },
          social: {
            ogTitle: matchedBlog.seoTitle || matchedBlog.title,
            ogDescription: matchedBlog.seoDescription || matchedBlog.excerpt,
            ogImage: matchedBlog.image || "/images/dds_final_logo_white.png"
          }
        };
      }
    }

    if (!page) {
      return {};
    }

    const baseUrl = db.seo_settings?.websiteUrl || "https://ddspune.com";

    // Dynamic Robots directive check
    const robotsObj = {
      index: !page.indexing?.noindex,
      follow: !page.indexing?.nofollow,
      noarchive: !!page.indexing?.noarchive,
    };

    // Dynamic Canonical link configuration
    let canonicalUrl: string | undefined = undefined;
    if (page.canonical?.mode === "self") {
      canonicalUrl = `${baseUrl}${page.url === "/" ? "" : page.url}`;
    } else if (page.canonical?.mode === "custom" && page.canonical?.customUrl) {
      canonicalUrl = page.canonical.customUrl;
    }

    // Site Verification meta tokens
    const verification: any = {};
    if (db.seo_settings?.googleSiteVerification) {
      verification.google = db.seo_settings.googleSiteVerification;
    }
    if (db.seo_settings?.bingSiteVerification) {
      verification.other = {
        "msvalidate.01": [db.seo_settings.bingSiteVerification]
      };
    }

    return {
      title: page.title || "DDS Dental Clinic",
      description: page.description || "Diagnose. Design. Smile.",
      keywords: page.keywords || "",
      robots: robotsObj,
      alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
      verification: Object.keys(verification).length > 0 ? verification : undefined,
      openGraph: {
        title: page.social?.ogTitle || page.title,
        description: page.social?.ogDescription || page.description,
        images: [{ url: page.social?.ogImage || db.seo_settings?.defaultOgImage || "/images/dds_final_logo_white.png" }],
        url: `${baseUrl}${page.url === "/" ? "" : page.url}`,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: page.social?.twitterTitle || page.title,
        description: page.social?.twitterDescription || page.description,
        images: [page.social?.ogImage || "/images/dds_final_logo_white.png"],
      },
    };
  } catch (error) {
    return {};
  }
}

// Helper to inject JSON-LD script schemas dynamically inside layouts
export function getSeoSchemaJson(pageKey: string): string | null {
  try {
    const fs = eval('require')("fs");
    const path = eval('require')("path");
    const dbPath = path.join(process.cwd(), "data", "seo-db.json");
    if (!fs.existsSync(dbPath)) return null;

    const fileContent = fs.readFileSync(dbPath, "utf8");
    const db = JSON.parse(fileContent);
    let page = db.pages[pageKey];

    // Support schema for blogs dynamically if needed
    if (!page && pageKey.startsWith("blog_")) {
      const blogSlug = pageKey.replace("blog_", "");
      const matchedBlog = (db.blogs || []).find((b: any) => b.slug === blogSlug);
      if (matchedBlog) {
        page = {
          schema: [
            {
              type: "BlogPosting",
              active: true,
              fields: {
                headline: matchedBlog.title,
                description: matchedBlog.excerpt,
                datePublished: matchedBlog.date,
                image: matchedBlog.image,
                author: matchedBlog.author || "Dr. Priti Munde"
              }
            }
          ]
        };
      }
    }

    if (!page || !page.schema || page.schema.length === 0) {
      return null;
    }

    const schemas = page.schema.filter((s: any) => s.active);
    if (schemas.length === 0) return null;

    // Convert active schemas into a list of structured JSON-LD objects
    const jsonLdList = schemas.map((s: any) => {
      const baseSchema: any = {
        "@context": "https://schema.org",
        "@type": s.type,
      };

      // Populate database overrides
      Object.keys(s.fields || {}).forEach((fKey) => {
        if (s.fields[fKey]) {
          baseSchema[fKey] = s.fields[fKey];
        }
      });

      return baseSchema;
    });

    return JSON.stringify(jsonLdList.length === 1 ? jsonLdList[0] : jsonLdList, null, 2);
  } catch (error) {
    return null;
  }
}

// Image Alt SEO dynamic mapping helpers (Browser-safe using dynamic require)
export function getImageAlt(src: string, defaultAlt: string = ""): string {
  if (typeof window !== "undefined") {
    const win = window as any;
    if (win.__SEO_DB__ && win.__SEO_DB__[src]) {
      return win.__SEO_DB__[src].alt || defaultAlt;
    }
    return defaultAlt;
  }
  try {
    const fs = eval('require')("fs");
    const path = eval('require')("path");
    const dbPath = path.join(process.cwd(), "data", "seo-db.json");
    if (!fs.existsSync(dbPath)) return defaultAlt;
    const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    if (db.image_alts && db.image_alts[src]) {
      return db.image_alts[src].alt || defaultAlt;
    }
    return defaultAlt;
  } catch (e) {
    return defaultAlt;
  }
}

export function getImageTitle(src: string, defaultTitle: string = ""): string {
  if (typeof window !== "undefined") {
    const win = window as any;
    if (win.__SEO_DB__ && win.__SEO_DB__[src]) {
      return win.__SEO_DB__[src].title || defaultTitle;
    }
    return defaultTitle;
  }
  try {
    const fs = eval('require')("fs");
    const path = eval('require')("path");
    const dbPath = path.join(process.cwd(), "data", "seo-db.json");
    if (!fs.existsSync(dbPath)) return defaultTitle;
    const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    if (db.image_alts && db.image_alts[src]) {
      return db.image_alts[src].title || defaultTitle;
    }
    return defaultTitle;
  } catch (e) {
    return defaultTitle;
  }
}

export function getImageSrc(src: string, defaultSrc: string = src): string {
  if (typeof window !== "undefined") {
    const win = window as any;
    if (win.__SEO_DB__ && win.__SEO_DB__[src]) {
      return win.__SEO_DB__[src].src || defaultSrc;
    }
    return defaultSrc;
  }
  try {
    const fs = eval('require')("fs");
    const path = eval('require')("path");
    const dbPath = path.join(process.cwd(), "data", "seo-db.json");
    if (!fs.existsSync(dbPath)) return defaultSrc;
    const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    if (db.image_alts && db.image_alts[src]) {
      return db.image_alts[src].src || defaultSrc;
    }
    return defaultSrc;
  } catch (e) {
    return defaultSrc;
  }
}

export async function saveSeoDatabase(newDbState: any): Promise<{ success: boolean; message: string }> {
  try {
    const fs = eval('require')("fs");
    const path = eval('require')("path");
    const dbPath = path.join(process.cwd(), "data", "seo-db.json");

    // 1. Save locally (development fallback)
    try {
      fs.writeFileSync(dbPath, JSON.stringify(newDbState, null, 2), "utf8");
    } catch (localErr: any) {
      console.warn("Local filesystem write skipped/failed:", localErr.message);
    }

    // 2. Commit to GitHub in production if GITHUB_TOKEN is present
    const githubToken = process.env.GITHUB_TOKEN;
    const repoName = process.env.GITHUB_REPO || "DDSDesignDiagnoseSmile";
    const repoOwner = process.env.GITHUB_OWNER || "DesignNarrative";
    const repoBranch = process.env.GITHUB_BRANCH || "main";
    const dbGitPath = "data/seo-db.json";

    if (githubToken) {
      // 2a. Get file SHA from GitHub Contents API
      const fileUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${dbGitPath}?ref=${repoBranch}`;
      const getRes = await fetch(fileUrl, {
        headers: {
          "Authorization": `Bearer ${githubToken}`,
          "Accept": "application/vnd.github.v3+json"
        }
      });

      let fileSha = "";
      if (getRes.ok) {
        const fileData = await getRes.json();
        fileSha = fileData.sha;
      }

      // 2b. Commit payload
      const contentBase64 = Buffer.from(JSON.stringify(newDbState, null, 2)).toString("base64");
      const putUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${dbGitPath}`;
      const putRes = await fetch(putUrl, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${githubToken}`,
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: "Update SEO configuration via Admin Dashboard Panel (Save/Audit)",
          content: contentBase64,
          sha: fileSha || undefined,
          branch: repoBranch
        })
      });

      if (!putRes.ok) {
        const errMsg = await putRes.text();
        throw new Error(`GitHub API commit failed (Status ${putRes.status}): ${errMsg}`);
      }
      return { success: true, message: "Committed changes to GitHub successfully." };
    }

    return { success: true, message: "Saved changes to local filesystem." };
  } catch (err: any) {
    throw new Error(err.message || "Failed to save SEO database changes.");
  }
}
