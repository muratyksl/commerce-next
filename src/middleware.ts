import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");
  const isAuthPage = request.nextUrl.pathname === "/login";
  const isRootPage = request.nextUrl.pathname === "/";

  if (isRootPage) {
    return NextResponse.next();
  }

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/products/:path*", "/login"],
};
