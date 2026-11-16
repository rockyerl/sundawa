'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowUpRight, ExternalLink, Lock } from 'lucide-react'
import { Link } from '@/src/i18n/navigation'
import SubpageNav from '@/src/shared/ui/SubpageNav'
import { buildProducts, extractProductUiTranslations, filterProducts } from '../domain'
import type { ProductFilterCategory } from '../types'
import ProductCategoryFilter from './ProductCategoryFilter'

export default function ProductsArchive() {
    const t = useTranslations('products')
    const [activeFilter, setActiveFilter] = useState<ProductFilterCategory>('all')

    const translations = useMemo(() => extractProductUiTranslations(t), [t])
    const allProducts = useMemo(() => buildProducts(translations.items), [translations.items])
    const visibleProducts = useMemo(
        () => filterProducts(allProducts, activeFilter),
        [allProducts, activeFilter],
    )

    return (
        <>
            <SubpageNav
                backLabel={translations.navBack}
                titleLabel={translations.navTitle}
                backHref="/"
            />
            <section className="py-16 md:py-24">
                <div className="container-main">
                    <div className="mb-10">
                        <p className="mb-4 text-xs font-bold tracking-[0.2em] text-gold uppercase">
                            {translations.label}
                        </p>
                        <h1 className="mb-4 text-[clamp(2rem,3.6vw,2.9rem)] leading-tight font-black text-cream">
                            {translations.heading1}{' '}
                            <span className="gold-gradient">{translations.heading2}</span>
                        </h1>
                        <p className="max-w-2xl text-base leading-relaxed font-light text-cream/60">
                            {translations.sub}
                        </p>
                    </div>

                    <ProductCategoryFilter
                        products={allProducts}
                        activeCategory={activeFilter}
                        labels={translations.categories}
                        onChange={setActiveFilter}
                    />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {visibleProducts.map((product) => (
                            <div
                                key={product.slug}
                                className="group flex flex-col border border-gold/15 bg-gold/[0.03] p-6 transition-colors duration-300 hover:border-gold/35 hover:bg-gold/[0.06]"
                            >
                                <div className="mb-4 flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-10 w-10 items-center justify-center border border-gold/35 bg-gold/10 text-xs font-black text-gold">
                                            {product.initials}
                                        </span>
                                        <span className="text-[0.6rem] font-extrabold tracking-[0.16em] text-sky uppercase">
                                            {product.sector}
                                        </span>
                                    </div>
                                    <span className="inline-flex items-center gap-1 border border-gold/20 bg-navy/80 px-2 py-0.5 text-[0.55rem] font-bold tracking-[0.12em] text-gold uppercase">
                                        {product.isAuthGated && <Lock size={9} aria-hidden="true" />}
                                        {translations.statuses[product.statusKey]}
                                    </span>
                                </div>

                                <h2 className="mb-1 text-lg font-black text-cream transition-colors group-hover:text-gold">
                                    {product.name}
                                </h2>
                                <p className="mb-3 text-xs italic text-gold/75">
                                    &ldquo;{product.tagline}&rdquo;
                                </p>
                                <p className="mb-5 text-xs leading-relaxed font-light text-cream/65">
                                    {product.summary}
                                </p>

                                <div className="mb-5 border border-gold/20 bg-gold/[0.04] px-3 py-2 text-[0.68rem] font-semibold text-gold/90">
                                    {product.badgeMetric}
                                </div>

                                <div className="mt-auto flex items-center justify-between border-t border-cream/10 pt-4">
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] text-gold uppercase no-underline hover:text-cream"
                                    >
                                        <span>{translations.actions.viewCaseStudy}</span>
                                        <ArrowUpRight size={14} aria-hidden="true" />
                                    </Link>
                                    <a
                                        href={product.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-[0.65rem] text-cream/55 no-underline hover:text-gold"
                                    >
                                        <span>{product.domain}</span>
                                        <ExternalLink size={12} aria-hidden="true" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
