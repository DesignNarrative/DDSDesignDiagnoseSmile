import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("PROXY INTERCEPT:", pathname);

  // Skip static assets, API paths, and internal dev checks
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  try {
    const origin = request.nextUrl.origin;
    // Query API for active redirect
    const checkUrl = `${origin}/api/seo/check-redirect?url=${encodeURIComponent(pathname)}`;
    
    const res = await fetch(checkUrl);
    if (res.ok) {
      const data = await res.json();
      if (data.redirect && data.destination) {
        const statusCode = data.statusCode || 307;
        const redirectUrl = new URL(data.destination, request.url);
        return NextResponse.redirect(redirectUrl, statusCode);
      }
    }
  } catch (error) {
    // Fail silently to prevent site crash if API has transient issues
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
