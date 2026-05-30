"use client";

import { track } from "@vercel/analytics";
import type { AnchorHTMLAttributes, ReactNode } from "react";

// Identifies where the click came from so we can compare touchpoints in Analytics.
// Keep this list in sync with the components that render a WhatsApp link.
type WhatsAppLocation = "fab" | "ev_spotlight";

type Props = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "onClick" | "target" | "rel"
> & {
  href: string;
  location: WhatsAppLocation;
  children: ReactNode;
};

export function WhatsAppLink({ href, location, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { location })}
    >
      {children}
    </a>
  );
}
