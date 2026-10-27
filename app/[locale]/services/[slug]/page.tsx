import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ServiceDetail } from '@/src/features/services'
import { pageMetadata } from '@/lib/Seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale } = await params
    return pageMetadata(locale, 'services', '/services')
}

export default async function ServiceDetailRoute({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params
    setRequestLocale(locale)

    const t = await getTranslations({ locale, namespace: 'services' })
    const services = t.raw('detail') as Record<string, { slug: string; problem: string; title: string; desc: string; outcome: string; details: string }>
    
    const service = Object.values(services).find((s) => s.slug === slug)
    if (!service) notFound()

    return (
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
    )
}
