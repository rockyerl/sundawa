# iso27001-gap-auditor: inspection checklist & evidence guide

> Versi 1.0.0. Ini merupakan checklist internal operasional, **bukan kutipan klausul ISO**. Selalu konfirmasi edisi di `../../../standards/registry.json`.

## Test protocol

1. Tuliskan scope, target build, reviewer, data classification dan otorisasi.
2. Buka requirement/reference dari source-of-truth; catat apakah requirement disetujui.
3. Periksa tiap item menggunakan static review, controlled dynamic test atau document sampling sesuai ketersediaan.
4. Simpan evidence ber-ID dengan URI, timestamp, hash bila relevan, dan permission yang tepat.
5. Status hanya `pass` bila evidence mendukung; `not-tested` bila tidak diuji, `not-applicable` memerlukan rationale.
6. Temuan dalam `reports/iso27001-gap-auditor.json` mengacu ke evidence ID dan standard ID yang benar.

## Detailed controls

| ID | Inspeksi | Metode bukti minimum | Jika gagal/tidak diuji |
|---|---|---|---|
| 01 | ISMS scope eksplisit, disetujui dan tidak terlalu sempit secara tidak wajar. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 02 | Risk assessment methodology, criteria dan residual risk owners tercatat. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 03 | SoA konsisten dengan risk treatment dan exclusions punya alasan. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 04 | Control applicability diverifikasi terhadap edisi resmi, bukan daftar internet tak tervalidasi. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 05 | Policy approval, training, access, supplier, incident dan continuity punya bukti praktik. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 06 | Annex A tidak menggantikan pemeriksaan management system clauses. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 07 | Record memiliki owner, valid period, scope, authenticity dan sampling. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 08 | Ineffective implementation dipisahkan dari missing document. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 09 | Exceptions/risk acceptances punya authority, rationale dan expiry. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 10 | Audit results tidak menyatakan certification atau opini auditor sertifikasi. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |

## Completion criteria

- Tidak ada klaim compliant tanpa cakupan dan evidence sampling cukup.
- Setiap kontrol diperiksa mempunyai source_verified, owner, applicable, gap, action.
- Missing evidence => not-assessed / gap (bukan implemented).
- Critical unowned risks dan invalid SoA ditandai blocker readiness.

## Common false positives & safeguards

- Jangan salin teks lengkap ISO berlisensi ke repository.
- Jangan mengarang Annex A control IDs/detail dari ingatan.
- Audit keamanan organisasi tidak sama dengan audit source code tunggal.

## References

- [ISO-27001](https://www.iso.org/standard/27001) — 2022+Amd1:2024
- [ISO-27002](https://www.iso.org/standard/75652.html) — 2022
- [ISO-19011](https://www.iso.org/standard/19011) — 2026
- [ISO-9001](https://www.iso.org/9001-2026) — 2026
- [ISO-27701](https://www.iso.org/standard/27701) — 2025

Catatan: material berlisensi tidak dipaketkan. `not-applicable` ditentukan oleh konteks/kebijakan dengan owner sign-off, bukan pilihan default AI.
