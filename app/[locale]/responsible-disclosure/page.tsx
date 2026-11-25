import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { LegalDocumentPage } from '@/src/features/legal'
import { pageMetadata } from '@/lib/Seo'
import { BreadcrumbJsonLd } from '@/src/shared/ui'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    return pageMetadata(locale, 'responsibleDisclosure', '/responsible-disclosure')
}

export default async function ResponsibleDisclosureRoute({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)
    const t = await getTranslations({ locale, namespace: 'legalDocs.responsibleDisclosure' })
    return (
        <>
            <BreadcrumbJsonLd breadcrumbs={[{ name: t('navTitle'), url: `/${locale}/responsible-disclosure` }]} />
            <LegalDocumentPage docKey="responsibleDisclosure" mailSubject="[Security Disclosure]" />
        </>
    )
}
