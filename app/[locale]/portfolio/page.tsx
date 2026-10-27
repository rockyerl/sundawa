import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { pageMetadata } from '@/lib/Seo'
import type { Client } from '@/src/features/home/clients'
import { PortfolioArchive, getPortfolioProjects } from '@/src/features/portfolio'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    return pageMetadata(locale, 'portfolio', '/portfolio')
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)

    const t = await getTranslations({ locale, namespace: 'portfolio' })
    const clientsT = await getTranslations({ locale, namespace: 'clients' })
    const clients = clientsT.raw('items') as Client[]
    const projects = getPortfolioProjects(clients)

    return (
        <PortfolioArchive
            projects={projects}
            translations={{
                navBack: t('navBack'),
                navTitle: t('navTitle'),
                eyebrow: t('eyebrow'),
                title: t('title'),
                subtitle: t('subtitle'),
                empty: t('empty'),
                viewProject: t('viewProject'),
                confidential: t('confidential'),
            }}
        />
    )
}
