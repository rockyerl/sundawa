import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/src/i18n/routing'
import {
    getAllIndustrySlugs,
    getIndustrySpecBySlug,
    IndustryDetail,
    type LocalizedIndustryContent,
} from '@/src/features/industries'
import { buildAlternates, SITE_NAME, SITE_URL } from '@/lib/Seo'
import { BreadcrumbJsonLd } from '@/src/shared/ui'

export function generateStaticParams() {
    const slugs = getAllIndustrySlugs()
    return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
    const { locale, slug } = await params
    const spec = getIndustrySpecBySlug(slug)
    if (!spec) return {}

    const t = await getTranslations({ locale, namespace: 'industriesPage' })
    const items = t.raw('items') as Record<string, LocalizedIndustryContent>
    const content = items[spec.slug]
    const alternates = buildAlternates(locale, `/industries/${spec.slug}`)
    const title = `${content.name} — ${t('navTitle')}`
    const description = content.summary

    return {
        title,
        description,
        alternates,
        openGraph: {
            type: 'website',
            url: alternates.canonical,
            siteName: SITE_NAME,
            locale: locale === 'en' ? 'en_US' : 'id_ID',
            title: `${title} | ${SITE_NAME}`,
            description,
            images: [{ url: '/og-image.png', width: 1200, height: 630, alt: SITE_NAME }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | ${SITE_NAME}`,
            description,
            images: ['/og-image.png'],
        },
    }
}

export default async function IndustryDetailRoute({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>
}) {
    const { locale, slug } = await params
    const spec = getIndustrySpecBySlug(slug)
    if (!spec) notFound()

    setRequestLocale(locale)
    const t = await getTranslations({ locale, namespace: 'industriesPage' })
    const items = t.raw('items') as Record<string, LocalizedIndustryContent>
    const content = items[spec.slug]

    const serviceJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `${content.name} Technology & Engineering Solutions`,
        description: content.summary,
        serviceType: content.shortTag,
        provider: {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: SITE_NAME,
            url: SITE_URL,
        },
        url: `${SITE_URL}/${locale}/industries/${spec.slug}`,
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(serviceJsonLd).replace(/</g, '\\u003c'),
                }}
            />
            <BreadcrumbJsonLd
                breadcrumbs={[
                    { name: t('navTitle'), url: `/${locale}/industries` },
                    { name: content.name, url: `/${locale}/industries/${spec.slug}` },
                ]}
            />
            <IndustryDetail spec={spec} />
        </>
    )
}
