import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { CalculatorPage } from '@/src/features/calculator'
import { pageMetadata } from '@/lib/Seo'
import { BreadcrumbJsonLd } from '@/src/shared/ui'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    return pageMetadata(locale, 'calculator', '/calculator')
}

export default async function CalculatorRoute({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)
    const t = await getTranslations({ locale, namespace: 'calculatorPage' })
    return (
        <>
            <BreadcrumbJsonLd breadcrumbs={[{ name: t('navTitle'), url: `/${locale}/calculator` }]} />
            <CalculatorPage />
        </>
    )
}
