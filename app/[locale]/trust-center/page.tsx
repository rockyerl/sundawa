import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { TrustCenterPage } from '@/src/features/trust-center'
import { pageMetadata } from '@/lib/Seo'
import { BreadcrumbJsonLd } from '@/src/shared/ui'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    return pageMetadata(locale, 'trustCenter', '/trust-center')
}

export default async function TrustCenterRoute({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)
    const t = await getTranslations({ locale, namespace: 'trustCenter' })
    return (
        <>
            <BreadcrumbJsonLd breadcrumbs={[{ name: t('navTitle'), url: `/${locale}/trust-center` }]} />
            <TrustCenterPage />
        </>
    )
}
