import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { LegalDocumentPage } from '@/src/features/legal'
import { pageMetadata } from '@/lib/Seo'
import { BreadcrumbJsonLd } from '@/src/shared/ui'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    return pageMetadata(locale, 'cookiePolicy', '/cookie-policy')
}

export default async function CookiePolicyRoute({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)
    const t = await getTranslations({ locale, namespace: 'legalDocs.cookiePolicy' })
    return (
        <>
            <BreadcrumbJsonLd breadcrumbs={[{ name: t('navTitle'), url: `/${locale}/cookie-policy` }]} />
            <LegalDocumentPage docKey="cookiePolicy" mailSubject="[Privacy / Cookie Inquiry]" showCookieControls />
        </>
    )
}
