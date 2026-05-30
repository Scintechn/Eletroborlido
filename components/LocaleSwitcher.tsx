"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const labels: Record<Locale, string> = { pt: "PT", en: "EN" };
const fullNames: Record<Locale, string> = { pt: "Português", en: "English" };

function swapLocale(pathname: string, current: Locale, target: Locale): string {
  if (pathname === `/${current}`) return `/${target}`;
  if (pathname.startsWith(`/${current}/`)) {
    return `/${target}${pathname.slice(current.length + 1)}`;
  }
  return `/${target}`;
}

export function LocaleSwitcher({
  locale,
  tone = "dark",
  ariaLabel,
}: {
  locale: Locale;
  tone?: "dark" | "light";
  ariaLabel: string;
}) {
  const pathname = usePathname() ?? "/";

  const wrap =
    tone === "light"
      ? "border-white/20 bg-white/5"
      : "border-slate-200 bg-slate-50";

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border p-0.5 text-xs font-semibold",
        wrap
      )}
    >
      {locales.map((l) => {
        const active = l === locale;
        const href = active ? `/${l}` : swapLocale(pathname, locale, l);
        const activeClass =
          tone === "light"
            ? "bg-yellow-500 text-navy-900"
            : "bg-navy-700 text-white";
        const idleClass =
          tone === "light"
            ? "text-slate-200 hover:text-white"
            : "text-slate-600 hover:text-navy-900";
        return (
          <Link
            key={l}
            href={href}
            aria-current={active ? "true" : undefined}
            aria-label={fullNames[l]}
            prefetch={false}
            className={cn(
              "min-h-[28px] min-w-[34px] rounded-full px-2 py-1 text-center tracking-wide transition-colors",
              active ? activeClass : idleClass
            )}
          >
            {labels[l]}
          </Link>
        );
      })}
    </div>
  );
}
