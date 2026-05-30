import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
  type Locale,
} from "@/lib/i18n";
import { business } from "@/lib/business";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["600", "700", "800"],
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = business.siteUrl;

/** hreflang map — used in alternates across all pages. */
const hreflang: Record<Locale, string> = { pt: "pt-PT", en: "en-GB" };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LayoutParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.defaultTitle,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.defaultDescription,
    applicationName: dict.meta.siteName,
    keywords: [
      "Material elétrico Viana do Castelo",
      "Instalações elétricas Minho",
      "Eletroborlido Santa Marta de Portuzelo",
      "Domótica Viana do Castelo",
      "Automação de portões Viana do Castelo",
      "Reparação de eletrodomésticos Viana do Castelo",
      "Carregador carro elétrico Viana do Castelo",
      "Instalação wallbox Viana do Castelo",
      "Carregamento veículos elétricos Minho",
      "Wallbox Tipo 2 Viana do Castelo",
      "EV charging station Viana do Castelo",
    ],
    authors: [{ name: business.legalName }],
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [hreflang[l], `/${l}`])
      ),
    },
    openGraph: {
      type: "website",
      siteName: dict.meta.siteName,
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
      locale: dict.meta.ogLocale,
      url: `${SITE_URL}/${locale}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: business.legalName,
    alternateName: business.brandName,
    url: `${SITE_URL}/${locale}`,
    telephone: business.phone.landline.display,
    email: business.email.display,
    foundingDate: String(business.foundedYear),
    vatID: `PT${business.nif}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.showroom.street,
      postalCode: business.showroom.postalCode,
      addressLocality: business.showroom.locality,
      addressRegion: "Viana do Castelo",
      addressCountry: "PT",
    },
    areaServed: ["Viana do Castelo", "Minho", "Santa Marta de Portuzelo"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "12:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "14:30",
        closes: "19:00",
      },
    ],
    description: dict.meta.defaultDescription,
    inLanguage: hreflang[locale],
    knowsAbout: [
      "Electrical installations",
      "Security systems",
      "Gate automation",
      "EV charging station installation",
      "Wallbox installation",
      "Home automation",
      "Household appliance repair",
    ],
  };

  return (
    <html
      lang={dict.meta.locale}
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900">
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-md bg-navy-700 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
        >
          {dict.nav.skipToContent}
        </a>
        <Header dict={dict} locale={locale} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer dict={dict} locale={locale} />
        <WhatsAppFab t={dict.whatsapp} />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
