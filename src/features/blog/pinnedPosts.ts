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

<div style="background: rgba(0, 86, 170, 0.08); border: 1px solid rgba(0, 86, 170, 0.3); border-radius: 8px; padding: 1.25rem 1.5rem; margin: 1.5rem 0;">
    <p style="margin: 0 0 0.5rem; font-weight: 700; color: #F8F8F8; font-size: 1rem;">
        🔗 Butuh Menghubungkan ERP Anda dengan Aplikasi Lain?
    </p>
    <p style="margin: 0 0 0.75rem; color: rgba(248, 248, 248, 0.7); font-size: 0.92rem; line-height: 1.6;">
        Sundawa menyediakan layanan integrasi API Gateway, sinkronisasi webhook, dan konektor pihak ketiga tanpa mengganggu database inti ERP Anda.
    </p>
    <a href="/id/services/integrasi-sistem" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #DBC977; font-weight: 700; font-size: 0.88rem; text-decoration: none;">
        Lihat Jasa Integrasi ERP &amp; API Perusahaan &rarr;
    </a>
</div>

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

<div style="background: rgba(219, 201, 119, 0.06); border: 1px solid rgba(219, 201, 119, 0.25); border-radius: 8px; padding: 1.25rem 1.5rem; margin: 1.5rem 0;">
    <p style="margin: 0 0 0.5rem; font-weight: 700; color: #F8F8F8; font-size: 1rem;">
        ⚡ Modul ERP Tertentu Lambat atau Sulit Digunakan?
    </p>
    <p style="margin: 0 0 0.75rem; color: rgba(248, 248, 248, 0.7); font-size: 0.92rem; line-height: 1.6;">
        Ganti modul bermasalah satu per satu dengan arsitektur modern tanpa risiko downtime operasional bisnis Anda.
    </p>
    <a href="/id/services/modernisasi-sistem" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #DBC977; font-weight: 700; font-size: 0.88rem; text-decoration: none;">
        Pelajari Jasa Modernisasi Sistem Lama Sundawa &rarr;
    </a>
</div>

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
            <td>Terkendali &amp; Bertahap</td>
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

<h2>Studi Kasus Terkait: Arsitektur Integrasi Multi-Platform</h2>
<div style="background: rgba(0, 86, 170, 0.08); border: 1px solid rgba(0, 86, 170, 0.35); border-radius: 8px; padding: 1.5rem; margin: 1.5rem 0;">
    <span style="font-size: 0.65rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #00F0FF; display: block; margin-bottom: 0.5rem;">
        📂 Studi Kasus Terkait
    </span>
    <h3 style="margin: 0 0 0.5rem; color: #F8F8F8; font-size: 1.15rem; font-weight: 800;">
        DACAR by UNDP: Integrasi Data &amp; Platform Penyaluran Dana Digital
    </h3>
    <p style="margin: 0 0 1rem; color: rgba(248, 248, 248, 0.75); font-size: 0.92rem; line-height: 1.6;">
        Sundawa merancang arsitektur aplikasi lintas platform, microservices API terenkripsi, dan verifikasi real-time untuk penyaluran dana bantuan tanpa toleransi keterlambatan data.
    </p>
    <a href="/id/portfolio/dacar-by-undp" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #DBC977; font-weight: 700; font-size: 0.88rem; text-decoration: none;">
        Pelajari Studi Kasus DACAR by UNDP &rarr;
    </a>
</div>

<h2>Langkah Pertama yang Direkomendasikan</h2>
<p>
Sebelum menerbitkan Term of Reference (TOR) pengadaan atau menandatangani kontrak lisensi baru, mintalah audit ketergantungan sistem independen. Di Sundawa, kami selalu memulai dengan memetakan proses bisnis riil di lapangan untuk memastikan setiap rupiah investasi teknologi Anda benar-benar menyelesaikan masalah operasional.
</p>

<div style="background: linear-gradient(135deg, rgba(14, 30, 48, 0.95), rgba(10, 25, 47, 0.95)); border: 1px solid rgba(219, 201, 119, 0.35); border-radius: 12px; padding: 2rem; margin: 2.5rem 0; text-align: center;">
    <h3 style="margin: 0 0 0.75rem; font-size: 1.35rem; color: #F8F8F8; font-weight: 800;">
        Bingung Menentukan Arah Sistem ERP Anda?
    </h3>
    <p style="margin: 0 auto 1.5rem; max-width: 580px; color: rgba(248, 248, 248, 0.7); font-size: 0.95rem; line-height: 1.6;">
        Konsultasikan arsitektur sistem Anda langsung dengan tim lead engineer Sundawa. Kami bantu petakan audit ketergantungan dan opsi yang paling efisien biaya.
    </p>
    <a href="/id/contact?service=integrasi-sistem" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #DBC977; color: #0E1E30; font-weight: 800; font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.85rem 2rem; border-radius: 4px; text-decoration: none;">
        Diskusikan Sistem Anda &rarr;
    </a>
</div>
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

<h2>2. Pembersihan &amp; Pemilahan Data: Data Aktif vs. Arsip Historis</h2>
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

<div style="background: rgba(219, 201, 119, 0.06); border: 1px solid rgba(219, 201, 119, 0.25); border-radius: 8px; padding: 1.25rem 1.5rem; margin: 1.5rem 0;">
    <p style="margin: 0 0 0.5rem; font-weight: 700; color: #F8F8F8; font-size: 1rem;">
        🛠️ Butuh Pendamping Teknis untuk Audit &amp; Migrasi Sistem?
    </p>
    <p style="margin: 0 0 0.75rem; color: rgba(248, 248, 248, 0.7); font-size: 0.92rem; line-height: 1.6;">
        Sundawa membantu audit ketergantungan, pemisahan basis data, dan eksekusi dual-run tanpa mengganggu jam kerja operasional.
    </p>
    <a href="/id/services/modernisasi-sistem" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #DBC977; font-weight: 700; font-size: 0.88rem; text-decoration: none;">
        Eksplorasi Jasa Modernisasi Sistem Lama &rarr;
    </a>
</div>

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

<h2>5. Protokol Rollback &amp; Rencana Kontinjensi Keamanan</h2>
<p>
Kesiapan sejati diukur dari bagaimana tim merespons skenario terburuk. Sebelum peluncuran, pastikan terdapat:
</p>
<ul>
    <li>Snapshot cadangan penuh (full database backup) terverifikasi yang telah diuji proses <em>restore</em>-nya.</li>
    <li>Prosedur darurat untuk membalikkan rute trafik kembali ke sistem lama dalam hitungan menit jika ditemukan kendala kritis tak terduga.</li>
    <li>Perjanjian Kerahasiaan (NDA) dan kontrol akses berbasis peran (RBAC) yang membatasi hak akses personel teknis ke data produksi sensitif.</li>
</ul>

<h2>Studi Kasus Terkait: Modernisasi Sistem Misi-Kritis</h2>
<div style="background: rgba(219, 201, 119, 0.06); border: 1px solid rgba(219, 201, 119, 0.3); border-radius: 8px; padding: 1.5rem; margin: 1.5rem 0;">
    <span style="font-size: 0.65rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #DBC977; display: block; margin-bottom: 0.5rem;">
        📂 Studi Kasus Terkait
    </span>
    <h3 style="margin: 0 0 0.5rem; color: #F8F8F8; font-size: 1.15rem; font-weight: 800;">
        E-Office: Modernisasi Tata Usaha &amp; Alur Disposisi Terintegrasi
    </h3>
    <p style="margin: 0 0 1rem; color: rgba(248, 248, 248, 0.75); font-size: 0.92rem; line-height: 1.6;">
        Bagaimana Sundawa mentransformasikan persuratan fisik dan alur disposisi birokrasi menjadi platform web modular berjenjang dengan RBAC dan indeks arsip real-time tanpa disrupsi operasional.
    </p>
    <a href="/id/portfolio/e-office" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #DBC977; font-weight: 700; font-size: 0.88rem; text-decoration: none;">
        Lihat Studi Kasus E-Office &rarr;
    </a>
</div>

<h2>Kesimpulan</h2>
<p>
Modernisasi sistem lama tidak harus menjadi pengalaman yang menegangkan. Dengan audit ketergantungan yang cermat, pemilahan data yang disiplin, dan strategi rilis bertahap, transisi teknologi dapat berlangsung mulus tanpa mengorbankan ketenangan operasional bisnis Anda.
</p>

<div style="background: linear-gradient(135deg, rgba(14, 30, 48, 0.95), rgba(10, 25, 47, 0.95)); border: 1px solid rgba(219, 201, 119, 0.35); border-radius: 12px; padding: 2rem; margin: 2.5rem 0; text-align: center;">
    <h3 style="margin: 0 0 0.75rem; font-size: 1.35rem; color: #F8F8F8; font-weight: 800;">
        Siapkan Rencana Migrasi yang Aman dan Terukur
    </h3>
    <p style="margin: 0 auto 1.5rem; max-width: 580px; color: rgba(248, 248, 248, 0.7); font-size: 0.95rem; line-height: 1.6;">
        Bicarakan checklist kesiapan sistem lama Anda dengan arsitek perangkat lunak kami sebelum membuat komitmen anggaran.
    </p>
    <a href="/id/contact?service=modernisasi-sistem" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #DBC977; color: #0E1E30; font-weight: 800; font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.85rem 2rem; border-radius: 4px; text-decoration: none;">
        Diskusikan Sistem Anda &rarr;
    </a>
</div>
        `,
    },
    {
        id: 'pinned-custom-business-app',
        slug: 'kapan-perusahaan-membutuhkan-aplikasi-bisnis-custom',
        title: 'Kapan Perusahaan Membutuhkan Aplikasi Bisnis Custom Dibanding Software Jadi?',
        excerpt:
            'Panduan strategis bagi pimpinan bisnis untuk mengevaluasi batas kapabilitas software jadi (off-the-shelf SaaS) vs. investasi aplikasi bisnis custom yang dirancang presisi sesuai alur kerja unik perusahaan.',
        published_at: '2026-11-16T09:00:00.000Z',
        body_html: `
<p class="lead">
Dalam era percepatan transformasi digital, hampir setiap kebutuhan operasional memiliki produk perangkat lunak siap pakai (off-the-shelf SaaS). Mulai dari CRM, manajemen inventaris gudang, sistem pemesanan armada, hingga portal layanan pelanggan. Namun, banyak organisasi mencapai titik di mana <strong>perangkat lunak jadi justru menjadi penghambat inovasi bisnis</strong> karena membatasi fleksibilitas alur kerja.
</p>

<p>
Kapan saat yang tepat untuk terus menggunakan aplikasi siap pakai, dan kapan perusahaan perlu berinvestasi membangun aplikasi bisnis custom? Berikut adalah panduan evaluasi strategis berdasarkan pengalaman rekayasa perangkat lunak tim Sundawa.
</p>

<h2>1. Jebakan Software Jadi (Off-the-Shelf SaaS) di Fase Pertumbuhan</h2>
<p>
Software jadi sangat ideal pada tahap awal pembentukan bisnis karena waktu adopsinya cepat dan biaya bulanannya terjangkau. Namun, ketika model operasional perusahaan mulai memiliki keunikan kompetitif, hambatan berikut mulai muncul:
</p>
<ul>
    <li><strong>Biaya lisensi per-user yang membengkak:</strong> Ketika tim bertambah dari puluhan menjadi ratusan pengguna, biaya subscription bulanan/tahunan melonjak drastis tanpa penambahan nilai strategis baru.</li>
    <li><strong>Alur kerja dipaksa mengikuti software:</strong> Tim operasional terpaksa mengubah SOP internal semata-mata agar sesuai dengan batas logika sistem vendor yang kaku.</li>
    <li><strong>Ketergantungan data (Vendor Lock-in):</strong> Mengekstrak data riil dalam format lengkap untuk kebutuhan analitik mandiri sering kali dibatasi atau dikenakan biaya API berbayar.</li>
</ul>

<h2>2. Kapan Aplikasi Bisnis Custom Menjadi Solusi Terbaik?</h2>
<p>
Investasi aplikasi bisnis custom tepat diambil jika proses bisnis Anda adalah pembeda utama (keunggulan bersaing) di mata pelanggan Anda.
</p>
<p><strong>Pertimbangkan pengembangan custom jika:</strong></p>
<ul>
    <li>Proses operasional Anda melibatkan aturan bisnis unik, regulasi kepatuhan khusus, atau kalkulasi harga berjenjang yang tidak didukung solusi SaaS generik.</li>
    <li>Anda membutuhkan antarmuka terpadu yang menggabungkan berbagai sumber data lapangan, IoT, atau integrasi hardware khusus ke dalam satu dashboard kendali.</li>
    <li>Perusahaan menginginkan kepemilikan aset kode sumber penuh (full IP ownership) untuk meningkatkan valuasi dan independensi teknologi.</li>
</ul>

<div style="background: rgba(219, 201, 119, 0.06); border: 1px solid rgba(219, 201, 119, 0.25); border-radius: 8px; padding: 1.25rem 1.5rem; margin: 1.5rem 0;">
    <p style="margin: 0 0 0.5rem; font-weight: 700; color: #F8F8F8; font-size: 1rem;">
        ⚡ Butuh Platform yang Menyesuaikan Operasional Bisnis Anda?
    </p>
    <p style="margin: 0 0 0.75rem; color: rgba(248, 248, 248, 0.7); font-size: 0.92rem; line-height: 1.6;">
        Sundawa membangun platform bisnis custom, portal pelanggan terpadu, dan sistem manajemen operasional yang dirancang spesifik untuk kebutuhan organisasi Anda.
    </p>
    <a href="/id/services/platform-khusus" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #DBC977; font-weight: 700; font-size: 0.88rem; text-decoration: none;">
        Jelajahi Jasa Platform Bisnis Khusus Sundawa &rarr;
    </a>
</div>

<h2>3. Studi Kasus Relevan: Platform Informasi &amp; Kehadiran Medis Rumah Sakit</h2>
<p>
Contoh nyata pentingnya platform custom terlihat pada sektor layanan kesehatan, di mana sistem generik tidak mampu mengakomodasi dinamika jadwal dokter spesialis dan interaksi pasien secara terpadu.
</p>

<div style="background: rgba(0, 86, 170, 0.08); border: 1px solid rgba(0, 86, 170, 0.35); border-radius: 8px; padding: 1.5rem; margin: 2rem 0;">
    <span style="font-size: 0.65rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #00F0FF; display: block; margin-bottom: 0.5rem;">
        📂 Studi Kasus Terkait
    </span>
    <h3 style="margin: 0 0 0.5rem; color: #F8F8F8; font-size: 1.15rem; font-weight: 800;">
        Oetomo Hospital Website: Platform Informasi &amp; Kehadiran Digital Rumah Sakit
    </h3>
    <p style="margin: 0 0 1rem; color: rgba(248, 248, 248, 0.75); font-size: 0.92rem; line-height: 1.6;">
        Sundawa mengembangkan platform institusional responsif berkecepatan tinggi dengan Content Management System (CMS) mandiri, direktori jadwal dokter spesialis dinamis, dan navigasi informasi medis terpusat.
    </p>
    <a href="/id/portfolio/oetomo-hospital-website" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #DBC977; font-weight: 700; font-size: 0.88rem; text-decoration: none;">
        Pelajari Studi Kasus Oetomo Hospital &rarr;
    </a>
</div>

<h2>Kesimpulan</h2>
<p>
Aplikasi bisnis custom bukan berarti mengganti semua sistem yang ada. Solusi paling cerdas sering kali berupa kombinasi: mempertahankan software jadi yang masih efektif untuk fungsi standar, dan membangun platform custom untuk fungsi diferensiasi bisnis Anda.
</p>

<div style="background: linear-gradient(135deg, rgba(14, 30, 48, 0.95), rgba(10, 25, 47, 0.95)); border: 1px solid rgba(219, 201, 119, 0.35); border-radius: 12px; padding: 2rem; margin: 2.5rem 0; text-align: center;">
    <h3 style="margin: 0 0 0.75rem; font-size: 1.35rem; color: #F8F8F8; font-weight: 800;">
        Rencanakan Aplikasi Bisnis Custom Anda
    </h3>
    <p style="margin: 0 auto 1.5rem; max-width: 580px; color: rgba(248, 248, 248, 0.7); font-size: 0.95rem; line-height: 1.6;">
        Diskusikan alur operasional dan rancangan antarmuka sistem baru Anda langsung bersama software engineer Sundawa.
    </p>
    <a href="/id/contact?service=platform-khusus" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #DBC977; color: #0E1E30; font-weight: 800; font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.85rem 2rem; border-radius: 4px; text-decoration: none;">
        Diskusikan Aplikasi Custom Anda &rarr;
    </a>
</div>
        `,
    },
]

export const PINNED_POSTS_EN: readonly Post[] = [
    {
        id: 'pinned-erp-decision-framework',
        slug: 'kapan-erp-perlu-diintegrasikan-dimodernisasi-atau-diganti',
        title: 'When Should an ERP Be Integrated, Modernized, or Replaced?',
        excerpt:
            'A practical evaluation framework for technology and operations leaders to determine whether an existing ERP requires API integration, modular modernization, or full replacement.',
        published_at: '2026-11-15T09:00:00.000Z',
        body_html: `
<p class="lead">
For many growing organizations and enterprises, the Enterprise Resource Planning (ERP) system is both the operational heartbeat and the primary source of operational friction. When business processes slow down, a strategic question inevitably reaches leadership: <strong>should we replace our ERP entirely, modernize problematic modules incrementally, or simply integrate it with external applications?</strong>
</p>

<p>
Replacing an ERP system outright is an expensive, high-risk endeavor. New ERP implementations routinely take 9 to 18 months, consume core executive focus, and carry substantial risk of operational disruption. Conversely, leaving an outdated, rigid system unaddressed drains capital through manual labor and delayed reporting.
</p>

<p>
Here is the objective evaluation framework we employ at Sundawa to help clients choose the most rational, risk-efficient trajectory.
</p>

<h2>1. When is an API Integration Approach Sufficient?</h2>
<p>
Integration is the fastest and most cost-effective path if your core transaction engine is fundamentally sound.
</p>
<p><strong>Choose integration when:</strong></p>
<ul>
    <li>Core accounting, general ledger, and tax compliance workflows in your ERP operate reliably and comply with local regulations.</li>
    <li>User complaints stem primarily from <em>double-entry</em> (teams re-typing data from spreadsheets, sales apps, or courier portals into the ERP).</li>
    <li>Your primary need is field operational software (sales rep mobile apps, driver delivery tracking, field inspections) requiring real-time sync with ERP tables.</li>
</ul>
<p>
<strong>The technical solution:</strong> Build integration middleware (API Gateway or event-driven webhooks) connecting external systems to your ERP without tampering with core database schemas.
</p>

<div style="background: rgba(0, 86, 170, 0.08); border: 1px solid rgba(0, 86, 170, 0.3); border-radius: 8px; padding: 1.25rem 1.5rem; margin: 1.5rem 0;">
    <p style="margin: 0 0 0.5rem; font-weight: 700; color: #F8F8F8; font-size: 1rem;">
        🔗 Need to Connect Your ERP with Other Business Applications?
    </p>
    <p style="margin: 0 0 0.75rem; color: rgba(248, 248, 248, 0.7); font-size: 0.92rem; line-height: 1.6;">
        Sundawa provides enterprise API Gateway integration, webhook synchronization, and third-party connectors without altering your core ERP database.
    </p>
    <a href="/en/services/system-integration" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #DBC977; font-weight: 700; font-size: 0.88rem; text-decoration: none;">
        Explore Enterprise ERP &amp; API Integration Services &rarr;
    </a>
</div>

<h2>2. When is Gradual Modular Modernization Needed?</h2>
<p>
Gradual modular modernization (often adopting the <em>Strangler Fig pattern</em>) is the optimal strategy when specific ERP modules are deeply obsolete while others remain critical and functional.
</p>
<p><strong>Choose modular modernization when:</strong></p>
<ul>
    <li>Bottleneck modules (such as executive approvals, warehouse inventory tracking, or business intelligence dashboards) are painfully slow and difficult for frontline staff to navigate.</li>
    <li>The underlying database still comfortably handles transaction volumes, but legacy vendor software no longer delivers modern feature updates.</li>
    <li>The enterprise cannot tolerate the operational downtime risk of a sudden monolithic switchover.</li>
</ul>
<p>
<strong>The technical solution:</strong> Decouple and re-engineer bottleneck modules one by one into agile web/cloud services, reconnecting them back to the central database with zero business downtime.
</p>

<div style="background: rgba(219, 201, 119, 0.06); border: 1px solid rgba(219, 201, 119, 0.25); border-radius: 8px; padding: 1.25rem 1.5rem; margin: 1.5rem 0;">
    <p style="margin: 0 0 0.5rem; font-weight: 700; color: #F8F8F8; font-size: 1rem;">
        ⚡ Are Specific ERP Modules Slow or Unusable for Your Team?
    </p>
    <p style="margin: 0 0 0.75rem; color: rgba(248, 248, 248, 0.7); font-size: 0.92rem; line-height: 1.6;">
        Replace legacy bottleneck modules incrementally with modern architectures without risking operational downtime.
    </p>
    <a href="/en/services/system-modernization" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #DBC977; font-weight: 700; font-size: 0.88rem; text-decoration: none;">
        Learn About Sundawa Legacy System Modernization &rarr;
    </a>
</div>

<h2>3. When is Full Replacement Unavoidable?</h2>
<p>
A full re-platforming should only be pursued when the legacy infrastructure has become a critical operational liability.
</p>
<p><strong>Total replacement must be considered if:</strong></p>
<ul>
    <li>The system runs on obsolete runtimes no longer supported by security vendors, with zero documentation or open database access.</li>
    <li>Annual proprietary maintenance and license fees exceed the projected 3-year cost of building a tailored modern system.</li>
    <li>The legacy architecture fundamentally prevents automated data exchange (no APIs, locked proprietary databases).</li>
</ul>

<h2>Evaluation Matrix at a Glance</h2>
<div class="table-responsive">
<table class="table-border">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>API Integration</th>
            <th>Modular Modernization</th>
            <th>Total Replacement</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Estimated Timeline</strong></td>
            <td>4 – 8 Weeks</td>
            <td>2 – 5 Months per module</td>
            <td>9 – 18 Months</td>
        </tr>
        <tr>
            <td><strong>Disruption Risk</strong></td>
            <td>Very Low</td>
            <td>Controlled &amp; Phased</td>
            <td>High (Requires massive UAT)</td>
        </tr>
        <tr>
            <td><strong>User Impact</strong></td>
            <td>Seamless, zero retraining</td>
            <td>Gradual improvement</td>
            <td>Full staff retraining required</td>
        </tr>
        <tr>
            <td><strong>Investment Level</strong></td>
            <td>Most Cost-Efficient</td>
            <td>Flexible per phase</td>
            <td>Substantial Capital Allocation</td>
        </tr>
    </tbody>
</table>
</div>

<h2>Relevant Case Study: Multi-Platform Integration Architecture</h2>
<div style="background: rgba(0, 86, 170, 0.08); border: 1px solid rgba(0, 86, 170, 0.35); border-radius: 8px; padding: 1.5rem; margin: 1.5rem 0;">
    <span style="font-size: 0.65rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #00F0FF; display: block; margin-bottom: 0.5rem;">
        📂 Relevant Case Study
    </span>
    <h3 style="margin: 0 0 0.5rem; color: #F8F8F8; font-size: 1.15rem; font-weight: 800;">
        DACAR by UNDP: Digital Aid Platform &amp; Enterprise API Integration
    </h3>
    <p style="margin: 0 0 1rem; color: rgba(248, 248, 248, 0.75); font-size: 0.92rem; line-height: 1.6;">
        Sundawa engineered cross-platform apps, encrypted microservices APIs, and real-time beneficiary verification for mission-critical digital cash disbursement.
    </p>
    <a href="/en/portfolio/dacar-by-undp" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #DBC977; font-weight: 700; font-size: 0.88rem; text-decoration: none;">
        Explore the DACAR by UNDP Case Study &rarr;
    </a>
</div>

<h2>Recommended Next Step</h2>
<p>
Before drafting a procurement Term of Reference (TOR) or locking into another multi-year proprietary license, commission an independent system dependency audit. At Sundawa, we begin by mapping real-world operational bottlenecks to ensure every technology dollar invested directly moves the business forward.
</p>

<div style="background: linear-gradient(135deg, rgba(14, 30, 48, 0.95), rgba(10, 25, 47, 0.95)); border: 1px solid rgba(219, 201, 119, 0.35); border-radius: 12px; padding: 2rem; margin: 2.5rem 0; text-align: center;">
    <h3 style="margin: 0 0 0.75rem; font-size: 1.35rem; color: #F8F8F8; font-weight: 800;">
        Unsure of the Right Path for Your ERP System?
    </h3>
    <p style="margin: 0 auto 1.5rem; max-width: 580px; color: rgba(248, 248, 248, 0.7); font-size: 0.95rem; line-height: 1.6;">
        Consult your system architecture directly with Sundawa lead engineers. We help map dependencies and identify the most cost-efficient path.
    </p>
    <a href="/en/contact?service=system-integration" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #DBC977; color: #0E1E30; font-weight: 800; font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.85rem 2rem; border-radius: 4px; text-decoration: none;">
        Discuss Your System &rarr;
    </a>
</div>
        `,
    },
    {
        id: 'pinned-migrasi-sistem-lama',
        slug: 'apa-yang-perlu-disiapkan-sebelum-migrasi-sistem-lama',
        title: 'What to Prepare Before Migrating a Legacy System?',
        excerpt:
            'Architectural readiness checklist, database dependency mapping, active vs. archive data segregation, and operational risk mitigation before modernizing mission-critical software.',
        published_at: '2026-11-14T09:00:00.000Z',
        body_html: `
<p class="lead">
Technology industry data indicates that over 65% of software modernization initiatives encounter delays or budget overruns not because engineers fail to write code, but due to <strong>inadequate data preparation and unmapped system dependencies prior to kickoff</strong>.
</p>

<p>
When a system that has served a business for 5 to 10 years is relocated or re-architected, informal business rules and hidden data dependencies rarely appear in official documentation. Here are 5 fundamental prerequisites your team must prepare before launching a legacy modernization initiative.
</p>

<h2>1. Real Dependency Audit (Beyond Written SOPs)</h2>
<p>
Legacy software routinely harbors legacy stored procedures, hidden database triggers, or scheduled cron scripts on local servers written years ago without proper versioning.
</p>
<ul>
    <li><strong>Map all database readers and writers:</strong> Which teams, departments, or third-party tools interact with the production database?</li>
    <li><strong>Trace month-end reporting paths:</strong> Which executive reports still rely on ad-hoc SQL queries directly against historical tables?</li>
    <li><strong>Identify hidden hardware/system integrations:</strong> Are there integrations to physical biometric devices, legacy payment terminals, or tax portals?</li>
</ul>

<h2>2. Data Cleansing &amp; Segregation: Active vs. Historical Archive</h2>
<p>
Never move dirty data into a modern architecture. Migrating millions of deprecated log rows only bloats the new schema and degrades initial performance.
</p>
<ul>
    <li><strong>Active Data:</strong> Data required for day-to-day operations (typically past 1–2 years, active accounts, product catalogs, and open balances). This must be cleansed and validated with 100% integrity.</li>
    <li><strong>Historical Archive:</strong> Multi-year historical records retained strictly for regulatory audit compliance. Export this to an encrypted data lake or cold storage, avoiding operational overhead.</li>
</ul>

<h2>3. Dual-Run / Parallel Run Transition Strategy</h2>
<p>
Avoid high-stakes <em>big-bang cutovers</em> where a legacy system is shut down on Friday night and the new build is deployed on Monday without side-by-side verification.
</p>
<p>
At Sundawa, we advocate for structured dual-run execution during the transition phase:
</p>
<ul>
    <li>Transaction data is ingested across both systems to automate numerical reconciliation.</li>
    <li>Discrepancies are identified and resolved before the legacy application is decommissioned.</li>
    <li>Frontline operators gain confidence navigating new workflows without first-day disruption.</li>
</ul>

<div style="background: rgba(219, 201, 119, 0.06); border: 1px solid rgba(219, 201, 119, 0.25); border-radius: 8px; padding: 1.25rem 1.5rem; margin: 1.5rem 0;">
    <p style="margin: 0 0 0.5rem; font-weight: 700; color: #F8F8F8; font-size: 1rem;">
        🛠️ Need an Engineering Partner for System Audit &amp; Migration?
    </p>
    <p style="margin: 0 0 0.75rem; color: rgba(248, 248, 248, 0.7); font-size: 0.92rem; line-height: 1.6;">
        Sundawa assists enterprise teams with dependency audits, database segregation, and zero-downtime dual-run transitions.
    </p>
    <a href="/en/services/system-modernization" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #DBC977; font-weight: 700; font-size: 0.88rem; text-decoration: none;">
        Explore Legacy System Modernization Services &rarr;
    </a>
</div>

<h2>4. Written Acceptance Criteria Agreed by End Users</h2>
<p>
The definition of project success must be agreed upon in writing between technology leads, executive stakeholders, and daily operational staff.
</p>
<p>
Examples of concrete acceptance criteria:
</p>
<ul>
    <li><em>"Month-end financial statement generation runtime decreases from 4 hours to under 3 minutes."</em></li>
    <li><em>"Field agent order entry functions offline and synchronizes automatically upon reconnecting."</em></li>
    <li><em>"Zero ledger variance between new and legacy systems throughout 14 days of parallel execution."</em></li>
</ul>

<h2>5. Rollback Protocols &amp; Security Contingency Plans</h2>
<p>
True engineering readiness is measured by resilience in worst-case scenarios. Prior to launch, ensure:
</p>
<ul>
    <li>A verified full database snapshot tested through a complete disaster restoration drill.</li>
    <li>Rapid traffic re-routing procedures back to the previous environment within minutes if critical blockers emerge.</li>
    <li>Strict Non-Disclosure Agreements (NDA) and Role-Based Access Controls (RBAC) governing access to sensitive production data.</li>
</ul>

<h2>Relevant Case Study: Mission-Critical System Modernization</h2>
<div style="background: rgba(219, 201, 119, 0.06); border: 1px solid rgba(219, 201, 119, 0.3); border-radius: 8px; padding: 1.5rem; margin: 1.5rem 0;">
    <span style="font-size: 0.65rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #DBC977; display: block; margin-bottom: 0.5rem;">
        📂 Relevant Case Study
    </span>
    <h3 style="margin: 0 0 0.5rem; color: #F8F8F8; font-size: 1.15rem; font-weight: 800;">
        E-Office: Integrated Workflow Modernization &amp; Digital Administration
    </h3>
    <p style="margin: 0 0 1rem; color: rgba(248, 248, 248, 0.75); font-size: 0.92rem; line-height: 1.6;">
        How Sundawa transformed paper-based filing and approval hierarchies into an agile modular web system with role-based access control and zero operational disruption.
    </p>
    <a href="/en/portfolio/e-office" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #DBC977; font-weight: 700; font-size: 0.88rem; text-decoration: none;">
        Explore the E-Office Case Study &rarr;
    </a>
</div>

<h2>Conclusion</h2>
<p>
Modernizing mission-critical legacy software does not need to jeopardize business continuity. With thorough dependency mapping, disciplined data cleansing, and phased rollouts, technological transformation can proceed smoothly while safeguarding operational stability.
</p>

<div style="background: linear-gradient(135deg, rgba(14, 30, 48, 0.95), rgba(10, 25, 47, 0.95)); border: 1px solid rgba(219, 201, 119, 0.35); border-radius: 12px; padding: 2rem; margin: 2.5rem 0; text-align: center;">
    <h3 style="margin: 0 0 0.75rem; font-size: 1.35rem; color: #F8F8F8; font-weight: 800;">
        Build a Secure, Measured Migration Plan
    </h3>
    <p style="margin: 0 auto 1.5rem; max-width: 580px; color: rgba(248, 248, 248, 0.7); font-size: 0.95rem; line-height: 1.6;">
        Discuss your legacy readiness checklist with our software architects before making long-term capital commitments.
    </p>
    <a href="/en/contact?service=system-modernization" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #DBC977; color: #0E1E30; font-weight: 800; font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.85rem 2rem; border-radius: 4px; text-decoration: none;">
        Discuss Your System &rarr;
    </a>
</div>
        `,
    },
    {
        id: 'pinned-custom-business-app',
        slug: 'kapan-perusahaan-membutuhkan-aplikasi-bisnis-custom',
        title: 'When Do Enterprises Need Custom Business Software Over Off-the-Shelf Packages?',
        excerpt:
            'A strategic evaluation guide for enterprise leaders to evaluate the boundaries of off-the-shelf SaaS packages versus investing in custom business software tailored to proprietary workflows.',
        published_at: '2026-11-16T09:00:00.000Z',
        body_html: `
<p class="lead">
In an era of accelerated digital transformation, almost every operational requirement has ready-made software packages (off-the-shelf SaaS)—from CRM and warehouse inventory to courier booking and customer service portals. However, many growing organizations eventually reach a critical juncture where <strong>generic software becomes a bottleneck to business innovation</strong> by constraining proprietary workflows.
</p>

<p>
When is the right time to continue with off-the-shelf software, and when should an enterprise invest in custom business software development? Here is an objective strategic guide based on Sundawa engineering experience.
</p>

<h2>1. The Traps of Off-the-Shelf SaaS During Growth Phases</h2>
<p>
Off-the-shelf SaaS packages are ideal during initial formation stages due to fast adoption and predictable entry pricing. However, as business operational models develop competitive differentiators, the following friction points emerge:
</p>
<ul>
    <li><strong>Escalating per-seat licensing:</strong> As teams scale from dozens to hundreds of operators, recurring subscription fees surge without yielding proportional strategic value.</li>
    <li><strong>Forced workflow conformity:</strong> Operations teams are coerced into modifying internal SOPs simply to comply with rigid third-party vendor paradigms.</li>
    <li><strong>Data lock-in:</strong> Accessing granular transaction logs for independent analytics is frequently throttled or locked behind steep API fees.</li>
</ul>

<h2>2. When Does Custom Business Software Deliver Strategic Value?</h2>
<p>
Custom business application engineering is justified whenever operational execution serves as your fundamental competitive advantage.
</p>
<p><strong>Consider custom development if:</strong></p>
<ul>
    <li>Your operations incorporate unique business rules, multi-tiered compliance requirements, or pricing algorithms unsupported by standard SaaS tools.</li>
    <li>You require unified operational dashboards integrating disparate field data feeds, IoT telemetry, or specialized hardware peripherals.</li>
    <li>Your organization values full intellectual property (IP) ownership of core software assets to maximize enterprise valuation and technological independence.</li>
</ul>

<div style="background: rgba(219, 201, 119, 0.06); border: 1px solid rgba(219, 201, 119, 0.25); border-radius: 8px; padding: 1.25rem 1.5rem; margin: 1.5rem 0;">
    <p style="margin: 0 0 0.5rem; font-weight: 700; color: #F8F8F8; font-size: 1rem;">
        ⚡ Need a Platform Tailored to Your Exact Business Workflows?
    </p>
    <p style="margin: 0 0 0.75rem; color: rgba(248, 248, 248, 0.7); font-size: 0.92rem; line-height: 1.6;">
        Sundawa engineers tailored business platforms, integrated client portals, and operational management systems designed specifically for your organizational structure.
    </p>
    <a href="/en/services/custom-platform" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #DBC977; font-weight: 700; font-size: 0.88rem; text-decoration: none;">
        Explore Sundawa Custom Business Platform Services &rarr;
    </a>
</div>

<h2>3. Relevant Case Study: Hospital Digital Presence &amp; Healthcare Scheduling</h2>
<p>
A concrete example of tailored platforms is evident in healthcare, where generic website builders fail to handle the dynamic scheduling requirements of specialist medical practitioners.
</p>

<div style="background: rgba(0, 86, 170, 0.08); border: 1px solid rgba(0, 86, 170, 0.35); border-radius: 8px; padding: 1.5rem; margin: 2rem 0;">
    <span style="font-size: 0.65rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #00F0FF; display: block; margin-bottom: 0.5rem;">
        📂 Relevant Case Study
    </span>
    <h3 style="margin: 0 0 0.5rem; color: #F8F8F8; font-size: 1.15rem; font-weight: 800;">
        Oetomo Hospital Website: Hospital Information &amp; Digital Presence
    </h3>
    <p style="margin: 0 0 1rem; color: rgba(248, 248, 248, 0.75); font-size: 0.92rem; line-height: 1.6;">
        Sundawa developed a high-performance responsive institutional website with an independent CMS, dynamic specialist doctor directories, and centralized medical navigation.
    </p>
    <a href="/en/portfolio/oetomo-hospital-website" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #DBC977; font-weight: 700; font-size: 0.88rem; text-decoration: none;">
        Read the Oetomo Hospital Case Study &rarr;
    </a>
</div>

<h2>Conclusion</h2>
<p>
Custom business software does not require abandoning existing systems. The most cost-effective architecture is often hybrid: retaining generic SaaS tools for standard back-office functions while developing custom proprietary applications for your core differentiator.
</p>

<div style="background: linear-gradient(135deg, rgba(14, 30, 48, 0.95), rgba(10, 25, 47, 0.95)); border: 1px solid rgba(219, 201, 119, 0.35); border-radius: 12px; padding: 2rem; margin: 2.5rem 0; text-align: center;">
    <h3 style="margin: 0 0 0.75rem; font-size: 1.35rem; color: #F8F8F8; font-weight: 800;">
        Plan Your Custom Business Application
    </h3>
    <p style="margin: 0 auto 1.5rem; max-width: 580px; color: rgba(248, 248, 248, 0.7); font-size: 0.95rem; line-height: 1.6;">
        Discuss your operational requirements and technical architecture directly with Sundawa software engineers.
    </p>
    <a href="/en/contact?service=custom-platform" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #DBC977; color: #0E1E30; font-weight: 800; font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.85rem 2rem; border-radius: 4px; text-decoration: none;">
        Discuss Your Custom Platform &rarr;
    </a>
</div>
        `,
    },
]

export function isPostTranslated(slug: string): boolean {
    return PINNED_POSTS_EN.some((p) => p.slug === slug)
}

export function getPinnedPosts(locale = 'id'): readonly Post[] {
    return locale === 'en' ? PINNED_POSTS_EN : PINNED_POSTS
}
