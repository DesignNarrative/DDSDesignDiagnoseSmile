import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ success: true, message: "Logged out successfully." });
    
    // Clear cookie
    response.cookies.delete("seo_session_token");
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Logout failed." }, { status: 500 });
  }
}
