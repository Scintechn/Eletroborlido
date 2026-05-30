import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

const PUBLIC_FILE = /\.[\w-]+$/; // anything with an extension (e.g. .png, .ico)

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next internals, API routes, and any path that looks like a file.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // If the path already starts with a known locale segment, let it through.
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  // Otherwise redirect to the default locale, preserving the rest of the path.
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Match everything except _next assets, api, and explicit file paths.
  matcher: ["/((?!_next/|api/|.*\\.[\\w-]+$).*)"],
};
