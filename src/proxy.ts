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
    return redirectToLogin(request);
  }

  try {
    await jwtVerify(token, SESSION_SECRET);
    return NextResponse.next();
  } catch {
    // Token invalid or expired
    const response = redirectToLogin(request);
    response.cookies.delete("admin_session");
    return response;
  }
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/wm-studio2207", request.url);
  loginUrl.searchParams.set("auth", "required");
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/wm-studio2207/:path*", "/api/admin/:path*"],
};
