import type { Post } from '@/lib/types'

export const PINNED_POSTS: readonly Post[] = [
    {
        id: 'pinned-erp-decision-framework',
        slug: 'kapan-erp-perlu-diintegrasikan-dimodernisasi-atau-diganti',
        title: 'Kapan ERP Perlu Diintegrasikan, Dimodernisasi, atau Diganti?',
        excerpt:
            'Panduan praktis bagi pimpinan teknologi dan operasional untuk mengevaluasi apakah sistem ERP saat ini cukup diintegrasikan melalui API, dimodernisasi modulnya secara bertahap, atau benar-benar perlu diganti total.',
        published_at: '2026-11-15T09:00:00.000Z',
        body_html: `
<p class="lead">
Bagi banyak organisasi dan perusahaan yang sedang berkembang, sistem ERP (Enterprise Resource Planning) sering kali menjadi pusat denyut operasional sekaligus sumber keluhan utama. Ketika proses bisnis melambat, pertanyaan strategis selalu muncul di meja pimpinan: <strong>apakah ERP ini harus kita ganti total, cukup kita perbaiki modulnya, atau cukup diintegrasikan dengan aplikasi lain?</strong>
</p>

<p>
Mengganti sistem ERP secara menyeluruh adalah keputusan berbiaya tinggi dan berisiko tinggi. Implementasi ERP baru kerap memakan waktu 9 hingga 18 bulan, menyedot fokus tim inti, dan berpotensi memicu disrupsi operasional. Sebaliknya, membiarkan sistem lama yang kaku tanpa tindakan juga menguras biaya melalui pekerjaan manual dan keterlambatan pelaporan.
</p>

<p>
Berikut adalah kerangka evaluasi objektif yang biasa kami gunakan di Sundawa untuk membantu klien menentukan langkah yang paling rasional dan hemat risiko.
</p>

<h2>1. Kapan Cukup Menggunakan Pendekatan Integrasi?</h2>
<p>
Integrasi adalah opsi tercepat dan paling efisien dari segi investasi biaya jika inti sistem Anda sebenarnya masih bekerja dengan baik.
</p>
<p><strong>Pilihlah integrasi jika kondisi Anda:</strong></p>
<ul>
    <li>Fungsi dasar akuntansi, buku besar (general ledger), dan kepatuhan perpajakan di ERP masih berjalan stabil dan sesuai regulasi.</li>
    <li>Keluhan utama pengguna berakar pada <em>double-entry</em> (tim harus mengetik ulang data dari spreadsheet, aplikasi penjualan, atau portal kurir ke dalam ERP).</li>
    <li>Kebutuhan utama Anda adalah aplikasi lapangan (mobile app sales/driver/inspeksi) yang perlu mengirim data transaksi ke ERP secara real-time.</li>
</ul>
<p>
<strong>Solusi yang diterapkan:</strong> Membangun middleware integrasi (API Gateway atau event-driven webhooks) yang menghubungkan sistem luar dengan ERP tanpa merombak database inti ERP.
</p>

<h2>2. Kapan Perlu Dilakukan Modernisasi Bertahap?</h2>
<p>
Modernisasi bertahap (sering menggunakan arsitektur <em>Strangler Fig pattern</em>) adalah pilihan terbaik ketika sebagian modul ERP sudah sangat usang, namun modul lainnya masih krusial.
</p>
<p><strong>Pilihlah modernisasi jika kondisi Anda:</strong></p>
<ul>
    <li>Beberapa modul kunci (misalnya modul approval pimpinan, pelacakan inventaris gudang, atau laporan analitik) bekerja sangat lambat dan antarmukanya sulit dipakai staf harian.</li>
    <li>Database utama masih kuat menangani beban transaksi, tetapi vendor ERP lama tidak lagi menyediakan pembaruan fitur modern.</li>
    <li>Perusahaan tidak mampu menanggung risiko downtime operasional jika sistem dimatikan sekaligus.</li>
</ul>
<p>
<strong>Solusi yang diterapkan:</strong> Memotong modul yang bermasalah satu per satu, menggantikannya dengan modul modern berbasis cloud/web yang lebih lincah, lalu menyambungkannya kembali ke database utama dengan jaminan tanpa downtime.
</p>

<h2>3. Kapan Penggantian Total Menjadi Keharusan?</h2>
<p>
Penggantian total (re-platforming) hanya disarankan apabila sistem lama sudah menjadi penghambat kritis bagi kelangsungan bisnis.
</p>
<p><strong>Penggantian total wajib dipertimbangkan jika:</strong></p>
<ul>
    <li>Sistem menggunakan teknologi usang yang sudah tidak lagi didukung vendor keamanan, dan tidak memiliki dokumentasi atau akses basis data terbuka.</li>
    <li>Biaya pemeliharaan lisensi tahunan melampaui estimasi biaya investasi sistem baru berjangka 3 tahun.</li>
    <li>Arsitektur lama sama sekali tidak memungkinkan pertukaran data modern (tidak ada API, database terkunci secara proprietary).</li>
</ul>

<h2>Matriks Evaluasi Ringkas</h2>
<div class="table-responsive">
<table class="table-border">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Integrasi API</th>
            <th>Modernisasi Bertahap</th>
            <th>Penggantian Total</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Estimasi Waktu</strong></td>
            <td>4 – 8 Minggu</td>
            <td>2 – 5 Bulan per modul</td>
            <td>9 – 18 Bulan</td>
        </tr>
        <tr>
            <td><strong>Risiko Disrupsi</strong></td>
            <td>Sangat Rendah</td>
            <td>Terkendali & Bertahap</td>
            <td>Tinggi (Perlu UAT masif)</td>
        </tr>
        <tr>
            <td><strong>Dampak Pengguna</strong></td>
            <td>Mulus, tanpa adaptasi ulang</td>
            <td>Peningkatan bertahap</td>
            <td>Pelatihan ulang seluruh staf</td>
        </tr>
        <tr>
            <td><strong>Tingkat Investasi</strong></td>
            <td>Paling Efisien</td>
            <td>Fleksibel per fase</td>
            <td>Alokasi Anggaran Besar</td>
        </tr>
    </tbody>
</table>
</div>

<h2>Langkah Pertama yang Direkomendasikan</h2>
<p>
Sebelum menerbitkan Term of Reference (TOR) pengadaan atau menandatangani kontrak lisensi baru, mintalah audit ketergantungan sistem independen. Di Sundawa, kami selalu memulai dengan memetakan proses bisnis riil di lapangan untuk memastikan setiap rupiah investasi teknologi Anda benar-benar menyelesaikan masalah operasional.
</p>
        `,
    },
    {
        id: 'pinned-migrasi-sistem-lama',
        slug: 'apa-yang-perlu-disiapkan-sebelum-migrasi-sistem-lama',
        title: 'Apa yang Perlu Disiapkan Sebelum Migrasi Sistem Lama?',
        excerpt:
            'Checklist kesiapan arsitektur, pemetaan ketergantungan basis data, pemilahan data aktif vs. arsip, dan mitigasi risiko operasional sebelum memulai proyek modernisasi perangkat lunak misi-kritis.',
        published_at: '2026-11-14T09:00:00.000Z',
        body_html: `
<p class="lead">
Studi industri teknologi menunjukkan bahwa lebih dari 65% proyek modernisasi perangkat lunak mengalami keterlambatan atau pembengkakan anggaran bukan karena kegagalan tim teknis dalam menulis kode, melainkan karena <strong>kurangnya persiapan data dan pemetaan ketergantungan sistem sebelum proyek dimulai</strong>.
</p>

<p>
Ketika sistem yang telah beroperasi selama 5 hingga 10 tahun akan dipindahkan atau dirancang ulang, banyak logika bisnis informal dan keterkaitan data yang tidak terdokumentasi dalam SOP resmi. Berikut adalah 5 hal fundamental yang wajib disiapkan tim Anda sebelum meluncurkan inisiatif migrasi sistem.
</p>

<h2>1. Audit Ketergantungan Nyata (Bukan Hanya Dokumen SOP)</h2>
<p>
Dalam sistem lama, sering kali terdapat <em>stored procedure</em>, <em>trigger</em> tersembunyi, atau skrip otomatisasi di server lokal yang dibuat tahun-tahun lalu dan tidak tercatat dalam dokumentasi awal.
</p>
<ul>
    <li><strong>Identifikasi seluruh pihak yang mengakses data:</strong> Siapa saja tim, divisi, atau aplikasi pihak ketiga yang membaca atau menulis ke database sistem lama?</li>
    <li><strong>Petakan alur laporan bulanan:</strong> Laporan mana yang masih mengandalkan query manual ke database lama?</li>
    <li><strong>Cek integrasi tersembunyi:</strong> Apakah ada integrasi ke mesin absensi fisik, payment gateway lama, atau sistem perpajakan?</li>
</ul>

<h2>2. Pembersihan & Pemilahan Data: Data Aktif vs. Arsip Historis</h2>
<p>
Jangan memindahkan data kotor ke dalam rumah yang baru. Memindahkan jutaan baris log transaksi usang hanya akan membebani database sistem baru dan memperlambat proses migrasi.
</p>
<ul>
    <li><strong>Data Aktif:</strong> Data yang dibutuhkan untuk operasional harian (biasanya 1–2 tahun terakhir, akun aktif, master barang, dan saldo berjalan). Data ini wajib dimigrasikan dengan validasi integritas 100%.</li>
    <li><strong>Arsip Historis:</strong> Data transaksi 5–10 tahun lalu yang disimpan semata-mata untuk kepatuhan audit. Data ini sebaiknya diekspor ke data warehouse terpisah atau cold storage terenkripsi, bukan dimasukkan ke database operasional harian.</li>
</ul>

<h2>3. Strategi Transisi Berdampingan (Dual-Run / Parallel Run)</h2>
<p>
Hindari strategi <em>big-bang cutover</em> di mana sistem lama dimatikan pada Jumat malam dan sistem baru dipaksa menyala pada Senin pagi tanpa masa pengujian paralel.
</p>
<p>
Di Sundawa, kami selalu merekomendasikan strategi berdampingan (dual-run) selama periode tertentu:
</p>
<ul>
    <li>Data transaksi dimasukkan ke kedua sistem untuk membandingkan output angka secara otomatis.</li>
    <li>Jika terdapat selisih rekonsiliasi, tim engineering dapat segera menemukan anomali sebelum sistem lama dinonaktifkan.</li>
    <li>Staf operasional mendapatkan waktu transisi yang nyaman tanpa kepanikan di hari pertama rilis.</li>
</ul>

<h2>4. Acceptance Criteria Tertulis yang Disepakati Pengguna Akhir</h2>
<p>
Definisi "sukses" harus disepakati secara tertulis antara tim IT, manajemen pimpinan, dan staf operasional yang menggunakan sistem sehari-hari.
</p>
<p>
Contoh kriteria penerimaan yang konkret:
</p>
<ul>
    <li><em>"Waktu generate laporan neraca akhir bulan berkurang dari 4 jam menjadi di bawah 3 menit."</em></li>
    <li><em>"Input transaksi di kasir/agen tetap dapat dilakukan dalam kondisi minim sinyal dan tersinkronisasi otomatis saat online."</em></li>
    <li><em>"Tidak ada selisih saldo antara buku besar sistem baru dengan sistem lama selama 14 hari pengujian paralel."</em></li>
</ul>

<h2>5. Protokol Rollback & Rencana Kontinjensi Keamanan</h2>
<p>
Kesiapan sejati diukur dari bagaimana tim merespons skenario terburuk. Sebelum peluncuran, pastikan terdapat:
</p>
<ul>
    <li>Snapshot cadangan penuh (full database backup) terverifikasi yang telah diuji proses <em>restore</em>-nya.</li>
    <li>Prosedur darurat untuk membalikkan rute trafik kembali ke sistem lama dalam hitungan menit jika ditemukan kendala kritis tak terduga.</li>
    <li>Perjanjian Kerahasiaan (NDA) dan kontrol akses berbasis peran (RBAC) yang membatasi hak akses personel teknis ke data produksi sensitif.</li>
</ul>

<h2>Kesimpulan</h2>
<p>
Modernisasi sistem lama tidak harus menjadi pengalaman yang menegangkan. Dengan audit ketergantungan yang cermat, pemilahan data yang disiplin, dan strategi rilis bertahap, transisi teknologi dapat berlangsung mulus tanpa mengorbankan ketenangan operasional bisnis Anda.
</p>
        `,
    },
]
