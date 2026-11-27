'use client'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown, ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/navigation'
import HeroOrbitVideo from './HeroOrbitVideo'

export default function HeroSection() {
    const t = useTranslations('hero')
    const ref = useRef<HTMLDivElement>(null)
    const prefersReducedMotion = useReducedMotion()

    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    return (
        <section ref={ref} id="hero" className="hero-section" style={{ position: 'relative', minHeight: '100dvh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(0,86,170,0.15), transparent)', pointerEvents: 'none' }} />
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                        'linear-gradient(to right, rgba(219,201,119,0.065) 1px, transparent 1px), linear-gradient(to bottom, rgba(219,201,119,0.065) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                    WebkitMaskImage: 'radial-gradient(ellipse 75% 68% at 50% 48%, #000 32%, transparent 82%)',
                    maskImage: 'radial-gradient(ellipse 75% 68% at 50% 48%, #000 32%, transparent 82%)',
                    pointerEvents: 'none',
                }}
            />

            <motion.div style={{ y: prefersReducedMotion ? 0 : y, opacity: prefersReducedMotion ? 1 : opacity, width: '100%', paddingTop: 'clamp(1px, 1vh, 1px)' }} className="container-main relative z-10 hero-content">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }} className="hero-grid">

                    <div>
                        <motion.div
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem', maxWidth: '100%', padding: '0.4rem 1rem', border: '1px solid rgba(219,201,119,0.3)', background: 'rgba(219,201,119,0.05)' }}
                        >
                            <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: '#DBC977', animation: 'pulse 2s infinite' }} />
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#DBC977' }}>
                                {t('badge')}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ fontWeight: 900, lineHeight: 1.02, marginBottom: '1.75rem', letterSpacing: '-0.02em' }}
                        >
                            <span style={{ display: 'block', fontSize: 'clamp(2rem, 3.6vw, 3.5rem)', color: '#F8F8F8' }}>{t('line1')}</span>
                            <span style={{ display: 'block', fontSize: 'clamp(2rem, 3.6vw, 3.5rem)' }} className="shimmer-text">{t('line2')}</span>
                            <span style={{ display: 'block', fontSize: 'clamp(2rem, 3.6vw, 3.5rem)', color: 'rgba(248,248,248,0.78)' }}>{t('line3')}</span>
                            <span style={{ display: 'block', fontSize: 'clamp(2rem, 3.6vw, 3.5rem)', color: '#F8F8F8' }}>{t('line4')}</span>
                        </motion.h1>

                        <motion.p
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ color: 'rgba(248,248,248,0.85)', fontWeight: 400, fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '36rem', marginBottom: '2.25rem' }}
                        >
                            {t('sub')}
                        </motion.p>

                        <motion.div
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            className="hero-cta" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}
                        >
                            <Link href="/contact" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', minHeight: 48, padding: '0.85rem 2rem', background: '#DBC977', color: '#0E1E30', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', overflow: 'hidden', transition: 'box-shadow 0.3s', textDecoration: 'none' }}
                               onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 40px rgba(219,201,119,0.5)')}
                               onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
                                {t('ctaServices')} <ArrowUpRight size={14} aria-hidden="true" />
                            </Link>
                            <a href="#featured-projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', minHeight: 48, padding: '0.85rem 2rem', border: '1px solid rgba(248,248,248,0.28)', color: 'rgba(248,248,248,0.85)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'border-color 0.3s, color 0.3s', textDecoration: 'none' }}
                               onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(219,201,119,0.7)'; e.currentTarget.style.color = '#DBC977' }}
                               onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(248,248,248,0.28)'; e.currentTarget.style.color = 'rgba(248,248,248,0.85)' }}>
                                {t('ctaAbout')} <ArrowUpRight size={14} aria-hidden="true" />
                            </a>
                        </motion.div>

                        <motion.div
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap lg:flex-nowrap items-center gap-x-2.5 gap-y-1.5 text-xs text-cream/80 mb-8"
                        >
                            <span className="text-cream/75 uppercase tracking-wider text-[0.68rem] whitespace-nowrap">{t('proof')}:</span>
                            <Link href="/portfolio/dacar-by-undp" className="inline-flex items-center gap-1 text-gold hover:text-gold/80 transition-colors font-medium underline underline-offset-4 decoration-gold/40 lg:whitespace-nowrap">
                                <span>{t('proofDacar')}</span>
                            </Link>
                            <span className="text-cream/65" aria-hidden="true">·</span>
                            <Link href="/portfolio/e-office" className="inline-flex items-center gap-1 text-gold hover:text-gold/80 transition-colors font-medium underline underline-offset-4 decoration-gold/40 lg:whitespace-nowrap">
                                <span>{t('proofEoffice')}</span>
                            </Link>
                        </motion.div>

                        <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', paddingTop: '2rem', borderTop: '1px solid rgba(248,248,248,0.08)' }} />
                    </div>

                    {/* Sundawa Seamless Orbit Emblem (true-alpha GPU-keyed 60fps VP9 WebM; static fallback for reduced-motion) */}
                    <div className="hero-logo-col" style={{ display: 'none', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 360 }}>
                        <div
                            aria-hidden="true"
                            style={{
                                position: 'absolute',
                                width: 380,
                                height: 320,
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(0,86,170,0.26) 0%, rgba(219,201,119,0.07) 48%, transparent 72%)',
                                filter: 'blur(36px)',
                                pointerEvents: 'none',
                            }}
                        />

                        <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <HeroOrbitVideo
                                src="/assets/sundawa-orbit.webm"
                                fallbackSrc="/assets/logo2.png"
                                alt="Sundawa Teknologi"
                                reducedMotion={Boolean(prefersReducedMotion)}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="hero-scroll" aria-hidden="true" style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', color: 'rgba(248,248,248,0.65)' }}>
                <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600 }}>{t('scroll')}</span>
                <ChevronDown size={14} aria-hidden="true" style={{ animation: 'bounce 1.5s infinite' }} />
            </div>

            <style>{`
                @media (min-width: 1024px) { .hero-grid { grid-template-columns: minmax(0, 1fr) 340px !important; gap: 2rem !important; } .hero-logo-col { display: flex !important; } }
                @media (min-width: 1280px) { .hero-grid { grid-template-columns: minmax(0, 1fr) 380px !important; gap: 2.5rem !important; } }
                @media (max-width: 1023px) { .hero-section { padding: 6rem 0 4.5rem; } }
                @media (max-width: 640px) {
                    .hero-grid { gap: 2rem !important; }
                    .hero-grid h1 span { font-size: clamp(1.75rem, 8.5vw, 2.4rem) !important; }
                    .hero-badge span:last-child { letter-spacing: 0.15em !important; font-size: 0.62rem !important; }
                    .hero-cta { flex-direction: column; margin-bottom: 1.5rem !important; }
                    .hero-cta a { justify-content: center; width: 100%; box-sizing: border-box; }
                    .hero-scroll { display: none !important; }
                }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
                @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
            `}</style>
        </section>
    )
}
