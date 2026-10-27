import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ServicesPage } from '@/src/features/services'
import { pageMetadata } from '@/lib/Seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    return pageMetadata(locale, 'services', '/services')
}

export default async function ServicesRoute({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)
    return <ServicesPage />
}
