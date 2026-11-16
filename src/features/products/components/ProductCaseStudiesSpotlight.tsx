'use client'

import { ArrowRight, ExternalLink, Lock, ShieldCheck } from 'lucide-react'
import { Link } from '@/src/i18n/navigation'
import type { ProductSlug, ProductUiTranslations, SundawaProduct } from '../types'

interface ProductCaseStudiesSpotlightProps {
    products: SundawaProduct[]
    selectedSlug: ProductSlug
    translations: ProductUiTranslations
    onSelectSlug: (slug: ProductSlug) => void
}

export default function ProductCaseStudiesSpotlight({
    products,
    selectedSlug,
    translations,
    onSelectSlug,
}: ProductCaseStudiesSpotlightProps) {
    const activeProduct = products.find((p) => p.slug === selectedSlug) ?? products[0]
    if (!activeProduct) return null

    const { eyebrow, title, subtitle, labels } = translations.caseStudySection

    const studyBlocks = [
        { key: 'challenge', label: labels.challenge, text: activeProduct.caseStudy.challenge },
        { key: 'solution', label: labels.solution, text: activeProduct.caseStudy.solution },
        { key: 'architecture', label: labels.architecture, text: activeProduct.caseStudy.architecture },
        { key: 'impact', label: labels.impact, text: activeProduct.caseStudy.impact },
    ]

    return (
        <div className="mt-16 border border-gold/15 bg-dark-slate/25 p-6 sm:p-8 lg:p-10">
            {/* Case Studies Header */}
            <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                <div>
                    <div className="mb-2 flex items-center gap-3">
                        <span className="text-[0.65rem] font-extrabold tracking-[0.28em] text-gold uppercase">
                            — {eyebrow}
                        </span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight text-cream sm:text-3xl">
                        {title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-xs leading-relaxed font-light text-cream/55 sm:text-sm">
                        {subtitle}
                    </p>
                </div>

                <Link
                    href={`/products/${activeProduct.slug}`}
                    className="inline-flex flex-shrink-0 items-center gap-2 self-start border border-gold/35 bg-gold/[0.06] px-4 py-2.5 text-[0.65rem] font-extrabold tracking-[0.16em] text-gold uppercase no-underline transition-colors hover:border-gold hover:bg-gold hover:text-navy lg:self-auto"
                >
                    <span>{translations.actions.fullDetail}</span>
                    <ArrowRight size={13} aria-hidden="true" />
                </Link>
            </div>

            {/* Product Selector Tabs */}
            <div
                role="tablist"
                aria-label={eyebrow}
                className="mb-8 flex flex-wrap gap-1.5 border-b border-gold/15 pb-4"
            >
                {products.map((product) => {
                    const isActive = product.slug === activeProduct.slug
                    return (
                        <button
                            key={product.slug}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => onSelectSlug(product.slug)}
                            className={`inline-flex cursor-pointer items-center gap-2 border px-3.5 py-2 text-left transition-all duration-200 ${
                                isActive
                                    ? 'border-gold bg-gold text-navy font-black'
                                    : 'border-gold/15 bg-navy/80 text-cream/65 font-semibold hover:border-gold/40 hover:text-cream'
                            }`}
                        >
                            <span
                                className={`text-[0.58rem] font-extrabold ${
                                    isActive ? 'text-navy/70' : 'text-gold/60'
                                }`}
                            >
                                {product.num}
                            </span>
                            <span className="text-[0.7rem] tracking-[0.06em] uppercase">
                                {product.name}
                            </span>
                        </button>
                    )
                })}
            </div>

            {/* Active Case Study Panel */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Left Meta & Highlights Column */}
                <div className="flex flex-col gap-5 lg:col-span-5">
                    <div className="border border-gold/15 bg-navy/90 p-5">
                        <div className="mb-3 flex items-center justify-between gap-2">
                            <span className="text-[0.6rem] font-extrabold tracking-[0.18em] text-sky uppercase">
                                {activeProduct.sector}
                            </span>
                            <span className="text-[0.6rem] font-bold tracking-[0.12em] text-gold uppercase">
                                {translations.statuses[activeProduct.statusKey]}
                            </span>
                        </div>

                        <h4 className="text-xl font-black text-cream">{activeProduct.name}</h4>
                        <p className="mt-1 text-xs italic text-gold/80">
                            &ldquo;{activeProduct.tagline}&rdquo;
                        </p>

                        <div className="mt-4 border-t border-cream/10 pt-4">
                            <div className="mb-1 text-[0.58rem] font-black tracking-[0.18em] text-gold uppercase">
                                {labels.subject}
                            </div>
                            <p className="text-xs leading-relaxed text-cream/75">
                                {activeProduct.caseStudy.subject}
                            </p>
                        </div>

                        {activeProduct.isAuthGated && activeProduct.accessNote && (
                            <div className="mt-4 flex items-start gap-2 border border-amber-400/25 bg-amber-400/[0.06] px-3 py-2.5 text-[0.7rem] leading-relaxed text-amber-200/90">
                                <Lock size={12} className="mt-0.5 flex-shrink-0 text-amber-300" aria-hidden="true" />
                                <span>{activeProduct.accessNote}</span>
                            </div>
                        )}
                    </div>

                    {/* Highlights */}
                    <div className="border border-gold/15 bg-navy/90 p-5">
                        <div className="mb-3 text-[0.58rem] font-black tracking-[0.18em] text-gold uppercase">
                            {labels.highlights}
                        </div>
                        <ul className="flex flex-col gap-2.5">
                            {activeProduct.caseStudy.highlights.map((highlight) => (
                                <li
                                    key={highlight}
                                    className="flex items-start gap-2.5 text-xs leading-snug text-cream/85"
                                >
                                    <ShieldCheck
                                        size={14}
                                        className="mt-0.5 flex-shrink-0 text-gold"
                                        aria-hidden="true"
                                    />
                                    <span>{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tech & Live Link */}
                    <div className="flex flex-col gap-3 border border-gold/15 bg-navy/90 p-5">
                        <div className="text-[0.58rem] font-black tracking-[0.18em] text-gold uppercase">
                            {labels.techStack}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {activeProduct.techTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="border border-cream/10 bg-dark-slate/50 px-2.5 py-1 text-[0.62rem] font-semibold text-cream/70"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="mt-2 pt-3 border-t border-cream/10">
                            <a
                                href={activeProduct.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.08em] text-gold no-underline transition-colors hover:text-cream"
                            >
                                <span>{activeProduct.domain}</span>
                                <ExternalLink size={13} aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Case Study Pillars & Scenarios */}
                <div className="flex flex-col justify-between gap-6 lg:col-span-7">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {studyBlocks.map((block) => (
                            <div
                                key={block.key}
                                className="border border-gold/10 bg-navy/90 p-5"
                            >
                                <div className="mb-2 border-l-2 border-gold pl-2.5 text-[0.6rem] font-black tracking-[0.18em] text-gold uppercase">
                                    {block.label}
                                </div>
                                <p className="text-xs leading-[1.75] font-light text-cream/75">
                                    {block.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Observed Specific Scenarios */}
                    {activeProduct.caseStudy.scenarios.length > 0 && (
                        <div className="border border-gold/15 bg-navy/90 p-5">
                            <div className="mb-3 text-[0.6rem] font-black tracking-[0.18em] text-gold uppercase">
                                {labels.scenarios}
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {activeProduct.caseStudy.scenarios.map((scenario) => (
                                    <div
                                        key={scenario.title}
                                        className="border border-cream/10 bg-dark-slate/35 p-3.5"
                                    >
                                        <div className="mb-1 text-xs font-bold text-cream">
                                            {scenario.title}
                                        </div>
                                        <p className="text-[0.72rem] leading-relaxed font-light text-cream/65">
                                            {scenario.outcome}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
