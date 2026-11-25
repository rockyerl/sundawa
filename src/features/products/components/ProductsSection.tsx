'use client'

import { useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/navigation'
import { buildProducts, extractProductUiTranslations, filterProducts } from '../domain'
import ProductCard from './ProductCard'

export default function ProductsSection() {
    const t = useTranslations('products')
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    const translations = useMemo(() => extractProductUiTranslations(t), [t])
    const allProducts = useMemo(() => buildProducts(translations.items), [translations.items])
    const enterpriseProducts = useMemo(
        () => filterProducts(allProducts, 'enterprise'),
        [allProducts],
    )

    return (
        <section id="products" ref={ref} className="relative overflow-hidden py-16 md:py-24">
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse 70% 50% at 20% 25%, rgba(0,86,170,0.08), transparent 70%)',
                }}
            />

            <div className="container-main relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    className="mb-8 flex items-center gap-4"
                >
                    <span className="flex items-center gap-2 text-[0.65rem] font-extrabold tracking-[0.3em] text-gold uppercase">
                        <span className="h-0.5 w-4 bg-gold" aria-hidden="true" />
                        {translations.label}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                </motion.div>

                <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
                    <div className="lg:col-span-7">
                        <motion.h2
                            initial={{ opacity: 0, y: 24 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 }}
                            className="mb-4 text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] font-black text-cream"
                        >
                            {t('homeHeading1')}
                            <br />
                            <span className="gold-gradient">{t('homeHeading2')}</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.2 }}
                            className="max-w-2xl text-sm leading-relaxed font-light text-cream/75 sm:text-base"
                        >
                            {t('homeSub')}
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.25 }}
                        className="grid grid-cols-3 gap-[1px] border border-gold/15 bg-gold/15 lg:col-span-5"
                    >
                        {translations.stats.map((stat) => (
                            <div key={stat.label} className="bg-navy p-4">
                                <div className="mb-1 text-2xl font-black leading-none text-gold sm:text-3xl">
                                    {stat.num}
                                </div>
                                <div className="text-[0.58rem] font-bold tracking-[0.14em] text-cream/75 uppercase">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 gap-[1px] border border-gold/15 bg-gold/15 md:grid-cols-2">
                    {enterpriseProducts.map((product, index) => (
                        <ProductCard
                            key={product.slug}
                            product={product}
                            index={index}
                            inView={inView}
                            statusLabel={translations.statuses[product.statusKey]}
                            viewCaseStudyLabel={translations.actions.viewCaseStudy}
                            visitSiteLabel={translations.actions.visitSite}
                        />
                    ))}
                </div>

                <div className="mt-10 flex flex-col items-center gap-3 text-center">
                    <p className="max-w-xl text-xs font-light text-cream/75">
                        {t('homeEcosystemNote')}
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 border border-gold/30 bg-gold/[0.05] px-6 py-3.5 text-xs font-bold tracking-[0.16em] text-gold uppercase no-underline transition-all hover:border-gold hover:bg-gold/15"
                    >
                        <span>{translations.actions.viewAllProducts}</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
