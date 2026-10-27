# AGENTS.md — Sundawa Web Repository Guide

This document is the authoritative instruction and architectural manual for all AI coding agents working in the `sundawa-web` repository.

---

## 1. Project Overview & Tech Stack

Sundawa Web is the official web application for **Sundawa Teknologi**, built for high performance, localized internationalization, modern aesthetics, and seamless content delivery.

- **Framework**: [Next.js 16.2.7](https://nextjs.org/) (App Router, Turbopack)
- **Runtime & UI**: [React 19.2.4](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/) in strict mode
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/postcss` and custom utilities in `app/globals.css`
- **Design Tokens**:
  - Dark Navy background (`#0A192F`, `#020C1B`)
  - Electric Blue / Cyan accents (`#00F0FF`, `#1E3A8A`)
  - Gold / Amber highlights (`#FFD700`, `#F59E0B`)
  - Typography: Montserrat (`@fontsource/montserrat`)
- **Animation & Icons**: [Framer Motion v12](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/), SimpleIcons CDN
- **Internationalization (i18n)**: [next-intl v4](https://next-intl-docs.vercel.app/) (Locales: `id` [default], `en`; prefix: `always`)
- **Content Management**: [Sanity CMS](https://www.sanity.io/) (`next-sanity`, `@sanity/image-url`, `@portabletext/react`)
- **Testing & Quality Assurance**: [Vitest v2](https://vitest.dev/), ESLint 9, `tsc --noEmit`
- **Continuous Integration**: GitHub Actions (`.github/workflows/ci.yml`)

---

## 2. Repository Structure & Feature Boundaries

The codebase enforces a modular **feature-first** (Bulletproof) architecture:

```
sundawa-web/
├── app/                          # Next.js App Router root
│   ├── [locale]/                 # Localized routes (/id/* and /en/*)
│   │   ├── blog/                 # Blog archive & dynamic post [slug]
│   │   │   ├── page.tsx          # Thin route adapter — passes translations to BlogArchive
│   │   │   └── [slug]/page.tsx   # Thin route adapter — passes post + locale to BlogPostDetail
│   │   ├── outsource/            # Outsource rate card & estimator
│   │   │   └── page.tsx          # Thin route adapter — renders <Outsource />
│   │   ├── proses-kerja/         # Workflow process overview
│   │   │   └── page.tsx          # Thin route adapter — renders <ProcessSection />
│   │   ├── layout.tsx            # Locale provider, font loading, intro loader
│   │   ├── page.tsx              # Landing homepage — thin route adapter
│   │   ├── loading.tsx           # Locale loading skeleton / fallback
│   │   ├── error.tsx             # Locale runtime error boundary
│   │   └── not-found.tsx         # Locale 404 handler
│   ├── error.tsx                 # Global root error boundary
│   ├── layout.tsx                # Root layout (no locale context)
│   ├── not-found.tsx             # Global root 404 fallback
│   ├── globals.css               # Tailwind CSS v4 setup & theme styles
│   ├── Robots.ts                 # Dynamic robots.txt
│   └── sitemap.ts                # Dynamic sitemap with Sanity post slugs
├── messages/                     # Translation dictionaries
│   ├── id.json                   # Indonesian translations (primary)
│   └── en.json                   # English translations (must mirror id.json 1:1)
├── src/
│   ├── features/                 # Modular feature domains
│   │   ├── home/                 # Landing page sections, clients modal, tech grid
│   │   │   ├── components/       # HeroSection, ClientsSection, TechSection, etc.
│   │   │   │   ├── TechIcon.tsx  # SVG icon renderer — uses `unoptimized` for CDN SVGs
│   │   │   │   └── TechSection.tsx # Tech grid — imports data from techCatalog.ts
│   │   │   ├── clients.ts        # Client portfolio data & types
│   │   │   ├── clients.test.ts   # Client data contract tests
│   │   │   ├── tech.ts           # Tech & TechCategory type definitions
│   │   │   ├── techCatalog.ts    # Technology catalog data (techs[], categories[])
│   │   │   ├── techCatalog.test.ts # Contract tests for techCatalog (4 tests)
│   │   │   └── index.ts          # Public exports for the home feature
│   │   ├── outsource/            # Outsource calculator & talent selection
│   │   │   ├── components/       # Outsource, EstimateCart, TalentSelector, etc.
│   │   │   ├── data.ts           # Static pricing data (PRICING constant)
│   │   │   ├── domain.ts         # Pure domain: pricing models, cart totals, WA message builder
│   │   │   ├── domain.test.ts    # Unit tests for domain calculations (5 tests)
│   │   │   └── index.ts          # Public exports for the outsource feature
│   │   ├── blog/                 # Sanity blog data fetching & portable text
│   │   │   ├── components/
│   │   │   │   ├── BlogArchive.tsx     # Blog listing — uses SubpageNav (navBack/navTitle)
│   │   │   │   ├── BlogCard.tsx        # Reusable blog card (used by BlogArchive & BlogSection)
│   │   │   │   ├── BlogPostDetail.tsx  # Blog post renderer with JSON-LD schema
│   │   │   │   └── PortableTextRenderer.tsx # @portabletext/react wrapper
│   │   │   ├── data.ts           # Cached Sanity queries (getPosts, getPostBySlug)
│   │   │   └── index.ts          # Public exports for the blog feature
│   │   └── process/              # Working process feature
│   │       ├── components/
│   │       │   └── ProcessSection.tsx  # Uses SubpageNav, typed with process domain types
│   │       ├── types.ts          # ProcessStep, ProcessInfoItem type definitions
│   │       └── index.ts          # Public exports for the process feature
│   ├── shared/
│   │   └── ui/                   # Reusable cross-feature UI components
│   │       ├── IntroEvents.ts    # Intro loader event bus
│   │       ├── Introloader.tsx   # Loading splash animation
│   │       ├── LangToggle.tsx    # Locale switcher
│   │       ├── Pagetransition.tsx# Page route transition wrapper
│   │       ├── SubpageNav.tsx    # Reusable subpage navigation header (back + title)
│   │       └── index.ts          # Public exports for shared UI
│   └── i18n/                     # next-intl configuration & routing
│       ├── routing.ts            # Supported locales, default locale, prefix rule
│       ├── request.ts            # Server request configuration for messages
│       └── navigation.ts         # Wrapped Link, useRouter, usePathname
├── lib/                          # Core infrastructure, Sanity, SEO & utils
│   ├── env.ts                    # Fail-fast public environment validation
│   ├── sanity.ts                 # Configured Sanity client & image builder
│   ├── Queries.ts                # Centralized GROQ query strings
│   ├── types.ts                  # Sanity interfaces & isPost type guard
│   ├── types.test.ts             # Unit tests for Sanity type guards
│   ├── Seo.ts                    # SEO metadata & alternate hreflang generator
│   ├── Seo.test.ts               # Unit tests for SEO helpers
│   ├── Sitemap.ts                # Sitemap URL generator
│   └── Sitemap.test.ts           # Unit tests for Sitemap helpers
└── .github/
    ├── agents/                   # GitHub Copilot custom agents
    │   ├── sundawa-web.agent.md  # Primary Lead Engineering Agent
    │   ├── sundawa-ui.agent.md   # UI/UX & Localization Specialist
    │   └── sundawa-content.agent.md # Sanity CMS & Data Specialist
    ├── copilot-instructions.md   # GitHub Copilot global instructions
    └── workflows/ci.yml          # CI quality check & production build
```

---

## 3. Core Architecture Rules

### 3.1. Feature Boundaries & No Root Components Directory
- The legacy root `components/` directory is **retired and deleted**. Never create or add files to a top-level `components/` directory.
- Domain-specific components belong exclusively inside `src/features/<feature>/components/`.
- Cross-domain presentation components belong in `src/shared/ui/`.
- External consumers must import from `src/features/<feature>` or `src/shared/ui`, **never** deep internal relative paths.
- Each feature exposes its public API via `src/features/<feature>/index.ts`.

### 3.2. Server Components vs. Client Components
- Keep components as **Server Components** by default.
- Add `"use client"` **only** when client state (`useState`, `useReducer`), event handlers, browser-only APIs (`window`, `localStorage`), or Framer Motion animation runtimes are needed.
- Keep client boundaries as deep and localized as possible; avoid turning entire pages or sections into client components.

### 3.3. Thin Route Adapters
- All files under `app/[locale]/` are **thin route adapters** only: they call `setRequestLocale`, fetch server data, resolve translations, then delegate rendering to a feature component.
- No business logic, no inline JSX rendering beyond passing props — everything lives in `src/features/`.

### 3.4. Localization (next-intl) & Copy Parity
- All user-facing text must be externalized in `messages/id.json` and `messages/en.json`.
- When updating or adding copy, maintain **100% key parity** between `id.json` and `en.json`.
- Server components use `getTranslations({ locale, namespace })`; client components use `useTranslations(namespace)`.
- **Navigation**: Always import `Link`, `useRouter`, `usePathname`, and `redirect` from `@/src/i18n/navigation`. Never import directly from `next/link` or `next/navigation` in localized route trees.
- The `blog` namespace in both `id.json` and `en.json` includes `navBack` and `navTitle` keys (used by `BlogArchive` via `SubpageNav`).

### 3.5. Sanity CMS & Data Fetching
- Sanity client configuration is initialized in `lib/sanity.ts`.
- Required environment variables are strictly verified in `lib/env.ts` (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`). Do not use hardcoded fallback strings.
- Centralize GROQ queries in `lib/Queries.ts`.
- All data fetching operations must go through `src/features/blog/data.ts` using React's `cache()` for deduplication.
- Validate incoming data using `isPost` or corresponding runtime type guards before rendering.
- Render rich text using `@portabletext/react` wrapped in `src/features/blog/components/PortableTextRenderer.tsx`.

### 3.6. Outsource Calculator Domain Logic
- Pure calculations for talent rates, modes (remote/hybrid/onsite), margins, cart totals, and pricing strings live in `src/features/outsource/domain.ts`.
- Static pricing data lives in `src/features/outsource/data.ts` (the `PRICING` constant).
- Changes to pricing models must be accompanied by updated unit tests in `src/features/outsource/domain.test.ts`.

### 3.7. Technology Catalog
- Technology data (`techs[]`, `categories[]`) lives exclusively in `src/features/home/techCatalog.ts`.
- Type definitions (`Tech`, `TechCategory`) live in `src/features/home/tech.ts`.
- `TechSection.tsx` imports from `techCatalog.ts` — never define inline data arrays in the component.
- `TechIcon.tsx` renders both CDN-hosted SVG icons (via `<Image unoptimized />`) and inline SVG strings.

### 3.8. SVG Handling & External Images
- `next.config.ts` enables `dangerouslyAllowSVG: true` for `cdn.simpleicons.org` with a strict Content-Security-Policy (`script-src: 'none'; sandbox`).
- The `TechIcon` component always passes `unoptimized` prop to `next/image` when rendering SVGs from external CDN URLs.
- Do not remove the `unoptimized` prop or the `dangerouslyAllowSVG` config — they are required for SimpleIcons CDN delivery.

### 3.9. Shared UI Components
- `SubpageNav` in `src/shared/ui/SubpageNav.tsx` is the standard back-navigation header for all subpages (`/blog`, `/outsource`, `/proses-kerja`).
- It accepts `navBack` (button label) and `navTitle` (page title) as string props.
- `BlogArchive` and `ProcessSection` both consume `SubpageNav`.

---

## 4. Commands & Validation

### Standard Scripts
| Command | Description |
|---|---|
| `npm run dev` | Starts local Next.js development server |
| `npm run check` | **Complete Quality Gate**: runs `lint` + `typecheck` + `test` |
| `npm run lint` | Runs ESLint validation |
| `npm run typecheck` | Runs TypeScript strict type check (`tsc --noEmit`) |
| `npm run test` | Runs unit tests via Vitest |
| `npm run build` | Next.js production compilation with Turbopack |
| `npm run start` | Serves compiled production build |

### Windows PowerShell Execution Notice
On Windows, PowerShell execution policy may prevent the standard `npm.ps1` script from executing (`PSSecurityException`). Always invoke `npm.cmd` directly:
```powershell
npm.cmd run check
npm.cmd run test
```

### Local Quality Gate
Before submitting any changes, always execute:
```bash
npm.cmd run check
```
This runs ESLint, TypeScript compiler verification, and the Vitest test suite (6 suites, 15+ tests).

### Known Issues
- **Turbopack build panic**: `npm run build` may fail with a Turbopack internal panic on `app/globals.css` in Next.js 16.2.7. This is a known upstream bug — not a code issue. The dev server works fine; use `npm run check` as the quality gate, not `npm run build`.

---

## 5. Agent Workflow Guidelines

1. **Investigate First**: Read the nearest owning route, component, feature domain, or unit test before introducing changes.
2. **Minimal & Focused**: Make the smallest correct change adhering to established conventions.
3. **Validate Immediately**: Run `npm.cmd run check` locally to ensure no linting, typing, or test regressions.
4. **Preserve Integrity**: Do not commit secrets, remove existing tests, or bypass strict type assertions.
5. **i18n Parity**: Any translation key added to `id.json` must be mirrored in `en.json` with the same namespace and structure.
6. **No Deep Imports**: Always import from a feature's `index.ts`, never from deep internal paths.
