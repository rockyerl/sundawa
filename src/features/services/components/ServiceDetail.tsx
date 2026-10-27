"use client"

import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/navigation'
import SubpageNav from '@/src/shared/ui/SubpageNav'

export interface ServiceDetailProps {
    service: { slug: string; problem: string; title: string; desc: string; outcome: string; details: string }
    translations: {
        navBack: string
        navTitle: string
        challenge: string
        solution: string
        outcome: string
        backToServices: string
    }
}

export default function ServiceDetail({ service, translations }: ServiceDetailProps) {
    const t = useTranslations('services')

    const sections = [
        { label: translations.challenge, content: service.problem },
        { label: translations.solution, content: service.details },
        { label: translations.outcome, content: service.outcome },
    ]

    return (
        <>
            <SubpageNav backLabel={translations.navBack} titleLabel={translations.navTitle} backHref="/services" />
            <section className="py-16 md:py-20">
                <div className="container-main">
                    {/* Header */}
                    <div className="mb-12">
                        <p className="text-[0.72rem] font-bold tracking-[0.2em] uppercase text-[#00F0FF]/60 mb-4">
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
                                className="p-8 bg-gold/[0.03] border border-gold/10 rounded-lg"
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

                    {/* CTA */}
                    <div className="p-8 bg-gold/[0.03] border border-gold/[0.15] rounded-xl text-center mb-12">
                        <h3 className="font-bold text-xl text-cream mb-3">
                            {t('ctaContact')}
                        </h3>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#00F0FF] to-[#1E3A8A] rounded-md text-[#0A192F] text-sm font-extrabold tracking-[0.1em] uppercase no-underline"
                        >
                            {t('ctaContact')}
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
