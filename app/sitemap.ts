import type { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'
import { postSlugsQuery } from '@/lib/Queries'
import { routing } from '@/src/i18n/routing'
import { SITE_URL, localizedPath } from '@/lib/Seo'

export const revalidate = 3600 // rebuild the sitemap at most hourly so new posts appear

const staticPaths = ['', '/outsource', '/proses-kerja', '/blog']

function entry(path: string, priority: number, changeFrequency: 'weekly' | 'monthly'): MetadataRoute.Sitemap {
    const languages = Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}${localizedPath(l, path)}`]))
    languages['x-default'] = languages[routing.defaultLocale]
    return routing.locales.map((l) => ({
        url: `${SITE_URL}${localizedPath(l, path)}`,
        changeFrequency,
        priority,
        alternates: { languages },
    }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // If Sanity is unreachable, still serve the static pages instead of failing the whole sitemap.
    let slugs: { slug: string }[] = []
    try {
        slugs = (await client.fetch(postSlugsQuery)) ?? []
    } catch (err) {
        console.error('[sitemap] failed to load blog slugs from Sanity:', err)
    }

    return [
        ...staticPaths.flatMap((p) => entry(p, p === '' ? 1 : 0.7, p === '/blog' ? 'weekly' : 'monthly')),
        ...slugs.flatMap((s) => entry(`/blog/${s.slug}`, 0.6, 'monthly')),
    ]
}