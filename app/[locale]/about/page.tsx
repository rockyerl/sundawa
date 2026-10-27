import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { AboutPage } from '@/src/features/about'
import { pageMetadata } from '@/lib/Seo'
import { BreadcrumbJsonLd } from '@/src/shared/ui'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    return pageMetadata(locale, 'about', '/about')
}

export default async function AboutRoute({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)
    return (
        <>
            <BreadcrumbJsonLd breadcrumbs={[{ name: 'About', url: `/${locale}/about` }]}/>
            <AboutPage />
        </>
    )
}
