/**
 * Single source of truth for Eletroborlido's legal & operational data.
 * These are facts (not translatable copy) and are reused across pages,
 * structured data (JSON-LD), and the legal footer.
 */

export const business = {
  legalName: "Eletroborlido, Unipessoal Lda.",
  brandName: "Eletroborlido",
  /** Canonical production URL — update once the final domain is confirmed. */
  siteUrl: "https://www.eletroborlido.pt",
  /** Portuguese tax/registration number (NIF / NIPC). */
  nif: "514870567",
  foundedYear: 2018,

  /** Legal registered office (sede social). */
  registeredOffice: {
    street: "Rua das Caniças, Nº 6",
    postalCode: "4925-034",
    locality: "Viana do Castelo",
    country: "Portugal",
  },

  /** Commercial showroom & shop — the public-facing location (mapped). */
  showroom: {
    street: "Rua de Santa Marta, 121",
    postalCode: "4925-104",
    locality: "Santa Marta de Portuzelo",
    municipality: "Viana do Castelo",
    country: "Portugal",
  },

  phone: {
    landline: { display: "+351 258 112 365", href: "tel:+351258112365" },
    mobile: { display: "+351 967 510 338", href: "tel:+351967510338" },
  },

  /** WhatsApp number (digits only, international format) used by the floating button. */
  whatsapp: { display: "+351 967 510 338", number: "351967510338" },

  email: { display: "geral@eletroborlido.pt", href: "mailto:geral@eletroborlido.pt" },

  /** Operating hours, structured for rendering + schema.org openingHours. */
  hours: {
    weekdays: { morning: "09:00 – 12:30", afternoon: "14:30 – 19:00" },
    weekendClosed: true,
  },

  /**
   * Google Maps embed pointing at the Santa Marta showroom.
   * Prefers the official, SLA-backed Maps Embed API when a key is configured
   * (set NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY); otherwise falls back to the
   * keyless URL, which works but is unofficial and may change without notice.
   */
  mapEmbedSrc: (() => {
    const query =
      "Rua de Santa Marta 121, 4925-104 Santa Marta de Portuzelo, Viana do Castelo, Portugal";
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;
    return key
      ? `https://www.google.com/maps/embed/v1/place?key=${key}&q=${encodeURIComponent(query)}`
      : `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  })(),
  mapDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(
      "Rua de Santa Marta 121, 4925-104 Santa Marta de Portuzelo, Viana do Castelo, Portugal"
    ),

  /** Portuguese mandatory electronic complaints book. */
  livroReclamacoesUrl: "https://www.livroreclamacoes.pt/inicio",

  /** EU online dispute resolution platform (consumer law requirement). */
  disputeResolutionUrl: "https://ec.europa.eu/consumers/odr",
} as const;

export type Business = typeof business;

/** Full registered-office address on one line. */
export const registeredOfficeLine = `${business.registeredOffice.street}, ${business.registeredOffice.postalCode} ${business.registeredOffice.locality}, ${business.registeredOffice.country}`;

/** Full showroom address on one line. */
export const showroomLine = `${business.showroom.street}, ${business.showroom.postalCode} ${business.showroom.locality} (${business.showroom.municipality})`;

/** Builds a wa.me URL with an optional pre-filled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${business.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
