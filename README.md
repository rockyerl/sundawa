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
| CMS | Sanity (`next-sanity`, `@portabletext/react`, `@sanity/image-url`) |
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
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── ClientsSection.tsx
│   │   │   │   ├── TechSection.tsx       # Imports data from techCatalog.ts
│   │   │   │   ├── TechIcon.tsx          # SVG renderer — uses `unoptimized` for CDN SVGs
│   │   │   │   ├── Blogsection.tsx       # Uses BlogCard
│   │   │   │   └── ...
│   │   │   ├── clients.ts
│   │   │   ├── clients.test.ts
│   │   │   ├── tech.ts                   # Tech, TechCategory types
│   │   │   ├── techCatalog.ts            # Source of truth: techs[], categories[]
│   │   │   ├── techCatalog.test.ts       # 4 contract tests
│   │   │   └── index.ts
│   │   ├── outsource/
│   │   │   ├── components/
│   │   │   │   ├── Outsource.tsx
│   │   │   │   ├── EstimateCart.tsx
│   │   │   │   ├── TalentSelector.tsx
│   │   │   │   └── ...
│   │   │   ├── data.ts                   # PRICING constant
│   │   │   ├── domain.ts                 # Pure calculations & WA message builder
│   │   │   ├── domain.test.ts            # 5 unit tests
│   │   │   └── index.ts
│   │   ├── blog/
│   │   │   ├── components/
│   │   │   │   ├── BlogCard.tsx          # Reusable post card
│   │   │   │   ├── BlogArchive.tsx       # Post listing with SubpageNav
│   │   │   │   ├── BlogPostDetail.tsx    # Post renderer with JSON-LD schema
│   │   │   │   └── PortableTextRenderer.tsx
│   │   │   ├── data.ts                   # getPosts, getPostBySlug (React cache)
│   │   │   └── index.ts
│   │   └── process/
│   │       ├── components/
│   │       │   └── ProcessSection.tsx    # Uses SubpageNav
│   │       ├── types.ts                  # ProcessStep, ProcessInfoItem
│   │       └── index.ts
│   ├── shared/
│   │   └── ui/
│   │       ├── SubpageNav.tsx            # Back-nav header for all subpages
│   │       ├── LangToggle.tsx
│   │       ├── Introloader.tsx
│   │       ├── Pagetransition.tsx
│   │       ├── IntroEvents.ts
│   │       └── index.ts
│   └── i18n/
│       ├── routing.ts
│       ├── request.ts
│       └── navigation.ts                 # Always import Link/useRouter from here
├── lib/
│   ├── env.ts                            # Fail-fast env validation
│   ├── sanity.ts                         # Sanity client & image builder
│   ├── Queries.ts                        # Centralized GROQ queries
│   ├── types.ts                          # Post interface & isPost type guard
│   ├── types.test.ts
│   ├── Seo.ts                            # pageMetadata() with hreflang
│   ├── Seo.test.ts
│   ├── Sitemap.ts
│   └── Sitemap.test.ts
└── .github/
    ├── agents/
    │   ├── sundawa-web.agent.md          # Lead Engineering Agent
    │   ├── sundawa-ui.agent.md           # UI/UX & Localization Specialist
    │   └── sundawa-content.agent.md      # Sanity CMS & Data Specialist
    ├── copilot-instructions.md
    └── workflows/ci.yml
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- A Sanity project with `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` configured

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
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
Every feature (`home`, `outsource`, `blog`, `process`) is self-contained in `src/features/<feature>/` with its own components, domain logic, data layer, types, and tests. External consumers import only from the feature's `index.ts`.

### Thin Route Adapters
`app/[locale]/*/page.tsx` files contain zero business logic. They:
1. Call `setRequestLocale(locale)`
2. Fetch data (Sanity or static)
3. Resolve translations via `getTranslations()`
4. Render a single feature component with typed props

### SVG Icon Handling
SimpleIcons are served from `cdn.simpleicons.org`. `next.config.ts` enables `dangerouslyAllowSVG: true` for this domain with a strict Content-Security-Policy. `TechIcon.tsx` uses the `unoptimized` prop on `next/image` for all CDN SVG URLs.

### Technology Catalog
All tech stack data (`techs[]`, `categories[]`) lives in `src/features/home/techCatalog.ts` — never duplicated inline in components.

### Shared Navigation Component
`SubpageNav` (`src/shared/ui/SubpageNav.tsx`) is the standard back-navigation header used across all subpages. New subpages should use it.

### i18n Key Parity
`messages/id.json` and `messages/en.json` must always have identical key structures. The `blog` namespace includes `navBack` and `navTitle` for the `SubpageNav` component in `BlogArchive`.

---

## Testing

```
lib/types.test.ts                         # Sanity type guard tests
lib/Seo.test.ts                           # SEO metadata helper tests
lib/Sitemap.test.ts                       # Sitemap URL generator tests
src/features/home/clients.test.ts         # Client data contract tests
src/features/home/techCatalog.test.ts     # Tech catalog data contract tests (4)
src/features/outsource/domain.test.ts     # Pricing domain logic tests (5)
```

---

## Known Issues

- **Turbopack build panic**: `npm run build` may fail with an internal Turbopack error on `app/globals.css` in Next.js 16.2.7. This is an upstream bug — not a code issue. Use `npm run check` (not `npm run build`) as the quality gate.
