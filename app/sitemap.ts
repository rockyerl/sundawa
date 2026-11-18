import type { MetadataRoute } from 'next'
import { sitemapEntries, staticSitemapPaths } from '@/lib/Sitemap'
import { SITE_URL } from '@/lib/Seo'
import { getPostSlugs, isPostTranslated } from '@/src/features/blog'
import { getPortfolioProjects } from '@/src/features/portfolio'
import { getAllProductSlugs } from '@/src/features/products'
import idMessages from '@/messages/id.json'
import enMessages from '@/messages/en.json'

export const revalidate = 3600 // rebuild the sitemap at most hourly so new posts appear

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let blogPosts: { slug: string; published_at?: string; updated_at?: string }[] = []
    try {
        blogPosts = await getPostSlugs()
    } catch (err) {
        console.error('[sitemap] failed to load blog slugs from Supabase:', err)
    }

    let portfolioProjects: { slug: string; updated_at?: string; created_at?: string }[] = []
    try {
        const projects = await getPortfolioProjects()
        portfolioProjects = projects.map(p => ({
            slug: p.slug,
            updated_at: p.updated_at,
            created_at: p.created_at,
        }))
    } catch (err) {
        console.error('[sitemap] failed to load portfolio slugs from Supabase:', err)
    }

    const productSlugs = getAllProductSlugs()

    // Service detail pages with cross-locale pairing
    const serviceKeys = Object.keys(idMessages.servicesPage?.detail || {}) as (keyof typeof idMessages.servicesPage.detail)[]
    const serviceEntries: MetadataRoute.Sitemap = serviceKeys.flatMap((key) => {
        const idSlug = (idMessages.servicesPage.detail[key] as { slug: string })?.slug
        const enSlug = (enMessages.servicesPage.detail[key] as { slug: string })?.slug
        if (!idSlug || !enSlug) return []

        const languages = {
            id: `${SITE_URL}/id/services/${idSlug}`,
            en: `${SITE_URL}/en/services/${enSlug}`,
            'x-default': `${SITE_URL}/id/services/${idSlug}`,
        }

        return [
            {
                url: `${SITE_URL}/id/services/${idSlug}`,
                changeFrequency: 'monthly',
                priority: 0.7,
                alternates: { languages },
            },
            {
                url: `${SITE_URL}/en/services/${enSlug}`,
                changeFrequency: 'monthly',
                priority: 0.7,
                alternates: { languages },
            },
        ]
    })

    const blogEntries: MetadataRoute.Sitemap = blogPosts.flatMap((post) => {
        const hasTranslation = isPostTranslated(post.slug)
        if (hasTranslation) {
            return sitemapEntries(`/blog/${post.slug}`, 0.6, 'monthly', post.updated_at || post.published_at)
        }
        // Indonesian-only posts — emit canonical id entry without invalid en alternate
        const idUrl = `${SITE_URL}/id/blog/${post.slug}`
        return [
            {
                url: idUrl,
                changeFrequency: 'monthly',
                priority: 0.6,
                ...(post.updated_at || post.published_at ? { lastModified: post.updated_at || post.published_at } : {}),
                alternates: {
                    languages: {
                        id: idUrl,
                        'x-default': idUrl,
                    },
                },
            },
        ]
    })

    return [
        ...staticSitemapPaths.flatMap(path => sitemapEntries(path, path === '' ? 1 : 0.7, path === '/blog' ? 'weekly' : 'monthly')),
        ...serviceEntries,
        ...blogEntries,
        ...portfolioProjects.flatMap(proj => sitemapEntries(`/portfolio/${proj.slug}`, 0.6, 'monthly', proj.updated_at || proj.created_at)),
        ...productSlugs.flatMap(slug => sitemapEntries(`/products/${slug}`, 0.7, 'monthly')),
    ]
}