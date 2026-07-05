import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_SECRET = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET || "fallback-dev-secret"
);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Login API is always allowed through
  if (pathname === "/api/admin/login") return NextResponse.next();

  const token = request.cookies.get("admin_session")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await jwtVerify(token, SESSION_SECRET);
    return NextResponse.next();
  } catch {
    // Token invalid or expired
    const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    response.cookies.delete("admin_session");
    return response;
  }
}

export const config = {
  matcher: ["/api/admin/:path*"],
};
