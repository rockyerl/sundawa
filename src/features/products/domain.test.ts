import { describe, expect, it } from 'vitest'
import idMessages from '@/messages/id.json'
import enMessages from '@/messages/en.json'
import { PRODUCT_SPECS } from './data'
import {
    buildProducts,
    filterProducts,
    getAdjacentProducts,
    getAllProductSlugs,
    getProductSpecBySlug,
} from './domain'
import type { LocalizedProductContent, ProductSlug } from './types'

function collectLeafKeys(record: unknown, prefix = ''): string[] {
    if (typeof record !== 'object' || record === null || Array.isArray(record)) {
        return prefix ? [prefix] : []
    }
    return Object.entries(record as Record<string, unknown>).flatMap(([key, value]) => {
        const nextPrefix = prefix ? `${prefix}.${key}` : key
        return collectLeafKeys(value, nextPrefix)
    })
}

describe('products catalog and case studies', () => {
    it('defines all six Sundawa products with valid HTTPS URLs and unique slugs', () => {
        expect(PRODUCT_SPECS).toHaveLength(6)
        const slugs = getAllProductSlugs()
        expect(new Set(slugs).size).toBe(6)
        expect(slugs).toEqual([
            'sewaka',
            'laku-pandai',
            'vellumia',
            'si-geomedik',
            'nawasanga',
            'abo-rentcar',
        ])

        for (const spec of PRODUCT_SPECS) {
            expect(spec.url).toMatch(/^https:\/\/[a-z0-9-]+\.sundawa\.net$/)
            expect(spec.techTags.length).toBeGreaterThanOrEqual(3)
        }
    })

    it('filters products cleanly across categories and supports slug lookup & adjacency', () => {
        const idItems = idMessages.products.items as Record<ProductSlug, LocalizedProductContent>
        const products = buildProducts(idItems)

        expect(filterProducts(products, 'all')).toHaveLength(6)
        expect(filterProducts(products, 'enterprise')).toHaveLength(3)
        expect(filterProducts(products, 'saas')).toHaveLength(3)

        expect(getProductSpecBySlug('nawasanga')?.domain).toBe('nawasanga.sundawa.net')
        expect(getProductSpecBySlug('unknown-product')).toBeUndefined()

        const adjFirst = getAdjacentProducts(products, 'sewaka')
        expect(adjFirst.prev).toBeNull()
        expect(adjFirst.next?.slug).toBe('laku-pandai')

        const adjLast = getAdjacentProducts(products, 'abo-rentcar')
        expect(adjLast.prev?.slug).toBe('nawasanga')
        expect(adjLast.next).toBeNull()
    })

    it('maintains 100% i18n key parity between id.json and en.json for products, nav, about, contact, and meta', () => {
        expect(collectLeafKeys(idMessages.nav).sort()).toEqual(collectLeafKeys(enMessages.nav).sort())
        expect(collectLeafKeys(idMessages.about).sort()).toEqual(collectLeafKeys(enMessages.about).sort())
        expect(collectLeafKeys(idMessages.aboutPage).sort()).toEqual(
            collectLeafKeys(enMessages.aboutPage).sort(),
        )
        expect(collectLeafKeys(idMessages.services).sort()).toEqual(
            collectLeafKeys(enMessages.services).sort(),
        )
        expect(collectLeafKeys(idMessages.footer).sort()).toEqual(
            collectLeafKeys(enMessages.footer).sort(),
        )

        for (const [locale, tree] of [
            ['id', idMessages],
            ['en', enMessages],
        ] as const) {
            const rawJson = JSON.stringify(tree)
            expect(rawJson, `${locale} must not contain invalid {{mustache}} ICU tokens`).not.toContain('{{')
            expect(rawJson, `${locale} must not escape ICU variables inside single quotes`).not.toMatch(/'\{[a-zA-Z0-9_]+\}'/)
        }
        expect(collectLeafKeys(idMessages.contact).sort()).toEqual(
            collectLeafKeys(enMessages.contact).sort(),
        )
        expect(collectLeafKeys(idMessages.contactPage).sort()).toEqual(
            collectLeafKeys(enMessages.contactPage).sort(),
        )
        expect(collectLeafKeys(idMessages.meta).sort()).toEqual(collectLeafKeys(enMessages.meta).sort())
        expect(collectLeafKeys(idMessages.products).sort()).toEqual(
            collectLeafKeys(enMessages.products).sort(),
        )
    })

    it('includes non-empty case study pillars, highlights, and scenarios for every product in both locales', () => {
        const locales = [
            { code: 'id', items: idMessages.products.items as Record<ProductSlug, LocalizedProductContent> },
            { code: 'en', items: enMessages.products.items as Record<ProductSlug, LocalizedProductContent> },
        ]

        for (const { code, items } of locales) {
            const products = buildProducts(items)
            for (const product of products) {
                expect(product.name.trim(), `${code}:${product.slug}:name`).not.toBe('')
                expect(product.tagline.trim(), `${code}:${product.slug}:tagline`).not.toBe('')
                expect(product.modules.length, `${code}:${product.slug}:modules`).toBeGreaterThanOrEqual(4)
                expect(product.caseStudy.subject.trim(), `${code}:${product.slug}:subject`).not.toBe('')
                expect(product.caseStudy.challenge.trim(), `${code}:${product.slug}:challenge`).not.toBe('')
                expect(product.caseStudy.solution.trim(), `${code}:${product.slug}:solution`).not.toBe('')
                expect(product.caseStudy.architecture.trim(), `${code}:${product.slug}:architecture`).not.toBe('')
                expect(product.caseStudy.impact.trim(), `${code}:${product.slug}:impact`).not.toBe('')
                expect(product.caseStudy.highlights.length, `${code}:${product.slug}:highlights`).toBeGreaterThanOrEqual(3)
                expect(product.caseStudy.scenarios.length, `${code}:${product.slug}:scenarios`).toBeGreaterThanOrEqual(2)
            }
        }
    })
})
