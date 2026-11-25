'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AlertCircle, ArrowUpRight, CheckCircle2, Layers } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/navigation'

interface FeaturedProjectItem {
    slug: string
    num: string
    name: string
    client: string
    tag: string
    problem: string
    work: string
    result: string
}

export default function FeaturedProjectsSection() {
    const t = useTranslations('featuredProjects')
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    const projects = t.raw('projects') as FeaturedProjectItem[]

    return (
        <section id="featured-projects" ref={ref} className="relative py-16 md:py-24 overflow-hidden">
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse 70% 50% at 80% 25%, rgba(0,86,170,0.1), transparent 70%)',
                }}
            />

            <div className="container-main relative z-10">
                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    className="mb-8 flex items-center gap-4"
                >
                    <span className="flex items-center gap-2 text-[0.65rem] font-extrabold tracking-[0.3em] text-gold uppercase">
                        <span className="h-0.5 w-4 bg-gold" aria-hidden="true" />
                        {t('label')}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                </motion.div>

                {/* Section Header */}
                <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 24 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 }}
                            className="text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] font-black text-cream"
                        >
                            {t('heading1')}
                            <br />
                            <span className="gold-gradient">{t('heading2')}</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.2 }}
                            className="mt-4 max-w-2xl text-sm leading-relaxed font-light text-cream/75 sm:text-base"
                        >
                            {t('sub')}
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.25 }}
                    >
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 border border-gold/30 bg-gold/[0.05] px-5 py-3 text-xs font-bold tracking-[0.16em] text-gold uppercase no-underline transition-all duration-200 hover:border-gold hover:bg-gold/15"
                        >
                            <span>{t('ctaPortfolio')}</span>
                            <ArrowUpRight size={14} aria-hidden="true" />
                        </Link>
                    </motion.div>
                </div>

                {/* 3 Featured Project Cards: Masalah -> Pekerjaan Sundawa -> Hasil */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {projects.map((project, idx) => (
                        <motion.article
                            key={project.slug}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.15 + idx * 0.1, duration: 0.5 }}
                            className="group relative flex flex-col justify-between border border-gold/20 bg-[#0E1E30] p-6 transition-all duration-300 hover:border-gold/50 hover:bg-[#112338]"
                        >
                            {/* Accent top gold line */}
                            <div
                                className="pointer-events-none absolute top-0 right-0 left-0 h-[2px] opacity-40 transition-opacity duration-300 group-hover:opacity-100"
                                style={{ background: 'linear-gradient(to right, #DBC977, transparent)' }}
                            />

                            <div>
                                {/* Card Header */}
                                <div className="mb-4 flex items-center justify-between border-b border-gold/15 pb-4">
                                    <span className="text-[0.65rem] font-black tracking-[0.2em] text-gold uppercase">
                                        {t('labels.projectPrefix')} {project.num}
                                    </span>
                                    <span className="border border-sky/30 bg-sky/10 px-2.5 py-0.5 text-[0.6rem] font-bold tracking-wider text-sky uppercase">
                                        {project.tag}
                                    </span>
                                </div>

                                <h3 className="mb-1 text-xl font-black text-cream transition-colors duration-200 group-hover:text-gold">
                                    {project.name}
                                </h3>
                                <p className="mb-6 text-xs text-cream/75">
                                    {project.client}
                                </p>

                                {/* 3 Steps: Masalah -> Pekerjaan Sundawa -> Hasil */}
                                <div className="space-y-4">
                                    {/* 1. Masalah */}
                                    <div className="border-l-2 border-amber-400/60 bg-navy/60 p-3.5">
                                        <div className="mb-1.5 flex items-center gap-1.5 text-[0.62rem] font-black tracking-[0.16em] text-amber-300 uppercase">
                                            <AlertCircle size={12} className="flex-shrink-0" aria-hidden="true" />
                                            <span>{t('labels.problem')}</span>
                                        </div>
                                        <p className="text-xs leading-relaxed font-light text-cream/75">
                                            {project.problem}
                                        </p>
                                    </div>

                                    {/* 2. Pekerjaan Sundawa */}
                                    <div className="border-l-2 border-sky/70 bg-navy/60 p-3.5">
                                        <div className="mb-1.5 flex items-center gap-1.5 text-[0.62rem] font-black tracking-[0.16em] text-sky uppercase">
                                            <Layers size={12} className="flex-shrink-0" aria-hidden="true" />
                                            <span>{t('labels.work')}</span>
                                        </div>
                                        <p className="text-xs leading-relaxed font-light text-cream/75">
                                            {project.work}
                                        </p>
                                    </div>

                                    {/* 3. Hasil */}
                                    <div className="border-l-2 border-emerald-400/80 bg-navy/60 p-3.5">
                                        <div className="mb-1.5 flex items-center gap-1.5 text-[0.62rem] font-black tracking-[0.16em] text-emerald-300 uppercase">
                                            <CheckCircle2 size={12} className="flex-shrink-0" aria-hidden="true" />
                                            <span>{t('labels.result')}</span>
                                        </div>
                                        <p className="text-xs leading-relaxed font-light text-cream/85">
                                            {project.result}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer: Link to case study detail */}
                            <div className="mt-6 border-t border-gold/15 pt-4">
                                <Link
                                    href={`/portfolio/${project.slug}`}
                                    className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-gold uppercase no-underline transition-colors duration-200 group-hover:text-cream"
                                >
                                    <span>{t('labels.viewCaseStudy')}</span>
                                    <ArrowUpRight size={13} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
