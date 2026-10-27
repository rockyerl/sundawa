import { describe, expect, it } from 'vitest'
import { categories, techs } from './techCatalog'

describe('techCatalog contracts', () => {
    it('has non-empty tech and category lists', () => {
        expect(techs.length).toBeGreaterThan(0)
        expect(categories.length).toBeGreaterThan(0)
    })

    it('ensures each tech has valid metadata and an icon source', () => {
        for (const tech of techs) {
            expect(tech.name.trim().length).toBeGreaterThan(0)
            expect(tech.color).toMatch(/^#[0-9A-Fa-f]{3,8}$/)
            expect(Boolean(tech.icon || tech.svgIcon)).toBe(true)
        }
    })

    it('ensures each tech belongs to one of the defined categories', () => {
        const categoryNames = new Set(categories.map((c) => c.name))
        for (const tech of techs) {
            expect(categoryNames.has(tech.category)).toBe(true)
        }
    })

    it('verifies that each category count matches its registered techs', () => {
        for (const cat of categories) {
            const count = techs.filter((t) => t.category === cat.name).length
            expect(cat.count).toBe(count)
        }
    })
})

