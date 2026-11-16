export type ProductSlug =
    | 'sewaka'
    | 'laku-pandai'
    | 'vellumia'
    | 'si-geomedik'
    | 'nawasanga'
    | 'abo-rentcar'

export type ProductCategory = 'enterprise' | 'saas'

export type ProductFilterCategory = 'all' | ProductCategory

export type ProductStatusKey =
    | 'liveSaas'
    | 'enterpriseB2B'
    | 'prototype'
    | 'authPortal'
    | 'livePlatform'

export interface ProductSpec {
    slug: ProductSlug
    num: string
    initials: string
    url: string
    domain: string
    category: ProductCategory
    statusKey: ProductStatusKey
    accentColor: string
    techTags: readonly string[]
    isAuthGated?: boolean
}

export interface ProductCaseStudyScenario {
    title: string
    outcome: string
}

export interface ProductCaseStudyContent {
    subject: string
    challenge: string
    solution: string
    architecture: string
    impact: string
    highlights: string[]
    scenarios: ProductCaseStudyScenario[]
}

export interface LocalizedProductContent {
    name: string
    sector: string
    tagline: string
    summary: string
    badgeMetric: string
    accessNote?: string
    modules: string[]
    caseStudy: ProductCaseStudyContent
}

export type SundawaProduct = ProductSpec & LocalizedProductContent

export interface ProductStatItem {
    num: string
    label: string
}

export interface ProductUiTranslations {
    navBack: string
    navTitle: string
    label: string
    heading1: string
    heading2: string
    sub: string
    stats: ProductStatItem[]
    categories: Record<ProductFilterCategory, string>
    statuses: Record<ProductStatusKey, string>
    actions: {
        viewCaseStudy: string
        visitSite: string
        fullDetail: string
        close: string
        backToProducts: string
        inspectSelectedCaseStudy: string
    }
    caseStudySection: {
        eyebrow: string
        title: string
        subtitle: string
        labels: {
            subject: string
            challenge: string
            solution: string
            architecture: string
            impact: string
            highlights: string
            scenarios: string
            coreModules: string
            accessNote: string
            liveDomain: string
            techStack: string
        }
    }
    items: Record<ProductSlug, LocalizedProductContent>
}
