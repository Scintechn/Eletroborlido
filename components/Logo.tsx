import Link from "next/link";
import { Zap } from "lucide-react";
import { cn } from "@/lib/cn";
import { business } from "@/lib/business";

/** Brand lockup: yellow bolt logomark + wordmark. `tone` adapts to background. */
export function Logo({
  tone = "dark",
  href = "/",
  className,
}: {
  tone?: "dark" | "light";
  href?: string;
  className?: string;
}) {
  const wordmark = tone === "light" ? "text-white" : "text-navy-900";
  const subtone = tone === "light" ? "text-slate-400" : "text-slate-500";

  return (
    <Link
      href={href}
      aria-label={`${business.brandName} — home`}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-navy-700 shadow-navy transition-transform duration-150 group-hover:scale-105"
      >
        <Zap className="h-5 w-5 fill-yellow-400 text-yellow-400" strokeWidth={1.5} />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-lg font-extrabold tracking-tight", wordmark)}>
          {business.brandName}
        </span>
        <span className={cn("text-[10px] font-medium uppercase tracking-widest", subtone)}>
          Eletricidade · Segurança · EV
        </span>
      </span>
    </Link>
  );
}
