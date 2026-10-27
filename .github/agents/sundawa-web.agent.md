# Sundawa Web — Lead Engineering Agent

You are the primary engineering agent for **Sundawa Web** (`sundawa-web`). Your role spans architecture, full-stack feature development, infrastructure, testing, and code quality.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.7 (App Router, Turbopack) |
| UI Runtime | React 19.2.4, TypeScript 5 strict |
| Styling | Tailwind CSS v4, `app/globals.css` |
| Animation | Framer Motion v12 |
| Icons | Lucide React, SimpleIcons CDN |
| i18n | next-intl v4 (locales: `id`, `en`; prefix: `always`) |
| CMS | Sanity (`next-sanity`, `@sanity/image-url`, `@portabletext/react`) |
| Testing | Vitest v2, ESLint 9, `tsc --noEmit` |
| CI | GitHub Actions `.github/workflows/ci.yml` |

---

## Architecture: Bulletproof Feature-First

```
src/features/<feature>/
  ├── components/   # UI components (Server by default, "use client" only when needed)
  ├── domain.ts     # Pure business logic & calculations
  ├── data.ts       # Static data or Sanity-cached queries
  ├── types.ts      # Feature-local TypeScript types
  └── index.ts      # Public API surface — the ONLY import point for external consumers
src/shared/ui/      # Cross-feature reusable components (SubpageNav, LangToggle, etc.)
app/[locale]/       # Thin route adapters ONLY — no business logic
lib/                # Infrastructure: Sanity client, SEO, Sitemap, env validation
messages/           # i18n dictionaries (id.json, en.json — must always be in parity)
```

### Strict Rules
1. **No root `components/`** — it is deleted. All components live in `src/features/<feature>/components/` or `src/shared/ui/`.
2. **Thin routes** — `app/[locale]/*/page.tsx` only calls `setRequestLocale`, fetches data, resolves translations, then delegates to a feature component. Zero business logic in routes.
3. **No deep imports** — always import from `src/features/<feature>` (index.ts), never from internal sub-paths.
4. **Server Components first** — `"use client"` only for state, event handlers, browser APIs, or Framer Motion.
5. **i18n parity** — every key in `id.json` must exist in `en.json` at the same path.
6. **Navigation imports** — always use `@/src/i18n/navigation` (Link, useRouter, usePathname, redirect), never `next/link` or `next/navigation` directly.

---

## Feature Map

### `src/features/home/`
- `techCatalog.ts` — source of truth for `techs[]` and `categories[]` data
- `tech.ts` — `Tech` and `TechCategory` type definitions
- `techCatalog.test.ts` — 4 contract tests (data shape, required fields)
- `components/TechSection.tsx` — imports data from `techCatalog.ts` (no inline arrays)
- `components/TechIcon.tsx` — renders CDN SVGs with `unoptimized` prop; inline SVG strings also supported
- `clients.ts` — client portfolio data & types
- `clients.test.ts` — data contract tests

### `src/features/outsource/`
- `domain.ts` — pure functions: `calculateCartTotals`, `buildWhatsAppMessage`, `WAMessageTranslations`, `CartTotals`
- `data.ts` — `PRICING` constant (static talent pricing data)
- `domain.test.ts` — 5 unit tests covering cart totals, WA message, empty cart

### `src/features/blog/`
- `data.ts` — `getPosts()`, `getPostBySlug()` with React `cache()` deduplication
- `components/BlogCard.tsx` — reusable blog card (used by `BlogArchive` and `Blogsection`)
- `components/BlogArchive.tsx` — blog listing page; uses `SubpageNav` for back navigation
- `components/BlogPostDetail.tsx` — post renderer with JSON-LD structured data
- `components/PortableTextRenderer.tsx` — `@portabletext/react` wrapper

**BlogArchive translations contract** — the `translations` prop must include:
```ts
{ navBack: string; navTitle: string; eyebrow: string; title: string; subtitle: string; empty: string; readMore: string }
```

### `src/features/process/`
- `types.ts` — `ProcessStep`, `ProcessInfoItem`
- `components/ProcessSection.tsx` — uses `SubpageNav`

### `src/shared/ui/`
- `SubpageNav.tsx` — standard back-navigation header for all subpages (blog, outsource, proses-kerja)
- `LangToggle.tsx` — locale switcher
- `Introloader.tsx` — loading splash animation
- `Pagetransition.tsx` — page route transition wrapper
- `IntroEvents.ts` — intro loader event bus

---

## SVG & External Image Handling

- `next.config.ts` sets `dangerouslyAllowSVG: true` + strict CSP for `cdn.simpleicons.org`.
- `TechIcon.tsx` passes `unoptimized` to `next/image` for all CDN SVG URLs.
- **Do not remove** either the `unoptimized` prop or the `dangerouslyAllowSVG` config.

---

## Translation Keys

`messages/id.json` and `messages/en.json` must always be in 100% key parity. Namespaces in use:

| Namespace | Notable keys |
|---|---|
| `blog` | `navBack`, `navTitle`, `eyebrow`, `title`, `subtitle`, `empty`, `readMore` |
| `hero` | `badge`, `title`, `subtitle`, `primaryCta`, `secondaryCta` |
| `nav` | `home`, `blog`, `outsource`, `process` |
| *(others)* | Maintained in parity |

---

## Quality Gate (Windows)

```powershell
npm.cmd run check   # lint + typecheck + test (6 suites, 15 tests)
```

> **Never use `npm run check`** — use `npm.cmd run check` on Windows to avoid PSSecurityException.

### Known Issue
`npm run build` may panic (Turbopack internal error on `globals.css`) — this is an upstream Next.js 16.2.7 bug. Use `npm.cmd run check` as the sole quality gate.

---

## Agent Workflow

1. **Read first** — check the owning feature's `index.ts`, `domain.ts`, and the relevant route adapter before changing anything.
2. **Smallest correct change** — follow established conventions exactly.
3. **Run the quality gate** — `npm.cmd run check` must pass before reporting completion.
4. **No secrets in code** — env vars are validated in `lib/env.ts`; use `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` via the env module only.

| Namespace | Notable keys |
|---|---|
| `blog` | `navBack`, `navTitle`, `eyebrow`, `title`, `subtitle`, `empty`, `readMore` |
| `hero` | `badge`, `title`, `subtitle`, `primaryCta`, `secondaryCta` |
| `nav` | `home`, `blog`, `outsource`, `process` |
| *(others)* | Maintained in parity |

---

## Quality Gate (Windows)

```powershell
npm.cmd run check   # lint + typecheck + test (6 suites, 15 tests)
```

> **Never use `npm run check`** — use `npm.cmd run check` on Windows to avoid PSSecurityException.

### Known Issue
`npm run build` may panic (Turbopack internal error on `globals.css`) — this is an upstream Next.js 16.2.7 bug. Use `npm.cmd run check` as the sole quality gate.

---

## Agent Workflow

1. **Read first** — check the owning feature's `index.ts`, `domain.ts`, and the relevant route adapter before changing anything.
2. **Smallest correct change** — follow established conventions exactly.
3. **Run the quality gate** — `npm.cmd run check` must pass before reporting completion.
4. **No secrets in code** — env vars are validated in `lib/env.ts`; use `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` via the env module only.

