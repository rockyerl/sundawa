# architecture-reviewer: inspection checklist & evidence guide

> Versi 1.0.0. Ini merupakan checklist internal operasional, **bukan kutipan klausul ISO**. Selalu konfirmasi edisi di `../../../standards/registry.json`.

## Test protocol

1. Tuliskan scope, target build, reviewer, data classification dan otorisasi.
2. Buka requirement/reference dari source-of-truth; catat apakah requirement disetujui.
3. Periksa tiap item menggunakan static review, controlled dynamic test atau document sampling sesuai ketersediaan.
4. Simpan evidence ber-ID dengan URI, timestamp, hash bila relevan, dan permission yang tepat.
5. Status hanya `pass` bila evidence mendukung; `not-tested` bila tidak diuji, `not-applicable` memerlukan rationale.
6. Temuan dalam `reports/architecture-reviewer.json` mengacu ke evidence ID dan standard ID yang benar.

## Detailed controls

| ID | Inspeksi | Metode bukti minimum | Jika gagal/tidak diuji |
|---|---|---|---|
| 01 | Views menunjukkan scope, stakeholder, version dan viewpoint yang relevan. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 02 | Ownership/tenant boundary konsisten pada data dan API. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 03 | Backpressure, rate limits, retries, timeouts dan idempotency dirancang. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 04 | Capacity estimate memiliki asumsi volume, load shape dan bottlenecks. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 05 | Data integrity, restore, backup dan RPO/RTO dirinci bila relevan. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 06 | Security model memuat attack surface, authn/authz dan secrets management. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 07 | Dependencies critical mempunyai fallback atau documented accepted risk. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 08 | NFR dapat diverifikasi melalui measurable test plan. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 09 | Keputusan penting tercatat dalam ADR dengan alternatives dan rationale. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 10 | Rollout, schema evolution, compatibility dan rollback dirancang. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |

## Completion criteria

- High-risk design decisions punya ADR, owner dan reviewer.
- No unowned critical trust boundary or single point of failure tanpa treatment.
- Tiap NFR prioritas punya skenario tes dan environment assumptions.
- Unknown kapasitas/biaya diberi range atau eksperimen, bukan angka fiktif.

## Common false positives & safeguards

- Jangan memilih microservices hanya karena trend.
- Jangan menyamakan generic reference architecture dengan kondisi actual.
- Jangan mengklaim throughput tanpa benchmark.

## References

- [ISO-42010](https://www.iso.org/standard/74393.html) — 2022
- [ISO-25010](https://www.iso.org/standard/78176.html) — 2023
- [ISO-12207](https://www.iso.org/standard/90219.html) — 2026
- [NIST-SSDF](https://csrc.nist.gov/pubs/sp/800/218/final) — 1.1 final
- [ISO-27001](https://www.iso.org/standard/27001) — 2022+Amd1:2024

Catatan: material berlisensi tidak dipaketkan. `not-applicable` ditentukan oleh konteks/kebijakan dengan owner sign-off, bukan pilihan default AI.
