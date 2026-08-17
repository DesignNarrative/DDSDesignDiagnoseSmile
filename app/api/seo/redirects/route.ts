import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "seo-db.json");

async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("seo_session_token");
  return token?.value === "authorized_session";
}

function detectLoopOrChain(source: string, destination: string, redirects: any[]): { type: "loop" | "chain" | null; routePath?: string[] } {
  if (source.toLowerCase().trim() === destination.toLowerCase().trim()) {
    return { type: "loop", routePath: [source, destination] };
  }

  let current = destination;
  const routePath = [source, destination];
  const visited = new Set<string>([source.toLowerCase().trim()]);

  while (current) {
    const normCurrent = current.toLowerCase().trim();
    visited.add(normCurrent);
    
    // Find next step in redirects
    const nextRedirect = redirects.find(r => r.source.toLowerCase().trim() === normCurrent);
    if (!nextRedirect) break;

    const nextDest = nextRedirect.destination;
    routePath.push(nextDest);

    if (visited.has(nextDest.toLowerCase().trim())) {
      return { type: "loop", routePath };
    }

    current = nextDest;
  }

  if (routePath.length > 2) {
    return { type: "chain", routePath };
  }

  return { type: null };
}

export async function POST(request: Request) {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { action, redirect } = await request.json();

    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ error: "Database not found." }, { status: 404 });
    }

    const fileContent = fs.readFileSync(dbPath, "utf8");
    const db = JSON.parse(fileContent);

    if (!db.redirects) db.redirects = [];

    if (action === "create") {
      const { source, destination, statusCode } = redirect;

      // Clean check inputs
      const cleanSource = source.trim();
      const cleanDestination = destination.trim();

      // 1. Prevent duplicate sources
      const duplicate = db.redirects.find((r: any) => r.source.toLowerCase() === cleanSource.toLowerCase());
      if (duplicate) {
        return NextResponse.json({ error: "A redirect with this source URL already exists." }, { status: 400 });
      }

      // 2. Loop/Chain Detection
      const loopCheck = detectLoopOrChain(cleanSource, cleanDestination, db.redirects);
      if (loopCheck.type === "loop") {
        return NextResponse.json({
          error: `Redirect loop detected! Infinite redirect loop: ${loopCheck.routePath?.join(" → ")}`,
        }, { status: 400 });
      }

      const newRedirect = {
        id: `r_${Date.now()}`,
        source: cleanSource,
        destination: cleanDestination,
        statusCode: statusCode || "307",
        active: true,
        createdAt: new Date().toISOString(),
        createdBy: "seo_admin",
      };

      db.redirects.push(newRedirect);
    } else if (action === "delete") {
      db.redirects = db.redirects.filter((r: any) => r.id !== redirect.id);
    } else if (action === "toggle") {
      const target = db.redirects.find((r: any) => r.id === redirect.id);
      if (target) target.active = !target.active;
    }

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf8");
    return NextResponse.json({ success: true, redirects: db.redirects });
  } catch (error) {
    return NextResponse.json({ error: "Failed to manage redirect." }, { status: 500 });
  }
}
