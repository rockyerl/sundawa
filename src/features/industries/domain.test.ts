import { describe, expect, it } from 'vitest'
import { INDUSTRY_SPECS } from './data'
import {
    getAdjacentIndustries,
    getAllIndustrySlugs,
    getIndustrySpecBySlug,
} from './domain'

describe('industry solutions domain', () => {
    it('defines all six enterprise vertical slugs uniquely', () => {
        const slugs = getAllIndustrySlugs()
        expect(INDUSTRY_SPECS).toHaveLength(6)
        expect(new Set(slugs).size).toBe(6)
        expect(slugs).toEqual([
            'banking-financial-services',
            'manufacturing-industrial',
            'logistics-supply-chain',
            'healthcare',
            'government-public-sector',
            'international-organizations',
        ])
    })

    it('resolves specs by slug and computes previous/next adjacency accurately', () => {
        expect(getIndustrySpecBySlug('healthcare')?.code).toBe('IND-HLT')
        expect(getIndustrySpecBySlug('unknown-sector')).toBeUndefined()

        const first = getAdjacentIndustries('banking-financial-services')
        expect(first.prev).toBeNull()
        expect(first.next?.slug).toBe('manufacturing-industrial')

        const last = getAdjacentIndustries('international-organizations')
        expect(last.prev?.slug).toBe('government-public-sector')
        expect(last.next).toBeNull()
    })
})
