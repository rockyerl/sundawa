# ui-ux-auditor: inspection checklist & evidence guide

> Versi 1.0.0. Ini merupakan checklist internal operasional, **bukan kutipan klausul ISO**. Selalu konfirmasi edisi di `../../../standards/registry.json`.

## Test protocol

1. Tuliskan scope, target build, reviewer, data classification dan otorisasi.
2. Buka requirement/reference dari source-of-truth; catat apakah requirement disetujui.
3. Periksa tiap item menggunakan static review, controlled dynamic test atau document sampling sesuai ketersediaan.
4. Simpan evidence ber-ID dengan URI, timestamp, hash bila relevan, dan permission yang tepat.
5. Status hanya `pass` bila evidence mendukung; `not-tested` bila tidak diuji, `not-applicable` memerlukan rationale.
6. Temuan dalam `reports/ui-ux-auditor.json` mengacu ke evidence ID dan standard ID yang benar.

## Detailed controls

| ID | Inspeksi | Metode bukti minimum | Jika gagal/tidak diuji |
|---|---|---|---|
| 01 | Critical task memiliki awal/akhir dan success definition yang jelas. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 02 | Navigasi pengguna tidak memerlukan ingatan berlebih atau istilah internal. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 03 | Action status dan form errors dapat dipahami tanpa warna saja. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 04 | Keyboard focus dapat mencapai/keluar dari modal dan menu tanpa trap. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 05 | Form mempunyai label, help, validasi dan error recovery yang layak. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 06 | Contrast, reflow 320 CSS px, zoom, pointer target dipertimbangkan sesuai criterion applicable. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 07 | Accessible name dan semantics divalidasi, bukan hanya melihat HTML tags. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 08 | Loading, timeout, permission denied dan offline flow ditinjau. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 09 | Screen reader review dilakukan bila tool/akses tersedia; jika tidak jelas not-tested. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 10 | Tidak mengklaim WCAG AA dari hanya hasil scanner otomatis. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |

## Completion criteria

- Tidak ada confirmed critical/high accessibility failure pada alur wajib sesuai risk profile.
- Setiap finding menyebut user impact, criterion/heuristic, reproduksi dan evidence.
- Hasil automated scan tidak menggantikan manual review atau pengujian manusia.
- Tugas yang tidak dapat diuji dicantumkan sebagai limitation dan gate not-tested.

## Common false positives & safeguards

- Hindari memperkirakan conversion uplift tanpa eksperimen.
- Jangan mengarang hasil screen reader atau participant sessions.
- Perhatikan privacy sebelum memakai rekaman pengguna.

## References

- [ISO-9241-210](https://www.iso.org/standard/77520.html) — 2019
- [ISO-25010](https://www.iso.org/standard/78176.html) — 2023
- [WCAG-2.2](https://www.w3.org/TR/WCAG22/) — 2.2 AA target
- [ISO-40500](https://www.w3.org/WAI/news/2025-10-21/wcag22-iso/) — 2025
- [ISO-29148](https://www.iso.org/standard/72089.html) — 2018

Catatan: material berlisensi tidak dipaketkan. `not-applicable` ditentukan oleh konteks/kebijakan dengan owner sign-off, bukan pilihan default AI.
