import Link from "next/link";
import { BookOpen, ExternalLink, Phone, Mail, MapPin } from "lucide-react";
import { business, showroomLine } from "@/lib/business";
import type { Dictionary, Locale } from "@/lib/i18n";
import { Container } from "./ui/Container";
import { Logo } from "./Logo";

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.footer;
  const nav = dict.nav;
  const year = new Date().getFullYear();
  const home = `/${locale}`;

  return (
    <footer aria-label="Footer" className="bg-navy-900 text-slate-400">
      <Container className="pt-16 pb-8">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + legal data */}
          <div>
            <Logo tone="light" href={home} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              {t.tagline}
            </p>
            <dl className="mt-5 space-y-1.5 text-xs leading-relaxed text-slate-500">
              <div>
                <dt className="sr-only">{t.legalNameLabel}</dt>
                <dd className="font-semibold text-slate-300">{business.legalName}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt>{t.nifLabel}:</dt>
                <dd>{business.nif}</dd>
              </div>
            </dl>
          </div>

          {/* Quick links */}
          <nav aria-label={t.quickLinksHeading}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              {t.quickLinksHeading}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <FooterLink href={home}>{nav.home}</FooterLink>
              </li>
              <li>
                <FooterLink href={`/${locale}/services`}>{nav.services}</FooterLink>
              </li>
              <li>
                <FooterLink href={`/${locale}/contact`}>{nav.contact}</FooterLink>
              </li>
            </ul>
          </nav>

          {/* Legal links */}
          <nav aria-label={t.legalLinksHeading}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              {t.legalLinksHeading}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <FooterLink href={`/${locale}/privacy-policy`}>{t.privacy}</FooterLink>
              </li>
              <li>
                <FooterLink href={`/${locale}/terms`}>{t.terms}</FooterLink>
              </li>
              <li>
                <a
                  href={business.disputeResolutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.disputeResolutionAria}
                  className="inline-flex min-h-[44px] items-center gap-1 text-slate-400 transition-colors hover:text-white"
                >
                  {t.disputeResolution}
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact + Livro de Reclamações */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              {t.contactHeading}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400" aria-hidden="true" />
                <a href={business.phone.landline.href} className="transition-colors hover:text-white">
                  {business.phone.landline.display}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400" aria-hidden="true" />
                <a href={business.phone.mobile.href} className="transition-colors hover:text-white">
                  {business.phone.mobile.display}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400" aria-hidden="true" />
                <a href={business.email.href} className="break-all transition-colors hover:text-white">
                  {business.email.display}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400" aria-hidden="true" />
                <span className="min-w-0 break-words">{showroomLine}</span>
              </li>
            </ul>

            {/* Mandatory PT electronic complaints book */}
            <a
              href={business.livroReclamacoesUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.livroReclamacoesAria}
              className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              {t.livroReclamacoes}
            </a>
            <p className="mt-3 text-xs text-slate-500">{t.hoursSummary}</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-slate-500 md:flex-row">
          <p>
            © {year} {business.legalName}. {t.rights}
          </p>
          <p className="flex items-center gap-2">
            <Link
              href={`/${locale}/privacy-policy`}
              className="transition-colors hover:text-white"
            >
              {t.privacy}
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href={`/${locale}/terms`}
              className="transition-colors hover:text-white"
            >
              {t.terms}
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[44px] items-center text-slate-400 transition-colors hover:text-white"
    >
      {children}
    </Link>
  );
}
