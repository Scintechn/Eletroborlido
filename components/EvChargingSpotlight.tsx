import { CheckCircle2, MessageCircle, PlugZap, Wifi } from "lucide-react";
import { Container } from "./ui/Container";
import { business, whatsappLink } from "@/lib/business";
import type { Dictionary } from "@/lib/i18n";

type Spotlight = Dictionary["services"]["spotlight"];

/** "Special area" — the EV charging service feature with its own WhatsApp CTA. */
export function EvChargingSpotlight({ t }: { t: Spotlight }) {
  return (
    <section
      id="ev-charging"
      aria-labelledby="ev-charging-title"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-16 md:py-24"
    >
      {/* faint circuit grid texture (same as hero) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text + CTA */}
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-yellow-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-900">
                {t.badge}
              </span>
              <span className="border-l-2 border-yellow-500 pl-3 text-xs font-semibold uppercase tracking-widest text-yellow-400">
                {t.eyebrow}
              </span>
            </div>

            <h2
              id="ev-charging-title"
              className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              {t.title}
            </h2>

            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-300">
              {t.subtitle}
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">
              {t.description}
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-snug text-slate-200">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                {t.connectorsLabel}
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {t.connectors.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <a
                href={whatsappLink(t.whatsappPrefill)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.whatsappCta} (${business.whatsapp.display})`}
                className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-[0_8px_24px_rgba(37,211,102,.35)] transition-all duration-150 hover:scale-[1.02] hover:bg-[#1ebe57] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {t.whatsappCta}
              </a>
              <p className="mt-3 text-xs text-slate-400">{t.footnote}</p>
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            <WallboxVisual t={t} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function WallboxVisual({ t }: { t: Spotlight }) {
  const p = t.panel;
  return (
    <div className="relative ml-auto max-w-md">
      <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-2xl ring-2 ring-yellow-500/25">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <span className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-700">
              <PlugZap className="h-4 w-4 text-yellow-400" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="font-display text-sm font-bold text-navy-900">EV Wallbox</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            {p.status}
          </span>
        </div>

        <div className="mt-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {p.progressLabel}
              </p>
              <p className="font-display text-4xl font-extrabold leading-none text-navy-900">
                67<span className="text-2xl text-slate-400">%</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {p.powerLabel}
              </p>
              <p className="font-display text-2xl font-bold text-navy-700">
                7.4 <span className="text-sm font-semibold text-slate-500">kW</span>
              </p>
            </div>
          </div>

          {/* progress bar */}
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500"
              style={{ width: "67%" }}
            />
          </div>

          <p className="mt-3 text-xs text-slate-500">{p.chargingLabel} · Type 2 · 32A</p>
        </div>

        {/* signal row */}
        <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
          <span className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Wifi className="h-4 w-4 text-navy-600" aria-hidden="true" />
            Smart control
          </span>
          <span className="text-xs font-semibold text-emerald-600">IP65 · Outdoor</span>
        </div>
      </div>

      {/* Floating "Any EV" badge */}
      <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-xl bg-yellow-500 px-4 py-3 text-navy-900 shadow-card">
        <PlugZap className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
        <span className="text-sm font-bold">Any EV · Any wallbox</span>
      </div>
    </div>
  );
}
