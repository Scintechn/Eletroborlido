# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev            # Dev server (Turbopack). Default port 3000; pass `-- -p <port>` to override.
npm run build          # Production build.
npm run start          # Serve the production build locally.
npm run lint           # ESLint via eslint-config-next.
npx tsc --noEmit       # Type-check without emitting.
```

No test framework is configured.

### Deploy

Hosted on Vercel. Pushes to `main` auto-deploy to production. Manual triggers via `vercel --prod` from the project root. Env vars set with `vercel env add <NAME> production` (or via the dashboard — see Gotchas below). Pull production env to local dev: `vercel env pull .env.local`.

## Architecture

### The two single sources of truth

Everything else in the codebase is a view onto one of these two files. Change a fact about the business or a piece of user-facing copy *here first*; pages and components consume it via import.

- **`lib/business.ts`** — business facts (legal name, tax ID, addresses, phone numbers, hours, WhatsApp number, email, map URLs, mandatory legal links). Also exports helpers like `whatsappLink(message?)`.
- **`lib/i18n/`** — translatable copy.
  - `index.ts` exports `locales` (currently `["pt", "en"]`), `defaultLocale` (`"pt"`), `getDictionary(locale)`, `isLocale()` type guard.
  - `types.ts` derives the `Dictionary` shape from `en.ts`, so any other locale that doesn't match is a type error.
  - Add a new locale = add `lib/i18n/xx.ts` mirroring the EN shape + append to the `locales` tuple.

### Routing & internationalization

Every public URL is **locale-prefixed**: `/pt/contact`, `/en/services`. There are no naked routes.

- All pages live under `app/[locale]/`.
- `proxy.ts` at the project root redirects any non-prefixed request (e.g. `/`, `/contact`) to `/{defaultLocale}{path}`. Internal paths (`/_next`, `/api`, files with extensions, `robots.txt`, `sitemap.xml`) pass through.
- `proxy.ts` inlines its own locale list rather than importing from `lib/i18n` — importing would pull the full dictionaries into the proxy bundle.
- Pages export `generateStaticParams` returning every locale, plus `generateMetadata` with `alternates.canonical` and `alternates.languages` (hreflang).
- Page `params` is `Promise<...>` in Next 16 — always `await` it before reading.

### Server vs. client components

Server by default. Add `"use client"` only when the file uses React state, refs, event handlers, browser APIs, or fires analytics (`track()` requires client).

Pattern when a mostly-static section needs one interactive bit: extract that bit into a **tiny client wrapper** so the parent stays server. Example: `components/EvChargingSpotlight.tsx` is a fat server component, but its WhatsApp CTA uses `components/WhatsAppLink.tsx` (a ~15-line client component that calls `track("whatsapp_click", { location })` on click). Only the link ships JS.

### Forms & lead delivery

`components/ContactForm.tsx` is a client component holding form state + UX validation. On submit it calls a **Server Action** in `app/[locale]/contact/actions.ts` which:

1. Re-validates everything server-side (length bounds, email shape, subject allowlist). Never trusts the client.
2. Reads `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` from env *at call time* (not module load) so missing vars log clearly instead of crashing.
3. HTML-escapes user input, formats a Portuguese-language message, POSTs to the Telegram Bot API.
4. Returns a discriminated result `{ ok: true } | { ok: false; error: "validation" | "config" | "delivery" }` so the form shows generic error UI while specific failure modes go to Vercel logs (greppable with the `[contact]` prefix).

To swap delivery channels (e.g. to Resend), edit only `actions.ts`.

### Analytics

`<Analytics />` from `@vercel/analytics/next` is mounted once in `app/[locale]/layout.tsx`. Page views are captured automatically.

For custom events, use `track(name, { ...properties })` from `@vercel/analytics`. Conventions:
- Event names: `snake_case`, verb-or-noun-action (e.g. `whatsapp_click`).
- When the same event fires from more than one UI surface, **the event must carry a `location` property** (e.g. `"fab"`, `"ev_spotlight"`) — otherwise you can't tell which touchpoint converted in the dashboard.
- Property values must be `string | number | boolean | null`.

### SEO

- `app/[locale]/layout.tsx` emits a JSON-LD blob describing the business (currently `@type: "Electrician"` — change if reused for another business type).
- `app/robots.ts` and `app/sitemap.ts` generate the respective files.
- `app/[locale]/opengraph-image.tsx` generates the default OG image via `next/og`.

### Path alias

`@/*` resolves to the repo root (configured in `tsconfig.json`). Use `@/lib/business`, `@/components/WhatsAppLink`, etc.

### Security headers

Set in `next.config.ts` via the `headers()` function: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denying camera/mic/geolocation/FLoC. A CSP comment is staged for when third-party vendors are finalized.

## Gotchas (things that have already bitten us — don't redo)

- **Vercel framework preset MUST be `nextjs`.** `vercel.json` pins this. If you ever see every production route 404 with `x-vercel-error: NOT_FOUND` from the edge while deployments show "Ready", run `vercel inspect <deployment-url>` — if `Builds` shows `. [0ms]`, the preset has drifted to "Other" and Vercel is serving `public/` as a static site instead of building Next.
- **Do not use `__dirname` or other Node globals in `next.config.ts`.** They throw `ReferenceError` in the Edge runtime when Vercel evaluates the config for middleware-class code. There's no benefit to pinning `turbopack.root` from the config — the actual cause of workspace-root warnings is a stray lockfile somewhere up the directory tree (e.g. `~/package-lock.json` from an accidental `npm install` in `$HOME`). Delete the orphan instead.
- **`proxy.ts`, not `middleware.ts`.** Next 16 renamed the convention. `proxy.ts` defaults to the Node.js runtime via Fluid Compute, which is what we want — don't try to set `runtime: "nodejs"` in its config (the option isn't allowed on proxy files).
- **`vercel env add` stdin is unreliable** in CLI v54.x — piping/redirection often results in the variable being stored as `""`. Use the dashboard or interactive TTY to set secrets and verify with `vercel env pull .env.local && grep <NAME> .env.local`.
- **The contact form was a placebo until recently.** It now actually delivers via Telegram. If you change `actions.ts`, smoke-test end-to-end (UI submission → `vercel logs --since 5m` → Telegram ping) before considering it shipped.

## Further reading

`docs/landing-spec-direction.md` is the agnostic spec this project follows. Read it before introducing a new convention — if your change deviates from the spec, document why.
