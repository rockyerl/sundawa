"use client"

import Image from 'next/image'
import { Lock, ArrowUpRight } from 'lucide-react'
import { Link } from '@/src/i18n/navigation'
import SubpageNav from '@/src/shared/ui/SubpageNav'
import type { PortfolioProject } from '../types'

export interface PortfolioArchiveProps {
    projects: PortfolioProject[]
    translations: {
        navBack: string
        navTitle: string
        eyebrow: string
        title: string
        subtitle: string
        empty: string
        viewProject: string
        confidential: string
    }
}

export default function PortfolioArchive({ projects, translations }: PortfolioArchiveProps) {
    return (
        <>
            <SubpageNav backLabel={translations.navBack} titleLabel={translations.navTitle} backHref="/" />
            <section className="py-16 md:py-24">
                <div className="container-main">
                    <div className="mb-12">
                        <p className="mb-4 text-xs font-bold tracking-[0.2em] uppercase text-[#DBC977]">
                            {translations.eyebrow}
                        </p>
                        <h1 className="mb-4 text-[#F8F8F8] leading-tight font-black" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}>
                            {translations.title}
                        </h1>
                        <p className="max-w-xl text-lg leading-relaxed text-[#F8F8F8]/60">
                            {translations.subtitle}
                        </p>
                    </div>

                    {projects.length === 0 ? (
                        <p className="text-[#F8F8F8]/40">{translations.empty}</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project, index) => (
                                <Link
                                    key={project.slug}
                                    href={`/portfolio/${project.slug}`}
                                    className="group relative overflow-hidden rounded-2xl border border-[#DBC977]/10 bg-[#DBC977]/[0.03] decoration-none transition-all duration-300 hover:border-[#DBC977]/30 hover:bg-[#DBC977]/[0.06]"
                                    style={{
                                        opacity: 0,
                                        animation: `fadeInUp 0.5s ease ${index * 0.05}s forwards`,
                                    }}
                                >
                                    {/* Background Image */}
                                    {project.main_image_url ? (
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <Image
                                                src={project.main_image_url}
                                                alt={project.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                loading="lazy"
                                            />
                                            {/* Dark gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1E30] via-[#0E1E30]/60 to-transparent" />
                                        </div>
                                    ) : (
                                        /* Fallback gradient background */
                                        <div className="relative h-48 w-full bg-gradient-to-br from-[#00F0FF]/10 via-[#1E3A8A]/20 to-[#0E1E30]">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00F0FF] to-[#1E3A8A] text-[#0A192F] text-xl font-black">
                                                    {project.initials}
                                                </div>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1E30] via-transparent to-transparent" />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="relative p-5">
                                        <div className="mb-3 flex items-center gap-2">
                                            <span className="rounded-md bg-[#DBC977]/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#DBC977]">
                                                {project.num}
                                            </span>
                                            {project.confidential && (
                                                <span className="flex items-center gap-1 text-[10px] font-bold text-red-400/70">
                                                    <Lock size={10} />
                                                    {translations.confidential}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="mb-1 text-base font-bold text-[#F8F8F8] transition-colors group-hover:text-[#DBC977]">
                                            {project.name}
                                        </h3>
                                        <p className="mb-3 text-xs tracking-[0.1em] uppercase text-[#F8F8F8]/40">
                                            {project.type}
                                        </p>
                                        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[#F8F8F8]/60">
                                            {project.desc}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold tracking-[0.1em] text-[#DBC977]">
                                                {translations.viewProject}
                                            </span>
                                            <ArrowUpRight
                                                size={16}
                                                className="text-[#DBC977]/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#DBC977]"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
