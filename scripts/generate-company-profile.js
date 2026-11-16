const fs = require('fs')
const path = require('path')

// Minimalistic, standard-compliant PDF generator without external dependencies
class SimplePDFBuilder {
    constructor() {
        this.objects = []
        this.pages = []
    }

    addObject(content) {
        this.objects.push(content)
        return this.objects.length // 1-based object number
    }

    addPage(streamContent) {
        this.pages.push(streamContent)
    }

    build() {
        const streamRefs = []

        // Object 1: Catalog (will be added after pages)
        // Object 2: Pages container
        // Object 3: Font Helvetica
        // Object 4: Font Helvetica-Bold
        // Subsequent objects: Page objects and their Content streams

        const font1Id = 3
        const font2Id = 4

        const pageObjectIds = []
        const totalPages = this.pages.length

        // Preallocate catalog, pages, fonts
        // Obj 1: Catalog
        // Obj 2: Pages
        // Obj 3: Font Helvetica
        // Obj 4: Font Helvetica-Bold

        let currentObjId = 5
        const pageContentPairs = []

        for (let i = 0; i < totalPages; i++) {
            const pageId = currentObjId++
            const contentId = currentObjId++
            pageObjectIds.push(pageId)
            pageContentPairs.push({ pageId, contentId, stream: this.pages[i] })
        }

        const objectsMap = new Map()

        objectsMap.set(1, '<< /Type /Catalog /Pages 2 0 R >>')
        objectsMap.set(2, `<< /Type /Pages /Kids [${pageObjectIds.map(id => `${id} 0 R`).join(' ')}] /Count ${totalPages} >>`)
        objectsMap.set(3, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>')
        objectsMap.set(4, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>')

        for (const pair of pageContentPairs) {
            objectsMap.set(pair.pageId, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${pair.contentId} 0 R >>`)
            const streamLength = Buffer.byteLength(pair.stream, 'latin1')
            objectsMap.set(pair.contentId, `<< /Length ${streamLength} >>\nstream\n${pair.stream}\nendstream`)
        }

        let pdf = '%PDF-1.4\n%âãÏÓ\n'
        const xrefOffsets = [0] // 0000000000 65535 f

        const totalObjectsCount = objectsMap.size

        for (let i = 1; i <= totalObjectsCount; i++) {
            const offset = Buffer.byteLength(pdf, 'latin1')
            xrefOffsets.push(offset)
            pdf += `${i} 0 obj\n${objectsMap.get(i)}\nendobj\n`
        }

        const startXref = Buffer.byteLength(pdf, 'latin1')
        pdf += `xref\n0 ${totalObjectsCount + 1}\n`
        pdf += '0000000000 65535 f \n'

        for (let i = 1; i <= totalObjectsCount; i++) {
            const offStr = String(xrefOffsets[i]).padStart(10, '0')
            pdf += `${offStr} 00000 n \n`
        }

        pdf += `trailer\n<< /Size ${totalObjectsCount + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`
        return Buffer.from(pdf, 'latin1')
    }
}

// Escape special characters in PDF strings
function esc(str) {
    return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

function buildPage1() {
    let s = ''
    // Background Dark Navy top accent block
    s += '0.04 0.08 0.15 rg 0 740 595.28 102 re f\n'
    // Gold line under header
    s += '0.86 0.79 0.47 RG 2 w 0 740 595.28 0 re S\n'

    // Header Text
    s += 'BT\n/F2 18 Tf 1 1 1 rg 40 795 Td (PT SUNDAWA TEKNOLOGI INDONESIA) Tj ET\n'
    s += 'BT\n/F1 9 Tf 0.86 0.79 0.47 rg 40 778 Td (COMPANY PROFILE & PROCUREMENT SPECIFICATION) Tj ET\n'
    s += 'BT\n/F2 8 Tf 0.9 0.9 0.9 rg 40 758 Td (Client-Centric Comfort, Professional Precision) Tj ET\n'

    let y = 705

    // Section 1: IDENTITAS & LEGALITAS PERUSAHAAN
    s += `BT\n/F2 11 Tf 0.1 0.25 0.45 rg 40 ${y} Td (1. IDENTITAS & LEGALITAS PERUSAHAAN) Tj ET\n`
    y -= 6
    s += `0.86 0.79 0.47 RG 1 w 40 ${y} 515 0 re S\n`
    y -= 16

    const legalItems = [
        ['Nama Legalitas Perusahaan', 'PT Sundawa Teknologi Indonesia'],
        ['Bentuk Badan Usaha', 'Perseroan Terbatas (PT) Terdaftar Resmi di Kemenkumham RI'],
        ['Kantor Operasional / Studio', 'Bandung, Jawa Barat, Indonesia'],
        ['Email Resmi Pengadaan & Bisnis', 'contact@sundawa.net'],
        ['Telepon / Saluran Komunikasi', '+62 823-1808-7980'],
        ['Situs Resmi', 'https://sundawa.net'],
        ['Model Tata Kelola Proyek', 'Senior-Led Core Team (Didampingi langsung Principal CEO/CTO/COO)'],
        ['Kedaulatan Kode & HKI', '100% Hak Cipta, Source Code Penuh, & Repositori diserahkan ke Klien'],
        ['Kerahasiaan Data (NDA)', 'Mutual NDA standar tersedia sejak tahap Discovery & Scoping'],
    ]

    for (const [k, v] of legalItems) {
        s += `BT\n/F2 8 Tf 0.2 0.2 0.2 rg 45 ${y} Td (${esc(k)}:) Tj ET\n`
        s += `BT\n/F1 8 Tf 0.3 0.3 0.3 rg 210 ${y} Td (${esc(v)}) Tj ET\n`
        y -= 14
    }

    y -= 10

    // Section 2: 6 LAYANAN REKAYASA TEKNOLOGI
    s += `BT\n/F2 11 Tf 0.1 0.25 0.45 rg 40 ${y} Td (2. LAYANAN INTI & SPESIFIKASI SOLUSI) Tj ET\n`
    y -= 6
    s += `0.86 0.79 0.47 RG 1 w 40 ${y} 515 0 re S\n`
    y -= 16

    const services = [
        [
            'A. Modernisasi Sistem Lama (Legacy System Modernization)',
            'Membenahi platform usang tanpa mengganggu operasional yang berjalan. Deliverables mencakup: System Dependency Map, Matriks Komponen Dipertahankan vs. Refactor, dan Rencana Migrasi Bertahap (Zero Downtime / Strangler Fig Pattern).'
        ],
        [
            'B. Otomatisasi Alur Kerja & AI (Workflow Automation & AI)',
            'Menghubungkan alur kerja tim, mengeliminasi entri data repetitif manual, dan menyematkan model AI cerdas (OCR struk/dokumen, klasifikasi transaksi, verifikasi geofencing).'
        ],
        [
            'C. Integrasi Sistem & Data (ERP, Databases & APIs)',
            'Sinkronisasi real-time dua arah lintas sistem ERP, CRM, Core Banking, perbankan, dan data center. Dilengkapi spesifikasi kontrak API terstandarisasi, middleware webhook, dan audit trail rekonsiliasi data.'
        ],
        [
            'D. Platform Bisnis Khusus (Bespoke Enterprise Systems)',
            'Rancang bangun sistem kustom berbasis web dan mobile untuk alur bisnis kompleks. Menjamin kepatuhan proses, performa tinggi, dan antarmuka ramah pengguna bagi staf operasional.'
        ],
        [
            'E. Managed Product Engineering',
            'Kemitraan rekayasa jangka panjang pasca-peluncuran dengan cakupan SLA monitoring 24/7, alur pelaporan insiden darurat berjenjang (P1-P4), serta pengelolaan backlog dan prioritisasi sprint mingguan.'
        ],
        [
            'F. Tim Alih Daya IT Terkelola (Dedicated Engineering Outsourcing)',
            'Penyediaan talenta engineer senior (Frontend, Backend, Mobile, Fullstack, DevOps, QA, UI/UX, PM) dengan model remote, hybrid, atau onsite terintegrasi dengan budaya kerja klien.'
        ]
    ]

    for (const [title, desc] of services) {
        s += `BT\n/F2 8.5 Tf 0.1 0.2 0.35 rg 45 ${y} Td (${esc(title)}) Tj ET\n`
        y -= 11
        // Wrap description to 2 lines
        const words = desc.split(' ')
        let l1 = ''
        let l2 = ''
        let isL1 = true
        for (const w of words) {
            if (isL1 && (l1 + w).length < 105) {
                l1 += (l1 ? ' ' : '') + w
            } else {
                isL1 = false
                l2 += (l2 ? ' ' : '') + w
            }
        }
        s += `BT\n/F1 7.5 Tf 0.35 0.35 0.35 rg 55 ${y} Td (${esc(l1)}) Tj ET\n`
        y -= 10
        if (l2) {
            s += `BT\n/F1 7.5 Tf 0.35 0.35 0.35 rg 55 ${y} Td (${esc(l2)}) Tj ET\n`
            y -= 10
        }
        y -= 4
    }

    // Page 1 Footer
    s += 'BT\n/F1 7 Tf 0.5 0.5 0.5 rg 40 30 Td (PT Sundawa Teknologi Indonesia · Dokumen Profil Resmi Perusahaan & Pengadaan · Halaman 1 dari 2) Tj ET\n'
    return s
}

function buildPage2() {
    let s = ''
    // Header minimal
    s += '0.04 0.08 0.15 rg 0 780 595.28 62 re f\n'
    s += '0.86 0.79 0.47 RG 1 w 0 780 595.28 0 re S\n'
    s += 'BT\n/F2 13 Tf 1 1 1 rg 40 805 Td (PT SUNDAWA TEKNOLOGI INDONESIA) Tj ET\n'
    s += 'BT\n/F1 8 Tf 0.86 0.79 0.47 rg 40 790 Td (REKAM JEJAK PROYEK, OPSI DEPLOYMENT & INFORMASI PENGADAAN) Tj ET\n'

    let y = 745

    // Section 3: PROYEK PILIHAN & REKAM JEJAK PUBLIK
    s += `BT\n/F2 11 Tf 0.1 0.25 0.45 rg 40 ${y} Td (3. PROYEK PILIHAN & REKAM JEJAK YANG BOLEH DIPUBLIKASIKAN) Tj ET\n`
    y -= 6
    s += `0.86 0.79 0.47 RG 1 w 40 ${y} 515 0 re S\n`
    y -= 16

    const projects = [
        [
            '1. DACAR by UNDP (United Nations Development Programme)',
            'Platform Distribusi Dana Tunai Digital Lintas Platform (Mobile, Web, Backend Cloud)',
            'Hasil: Memfasilitasi distribusi dana tunai lapangan secara akuntabel dengan validasi identitas real-time, audit log terenkripsi, dan meniadakan proses rekonsiliasi berbasis kertas.'
        ],
        [
            '2. E-Office (Instansi Pemerintahan & Korporasi)',
            'Sistem Administrasi Perkantoran & Persuratan Terintegrasi (RBAC, Disposisi Berjenjang)',
            'Hasil: Digitalisasi penuh tata usaha persuratan dinas, mempercepat alur disposisi pimpinan, dan menyediakan arsip digital terindeks dengan keamanan akses berbasis peran.'
        ],
        [
            '3. Oetomo Hospital (Layanan Kesehatan Bandung)',
            'Platform Informasi Institusional & Branding Kehadiran Digital Rumah Sakit',
            'Hasil: Membangun kanal komunikasi digital resmi yang terpercaya, memudahkan pasien mengakses jadwal dokter spesialis real-time, serta CMS mandiri bagi staf rumah sakit.'
        ],
        [
            '4. SI-GEOMEDIK (Kementerian Pertahanan RI)',
            'Portal Geospasial Sumber Daya Kesehatan Pertahanan Terproteksi (Kemhan RI)',
            'Hasil: Implementasi operasional berjalan untuk inventarisasi Faskes, SDM medis, Alkes, dan Matkes dengan 3 tingkatan wewenang (Operator, Verifikator, Pusdatin) & sesi HS256.'
        ],
        [
            '5. LAKUPANDAI by Sundawa (Perbankan Komersial, BPD & BPR)',
            'Showcase Kapabilitas Arsitektur & Skenario Penerapan Agent Banking Enterprise',
            'Hasil: Menghadirkan kendali penuh bank: Android Keystore hardware key binding, geofencing GPS/WiFi BSSID, Maker-Checker, dan core banking adapter ISO 8583 / ISO 20022.'
        ]
    ]

    for (const [title, sub, res] of projects) {
        s += `BT\n/F2 8.5 Tf 0.1 0.2 0.35 rg 45 ${y} Td (${esc(title)}) Tj ET\n`
        y -= 11
        s += `BT\n/F2 7.5 Tf 0.4 0.4 0.4 rg 55 ${y} Td (Kategori: ${esc(sub)}) Tj ET\n`
        y -= 10
        s += `BT\n/F1 7.5 Tf 0.3 0.3 0.3 rg 55 ${y} Td (${esc(res)}) Tj ET\n`
        y -= 14
    }

    y -= 6

    // Section 4: MODEL DEPLOYMENT & KEPATUHAN KEAMANAN
    s += `BT\n/F2 11 Tf 0.1 0.25 0.45 rg 40 ${y} Td (4. OPSI DEPLOYMENT & KEPATUHAN KEAMANAN SISTEM) Tj ET\n`
    y -= 6
    s += `0.86 0.79 0.47 RG 1 w 40 ${y} 515 0 re S\n`
    y -= 16

    const deployment = [
        ['On-Premise Private Data Center', 'Mendukung instalasi di Primary DC & Hot Standby DRC internal institusi/bank (RHEL 9, Podman/Docker, Kubernetes/OpenShift). Memenuhi kedaulatan data penuh.'],
        ['Compliant Local Cloud', 'Kesiapan deployment di infrastruktur cloud berlokasi di region Indonesia (Jakarta Region: AWS, GCP, Azure, atau Biznet/AliCloud) sesuai kepatuhan regulasi.'],
        ['Keamanan & Standar Enkripsi', 'Sesi login terenkripsi HS256, mTLS + hardware device key binding, hashing ledger SHA-256, dan audit trail kepatuhan SUNDAWA SEC-07.'],
        ['Penyerahan Aset & Bebas Lock-in', 'Pada tahap BAST, klien menerima full source code, skema basis data, repositori Git, dan dokumentasi API tanpa keterikatan lisensi tertutup (vendor lock-in).'],
    ]

    for (const [t, d] of deployment) {
        s += `BT\n/F2 8 Tf 0.15 0.2 0.3 rg 45 ${y} Td (${esc(t)}:) Tj ET\n`
        y -= 10
        s += `BT\n/F1 7.5 Tf 0.35 0.35 0.35 rg 55 ${y} Td (${esc(d)}) Tj ET\n`
        y -= 13
    }

    y -= 6

    // Section 5: KONTAK PENGADAAN & KEMITRAAN BISNIS
    s += `BT\n/F2 11 Tf 0.1 0.25 0.45 rg 40 ${y} Td (5. KONTAK BISNIS & KONSULTASI PENGADAAN) Tj ET\n`
    y -= 6
    s += `0.86 0.79 0.47 RG 1 w 40 ${y} 515 0 re S\n`
    y -= 16

    s += 'BT\n/F1 8 Tf 0.3 0.3 0.3 rg 45 ' + y + ' Td (Untuk diskusi NDA, permintaan proposal teknis, estimasi anggaran proyek, atau presentasi pimpinan, hubungi:) Tj ET\n'
    y -= 14

    s += '0.95 0.95 0.97 rg 40 ' + (y - 50) + ' 515 55 re f\n'
    s += '0.86 0.79 0.47 RG 1 w 40 ' + (y - 50) + ' 515 55 re S\n'

    s += `BT\n/F2 8.5 Tf 0.1 0.2 0.4 rg 50 ${y - 14} Td (Email Pengadaan: contact@sundawa.net) Tj ET\n`
    s += `BT\n/F2 8.5 Tf 0.1 0.2 0.4 rg 50 ${y - 28} Td (WhatsApp / Telepon Bisnis: +62 823-1808-7980) Tj ET\n`
    s += `BT\n/F2 8.5 Tf 0.1 0.2 0.4 rg 50 ${y - 42} Td (Website Resmi: https://sundawa.net) Tj ET\n`

    s += `BT\n/F1 8 Tf 0.3 0.3 0.3 rg 320 ${y - 14} Td (PT Sundawa Teknologi Indonesia) Tj ET\n`
    s += `BT\n/F1 8 Tf 0.3 0.3 0.3 rg 320 ${y - 28} Td (Bandung, Jawa Barat, Indonesia) Tj ET\n`
    s += `BT\n/F2 8 Tf 0.86 0.6 0.1 rg 320 ${y - 42} Td (Standard: Client-Centric Comfort, Professional Precision) Tj ET\n`

    // Page 2 Footer
    s += 'BT\n/F1 7 Tf 0.5 0.5 0.5 rg 40 30 Td (PT Sundawa Teknologi Indonesia · Dokumen Profil Resmi Perusahaan & Pengadaan · Halaman 2 dari 2) Tj ET\n'
    return s
}

const builder = new SimplePDFBuilder()
builder.addPage(buildPage1())
builder.addPage(buildPage2())

const pdfBuffer = builder.build()
const outputPath = path.join(__dirname, '..', 'public', 'company-profile.pdf')
fs.writeFileSync(outputPath, pdfBuffer)
console.log(`Generated Company Profile PDF successfully at ${outputPath} (${pdfBuffer.length} bytes)`)
