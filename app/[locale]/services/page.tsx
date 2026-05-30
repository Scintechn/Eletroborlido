import type { Metadata } from "next";
import { CheckCircle2, Store, HardHat } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { EvChargingSpotlight } from "@/components/EvChargingSpotlight";
import { getIcon } from "@/components/icons";
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
  const dict = getDictionary(locale);
  return {
    title: dict.meta.servicesTitle,
    description: dict.services.hero.subtitle,
    alternates: {
      canonical: `/${locale}/services`,
      languages: Object.fromEntries(
        locales.map((l) => [hreflang[l], `/${l}/services`])
      ),
    },
  };
}

const scopeIcons = { store: Store, "hard-hat": HardHat } as const;

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = getDictionary(locale).services;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-800 to-navy-900 pt-28 pb-16 md:pt-40 md:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <Container className="relative">
          <SectionHeading
            eyebrow={t.hero.eyebrow}
            title={t.hero.title}
            subtitle={t.hero.subtitle}
            tone="light"
          />
        </Container>
      </section>

      <EvChargingSpotlight t={t.spotlight} />

      <Section background="base">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {t.items
            .filter((service) => service.id !== "ev-charging")
            .map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <Reveal key={service.id} delay={i * 80}>
                <article
                  id={service.id}
                  className="flex h-full scroll-mt-24 flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-card"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-navy-100">
                      <Icon className="h-7 w-7 text-navy-700" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <h2 className="text-xl font-bold text-navy-900 md:text-2xl">
                      {service.title}
                    </h2>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                  <ul className="mt-5 grid gap-3 border-t border-slate-100 pt-5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section background="white">
        <Reveal>
          <SectionHeading
            eyebrow={t.scope.eyebrow}
            title={t.scope.title}
            subtitle={t.scope.subtitle}
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {t.scope.areas.map((area, i) => {
            const Icon = scopeIcons[area.icon as keyof typeof scopeIcons] ?? Store;
            return (
              <Reveal key={area.title} delay={i * 100}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-700">
                    <Icon className="h-6 w-6 text-yellow-400" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-navy-900">{area.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {area.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {area.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy-700"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CtaBand
        locale={locale}
        title={t.cta.title}
        subtitle={t.cta.subtitle}
        button={t.cta.button}
      />
    </>
  );
}
