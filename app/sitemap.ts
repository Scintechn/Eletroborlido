import type { MetadataRoute } from "next";
import { business } from "@/lib/business";
import { locales, type Locale } from "@/lib/i18n";

const hreflang: Record<Locale, string> = { pt: "pt-PT", en: "en-GB" };

const PAGES = [
  { path: "", changeFrequency: "monthly" as const, priority: 1 },
  { path: "/services", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly" as const, priority: 0.6 },
  // Legal pages are intentionally excluded (noindex).
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.flatMap((page) =>
    locales.map((locale) => ({
      url: `${business.siteUrl}/${locale}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [hreflang[l], `${business.siteUrl}/${l}${page.path}`])
        ),
      },
    }))
  );
}
