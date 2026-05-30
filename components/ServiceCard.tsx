import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { renderIcon } from "./icons";

export function ServiceCard({
  icon,
  title,
  short,
  href,
  cardCta,
  badge,
}: {
  icon: string;
  title: string;
  short: string;
  href: string;
  cardCta: string;
  /** Optional flag-style label rendered as a yellow pill (e.g. "NEW"). */
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-navy-600/30 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-100">
          {renderIcon(icon, {
            className: "h-6 w-6 text-navy-700",
            strokeWidth: 1.5,
            "aria-hidden": true,
          })}
        </span>
        {badge && (
          <span className="rounded-full bg-yellow-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-900">
            {badge}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-xl font-bold text-navy-900">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{short}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-600">
        {cardCta}
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
