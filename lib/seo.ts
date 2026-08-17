import fs from "fs";
import path from "path";
import { Metadata } from "next";

export function getSeoMetadata(pageKey: string): Metadata {
  try {
    const dbPath = path.join(process.cwd(), "data", "seo-db.json");
    if (!fs.existsSync(dbPath)) {
      return {};
    }

    const fileContent = fs.readFileSync(dbPath, "utf8");
    const db = JSON.parse(fileContent);
    const page = db.pages[pageKey];

    if (!page) {
      return {};
    }

    const baseUrl = db.seo_settings?.websiteUrl || "https://dentsspaclinic.com";

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

    return {
      title: page.title || "DDS Dental Clinic",
      description: page.description || "Diagnose. Design. Smile.",
      keywords: page.keywords || "",
      robots: robotsObj,
      alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
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
    const dbPath = path.join(process.cwd(), "data", "seo-db.json");
    if (!fs.existsSync(dbPath)) return null;

    const fileContent = fs.readFileSync(dbPath, "utf8");
    const db = JSON.parse(fileContent);
    const page = db.pages[pageKey];

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
