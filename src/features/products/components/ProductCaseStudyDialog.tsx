'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Lock, ShieldCheck, X } from 'lucide-react'
import { Link } from '@/src/i18n/navigation'
import type { ProductUiTranslations, SundawaProduct } from '../types'

interface ProductCaseStudyDialogProps {
    product: SundawaProduct
    translations: ProductUiTranslations
    onClose: () => void
}

export default function ProductCaseStudyDialog({
    product,
    translations,
    onClose,
}: ProductCaseStudyDialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null)
    const previousFocusRef = useRef<HTMLElement | null>(null)
    const labels = translations.caseStudySection.labels

    useEffect(() => {
        previousFocusRef.current = document.activeElement as HTMLElement | null
        const modal = dialogRef.current
        if (modal) {
            modal.focus()
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
                return
            }
            if (event.key === 'Tab' && modal) {
                const focusable = modal.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
                )
                const first = focusable[0]
                const last = focusable[focusable.length - 1]
                if (!first || !last) return

                if (event.shiftKey) {
                    if (document.activeElement === first) {
                        event.preventDefault()
                        last.focus()
                    }
                } else if (document.activeElement === last) {
                    event.preventDefault()
                    first.focus()
                }
            }
        }

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener('keydown', handleKeyDown)
            previousFocusRef.current?.focus()
        }
    }, [onClose])

    const pillars = [
        { key: 'challenge', label: labels.challenge, text: product.caseStudy.challenge },
        { key: 'solution', label: labels.solution, text: product.caseStudy.solution },
        { key: 'architecture', label: labels.architecture, text: product.caseStudy.architecture },
        { key: 'impact', label: labels.impact, text: product.caseStudy.impact },
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            style={{ background: 'rgba(6,13,22,0.8)', backdropFilter: 'blur(6px)' }}
        >
            <motion.div
                ref={dialogRef}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="product-dialog-title"
                tabIndex={-1}
                className="relative w-full max-w-2xl overflow-y-auto border border-gold/25 bg-navy shadow-2xl"
                style={{
                    maxHeight: '88dvh',
                    boxShadow: '0 24px 70px rgba(0,0,0,0.6)',
                    padding: 'clamp(1.25rem, 4vw, 2.25rem)',
                }}
            >
                <div
                    className="absolute top-0 right-0 left-0 h-0.5"
                    style={{ background: 'linear-gradient(to right, #DBC977, rgba(219,201,119,0))' }}
                />

                <button
                    type="button"
                    onClick={onClose}
                    aria-label={translations.actions.close}
                    className="absolute top-4 right-4 z-20 flex h-9 w-9 cursor-pointer items-center justify-center border border-cream/15 bg-navy/80 text-cream/70 transition-colors hover:border-gold hover:text-gold"
                >
                    <X size={15} aria-hidden="true" />
                </button>

                {/* Header */}
                <div className="mb-5 flex items-start gap-4 pr-10">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center border border-gold/40 bg-gold/10 text-sm font-black tracking-wider text-gold">
                        {product.initials}
                    </div>
                    <div>
                        <div className="mb-1.5 flex flex-wrap items-center gap-2">
                            <span className="border border-sky/30 bg-sky/10 px-2.5 py-0.5 text-[0.58rem] font-extrabold tracking-[0.18em] text-sky uppercase">
                                {product.sector}
                            </span>
                            <span className="border border-gold/25 bg-gold/10 px-2 py-0.5 text-[0.58rem] font-bold tracking-[0.14em] text-gold uppercase">
                                {translations.statuses[product.statusKey]}
                            </span>
                        </div>
                        <h3 id="product-dialog-title" className="text-xl font-black text-cream">
                            {product.name}
                        </h3>
                        <p className="text-xs italic text-gold/80">
                            &ldquo;{product.tagline}&rdquo;
                        </p>
                    </div>
                </div>

                {/* Auth-gated notice when applicable */}
                {product.isAuthGated && product.accessNote && (
                    <div className="mb-5 flex items-start gap-2.5 border border-amber-400/25 bg-amber-400/[0.06] px-4 py-3 text-xs leading-relaxed text-amber-200/90">
                        <Lock size={14} className="mt-0.5 flex-shrink-0 text-amber-300" aria-hidden="true" />
                        <div>
                            <span className="font-bold uppercase tracking-wider text-amber-300">
                                {labels.accessNote}:{' '}
                            </span>
                            {product.accessNote}
                        </div>
                    </div>
                )}

                {/* Compliance notice when applicable */}
                {product.complianceNote && (
                    <div className="mb-5 flex items-start gap-2.5 border border-emerald-500/30 bg-emerald-500/[0.06] px-4 py-3 text-xs leading-relaxed text-emerald-200/90">
                        <ShieldCheck size={14} className="mt-0.5 flex-shrink-0 text-emerald-400" aria-hidden="true" />
                        <div>
                            <span className="font-bold uppercase tracking-wider text-emerald-300">
                                {labels.complianceNote || 'Keamanan & Kepatuhan'}:{' '}
                            </span>
                            {product.complianceNote}
                        </div>
                    </div>
                )}

                {/* Subject context */}
                <div className="mb-5 border border-gold/15 bg-dark-slate/40 p-4">
                    <div className="mb-1 text-[0.58rem] font-black tracking-[0.2em] text-gold uppercase">
                        {labels.subject}
                    </div>
                    <p className="text-xs leading-relaxed text-cream/85">{product.caseStudy.subject}</p>
                </div>

                {/* 4 Case Study Pillars */}
                <div className="mb-6 flex flex-col gap-4">
                    {pillars.map((pillar) => (
                        <div key={pillar.key} className="border-l-2 border-gold/30 pl-4">
                            <div className="mb-1 text-[0.6rem] font-black tracking-[0.2em] text-gold uppercase">
                                {pillar.label}
                            </div>
                            <p className="text-xs leading-[1.75] font-light text-cream/75">
                                {pillar.text}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Measured Highlights */}
                <div className="mb-6">
                    <div className="mb-2.5 text-[0.6rem] font-black tracking-[0.2em] text-gold uppercase">
                        {labels.highlights}
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {product.caseStudy.highlights.map((item) => (
                            <div
                                key={item}
                                className="flex items-start gap-2 border border-gold/15 bg-gold/[0.04] px-3 py-2.5 text-[0.7rem] leading-snug font-medium text-cream/85"
                            >
                                <ShieldCheck size={13} className="mt-0.5 flex-shrink-0 text-gold" aria-hidden="true" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Specific Scenarios */}
                {product.caseStudy.scenarios.length > 0 && (
                    <div className="mb-6">
                        <div className="mb-2.5 text-[0.6rem] font-black tracking-[0.2em] text-gold uppercase">
                            {labels.scenarios}
                        </div>
                        <div className="grid grid-cols-1 gap-2.5">
                            {product.caseStudy.scenarios.map((scenario) => (
                                <div
                                    key={scenario.title}
                                    className="border border-cream/10 bg-dark-slate/30 px-3.5 py-2.5"
                                >
                                    <div className="text-xs font-bold text-gold/95">{scenario.title}</div>
                                    <p className="mt-0.5 text-[0.72rem] leading-relaxed font-light text-cream/70">
                                        {scenario.outcome}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tech Stack & Action Bar */}
                <div className="border-t border-cream/10 pt-5">
                    <div className="mb-4 flex flex-wrap gap-1.5">
                        {product.techTags.map((tag) => (
                            <span
                                key={tag}
                                className="border border-cream/10 bg-cream/[0.03] px-2.5 py-1 text-[0.6rem] font-semibold tracking-wider text-cream/60"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gold px-5 py-2.5 text-[0.68rem] font-black tracking-[0.16em] text-navy uppercase no-underline transition-shadow hover:shadow-[0_0_24px_rgba(219,201,119,0.4)]"
                        >
                            <span>{translations.actions.visitSite}</span>
                            <ExternalLink size={13} aria-hidden="true" />
                        </a>

                        <Link
                            href={`/products/${product.slug}`}
                            onClick={onClose}
                            className="inline-flex items-center gap-1.5 border border-gold/35 px-4 py-2.5 text-[0.68rem] font-bold tracking-[0.14em] text-gold uppercase no-underline transition-colors hover:border-gold hover:bg-gold/10"
                        >
                            <span>{translations.actions.fullDetail}</span>
                            <ArrowRight size={13} aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
