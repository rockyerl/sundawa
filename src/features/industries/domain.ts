import { INDUSTRY_SPECS } from './data'
import type { IndustrySlug, IndustrySpec } from './types'

export function getAllIndustrySlugs(): IndustrySlug[] {
    return INDUSTRY_SPECS.map((spec) => spec.slug)
}

export function getIndustrySpecBySlug(slug: string): IndustrySpec | undefined {
    return INDUSTRY_SPECS.find((spec) => spec.slug === slug)
}

export function getAdjacentIndustries(slug: IndustrySlug): {
    prev: IndustrySpec | null
    next: IndustrySpec | null
} {
    const index = INDUSTRY_SPECS.findIndex((spec) => spec.slug === slug)
    if (index === -1) return { prev: null, next: null }
    return {
        prev: index > 0 ? INDUSTRY_SPECS[index - 1] : null,
        next: index < INDUSTRY_SPECS.length - 1 ? INDUSTRY_SPECS[index + 1] : null,
    }
}
