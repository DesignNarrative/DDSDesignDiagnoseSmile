import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Secure production login credentials
    const SECURE_USERNAME = "seo_admin";
    const SECURE_PASSWORD = "DDS_seo_Secure_2026!";

    if (username === SECURE_USERNAME && password === SECURE_PASSWORD) {
      const response = NextResponse.json({ success: true, message: "Logged in successfully." });
      
      // Set secure session cookie
      response.cookies.set({
        name: "seo_session_token",
        value: "authorized_session",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Login request failed." }, { status: 500 });
  }
}
