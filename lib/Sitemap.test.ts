import { describe, expect, it } from 'vitest'
import { sitemapEntries } from './Sitemap'
import { SITE_URL } from './Seo'

describe('sitemap entries', () => {
    it('creates localized entries with x-default', () => {
        const entries = sitemapEntries('/blog', 0.7, 'weekly')

        expect(entries).toHaveLength(2)
        expect(entries.map(entry => entry.url)).toEqual([
            `${SITE_URL}/id/blog`,
            `${SITE_URL}/en/blog`,
        ])
        expect(entries[0].alternates?.languages?.['x-default']).toBe(`${SITE_URL}/id/blog`)
        expect(entries[0].changeFrequency).toBe('weekly')
    })
})
