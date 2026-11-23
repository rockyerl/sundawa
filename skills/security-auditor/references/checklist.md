# security-auditor: inspection checklist & evidence guide

> Versi 1.0.0. Ini merupakan checklist internal operasional, **bukan kutipan klausul ISO**. Selalu konfirmasi edisi di `../../../standards/registry.json`.

## Test protocol

1. Tuliskan scope, target build, reviewer, data classification dan otorisasi.
2. Buka requirement/reference dari source-of-truth; catat apakah requirement disetujui.
3. Periksa tiap item menggunakan static review, controlled dynamic test atau document sampling sesuai ketersediaan.
4. Simpan evidence ber-ID dengan URI, timestamp, hash bila relevan, dan permission yang tepat.
5. Status hanya `pass` bila evidence mendukung; `not-tested` bila tidak diuji, `not-applicable` memerlukan rationale.
6. Temuan dalam `reports/security-auditor.json` mengacu ke evidence ID dan standard ID yang benar.

## Detailed controls

| ID | Inspeksi | Metode bukti minimum | Jika gagal/tidak diuji |
|---|---|---|---|
| 01 | All endpoints punya explicit authorization decision, termasuk background jobs. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 02 | Object-level access diuji beda user/tenant secara berizin. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 03 | Secrets tidak hardcoded atau muncul dalam logs/artifacts. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 04 | Transport and at-rest data protection sesuai classification. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 05 | Dependency vulnerabilities triaged by reachability and exploitability. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 06 | Input validation dilakukan server-side, output encoding by context. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 07 | Session controls, token revocation, CSRF jika applicable diuji. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 08 | Security events dapat diaudit tanpa menyimpan sensitive payload. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 09 | Test scope dan safety disetujui dan didokumentasikan. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 10 | ASVS evidence bukan semata OWASP Top 10 category. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |

## Completion criteria

- Tidak ada confirmed exploitable critical/high tanpa mitigation atau risk acceptance sah.
- ASVS control mapping punya test method, evidence dan per-control status.
- No unauthorized intrusive scans, exploitation, availability disruption, secrets exposure.
- Not-tested controls dinyatakan eksplisit; jangan klaim ASVS fully compliant.

## Common false positives & safeguards

- Tidak menjalankan brute force, mass scanning, credential abuse atau destructive exploit pada live system.
- Jangan mengirim secrets/PII ke laporan, issue publik atau third-party tool.
- Jangan menganggap SAST result sebagai confirmed exploit.

## References

- [OWASP-ASVS](https://asvs.owasp.org/) — 5.0.0
- [OWASP-WSTG](https://wstg.owasp.org/v4.2/) — 4.2 pinned
- [OWASP-TOP10](https://owasp.org/projects/top-ten/) — 2025
- [ISO-27001](https://www.iso.org/standard/27001) — 2022+Amd1:2024
- [ISO-27002](https://www.iso.org/standard/75652.html) — 2022
- [NIST-SSDF](https://csrc.nist.gov/pubs/sp/800/218/final) — 1.1 final

Catatan: material berlisensi tidak dipaketkan. `not-applicable` ditentukan oleh konteks/kebijakan dengan owner sign-off, bukan pilihan default AI.
