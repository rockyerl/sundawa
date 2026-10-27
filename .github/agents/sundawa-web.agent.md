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
| CMS | Supabase (`@supabase/supabase-js`) + TipTap rich text + custom admin |
| Testing | Vitest v2, ESLint 9, `tsc --noEmit` |
| CI | GitHub Actions `.github/workflows/ci.yml` |

---

## Architecture: Bulletproof Feature-First

```
src/features/<feature>/
  ├── components/   # UI components (Server by default, "use client" only when needed)
  ├── domain.ts     # Pure business logic & calculations
  ├── data.ts       # Static data or Supabase queries (no cache for fresh CRUD data)
  ├── types.ts      # Feature-local TypeScript types
  └── index.ts      # Public API surface — the ONLY import point for external consumers
src/shared/ui/      # Cross-feature reusable components (SubpageNav, LangToggle, etc.)
app/[locale]/       # Thin route adapters ONLY — no business logic
app/admin/          # Custom admin panel (unified CMS: Blog + Portfolio, real-time CRUD)
app/api/            # API routes: auth, blog CRUD, portfolio CRUD, image upload
lib/                # Infrastructure: Supabase client, SEO, Sitemap, env validation
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
- `clients.ts` — client portfolio data & types
- `clients.test.ts` — data contract tests
- **Components (13 public exports)**:
  - `Navbar` — top navigation bar with locale-aware links
  - `HeroSection` — landing hero with CTA
  - `ProblemSection` — pain points section
  - `AboutSection` — company overview
  - `ValuesSection` — core values display
  - `ServicesSection` — service offerings grid
  - `TechSection` — tech stack grid (imports from `techCatalog.ts`)
  - `TechIcon` — SVG icon renderer (CDN + inline)
  - `ClientsSection` — client portfolio showcase
  - `ObjectionsSection` — common objections/FAQ
  - `FinalCtaSection` — final call-to-action
  - `ContactSection` — contact information & form
  - `BlogSection` — latest blog posts preview (uses `BlogCard`)
  - `ParticleField` — background particle animation (Server → Client via `ParticleFieldClient`)

### `src/features/outsource/`
- `domain.ts` — pure functions: `calculateCartTotals`, `buildWhatsAppMessage`, `WAMessageTranslations`, `CartTotals`
- `data.ts` — `PRICING` constant (static talent pricing data)
- `domain.test.ts` — 5 unit tests covering cart totals, WA message, empty cart
- **Components**:
  - `Outsource` (exported as `OutsourceCalculator`) — main outsource calculator page
  - `TalentSelector` — talent selection with mode toggle
  - `EstimateCart` — cart summary with pricing breakdown
  - `ContactCta` — contact call-to-action section
  - `InfoStrip` — informational banner strip
  - `ModeBadge` — remote/hybrid/onsite mode indicator badge

### `src/features/blog/`
- `data.ts` — `getPosts()`, `getPostBySlug()`, `searchPosts()` — **no React cache()** to ensure fresh data after admin CRUD
- `components/BlogCard.tsx` — reusable blog card (used by `BlogArchive` and `Blogsection`)
- `components/BlogArchive.tsx` — blog listing page with search input; uses `SubpageNav` for back navigation
- `components/BlogPostDetail.tsx` — post renderer with JSON-LD structured data
- `components/MdxRenderer.tsx` — HTML renderer (dangerouslySetInnerHTML for TipTap output)

**BlogArchive translations contract** — the `translations` prop must include:
```ts
{ navBack: string; navTitle: string; eyebrow: string; title: string; subtitle: string; empty: string; readMore: string }
```

### `src/features/process/`
- `types.ts` — `ProcessStep`, `ProcessInfoItem`
- `components/ProcessSection.tsx` — uses `SubpageNav`

### `src/shared/ui/`
- **Public exports (8)**: `IntroLoader`, `LangToggle`, `PageTransition`, `SubpageNav`, `GoogleAnalytics`, `SkipLink`, `PWARegister`, `InstallPrompt`
- `SubpageNav.tsx` — standard back-navigation header for all subpages (blog, portfolio, services, about, contact, outsource, proses-kerja)
- `LangToggle.tsx` — locale switcher
- `Introloader.tsx` — loading splash animation
- `Pagetransition.tsx` — page route transition wrapper
- `GoogleAnalytics.tsx` — GA4 & GTM script injection (conditional on env vars)
- `SkipLink.tsx` — skip navigation link (WCAG 2.1 AA)
- `PWARegister.tsx` — service worker registration
- `InstallPrompt.tsx` — PWA install banner
- `IntroEvents.ts` — intro loader event bus (internal, not exported)

### `src/features/portfolio/` — Supabase backed
- `data.ts` — `getPortfolioProjects()`, `getPortfolioProjectBySlug()` — **no React cache()**
- `types.ts` — re-exports `PortfolioProject` from `lib/types.ts`
- `components/PortfolioArchive.tsx` — grid listing with cover images
- `components/PortfolioDetail.tsx` — detail page with hero banner

### `src/features/home/` — ClientsSection
- `ClientsSection.tsx` — fetches portfolio data from Supabase via `/api/blog/portfolio` (not static data)
- `ClientsGrid.tsx` — card grid with cover image backgrounds
- `ClientProjectDialog.tsx` — modal uses `PortfolioProject` type from Supabase

---

## Admin Panel (`app/admin/`)

Unified CMS for managing blog posts AND portfolio projects:
- `layout.tsx` — auth guard (password from `ADMIN_PASSWORD` env var) + `ToastContainer`
- `page.tsx` — dashboard with tab navigation (Blog | Portfolio), real-time CRUD
- `components/Toast.tsx` — toast notifications with `showToast()`, `refreshData()`, `onDataRefresh()` event emitter
- `components/TipTapEditor.tsx` — rich text editor (bold, italic, heading, lists, link, image upload)

### Blog Management
- `posts/PostForm.tsx` — shared create/edit form with TipTap editor + cover image upload
- `posts/new/page.tsx` — create new post
- `posts/[id]/edit/page.tsx` — edit existing post (uses `await params` for Next.js 16)

### Portfolio Management
- `portfolio/page.tsx` — dashboard with pagination (10 per page)
- `portfolio/PortfolioForm.tsx` — create/edit form with cover image upload, auto-generate num/slug/initials
- `portfolio/new/page.tsx` — create new project
- `portfolio/[id]/edit/page.tsx` — edit existing project (uses `await params`)

API Routes:
- `/api/admin/auth` — login/logout (cookie session)
- `/api/blog/posts` — CRUD for blog posts
- `/api/blog/portfolio` — CRUD for portfolio projects (supports `?page=` and `?per_page=` pagination)
- `/api/blog/upload` — image upload to Supabase Storage

### Real-time CRUD
All operations provide instant UI feedback: local state filter → toast notification → `refreshData()` event → server reload via `onDataRefresh()` subscriber. Admin routes use `next/link` directly (not `@/src/i18n/navigation`) because they live outside `[locale]` tree.

## SVG & External Image Handling

- `next.config.ts` sets `dangerouslyAllowSVG: true` + strict CSP for `cdn.simpleicons.org`.
- `TechIcon.tsx` passes `unoptimized` to `next/image` for all CDN SVG URLs.
- **Do not remove** either the `unoptimized` prop or the `dangerouslyAllowSVG` config.

---

## Translation Keys

`messages/id.json` and `messages/en.json` must always be in 100% key parity. Namespaces in use:

| Namespace | Notable keys |
|---|---|
| `blog` | `navBack`, `navTitle`, `eyebrow`, `title`, `subtitle`, `empty`, `readMore`, `searchPlaceholder`, `searchNoResults`, `searchResultsCount` |
| `hero` | `badge`, `title`, `subtitle`, `primaryCta`, `secondaryCta` |
| `nav` | `home`, `blog`, `outsource`, `process` |
| *(others)* | Maintained in parity |

---

## Quality Gate (Windows)

```powershell
npm.cmd run check   # lint + typecheck + test (6 suites, 17 tests)
```

> **Never use `npm run check`** — use `npm.cmd run check` on Windows to avoid PSSecurityException.

### Known Issue
`npm run build` may panic (Turbopack internal error on `globals.css`) — this is an upstream Next.js 16.2.7 bug. Use `npm.cmd run check` as the sole quality gate.

---

## Agent Workflow

1. **Read first** — check the owning feature's `index.ts`, `domain.ts`, and the relevant route adapter before changing anything.
2. **Smallest correct change** — follow established conventions exactly.
3. **Run the quality gate** — `npm.cmd run check` must pass before reporting completion.
4. **No secrets in code** — env vars are validated in `lib/env.ts`; use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` via the env module only. Admin password via `ADMIN_PASSWORD`.

