import type { Metadata } from "next";
import { LegalArticle } from "@/components/LegalArticle";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
  type Locale,
} from "@/lib/i18n";

const hreflang: Record<Locale, string> = { pt: "pt-PT", en: "en-GB" };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const doc = getDictionary(locale).legal.terms;
  return {
    title: doc.title,
    description: doc.intro,
    alternates: {
      canonical: `/${locale}/terms`,
      languages: Object.fromEntries(
        locales.map((l) => [hreflang[l], `/${l}/terms`])
      ),
    },
    robots: { index: false, follow: true },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const doc = getDictionary(locale).legal.terms;
  return <LegalArticle doc={doc} />;
}
