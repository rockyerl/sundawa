import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/src/i18n/routing'
import { buildAlternates, SITE_NAME } from '@/lib/Seo'
import {
    buildProducts,
    extractProductUiTranslations,
    getAdjacentProducts,
    getAllProductSlugs,
    getProductSpecBySlug,
    ProductDetail,
} from '@/src/features/products'
import { BreadcrumbJsonLd } from '@/src/shared/ui'

export function generateStaticParams() {
    const slugs = getAllProductSlugs()
    return routing.locales.flatMap((locale) =>
        slugs.map((slug) => ({ locale, slug })),
    )
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
    const { locale, slug } = await params
    const spec = getProductSpecBySlug(slug)
    if (!spec) return {}

    const t = await getTranslations({ locale, namespace: 'products' })
    const translations = extractProductUiTranslations(t)
    const localized = translations.items[spec.slug]
    const alternates = buildAlternates(locale, `/products/${slug}`)
    const title = `${localized.name} — ${localized.sector}`

    const isLakupandai = spec.slug === 'laku-pandai'
    const ogImageUrl = isLakupandai ? '/og-lakupandai.png' : '/og-image.png'

    return {
        title,
        description: localized.summary,
        alternates,
        openGraph: {
            type: 'website',
            url: alternates.canonical,
            siteName: SITE_NAME,
            title: `${title} | ${SITE_NAME}`,
            description: localized.summary,
            images: [{ url: ogImageUrl, width: 1200, height: 630, alt: localized.name }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | ${SITE_NAME}`,
            description: localized.summary,
            images: [ogImageUrl],
        },
    }
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>
}) {
    const { locale, slug } = await params
    setRequestLocale(locale)

    const spec = getProductSpecBySlug(slug)
    if (!spec) notFound()

    const t = await getTranslations({ locale, namespace: 'products' })
    const translations = extractProductUiTranslations(t)
    const allProducts = buildProducts(translations.items)
    const product = allProducts.find((item) => item.slug === spec.slug)
    if (!product) notFound()

    const { prev, next } = getAdjacentProducts(allProducts, product.slug)

    return (
        <>
            <BreadcrumbJsonLd
                breadcrumbs={[
                    { name: translations.navTitle, url: `/${locale}/products` },
                    { name: product.name, url: `/${locale}/products/${product.slug}` },
                ]}
            />
            <ProductDetail
                product={product}
                prevProduct={prev}
                nextProduct={next}
                translations={translations}
            />
        </>
    )
}
