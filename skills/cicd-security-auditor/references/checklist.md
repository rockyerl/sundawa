# cicd-security-auditor: inspection checklist & evidence guide

> Versi 1.0.0. Ini merupakan checklist internal operasional, **bukan kutipan klausul ISO**. Selalu konfirmasi edisi di `../../../standards/registry.json`.

## Test protocol

1. Tuliskan scope, target build, reviewer, data classification dan otorisasi.
2. Buka requirement/reference dari source-of-truth; catat apakah requirement disetujui.
3. Periksa tiap item menggunakan static review, controlled dynamic test atau document sampling sesuai ketersediaan.
4. Simpan evidence ber-ID dengan URI, timestamp, hash bila relevan, dan permission yang tepat.
5. Status hanya `pass` bila evidence mendukung; `not-tested` bila tidak diuji, `not-applicable` memerlukan rationale.
6. Temuan dalam `reports/cicd-security-auditor.json` mengacu ke evidence ID dan standard ID yang benar.

## Detailed controls

| ID | Inspeksi | Metode bukti minimum | Jika gagal/tidak diuji |
|---|---|---|---|
| 01 | No prod deploy direct dari untrusted pull request. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 02 | CI job dan runner menggunakan minimum required permissions. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 03 | Third-party actions dipin ke trusted immutable references atau risk accepted. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 04 | Secrets tidak muncul dalam logs, test artifact atau PR context. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 05 | Build/test/security checks mandatory pada protected branch. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 06 | Dependency updates and vulnerable image handling didokumentasikan. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 07 | Artifact provenance dapat ditelusuri ke commit, build run dan approver. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 08 | Release approvals dan separation of duties sesuai risk profile. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 09 | Rollback & incident runbook diuji pada staging. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |
| 10 | Pipeline errors atau skipped checks tidak diperlakukan pass. | Review source atau test pada environment berizin; simpan artifact URI, commit/build, hasil dan penilai. | Jika tidak terbukti: `not-tested` / `suspected`; jika gagal: finding dengan severity berbasis dampak. |

## Completion criteria

- Tidak ada confirmed CI takeover/secret leakage high/critical tanpa tindakan.
- Build artifact/commit dan approval trail bisa ditelusuri.
- Release gate tidak boleh pass saat security checks skipped/unknown.
- Privilege changes/secret rotations memerlukan owner approval dan change record.

## Common false positives & safeguards

- Jangan mengeksekusi workflow berbahaya untuk membuktikan temuan.
- Jangan mencetak secret values pada report.
- Jangan menganggap badge hijau sama dengan supply-chain security.

## References

- [NIST-SSDF](https://csrc.nist.gov/pubs/sp/800/218/final) — 1.1 final
- [OWASP-CICD](https://owasp.org/www-project-top-10-ci-cd-security-risks/) — project reference
- [ISO-27001](https://www.iso.org/standard/27001) — 2022+Amd1:2024
- [ISO-12207](https://www.iso.org/standard/90219.html) — 2026
- [OWASP-ASVS](https://asvs.owasp.org/) — 5.0.0

Catatan: material berlisensi tidak dipaketkan. `not-applicable` ditentukan oleh konteks/kebijakan dengan owner sign-off, bukan pilihan default AI.
