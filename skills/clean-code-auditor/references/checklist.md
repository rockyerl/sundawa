# clean-code-auditor: inspection checklist & evidence guide

> Versi 1.0.0. Ini merupakan checklist internal operasional, **bukan kutipan klausul ISO**. Selalu konfirmasi edisi di `../../../standards/registry.json`.

## Test protocol

1. Tuliskan scope, target build, reviewer, data classification dan otorisasi.
2. Buka requirement/reference dari source-of-truth; catat apakah requirement disetujui.
3. Periksa tiap item menggunakan static review, controlled dynamic test atau document sampling sesuai ketersediaan.
4. Simpan evidence ber-ID dengan URI, timestamp, hash bila relevan, dan permission yang tepat.
5. Status hanya `pass` bila evidence mendukung; `not-tested` bila tidak diuji, `not-applicable` memerlukan rationale.
6. Temuan dalam `reports/clean-code-auditor.json` mengacu ke evidence ID dan standard ID yang benar.

## Detailed controls

| ID | Inspeksi | Metode bukti minimum | Jika gagal/tidak diuji |
|---|---|---|---|
| 01 | Fungsi/konstruktor punya satu tanggung jawab yang masuk akal untuk domain. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 02 | Business rules tidak terduplikasi tanpa alasan. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 03 | Error handling tidak menelan exception atau membocorkan secrets. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 04 | Perubahan menjaga backward compatibility atau change log/plan migration. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 05 | Input validation dan boundaries ditest, bukan dipercayakan hanya ke UI. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 06 | Time/resource/memory leaks dan async/concurrency race dipertimbangkan. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 07 | Tests memverifikasi behavior, bukan implementation detail rapuh. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 08 | Lint/type/static findings ditautkan ke lokasi dan command output asli. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 09 | Logging memadai dan tidak memasukkan PII/secrets. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 10 | Komentar dan docs sesuai perilaku aktual, tidak usang atau spekulatif. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |

## Completion criteria

- Tidak ada confirmed high/critical correctness/security regression.
- Test yang dijalankan memiliki command, exit code, commit dan environment.
- Saran refactor memuat expected behavior, risiko dan rollback path.
- Style-only suggestions tidak memblokir rilis kecuali menjadi explicit policy.

## Common false positives & safeguards

- Jangan mengaku menjalankan CI jika hanya membaca yaml.
- Jangan melakukan broad rewrite untuk masalah lokal tanpa approval.
- Jangan memperkenalkan dependency baru tanpa alasan.

## References

- [ISO-25010](https://www.iso.org/standard/78176.html) — 2023
- [ISO-12207](https://www.iso.org/standard/90219.html) — 2026
- [NIST-SSDF](https://csrc.nist.gov/pubs/sp/800/218/final) — 1.1 final
- [OWASP-ASVS](https://asvs.owasp.org/) — 5.0.0

Catatan: material berlisensi tidak dipaketkan. `not-applicable` ditentukan oleh konteks/kebijakan dengan owner sign-off, bukan pilihan default AI.
