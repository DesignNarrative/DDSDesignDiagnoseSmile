import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { runCrawlerAudit } from "@/lib/crawler";

async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("seo_session_token");
  return token?.value === "authorized_session";
}

export async function POST(request: Request) {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { origin } = new URL(request.url);

    // Run the technical SEO audit engine crawl
    const result = await runCrawlerAudit(origin);

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "SEO Audit crawl execution failed." },
      { status: 500 }
    );
  }
}
