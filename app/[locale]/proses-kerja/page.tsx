import { Metadata } from 'next'
import ProcessSection from '@/components/ProcessSection'

export const metadata: Metadata = {
    title: 'Proses Kerja Kami',
    description:
        'Transparan dari awal hingga akhir. Kenali tahapan kerja Sundawa Teknologi: discovery, desain, development, QA, serah terima kode, hingga pendampingan purna-rilis.',
    alternates: {
        canonical: 'https://sundawa.net/proses-kerja',
    },
    openGraph: {
        title: 'Proses Kerja Kami | Sundawa Teknologi',
        description: 'Setiap tahap, setiap keputusan — kenali cara kami bekerja sebelum Anda memulai proyek bersama kami.',
        url: 'https://sundawa.net/proses-kerja',
        siteName: 'Sundawa Teknologi',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Sundawa Teknologi - Proses Kerja' }],
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Proses Kerja Kami | Sundawa Teknologi',
        description: 'Transparan, terukur, akuntabel — begini cara kami membangun software Anda.',
        images: ['/og-image.png'],
    },
}

export default function Page() {
    return <ProcessSection />
}