import { ImageResponse } from "next/og";
import { business } from "@/lib/business";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
  type Locale,
} from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = getDictionary().meta.defaultTitle;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0f2044 0%, #0a1628 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background: "#152d5e",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#fbbf24">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <div style={{ display: "flex", color: "#ffffff", fontSize: "40px", fontWeight: 800 }}>
            {business.brandName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#fbbf24",
              fontSize: "24px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            {dict.home.hero.eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: "60px",
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            {dict.home.hero.title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#d1d5db",
            fontSize: "26px",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "6px",
              width: "60px",
              background: "#f59e0b",
              borderRadius: "999px",
            }}
          />
          {business.phone.landline.display} · {business.email.display}
        </div>
      </div>
    ),
    size
  );
}
