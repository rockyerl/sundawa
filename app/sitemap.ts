import type { MetadataRoute } from 'next'
import { sitemapEntries, staticSitemapPaths } from '@/lib/Sitemap'
import { getPostSlugs } from '@/src/features/blog'
import { getPortfolioProjects } from '@/src/features/portfolio'

export const revalidate = 3600 // rebuild the sitemap at most hourly so new posts appear

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let slugs: { slug: string }[] = []
    try {
        slugs = await getPostSlugs()
    } catch (err) {
        console.error('[sitemap] failed to load blog slugs from Supabase:', err)
    }

    let portfolioSlugs: { slug: string }[] = []
    try {
        const projects = await getPortfolioProjects()
        portfolioSlugs = projects.map(p => ({ slug: p.slug }))
    } catch (err) {
        console.error('[sitemap] failed to load portfolio slugs from Supabase:', err)
    }

    return [
        ...staticSitemapPaths.flatMap(path => sitemapEntries(path, path === '' ? 1 : 0.7, path === '/blog' ? 'weekly' : 'monthly')),
        ...slugs.flatMap(slug => sitemapEntries(`/blog/${slug.slug}`, 0.6, 'monthly')),
        ...portfolioSlugs.flatMap(slug => sitemapEntries(`/portfolio/${slug.slug}`, 0.6, 'monthly')),
    ]
}