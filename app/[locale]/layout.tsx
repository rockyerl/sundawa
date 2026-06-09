import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/src/i18n/routing'
import '../globals.css'

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
        'Sundawa Teknologi', 'software house Bandung', 'jasa IT Indonesia', 'IT company Bandung',
        'web development Bandung', 'mobile app development Indonesia', 'digital transformation Indonesia',
        'solusi IT Bandung', 'Laravel developer Bandung', 'Laravel developer Indonesia', 'jasa Laravel',
        'Node.js developer Bandung', 'Go developer Indonesia', 'Golang developer Bandung',
        '.NET developer Indonesia', 'Next.js developer Bandung', 'React developer Bandung',
        'TypeScript developer Bandung', 'Flutter developer Bandung', 'Flutter developer Indonesia',
        'Kotlin developer Bandung', 'Docker developer Bandung', 'DevOps engineer Bandung',
        'PostgreSQL developer Indonesia', 'Solidity developer Indonesia', 'Web3 developer Indonesia',
        'Smart contract developer', 'Ethereum developer Bandung', 'jasa pembuatan website Bandung',
        'jasa pembuatan aplikasi mobile Bandung', 'custom software development Bandung',
        'perusahaan software house Bandung', 'SaaS development Indonesia',
        'blockchain development Indonesia', 'IT outsourcing Bandung',
    ],
    authors: [{ name: 'Sundawa Teknologi', url: 'https://sundawa.net' }],
    creator: 'Sundawa Teknologi',
    publisher: 'Sundawa Teknologi',
    metadataBase: new URL('https://sundawa.net'),
    alternates: { canonical: '/' },
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
    openGraph: {
        type: 'website',
        locale: 'id_ID',
        url: 'https://sundawa.net',
        siteName: 'Sundawa Teknologi',
        title: 'Sundawa Teknologi | Software House Bandung Terpercaya',
        description: 'Spesialis Laravel, Flutter, Next.js, dan Web3 Development di Bandung. Professional Precision, Customer Comfort.',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Sundawa Teknologi - Software House Bandung' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sundawa Teknologi | Software House Bandung',
        description: 'Jasa IT Profesional: Laravel, Flutter, Next.js & Blockchain di Bandung',
        images: ['/og-image.png'],
    },
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: '/apple-touch-icon.png',
        shortcut: '/favicon-16x16.png',
    },
    verification: {
        google: '',
    },
}

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
                                               children,
                                               params,
                                           }: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    const messages = await getMessages()

    return (
        <NextIntlClientProvider messages={messages}>
            {children}
        </NextIntlClientProvider>
    )
}