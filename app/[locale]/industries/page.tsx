import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { IndustriesArchive } from '@/src/features/industries'
import { pageMetadata } from '@/lib/Seo'
import { BreadcrumbJsonLd } from '@/src/shared/ui'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    return pageMetadata(locale, 'industries', '/industries')
}

export default async function IndustriesRoute({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)
    const t = await getTranslations({ locale, namespace: 'industriesPage' })
    return (
        <>
            <BreadcrumbJsonLd breadcrumbs={[{ name: t('navTitle'), url: `/${locale}/industries` }]} />
            <IndustriesArchive />
        </>
    )
}
