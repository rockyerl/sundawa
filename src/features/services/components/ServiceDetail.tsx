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

export interface ServiceDetailProps {
    service: {
        slug: string
        problem: string
        title: string
        desc: string
        outcome: string
        details: string
        deliverables?: ServiceDeliverable[]
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
                        <p className="text-lg text-cream/60 max-w-[700px] leading-relaxed">
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
                                <p className="text-base text-cream/70 leading-[1.7]">
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
                                        <p className="text-xs text-cream/65 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="mb-12 border border-gold/20 bg-gold/[0.03] p-6 sm:p-8 text-center rounded-lg">
                        <h3 className="mb-3 text-xl font-bold text-cream">
                            {t('ctaContact')}
                        </h3>
                        <p className="text-sm text-cream/60 max-w-lg mx-auto mb-6">
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
