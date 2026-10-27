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
- **Content Management**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`) + HTML (`dangerouslySetInnerHTML`) + [TipTap](https://tiptap.dev/) rich text editor + custom admin panel
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
│   │   ├── portfolio/            # Project portfolio archive & detail
│   │   │   ├── page.tsx          # Thin route adapter — renders <PortfolioArchive />
│   │   │   └── [slug]/page.tsx   # Thin route adapter — renders <PortfolioDetail />
│   │   ├── services/             # Services listing & detail
│   │   │   ├── page.tsx          # Thin route adapter — renders <ServicesPage />
│   │   │   └── [slug]/page.tsx   # Thin route adapter — renders <ServiceDetail />
│   │   ├── about/                # About company page
│   │   │   └── page.tsx          # Thin route adapter — renders <AboutPage />
│   │   ├── contact/              # Contact form page
│   │   │   └── page.tsx          # Thin route adapter — renders <ContactPage />
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
│   ├── offline/                  # PWA offline fallback page
│   │   └── page.tsx              # Offline fallback with Sundawa branding
│   ├── globals.css               # Tailwind CSS v4 setup & theme styles
│   ├── Robots.ts                 # Dynamic robots.txt
│   └── sitemap.ts                # Dynamic sitemap with Supabase post slugs
├── messages/                     # Translation dictionaries
│   ├── id.json                   # Indonesian translations (primary)
│   └── en.json                   # English translations (must mirror id.json 1:1)
├── src/
│   ├── features/                 # Modular feature domains
│   │   ├── home/                 # Landing page sections, clients modal, tech grid
│   │   │   ├── components/       # 13 public exports + internal helpers
│   │   │   │   ├── Navbar.tsx            # Top navigation with locale-aware links
│   │   │   │   ├── HeroSection.tsx       # Landing hero with CTA
│   │   │   │   ├── ProblemSection.tsx    # Pain points section
│   │   │   │   ├── AboutSection.tsx      # Company overview
│   │   │   │   ├── ValuesSection.tsx     # Core values display
│   │   │   │   ├── ServicesSection.tsx   # Service offerings grid
│   │   │   │   ├── TechSection.tsx       # Tech grid — imports data from techCatalog.ts
│   │   │   │   ├── TechIcon.tsx          # SVG icon renderer — uses `unoptimized` for CDN SVGs
│   │   │   │   ├── ClientsSection.tsx    # Client portfolio showcase
│   │   │   │   ├── ObjectionsSection.tsx # Common objections/FAQ
│   │   │   │   ├── FinalCtaSection.tsx   # Final call-to-action
│   │   │   │   ├── ContactSection.tsx    # Contact information & form
│   │   │   │   ├── Blogsection.tsx       # Latest blog posts preview (uses BlogCard)
│   │   │   │   ├── ParticleField.tsx     # Background particle animation (Server)
│   │   │   │   ├── ParticleFieldClient.tsx # Client-side particle wrapper
│   │   │   │   ├── Introcontext.tsx      # Intro animation context
│   │   │   │   ├── ClientProjectDialog.tsx # Client project detail modal
│   │   │   │   ├── ClientsGrid.tsx       # Client logos grid
│   │   │   │   └── ClientsStats.tsx      # Client statistics display
│   │   │   ├── clients.ts        # Client portfolio data & types
│   │   │   ├── clients.test.ts   # Client data contract tests
│   │   │   ├── tech.ts           # Tech & TechCategory type definitions
│   │   │   ├── techCatalog.ts    # Technology catalog data (techs[], categories[])
│   │   │   ├── techCatalog.test.ts # Contract tests for techCatalog (4 tests)
│   │   │   └── index.ts          # Public exports for the home feature
│   │   ├── outsource/            # Outsource calculator & talent selection
│   │   │   ├── components/
│   │   │   │   ├── Outsource.tsx       # Main outsource calculator page (exported as OutsourceCalculator)
│   │   │   │   ├── TalentSelector.tsx  # Talent selection with mode toggle
│   │   │   │   ├── EstimateCart.tsx    # Cart summary with pricing breakdown
│   │   │   │   ├── ContactCta.tsx      # Contact call-to-action section
│   │   │   │   ├── InfoStrip.tsx       # Informational banner strip
│   │   │   │   └── ModeBadge.tsx       # Remote/hybrid/onsite mode indicator
│   │   │   ├── data.ts           # Static pricing data (PRICING constant)
│   │   │   ├── domain.ts         # Pure domain: pricing models, cart totals, WA message builder
│   │   │   ├── domain.test.ts    # Unit tests for domain calculations (5 tests)
│   │   │   └── index.ts          # Public exports for the outsource feature
│   │   ├── blog/                 # Blog data fetching from Supabase + HTML rendering
│   │   │   ├── components/
│   │   │   │   ├── BlogArchive.tsx     # Blog listing — uses SubpageNav (navBack/navTitle)
│   │   │   │   ├── BlogCard.tsx        # Reusable blog card (used by BlogArchive & BlogSection)
│   │   │   │   ├── BlogPostDetail.tsx  # Blog post renderer with JSON-LD schema
│   │   │   │   └── MdxRenderer.tsx      # HTML renderer (renamed from MdxRenderer, uses dangerouslySetInnerHTML)
│   │   │   ├── data.ts           # Supabase queries (getPosts, getPostBySlug) — no cache
│   │   │   └── index.ts          # Public exports for the blog feature
│   │   └── process/              # Working process feature
│   │       ├── components/
│   │       │   └── ProcessSection.tsx  # Uses SubpageNav, typed with process domain types
│   │       ├── types.ts          # ProcessStep, ProcessInfoItem type definitions
│   │       └── index.ts          # Public exports for the process feature
│   │   ├── portfolio/            # Project portfolio feature
│   │   │   ├── components/
│   │   │   │   ├── PortfolioArchive.tsx  # Portfolio grid listing
│   │   │   │   └── PortfolioDetail.tsx   # Single project detail page
│   │   │   ├── types.ts          # PortfolioProject type definition
│   │   │   ├── data.ts           # Portfolio data transformation from clients
│   │   │   └── index.ts          # Public exports for the portfolio feature
│   │   ├── services/             # Services listing & detail feature
│   │   │   ├── components/
│   │   │   │   ├── ServicesPage.tsx      # Services grid listing
│   │   │   │   └── ServiceDetail.tsx     # Single service detail page
│   │   │   └── index.ts          # Public exports for the services feature
│   │   ├── about/                # About company page feature
│   │   │   ├── components/
│   │   │   │   └── AboutPage.tsx         # About page with missions, values, stats
│   │   │   └── index.ts          # Public exports for the about feature
│   │   └── contact/              # Contact form feature
│   │       ├── components/
│   │       │   └── ContactPage.tsx       # Contact form with WhatsApp integration
│   │       └── index.ts          # Public exports for the contact feature
│   ├── shared/
│   │   └── ui/                   # Reusable cross-feature UI components
│   │       ├── IntroEvents.ts    # Intro loader event bus
│   │       ├── Introloader.tsx   # Loading splash animation
│   │       ├── LangToggle.tsx    # Locale switcher
│   │       ├── Pagetransition.tsx# Page route transition wrapper
│   │       ├── SubpageNav.tsx    # Reusable subpage navigation header (back + title)
│   │       ├── GoogleAnalytics.tsx # Google Analytics & GTM script injection
│   │       ├── SkipLink.tsx      # Skip navigation link for accessibility
│   │       ├── PWARegister.tsx   # Service worker registration
│   │       ├── InstallPrompt.tsx # PWA install banner
│   │       └── index.ts          # Public exports for shared UI
│   └── i18n/                     # next-intl configuration & routing
│       ├── routing.ts            # Supported locales, default locale, prefix rule
│       ├── request.ts            # Server request configuration for messages
│       └── navigation.ts         # Wrapped Link, useRouter, usePathname
├── lib/                          # Core infrastructure, Supabase, SEO & utils
│   ├── env.ts                    # Fail-fast env validation (Supabase + ADMIN_PASSWORD)
│   ├── supabase.ts               # Configured Supabase client
│   ├── types.ts                  # Post interface & isPost type guard
│   ├── types.test.ts             # Unit tests for Post type guards
│   ├── Seo.ts                    # SEO metadata & alternate hreflang generator
│   ├── Seo.test.ts               # Unit tests for SEO helpers
│   ├── Sitemap.ts                # Sitemap URL generator
│   ├── Sitemap.test.ts           # Unit tests for Sitemap helpers
│   └── analytics.ts              # Google Analytics & GTM ID utilities
├── public/
│   ├── manifest.json             # PWA web app manifest
│   ├── sw.js                     # Service worker (native Cache API)
│   ├── og-image.png              # Open Graph image 1200x630
│   ├── favicon.ico               # Favicon (PNG fallback)
│   ├── favicon-16x16.png         # Favicon 16x16
│   ├── favicon-32x32.png         # Favicon 32x32
│   ├── apple-touch-icon.png      # Apple touch icon 180x180
│   └── icons/
│       ├── icon-192x192.png      # PWA icon 192x192
│       └── icon-512x512.png      # PWA icon 512x512
├── app/
│   └── admin/                    # Custom admin panel (password protected)
│       ├── layout.tsx            # Auth guard (ADMIN_PASSWORD env var)
│       ├── page.tsx              # Dashboard — list posts with CRUD actions
│       ├── components/
│       │   └── TipTapEditor.tsx  # Rich text editor (bold, italic, heading, lists, link, image)
│       └── posts/
│           ├── PostForm.tsx      # Shared create/edit form with cover image upload
│           ├── new/page.tsx      # Create new post
│           └── [id]/edit/page.tsx # Edit existing post
├── app/
│   └── api/
│       ├── admin/auth/route.ts   # Admin login/logout (cookie session)
│       ├── blog/posts/route.ts   # CRUD API for blog posts
│       └── blog/upload/route.ts  # Image upload to Supabase Storage
└── .github/
    ├── agents/                   # GitHub Copilot custom agents
    │   ├── sundawa-web.agent.md  # Primary Lead Engineering Agent
    │   ├── sundawa-ui.agent.md   # UI/UX & Localization Specialist
    │   └── sundawa-content.agent.md # Supabase CMS & Data Specialist
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

### 3.5. Supabase & Data Fetching
- Supabase client configuration is initialized in `lib/supabase.ts`.
- Required environment variables are strictly verified in `lib/env.ts` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ADMIN_PASSWORD`). Do not use hardcoded fallback strings.
- All data fetching operations go through `src/features/blog/data.ts` — **no React `cache()`** to ensure fresh data after admin CRUD operations.
- Validate incoming data using `isPost` runtime type guard before rendering.
- Render blog content using `HtmlRenderer` in `src/features/blog/components/MdxRenderer.tsx` (dangerouslySetInnerHTML for HTML output from TipTap).
- Images are stored in Supabase Storage (`blog-images` bucket) and referenced by public URL string.
- Database table `posts` columns: `id` (uuid), `title` (text), `slug` (text unique), `body_html` (text), `excerpt` (text nullable), `main_image_url` (text nullable), `published_at` (timestamptz), `created_at`, `updated_at`.

### 3.6. Admin Panel
- Located at `app/admin/` with client-side auth guard (password from `ADMIN_PASSWORD` env var).
- Dashboard at `app/admin/page.tsx` lists all posts with edit/delete actions.
- Create post at `app/admin/posts/new/page.tsx`, edit at `app/admin/posts/[id]/edit/page.tsx`.
- Shared form component: `app/admin/posts/PostForm.tsx` with TipTap rich text editor (bold, italic, headings, lists, links, images, code blocks) and cover image upload with preview.
- TipTap editor: `app/admin/components/TipTapEditor.tsx` — dark theme matching Sundawa design.
- API routes: `/api/admin/auth` (login/logout), `/api/blog/posts` (CRUD), `/api/blog/upload` (image upload to Supabase Storage).
- `/admin` is disallowed in `app/Robots.ts` to prevent search engine indexing.
- Edit page uses `await params` for Next.js 16 App Router async params pattern.
- Logout redirects to `/admin` (not home) via `setAuthenticated(false)` + `window.location.href`.

### 3.7. Outsource Calculator Domain Logic
- Pure calculations for talent rates, modes (remote/hybrid/onsite), margins, cart totals, and pricing strings live in `src/features/outsource/domain.ts`.
- Static pricing data lives in `src/features/outsource/data.ts` (the `PRICING` constant).
- Changes to pricing models must be accompanied by updated unit tests in `src/features/outsource/domain.test.ts`.

### 3.8. Technology Catalog
- Technology data (`techs[]`, `categories[]`) lives exclusively in `src/features/home/techCatalog.ts`.
- Type definitions (`Tech`, `TechCategory`) live in `src/features/home/tech.ts`.
- `TechSection.tsx` imports from `techCatalog.ts` — never define inline data arrays in the component.
- `TechIcon.tsx` renders both CDN-hosted SVG icons (via `<Image unoptimized />`) and inline SVG strings.

### 3.9. SVG Handling & External Images
- `next.config.ts` enables `dangerouslyAllowSVG: true` for `cdn.simpleicons.org` with a strict Content-Security-Policy (`script-src: 'none'; sandbox`).
- The `TechIcon` component always passes `unoptimized` prop to `next/image` when rendering SVGs from external CDN URLs.
- Do not remove the `unoptimized` prop or the `dangerouslyAllowSVG` config — they are required for SimpleIcons CDN delivery.
- `next.config.ts` also allows images from `xruymvsjvwumlpwisiht.supabase.co` for Supabase Storage blog images.

### 3.10. Analytics
- Google Analytics (GA4) and Google Tag Manager support via `lib/analytics.ts` and `src/shared/ui/GoogleAnalytics.tsx`. Enable by setting `NEXT_PUBLIC_GA_MEASUREMENT_ID` and/or `NEXT_PUBLIC_GTM_ID` environment variables.

### 3.11. Progressive Web App (PWA)
- **Manifest**: `public/manifest.json` defines app name, theme colors (`#0E1E30`), display mode (`standalone`), and icons.
- **Service Worker**: `public/sw.js` uses native Cache API — cache-first for static assets (images, fonts, icons), network-first for API and navigation requests.
- **Registration**: `PWARegister` client component in `src/shared/ui/` handles SW registration and update detection.
- **Install Prompt**: `InstallPrompt` in `src/shared/ui/` shows a banner when the browser supports installation (via `beforeinstallprompt` event).
- **Offline Fallback**: `app/offline/page.tsx` serves as the offline fallback page with Sundawa branding.
- **Headers**: `next.config.ts` configures `Cache-Control` for `/sw.js` (no-cache) and `/manifest.json` (1 hour cache).

### 3.12. SEO & Structured Data
- **Metadata**: `lib/Seo.ts` provides `pageMetadata()` for 8 page keys (home, outsource, process, blog, portfolio, contact, about, services) with canonical URLs, hreflang, Open Graph, and Twitter cards.
- **Sitemap**: `lib/Sitemap.ts` covers all static pages (home, outsource, proses-kerja, blog, portfolio, services, about, contact) plus dynamic blog post slugs from Supabase.
- **Structured Data (JSON-LD)**: Layout injects Organization + WebSite schema with ContactPoint and SearchAction. Blog posts include BlogPosting schema.
- **Google Search Console**: Verification token configured in layout metadata (`verification.google`).
- **Robots.txt**: Disallows `/offline` path, allows all other paths.
- **Open Graph**: `/og-image.png` (1200x630) used for social sharing previews.
- **Favicons**: `/favicon.ico`, `/favicon-16x16.png`, `/favicon-32x32.png`, `/apple-touch-icon.png` generated from logo.

### 3.13. Shared UI Components
- `SubpageNav` in `src/shared/ui/SubpageNav.tsx` is the standard back-navigation header for all subpages (`/blog`, `/portfolio`, `/services`, `/about`, `/contact`, `/outsource`, `/proses-kerja`).
- It accepts `backLabel` (button label) and `titleLabel` (page title) as string props.
- `BlogArchive`, `PortfolioArchive`, `ServicesPage`, `AboutPage`, `ContactPage`, and `ProcessSection` all consume `SubpageNav`.
- `GoogleAnalytics` in `src/shared/ui/GoogleAnalytics.tsx` injects GA4/GTM scripts conditionally when env vars are set.
- `SkipLink` in `src/shared/ui/SkipLink.tsx` provides skip navigation for keyboard users (WCAG 2.1 AA).
- `PWARegister` in `src/shared/ui/PWARegister.tsx` registers the service worker on mount.
- `InstallPrompt` in `src/shared/ui/InstallPrompt.tsx` displays an install banner for PWA-capable browsers.

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
This runs ESLint, TypeScript compiler verification, and the Vitest test suite (6 suites, 15 tests).

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
