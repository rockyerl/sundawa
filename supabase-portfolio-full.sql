-- Combined migration + seed for portfolio table
-- Run this ONCE in Supabase Studio → SQL Editor to set up the portfolio table with all 21 projects

-- 1. Create the table (drops if exists to ensure clean state)
DROP TABLE IF EXISTS portfolio CASCADE;

CREATE TABLE portfolio (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug text UNIQUE NOT NULL,
    num text NOT NULL,
    name text NOT NULL,
    initials text NOT NULL,
    type text NOT NULL,
    desc text NOT NULL,
    confidential boolean DEFAULT false,
    challenge text NOT NULL,
    architecture text NOT NULL,
    role text NOT NULL,
    impact text NOT NULL,
    main_image_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Indexes for faster queries
CREATE INDEX idx_portfolio_slug ON portfolio(slug);
CREATE INDEX idx_portfolio_created_at ON portfolio(created_at DESC);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_portfolio_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_portfolio_updated_at
    BEFORE UPDATE ON portfolio
    FOR EACH ROW
    EXECUTE FUNCTION update_portfolio_updated_at_column();

-- Disable RLS for admin panel access
ALTER TABLE portfolio DISABLE ROW LEVEL SECURITY;

-- 2. Seed all 21 portfolio projects
INSERT INTO portfolio (slug, num, name, initials, type, desc, confidential, challenge, architecture, role, impact) VALUES
(
    'oetomo-hospital-website',
    '01',
    'Oetomo Hospital Website',
    'OH',
    'Branding Rumah Sakit & Kehadiran Digital',
    'Website khusus untuk memperkuat branding rumah sakit dan komunikasi institusi.',
    false,
    'Membangun kehadiran digital yang profesional untuk memperkuat branding rumah sakit dan menyampaikan informasi institusi melalui website khusus.',
    'Arsitektur web berbasis CMS yang dirancang untuk mendukung pengelolaan konten terstruktur, tampilan responsif, dan operasional website yang mudah dipelihara.',
    'Menyelesaikan pengembangan website mencakup analisis sistem, implementasi backend, pengembangan frontend, quality assurance, dan koordinasi proyek.',
    'Menyediakan platform digital terpusat untuk mendukung branding rumah sakit, komunikasi institusi, dan pengelolaan konten.'
),
(
    'gatsby-website',
    '02',
    'Gatsby Website',
    'GW',
    'Website Branding Perusahaan',
    'Website korporat untuk memperkuat identitas merek dan menyajikan informasi bisnis.',
    false,
    'Membuat platform digital khusus untuk memperkuat identitas merek dan menyajikan informasi bisnis melalui pengalaman web yang mudah diakses.',
    'Arsitektur website responsif yang terintegrasi dengan content management system untuk mendukung pembaruan konten yang fleksibel dan mudah dipelihara.',
    'Menyelesaikan proses pengembangan website, termasuk analisis sistem, implementasi backend dan frontend, serta quality assurance.',
    'Membangun kehadiran digital khusus untuk mendukung komunikasi merek dan pengelolaan konten berkelanjutan.'
),
(
    'sales-kit',
    '03',
    'Sales Kit',
    'SK',
    'Platform Pendukung Penjualan Digital',
    'Platform web terpusat untuk menyajikan informasi produk bagi tim penjualan dan pemasaran.',
    false,
    'Mendukung tim penjualan dan pemasaran dengan platform digital terpusat untuk menyederhanakan presentasi produk dan mempermudah akses ke materi pemasaran.',
    'Arsitektur aplikasi web berbasis CMS dengan konten produk terstruktur, pengelolaan informasi terpusat, dan tampilan frontend responsif.',
    'Mengembangkan aplikasi Sales Kit berbasis web, mencakup analisis sistem, pengembangan backend, implementasi frontend, dan quality assurance.',
    'Menyediakan platform terpusat bagi tim penjualan dan pemasaran untuk mengelola dan menyajikan informasi produk dengan lebih efisien.'
),
(
    'dacar-by-undp',
    '04',
    'DACAR by UNDP',
    'UNDP',
    'Platform Distribusi Dana Tunai Digital',
    'Aplikasi distribusi dana berbasis acara yang dikembangkan menjadi platform digital yang lebih luas.',
    false,
    'Mengadaptasi aplikasi distribusi dana tunai berbasis acara menjadi platform yang mendukung distribusi pendanaan untuk acara terorganisir dan aktivitas operasional terkait.',
    'Arsitektur aplikasi lintas platform yang menggabungkan web, mobile, layanan backend, dan infrastruktur basis data, dengan deployment cloud dan komponen aplikasi yang terintegrasi.',
    'Berkontribusi dalam pengembangan platform digital melalui manajemen proyek, analisis sistem, UI/UX, rekayasa backend dan frontend, pengembangan mobile, QA, dan DevOps.',
    'Memperluas kemampuan aplikasi untuk mendukung distribusi dana tunai digital dalam konteks operasional berbasis acara.'
),
(
    'e-office',
    '05',
    'E-Office',
    'EO',
    'Sistem Administrasi Perkantoran Terintegrasi',
    'Platform digital untuk surat-menyurat, disposisi dokumen, dan administrasi internal.',
    false,
    'Mendigitalkan proses administrasi perkantoran, khususnya surat-menyurat, disposisi dokumen, dan aktivitas administrasi internal lainnya.',
    'Arsitektur aplikasi web modular yang mendukung alur kerja dokumen, proses administrasi, dan interaksi berbasis peran antar pengguna kantor.',
    'Menyelesaikan pengembangan aplikasi melalui analisis sistem, desain UI/UX, rekayasa backend dan frontend, QA, dan DevOps.',
    'Menyediakan platform digital untuk mendukung pengelolaan alur kerja administrasi, penanganan dokumen, dan operasional internal kantor.'
),
(
    'kayaroll-hris',
    '06',
    'Kayaroll — HRIS',
    'KR',
    'Sistem Penggajian & Informasi SDM',
    'Platform penggajian dan HRIS yang mudah diakses untuk UMKM dan startup.',
    false,
    'Menyediakan solusi penggajian yang mudah diakses bagi UMKM dan startup untuk menyederhanakan administrasi gaji dan mendukung proses terkait karyawan di desktop maupun perangkat mobile.',
    'Arsitektur HRIS responsif yang menggabungkan layanan backend dan antarmuka web untuk mendukung alur kerja penggajian dan akses multi-perangkat.',
    'Berkontribusi dalam pengembangan platform HRIS melalui analisis sistem, UI/UX, rekayasa backend dan frontend, QA, dan DevOps.',
    'Membangun platform penggajian digital yang dirancang untuk menyederhanakan administrasi gaji dan meningkatkan aksesibilitas bagi UMKM, startup, dan karyawannya.'
),
(
    'healthcare',
    '07',
    'Healthcare',
    'HC',
    'Sistem Informasi Kesehatan Berbasis FHIR',
    'Aplikasi kesehatan yang selaras dengan FHIR dan ICD-10 untuk rumah sakit menengah dan kecil.',
    false,
    'Mendukung rumah sakit menengah dan kecil dengan aplikasi kesehatan digital yang selaras dengan standar data kesehatan, termasuk FHIR dan ICD-10.',
    'Arsitektur aplikasi kesehatan yang mencakup rekam medis elektronik, layanan gawat darurat, rawat jalan, dan rawat inap, dengan komponen aplikasi web dan mobile.',
    'Mengembangkan aplikasi kesehatan melalui analisis sistem, implementasi backend dan frontend, pengembangan mobile, dan quality assurance.',
    'Menyediakan platform kesehatan digital untuk mendukung pengelolaan informasi klinis dan alur layanan rumah sakit di berbagai unit perawatan.'
),
(
    'ehr',
    '08',
    'EHR',
    'EHR',
    'Aplikasi Layanan Kelistrikan Digital',
    'Platform digital untuk permohonan layanan listrik, pembayaran, dan penagihan.',
    false,
    'Mendigitalkan permohonan layanan listrik publik, termasuk sambungan baru, tambah daya, dan pemutusan layanan, beserta proses pembayaran dan penagihan.',
    'Arsitektur layanan terintegrasi yang menggabungkan pengelolaan pesanan pelanggan, integrasi payment gateway, proses penagihan, serta aplikasi web dan mobile.',
    'Menyelesaikan pengembangan aplikasi mencakup analisis sistem, rekayasa backend dan frontend, pengembangan mobile, dan QA.',
    'Menyediakan platform layanan digital untuk mendukung permohonan layanan listrik, pemrosesan pembayaran, dan pengelolaan penagihan.'
),
(
    'zakat-sholat-reminder',
    '09',
    'Zakat & Sholat Reminder',
    'ZS',
    'Aplikasi Gaya Hidup Islami & Pengingat',
    'Aplikasi untuk informasi zakat dan pengingat sholat.',
    false,
    'Menyediakan aplikasi digital untuk mendukung aktivitas ibadah harian melalui informasi terkait zakat dan pengingat sholat.',
    'Arsitektur aplikasi lintas platform yang menggabungkan layanan backend, antarmuka web, dan fungsi aplikasi mobile untuk mendukung pengalaman pengguna berbasis pengingat.',
    'Berkontribusi dalam pengembangan aplikasi melalui manajemen proyek, analisis sistem, rekayasa backend dan frontend, dan pengembangan mobile.',
    'Membangun platform digital yang menyediakan pengingat ibadah dan fitur terkait zakat yang mudah diakses.'
),
(
    'jabar-masagi',
    '10',
    'Jabar Masagi',
    'JM',
    'Dukungan Infrastruktur DevOps',
    'Dukungan rekayasa DevOps khusus dengan model outsourcing.',
    false,
    'Mendukung kebutuhan infrastruktur proyek melalui sumber daya rekayasa DevOps khusus.',
    'Pengelolaan infrastruktur dan lingkungan deployment, berfokus pada konfigurasi operasional dan kebutuhan teknis terkait DevOps.',
    'Menyediakan dukungan rekayasa DevOps khusus dengan model kerja sama outsourcing.',
    'Mendukung aktivitas proyek terkait infrastruktur dan kebutuhan operasional DevOps.'
),
(
    'telin',
    '11',
    'Telin',
    'TL',
    'Dukungan Rekayasa DevOps',
    'Tenaga DevOps khusus untuk kebutuhan infrastruktur dan deployment.',
    false,
    'Menyediakan sumber daya DevOps khusus untuk mendukung infrastruktur teknis dan kebutuhan proyek terkait deployment.',
    'Dukungan infrastruktur berfokus DevOps yang mencakup konfigurasi lingkungan dan aktivitas rekayasa terkait deployment.',
    'Menyediakan tenaga rekayasa DevOps khusus melalui model kerja sama outsourcing.',
    'Mendukung aktivitas infrastruktur proyek melalui sumber daya rekayasa DevOps khusus.'
),
(
    'tanahub',
    '12',
    'TanaHub',
    'TH',
    'Platform Aset Digital & Marketplace Terdesentralisasi',
    'Ekosistem digital untuk kepemilikan aset, barang virtual, dan partisipasi marketplace.',
    false,
    'Menciptakan ekosistem digital yang menggabungkan teknologi terdesentralisasi, alat kreatif, dan pengalaman imersif untuk memungkinkan kepemilikan aset digital, pembuatan barang virtual, dan partisipasi marketplace.',
    'Arsitektur platform konseptual yang melibatkan komponen teknologi terdesentralisasi, pengelolaan aset digital, fungsi marketplace, dan pengalaman pengguna imersif.',
    'Berkontribusi dalam pengembangan konsep platform digital TanaHub dan ekosistem teknologi pendukungnya.',
    'Membangun konsep platform yang dirancang untuk menghubungkan kepemilikan digital, barang virtual, dan pengalaman marketplace kolaboratif.'
),
(
    'pesona-kahuripan',
    '13',
    'Pesona Kahuripan',
    'PK',
    'Platform Pemasaran Properti Digital',
    'Platform web yang membantu kontraktor perumahan menampilkan penawaran propertinya.',
    false,
    'Meningkatkan kemampuan pemasaran properti dengan menyediakan platform digital bagi kontraktor perumahan untuk menampilkan penawaran properti dan memperkuat presentasi penjualan.',
    'Arsitektur aplikasi web yang berfokus pada penyajian informasi properti, konten pemasaran digital, dan pengelolaan profil penjualan terstruktur.',
    'Berkontribusi dalam pengembangan platform pemasaran berbasis web yang disesuaikan dengan kebutuhan bisnis kontraktor perumahan.',
    'Menyediakan platform pemasaran digital untuk mendukung presentasi properti dan meningkatkan visibilitas penawaran kontraktor perumahan.'
),
(
    'ppob',
    '14',
    'PPOB',
    'PP',
    'Platform Payment Point Online Banking Terintegrasi',
    'Platform pembayaran elektronik terpadu untuk utilitas, telekomunikasi, asuransi, dan lainnya.',
    false,
    'Menyediakan platform pembayaran elektronik terpadu yang mendukung berbagai layanan pembayaran, termasuk utilitas, telekomunikasi, asuransi, pulsa, dan transaksi keuangan.',
    'Arsitektur transaksi multi-layanan yang mengintegrasikan berbagai kategori pembayaran, pemrosesan transaksi, dan pengelolaan layanan pembayaran terpusat.',
    'Berkontribusi dalam pengembangan sistem ini sebagai bagian dari kerja sama rekayasa Sundawa.',
    'Dirancang untuk menghadirkan pengalaman pembayaran digital terpusat melalui platform transaksi elektronik terintegrasi.'
),
(
    'ahu-salinan',
    '15',
    'AHU Salinan',
    'AS',
    'Sistem Permohonan Salinan Dokumen Hukum',
    'Sistem permohonan salinan untuk dokumen hukum yang rusak atau hilang.',
    false,
    'Memfasilitasi permohonan salinan dokumen bagi individu yang dokumen hukum aslinya rusak atau hilang.',
    'Arsitektur pengelolaan permohonan dokumen yang melibatkan alur pengajuan, penanganan informasi dokumen, dan pemrosesan administrasi.',
    'Berkontribusi dalam pengembangan sistem ini sebagai bagian dari kerja sama rekayasa Sundawa.',
    'Mendukung digitalisasi proses permohonan salinan dokumen hukum dan penanganan dokumen administrasi.'
),
(
    'sipakar',
    '16',
    'SIPAKAR',
    'SP',
    'Sistem Manajemen Aset & Keuangan Internal',
    'Aplikasi digital untuk pengelolaan aset dan keuangan internal.',
    false,
    'Mendukung kebutuhan organisasi internal dalam mengelola aset dan informasi keuangan melalui aplikasi digital khusus.',
    'Arsitektur manajemen aset dan keuangan terintegrasi yang dirancang untuk mengorganisasi catatan operasional dan mendukung alur kerja manajemen internal.',
    'Berkontribusi dalam pengembangan sistem ini sebagai bagian dari kerja sama rekayasa Sundawa.',
    'Menyediakan solusi digital untuk mendukung administrasi aset internal dan aktivitas pengelolaan keuangan.'
),
(
    'ahu-rebuild',
    '17',
    'AHU Rebuild',
    'AR',
    'Modernisasi Sistem Pemerintahan',
    'Pengembangan ulang platform layanan pemerintah berbasis web yang sudah ada.',
    false,
    'Membangun ulang sistem pemerintah berbasis web yang sudah ada untuk memenuhi kebutuhan pengembangan ulang aplikasi tanpa mengubah tujuan layanan intinya.',
    'Pengembangan ulang sistem yang melibatkan fungsionalitas bisnis yang ada, rekonstruksi arsitektur aplikasi, dan kesinambungan alur kerja administrasi yang telah berjalan.',
    'Berkontribusi dalam pengembangan sistem ini sebagai bagian dari kerja sama rekayasa Sundawa.',
    'Mendukung pengembangan ulang platform layanan digital pemerintah yang sudah ada.'
),
(
    'indocell',
    '18',
    'Indocell',
    'IC',
    'Sistem POS & Manajemen Inventaris Ritel',
    'Sistem POS dan inventaris terintegrasi untuk toko aksesori ponsel.',
    false,
    'Mengelola operasional penjualan ritel dan inventaris untuk toko aksesori ponsel melalui solusi digital khusus.',
    'Arsitektur aplikasi ritel terintegrasi yang menggabungkan transaksi point-of-sale dan manajemen inventaris dalam satu sistem operasional.',
    'Berkontribusi dalam pengembangan sistem ini sebagai bagian dari kerja sama rekayasa Sundawa.',
    'Menyediakan platform digital terintegrasi untuk mendukung transaksi penjualan ritel dan administrasi inventaris.'
),
(
    'laku-pandai-ntbs',
    '19',
    'Laku Pandai NTBS',
    'LP',
    'Aplikasi EDC Agen Bank & Mini ATM',
    'Layanan perbankan berbasis EDC untuk agen dan operator mini ATM.',
    true,
    'Mendukung layanan perbankan Laku Pandai melalui perangkat electronic data capture yang digunakan agen bank dan operator mini ATM.',
    'Arsitektur aplikasi berbasis EDC yang melibatkan antarmuka transaksi tingkat perangkat, komunikasi backend, integrasi API, dan pemrosesan transaksi dalam lingkungan layanan perbankan.',
    'Berkontribusi dalam pengembangan sistem Laku Pandai untuk operasional agen bank dan mini ATM menggunakan perangkat EDC.',
    'Memungkinkan fungsi layanan perbankan digital melalui kanal agen dan mini ATM berbasis EDC.'
),
(
    'lbb-best-cirebon',
    '20',
    'LBB Best Cirebon',
    'LB',
    'Sistem Absensi Siswa & Pembayaran SPP Berbasis NFC',
    'Perangkat EDC berfitur NFC untuk absensi dan pembayaran SPP.',
    false,
    'Menyederhanakan pencatatan absensi siswa dan proses pembayaran SPP melalui perangkat EDC berfitur NFC.',
    'Arsitektur aplikasi terintegrasi yang menghubungkan terminal EDC berfitur NFC dengan manajemen absensi, pemrosesan pembayaran, dan layanan backend.',
    'Berkontribusi dalam pengembangan sistem absensi dan pembayaran SPP, termasuk fungsi aplikasi berbasis EDC dan integrasi sistem.',
    'Mendigitalkan pencatatan absensi siswa dan proses pembayaran SPP melalui teknologi EDC berfitur NFC.'
),
(
    'tmii',
    '21',
    'TMII',
    'TM',
    'Sistem Tiket Digital & Pembayaran Wahana',
    'Pembelian tiket digital untuk atraksi dan wahana lewat kiosk dan EDC.',
    false,
    'Menyediakan solusi pembelian tiket digital untuk atraksi dan wahana melalui perangkat kiosk dan EDC.',
    'Arsitektur transaksi multi-perangkat yang menghubungkan kiosk swalayan, terminal EDC, alur pembelian tiket, dan komponen pemrosesan transaksi.',
    'Berkontribusi dalam pengembangan sistem pembelian tiket digital untuk layanan atraksi dan wahana menggunakan perangkat kiosk dan EDC.',
    'Mendukung pembelian tiket digital dan pemrosesan transaksi melalui kanal layanan berbasis kiosk dan EDC.'
);
