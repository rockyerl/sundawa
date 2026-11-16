import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildAlternates, SITE_NAME } from '@/lib/Seo'
import { ServiceDetail } from '@/src/features/services'
import { BreadcrumbJsonLd } from '@/src/shared/ui'

interface LocalizedServiceDetail {
    slug: string
    problem: string
    title: string
    desc: string
    outcome: string
    details: string
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
    const { locale, slug } = await params
    const t = await getTranslations({ locale, namespace: 'servicesPage' })
    const services = t.raw('detail') as Record<string, LocalizedServiceDetail>
    const service = Object.values(services).find((s) => s.slug === slug)
    const alternates = buildAlternates(locale, `/services/${slug}`)

    if (!service) return {}

    return {
        title: service.title,
        description: service.desc,
        alternates,
        openGraph: {
            type: 'website',
            url: alternates.canonical,
            siteName: SITE_NAME,
            title: `${service.title} | ${SITE_NAME}`,
            description: service.desc,
            images: [{ url: '/og-image.png', width: 1200, height: 630, alt: service.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${service.title} | ${SITE_NAME}`,
            description: service.desc,
            images: ['/og-image.png'],
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
                }}
            />
        </>
    )
}
