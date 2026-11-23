# visual-antislop: inspection checklist & evidence guide

> Versi 1.0.0. Ini merupakan checklist internal operasional, **bukan kutipan klausul ISO**. Selalu konfirmasi edisi di `../../../standards/registry.json`.

## Test protocol

1. Tuliskan scope, target build, reviewer, data classification dan otorisasi.
2. Buka requirement/reference dari source-of-truth; catat apakah requirement disetujui.
3. Periksa tiap item menggunakan static review, controlled dynamic test atau document sampling sesuai ketersediaan.
4. Simpan evidence ber-ID dengan URI, timestamp, hash bila relevan, dan permission yang tepat.
5. Status hanya `pass` bila evidence mendukung; `not-tested` bila tidak diuji, `not-applicable` memerlukan rationale.
6. Temuan dalam `reports/visual-antislop.json` mengacu ke evidence ID dan standard ID yang benar.

## Detailed controls

| ID | Inspeksi | Metode bukti minimum | Jika gagal/tidak diuji |
|---|---|---|---|
| 01 | Hierarchy tampak jelas dalam 5 detik tanpa mengandalkan heading dekoratif. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 02 | Tipografi mengikuti skala dan density yang konsisten. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 03 | Spacing, grid, alignment dan icon stroke konsisten lintas layar. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 04 | Warna memiliki semantic role (action, feedback, warning), bukan sekadar ornamen. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 05 | CTA utama tidak berebut perhatian dengan secondary action. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 06 | Komponen mendukung hover, focus, disabled, loading, error, empty, success. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 07 | Konten placeholder dan klaim palsu tidak tersisa di release. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 08 | Responsive layout diuji pada breakpoint yang disepakati dan konten panjang. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 09 | Desain memperhatikan readability, contrast dan accessible names. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 10 | Aset visual terkait konteks bisnis dan memenuhi lisensi/brand guideline. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |

## Completion criteria

- Screenshot before/after atau token-level diff untuk tiap temuan confirmed.
- UI critical flows tidak memiliki blocker aksesibilitas, navigasi atau misleading CTA.
- Perubahan menjaga identitas brand; alasan untuk setiap penyimpangan dicatat.
- Proposal estetika tanpa evidence diberi label suggestion, bukan confirmed defect.

## Common false positives & safeguards

- Jangan otomatis menghapus gaya khas brand hanya karena tampak berbeda.
- Jangan mengklaim hasil A/B test atau user preference tanpa riset nyata.
- Jangan membuat screenshot/hasil browser palsu jika tidak ada tool.

## References

- [ISO-9241-210](https://www.iso.org/standard/77520.html) — 2019
- [ISO-25010](https://www.iso.org/standard/78176.html) — 2023
- [WCAG-2.2](https://www.w3.org/TR/WCAG22/) — 2.2 AA target
- [ISO-40500](https://www.w3.org/WAI/news/2025-10-21/wcag22-iso/) — 2025

Catatan: material berlisensi tidak dipaketkan. `not-applicable` ditentukan oleh konteks/kebijakan dengan owner sign-off, bukan pilihan default AI.
