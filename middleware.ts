import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route needs protection
  const isProtected =
    pathname.startsWith("/door-builder") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout");

  if (!isProtected) {
    return NextResponse.next();
  }

  // Get credentials from environment
  const username = process.env.BUILDER_BASIC_USER;
  const password = process.env.BUILDER_BASIC_PASS;

  // In production, require env vars; in development, allow without them
  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction && (!username || !password)) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Protected"',
      },
    });
  }
  if (!username || !password) {
    return NextResponse.next(); // Development: allow without auth
  }

  // Check Authorization header
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Protected"',
      },
    });
  }

  try {
    // Extract and decode credentials
    const base64Credentials = authHeader.slice(6); // Remove "Basic "
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf8");
    const [providedUsername, providedPassword] = credentials.split(":");

    // Validate credentials
    if (providedUsername === username && providedPassword === password) {
      return NextResponse.next();
    }
  } catch (error) {
    // Malformed credentials
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Protected"',
      },
    });
  }

  // Invalid credentials
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Protected"',
    },
  });
}

export const config = {
  matcher: ["/door-builder/:path*", "/cart/:path*", "/checkout/:path*"],
};
