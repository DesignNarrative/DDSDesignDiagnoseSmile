import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { saveSeoDatabase } from "@/lib/seo";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "seo-db.json");

// Middleware cookie authentication helper
async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("seo_session_token");
  return token?.value === "authorized_session";
}

export async function GET() {
  try {
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ error: "Database not found." }, { status: 404 });
    }
    const fileContent = fs.readFileSync(dbPath, "utf8");
    const db = JSON.parse(fileContent);
    return NextResponse.json(db);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read database." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const newDbState = await request.json();

    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ error: "Database not found." }, { status: 404 });
    }

    const oldContent = fs.readFileSync(dbPath, "utf8");
    const oldDbState = JSON.parse(oldContent);

    // Dynamic SEO Change Auditing / Versioning
    const newVersions: any[] = [];
    const timestamp = new Date().toISOString();
    const activeUser = "seo_admin";

    // Track page meta differences
    for (const pageKey in newDbState.pages) {
      const oldPage = oldDbState.pages[pageKey];
      const newPage = newDbState.pages[pageKey];

      if (oldPage && newPage) {
        // Compare title
        if (oldPage.title !== newPage.title) {
          newVersions.push({
            id: `v_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            pageKey,
            user: activeUser,
            timestamp,
            field: "SEO Title",
            before: oldPage.title || "",
            after: newPage.title || "",
          });
        }
        // Compare description
        if (oldPage.description !== newPage.description) {
          newVersions.push({
            id: `v_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            pageKey,
            user: activeUser,
            timestamp,
            field: "Meta Description",
            before: oldPage.description || "",
            after: newPage.description || "",
          });
        }
        // Compare keywords
        if (oldPage.keywords !== newPage.keywords) {
          newVersions.push({
            id: `v_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            pageKey,
            user: activeUser,
            timestamp,
            field: "Keywords",
            before: oldPage.keywords || "",
            after: newPage.keywords || "",
          });
        }
        // Compare focus keyword
        if (oldPage.focusKeyword !== newPage.focusKeyword) {
          newVersions.push({
            id: `v_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            pageKey,
            user: activeUser,
            timestamp,
            field: "Focus Keyword",
            before: oldPage.focusKeyword || "",
            after: newPage.focusKeyword || "",
          });
        }
        // Compare indexing config
        if (JSON.stringify(oldPage.indexing) !== JSON.stringify(newPage.indexing)) {
          newVersions.push({
            id: `v_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            pageKey,
            user: activeUser,
            timestamp,
            field: "Indexing Settings",
            before: JSON.stringify(oldPage.indexing),
            after: JSON.stringify(newPage.indexing),
          });
        }
      }
    }

    // Merge changes with version history
    const mergedVersions = [...newVersions, ...(oldDbState.seo_versions || [])].slice(0, 100);
    newDbState.seo_versions = mergedVersions;

    // Save back to JSON Database & Sync with Git
    try {
      await saveSeoDatabase(newDbState);
    } catch (err: any) {
      console.error("Error committing to GitHub:", err);
      return NextResponse.json({ 
        error: err.message || "Failed to commit changes to GitHub repository." 
      }, { status: 500 });
    }

    // Ping search engine indexers to crawl sitemap
    if (newDbState.seo_settings?.websiteUrl) {
      try {
        const sitemapUrl = `${newDbState.seo_settings.websiteUrl.trim()}/sitemap.xml`;
        await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`, { mode: "no-cors" });
        await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`, { mode: "no-cors" });
      } catch (e) {}
    }

    return NextResponse.json({ success: true, message: "SEO configuration updated successfully." });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update configuration." }, { status: 500 });
  }
}
