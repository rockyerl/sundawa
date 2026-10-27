"use client"

import { Lock } from 'lucide-react'
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
            <section style={{ padding: '4rem 0' }}>
                <div className="container-main">
                    <div style={{ marginBottom: '3rem' }}>
                        <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#DBC977', marginBottom: '1rem' }}>
                            {translations.eyebrow}
                        </p>
                        <h1 style={{ fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#F8F8F8', lineHeight: 1.1, marginBottom: '1rem' }}>
                            {translations.title}
                        </h1>
                        <p style={{ fontSize: '1.1rem', color: 'rgba(248,248,248,0.6)', maxWidth: '600px', lineHeight: 1.6 }}>
                            {translations.subtitle}
                        </p>
                    </div>

                    {projects.length === 0 ? (
                        <p style={{ color: 'rgba(248,248,248,0.4)' }}>{translations.empty}</p>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                            {projects.map((project, index) => (
                                <Link
                                    key={project.slug}
                                    href={`/portfolio/${project.slug}`}
                                    style={{
                                        display: 'block',
                                        padding: '1.5rem',
                                        background: 'rgba(219,201,119,0.03)',
                                        border: '1px solid rgba(219,201,119,0.1)',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                        opacity: 0,
                                        animation: `fadeInUp 0.5s ease ${index * 0.05}s forwards`,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(219,201,119,0.3)'
                                        e.currentTarget.style.background = 'rgba(219,201,119,0.06)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(219,201,119,0.1)'
                                        e.currentTarget.style.background = 'rgba(219,201,119,0.03)'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '8px',
                                            background: 'linear-gradient(135deg, #00F0FF, #1E3A8A)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.8rem',
                                            fontWeight: 900,
                                            color: '#0A192F',
                                            flexShrink: 0,
                                        }}>
                                            {project.initials}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#F8F8F8', marginBottom: '0.25rem' }}>
                                                {project.name}
                                            </h3>
                                            <p style={{ fontSize: '0.75rem', color: 'rgba(248,248,248,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                                {project.type}
                                            </p>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: 'rgba(248,248,248,0.6)', lineHeight: 1.5, marginBottom: '1rem' }}>
                                        {project.desc}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DBC977', letterSpacing: '0.1em' }}>
                                            {translations.viewProject}
                                        </span>
                                        {project.confidential && (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem', color: 'rgba(248,248,248,0.4)' }}>
                                                <Lock size={12} />
                                                {translations.confidential}
                                            </span>
                                        )}
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
