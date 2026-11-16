'use client'

import { filterProducts, PRODUCT_FILTER_OPTIONS } from '../domain'
import type { ProductFilterCategory, SundawaProduct } from '../types'

interface ProductCategoryFilterProps {
    products: readonly SundawaProduct[]
    activeCategory: ProductFilterCategory
    labels: Record<ProductFilterCategory, string>
    onChange: (category: ProductFilterCategory) => void
}

export default function ProductCategoryFilter({
    products,
    activeCategory,
    labels,
    onChange,
}: ProductCategoryFilterProps) {
    return (
        <div className="mb-8 flex flex-wrap items-center gap-2">
            {PRODUCT_FILTER_OPTIONS.map((category) => {
                const active = activeCategory === category
                const count = filterProducts(products, category).length
                return (
                    <button
                        key={category}
                        type="button"
                        onClick={() => onChange(category)}
                        aria-pressed={active}
                        className={`inline-flex cursor-pointer items-center gap-2 border px-4 py-2 text-[0.68rem] font-extrabold tracking-[0.14em] uppercase transition-all duration-200 ${
                            active
                                ? 'border-gold bg-gold text-navy'
                                : 'border-gold/20 bg-navy text-cream/65 hover:border-gold/45 hover:text-cream'
                        }`}
                    >
                        <span>{labels[category]}</span>
                        <span className={`text-[0.6rem] ${active ? 'text-navy/70' : 'text-gold/70'}`}>
                            ({count})
                        </span>
                    </button>
                )
            })}
        </div>
    )
}
