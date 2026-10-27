import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/src/i18n/routing'
import { SITE_URL, SITE_NAME } from '@/lib/Seo'
import { GoogleAnalytics, InstallPrompt, IntroLoader, PageTransition, PWARegister, SkipLink } from '@/src/shared/ui'

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> }

export const viewport: Viewport = {
    themeColor: '#0E1E30',
    width: 'device-width',
    initialScale: 1,
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
}

// Site-wide defaults, in the active language. DO NOT put `alternates.canonical` here:
// layout metadata is inherited by every page, so a canonical here points every page at the homepage.
// Canonical + hreflang are set per page with pageMetadata() from '@/lib/seo'.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'meta.home' })

    return {
        metadataBase: new URL(SITE_URL),
        title: { default: t('title'), template: `%s | ${SITE_NAME}` },
        description: t('description'),
        applicationName: SITE_NAME,
        authors: [{ name: SITE_NAME, url: SITE_URL }],
        creator: SITE_NAME,
        publisher: SITE_NAME,
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        },
        openGraph: {
            type: 'website',
            siteName: SITE_NAME,
            locale: locale === 'en' ? 'en_US' : 'id_ID',
            title: t('ogTitle'),
            description: t('ogDescription'),
            images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${SITE_NAME}` }],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('ogTitle'),
            description: t('ogDescription'),
            images: ['/og-image.png'],
        },
        icons: {
            icon: [
                { url: '/favicon.ico' },
                { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
                { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
                { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
                { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
            ],
            apple: '/apple-touch-icon.png',
            shortcut: '/favicon-16x16.png',
            other: [
                { rel: 'manifest', url: '/manifest.json' },
            ],
        },
        verification: { google: '5af37c72f9949e81' },
    }
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params
    if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound()
    setRequestLocale(locale) // needed for static rendering with next-intl

    const messages = await getMessages({ locale })
    const t = await getTranslations({ locale, namespace: 'meta.home' })

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': ['Organization', 'ProfessionalService'],
                '@id': `${SITE_URL}/#organization`,
                name: SITE_NAME,
                url: SITE_URL,
                logo: `${SITE_URL}/assets/logo2.png`,
                image: `${SITE_URL}/og-image.png`,
                description: t('description'),
                email: 'sundawateknologi@gmail.com',
                telephone: '+6287893355332',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Bandung',
                    addressRegion: 'Jawa Barat',
                    addressCountry: 'ID',
                    // streetAddress: '...', postalCode: '...'  <- add the real office address; it matters most for local SEO
                },
                areaServed: 'ID',
                sameAs: ['https://www.linkedin.com/company/sundawa-teknologi-indonesia'],
                contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+6287893355332',
                    contactType: 'customer service',
                    areaServed: 'ID',
                    availableLanguage: ['id', 'en'],
                },
            },
            {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                url: SITE_URL,
                name: SITE_NAME,
                inLanguage: locale,
                publisher: { '@id': `${SITE_URL}/#organization` },
                potentialAction: {
                    '@type': 'SearchAction',
                    target: `${SITE_URL}/blog?q={search_term_string}`,
                    'query-input': 'required name=search_term_string',
                },
            },
        ],
    }

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />
            <GoogleAnalytics />
            <IntroLoader />
            <SkipLink />
            <PWARegister />
            <InstallPrompt />
            <div id="main-content">
                <PageTransition>{children}</PageTransition>
            </div>
        </NextIntlClientProvider>
    )
}