import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { OutsourceCalculator } from '@/src/features/outsource'
import { pageMetadata } from '@/lib/Seo'
import { BreadcrumbJsonLd } from '@/src/shared/ui'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    return pageMetadata(locale, 'outsource', '/outsource')
}

export default async function OutsourcePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)
    return (
        <>
            <BreadcrumbJsonLd breadcrumbs={[{ name: 'Outsource', url: `/${locale}/outsource` }]}/>
            <OutsourceCalculator />
        </>
    )
}