import { describe, expect, it } from 'vitest'
import { buildAlternates, localizedPath, SITE_URL } from './Seo'

describe('localized SEO paths', () => {
    it('normalizes paths with or without a leading slash', () => {
        expect(localizedPath('id')).toBe('/id')
        expect(localizedPath('en', 'blog')).toBe('/en/blog')
        expect(localizedPath('en', '/blog')).toBe('/en/blog')
    })

    it('builds canonical and alternate URLs for every locale', () => {
        const alternates = buildAlternates('en', '/blog')

        expect(alternates.canonical).toBe(`${SITE_URL}/en/blog`)
        expect(alternates.languages).toEqual({
            id: `${SITE_URL}/id/blog`,
            en: `${SITE_URL}/en/blog`,
            'x-default': `${SITE_URL}/id/blog`,
        })
    })
})
