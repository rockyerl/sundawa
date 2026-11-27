i# Sundawa Web

Official web application for **Sundawa Teknologi** — engineered for enterprise performance, modern aesthetics, high-contrast accessibility, and fluid Bahasa Indonesia & English internationalization.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16.2.7 — App Router, Turbopack |
| **Runtime & UI** | React 19.2.4, TypeScript 5 (strict) |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| **Design System** | Anti-Slop Core (Dial: Energy 2, Rhythm 2, Motion 2; WCAG AA $\ge$ 4.5:1) |
| **UX & Design Intelligence** | UI/UX Pro Max (120 UX guidelines, 79 design styles, 192 color palettes) |
| **Governance & Compliance** | Sundawa AI Engineering Standards v1.1.0 (ISO 27001, COBIT 7/2019, OWASP ASVS) |
| **Animation** | Framer Motion v12 |
| **Icons** | Lucide React, SimpleIcons CDN |
| **i18n** | next-intl v4 (`id` default, `en`; prefix: `always`) |
| **CMS & Database** | Supabase (`@supabase/supabase-js`) + TipTap rich text editor + custom unified admin |
| **Testing** | Vitest v2 (13 test suites, 41 tests) |
| **Linting & Types** | ESLint 9, `tsc --noEmit` |
| **CI/CD** | GitHub Actions (`.github/workflows/ci.yml`) |

---

## Architecture: Bulletproof Feature-First

The codebase follows a strict **feature-first modular architecture**. All domain logic, components, data queries, and unit tests live inside `src/features/<feature>/`. Route files in `app/[locale]/` are thin adapters only.

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
│   │   ├── products/
│   │   │   ├── page.tsx              # Thin adapter → ProductsArchive
│   │   │   └── [slug]/page.tsx       # Thin adapter → ProductDetail
│   │   ├── about/page.tsx            # Thin adapter → AboutPage
│   │   ├── contact/page.tsx          # Thin adapter → ContactPage
│   │   ├── outsource/page.tsx        # Thin adapter → Outsource
│   │   ├── proses-kerja/page.tsx     # Thin adapter → ProcessSection
│   │   ├── layout.tsx                # Locale provider, font loading, intro loader
│   │   ├── page.tsx                  # Thin adapter → home sections
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── error.tsx
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── offline/page.tsx              # PWA offline fallback
│   ├── globals.css                   # Tailwind v4 styles & theme tokens
│   ├── Robots.ts                     # Dynamic robots.txt
│   ├── sitemap.ts                    # Dynamic sitemap (static + blog/portfolio/product slugs)
│   ├── admin/                        # Custom admin panel (unified CMS)
│   │   ├── layout.tsx                # Auth guard + ToastContainer
│   │   ├── page.tsx                  # Dashboard — tabs (Blog | Portfolio)
│   │   ├── components/
│   │   │   ├── TipTapEditor.tsx      # Rich text editor
│   │   │   └── Toast.tsx             # Toast notifications + event refresh
│   │   ├── posts/
│   │   │   ├── PostForm.tsx          # Shared blog form with TipTap & cover upload
│   │   │   ├── new/page.tsx          # Create new post
│   │   │   └── [id]/edit/page.tsx    # Edit post
│   │   └── portfolio/
│   │       ├── page.tsx              # Portfolio dashboard with pagination
│   │       ├── PortfolioForm.tsx     # Shared portfolio form with cover upload
│   │       ├── new/page.tsx          # Create new project
│   │       └── [id]/edit/page.tsx    # Edit project
│   └── api/
│       ├── admin/auth/route.ts       # Admin login/logout (cookie session)
│       ├── blog/posts/route.ts       # CRUD API for blog posts
│       ├── blog/portfolio/route.ts   # CRUD API for portfolio (with pagination)
│       ├── blog/upload/route.ts      # Image upload to Supabase Storage
│       └── inquiries/route.ts        # Lead capture endpoint with honeypot spam protection
├── messages/
│   ├── id.json                       # Indonesian translations (primary)
│   └── en.json                       # English translations (1:1 key parity)
├── src/
│   ├── features/
│   │   ├── home/                     # Landing page sections, clients modal, tech grid
│   │   │   ├── components/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── ProblemSection.tsx
│   │   │   │   ├── AboutSection.tsx
│   │   │   │   ├── ValuesSection.tsx
│   │   │   │   ├── ServicesSection.tsx
│   │   │   │   ├── TechSection.tsx   # Imports data from techCatalog.ts
│   │   │   │   ├── TechIcon.tsx      # SVG renderer — uses unoptimized for CDN SVGs
│   │   │   │   ├── ClientsSection.tsx# Fetches from Supabase portfolio
│   │   │   │   ├── ObjectionsSection.tsx
│   │   │   │   ├── FinalCtaSection.tsx
│   │   │   │   ├── ContactSection.tsx# Form & floating WhatsApp launcher
│   │   │   │   ├── Blogsection.tsx   # Uses BlogCard
│   │   │   │   ├── FeaturedProjectsSection.tsx
│   │   │   │   ├── ParticleField.tsx
│   │   │   │   ├── ParticleFieldClient.tsx
│   │   │   │   ├── Introcontext.tsx
│   │   │   │   ├── ClientProjectDialog.tsx
│   │   │   │   ├── ClientsGrid.tsx
│   │   │   │   └── ClientsStats.tsx
│   │   │   ├── clients.ts
│   │   │   ├── clients.test.ts
│   │   │   ├── tech.ts               # Tech, TechCategory types
│   │   │   ├── techCatalog.ts        # Source of truth: techs[], categories[]
│   │   │   ├── techCatalog.test.ts   # 4 contract tests
│   │   │   └── index.ts
│   │   ├── outsource/                # Outsource rate card & estimator
│   │   │   ├── components/
│   │   │   │   ├── Outsource.tsx     # Main calculator (exported as OutsourceCalculator)
│   │   │   │   ├── TalentSelector.tsx
│   │   │   │   ├── EstimateCart.tsx  # Cart breakdown & WhatsApp estimate link
│   │   │   │   ├── ContactCta.tsx
│   │   │   │   ├── InfoStrip.tsx
│   │   │   │   └── ModeBadge.tsx
│   │   │   ├── data.ts               # PRICING constant
│   │   │   ├── domain.ts             # Pure calculations & WA message builder
│   │   │   ├── domain.test.ts        # 5 unit tests
│   │   │   └── index.ts
│   │   ├── blog/                     # Blog queries & detail
│   │   │   ├── components/
│   │   │   │   ├── BlogCard.tsx      # Reusable post card
│   │   │   │   ├── BlogArchive.tsx   # Post listing with search & SubpageNav
│   │   │   │   ├── BlogPostDetail.tsx# Post renderer with JSON-LD schema
│   │   │   │   └── MdxRenderer.tsx   # HTML renderer for TipTap output
│   │   │   ├── data.ts               # Supabase queries (no cache)
│   │   │   ├── pinnedPosts.ts        # Featured technical blog guides
│   │   │   └── index.ts
│   │   ├── portfolio/                # Supabase backed project portfolio
│   │   │   ├── components/
│   │   │   │   ├── PortfolioArchive.tsx # Grid with cover images
│   │   │   │   └── PortfolioDetail.tsx  # Detail with hero banner
│   │   │   ├── data.ts               # Supabase queries (no cache)
│   │   │   ├── portfolio.test.ts     # 3 contract & type guard tests
│   │   │   ├── types.ts              # Re-exports from lib/types.ts
│   │   │   └── index.ts
│   │   ├── services/                 # Services listing & detail
│   │   │   ├── components/
│   │   │   │   ├── ServicesPage.tsx  # Services grid listing
│   │   │   │   └── ServiceDetail.tsx # Service detail with consultation CTA
│   │   │   └── index.ts
│   │   ├── products/                 # Proprietary products & case studies
│   │   │   ├── components/
│   │   │   │   ├── ProductsSection.tsx
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductCategoryFilter.tsx
│   │   │   │   ├── ProductCaseStudiesSpotlight.tsx
│   │   │   │   ├── ProductCaseStudyDialog.tsx
│   │   │   │   ├── ProductsArchive.tsx
│   │   │   │   └── ProductDetail.tsx
│   │   │   ├── data.ts               # PRODUCT_SPECS catalog (6 products)
│   │   │   ├── domain.ts             # Filters, adjacency, mappers
│   │   │   ├── domain.test.ts        # Contract & i18n parity tests (4)
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── about/                    # About company & leadership showcase
│   │   │   ├── components/
│   │   │   │   ├── AboutPage.tsx     # Executive company showcase
│   │   │   │   ├── AboutSectionHeader.tsx
│   │   │   │   ├── CeoGreetingSpread.tsx
│   │   │   │   └── LeadershipShowcase.tsx
│   │   │   ├── team.ts               # Leadership & studio avatar paths
│   │   │   ├── team.test.ts          # Leadership asset & copy tests (2)
│   │   │   └── index.ts
│   │   ├── contact/                  # Contact form feature
│   │   │   ├── components/
│   │   │   │   └── ContactPage.tsx   # Contact form with WhatsApp integration
│   │   │   └── index.ts
│   │   └── process/                  # Working process feature
│   │       ├── components/
│   │       │   └── ProcessSection.tsx# Uses SubpageNav
│   │       ├── types.ts              # ProcessStep, ProcessInfoItem
│   │       └── index.ts
│   ├── shared/
│   │   └── ui/                       # Cross-feature UI components
│   │       ├── SubpageNav.tsx        # Contextual breadcrumb header for subpages
│   │       ├── Footer.tsx            # Corporate footer (PT Sundawa Teknologi Indonesia)
│   │       ├── LangToggle.tsx
│   │       ├── Introloader.tsx
│   │       ├── Pagetransition.tsx
│   │       ├── IntroEvents.ts
│   │       ├── GoogleAnalytics.tsx   # GA4 & GTM script injection
│   │       ├── SkipLink.tsx          # Skip navigation (a11y)
│   │       ├── PWARegister.tsx       # Service worker registration
│   │       ├── InstallPrompt.tsx     # PWA install banner
│   │       └── index.ts
│   └── i18n/                         # next-intl configuration & routing
│       ├── routing.ts                # Supported locales, default locale, prefix rule
│       ├── request.ts                # Server request configuration for messages
│       └── navigation.ts             # Wrapped Link, useRouter, usePathname
├── lib/                              # Infrastructure, Supabase, SEO & utils
│   ├── adminAuth.ts                  # HMAC admin session cookie signing & route guard
│   ├── adminAuth.test.ts             # 2 session token tests
│   ├── analytics.ts                  # GA4 & GTM lead and WhatsApp tracking utilities
│   ├── analytics.test.ts             # 4 analytics tracking tests
│   ├── contact.ts                    # Single source of truth for company contacts & URLs
│   ├── contact.test.ts               # 2 contact helper tests
│   ├── env.ts                        # Fail-fast env validation
│   ├── supabase.ts                   # Supabase client configuration
│   ├── types.ts                      # Post & PortfolioProject interfaces + runtime guards
│   ├── types.test.ts                 # 4 type guard tests
│   ├── Seo.ts                        # pageMetadata() with alternate hreflang
│   ├── Seo.test.ts                   # 2 SEO metadata tests
│   ├── Sitemap.ts                    # Sitemap URL generator
│   └── Sitemap.test.ts               # 2 sitemap helper tests
├── anti-slop/                        # Anti-Slop Audit reports & remediation tracking
│   ├── audit-001-remediation-report.md
│   └── audit-002-deep-pass-report.md
├── DESIGN.md                         # Anti-Slop & UI/UX Pro Max design guidelines
├── antislop.md                       # Anti-Slop framework configuration
├── .agents/                          # Sundawa AI Engineering Standards (v1.1.0 Governance & Compliance)
│   ├── governance/                   # Operating rules, RACI, continuous compliance, COBIT 7
│   ├── skills/                       # 22 engineering, design, and compliance skills
│   │   ├── ui-ux-pro-max/            # UI/UX intelligence dataset (120 rules, palettes, styles)
│   │   ├── visual-antislop/          # Anti-slop visual auditor
│   │   ├── architecture-reviewer/    # System boundaries, ADRs, state management
│   │   ├── security-auditor/         # OWASP ASVS, WSTG, auth security review
│   │   ├── clean-code-auditor/       # Code maintainability & strict type safety
│   │   └── ...                       # Database, ISO 27001, COBIT, test-case-generator
│   └── config/quality-gates.json     # Release quality profiles (web & enterprise gates)
├── public/                           # Static assets, icons, service worker & manifest
└── .github/
    ├── agents/                       # Custom GitHub Copilot agents
    ├── copilot-instructions.md
    └── workflows/ci.yml              # CI quality gate & production build
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

# Admin panel authentication
ADMIN_PASSWORD=your_secure_password

# Google Analytics & Tag Manager (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXX
```

### Database Setup
Execute in your Supabase SQL Editor:
```sql
-- Inquiries table for lead capture
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    topic TEXT NOT NULL,
    message TEXT NOT NULL,
    source_url TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Secure Row Level Security (public can insert, but only authenticated admins/service role can read)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert on inquiries" ON inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Restrict read to service role" ON inquiries FOR SELECT TO service_role USING (true);
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
| `npm run lint` | ESLint 9 |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest (13 suites, 41 tests) |
| `npm run build` | Next.js production build (73 static/dynamic pages) |
| `npm run start` | Serve production build |

> **Windows**: Use `npm.cmd run check` if PowerShell restricts npm script chaining.

---

## Key Architectural Decisions

### 1. Anti-Slop Editorial & Visual Standards
The repository strictly adheres to the **Anti-Slop Core Design & Editorial System** defined in `DESIGN.md` (Dial settings: Energy 2, Rhythm 2, Motion 2):
- **Architectural Eyebrow Bars**: Standardized across 11 files with `<span className="inline-block w-4 h-0.5 bg-gold mr-2 align-middle" />` instead of lazy em-dashes (`— {label}`).
- **High-Contrast Secondary Copy**: All subtitles, card descriptions, and table rows meet or exceed WCAG AA ($\ge$ 4.5:1), with target ratios $\ge$ 9.6:1 (`text-cream/75` to `text-cream/80` against `#0A192F` dark navy).
- **Zero AI Buzzwords**: Words such as `seamlessly`, `cutting-edge`, `unparalleled`, and `game-changing` are prohibited and replaced with direct, grounded technical descriptions.
- **Clean Scaffolding**: No mechanical layout comments (`/* Left */`, `/* Right */`) in the JSX tree.

### 2. Feature-First (Bulletproof) Architecture
Every feature domain is self-contained in `src/features/<feature>/` with its own components, domain logic, data layer, types, and tests. External consumers import only from the feature's `index.ts`.

### 3. Thin Route Adapters
`app/[locale]/*/page.tsx` files contain zero business logic:
1. Call `setRequestLocale(locale)`
2. Fetch data (Supabase or static)
3. Resolve translations via `getTranslations()`
4. Render a single feature component with typed props

### 4. Unified Admin CMS
Custom admin panel at `/admin` for managing both **Blog Posts** and **Portfolio Projects**:
- **Auth**: Password-protected via `ADMIN_PASSWORD` HMAC cookie session.
- **TipTap Rich Text Editor**: Dark-themed editor supporting headings, lists, links, images, and formatting.
- **Media Upload**: Direct image uploads to Supabase Storage (`blog-images` bucket).
- **Real-Time Data Refresh**: Optimistic UI feedback paired with event emitter reload triggers.
- **Pagination**: Dedicated portfolio management with 10 items per page.

### 5. Lead Capture & Conversion Analytics
- **API Endpoint**: `/api/inquiries` records contact submissions into Supabase with honeypot anti-spam verification.
- **Universal WhatsApp Attribution**: All WhatsApp CTAs use `buildWhatsAppUrl()` with topic-specific query parameters and dispatch `contact_whatsapp` analytics events.
- **GA4 / GTM**: Google Analytics 4 events (`generate_lead`, `contact_whatsapp`) dispatched through unified helpers in `lib/analytics.ts`.

### 6. Internationalization (next-intl)
- Locales: Indonesian (`id`, default) and English (`en`).
- **100% Key Parity**: `messages/id.json` and `messages/en.json` maintain matching structures across all namespaces.
- Navigation utilities must always be imported from `@/src/i18n/navigation` (`Link`, `useRouter`, `usePathname`).

### 7. Progressive Web App (PWA)
- **Manifest**: `public/manifest.json` configured with theme colors and PWA masks.
- **Service Worker**: Native Cache API in `public/sw.js` (cache-first for static assets, network-first for dynamic navigation).
- **Offline Fallback**: `/offline` page styled with Sundawa branding.

### 8. SEO & Structured Data
- **Dynamic Sitemap**: Covers all static pages across both locales plus dynamic slugs for blog posts, portfolio projects, and products.
- **Structured Data**: Organization, WebSite, Service, and BlogPosting JSON-LD schemas embedded for rich search engine indexing.

### 9. UI/UX Pro Max Ergonomics & Accessibility
The codebase integrates design intelligence and a11y criteria from `ui-ux-pro-max`:
- **Anchor Navigation Clearance**: `section[id] { scroll-margin-top: 5.5rem; }` ensures sticky navigation never occludes target sections upon hash jumping (`#services`, `#products`, `#clients`, `#contact`).
- **Typographic Orphan Prevention**: `h1, h2, h3 { text-wrap: balance; }` prevents awkward single-word wrapping across breakpoints.
- **Assistive Technology Semantics**: Decorative icons carry `aria-hidden="true"`; dynamic form error feedback uses `role="alert"` and `aria-live="assertive"`.
- **Search Usability**: Catalog/blog inputs use `type="search"`, explicit `aria-label`, and suppress aggressive mobile autocompletion (`autoComplete="off"`, `autoCorrect="off"`, `spellCheck={false}`).
- **WCAG AA Contrast**: Secondary copy maintains $\ge 4.5:1$ contrast against the `#0A192F` dark navy background.

### 10. Sundawa AI Engineering Governance (v1.1.0)
Engineered for strict enterprise compliance and risk traceability (`.agents/`):
- **Hierarchy of Truth**: Regulations & Contracts > Approved Requirements > Technical Standards (`standards/`) > Internal Governance (`governance/`) > AI Suggestions.
- **Release Quality Gates**: Operates under `web` and `enterprise` profiles (`config/quality-gates.json`). Mandatory release gates (`REQ-TRACE`, `UX-A11Y`, `TEST-RESULTS`, `SEC-SCOPE`, `SEC-VERIFY`, `BUILD-INTEGRITY`, `EVIDENCE`, `ARCH-REVIEW`, `DB-SAFETY`).
- **Audit Tooling**: Integrated TypeScript validation utilities in `scripts/` (`evaluate-gates.ts`, `validate-artifact.ts`, `validate-governance.ts`).

### 11. Legal, Privacy & Consent-Gated Analytics (Framework v1.0)
- **Framework Specs**: `docs/legal-privacy-framework/` documents the verified processor inventory, 12-month lead retention schedule, DSR workflow, and UU PDP / GDPR / UK GDPR alignment.
- **Bilingual Legal Pages**: `/privacy-policy` (19 sections), `/terms-of-use`, `/cookie-policy`, `/disclaimer`, `/responsible-disclosure`, and `/dpa` across both `/id` and `/en`.
- **Consent-First Analytics**: `CookieConsentManager` provides equal-prominence **Reject All**, **Customize**, and **Accept All** controls (re-openable anytime from the Footer **Cookie Preferences** button); `GoogleAnalytics.tsx` strictly blocks GA4 & GTM scripts until explicit analytics consent is granted.
- **Form Transparency**: `ContactPage` and `AssessmentPage` include Privacy Notices (12-month retention) and unchecked-by-default optional marketing opt-in checkboxes.

### 12. Industry Solutions Verticals (`/industries` & `/industries/[slug]`)
- **6 Targeted Enterprise Verticals**: Banking & Financial Services, Manufacturing & Industrial, Logistics & Supply Chain, Healthcare, Government & Public Sector, and International Organizations (`src/features/industries/`).
- **SEO & ABM Ready**: Pure Server Components with SSG (`generateStaticParams`), `Service` + `BreadcrumbList` JSON-LD schemas, canonical/hreflang sitemap coverage, and direct vertical-specific conversion funnels.


---

## Testing Matrix

```
app/api/inquiries/route.test.ts           # Lead capture API, payload validation & honeypot tests (6)
lib/adminAuth.test.ts                     # Admin HMAC session token signing & verification (2)
lib/analytics.test.ts                     # GA4 dataLayer & window.gtag event dispatch tests (4)
lib/contact.test.ts                       # Company contact constants & URL builder tests (2)
lib/Seo.test.ts                           # Canonical SEO metadata & alternate hreflang tests (2)
lib/Sitemap.test.ts                       # Sitemap URL generator & priority tests (2)
lib/types.test.ts                         # Post type guard runtime validation tests (4)
src/features/about/team.test.ts           # Leadership asset paths & copy parity tests (2)
src/features/home/clients.test.ts         # Client data contract & constant tests (1)
src/features/home/techCatalog.test.ts     # Tech catalog schema & category tests (4)
src/features/outsource/domain.test.ts     # Pricing models, cart math & WA message builder tests (5)
src/features/portfolio/portfolio.test.ts  # Portfolio project type guards & data contracts (3)
src/features/products/domain.test.ts      # Product catalog specs, filtering & i18n parity tests (4)
```

**Total**: 13 test suites, 41 tests passing in ~1.4s.

---

## Production Build Verification

Next.js 16.2.7 Turbopack builds cleanly:
```bash
npm run build
# ✓ Compiled successfully
# ✓ Generating static pages using 7 workers (73/73) in ~5s
```
All 73 SSG and dynamic routes compile without errors or warnings.
