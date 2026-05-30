import type { Metadata } from "next";
import {
  Phone,
  Smartphone,
  Mail,
  MapPin,
  Clock,
  Building2,
  Navigation,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactForm } from "@/components/ContactForm";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";
import { business, registeredOfficeLine } from "@/lib/business";

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
    title: dict.meta.contactTitle,
    description: dict.contact.hero.subtitle,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: Object.fromEntries(
        locales.map((l) => [hreflang[l], `/${l}/contact`])
      ),
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = getDictionary(locale).contact;

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

      <Section background="base">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm t={t.form} locale={locale} />
          </div>

          <aside className="space-y-4">
            <h2 className="sr-only">{t.info.heading}</h2>

            <InfoCard icon={Phone} label={t.info.landlineLabel}>
              <a
                href={business.phone.landline.href}
                className="font-semibold text-slate-900 transition-colors hover:text-navy-700"
              >
                {business.phone.landline.display}
              </a>
            </InfoCard>

            <InfoCard icon={Smartphone} label={t.info.mobileLabel}>
              <a
                href={business.phone.mobile.href}
                className="font-semibold text-slate-900 transition-colors hover:text-navy-700"
              >
                {business.phone.mobile.display}
              </a>
            </InfoCard>

            <InfoCard icon={Mail} label={t.info.emailLabel}>
              <a
                href={business.email.href}
                className="font-semibold break-all text-slate-900 transition-colors hover:text-navy-700"
              >
                {business.email.display}
              </a>
            </InfoCard>

            <InfoCard icon={MapPin} label={t.info.showroomLabel}>
              <span className="font-semibold text-slate-900">{business.showroom.street}</span>
              <span className="block text-sm text-slate-500">
                {business.showroom.postalCode} {business.showroom.locality}
              </span>
              <a
                href={business.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-navy-600 hover:text-navy-700"
              >
                <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                {t.info.directions}
              </a>
            </InfoCard>

            <InfoCard icon={Building2} label={t.info.officeLabel}>
              <span className="text-sm text-slate-600">{registeredOfficeLine}</span>
            </InfoCard>

            <HoursCard t={t} />
          </aside>
        </div>
      </Section>

      <Section background="white" className="!pt-0">
        <SectionHeading eyebrow={t.map.caption} title={t.map.heading} align="left" />
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 shadow-card ring-1 ring-navy-600/5">
          <iframe
            src={business.mapEmbedSrc}
            title={t.map.title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[4/3] w-full sm:aspect-video md:aspect-[16/7]"
          />
        </div>
      </Section>
    </>
  );
}

function InfoCard({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-navy-100">
        <Icon className="h-5 w-5 text-navy-700" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
        <div className="mt-0.5">{children}</div>
      </div>
    </div>
  );
}

function HoursCard({ t }: { t: Dictionary["contact"] }) {
  const h = business.hours;
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h3 className="flex items-center gap-2 font-bold text-navy-800">
        <Clock className="h-5 w-5 text-navy-700" strokeWidth={1.5} aria-hidden="true" />
        {t.hours.heading}
      </h3>
      <dl className="mt-4 divide-y divide-slate-200 text-sm">
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="font-medium text-slate-700">{t.hours.weekdays}</dt>
          <dd className="text-right font-semibold text-navy-700">
            {h.weekdays.morning}
            <span className="block text-slate-500">{h.weekdays.afternoon}</span>
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="font-medium text-slate-700">{t.hours.saturday}</dt>
          <dd className="font-semibold text-slate-400">{t.hours.closed}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="font-medium text-slate-700">{t.hours.sunday}</dt>
          <dd className="font-semibold text-slate-400">{t.hours.closed}</dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-slate-500">{t.hours.note}</p>
    </div>
  );
}
