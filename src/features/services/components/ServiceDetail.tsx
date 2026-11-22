"use client"

import { ArrowLeft, ArrowRight, PackageCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/navigation'
import { SITE_URL } from '@/lib/Seo'
import SubpageNav from '@/src/shared/ui/SubpageNav'

export interface ServiceDeliverable {
    title: string
    desc: string
}

export interface ServiceCaseStudyMetric {
    value: string
    label: string
}

export interface ServiceCaseStudy {
    badge: string
    name: string
    client: string
    problem: string
    role: string
    metrics: ServiceCaseStudyMetric[]
    href: string
}

export interface ServiceDiscoveryTopic {
    num: string
    title: string
    desc: string
}

export interface ServiceDiscoverySession {
    badge: string
    title: string
    subtitle: string
    agendaTitle: string
    topics: ServiceDiscoveryTopic[]
    cta: string
}

export interface ServiceDetailProps {
    service: {
        slug: string
        problem: string
        title: string
        desc: string
        outcome: string
        details: string
        deliverables?: ServiceDeliverable[]
        discoverySession?: ServiceDiscoverySession
        caseStudy?: ServiceCaseStudy
    }
    translations: {
        navBack: string
        navTitle: string
        challenge: string
        solution: string
        outcome: string
        backToServices: string
        deliverablesLabel?: string
        ctaProjectEstimate?: string
        caseStudyLabel?: string
        caseStudyView?: string
    }
}

export default function ServiceDetail({ service, translations }: ServiceDetailProps) {
    const t = useTranslations('services')

    const sections = [
        { label: translations.challenge, content: service.problem },
        { label: translations.solution, content: service.details },
        { label: translations.outcome, content: service.outcome },
    ]

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: service.desc,
        provider: { '@id': `${SITE_URL}/#organization` },
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />
            <SubpageNav backLabel={translations.navBack} titleLabel={translations.navTitle} backHref="/services" />
            <section className="py-16 md:py-20">
                <div className="container-main">
                    {/* Header */}
                    <div className="mb-12">
                        <p className="mb-4 text-[0.72rem] font-bold tracking-[0.2em] text-sky uppercase">
                            {service.problem}
                        </p>
                        <h1 className="font-black text-[clamp(1.8rem,3vw,2.5rem)] text-cream leading-tight mb-4">
                            {service.title}
                        </h1>
                        <p className="text-lg text-cream/75 max-w-[700px] leading-relaxed">
                            {service.desc}
                        </p>
                    </div>

                    {/* Detail Sections */}
                    <div className="grid gap-8 mb-12">
                        {sections.map((section, index) => (
                            <div
                                key={section.label}
                                className="p-5 sm:p-8 bg-gold/[0.03] border border-gold/10 rounded-lg"
                                style={{ opacity: 0, animation: `fadeInUp 0.5s ease ${index * 0.1}s forwards` }}
                            >
                                <h3 className="text-[0.72rem] font-bold tracking-[0.2em] uppercase text-gold mb-4">
                                    {section.label}
                                </h3>
                                <p className="text-base text-cream/80 leading-[1.7]">
                                    {section.content}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Deliverables Section ("Apa yang saya dapat?") */}
                    {service.deliverables && service.deliverables.length > 0 && (
                        <div className="mb-12 border border-sky/30 bg-sky/[0.03] p-6 sm:p-8 rounded-lg">
                            <div className="mb-6 flex items-center gap-2.5">
                                <PackageCheck className="text-sky flex-shrink-0" size={20} />
                                <h2 className="text-xs font-black tracking-[0.2em] uppercase text-sky">
                                    {translations.deliverablesLabel || 'Yang Anda Dapatkan (Contoh Keluaran Nyata)'}
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {service.deliverables.map((item, idx) => (
                                    <div key={idx} className="border border-sky/20 bg-navy/70 p-5 rounded">
                                        <div className="text-[0.65rem] font-black tracking-[0.18em] text-gold uppercase mb-2">
                                            0{idx + 1}
                                        </div>
                                        <h3 className="text-sm font-bold text-cream mb-2 leading-snug">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-cream/75 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 30-Minute Discovery Session Offering */}
                    {service.discoverySession && (
                        <div className="mb-12 border border-gold/40 bg-gradient-to-br from-[#0E1E30] via-navy to-[#071322] p-6 sm:p-8 rounded-xl shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-gold via-gold/40 to-transparent" />
                            <div className="max-w-3xl">
                                <span className="inline-flex items-center gap-1.5 border border-gold/30 bg-gold/10 px-3 py-1 text-[0.62rem] font-extrabold tracking-[0.2em] text-gold uppercase mb-3 rounded-sm">
                                    {service.discoverySession.badge}
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-black text-cream mb-2 leading-tight">
                                    {service.discoverySession.title}
                                </h2>
                                <p className="text-sm text-cream/75 leading-relaxed font-light mb-6">
                                    {service.discoverySession.subtitle}
                                </p>

                                <div className="text-[0.68rem] font-bold tracking-[0.16em] uppercase text-sky mb-4">
                                    {service.discoverySession.agendaTitle}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                    {service.discoverySession.topics.map((topic) => (
                                        <div key={topic.num} className="border border-gold/15 bg-navy/90 p-4 rounded-lg">
                                            <span className="text-[0.65rem] font-black tracking-wider text-gold uppercase block mb-1.5">
                                                {topic.num}
                                            </span>
                                            <h3 className="text-xs font-bold text-cream mb-2 leading-snug">
                                                {topic.title}
                                            </h3>
                                            <p className="text-[0.72rem] text-cream/75 leading-relaxed font-light">
                                                {topic.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href={`/contact?service=${encodeURIComponent(service.slug)}`}
                                    className="inline-flex items-center gap-2 bg-gold px-6 py-3.5 text-xs font-black tracking-[0.16em] text-navy uppercase no-underline transition-shadow hover:shadow-[0_0_24px_rgba(219,201,119,0.45)]"
                                >
                                    <span>{service.discoverySession.cta}</span>
                                    <ArrowRight size={14} aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Relevant Case Study Proof Section */}
                    {service.caseStudy && (
                        <div className="mb-12 border border-gold/30 bg-gradient-to-br from-navy via-navy/90 to-dark-slate p-6 sm:p-8 rounded-lg">
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-gold/15">
                                <div>
                                    <span className="text-[0.68rem] font-black tracking-[0.2em] text-gold uppercase block mb-1">
                                        {service.caseStudy.badge}
                                    </span>
                                    <h2 className="text-xl sm:text-2xl font-black text-cream">
                                        {service.caseStudy.name}
                                    </h2>
                                    <p className="text-xs text-sky font-semibold tracking-wider uppercase mt-0.5">
                                        {service.caseStudy.client}
                                    </p>
                                </div>
                                <Link
                                    href={service.caseStudy.href}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-cream transition-colors no-underline uppercase tracking-wider"
                                >
                                    <span>{translations.caseStudyView || 'Lihat Studi Kasus'}</span>
                                    <ArrowRight size={13} />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                                <div className="lg:col-span-6 bg-navy/60 p-4 border border-gold/10 rounded">
                                    <div className="text-[0.62rem] font-bold text-gold/80 tracking-widest uppercase mb-1.5">
                                        Masalah / Titik Hambat
                                    </div>
                                    <p className="text-xs text-cream/80 leading-relaxed">
                                        {service.caseStudy.problem}
                                    </p>
                                </div>
                                <div className="lg:col-span-6 bg-navy/60 p-4 border border-gold/10 rounded">
                                    <div className="text-[0.62rem] font-bold text-sky tracking-widest uppercase mb-1.5">
                                        Pekerjaan Sundawa
                                    </div>
                                    <p className="text-xs text-cream/80 leading-relaxed">
                                        {service.caseStudy.role}
                                    </p>
                                </div>
                            </div>

                            {/* Verifiable Numerical Metrics */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                {service.caseStudy.metrics.map((m, mi) => {
                                    const tagMatch = m.value.match(/^(.*?)\s*\[(.*?)\]$/)
                                    const val = tagMatch ? tagMatch[1] : m.value
                                    const tag = tagMatch ? tagMatch[2] : null

                                    return (
                                        <div key={mi} className="border border-gold/20 bg-gold/[0.03] p-4 text-center rounded flex flex-col justify-center">
                                            <div className="text-xl sm:text-2xl font-black text-gold mb-1 flex items-center justify-center gap-1.5 flex-wrap">
                                                <span>{val}</span>
                                                {tag && (
                                                    <span className="text-[0.62rem] font-extrabold tracking-wider px-1.5 py-0.5 border border-gold/40 bg-gold/15 text-gold rounded uppercase">
                                                        {tag}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-[0.68rem] font-medium text-cream/75 uppercase tracking-wider leading-snug">
                                                {m.label}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="mb-12 border border-gold/20 bg-gold/[0.03] p-6 sm:p-8 text-center rounded-lg">
                        <h3 className="mb-3 text-xl font-bold text-cream">
                            {t('ctaContact')}
                        </h3>
                        <p className="text-sm text-cream/75 max-w-lg mx-auto mb-6">
                            {service.desc}
                        </p>
                        <Link
                            href={`/contact?service=${encodeURIComponent(service.slug)}`}
                            className="inline-flex items-center gap-2 bg-gold px-7 py-3.5 text-xs font-black tracking-[0.16em] text-navy uppercase no-underline transition-shadow hover:shadow-[0_0_24px_rgba(219,201,119,0.4)]"
                        >
                            <span>{translations.ctaProjectEstimate || t('ctaContact')}</span>
                            <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                    </div>

                    {/* Back Link */}
                    <div>
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 text-sm font-bold text-gold no-underline tracking-[0.1em] hover:text-cream transition-colors"
                        >
                            <ArrowLeft size={16} />
                            {translations.backToServices}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
