# audit-evidence-validator: inspection checklist & evidence guide

> Versi 1.0.0. Ini merupakan checklist internal operasional, **bukan kutipan klausul ISO**. Selalu konfirmasi edisi di `../../../standards/registry.json`.

## Test protocol

1. Tuliskan scope, target build, reviewer, data classification dan otorisasi.
2. Buka requirement/reference dari source-of-truth; catat apakah requirement disetujui.
3. Periksa tiap item menggunakan static review, controlled dynamic test atau document sampling sesuai ketersediaan.
4. Simpan evidence ber-ID dengan URI, timestamp, hash bila relevan, dan permission yang tepat.
5. Status hanya `pass` bila evidence mendukung; `not-tested` bila tidak diuji, `not-applicable` memerlukan rationale.
6. Temuan dalam `reports/audit-evidence-validator.json` mengacu ke evidence ID dan standard ID yang benar.

## Detailed controls

| ID | Inspeksi | Metode bukti minimum | Jika gagal/tidak diuji |
|---|---|---|---|
| 01 | Evidence URL/ID dapat diakses reviewer yang berwenang. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 02 | Timestamps dan author/source tercatat; tidak ada screenshots tanpa konteks. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 03 | Commit/build/config metadata cocok dengan audited target. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 04 | Hash/integrity proof dicatat jika required oleh policy atau chain-of-custody. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 05 | Sample meliputi operasi nyata, bukan hanya template SOP. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 06 | Claims menautkan bukti yang benar-benar menguji assertion terkait. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 07 | Evidence snapshot tidak kedaluwarsa terhadap release date atau control changes. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 08 | Conflicting evidence dikelola sebagai unresolved, bukan disembunyikan. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 09 | Sensitive content di-redact dan raw evidence disimpan secure. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 10 | N/A, waiver dan accepted risk memiliki approval dan expiry yang valid. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |

## Completion criteria

- No critical claim tanpa evidence yang relevan, valid dan traceable.
- No fabricated, stale atau inaccessible artifacts dipakai sebagai PASS.
- Evidence deficiencies menghasilkan fail/not-tested dan follow-up owner.
- Penilaian evidence menuliskan scope, sampling, keterbatasan dan reviewer.

## Common false positives & safeguards

- Jangan mengubah timestamps, hash atau log untuk cocok dengan requirement.
- Jangan memberikan akses evidence restricted tanpa authorization.
- Jangan menganggap attachment atau screenshot sendiri sebagai bukti memadai.

## References

- [ISO-19011](https://www.iso.org/standard/19011) — 2026
- [ISO-27001](https://www.iso.org/standard/27001) — 2022+Amd1:2024
- [ISO-9001](https://www.iso.org/9001-2026) — 2026
- [NIST-SSDF](https://csrc.nist.gov/pubs/sp/800/218/final) — 1.1 final
- [ISO-12207](https://www.iso.org/standard/90219.html) — 2026

Catatan: material berlisensi tidak dipaketkan. `not-applicable` ditentukan oleh konteks/kebijakan dengan owner sign-off, bukan pilihan default AI.
