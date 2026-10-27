---
sessionId: session-261027-105203-12mr
---

# Requirements

### Overview & Goals
Mengubah sundawa-web menjadi Progressive Web App (PWA) yang dapat diinstal di perangkat mobile, berfungsi offline, dan memberikan pengalaman seperti aplikasi native.

### Scope

#### In Scope
- **Web App Manifest** — manifest.json dengan branding Sundawa, tema warna, dan ikon
- **Service Worker** — Cache-first strategy untuk static assets, network-first untuk API
- **Installability** — "Add to Home Screen" prompt di browser yang mendukung
- **Offline Fallback** — Halaman offline saat tidak ada koneksi
- **PWA Icons** — Ikon 192x192 dan 512x512 dari logo existing

#### Out of Scope
- Push notifications
- Background sync
- Advanced caching strategies

### Key Areas
1. **Manifest** — Branding, tema warna (dark navy), start URL, display mode
2. **Service Worker** — Workbox-based caching untuk assets, fonts, images
3. **Offline Page** — Fallback dengan branding Sundawa
4. **Icons** — Generate dari logo existing (logo2.png)

# Technical Design

### Current Implementation

**PWA Status:**
- Tidak ada manifest.json atau service worker
- Logo existing di `public/logo.png` dan `public/assets/logo2.png` bisa digunakan untuk ikon PWA
- Layout sudah memiliki `viewport` meta dan `themeColor` (#0E1E30)
- next.config.ts sudah memiliki cache-control headers untuk `/assets/*`

### Proposed Changes

#### Stage 1: Web App Manifest & Icons
- Buat `public/manifest.json` dengan Sundawa branding
- Generate ikon PWA (192x192, 512x512) dari `public/assets/logo2.png`
- Tambahkan manifest link di `app/[locale]/layout.tsx`
- Theme colors: `#0E1E30` (background), `#DBC977` (accent)

#### Stage 2: Service Worker
- Buat `public/sw.js` menggunakan Workbox CDN
- Cache-first strategy untuk static assets (images, fonts, CSS, JS)
- Network-first untuk API routes
- Register service worker di layout via script

#### Stage 3: Offline Support & Install Prompt
- Buat `app/offline/page.tsx` sebagai fallback offline
- Buat `src/shared/ui/InstallPrompt.tsx` untuk install banner (optional)
- Update `next.config.ts` untuk service worker handling
- Validasi dengan Lighthouse PWA audit

### File Structure
```
Modified files:
- app/[locale]/layout.tsx              # Add manifest link, SW registration
- next.config.ts                       # SW handling headers

New files:
- public/manifest.json                 # Web app manifest
- public/sw.js                         # Service worker
- public/icons/icon-192x192.png        # PWA icon 192x192
- public/icons/icon-512x512.png        # PWA icon 512x512
- app/offline/page.tsx                 # Offline fallback page
- src/shared/ui/InstallPrompt.tsx      # Install prompt component
```

# Delivery Steps

### ✓ Step 1: Create Web App Manifest and Icons
Buat manifest.json dan ikon PWA dari logo existing.
- ✓ Buat `public/manifest.json` dengan nama app, deskripsi, tema warna, dan start URL
- ✓ Generate ikon PWA (192x192 dan 512x512) dari `public/assets/logo2.png` menggunakan Sharp
- ✓ Tambahkan link manifest di `app/[locale]/layout.tsx` dalam metadata icons
- ✓ ThemeColor meta tag sudah benar (#0E1E30)

### ✓ Step 2: Implement Service Worker
Buat dan register service worker untuk caching.
- ✓ Buat `public/sw.js` menggunakan native Cache API untuk cache-first strategy
- ✓ Konfigurasi caching: cache-first untuk images/fonts, network-first untuk API dan navigasi
- ✓ Register service worker di layout via `PWARegister` client component
- ⚠ Workbox CDN tidak digunakan — native Cache API lebih ringan dan tidak memerlukan build step

### ✓ Step 3: Add Offline Support and Install Prompt
Tambahkan halaman offline dan komponen install prompt.
- ✓ Buat `app/offline/page.tsx` dengan branding Sundawa sebagai fallback offline
- ✓ Buat `src/shared/ui/InstallPrompt.tsx` untuk banner install di browser yang mendukung
- ✓ Export InstallPrompt di `src/shared/ui/index.ts`
- ✓ Tambahkan headers untuk `/sw.js` dan `/manifest.json` di `next.config.ts`
- ⚠ Validasi Lighthouse PWA audit memerlukan deployment atau build production
