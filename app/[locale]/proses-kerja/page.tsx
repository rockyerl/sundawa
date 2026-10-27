import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ProcessSection } from '@/src/features/process'
import { pageMetadata } from '@/lib/Seo'
import { BreadcrumbJsonLd } from '@/src/shared/ui'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    return pageMetadata(locale, 'process', '/proses-kerja')
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)
    return (
        <>
            <BreadcrumbJsonLd breadcrumbs={[{ name: 'Proses Kerja', url: `/${locale}/proses-kerja` }]}/>
            <ProcessSection />
        </>
    )
}