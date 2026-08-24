import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "seo-db.json");

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const urlParam = searchParams.get("url");

    if (!urlParam) {
      return NextResponse.json({ redirect: false });
    }

    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ redirect: false });
    }

    const fileContent = fs.readFileSync(dbPath, "utf8");
    const db = JSON.parse(fileContent);

    const normalizePath = (p: string) => p.replace(/\/+$/, "").toLowerCase().trim();

    // Search active redirects
    const activeRedirect = db.redirects?.find(
      (r: any) => r.active && normalizePath(r.source) === normalizePath(urlParam)
    );

    if (activeRedirect) {
      return NextResponse.json({
        redirect: true,
        destination: activeRedirect.destination,
        statusCode: parseInt(activeRedirect.statusCode, 10) || 307,
      });
    }

    return NextResponse.json({ redirect: false });
  } catch (error) {
    return NextResponse.json({ redirect: false }, { status: 500 });
  }
}
