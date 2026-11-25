# database-auditor: inspection checklist & evidence guide

> Versi 1.0.0. Ini merupakan checklist internal operasional, **bukan kutipan klausul ISO**. Selalu konfirmasi edisi di `../../../standards/registry.json`.

## Test protocol

1. Tuliskan scope, target build, reviewer, data classification dan otorisasi.
2. Buka requirement/reference dari source-of-truth; catat apakah requirement disetujui.
3. Periksa tiap item menggunakan static review, controlled dynamic test atau document sampling sesuai ketersediaan.
4. Simpan evidence ber-ID dengan URI, timestamp, hash bila relevan, dan permission yang tepat.
5. Status hanya `pass` bila evidence mendukung; `not-tested` bila tidak diuji, `not-applicable` memerlukan rationale.
6. Temuan dalam `reports/database-auditor.json` mengacu ke evidence ID dan standard ID yang benar.

## Detailed controls

| ID | Inspeksi | Metode bukti minimum | Jika gagal/tidak diuji |
|---|---|---|---|
| 01 | PK/FK/unique/check constraints mendukung invariant bisnis. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 02 | Query memakai parameterization/binding dan least-privileged credentials. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 03 | Index dipilih dari workload nyata, write amplification dan biaya dipertimbangkan. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 04 | Setiap optimasi mempunyai before/after benchmark dengan workload setara. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 05 | N+1 dan unbounded reads di critical flow dihindari. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 06 | Transactions menjamin consistency untuk konkurensi yang relevan. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 07 | PII data at-rest/in-transit/access/retention dinilai. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 08 | Migration aman untuk rolling deployment dan repeatability. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 09 | Backup dapat dipulihkan; RPO/RTO berbasis target disetujui. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 10 | Tidak ada destructive schema action tanpa explicit change request. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |

## Completion criteria

- No migration critical tanpa backup/rollback atau forward recovery plan.
- No confirmed high/critical integrity leak atau privilege risk terbuka.
- Performance claim mencantumkan query, plan, stats, dataset, before/after.
- Schema dan migration diuji terhadap data representatif tanpa PII mentah.

## Common false positives & safeguards

- Jangan memilih index berdasarkan folklore tanpa metrik.
- Jangan menjalankan EXPLAIN ANALYZE berat di production tanpa izin.
- Jangan memindahkan data sensitif ke perangkat pribadi.

## References

- [ISO-25010](https://www.iso.org/standard/78176.html) — 2023
- [ISO-27001](https://www.iso.org/standard/27001) — 2022+Amd1:2024
- [ISO-27701](https://www.iso.org/standard/27701) — 2025
- [NIST-SSDF](https://csrc.nist.gov/pubs/sp/800/218/final) — 1.1 final
- [ISO-12207](https://www.iso.org/standard/90219.html) — 2026

Catatan: material berlisensi tidak dipaketkan. `not-applicable` ditentukan oleh konteks/kebijakan dengan owner sign-off, bukan pilihan default AI.
