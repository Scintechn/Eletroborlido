import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Thermometer,
  Lock,
  DoorOpen,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBand } from "@/components/CtaBand";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";
import { business } from "@/lib/business";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.home;
  const services = dict.services.items;
  const newBadge = dict.services.spotlight.badge;

  return (
    <>
      <Hero t={t} locale={locale} />
      <StatsStrip t={t} />

      {/* Services grid */}
      <Section background="base" id="services-preview">
        <Reveal>
          <SectionHeading
            eyebrow={t.servicesSection.eyebrow}
            title={t.servicesSection.title}
            subtitle={t.servicesSection.subtitle}
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <ServiceCard
                icon={s.icon}
                title={s.title}
                short={s.short}
                href={`/${locale}/services#${s.id}`}
                cardCta={t.servicesSection.cardCta}
                badge={s.id === "ev-charging" ? newBadge : undefined}
              />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href={`/${locale}/services`} variant="outline" size="md">
            {t.servicesSection.viewAll}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Section>

      <AboutSnippet t={t} locale={locale} />

      <CtaBand
        locale={locale}
        title={t.ctaBand.title}
        subtitle={t.ctaBand.subtitle}
        button={t.ctaBand.button}
        phonePrefix={t.ctaBand.phonePrefix}
      />
    </>
  );
}

type HomeDict = Dictionary["home"];

function Hero({ t, locale }: { t: HomeDict; locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-800 to-navy-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl"
      />

      <Container className="relative pt-28 pb-20 md:pt-40 md:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="border-l-2 border-yellow-500 pl-3 text-xs font-semibold uppercase tracking-widest text-yellow-400">
              {t.hero.eyebrow}
            </p>
            <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-6xl">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              {t.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                href={`/${locale}/contact`}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {t.hero.primaryCta}
              </Button>
              <Button
                href={`/${locale}/services`}
                variant="outlineLight"
                size="lg"
                className="w-full sm:w-auto"
              >
                {t.hero.secondaryCta}
              </Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-slate-400">
              <ShieldCheck className="h-4 w-4 text-yellow-400" aria-hidden="true" />
              {t.hero.trustNote}
            </p>
          </div>

          <Reveal delay={120} className="relative hidden lg:block">
            <SmartPanelVisual t={t} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function SmartPanelVisual({ t }: { t: HomeDict }) {
  const panel = t.hero.panel;
  const rows = [
    { icon: Lightbulb, label: panel.rows.lighting, on: true },
    { icon: Thermometer, label: panel.rows.climate, on: true },
    { icon: Lock, label: panel.rows.security, on: true },
    { icon: DoorOpen, label: panel.rows.gate, on: false },
  ];
  return (
    <div className="relative ml-auto max-w-md">
      <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-2xl ring-2 ring-yellow-500/20">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <p className="font-display text-sm font-bold text-navy-900">{panel.title}</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {panel.status}
          </span>
        </div>
        <ul className="mt-4 space-y-3">
          {rows.map((row) => (
            <li
              key={row.label}
              className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-100">
                  <row.icon className="h-5 w-5 text-navy-700" strokeWidth={1.5} />
                </span>
                <span className="text-sm font-semibold text-slate-700">{row.label}</span>
              </span>
              <span
                className={
                  "flex h-6 w-11 items-center rounded-full px-0.5 transition-colors " +
                  (row.on ? "justify-end bg-yellow-500" : "justify-start bg-slate-300")
                }
                aria-hidden="true"
              >
                <span className="h-5 w-5 rounded-full bg-white shadow" />
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-xl bg-white p-4 shadow-card">
        <CheckCircle2 className="h-7 w-7 text-emerald-500" aria-hidden="true" />
        <span className="text-sm font-semibold text-navy-900">{t.hero.badge}</span>
      </div>
    </div>
  );
}

function StatsStrip({ t }: { t: HomeDict }) {
  const years = new Date().getFullYear() - business.foundedYear;
  return (
    <section className="bg-navy-800 py-12">
      <Container>
        <ul className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {t.stats.items.map((stat) => {
            const value =
              "dynamic" in stat && stat.dynamic === "yearsExperience"
                ? `${years}+`
                : stat.value;
            return (
              <li key={stat.label} className="text-center">
                <p className="font-display text-3xl font-extrabold text-yellow-400 sm:text-4xl md:text-5xl">
                  {value}
                </p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wide text-slate-300">
                  {stat.label}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

function AboutSnippet({ t, locale }: { t: HomeDict; locale: Locale }) {
  return (
    <Section background="white">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-yellow-700">
            {t.about.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
            {t.about.title}
          </h2>
          {t.about.paragraphs.map((p, i) => (
            <p key={i} className="mt-4 text-base leading-relaxed text-slate-600">
              {p}
            </p>
          ))}
          <div className="mt-8">
            <Button href={`/${locale}/contact`} variant="navy" size="md">
              {t.about.cta}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ul className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            {t.about.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500"
                  aria-hidden="true"
                />
                <span className="text-base font-medium text-slate-700">{feature}</span>
              </li>
            ))}
            <li className="mt-2 flex items-center gap-3 border-t border-slate-200 pt-5">
              <span className="font-display text-3xl font-extrabold text-navy-900">
                {business.foundedYear}
              </span>
              <span className="text-sm text-slate-500">
                {t.about.foundedIn}
                <br />
                {business.showroom.locality}
              </span>
            </li>
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
