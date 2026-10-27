import type { MetadataRoute } from 'next'
import { routing } from '@/src/i18n/routing'
import { localizedPath, SITE_URL } from './Seo'

export const staticSitemapPaths = ['', '/outsource', '/proses-kerja', '/blog', '/portfolio', '/services', '/about', '/contact']

export function sitemapEntries(path: string, priority: number, changeFrequency: 'weekly' | 'monthly'): MetadataRoute.Sitemap {
    const languages = Object.fromEntries(routing.locales.map(locale => [locale, `${SITE_URL}${localizedPath(locale, path)}`]))
    languages['x-default'] = languages[routing.defaultLocale]

    return routing.locales.map(locale => ({
        url: `${SITE_URL}${localizedPath(locale, path)}`,
        changeFrequency,
        priority,
        alternates: { languages },
    }))
}
