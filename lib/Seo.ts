import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/src/i18n/routing'

export const SITE_URL = 'https://sundawa.net'
export const SITE_NAME = 'Sundawa Teknologi'

const OG_LOCALE: Record<string, string> = { id: 'id_ID', en: 'en_US' }

// routing.ts uses localePrefix: 'always', so every URL carries its locale: /id, /id/outsource, /en/blog ...
export function localizedPath(locale: string, path = '') {
    return `/${locale}${path}`
}

export function buildAlternates(locale: string, path = '') {
    const languages: Record<string, string> = {}
    for (const l of routing.locales) languages[l] = `${SITE_URL}${localizedPath(l, path)}`
    languages['x-default'] = languages[routing.defaultLocale]
    return { canonical: `${SITE_URL}${localizedPath(locale, path)}`, languages }
}

type PageKey = 'home' | 'outsource' | 'process' | 'blog'

/** One call per page: title, description, canonical, hreflang, Open Graph and Twitter, all in the active locale. */
export async function pageMetadata(locale: string, key: PageKey, path = ''): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: `meta.${key}` })
    const alternates = buildAlternates(locale, path)
    const title = t('title')
    const description = t('description')
    const ogTitle = key === 'home' ? t('ogTitle') : `${title} | ${SITE_NAME}`
    const ogDescription = key === 'home' ? t('ogDescription') : description

    return {
        title: key === 'home' ? { absolute: title } : title,
        description,
        alternates,
        openGraph: {
            type: 'website',
            url: alternates.canonical,
            siteName: SITE_NAME,
            locale: OG_LOCALE[locale],
            alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
            title: ogTitle,
            description: ogDescription,
            // openGraph is replaced (not merged) per page, so images must be repeated here
            images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${SITE_NAME}` }],
        },
        twitter: { card: 'summary_large_image', title: ogTitle, description: ogDescription, images: ['/og-image.png'] },
    }
}