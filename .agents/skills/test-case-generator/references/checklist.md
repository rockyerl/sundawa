# test-case-generator: inspection checklist & evidence guide

> Versi 1.0.0. Ini merupakan checklist internal operasional, **bukan kutipan klausul ISO**. Selalu konfirmasi edisi di `../../../standards/registry.json`.

## Test protocol

1. Tuliskan scope, target build, reviewer, data classification dan otorisasi.
2. Buka requirement/reference dari source-of-truth; catat apakah requirement disetujui.
3. Periksa tiap item menggunakan static review, controlled dynamic test atau document sampling sesuai ketersediaan.
4. Simpan evidence ber-ID dengan URI, timestamp, hash bila relevan, dan permission yang tepat.
5. Status hanya `pass` bila evidence mendukung; `not-tested` bila tidak diuji, `not-applicable` memerlukan rationale.
6. Temuan dalam `reports/test-case-generator.json` mengacu ke evidence ID dan standard ID yang benar.

## Detailed controls

| ID | Inspeksi | Metode bukti minimum | Jika gagal/tidak diuji |
|---|---|---|---|
| 01 | Setiap P0/P1 requirement punya minimal satu positive dan satu relevant negative/boundary test. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 02 | Every case memiliki ID, requirement IDs, preconditions, steps dan expected result. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 03 | Input equivalence classes dan boundaries mencakup invalid/empty/max values. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 04 | Role-based security diuji per actor/resource, bukan login saja. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 05 | State transitions meliputi invalid transitions dan retries. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 06 | External dependency timeout/failure recovery dicakup. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 07 | Data test dianonimkan dan cleanup safe. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 08 | NFR performance memiliki workload + percentile/acceptance threshold terukur. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 09 | Test case tidak redundant dan bisa direproduksi independen. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 10 | Generated != executed: semua status baru not-run tanpa bukti pelaksanaan. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |

## Completion criteria

- Tidak ada P0 requirement tanpa test mapping sebelum test plan approved.
- High-risk scenarios, unhappy paths dan role matrix tercakup.
- Tidak ada status pass/fail tanpa test-run evidence.
- Unresolved test oracle dianggap requirement gap dan dieskalasi.

## Common false positives & safeguards

- Jangan menebak hasil output bisnis yang ambigu.
- Jangan memakai production customer data sebagai test fixture.
- Jangan menyamakan banyaknya test dengan kecukupan coverage.

## References

- [ISO-29119](https://www.iso.org/standard/81291.html) — 2022
- [ISO-29148](https://www.iso.org/standard/72089.html) — 2018
- [ISO-25010](https://www.iso.org/standard/78176.html) — 2023
- [OWASP-ASVS](https://asvs.owasp.org/) — 5.0.0
- [WCAG-2.2](https://www.w3.org/TR/WCAG22/) — 2.2 AA target

Catatan: material berlisensi tidak dipaketkan. `not-applicable` ditentukan oleh konteks/kebijakan dengan owner sign-off, bukan pilihan default AI.
