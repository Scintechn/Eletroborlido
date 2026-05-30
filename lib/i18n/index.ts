import { en } from "./en";
import { pt } from "./pt";
import type { Dictionary } from "./types";

export type { Dictionary } from "./types";

/** Supported locales. Order matters for the language switcher. */
export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];

/** Portuguese is the default — Eletroborlido is a Portuguese local business. */
export const defaultLocale: Locale = "pt";

export const dictionaries: Record<Locale, Dictionary> = { pt, en };

/** Returns the dictionary for a locale, falling back to the default. */
export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/** Type guard for narrowing arbitrary strings (e.g. route params) to `Locale`. */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
