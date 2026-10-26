import type { MetadataRoute } from 'next'
import { sitemapEntries, staticSitemapPaths } from '@/lib/Sitemap'
import { getPostSlugs } from '@/src/features/blog'

export const revalidate = 3600 // rebuild the sitemap at most hourly so new posts appear

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // If Sanity is unreachable, still serve the static pages instead of failing the whole sitemap.
    let slugs: { slug: string }[] = []
    try {
        slugs = await getPostSlugs()
    } catch (err) {
        console.error('[sitemap] failed to load blog slugs from Sanity:', err)
    }

    return [
        ...staticSitemapPaths.flatMap(path => sitemapEntries(path, path === '' ? 1 : 0.7, path === '/blog' ? 'weekly' : 'monthly')),
        ...slugs.flatMap(slug => sitemapEntries(`/blog/${slug.slug}`, 0.6, 'monthly')),
    ]
}