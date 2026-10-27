# Sundawa Web

Official web application for **Sundawa Teknologi** — built for performance, modern aesthetics, and seamless Bahasa Indonesia / English internationalization.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.7 — App Router, Turbopack |
| UI | React 19.2.4, TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion v12 |
| Icons | Lucide React, SimpleIcons CDN |
| i18n | next-intl v4 (`id` default, `en`; prefix: `always`) |
| CMS | Supabase (`@supabase/supabase-js`) + TipTap rich text editor + custom admin |
| Testing | Vitest v2 |
| Linting | ESLint 9 |
| CI | GitHub Actions |

---

## Architecture: Bulletproof Feature-First

The codebase follows a strict **feature-first modular architecture**. All domain logic, components, and tests live inside `src/features/<feature>/`. Route files in `app/[locale]/` are thin adapters only.

```
sundawa-web/
├── app/
│   ├── [locale]/
│   │   ├── blog/
│   │   │   ├── page.tsx              # Thin adapter → BlogArchive
│   │   │   └── [slug]/page.tsx       # Thin adapter → BlogPostDetail
│   │   ├── portfolio/
│   │   │   ├── page.tsx              # Thin adapter → PortfolioArchive
│   │   │   └── [slug]/page.tsx       # Thin adapter → PortfolioDetail
│   │   ├── services/
│   │   │   ├── page.tsx              # Thin adapter → ServicesPage
│   │   │   └── [slug]/page.tsx       # Thin adapter → ServiceDetail
│   │   ├── about/page.tsx            # Thin adapter → AboutPage
│   │   ├── contact/page.tsx          # Thin adapter → ContactPage
│   │   ├── outsource/page.tsx        # Thin adapter → Outsource
│   │   ├── proses-kerja/page.tsx     # Thin adapter → ProcessSection
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Thin adapter → home sections
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── error.tsx
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── offline/page.tsx          # PWA offline fallback
│   ├── globals.css
│   ├── Robots.ts
│   └── sitemap.ts
├── messages/
│   ├── id.json                       # Indonesian (default)
│   └── en.json                       # English (must mirror id.json 1:1)
├── src/
│   ├── features/
│   │   ├── home/
│   │   │   ├── components/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── ProblemSection.tsx
│   │   │   │   ├── AboutSection.tsx
│   │   │   │   ├── ValuesSection.tsx
│   │   │   │   ├── ServicesSection.tsx
│   │   │   │   ├── TechSection.tsx       # Imports data from techCatalog.ts
│   │   │   │   ├── TechIcon.tsx          # SVG renderer — uses `unoptimized` for CDN SVGs
│   │   │   │   ├── ClientsSection.tsx
│   │   │   │   ├── ObjectionsSection.tsx
│   │   │   │   ├── FinalCtaSection.tsx
│   │   │   │   ├── ContactSection.tsx
│   │   │   │   ├── Blogsection.tsx       # Uses BlogCard
│   │   │   │   ├── ParticleField.tsx
│   │   │   │   ├── ParticleFieldClient.tsx
│   │   │   │   ├── Introcontext.tsx
│   │   │   │   ├── ClientProjectDialog.tsx
│   │   │   │   ├── ClientsGrid.tsx
│   │   │   │   └── ClientsStats.tsx
│   │   │   ├── clients.ts
│   │   │   ├── clients.test.ts
│   │   │   ├── tech.ts                   # Tech, TechCategory types
│   │   │   ├── techCatalog.ts            # Source of truth: techs[], categories[]
│   │   │   ├── techCatalog.test.ts       # 4 contract tests
│   │   │   └── index.ts
│   │   ├── outsource/
│   │   │   ├── components/
│   │   │   │   ├── Outsource.tsx         # Main calculator (exported as OutsourceCalculator)
│   │   │   │   ├── TalentSelector.tsx
│   │   │   │   ├── EstimateCart.tsx
│   │   │   │   ├── ContactCta.tsx
│   │   │   │   ├── InfoStrip.tsx
│   │   │   │   └── ModeBadge.tsx
│   │   │   ├── data.ts                   # PRICING constant
│   │   │   ├── domain.ts                 # Pure calculations & WA message builder
│   │   │   ├── domain.test.ts            # 5 unit tests
│   │   │   └── index.ts
│   │   ├── blog/
│   │   │   ├── components/
│   │   │   │   ├── BlogCard.tsx          # Reusable post card
│   │   │   │   ├── BlogArchive.tsx       # Post listing with SubpageNav
│   │   │   │   ├── BlogPostDetail.tsx    # Post renderer with JSON-LD schema
│   │   │   │   └── MdxRenderer.tsx         # HTML renderer (TipTap output)
│   │   │   ├── data.ts                   # getPosts, getPostBySlug (Supabase cache)
│   │   │   └── index.ts
│   │   └── process/
│   │       ├── components/
│   │       │   └── ProcessSection.tsx    # Uses SubpageNav
│   │       ├── types.ts                  # ProcessStep, ProcessInfoItem
│   │       └── index.ts
│   │   ├── portfolio/
│   │   │   ├── components/
│   │   │   │   ├── PortfolioArchive.tsx  # Portfolio grid listing
│   │   │   │   └── PortfolioDetail.tsx   # Single project detail
│   │   │   ├── types.ts                  # PortfolioProject type
│   │   │   ├── data.ts                   # Data transformation from clients
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── components/
│   │   │   │   ├── ServicesPage.tsx      # Services grid listing
│   │   │   │   └── ServiceDetail.tsx     # Single service detail
│   │   │   └── index.ts
│   │   ├── about/
│   │   │   ├── components/
│   │   │   │   └── AboutPage.tsx         # About page with missions, values, stats
│   │   │   └── index.ts
│   │   └── contact/
│   │       ├── components/
│   │       │   └── ContactPage.tsx       # Contact form with WhatsApp integration
│   │       └── index.ts
│   ├── shared/
│   │   └── ui/
│   │       ├── SubpageNav.tsx            # Back-nav header for all subpages
│   │       ├── LangToggle.tsx
│   │       ├── Introloader.tsx
│   │       ├── Pagetransition.tsx
│   │       ├── IntroEvents.ts
│   │       ├── GoogleAnalytics.tsx       # GA4 & GTM script injection
│   │       ├── SkipLink.tsx              # Skip navigation (a11y)
│   │       ├── PWARegister.tsx           # Service worker registration
│   │       ├── InstallPrompt.tsx         # PWA install banner
│   │       └── index.ts
│   └── i18n/
│       ├── routing.ts
│       ├── request.ts
│       └── navigation.ts                 # Always import Link/useRouter from here
├── lib/
│   ├── env.ts                            # Fail-fast env validation
│   ├── supabase.ts                       # Supabase client
│   ├── types.ts                          # Post interface & isPost type guard
│   ├── types.test.ts
│   ├── Seo.ts                            # pageMetadata() with hreflang
│   ├── Seo.test.ts
│   ├── Sitemap.ts
│   ├── Sitemap.test.ts
│   └── analytics.ts                      # Google Analytics & GTM ID utilities
├── public/
│   ├── manifest.json                     # PWA web app manifest
│   ├── sw.js                             # Service worker (native Cache API)
│   ├── og-image.png                      # Open Graph image 1200x630
│   ├── favicon.ico                       # Favicon
│   ├── favicon-16x16.png                 # Favicon 16x16
│   ├── favicon-32x32.png                 # Favicon 32x32
│   ├── apple-touch-icon.png              # Apple touch icon 180x180
│   └── icons/
│       ├── icon-192x192.png              # PWA icon 192x192
│       └── icon-512x512.png              # PWA icon 512x512
└── .github/
    ├── agents/
    │   ├── sundawa-web.agent.md          # Lead Engineering Agent
    │   ├── sundawa-ui.agent.md           # UI/UX & Localization Specialist
    │   └── sundawa-content.agent.md      # Supabase CMS & Data Specialist
    ├── copilot-instructions.md
    └── workflows/ci.yml
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- A Supabase project with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` configured

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
# Optional: Admin panel password
ADMIN_PASSWORD=your_secure_password
# Optional: Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXX
```

### Development
```bash
npm install
npm run dev        # http://localhost:3000
```

---

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run check` | **Quality gate**: lint + typecheck + test |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest (6 suites, 15 tests) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |

> **Windows**: Use `npm.cmd run check` instead of `npm run check` to avoid PowerShell execution policy errors.

---

## Key Architectural Decisions

### Feature-First (Bulletproof) Architecture
Every feature (`home`, `outsource`, `blog`, `process`, `portfolio`, `services`, `about`, `contact`) is self-contained in `src/features/<feature>/` with its own components, domain logic, data layer, types, and tests. External consumers import only from the feature's `index.ts`.

### Thin Route Adapters
`app/[locale]/*/page.tsx` files contain zero business logic. They:
1. Call `setRequestLocale(locale)`
2. Fetch data (Supabase or static)
3. Resolve translations via `getTranslations()`
4. Render a single feature component with typed props

### SVG Icon Handling
SimpleIcons are served from `cdn.simpleicons.org`. `next.config.ts` enables `dangerouslyAllowSVG: true` for this domain with a strict Content-Security-Policy. `TechIcon.tsx` uses the `unoptimized` prop on `next/image` for all CDN SVG URLs.

### Technology Catalog
All tech stack data (`techs[]`, `categories[]`) lives in `src/features/home/techCatalog.ts` — never duplicated inline in components.

### Shared Navigation Component
`SubpageNav` (`src/shared/ui/SubpageNav.tsx`) is the standard back-navigation header used across all subpages (`/blog`, `/portfolio`, `/services`, `/about`, `/contact`, `/outsource`, `/proses-kerja`). New subpages should use it.

### i18n Key Parity
`messages/id.json` and `messages/en.json` must always have identical key structures. All subpage namespaces (`blog`, `portfolio`, `services`, `about`, `contact`) include `navBack` and `navTitle` for the `SubpageNav` component.

### Analytics Integration
Google Analytics (GA4) and Google Tag Manager are supported via `lib/analytics.ts` and `src/shared/ui/GoogleAnalytics.tsx`. Enable by setting `NEXT_PUBLIC_GA_MEASUREMENT_ID` and/or `NEXT_PUBLIC_GTM_ID` environment variables. Scripts are injected conditionally in `app/[locale]/layout.tsx`.

### Progressive Web App (PWA)
The app is installable as a PWA with offline support:
- **Manifest**: `public/manifest.json` with Sundawa branding and theme colors
- **Service Worker**: `public/sw.js` using native Cache API (cache-first for assets, network-first for API/navigation)
- **Install Prompt**: `InstallPrompt` component shows a banner on supported browsers
- **Offline Fallback**: `/offline` page displays when the user loses connectivity
- **Icons**: 192x192 and 512x512 PNG icons generated from the existing logo

### SEO & Structured Data
The app follows SEO best practices with complete metadata and structured data:
- **Metadata**: `pageMetadata()` helper covers 8 page keys with canonical URLs, hreflang, Open Graph, and Twitter cards
- **Sitemap**: All static pages (home, outsource, proses-kerja, blog, portfolio, services, about, contact) + dynamic blog post slugs
- **Structured Data (JSON-LD)**: Organization + WebSite schema with ContactPoint and SearchAction; BlogPosting on blog posts
- **Google Search Console**: Verification token configured in layout metadata
- **Robots.txt**: Disallows `/offline` path, allows all other paths
- **Open Graph**: `/og-image.png` (1200x630) for social sharing previews
- **Favicons**: Complete set (ICO, 16x16, 32x32, Apple touch icon) generated from logo

---

## Testing

```
lib/types.test.ts                         # Post type guard tests
lib/Seo.test.ts                           # SEO metadata helper tests
lib/Sitemap.test.ts                       # Sitemap URL generator tests
src/features/home/clients.test.ts         # Client data contract tests
src/features/home/techCatalog.test.ts     # Tech catalog data contract tests (4)
src/features/outsource/domain.test.ts     # Pricing domain logic tests (5)
```

---

## Known Issues

- **Turbopack build panic**: `npm run build` may fail with an internal Turbopack error on `app/globals.css` in Next.js 16.2.7. This is an upstream bug — not a code issue. Use `npm run check` (not `npm run build`) as the quality gate.
