import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected routes that require authentication
const protectedRoutes = [
  "/admin",
  "/lecturer",
  "/student",
  "/dashboard",
];

// Public routes that don't require authentication
const publicRoutes = [
  "/auth",
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/session",
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If it's a protected route, check for session
  if (isProtectedRoute) {
    const sessionCookie = request.cookies.get("session");

    if (!sessionCookie) {
      // Redirect to login
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Validate session
    try {
      const session = JSON.parse(sessionCookie.value);

      // Check if session has required fields
      if (!session.userId || !session.role) {
        const loginUrl = new URL("/auth/login", request.url);
        loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
      }

      // Check role-based access
      if (pathname.startsWith("/admin") && session.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      if (pathname.startsWith("/lecturer") && session.role !== "lecturer") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      if (pathname.startsWith("/student") && session.role !== "student") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      // Allow access
      return NextResponse.next();
    } catch (error) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // For all other routes, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
