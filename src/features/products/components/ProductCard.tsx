'use client'

import { ArrowUpRight, ExternalLink, Lock, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from '@/src/i18n/navigation'
import type { ProductStatusKey, SundawaProduct } from '../types'

interface ProductCardProps {
    product: SundawaProduct
    index: number
    inView: boolean
    statusLabel: string
    viewCaseStudyLabel: string
    visitSiteLabel: string
    onSelect?: (product: SundawaProduct) => void
}

function getStatusBadgeClasses(statusKey: ProductStatusKey): string {
    switch (statusKey) {
        case 'authPortal':
            return 'border-cyan-400/35 bg-cyan-400/10 text-cyan-300'
        case 'enterpriseB2B':
            return 'border-amber-400/35 bg-amber-400/10 text-amber-300'
        case 'prototype':
            return 'border-sky/40 bg-sky/10 text-sky'
        default:
            return 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
    }
}

export default function ProductCard({
    product,
    index,
    inView,
    statusLabel,
    viewCaseStudyLabel,
    visitSiteLabel,
}: ProductCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 + index * 0.06, duration: 0.45 }}
            className="group relative flex flex-col bg-navy p-6 transition-colors duration-300 hover:bg-dark-slate/60"
        >
            {/* Hover top gold line */}
            <div
                className="pointer-events-none absolute top-0 right-0 left-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'linear-gradient(to right, #DBC977, rgba(219,201,119,0))' }}
            />

            {/* Header Row: Crest + Number + Status */}
            <div className="mb-5 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-gold/35 bg-gold/10 text-xs font-black tracking-wider text-gold transition-colors duration-300 group-hover:border-gold group-hover:bg-gold/15">
                        {product.initials}
                    </div>
                    <div>
                        <span className="block text-[0.6rem] font-extrabold tracking-[0.2em] text-cream/30">
                            {product.num}
                        </span>
                        <span className="block text-[0.62rem] font-extrabold tracking-[0.16em] text-sky uppercase">
                            {product.sector}
                        </span>
                    </div>
                </div>

                <span
                    className={`inline-flex items-center gap-1 border px-2 py-0.5 text-[0.55rem] font-extrabold tracking-[0.15em] uppercase ${getStatusBadgeClasses(product.statusKey)}`}
                >
                    {product.isAuthGated && <Lock size={9} aria-hidden="true" />}
                    {statusLabel}
                </span>
            </div>

            {/* Title & Tagline */}
            <h3 className="mb-1 text-lg font-black tracking-tight text-cream transition-colors duration-300 group-hover:text-gold">
                {product.name}
            </h3>
            <p className="mb-3 text-xs italic text-gold/75">
                &ldquo;{product.tagline}&rdquo;
            </p>

            {/* Summary */}
            <p className="mb-4 text-xs leading-relaxed font-light text-cream/75">
                {product.summary}
            </p>

            {/* Core Modules */}
            <ul className="mb-5 flex flex-col gap-1.5" aria-label={product.name}>
                {product.modules.slice(0, 3).map((mod) => (
                    <li
                        key={mod}
                        className="flex items-start gap-2 text-[0.72rem] leading-snug text-cream/80"
                    >
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gold/60" aria-hidden="true" />
                        <span>{mod}</span>
                    </li>
                ))}
            </ul>

            {/* Impact / Case Study highlight strip */}
            <div className="mb-5 flex items-center gap-2 border border-gold/20 bg-gold/[0.04] px-3 py-2 text-[0.68rem] font-semibold text-gold/90">
                <Sparkles size={12} className="flex-shrink-0 text-gold" aria-hidden="true" />
                <span className="truncate">{product.badgeMetric}</span>
            </div>

            {/* Footer Action Row */}
            <div className="mt-auto flex flex-wrap items-center justify-between gap-2.5 border-t border-cream/[0.06] pt-4">
                <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex cursor-pointer items-center gap-1.5 border border-gold/35 bg-gold/[0.08] px-3.5 py-2 text-[0.65rem] font-extrabold tracking-[0.14em] text-gold uppercase no-underline transition-all duration-200 hover:border-gold hover:bg-gold hover:text-navy"
                >
                    <span>{viewCaseStudyLabel}</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                </Link>

                <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${visitSiteLabel}: ${product.name} (${product.domain})`}
                    className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold tracking-[0.06em] text-cream/80 no-underline transition-colors duration-200 hover:text-gold"
                >
                    <span className="truncate max-w-[9.5rem]">{product.domain}</span>
                    <ExternalLink size={12} className="flex-shrink-0" aria-hidden="true" />
                </a>
            </div>
        </motion.article>
    )
}
