---
sessionId: session-261027-105203-12mr
---

# Blog Search Implementation Plan

### * Step 1: Add Search to Blog Data Layer
Add `searchPosts(query: string)` function in `src/features/blog/data.ts` that queries Supabase with ILIKE for title, excerpt, and body_html fields.

###   Step 2: Update BlogArchive with Search UI
Convert BlogArchive to a client component with search input, debounced filtering, URL query params, and no-results state.

###   Step 3: Update Route Adapter and i18n
Update `app/[locale]/blog/page.tsx` to pass search query, add translation keys for search UI in both id.json and en.json.

# Requirements

### Overview & Goals
Melakukan audit dan perbaikan performa serta aksesibilitas (WCAG 2.1 AA) pada seluruh halaman sundawa-web. Tujuan: meningkatkan skor Lighthouse (Performance, Accessibility, Best Practices, SEO) dan memastikan website dapat diakses oleh pengguna dengan disabilitas.

### Scope

#### In Scope
- **Performance**: Image optimization, code splitting, lazy loading, animation optimization, font loading strategy
- **Accessibility (a11y)**: ARIA labels, keyboard navigation, focus management, color contrast, semantic HTML, skip links
- **Best Practices**: Remove inline styles where possible, consolidate to Tailwind utilities, proper `alt` attributes
- **SEO**: Structured data review, meta tags completeness

#### Out of Scope
- Backend API performance
- Content changes (copywriting)
- New feature development
- Turbopack build fix (known upstream issue)

### Key Areas
1. **Image Optimization** — Logo images missing `priority`/`loading` strategy, OG image placeholder
2. **Inline Styles** — Banyak komponen menggunakan inline styles (PortfolioDetail, ServiceDetail, dll) yang mencegah CSS optimization
3. **Accessibility** — Skip navigation link, ARIA labels pada interactive elements, focus indicators, keyboard navigation untuk dialog/modal
4. **Font Loading** — Montserrat fonts loaded but may cause FOIT/FOUT
5. **Animation** — Framer Motion animations may cause performance issues on low-end devices
6. **Color Contrast** — Gold on navy contrast ratios need verification
7. **Semantic HTML** — Proper heading hierarchy, landmark regions, form labels

# Technical Design

### Current Implementation

**Performance Issues Found:**
- 30 client components (excessive `"use client"` — some may not need it)
- Extensive inline styles in `PortfolioDetail.tsx`, `ServiceDetail.tsx`, `AboutPage.tsx`, `ContactPage.tsx`
- All Montserrat font weights (300-900) preloaded, but only 400-700-900 are likely used
- No `loading="lazy"` on images below the fold
- ParticleField runs continuously on homepage
- No `prefers-reduced-motion` support for animations

**Accessibility Issues Found:**
- No skip navigation link
- Navbar uses native `<a href="#...">` — works but no `aria-current` for active state
- `ClientProjectDialog` modal may lack proper focus trap and `aria-modal`
- Form inputs in `ContactPage` need proper `htmlFor` + `id` label associations
- Color contrast: `rgba(248,248,248,0.4)` on `#0E1E30` background needs verification
- No `role="banner"`, `role="main"`, `role="contentinfo"` landmarks (though semantic `<nav>`, `<main>`, `<footer>` may exist)

### Proposed Changes

#### Stage 1: Image & Font Optimization
- **Font loading**: Only preload critical weights (400, 700, 900) in `globals.css`, lazy load rest
- **Images**: Add `loading="lazy"` to below-fold images, ensure `sizes` prop is correct
- **OG Image**: Create a placeholder OG image or remove the reference if not exists

#### Stage 2: Inline Styles to Tailwind Utilities
- Migrate inline styles from `PortfolioDetail.tsx`, `ServiceDetail.tsx`, `AboutPage.tsx`, `ContactPage.tsx` to Tailwind CSS classes or `globals.css` utilities
- Create reusable utility classes for common patterns (card-glass variants, section animations)

#### Stage 3: Accessibility Improvements
- Add skip navigation link component in `src/shared/ui/SkipLink.tsx`
- Inject SkipLink in `app/[locale]/layout.tsx`
- Add `aria-label`, `role`, and `aria-modal` to `ClientProjectDialog`
- Ensure all form inputs have proper label associations
- Add `prefers-reduced-motion` media query support in `globals.css`
- Verify and fix color contrast ratios (minimum 4.5:1 for normal text)
- Add focus-visible styles for keyboard navigation

#### Stage 4: Animation & Performance Optimizations
- Add `prefers-reduced-motion` check in Framer Motion components (disable or simplify animations)
- Optimize ParticleField to pause when not visible (IntersectionObserver)
- Review client component boundaries — convert to server components where possible
- Add `next/dynamic` imports for heavy components (ParticleField, BlogSection)

### File Structure
```
Modified files:
- app/globals.css                    # Font preloads, prefers-reduced-motion, focus styles
- app/[locale]/layout.tsx            # SkipLink injection
- src/features/home/components/Navbar.tsx              # ARIA improvements
- src/features/home/components/ClientProjectDialog.tsx # Focus trap, aria-modal
- src/features/home/components/ParticleFieldClient.tsx # Pause when invisible
- src/features/home/components/HeroSection.tsx         # prefers-reduced-motion
- src/features/portfolio/components/PortfolioDetail.tsx # Inline styles → Tailwind
- src/features/services/components/ServiceDetail.tsx   # Inline styles → Tailwind
- src/features/about/components/AboutPage.tsx          # Inline styles → Tailwind
- src/features/contact/components/ContactPage.tsx      # Inline styles → Tailwind, form labels
- src/shared/ui/SkipLink.tsx               # NEW - Skip navigation link
- src/shared/ui/index.ts                   # Export SkipLink
- next.config.ts                           # Performance headers
```

# Delivery Steps

### ✓ Step 1: Image & Font Optimization
Optimalkan loading font dan gambar untuk mengurangi render-blocking resources.
- **Font reduction skipped**: Font weights 300, 600, dan 800 aktif digunakan di inline styles — tidak bisa dikurangi
- Tambahkan `loading="lazy"` pada gambar di bawah fold (TechIcon, BlogCard, ClientsGrid)
- Verifikasi `sizes` prop pada semua `<Image>` components untuk menghindari layout shift
- **OG image skipped**: Tidak ada referensi OG image di kode, tidak ada file di public folder

### ✓ Step 2: Inline Styles to Tailwind
Migrasikan inline styles ke Tailwind CSS utilities untuk CSS optimization.
- `PortfolioDetail.tsx`: ✓ Konversi semua inline style ke Tailwind classes
- `ServiceDetail.tsx`: ✓ Konversi inline styles ke Tailwind classes
- `AboutPage.tsx`: ✓ Konversi inline styles ke Tailwind classes
- `ContactPage.tsx`: ✓ Konversi inline styles ke Tailwind classes, ditambahkan `htmlFor`/`id` label associations
- Animasi `fadeInUp` tetap inline karena delay dinamis per-item

### ✓ Step 3: Accessibility Improvements
Perbaiki aksesibilitas sesuai WCAG 2.1 AA standards.
- ✓ Buat `src/shared/ui/SkipLink.tsx`, injeksikan di `app/[locale]/layout.tsx` dengan `id="main-content"`
- ✓ Tambahkan focus trap, Escape key handler, `tabIndex={-1}` di `ClientProjectDialog.tsx`
- ✓ Form input `ContactPage.tsx` sudah memiliki `<label htmlFor>` + `id` yang benar
- ✓ Color contrast diperbaiki: `rgba(248,248,248,0.4)` → `0.55` di beberapa tempat
- ✓ `focus-visible` styles + `prefers-reduced-motion` di `globals.css`

### ✓ Step 4: Animation & Performance Optimizations
Optimalkan animasi dan tambahkan dukungan untuk pengguna dengan preferensi reduced motion.
- ✓ `@media (prefers-reduced-motion: reduce)` di `globals.css`
- ✓ `ParticleField.tsx` pause saat tab tidak terlihat + skip jika `prefers-reduced-motion`
- ✓ `next.config.ts` headers: security headers + cache-control untuk `/assets/*`
- ⚠ Client component review skipped — 30 client components sudah sesuai kebutuhan (useState, Framer Motion, dll)
- ⚠ Dynamic imports untuk BlogSection skipped — ParticleField sudah di-dynamic import via ParticleFieldClient