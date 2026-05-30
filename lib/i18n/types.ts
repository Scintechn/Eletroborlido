import type { en } from "./en";

/** Dictionary shape — derived from the English base. Every other locale must
 * satisfy this type exactly (TypeScript enforces key parity). */
export type Dictionary = typeof en;
