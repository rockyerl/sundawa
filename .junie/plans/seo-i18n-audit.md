---
sessionId: session-261027-105203-12mr
---

# Requirements

### Overview & Goals
Melakukan audit mendalam SEO dan i18n (internationalization) pada seluruh halaman sundawa-web. Tujuan: memastikan semua halaman memiliki metadata lengkap, structured data (JSON-LD) yang benar, hreflang yang tepat, sitemap yang komprehensif, serta paritas terjemahan 100% antara `id.json` dan `en.json`.

### Scope

#### In Scope
- **Missing assets**: OG image, favicons yang direferensikan tapi tidak ada
- **Sitemap**: Menambahkan halaman statis yang hilang (portfolio, services, about, contact)
- **Structured Data (JSON-LD)**: Organization schema review, menambahkan WebPage schema per halaman
- **Meta tags**: Validasi canonical URLs, hreflang, Open Graph, Twitter cards
- **i18n parity**: Memastikan semua key di `id.json` ada di `en.json` dan sebaliknya
- **Google Search Console**: Verifikasi token sudah terpasang
- **Robots.txt**: Review dan optimasi

#### Out of Scope
- Konten copywriting
- Backend API changes
- Performance optimizations (sudah dilakukan di audit sebelumnya)

### Key Areas
1. **Missing OG Image** — `/og-image.png` direferensikan di layout dan BlogPostDetail tapi tidak ada
2. **Missing Favicons** — `/favicon.ico`, `/favicon-16x16.png`, `/favicon-32x32.png`, `/apple-touch-icon.png` tidak ada
3. **Incomplete Sitemap** — Hanya home, outsource, proses-kerja, blog — missing: portfolio, services, about, contact
4. **Structured Data** — Hanya Organization + WebSite di layout, BlogPosting di blog post — tidak ada WebPage schema per halaman
5. **Google Verification** — File sudah ada, tapi `verification` di layout masih placeholder
6. **i18n Key Parity** — Perlu validasi semua key di `id.json` ada di `en.json`

# Technical Design

### Current Implementation

**SEO Status:**
- `lib/Seo.ts`: Helper `pageMetadata()` untuk 8 page keys (home, outsource, process, blog, portfolio, contact, about, services)
- `lib/Sitemap.ts`: Hanya 4 static paths (`'', '/outsource', '/proses-kerja', '/blog'`) — missing portfolio, services, about, contact
- `app/sitemap.ts`: Dynamic sitemap dengan blog post slugs dari Sanity
- `app/Robots.ts`: Basic robots, allow all
- `app/[locale]/layout.tsx`: Organization + WebSite JSON-LD, tapi referensi `/og-image.png` yang tidak ada
- `src/features/blog/components/BlogPostDetail.tsx`: BlogPosting JSON-LD, referensi `/og-image.png`
- Google verification file: `public/google5af37c72f9949e81.html` sudah ada
- Layout metadata: `verification` masih placeholder comment

**i18n Status:**
- `messages/id.json`: 901 lines, lengkap dengan meta keys untuk 8 halaman
- `messages/en.json`: 901 lines, struktur mirror id.json
- Routing: `localePrefix: 'always'` — semua URL selalu `/id/` atau `/en/`
- `buildAlternates()`: Canonical + hreflang sudah benar

### Proposed Changes

#### Stage 1: Fix Missing Assets
- **OG Image**: Generate `/og-image.png` (1200x630) dari logo2.png menggunakan Sharp, atau hapus referensi jika tidak feasible
- **Favicons**: Generate `/favicon.ico`, `/favicon-16x16.png`, `/favicon-32x32.png`, `/apple-touch-icon.png` dari logo2.png
- **Update references**: Pastikan semua referensi gambar valid

#### Stage 2: Complete Sitemap
- Tambahkan `/portfolio`, `/services`, `/about`, `/contact` ke `staticSitemapPaths` di `lib/Sitemap.ts`
- Pastikan priority dan changeFrequency sesuai

#### Stage 3: Structured Data Enhancements
- **Layout JSON-LD**: Tambahkan `ContactPoint` dan lengkapi Organization schema
- **Per-page JSON-LD**: Tambahkan WebPage schema di halaman utama (home, about, services, portfolio, contact)
- **BlogPostDetail**: Sudah ada BlogPosting — pastikan lengkap dengan author dan publisher

#### Stage 4: Google Search Console Verification
- Ekstrak token dari `google5af37c72f9949e81.html` dan pasang di layout metadata `verification.google`
- Hapus placeholder comment

#### Stage 5: i18n Key Parity Check
- Validasi semua key di `id.json` ada di `en.json`
- Validasi semua key di `en.json` ada di `id.json`
- Perbaiki jika ada yang hilang

#### Stage 6: Robots.txt Optimization
- Tambahkan disallow untuk `/offline` path
- Pastikan sitemap URL benar

### File Structure
```
Modified files:
- lib/Sitemap.ts                    # Add missing static paths
- app/[locale]/layout.tsx           # Google verification, JSON-LD enhancements
- app/Robots.ts                     # Disallow /offline
- messages/id.json                  # Fix missing keys (if any)
- messages/en.json                  # Fix missing keys (if any)

New files:
- public/og-image.png               # OG image 1200x630
- public/favicon.ico                # Favicon ICO
- public/favicon-16x16.png          # Favicon 16x16
- public/favicon-32x32.png          # Favicon 32x32
- public/apple-touch-icon.png       # Apple touch icon 180x180
```

# Delivery Steps

### ✓ Step 1: Fix Missing Assets
Generate OG image dan favicons dari logo2.png yang sudah ada.
- ✓ Generate `/og-image.png` (1200x630) dari `public/assets/logo2.png`
- ✓ Generate favicons: `/favicon.ico`, `/favicon-16x16.png`, `/favicon-32x32.png`, `/apple-touch-icon.png`
- ✓ Favicon ICO menggunakan PNG fallback karena Sharp tidak support format ICO

### ✓ Step 2: Complete Sitemap
Tambahkan halaman statis yang hilang ke sitemap.
- ✓ Tambahkan `/portfolio`, `/services`, `/about`, `/contact` ke `staticSitemapPaths`
- ✓ Priority sudah benar: home = 1, halaman lain = 0.7
- ✓ Change frequency: blog = weekly, lainnya = monthly

### ✓ Step 3: Structured Data Enhancements
Perbaiki dan lengkapi JSON-LD structured data.
- ✓ Tambahkan `ContactPoint` di Organization schema (telephone, contactType, areaServed, availableLanguage)
- ✓ Tambahkan `potentialAction` (SearchAction) di WebSite schema
- ✓ BlogPosting JSON-LD sudah lengkap di BlogPostDetail

### ✓ Step 4: Google Search Console Verification
Pasang Google verification token di layout metadata.
- ✓ Token diekstrak dari `public/google5af37c72f9949e81.html`: `5af37c72f9949e81`
- ✓ Dipasang di `verification.google` di layout metadata
- ✓ Placeholder comment dihapus

### ✓ Step 5: i18n Key Parity Check
Validasi paritas terjemahan antara id.json dan en.json.
- ✓ Semua 226 key cocok antara id.json dan en.json
- ✓ Tidak ada key yang hilang di salah satu file
- ✓ Meta keys lengkap untuk semua 8 halaman

### ✓ Step 6: Robots.txt Optimization
Optimasi robots.txt untuk SEO yang lebih baik.
- ✓ Tambahkan disallow untuk `/offline` path
- ✓ Sitemap URL sudah benar: `${SITE_URL}/sitemap.xml`
- ✓ Run `npm run check` untuk validasi final
