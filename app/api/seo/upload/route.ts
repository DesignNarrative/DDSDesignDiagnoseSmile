import { NextResponse } from "next/server";
import { cookies } from "next/headers";

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

    const { fileName, fileBase64 } = await request.json();
    if (!fileName || !fileBase64) {
      return NextResponse.json({ error: "Filename and fileBase64 content are required." }, { status: 400 });
    }

    const fs = eval('require')("fs");
    const path = eval('require')("path");

    // Clean up filename and make it unique to prevent overwriting
    const ext = path.extname(fileName) || ".png";
    const baseName = path.basename(fileName, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueName = `${baseName}_${Date.now()}${ext}`;
    const localUploadDir = path.join(process.cwd(), "public", "images", "uploads");
    const relativePath = `/images/uploads/${uniqueName}`;

    const isDev = process.env.NODE_ENV === "development" || !process.env.VERCEL;

    if (isDev) {
      try {
        if (!fs.existsSync(localUploadDir)) {
          fs.mkdirSync(localUploadDir, { recursive: true });
        }
        const buffer = Buffer.from(fileBase64, "base64");
        const localPath = path.join(localUploadDir, uniqueName);
        fs.writeFileSync(localPath, buffer);
      } catch (localErr: any) {
        console.warn("Local filesystem write skipped/failed:", localErr.message);
      }
    }

    // Push to GitHub in production if GITHUB_TOKEN is present
    const githubToken = process.env.GITHUB_TOKEN;
    const repoName = process.env.GITHUB_REPO || "DDSDesignDiagnoseSmile";
    const repoOwner = process.env.GITHUB_OWNER || "DesignNarrative";
    const repoBranch = process.env.GITHUB_BRANCH || "main";
    const gitUploadPath = `public/images/uploads/${uniqueName}`;

    if (githubToken) {
      const putUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${gitUploadPath}`;
      const putRes = await fetch(putUrl, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${githubToken}`,
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: `Upload image asset ${uniqueName} via Admin Panel`,
          content: fileBase64,
          branch: repoBranch
        })
      });

      if (!putRes.ok) {
        const errMsg = await putRes.text();
        throw new Error(`GitHub upload failed: ${putRes.status} ${errMsg}`);
      }
    }

    return NextResponse.json({ success: true, path: relativePath });
  } catch (error: any) {
    console.error("Error in upload handler:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image file." },
      { status: 500 }
    );
  }
}
