'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/navigation'

export default function HeroSection() {
    const t = useTranslations('hero')
    const ref = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    return (
        <section ref={ref} id="hero" className="hero-section" style={{ position: 'relative', minHeight: '100dvh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(0,86,170,0.15), transparent)', pointerEvents: 'none' }} />
            {[600, 420, 240].map((size, i) => (
                <div key={size} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: size, height: size, borderRadius: '50%', border: `1px solid rgba(219,201,119,${0.04 + i * 0.02})`, pointerEvents: 'none' }} />
            ))}

            <motion.div style={{ y, opacity, width: '100%', paddingTop: 'clamp(1px, 1vh, 1px)' }} className="container-main relative z-10 hero-content">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }} className="hero-grid">

                    {/* LEFT */}
                    <div>
                        <motion.div
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem', maxWidth: '100%', padding: '0.4rem 1rem', border: '1px solid rgba(219,201,119,0.3)', background: 'rgba(219,201,119,0.05)' }}
                        >
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#DBC977', animation: 'pulse 2s infinite' }} />
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
                            <span style={{ display: 'block', fontSize: 'clamp(2rem, 3.6vw, 3.5rem)', color: 'rgba(248,248,248,0.72)' }}>{t('line3')}</span>
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
                            <Link href="/contact" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', background: '#DBC977', color: '#0E1E30', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', overflow: 'hidden', transition: 'box-shadow 0.3s', textDecoration: 'none' }}
                               onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 40px rgba(219,201,119,0.5)')}
                               onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
                                {t('ctaServices')} <ArrowUpRight size={14} />
                            </Link>
                            <a href="#featured-projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', border: '1px solid rgba(248,248,248,0.2)', color: 'rgba(248,248,248,0.7)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'border-color 0.3s, color 0.3s', textDecoration: 'none' }}
                               onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(248,248,248,0.6)'; e.currentTarget.style.color = '#F8F8F8' }}
                               onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(248,248,248,0.2)'; e.currentTarget.style.color = 'rgba(248,248,248,0.7)' }}>
                                {t('ctaAbout')} <ArrowUpRight size={14} />
                            </a>
                        </motion.div>

                        <motion.div
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-cream/70 mb-8"
                        >
                            <span className="text-cream/50 uppercase tracking-wider text-[0.68rem]">{t('proof')}:</span>
                            <Link href="/portfolio/dacar-by-undp" className="inline-flex items-center gap-1 text-gold hover:text-gold/80 transition-colors font-medium underline underline-offset-4 decoration-gold/40">
                                <span>{t('proofDacar')}</span>
                            </Link>
                            <span className="text-cream/35">·</span>
                            <Link href="/portfolio/e-office" className="inline-flex items-center gap-1 text-gold hover:text-gold/80 transition-colors font-medium underline underline-offset-4 decoration-gold/40">
                                <span>{t('proofEoffice')}</span>
                            </Link>
                        </motion.div>

                        <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', paddingTop: '2rem', borderTop: '1px solid rgba(248,248,248,0.08)' }} />
                    </div>

                    {/* RIGHT — Mascot (desktop only, hidden entirely on mobile) */}
                    <div className="hero-logo-col" style={{ display: 'none', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 380 }}>
                        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,86,170,0.28), transparent 70%)', filter: 'blur(40px)' }} />
                        <div style={{ position: 'absolute', width: 340, height: 340, borderRadius: '50%', border: '1px solid rgba(219,201,119,0.15)', animation: 'spin 22s linear infinite' }} />
                        <div style={{ position: 'absolute', width: 270, height: 270, borderRadius: '50%', border: '1px solid rgba(0,86,170,0.25)', animation: 'spin 16s linear infinite reverse' }} />
                        <div style={{ position: 'absolute', width: 340, height: 340, animation: 'spin 9s linear infinite' }}>
                            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', width: 10, height: 10, borderRadius: '50%', background: '#DBC977', boxShadow: '0 0 16px rgba(219,201,119,0.9)' }} />
                        </div>

                        {/* Floating mascot character */}
                        <motion.div
                            animate={{ y: [0, -16, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ position: 'relative', zIndex: 10, width: 280, maxWidth: '80%', filter: 'drop-shadow(0 30px 36px rgba(0,0,0,0.45))' }}
                        >
                            <Image
                                src="/assets/mascot.png"
                                alt="Maskot Sundawa Teknologi"
                                width={900}
                                height={900}
                                className="object-contain"
                                priority
                                sizes="280px"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <div className="hero-scroll" style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', color: 'rgba(248,248,248,0.4)' }}>
                <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600 }}>{t('scroll')}</span>
                <ChevronDown size={14} style={{ animation: 'bounce 1.5s infinite' }} />
            </div>

            <style>{`
                @media (min-width: 1024px) { .hero-grid { grid-template-columns: 1.5fr 0.5fr !important; } .hero-logo-col { display: flex !important; } }
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
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </section>
    )
}