import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { SITE_NAME, SITE_URL } from '@/lib/Seo'
import { ServiceDetail } from '@/src/features/services'
import { BreadcrumbJsonLd } from '@/src/shared/ui'

interface LocalizedServiceDetail {
    slug: string
    problem: string
    title: string
    desc: string
    outcome: string
    details: string
    deliverables?: Array<{ title: string; desc: string }>
}

export async function generateStaticParams() {
    const idMessages = (await import('@/messages/id.json')).default
    const enMessages = (await import('@/messages/en.json')).default

    const idSlugs = Object.values(idMessages.servicesPage?.detail || {}).map((s: { slug: string }) => ({ locale: 'id', slug: s.slug }))
    const enSlugs = Object.values(enMessages.servicesPage?.detail || {}).map((s: { slug: string }) => ({ locale: 'en', slug: s.slug }))

    return [...idSlugs, ...enSlugs]
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
    const { locale, slug } = await params
    const t = await getTranslations({ locale, namespace: 'servicesPage' })
    const services = t.raw('detail') as Record<string, LocalizedServiceDetail>
    const serviceEntry = Object.entries(services).find(([, s]) => s.slug === slug)

    if (!serviceEntry) return {}
    const [serviceKey, service] = serviceEntry

    // Cross-locale alternate links using matching service key
    const idMessages = (await import('@/messages/id.json')).default
    const enMessages = (await import('@/messages/en.json')).default
    const idSlug = (idMessages.servicesPage?.detail as Record<string, { slug: string }>)?.[serviceKey]?.slug ?? slug
    const enSlug = (enMessages.servicesPage?.detail as Record<string, { slug: string }>)?.[serviceKey]?.slug ?? slug

    const languages = {
        id: `${SITE_URL}/id/services/${idSlug}`,
        en: `${SITE_URL}/en/services/${enSlug}`,
        'x-default': `${SITE_URL}/id/services/${idSlug}`,
    }
    const canonical = `${SITE_URL}/${locale}/services/${slug}`

    const isModernization = serviceKey === 'modernization' || slug === 'modernisasi-sistem' || slug === 'system-modernization'
    const ogImageUrl = isModernization ? '/og-modernisasi-sistem.png' : '/og-image.png'

    return {
        title: service.title,
        description: service.desc,
        alternates: { canonical, languages },
        openGraph: {
            type: 'website',
            url: canonical,
            siteName: SITE_NAME,
            title: `${service.title} | ${SITE_NAME}`,
            description: service.desc,
            images: [{ url: ogImageUrl, width: 1200, height: 630, alt: service.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${service.title} | ${SITE_NAME}`,
            description: service.desc,
            images: [ogImageUrl],
        },
    }
}

export default async function ServiceDetailRoute({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>
}) {
    const { locale, slug } = await params
    setRequestLocale(locale)

    const t = await getTranslations({ locale, namespace: 'servicesPage' })
    const services = t.raw('detail') as Record<string, LocalizedServiceDetail>

    const service = Object.values(services).find((s) => s.slug === slug)
    if (!service) notFound()

    return (
        <>
            <BreadcrumbJsonLd
                breadcrumbs={[
                    { name: t('navTitle'), url: `/${locale}/services` },
                    { name: service.title, url: `/${locale}/services/${service.slug}` },
                ]}
            />
            <ServiceDetail
                service={service}
                translations={{
                    navBack: t('navBack'),
                    navTitle: t('navTitle'),
                    challenge: t('challenge'),
                    solution: t('solution'),
                    outcome: t('outcome'),
                    backToServices: t('backToServices'),
                    deliverablesLabel: t('deliverablesLabel'),
                    ctaProjectEstimate: t('ctaProjectEstimate'),
                }}
            />
        </>
    )
}
