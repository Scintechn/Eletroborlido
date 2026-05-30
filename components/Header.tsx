"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Dictionary, Locale } from "@/lib/i18n";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.nav;
  const home = `/${locale}`;
  const links = [
    { href: home, label: t.home },
    { href: `/${locale}/services`, label: t.services },
    { href: `/${locale}/contact`, label: t.contact },
  ];

  const pathname = usePathname() ?? home;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + allow Escape to close the mobile drawer.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;
  const isActive = (href: string) =>
    href === home ? pathname === home : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-slate-200 bg-white/95 shadow-header backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container>
        <div className="flex h-[60px] items-center justify-between md:h-[72px]">
          <Logo tone={solid ? "dark" : "light"} href={home} />

          <nav
            aria-label={t.primaryLabel}
            className="hidden items-center gap-1 md:flex"
          >
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                    "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-yellow-500 after:transition-transform hover:after:scale-x-100",
                    solid
                      ? active
                        ? "text-navy-700 after:scale-x-100"
                        : "text-slate-700 hover:text-navy-700"
                      : active
                        ? "text-white after:scale-x-100"
                        : "text-slate-200 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden md:block">
              <LocaleSwitcher
                locale={locale}
                tone={solid ? "dark" : "light"}
                ariaLabel={t.languageSwitcherLabel}
              />
            </div>
            <Button
              href={`/${locale}/contact`}
              size="md"
              className="hidden sm:inline-flex"
            >
              {t.requestQuote}
            </Button>

            <button
              type="button"
              aria-label={open ? t.closeMenu : t.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl transition-colors md:hidden",
                solid ? "text-navy-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
              )}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-slate-200 bg-white md:hidden"
      >
        <Container className="py-4">
          <nav aria-label={t.mobileLabel} className="flex flex-col">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-[56px] items-center border-b border-slate-100 px-1 text-lg font-semibold",
                    active ? "text-navy-700" : "text-slate-700"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-4 flex items-center justify-between gap-3">
              <LocaleSwitcher
                locale={locale}
                tone="dark"
                ariaLabel={t.languageSwitcherLabel}
              />
              <Button
                href={`/${locale}/contact`}
                size="md"
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                {t.requestQuote}
              </Button>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
