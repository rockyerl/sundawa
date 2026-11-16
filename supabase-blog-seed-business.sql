-- SQL Seed for Pinned Consultative Business Blog Posts
-- Run this in Supabase Studio -> SQL Editor if you wish to persist these articles directly in the database

INSERT INTO posts (id, title, slug, body_html, excerpt, published_at, created_at, updated_at)
VALUES
(
    'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    'Kapan ERP Perlu Diintegrasikan, Dimodernisasi, atau Diganti?',
    'kapan-erp-perlu-diintegrasikan-dimodernisasi-atau-diganti',
    '<p class="lead">Bagi banyak organisasi dan perusahaan yang sedang berkembang, sistem ERP (Enterprise Resource Planning) sering kali menjadi pusat denyut operasional sekaligus sumber keluhan utama. Ketika proses bisnis melambat, pertanyaan strategis selalu muncul di meja pimpinan: <strong>apakah ERP ini harus kita ganti total, cukup kita perbaiki modulnya, atau cukup diintegrasikan dengan aplikasi lain?</strong></p><p>Mengganti sistem ERP secara menyeluruh adalah keputusan berbiaya tinggi dan berisiko tinggi. Implementasi ERP baru kerap memakan waktu 9 hingga 18 bulan, menyedot fokus tim inti, dan berpotensi memicu disrupsi operasional. Sebaliknya, membiarkan sistem lama yang kaku tanpa tindakan juga menguras biaya melalui pekerjaan manual dan keterlambatan pelaporan.</p><h2>1. Kapan Cukup Menggunakan Pendekatan Integrasi?</h2><p>Pilihlah integrasi jika fungsi dasar akuntansi, buku besar, dan kepatuhan perpajakan di ERP masih berjalan stabil dan sesuai regulasi, namun tim mengeluhkan double-entry manual dari spreadsheet atau aplikasi lapangan.</p><h2>2. Kapan Perlu Dilakukan Modernisasi Bertahap?</h2><p>Pilihlah modernisasi bertahap (Strangler Fig pattern) jika beberapa modul kunci (reporting, approval pimpinan, inventory mobile) bekerja lambat, namun database utama masih kuat menangani beban transaksi.</p><h2>3. Kapan Penggantian Total Menjadi Keharusan?</h2><p>Penggantian total wajib dipertimbangkan jika sistem menggunakan teknologi usang yang sudah tidak lagi didukung vendor keamanan, lisensi tahunan sangat mahal tanpa peningkatan fitur, dan tidak memiliki akses API terbuka.</p>',
    'Panduan praktis bagi pimpinan teknologi dan operasional untuk mengevaluasi apakah sistem ERP saat ini cukup diintegrasikan melalui API, dimodernisasi modulnya secara bertahap, atau benar-benar perlu diganti total.',
    '2026-11-15 09:00:00+00',
    now(),
    now()
)
ON CONFLICT (slug) DO UPDATE
SET
    title = EXCLUDED.title,
    body_html = EXCLUDED.body_html,
    excerpt = EXCLUDED.excerpt,
    published_at = EXCLUDED.published_at,
    updated_at = now();

INSERT INTO posts (id, title, slug, body_html, excerpt, published_at, created_at, updated_at)
VALUES
(
    'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
    'Apa yang Perlu Disiapkan Sebelum Migrasi Sistem Lama?',
    'apa-yang-perlu-disiapkan-sebelum-migrasi-sistem-lama',
    '<p class="lead">Studi industri teknologi menunjukkan bahwa lebih dari 65% proyek modernisasi perangkat lunak mengalami keterlambatan atau pembengkakan anggaran bukan karena kegagalan tim teknis dalam menulis kode, melainkan karena <strong>kurangnya persiapan data dan pemetaan ketergantungan sistem sebelum proyek dimulai</strong>.</p><h2>1. Audit Ketergantungan Nyata (Bukan Hanya Dokumen SOP)</h2><p>Petakan seluruh pihak yang mengakses data, alur query laporan bulanan, dan integrasi tersembunyi ke server lokal.</p><h2>2. Pembersihan & Pemilahan Data: Data Aktif vs. Arsip Historis</h2><p>Pisahkan data transaksi aktif 1–2 tahun terakhir dari arsip transaksi 5–10 tahun lalu untuk menjaga performa sistem baru.</p><h2>3. Strategi Transisi Berdampingan (Dual-Run / Parallel Run)</h2><p>Hindari cutover langsung (big bang). Jalankan sistem baru dan lama secara berdampingan untuk merekonsiliasi output secara otomatis tanpa risiko panik operasional.</p><h2>4. Acceptance Criteria Tertulis yang Disepakati Pengguna Akhir</h2><p>Tentukan definisi sukses terukur bersama pengguna harian sistem sebelum implementasi dimulai.</p><h2>5. Protokol Rollback & Rencana Kontinjensi Keamanan</h2><p>Siapkan snapshot cadangan data penuh dan prosedur darurat untuk membalikkan rute trafik bila ditemukan kendala kritis.</p>',
    'Checklist kesiapan arsitektur, pemetaan ketergantungan basis data, pemilahan data aktif vs. arsip, dan mitigasi risiko operasional sebelum memulai proyek modernisasi perangkat lunak misi-kritis.',
    '2026-11-14 09:00:00+00',
    now(),
    now()
)
ON CONFLICT (slug) DO UPDATE
SET
    title = EXCLUDED.title,
    body_html = EXCLUDED.body_html,
    excerpt = EXCLUDED.excerpt,
    published_at = EXCLUDED.published_at,
    updated_at = now();
