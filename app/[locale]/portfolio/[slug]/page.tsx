import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { pageMetadata } from '@/lib/Seo'
import { PortfolioDetail, getPortfolioProjectBySlug } from '@/src/features/portfolio'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale } = await params
    return pageMetadata(locale, 'portfolio', `/portfolio`)
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params
    setRequestLocale(locale)

    const t = await getTranslations({ locale, namespace: 'portfolio' })
    const project = await getPortfolioProjectBySlug(slug)
    if (!project) notFound()

    return (
        <PortfolioDetail
            project={project}
            translations={{
                navBack: t('navBack'),
                navTitle: t('navTitle'),
                confidential: t('confidential'),
                challenge: t('challenge'),
                architecture: t('architecture'),
                role: t('role'),
                impact: t('impact'),
                backToPortfolio: t('backToPortfolio'),
            }}
        />
    )
}
