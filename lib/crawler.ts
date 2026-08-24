import fs from "fs";
import path from "path";
import { saveSeoDatabase } from "./seo";

const dbPath = path.join(process.cwd(), "data", "seo-db.json");

interface AuditIssue {
  id: string;
  severity: "CRITICAL" | "WARNING" | "IMPROVEMENT";
  pageKey: string;
  url: string;
  description: string;
  whyItMatters: string;
  recommendedAction: string;
  status: "Open" | "In Progress" | "Resolved" | "Ignored";
  dateDetected: string;
}

export async function runCrawlerAudit(origin: string) {
  if (!fs.existsSync(dbPath)) {
    throw new Error("SEO Database not found");
  }

  const fileContent = fs.readFileSync(dbPath, "utf8");
  const db = JSON.parse(fileContent);

  const pages = db.pages || {};
  const pageKeys = Object.keys(pages);
  const issues: AuditIssue[] = [];
  const timestamp = new Date().toISOString();

  let totalScore = 0;
  let crawledCount = 0;

  for (const pageKey of pageKeys) {
    const page = pages[pageKey];
    const pageUrl = page.url === "/" ? "" : page.url;
    const fetchTarget = `${origin}${pathUrlClean(pageUrl)}`;

    let html = "";
    let status = 200;

    try {
      const res = await fetch(fetchTarget, {
        headers: { "User-Agent": "DDS-SEO-Audit-Engine/1.0" },
      });
      status = res.status;
      if (res.ok) {
        html = await res.text();
      }
    } catch (e) {
      status = 500;
    }

    let pageScore = 100;

    // --- 1. HTTP STATUS CODE CHECKS ---
    if (status !== 200) {
      pageScore -= 40;
      issues.push({
        id: `issue_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        severity: "CRITICAL",
        pageKey,
        url: page.url,
        description: `Page returned non-200 status code: HTTP ${status}`,
        whyItMatters: "Search engines cannot crawl pages that return server errors or are missing.",
        recommendedAction: "Verify local code or restart the server to ensure this route compiles.",
        status: "Open",
        dateDetected: timestamp,
      });
    }

    if (html) {
      // --- 2. TITLE TAG CHECKS ---
      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : "";

      if (!title) {
        pageScore -= 20;
        issues.push({
          id: `issue_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          severity: "CRITICAL",
          pageKey,
          url: page.url,
          description: "Missing Page Title tag.",
          whyItMatters: "Titles are the most important on-page SEO element and display in search results.",
          recommendedAction: "Add a descriptive meta title in the Pages editor.",
          status: "Open",
          dateDetected: timestamp,
        });
      } else if (title.length < 30 || title.length > 60) {
        pageScore -= 10;
        issues.push({
          id: `issue_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          severity: "WARNING",
          pageKey,
          url: page.url,
          description: `Page title length (${title.length} chars) is outside optimal range (30-60 chars).`,
          whyItMatters: "Titles that are too long will be truncated by Google, and too short titles lack keyword value.",
          recommendedAction: "Optimize the title length in the editor to be between 30 and 60 characters.",
          status: "Open",
          dateDetected: timestamp,
        });
      }

      // --- 3. META DESCRIPTION CHECKS ---
      let description = "";
      const metaMatch = html.match(/<meta[^>]+name=["']description["'][^>]*>/i) || 
                        html.match(/<meta[^>]+content=["'][^"']*["'][^>]+name=["']description["'][^>]*>/i);
      if (metaMatch) {
        const contentMatch = metaMatch[0].match(/content=["']([^"']*)["']/i);
        if (contentMatch) description = contentMatch[1].trim();
      }

      if (!description) {
        pageScore -= 20;
        issues.push({
          id: `issue_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          severity: "CRITICAL",
          pageKey,
          url: page.url,
          description: "Missing Meta Description.",
          whyItMatters: "Google uses meta descriptions to display snippets in search results.",
          recommendedAction: "Add a compelling meta description in the SEO editor.",
          status: "Open",
          dateDetected: timestamp,
        });
      } else if (description.length < 110 || description.length > 160) {
        pageScore -= 10;
        issues.push({
          id: `issue_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          severity: "WARNING",
          pageKey,
          url: page.url,
          description: `Meta description length (${description.length} chars) is outside optimal range (110-160 chars).`,
          whyItMatters: "Descriptions outside this range are truncated or ignored by search engine crawlers.",
          recommendedAction: "Ensure the meta description is between 110 and 160 characters.",
          status: "Open",
          dateDetected: timestamp,
        });
      }

      // --- 4. HEADING (H1) CHECKS ---
      const h1s = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
      if (h1s.length === 0) {
        pageScore -= 15;
        issues.push({
          id: `issue_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          severity: "CRITICAL",
          pageKey,
          url: page.url,
          description: "Missing H1 heading tag.",
          whyItMatters: "H1 tags structure the page hierarchy and inform crawlers of the primary topic.",
          recommendedAction: "Include exactly one primary H1 heading at the top of the page.",
          status: "Open",
          dateDetected: timestamp,
        });
      } else if (h1s.length > 1) {
        pageScore -= 10;
        issues.push({
          id: `issue_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          severity: "WARNING",
          pageKey,
          url: page.url,
          description: `Multiple H1 heading tags found (${h1s.length} detected).`,
          whyItMatters: "Using multiple H1 tags dilutes the primary topic focus for search engines.",
          recommendedAction: "Convert secondary H1 tags to H2 or H3 heading tags.",
          status: "Open",
          dateDetected: timestamp,
        });
      }

      // --- 5. IMAGE ALT TEXT AUDITING ---
      const imgMatches = html.match(/<img[^>]*>/gi) || [];
      let missingAltCount = 0;
      imgMatches.forEach((img) => {
        const hasAlt = img.match(/alt=["']([^"']*)["']/i);
        // Ignore decorative logo alt triggers
        if (!hasAlt || (hasAlt && hasAlt[1].trim() === "")) {
          missingAltCount++;
        }
      });

      if (missingAltCount > 0) {
        pageScore -= Math.min(15, missingAltCount * 3);
        issues.push({
          id: `issue_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          severity: "WARNING",
          pageKey,
          url: page.url,
          description: `${missingAltCount} images are missing descriptive Alt Text.`,
          whyItMatters: "Alt texts enable image searches and support accessibility screen readers.",
          recommendedAction: "Specify alt attributes for all image tags in the image manager.",
          status: "Open",
          dateDetected: timestamp,
        });
      }

      // --- 6. SCHEMA AND SOCIAL CHECKS ---
      const ogTitle = html.match(/property=["']og:title["']/i);
      const ogDesc = html.match(/property=["']og:description["']/i);
      if (!ogTitle || !ogDesc) {
        pageScore -= 5;
        issues.push({
          id: `issue_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          severity: "IMPROVEMENT",
          pageKey,
          url: page.url,
          description: "Missing basic Social OpenGraph (og:title / og:description) cards.",
          whyItMatters: "OpenGraph tags determine how pages look when shared on social networks.",
          recommendedAction: "Add OpenGraph settings in the social tab of the page editor.",
          status: "Open",
          dateDetected: timestamp,
        });
      }
    } else {
      // Empty content or server timeout
      pageScore = 0;
    }

    // Keep pageScore positive
    pageScore = Math.max(0, pageScore);
    pages[pageKey].seoScore = pageScore;
    pages[pageKey].lastUpdated = timestamp;

    totalScore += pageScore;
    crawledCount++;
  }

  // Calculate global scores
  const globalScore = crawledCount > 0 ? Math.round(totalScore / crawledCount) : 0;

  // Save audit log history
  if (!db.seo_audits) db.seo_audits = [];
  
  const auditId = `audit_${Date.now()}`;
  db.seo_audits.push({
    id: auditId,
    runTime: timestamp,
    healthScore: globalScore,
    issuesCount: issues.length,
  });

  // Preserve only last 5 audit runs
  db.seo_audits = db.seo_audits.slice(-5);
  db.seo_issues = issues;

  await saveSeoDatabase(db);
  return { success: true, healthScore: globalScore, issuesCount: issues.length };
}

function pathUrlClean(route: string): string {
  if (route.startsWith("/")) return route;
  return `/${route}`;
}
