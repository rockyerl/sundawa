"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/navigation'
import { SITE_URL } from '@/lib/Seo'
import SubpageNav from '@/src/shared/ui/SubpageNav'

export default function AboutPage() {
    const t = useTranslations('aboutPage')
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    const missions = t.raw('mission.items') as { num: string; title: string; body: string }[]
    const values = t.raw('values.items') as { title: string; body: string }[]
    const stats = [
        { num: '30+', label: t('stats.projects') },
        { num: '15+', label: t('stats.clients') },
        { num: '5+', label: t('stats.years') },
        { num: '10+', label: t('stats.professionals') },
    ]

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        mainEntity: { '@id': `${SITE_URL}/#organization` },
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />
            <SubpageNav backLabel={t('navBack')} titleLabel={t('navTitle')} backHref="/" />
            <section ref={ref} className="py-16 md:py-20">
                <div className="container-main">
                    {/* Hero */}
                    <div className="mb-16">
                        <motion.p initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                                  className="text-[0.72rem] font-bold tracking-[0.2em] uppercase text-gold mb-4">
                            {t('eyebrow')}
                        </motion.p>
                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
                                   className="font-black text-[clamp(2rem,3.5vw,2.8rem)] text-cream leading-tight mb-4">
                            {t('title')}
                        </motion.h1>
                        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
                                  className="text-lg text-cream/60 max-w-[700px] leading-relaxed">
                            {t('subtitle')}
                        </motion.p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        {stats.map((stat, index) => (
                            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + index * 0.1 }}
                                        className="p-6 bg-gold/[0.03] border border-gold/10 rounded-lg text-center">
                                <div className="text-3xl font-black text-gold mb-2">{stat.num}</div>
                                <div className="text-xs font-bold tracking-[0.1em] uppercase text-cream/50">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mission */}
                    <div className="mb-16">
                        <motion.h2 initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
                                   className="text-[0.72rem] font-bold tracking-[0.2em] uppercase text-gold mb-8">
                            — {t('mission.label')}
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {missions.map((mission, index) => (
                                <motion.div key={mission.num} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + index * 0.1 }}
                                            className="p-6 bg-gold/[0.03] border border-gold/10 rounded-lg">
                                    <div className="text-[0.65rem] font-black text-gold/40 mb-3">{mission.num}</div>
                                    <h3 className="text-base font-bold text-cream mb-3 leading-snug">{mission.title}</h3>
                                    <p className="text-sm text-cream/60 leading-relaxed">{mission.body}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Values */}
                    <div className="mb-16">
                        <motion.h2 initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
                                   className="text-[0.72rem] font-bold tracking-[0.2em] uppercase text-gold mb-8">
                            — {t('values.label')}
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {values.map((value, index) => (
                                <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 + index * 0.1 }}
                                            className="p-6 bg-gold/[0.03] border border-gold/10 rounded-lg">
                                    <h3 className="text-base font-bold text-cream mb-3">{value.title}</h3>
                                    <p className="text-sm text-cream/60 leading-relaxed">{value.body}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 }}
                                className="p-12 bg-gold/[0.03] border border-gold/[0.15] rounded-xl text-center">
                        <h2 className="font-black text-[clamp(1.5rem,2.5vw,2rem)] text-cream mb-4">
                            {t('cta.title')}
                        </h2>
                        <p className="text-base text-cream/60 max-w-[600px] mx-auto mb-6 leading-relaxed">
                            {t('cta.subtitle')}
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-br from-[#00F0FF] to-[#1E3A8A] rounded-md text-[#0A192F] text-sm font-extrabold tracking-[0.1em] uppercase no-underline hover:opacity-85 transition-opacity"
                        >
                            {t('cta.button')}
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    )
}
