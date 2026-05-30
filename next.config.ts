import type { NextConfig } from "next";

const securityHeaders = [
  // Block the site from being embedded as an iframe (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // NOTE: Add a Content-Security-Policy header once analytics/captcha vendors
  // are finalised. A starting policy that allows the Google Maps embed:
  //   default-src 'self';
  //   img-src 'self' data: https://*.gstatic.com https://*.googleapis.com;
  //   frame-src https://www.google.com;
  //   style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  //   font-src 'self' https://fonts.gstatic.com;
  //   script-src 'self' 'unsafe-inline';
];

const nextConfig: NextConfig = {
  // NOTE: do NOT use Node globals like `__dirname` here. Vercel evaluates
  // parts of this config inside the Edge runtime for middleware, where
  // those globals are undefined and will crash the function at request time.
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
