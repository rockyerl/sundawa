import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ContactPage } from '@/src/features/contact'
import { pageMetadata } from '@/lib/Seo'
import { BreadcrumbJsonLd } from '@/src/shared/ui'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    return pageMetadata(locale, 'contact', '/contact')
}

export default async function ContactRoute({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)
    return (
        <>
            <BreadcrumbJsonLd breadcrumbs={[{ name: 'Contact', url: `/${locale}/contact` }]}/>
            <ContactPage />
        </>
    )
}
