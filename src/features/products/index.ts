export { default as ProductsSection } from './components/ProductsSection'
export { default as ProductsArchive } from './components/ProductsArchive'
export { default as ProductDetail } from './components/ProductDetail'
export { PRODUCT_SPECS } from './data'
export {
    buildProducts,
    extractProductUiTranslations,
    filterProducts,
    getAdjacentProducts,
    getAllProductSlugs,
    getProductSpecBySlug,
    PRODUCT_FILTER_OPTIONS,
} from './domain'
export type {
    LocalizedProductContent,
    ProductCaseStudyContent,
    ProductCaseStudyScenario,
    ProductCategory,
    ProductFilterCategory,
    ProductSlug,
    ProductSpec,
    ProductStatItem,
    ProductStatusKey,
    ProductUiTranslations,
    SundawaProduct,
} from './types'
