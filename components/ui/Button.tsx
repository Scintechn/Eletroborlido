import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "navy" | "outline" | "outlineLight";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  // Yellow accent CTA — dark navy text (WCAG AA safe), never white-on-yellow.
  primary:
    "bg-yellow-500 text-navy-900 shadow-cta hover:bg-yellow-600 hover:scale-[1.02] focus-visible:ring-yellow-500",
  navy: "bg-navy-700 text-white shadow-navy hover:bg-navy-800 focus-visible:ring-navy-500",
  outline:
    "border-2 border-slate-300 text-navy-700 hover:bg-navy-50 hover:border-navy-600/40 focus-visible:ring-navy-500",
  // For use on dark/navy backgrounds.
  outlineLight:
    "border-2 border-white/40 text-white hover:bg-white/10 focus-visible:ring-yellow-400 focus-visible:ring-offset-navy-800",
};

const sizes: Record<Size, string> = {
  md: "min-h-[44px] px-5 py-2.5 text-sm",
  lg: "min-h-[52px] px-8 py-4 text-base",
};

type ButtonProps = {
  href: string;
  external?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
  "aria-label"?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children: React.ReactNode;
};

/** A link styled as a button. (Form submit buttons use a native `<button>`.) */
export function Button({
  href,
  external = false,
  variant = "primary",
  size = "lg",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
