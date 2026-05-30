import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Background = "base" | "white" | "muted" | "navy" | "yellow";

const backgrounds: Record<Background, string> = {
  base: "bg-slate-50",
  white: "bg-white",
  muted: "bg-slate-100",
  navy: "bg-navy-800 text-slate-300",
  yellow: "bg-yellow-500 text-navy-900",
};

export function Section({
  background = "base",
  className,
  containerClassName,
  id,
  children,
}: {
  background?: Background;
  className?: string;
  containerClassName?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24", backgrounds[background], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** Centered eyebrow + title + optional subtitle block used atop sections. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  const isLight = tone === "light";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-widest",
            isLight ? "text-yellow-400" : "text-yellow-700"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-3 text-3xl font-bold leading-snug tracking-tight md:text-4xl",
          isLight ? "text-white" : "text-navy-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed md:text-lg",
            isLight ? "text-slate-300" : "text-slate-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
