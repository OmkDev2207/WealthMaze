import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

const SESSION_SECRET = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET || "fallback-dev-secret"
);

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Server misconfigured: ADMIN_PASSWORD not set." },
        { status: 500 }
      );
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      // Small delay to prevent brute-force timing attacks
      await new Promise((r) => setTimeout(r, 500));
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    // Sign a JWT session token (expires in 12 hours)
    const token = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("12h")
      .sign(SESSION_SECRET);

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 12, // 12 hours
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
