import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "seo-db.json");

export async function POST(request: Request) {
  try {
    const { url, referrer } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required." }, { status: 400 });
    }

    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ error: "Database not found." }, { status: 404 });
    }

    const fileContent = fs.readFileSync(dbPath, "utf8");
    const db = JSON.parse(fileContent);

    if (!db.logs_404) db.logs_404 = [];

    const existingLog = db.logs_404.find((l: any) => l.url.toLowerCase() === url.toLowerCase());
    const timestamp = new Date().toISOString();

    if (existingLog) {
      existingLog.hits += 1;
      existingLog.lastDetected = timestamp;
      if (referrer) existingLog.referrer = referrer;
    } else {
      db.logs_404.push({
        url,
        hits: 1,
        firstDetected: timestamp,
        lastDetected: timestamp,
        referrer: referrer || "Direct / Unknown",
      });
    }

    // Keep log table to max 200 items to prevent bloating database
    db.logs_404 = db.logs_404.slice(-200);

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf8");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to log 404 error." }, { status: 500 });
  }
}
