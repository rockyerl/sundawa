"use client"

import Image from 'next/image'
import { ArrowLeft, Lock } from 'lucide-react'
import { Link } from '@/src/i18n/navigation'
import { SITE_URL } from '@/lib/Seo'
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

    const imageUrl = project.main_image_url || `${SITE_URL}/og-image.png`
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.name,
        description: project.desc,
        creator: { '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        image: imageUrl,
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />
            <SubpageNav backLabel={translations.navBack} titleLabel={translations.navTitle} backHref="/portfolio" />

            {/* Hero Banner */}
            <div className="relative h-64 w-full overflow-hidden md:h-80">
                {project.main_image_url ? (
                    <>
                        <Image
                            src={project.main_image_url}
                            alt={project.name}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1E30] via-[#0E1E30]/70 to-[#0E1E30]/30" />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/10 via-[#1E3A8A]/20 to-[#0E1E30]" />
                )}
                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <div className="container-main">
                        <div className="flex items-center gap-3 mb-3">
                            {!project.main_image_url && (
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#1E3A8A] text-[#0A192F] text-base font-black flex-shrink-0">
                                    {project.initials}
                                </div>
                            )}
                            <span className="rounded-md bg-[#DBC977]/20 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.15em] uppercase text-[#DBC977]">
                                {project.type}
                            </span>
                            {project.confidential && (
                                <span className="flex items-center gap-1 text-[10px] font-bold text-red-400/80">
                                    <Lock size={10} />
                                    {translations.confidential}
                                </span>
                            )}
                        </div>
                        <h1 className="text-[#F8F8F8] leading-tight font-black" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                            {project.name}
                        </h1>
                    </div>
                </div>
            </div>

            <section className="py-12 md:py-16">
                <div className="container-main">
                    <p className="mb-8 text-lg text-[#F8F8F8]/60 max-w-[700px] leading-relaxed">
                        {project.desc}
                    </p>

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
