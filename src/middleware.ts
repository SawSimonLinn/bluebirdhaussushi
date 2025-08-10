import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PATH = "/admin";

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith(ADMIN_PATH)) return;

  // allow login page itself
  if (req.nextUrl.pathname.startsWith("/admin/login")) return;

  const cookie = req.cookies.get("admin");
  if (cookie?.value === process.env.ADMIN_PASSWORD) return;

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
