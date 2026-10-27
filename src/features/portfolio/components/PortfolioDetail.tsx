"use client"

import { ArrowLeft, Lock } from 'lucide-react'
import { Link } from '@/src/i18n/navigation'
import SubpageNav from '@/src/shared/ui/SubpageNav'
import type { PortfolioProject } from '../types'

export interface PortfolioDetailProps {
    project: PortfolioProject
    translations: {
        navBack: string
        navTitle: string
        confidential: string
        challenge: string
        architecture: string
        role: string
        impact: string
        backToPortfolio: string
    }
}

export default function PortfolioDetail({ project, translations }: PortfolioDetailProps) {
    const sections = [
        { label: translations.challenge, content: project.challenge },
        { label: translations.architecture, content: project.architecture },
        { label: translations.role, content: project.role },
        { label: translations.impact, content: project.impact },
    ]

    return (
        <>
            <SubpageNav backLabel={translations.navBack} titleLabel={translations.navTitle} backHref="/portfolio" />
            <section className="py-16 md:py-20">
                <div className="container-main">
                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div
                                className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#1E3A8A] flex items-center justify-center text-lg font-black text-[#0A192F] flex-shrink-0"
                            >
                                {project.initials}
                            </div>
                            <div>
                                <p className="text-[0.72rem] font-bold tracking-[0.2em] uppercase text-gold mb-2">
                                    {project.type}
                                </p>
                                <h1 className="font-black text-[clamp(1.8rem,3vw,2.5rem)] text-cream leading-tight">
                                    {project.name}
                                </h1>
                            </div>
                        </div>
                        <p className="text-lg text-cream/60 max-w-[700px] leading-relaxed mb-4">
                            {project.desc}
                        </p>
                        {project.confidential && (
                            <span className="inline-flex items-center gap-1 text-xs text-cream/55 px-3 py-1 bg-gold/[0.05] rounded">
                                <Lock size={12} />
                                {translations.confidential}
                            </span>
                        )}
                    </div>

                    {/* Detail Sections */}
                    <div className="grid gap-8">
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

                    {/* Back Link */}
                    <div className="mt-12">
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 text-sm font-bold text-gold no-underline tracking-[0.1em] hover:text-cream transition-colors"
                        >
                            <ArrowLeft size={16} />
                            {translations.backToPortfolio}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
