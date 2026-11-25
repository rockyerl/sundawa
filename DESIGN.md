# DESIGN.md — Sundawa Teknologi Design Direction

> Dokumen arah desain tunggal (*source of design direction*) untuk Sundawa Web (`sundawa.net`).
> Digunakan oleh AI coding agents bersama dengan `antislop.md` sebagai filter kualitas.

---

## 1. Identity & Personality

- **Identity**: PT Sundawa Teknologi Indonesia — Software House & High-Precision Engineering Studio berbasis di Bandung.
- **Audience**: Direktur Operasional, CTO, VP of Engineering, pemilik bisnis korporat, dan pengambil keputusan teknis yang mencari mitra rekayasa perangkat lunak misi-kritis.
- **Personality**:
  - **Stoik & Membumi**: Tidak memakai gaya bahasa startup yang meledak-ledak.
  - **Otoritatif & Berpresisi**: Berbicara berbasis arsitektur, kriteria penerimaan tertulis, dan metrik yang dapat dipertanggungjawabkan.
  - **Quiet Confidence**: Desain yang elegan, bersih, dan berwibawa tanpa perlu berteriak dengan animasi yang mengganggu.

---

## 2. The Three Dials

Sesuai aturan `antislop.md`, nilai dial default untuk seluruh antarmuka Sundawa Web adalah:

| Dial | Level | Penjelasan & Implementasi |
| :--- | :--- | :--- |
| **ENERGY** | **2 (Balanced)** | Setara dengan Linear / Stripe. Berwibawa, solid, bersih, tidak dingin/kering, tetapi tidak bising seperti Awwwards agency portfolio. |
| **RHYTHM** | **2 (Balanced)** | Tata letak berstruktur dengan variasi ritme yang terencana. Menghindari template AI seragam (*hero + 3 kartu bento*). Setiap seksi memiliki komposisi visual tersendiri. |
| **MOTION** | **2 (Balanced)** | Transisi halus, *hover states* responsif, *scroll-reveal* ringan. **Wajib instan di mobile** tanpa menahan render elemen kritis (*LCP zero-block*). Menghormati `prefers-reduced-motion`. |

---

## 3. Color Palette & Contrast Standards

Sundawa menggunakan palet gelap arsitektural (*dark architectural palette*):

### Warna Utama
- **Void Dark Navy (Background Dasar)**: `#020C1B` (latar terdalam) dan `#0A192F` (permukaan utama).
- **Elevated Navy Surface**: `#0E1E30` dan `rgba(29, 52, 81, 0.4)` untuk kontainer kartu dan panel.
- **Antique Brass / Sundawa Gold (Aksen Primer)**: `#DBC977` (aksen emas utama), `#FFD700` (highlight), `#F59E0B` (amber).
- **Off-white Cream (Teks Primer)**: `#F8F8F8` (kontras tinggi di atas navy gelap).
- **Engineering Sky Blue (Indikator Teknis)**: `#38BDF8` / `#00F0FF` (digunakan secara eksklusif untuk status sistem, telemetri, dan tag protokol teknis).

### Aturan Kontras (WCAG AA Compliance)
- Teks paragraf umum wajib memiliki kontras minimal **4.5:1** terhadap latar belakang (`#F8F8F8` dengan opacity minimal 70% atau kelas `text-cream/75+`).
- Teks berukuran kecil / keterangan teknis tidak boleh menggunakan opacity di bawah `45%` jika tidak memiliki kontras yang memadai.
- Dilarang membuat teks emas tipis di atas latar terang, atau teks biru redup di atas hitam pekat.

---

## 4. Typography

- **Font Family**: Montserrat (`@fontsource/montserrat`, `font-sans`).
- **Heading Utama (H1/H2)**: `font-black` (900), *tight letter-spacing* (`-0.02em` hingga `-0.03em`), *line-height* proporsional (1.1 - 1.2).
- **Label Teknis / Eyebrow**: `text-[10px]` hingga `text-xs`, `font-bold` atau `font-black`, *uppercase*, *wide tracking* (`0.15em` hingga `0.25em`), warna `#DBC977` atau `#38BDF8`.
- **Teks Tubuh (Body)**: `font-light` (300) atau `font-normal` (400), `text-sm` hingga `text-base`, *relaxed line-height* (1.6 - 1.7), warna `#F8F8F8/75` hingga `#F8F8F8/90`.

---

## 5. Visual Discipline & Anti-Slop Constraints

1. **Bentuk & Sudut Arsitektural**:
   - Sudut terpotong (*chamfered / clipped polygon corner*) adalah ciri khas Sundawa (`clipPath: polygon(...)`). Gunakan secara bermakna pada kartu identitas utama (misal kontak atau hero), jangan dipaksakan ke seluruh elemen kecil.
   - Hindari tombol/kartu berbentuk kapsul (*full pill border-radius*) berlebih. Gunakan radius terukur (`rounded-lg` atau `rounded-sm`).
2. **Penggunaan Border & Glow**:
   - Garis pembatas tipis (`border border-gold/15` atau `border-gold/25`) digunakan untuk menegaskan bidang arsitektur.
   - Efek glow/bayangan lembut dibatasi hanya sebagai respons interaktif *hover state*, bukan dipasang permanen di setiap elemen yang membuat halaman tampak melayang tak berpijak.
3. **Penyusunan Konten (Content-Driven)**:
   - Setiap seksi harus lahir dari kebutuhan nyata produk/layanan, bukan template AI.
   - Hindari *"How It Works"* yang selalu dipaksakan 3 langkah dengan icon bulat, dan hindari bento-grid acak.
   - Setiap metrik/angka wajib mencantumkan konteks audit atau label `[Simulasi]` / `[Pengujian Demo]` secara jujur dan transparan.
4. **Ergonomi Mobile**:
   - Seluruh target interaktif (tombol, link, switch) memiliki ukuran sentuh minimal **44x44px**.
   - Bebas *horizontal scroll/overflow* yang merusak tata letak di smartphone.

---

## 6. UI/UX Pro Max Intelligence & Ergonomic Rules

Repository ini mengintegrasikan standar kecerdasan desain dari framework **UI/UX Pro Max** (`.agents/skills/ui-ux-pro-max/`):

1. **Pemberhentian Scroll Navigasi (Anchor Jump Clearance)**:
   - Setiap seksi ber-ID (`section[id]`) wajib memiliki `scroll-margin-top: 5.5rem` di `app/globals.css` berpasangan dengan `scroll-padding-top: 5rem` pada `html`.
   - Mencegah header seksi terpotong atau tertutup oleh navigasi melayang (*sticky navbar*) saat pengguna melompat melalui tautan menu (`#services`, `#products`, `#clients`, `#contact`).

2. **Keseimbangan Tipografi & Pencegahan Orphan (`text-wrap: balance`)**:
   - Seluruh elemen judul (`h1`, `h2`, `h3`) diatur dengan `text-wrap: balance` native CSS.
   - Mengeliminasi kata tunggal yang menggantung di baris terakhir (*typographic orphan*) pada viewport tablet dan seluler tanpa perlu manual `<br />`.

3. **Semantik & Aksesibilitas Asistif (WCAG 2.2 AA)**:
   - **Ikon Dekoratif**: Seluruh ikon grafis yang mendampingi teks eksplisit wajib menyematkan `aria-hidden="true"` agar tidak dibaca ganda oleh *screen reader*.
   - **Status Alert Formulir**: Pesan kesalahan atau umpan balik formulir dinamis wajib mengimplementasikan `role="alert"` dan `aria-live="assertive"` disertai ikon peringatan (`AlertCircle`).
   - **Semantik Pencarian**: Input pencarian arsip/katalog menggunakan `type="search"`, `aria-label`, serta menonaktifkan koreksi otomatis (`autoComplete="off"`, `autoCorrect="off"`, `spellCheck={false}`) untuk menjaga kenyamanan saat mencari kata kunci teknis.

