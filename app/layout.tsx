import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
    themeColor: '#0E1E30',
    width: 'device-width',
    initialScale: 1,
}

export const metadata: Metadata = {
    title: {
        default: 'Sundawa Teknologi | Software House Bandung - Laravel, Flutter & Web3',
        template: '%s | Sundawa Teknologi',
    },

    description:
        'Sundawa Teknologi adalah software house di Bandung spesialis jasa pembuatan website Laravel, aplikasi mobile Flutter, Next.js, dan Smart Contract Web3. Custom software development & digital transformation.',

    keywords: [
        'Sundawa Teknologi',
        'software house Bandung',
        'jasa IT Indonesia',
        'IT company Bandung',
        'web development Bandung',
        'mobile app development Indonesia',
        'digital transformation Indonesia',
        'solusi IT Bandung',

        // Backend
        'Laravel developer Bandung',
        'Laravel developer Indonesia',
        'jasa Laravel',
        'Node.js developer Bandung',
        'Go developer Indonesia',
        'Golang developer Bandung',
        '.NET developer Indonesia',

        // Frontend
        'Next.js developer Bandung',
        'React developer Bandung',
        'TypeScript developer Bandung',

        // Mobile
        'Flutter developer Bandung',
        'Flutter developer Indonesia',
        'Kotlin developer Bandung',

        // DevOps & Database
        'Docker developer Bandung',
        'DevOps engineer Bandung',
        'PostgreSQL developer Indonesia',

        // Web3
        'Solidity developer Indonesia',
        'Web3 developer Indonesia',
        'Smart contract developer',
        'Ethereum developer Bandung',

        // Long Tail
        'jasa pembuatan website Bandung',
        'jasa pembuatan aplikasi mobile Bandung',
        'custom software development Bandung',
        'perusahaan software house Bandung',
        'SaaS development Indonesia',
        'blockchain development Indonesia',
        'IT outsourcing Bandung',
    ],

    authors: [{ name: 'Sundawa Teknologi', url: 'https://sundawa.net' }],
    creator: 'Sundawa Teknologi',
    publisher: 'Sundawa Teknologi',

    metadataBase: new URL('https://sundawa.net'),
    alternates: {
        canonical: '/',
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // Open Graph
    openGraph: {
        type: 'website',
        locale: 'id_ID',
        url: 'https://sundawa.net',
        siteName: 'Sundawa Teknologi',
        title: 'Sundawa Teknologi | Software House Bandung Terpercaya',
        description:
            'Spesialis Laravel, Flutter, Next.js, dan Web3 Development di Bandung. Professional Precision, Customer Comfort.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Sundawa Teknologi - Software House Bandung',
            },
        ],
    },

    // Twitter Card
    twitter: {
        card: 'summary_large_image',
        title: 'Sundawa Teknologi | Software House Bandung',
        description:
            'Jasa IT Profesional: Laravel, Flutter, Next.js & Blockchain di Bandung',
        images: ['/og-image.png'],
    },

    // Icons
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: '/apple-touch-icon.png',
        shortcut: '/favicon-16x16.png',
    },

    // Verification (isi nanti setelah verifikasi Google Search Console)
    verification: {
        google: '', // masukkan kode verifikasi di sini
    },
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="id">
        <body>{children}</body>
        </html>
    )
}