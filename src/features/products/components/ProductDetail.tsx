'use client'

import { ArrowLeft, ArrowRight, ExternalLink, Lock, ShieldCheck } from 'lucide-react'
import { Link } from '@/src/i18n/navigation'
import { SITE_URL } from '@/lib/Seo'
import SubpageNav from '@/src/shared/ui/SubpageNav'
import type { ProductUiTranslations, SundawaProduct } from '../types'

interface ProductDetailProps {
    product: SundawaProduct
    prevProduct: SundawaProduct | null
    nextProduct: SundawaProduct | null
    translations: ProductUiTranslations
}

export default function ProductDetail({
    product,
    prevProduct,
    nextProduct,
    translations,
}: ProductDetailProps) {
    const labels = translations.caseStudySection.labels
    const pillars = [
        { key: 'challenge', label: labels.challenge, text: product.caseStudy.challenge },
        { key: 'solution', label: labels.solution, text: product.caseStudy.solution },
        { key: 'architecture', label: labels.architecture, text: product.caseStudy.architecture },
        { key: 'impact', label: labels.impact, text: product.caseStudy.impact },
    ]

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: product.name,
        applicationCategory: product.sector,
        description: product.summary,
        url: product.url,
        creator: { '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />
            <SubpageNav
                backLabel={translations.navBack}
                titleLabel={translations.navTitle}
                backHref="/products"
            />

            <section className="py-14 md:py-20">
                <div className="container-main">
                    {/* Hero */}
                    <div className="mb-10 border-b border-gold/15 pb-10">
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                            <span className="flex h-12 w-12 items-center justify-center border border-gold/40 bg-gold/10 text-sm font-black text-gold">
                                {product.initials}
                            </span>
                            <span className="border border-sky/30 bg-sky/10 px-3 py-1 text-[0.62rem] font-extrabold tracking-[0.18em] text-sky uppercase">
                                {product.sector}
                            </span>
                            <span className="inline-flex items-center gap-1 border border-gold/25 bg-gold/10 px-3 py-1 text-[0.62rem] font-bold tracking-[0.14em] text-gold uppercase">
                                {product.isAuthGated && <Lock size={11} aria-hidden="true" />}
                                {translations.statuses[product.statusKey]}
                            </span>
                        </div>

                        <h1 className="mb-2 text-[clamp(2rem,4vw,3.1rem)] leading-tight font-black text-cream">
                            {product.name}
                        </h1>
                        <p className="mb-4 text-base italic text-gold/85">
                            &ldquo;{product.tagline}&rdquo;
                        </p>
                        <p className="mb-6 max-w-3xl text-base leading-relaxed font-light text-cream/70">
                            {product.summary}
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <a
                                href={product.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-gold px-6 py-3 text-xs font-black tracking-[0.16em] text-navy uppercase no-underline transition-shadow hover:shadow-[0_0_24px_rgba(219,201,119,0.45)]"
                            >
                                <span>{translations.actions.visitSite}</span>
                                <ExternalLink size={14} aria-hidden="true" />
                            </a>
                            <span className="text-xs font-semibold text-cream/45">
                                {labels.liveDomain}: <strong className="text-cream/80">{product.domain}</strong>
                            </span>
                        </div>

                        {product.isAuthGated && product.accessNote && (
                            <div className="mt-6 flex items-start gap-2.5 border border-amber-400/25 bg-amber-400/[0.06] px-4 py-3 text-xs leading-relaxed text-amber-200/90">
                                <Lock size={14} className="mt-0.5 flex-shrink-0 text-amber-300" aria-hidden="true" />
                                <div>
                                    <span className="font-bold uppercase tracking-wider text-amber-300">
                                        {labels.accessNote}:{' '}
                                    </span>
                                    {product.accessNote}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Subject & Highlights */}
                    <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        <div className="border border-gold/15 bg-gold/[0.03] p-6 lg:col-span-5">
                            <div className="mb-2 text-[0.65rem] font-black tracking-[0.2em] text-gold uppercase">
                                {labels.subject}
                            </div>
                            <p className="mb-5 text-sm leading-relaxed text-cream/80">
                                {product.caseStudy.subject}
                            </p>

                            <div className="mb-2 text-[0.65rem] font-black tracking-[0.2em] text-gold uppercase">
                                {labels.coreModules}
                            </div>
                            <ul className="flex flex-col gap-2">
                                {product.modules.map((mod) => (
                                    <li key={mod} className="flex items-start gap-2 text-xs text-cream/75">
                                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" aria-hidden="true" />
                                        <span>{mod}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="border border-gold/15 bg-gold/[0.03] p-6 lg:col-span-7">
                            <div className="mb-4 text-[0.65rem] font-black tracking-[0.2em] text-gold uppercase">
                                {labels.highlights}
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                {product.caseStudy.highlights.map((highlight) => (
                                    <div
                                        key={highlight}
                                        className="flex flex-col gap-2 border border-gold/15 bg-navy/80 p-4"
                                    >
                                        <ShieldCheck size={16} className="text-gold" aria-hidden="true" />
                                        <span className="text-xs leading-snug font-medium text-cream/85">
                                            {highlight}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <div className="mb-2.5 text-[0.65rem] font-black tracking-[0.2em] text-gold uppercase">
                                    {labels.techStack}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {product.techTags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="border border-cream/10 bg-navy/80 px-3 py-1 text-xs font-semibold text-cream/70"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Case Study 4 Pillars */}
                    <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                        {pillars.map((pillar) => (
                            <div
                                key={pillar.key}
                                className="border border-gold/15 bg-gold/[0.03] p-7"
                            >
                                <h2 className="mb-3 border-l-2 border-gold pl-3 text-xs font-black tracking-[0.2em] text-gold uppercase">
                                    {pillar.label}
                                </h2>
                                <p className="text-sm leading-[1.8] font-light text-cream/75">
                                    {pillar.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Specific Scenarios */}
                    {product.caseStudy.scenarios.length > 0 && (
                        <div className="mb-12 border border-gold/15 bg-gold/[0.03] p-7">
                            <h2 className="mb-5 text-xs font-black tracking-[0.2em] text-gold uppercase">
                                {labels.scenarios}
                            </h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {product.caseStudy.scenarios.map((scenario) => (
                                    <div
                                        key={scenario.title}
                                        className="border border-cream/10 bg-navy/85 p-5"
                                    >
                                        <h3 className="mb-2 text-sm font-bold text-cream">
                                            {scenario.title}
                                        </h3>
                                        <p className="text-xs leading-relaxed font-light text-cream/65">
                                            {scenario.outcome}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Prev / Next Navigation */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gold/15 pt-8">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.1em] text-gold no-underline transition-colors hover:text-cream"
                        >
                            <ArrowLeft size={16} aria-hidden="true" />
                            <span>{translations.actions.backToProducts}</span>
                        </Link>

                        <div className="flex flex-wrap items-center gap-4">
                            {prevProduct && (
                                <Link
                                    href={`/products/${prevProduct.slug}`}
                                    className="inline-flex items-center gap-2 border border-gold/25 px-4 py-2 text-xs font-bold tracking-[0.12em] text-cream/80 uppercase no-underline transition-colors hover:border-gold hover:text-gold"
                                >
                                    <ArrowLeft size={13} aria-hidden="true" />
                                    <span>{prevProduct.name}</span>
                                </Link>
                            )}
                            {nextProduct && (
                                <Link
                                    href={`/products/${nextProduct.slug}`}
                                    className="inline-flex items-center gap-2 border border-gold/25 px-4 py-2 text-xs font-bold tracking-[0.12em] text-cream/80 uppercase no-underline transition-colors hover:border-gold hover:text-gold"
                                >
                                    <span>{nextProduct.name}</span>
                                    <ArrowRight size={13} aria-hidden="true" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
