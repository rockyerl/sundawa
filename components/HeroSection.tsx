'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    const stats = [
        { num: '5+', label: 'Tahun Pengalaman' },
        { num: '30+', label: 'Project Digital' },
        { num: '15+', label: 'Klien Aktif' },
        { num: '10+', label: 'Tim Ahli' },
    ]

    return (
        <section ref={ref} id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
            {/* Radial backdrop */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(0,86,170,0.15), transparent)',
                pointerEvents: 'none',
            }} />

            {/* Decorative circles */}
            {[600, 420, 240].map((size, i) => (
                <div key={size} style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: size, height: size,
                    borderRadius: '50%',
                    border: `1px solid rgba(219,201,119,${0.04 + i * 0.02})`,
                    pointerEvents: 'none',
                }} />
            ))}

            <motion.div
                style={{ y, opacity, width: '100%', paddingTop: '7rem', paddingBottom: '4rem' }}
                className="container-main relative z-10"
            >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }}
                     className="hero-grid">

                    {/* ── LEFT ── */}
                    <div>
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                                marginBottom: '2rem', padding: '0.4rem 1rem',
                                border: '1px solid rgba(219,201,119,0.3)',
                                background: 'rgba(219,201,119,0.05)',
                            }}
                        >
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#DBC977', animation: 'pulse 2s infinite' }} />
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#DBC977' }}>
                                IT Solutions Company
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.3 }}
                            style={{ fontWeight: 900, lineHeight: 0.92, marginBottom: '1.75rem', letterSpacing: '-0.02em' }}
                        >
                            <span style={{ display: 'block', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: '#F8F8F8' }}>
                                PROFESSIONAL
                            </span>
                            <span style={{ display: 'block', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }} className="shimmer-text">
                                PRECISION
                            </span>
                            <span style={{ display: 'block', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: 'rgba(248,248,248,0.2)' }}>
                                CUSTOMER
                            </span>
                            <span style={{ display: 'block', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: '#F8F8F8' }}>
                                COMFORT
                            </span>
                        </motion.h1>

                        {/* Subtext */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            style={{
                                color: 'rgba(248,248,248,0.5)', fontWeight: 300,
                                fontSize: '1.05rem', lineHeight: 1.8,
                                maxWidth: '28rem', marginBottom: '2.25rem',
                            }}
                        >
                            Perusahaan IT yang berfokus pada kenyamanan klien dan menjunjung tinggi
                            profesionalitas dalam setiap aspek layanan.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.65 }}
                            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3.5rem' }}
                        >
                            <a href="#services" style={{
                                position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.85rem 2rem',
                                background: '#DBC977', color: '#0E1E30',
                                fontWeight: 800, fontSize: '0.75rem',
                                letterSpacing: '0.15em', textTransform: 'uppercase',
                                overflow: 'hidden', transition: 'box-shadow 0.3s',
                            }}
                               onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 40px rgba(219,201,119,0.5)')}
                               onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
                            >
                                Jasa Kami
                                <ArrowUpRight size={14} />
                            </a>
                            <a href="#about" style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.85rem 2rem',
                                border: '1px solid rgba(248,248,248,0.2)', color: 'rgba(248,248,248,0.7)',
                                fontWeight: 600, fontSize: '0.75rem',
                                letterSpacing: '0.15em', textTransform: 'uppercase',
                                transition: 'border-color 0.3s, color 0.3s',
                            }}
                               onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(248,248,248,0.6)'; e.currentTarget.style.color = '#F8F8F8' }}
                               onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(248,248,248,0.2)'; e.currentTarget.style.color = 'rgba(248,248,248,0.7)' }}
                            >
                                Tentang Kami
                            </a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.9 }}
                            style={{
                                display: 'flex', gap: '2.5rem', flexWrap: 'wrap',
                                paddingTop: '2rem',
                                borderTop: '1px solid rgba(248,248,248,0.08)',
                            }}
                        >
                            {stats.map((s) => (
                                <div key={s.num}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 900 }} className="gold-gradient">{s.num}</div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(248,248,248,0.35)', marginTop: '0.25rem' }}>
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── RIGHT — Logo ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.1, delay: 0.4 }}
                        className="hero-logo-col"
                        style={{ display: 'none', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                    >
                        {/* Glow */}
                        <div style={{
                            position: 'absolute', width: 320, height: 320, borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(0,86,170,0.25), transparent 70%)',
                            filter: 'blur(40px)',
                        }} />

                        {/* Rings */}
                        <div style={{ position: 'absolute', width: 380, height: 380, borderRadius: '50%', border: '1px solid rgba(219,201,119,0.15)', animation: 'spin 22s linear infinite' }} />
                        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(0,86,170,0.25)', animation: 'spin 16s linear infinite reverse' }} />

                        {/* Orbiting dot */}
                        <div style={{ position: 'absolute', width: 380, height: 380, animation: 'spin 9s linear infinite' }}>
                            <div style={{
                                position: 'absolute', top: 0, left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 10, height: 10, borderRadius: '50%',
                                background: '#DBC977',
                                boxShadow: '0 0 16px rgba(219,201,119,0.9)',
                            }} />
                        </div>

                        {/* Logo box — premium framed */}
                        <motion.div
                            animate={{ y: [0, -14, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ position: 'relative', zIndex: 10 }}
                        >
                            <div style={{
                                width: 220, height: 220,
                                border: '1px solid rgba(219,201,119,0.25)',
                                background: 'rgba(14,30,48,0.6)',
                                backdropFilter: 'blur(16px)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 0 60px rgba(0,86,170,0.3), inset 0 0 40px rgba(0,86,170,0.05)',
                                position: 'relative',
                            }}>
                                {/* Corner accents */}
                                {[
                                    { top: -1, left: -1, borderTop: '2px solid #DBC977', borderLeft: '2px solid #DBC977' },
                                    { top: -1, right: -1, borderTop: '2px solid #DBC977', borderRight: '2px solid #DBC977' },
                                    { bottom: -1, left: -1, borderBottom: '2px solid #DBC977', borderLeft: '2px solid #DBC977' },
                                    { bottom: -1, right: -1, borderBottom: '2px solid #DBC977', borderRight: '2px solid #DBC977' },
                                ].map((style, i) => (
                                    <div key={i} style={{ position: 'absolute', width: 20, height: 20, ...style }} />
                                ))}
                                <div style={{ position: 'relative', width: 160, height: 160 }}>
                                    <Image
                                        src="/assets/Logo Sundawa-01.png"
                                        alt="Sundawa Logo"
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                        priority={true}
                                        sizes="40px"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                style={{
                    position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
                    color: 'rgba(248,248,248,0.25)',
                }}
            >
                <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600 }}>Scroll</span>
                <ChevronDown size={14} style={{ animation: 'bounce 1.5s infinite' }} />
            </motion.div>

            <style>{`
                @media (min-width: 1024px) {
                    .hero-grid { grid-template-columns: 1fr 1fr !important; }
                    .hero-logo-col { display: flex !important; }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); }
                }
            `}</style>
        </section>
    )
}