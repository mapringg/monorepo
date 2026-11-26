import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  if (request.cookies.has("session")) return NextResponse.next();
  return NextResponse.redirect(new URL("/signin", request.url));
}

export const config = {
  matcher: ["/notes/:path*"],
};
