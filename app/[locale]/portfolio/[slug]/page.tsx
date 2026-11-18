import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { SITE_NAME, SITE_URL } from '@/lib/Seo'
import { PortfolioDetail, getPortfolioProjectBySlug, localizePortfolioProject } from '@/src/features/portfolio'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
    const { locale, slug } = await params
    const rawProject = await getPortfolioProjectBySlug(slug)
    if (!rawProject) return {}

    const tClients = await getTranslations({ locale, namespace: 'clients' })
    const project = localizePortfolioProject(rawProject, tClients.raw('items'))

    const canonical = `${SITE_URL}/${locale}/portfolio/${slug}`
    const languages = {
        id: `${SITE_URL}/id/portfolio/${slug}`,
        en: `${SITE_URL}/en/portfolio/${slug}`,
        'x-default': `${SITE_URL}/id/portfolio/${slug}`,
    }

    const title = `${project.name} — ${project.type} | ${SITE_NAME}`
    const description =
        project.desc ||
        project.challenge ||
        project.impact ||
        `Studi kasus rekayasa sistem ${project.name} oleh ${SITE_NAME}.`
    const image = project.main_image_url || '/og-image.png'

    return {
        title,
        description,
        alternates: { canonical, languages },
        openGraph: {
            type: 'article',
            url: canonical,
            siteName: SITE_NAME,
            title,
            description,
            images: [{ url: image, width: 1200, height: 630, alt: project.name }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    }
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params
    setRequestLocale(locale)

    const t = await getTranslations({ locale, namespace: 'portfolio' })
    const tClients = await getTranslations({ locale, namespace: 'clients' })
    const rawProject = await getPortfolioProjectBySlug(slug)
    if (!rawProject) notFound()

    const project = localizePortfolioProject(rawProject, tClients.raw('items'))

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
