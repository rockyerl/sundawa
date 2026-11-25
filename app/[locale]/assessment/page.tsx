import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { AssessmentPage } from '@/src/features/assessment'
import { pageMetadata } from '@/lib/Seo'
import { BreadcrumbJsonLd } from '@/src/shared/ui'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    return pageMetadata(locale, 'assessment', '/assessment')
}

export default async function AssessmentRoute({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)
    const t = await getTranslations({ locale, namespace: 'assessmentPage' })
    return (
        <>
            <BreadcrumbJsonLd breadcrumbs={[{ name: t('navTitle'), url: `/${locale}/assessment` }]} />
            <AssessmentPage />
        </>
    )
}
