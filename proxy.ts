import { NextResponse, type NextRequest } from "next/server";

// Inlined on purpose: bundling the full i18n dictionaries (en.ts + pt.ts)
// from this file pulls a lot of code into the proxy bundle. Keep this list
// in sync with `locales` / `defaultLocale` in lib/i18n/index.ts.
const LOCALES = ["pt", "en"] as const;
const DEFAULT_LOCALE = "pt";

const PUBLIC_FILE = /\.[\w-]+$/; // anything with an extension (e.g. .png, .ico)

// TEMPORARY: verbose logging to diagnose the production 404. Remove the
// `[proxy]` console.log calls once routing is confirmed healthy.
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host = request.headers.get("host");
  console.log(`[proxy] hit pathname=${pathname} search=${search} host=${host}`);

  // Skip Next internals, API routes, and any path that looks like a file.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  ) {
    console.log(`[proxy] skip (internal/file) pathname=${pathname}`);
    return NextResponse.next();
  }

  // If the path already starts with a known locale segment, let it through.
  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) {
    console.log(`[proxy] pass-through (has locale) pathname=${pathname}`);
    return NextResponse.next();
  }

  // Otherwise redirect to the default locale, preserving the rest of the path.
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  console.log(
    `[proxy] redirect pathname=${pathname} -> ${url.pathname}${url.search}`
  );
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/|api/|.*\\.[\\w-]+$).*)"],
};
