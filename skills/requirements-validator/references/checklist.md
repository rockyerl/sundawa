# requirements-validator: inspection checklist & evidence guide

> Versi 1.0.0. Ini merupakan checklist internal operasional, **bukan kutipan klausul ISO**. Selalu konfirmasi edisi di `../../../standards/registry.json`.

## Test protocol

1. Tuliskan scope, target build, reviewer, data classification dan otorisasi.
2. Buka requirement/reference dari source-of-truth; catat apakah requirement disetujui.
3. Periksa tiap item menggunakan static review, controlled dynamic test atau document sampling sesuai ketersediaan.
4. Simpan evidence ber-ID dengan URI, timestamp, hash bila relevan, dan permission yang tepat.
5. Status hanya `pass` bila evidence mendukung; `not-tested` bila tidak diuji, `not-applicable` memerlukan rationale.
6. Temuan dalam `reports/requirements-validator.json` mengacu ke evidence ID dan standard ID yang benar.

## Detailed controls

| ID | Inspeksi | Metode bukti minimum | Jika gagal/tidak diuji |
|---|---|---|---|
| 01 | ID stabil, owner dan sumber untuk setiap requirement penting. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 02 | Requirement hanya satu perilaku yang bisa diuji dan tidak mengandung konflik. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 03 | Actor/trigger/precondition/action/postcondition dan exception dijelaskan. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 04 | Role, authorization, data sensitivity, retention dan privacy relevan dicakup. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 05 | NFR punya angka/target pengukuran (mis. response latency percentile) yang disetujui. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 06 | Error states, negative flow dan integration failure ditentukan. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 07 | Acceptance criteria objektif dengan pass/fail dan test oracle. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 08 | Dependencies dan business rule priorities diselesaikan atau diangkat sebagai blocker. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 09 | Requirement berubah melalui change control yang terdokumentasi. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 10 | RTM menghubungkan requirement dengan test IDs dan evidences. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |

## Completion criteria

- Tidak ada P0/P1 requirement ambigu yang masuk build tanpa keputusan owner.
- 100% in-scope P0/P1 memiliki ID, acceptance criteria dan test ownership (policy target).
- NFR yang relevan punya ukuran, load profile dan environment.
- RTM dan unresolved decisions tersedia sebelum approval scope.

## Common false positives & safeguards

- Jangan menyelundupkan asumsi AI sebagai keputusan stakeholder.
- Jangan berasumsi regulasi otomatis applicable tanpa jurisdiction/contracts.
- Jangan membuat persyaratan yang mustahil diuji tanpa mengangkat risiko.

## References

- [ISO-29148](https://www.iso.org/standard/72089.html) — 2018
- [ISO-12207](https://www.iso.org/standard/90219.html) — 2026
- [ISO-25010](https://www.iso.org/standard/78176.html) — 2023
- [ISO-27001](https://www.iso.org/standard/27001) — 2022+Amd1:2024

Catatan: material berlisensi tidak dipaketkan. `not-applicable` ditentukan oleh konteks/kebijakan dengan owner sign-off, bukan pilihan default AI.
