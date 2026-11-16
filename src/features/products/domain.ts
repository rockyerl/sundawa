import { PRODUCT_SPECS } from './data'
import type {
    LocalizedProductContent,
    ProductFilterCategory,
    ProductSlug,
    ProductSpec,
    ProductUiTranslations,
    SundawaProduct,
} from './types'

export const PRODUCT_FILTER_OPTIONS: readonly ProductFilterCategory[] = ['all', 'enterprise', 'saas']

type TranslationReader = {
    (key: string): string
    raw(key: string): unknown
}

export function extractProductUiTranslations(t: TranslationReader): ProductUiTranslations {
    return {
        navBack: t('navBack'),
        navTitle: t('navTitle'),
        label: t('label'),
        heading1: t('heading1'),
        heading2: t('heading2'),
        sub: t('sub'),
        stats: t.raw('stats') as ProductUiTranslations['stats'],
        categories: t.raw('categories') as ProductUiTranslations['categories'],
        statuses: t.raw('statuses') as ProductUiTranslations['statuses'],
        actions: t.raw('actions') as ProductUiTranslations['actions'],
        caseStudySection: t.raw('caseStudySection') as ProductUiTranslations['caseStudySection'],
        items: t.raw('items') as ProductUiTranslations['items'],
    }
}

export function buildProducts(
    localizedItems: Record<ProductSlug, LocalizedProductContent>,
    specs: readonly ProductSpec[] = PRODUCT_SPECS,
): SundawaProduct[] {
    return specs.map(spec => ({
        ...spec,
        ...localizedItems[spec.slug],
    }))
}

export function filterProducts(
    products: readonly SundawaProduct[],
    category: ProductFilterCategory,
): SundawaProduct[] {
    if (category === 'all') return [...products]
    return products.filter(product => product.category === category)
}

export function getProductSpecBySlug(slug: string): ProductSpec | undefined {
    return PRODUCT_SPECS.find(product => product.slug === slug)
}

export function getAllProductSlugs(): ProductSlug[] {
    return PRODUCT_SPECS.map(product => product.slug)
}

export function getAdjacentProducts(
    products: readonly SundawaProduct[],
    slug: string,
): { prev: SundawaProduct | null; next: SundawaProduct | null } {
    const index = products.findIndex(product => product.slug === slug)
    if (index === -1) return { prev: null, next: null }
    return {
        prev: index > 0 ? products[index - 1] : null,
        next: index < products.length - 1 ? products[index + 1] : null,
    }
}
