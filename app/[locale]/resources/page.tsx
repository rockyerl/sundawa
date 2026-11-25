import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ResourcesPage } from '@/src/features/resources'
import { pageMetadata } from '@/lib/Seo'
import { BreadcrumbJsonLd } from '@/src/shared/ui'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    return pageMetadata(locale, 'resources', '/resources')
}

export default async function ResourcesRoute({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)
    const t = await getTranslations({ locale, namespace: 'resourcesPage' })
    return (
        <>
            <BreadcrumbJsonLd breadcrumbs={[{ name: t('navTitle'), url: `/${locale}/resources` }]} />
            <ResourcesPage />
        </>
    )
}
