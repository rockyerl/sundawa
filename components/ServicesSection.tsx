"use client";

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { MessageSquare, Palette, TestTube, Code2, Smartphone, Globe, ArrowUpRight } from 'lucide-react'

const services = [
    {
        icon: MessageSquare,
        title: 'Konsultasi IT',
        desc: 'Dapatkan konsultasi dari ahli kami mengenai kebutuhan digital bisnis Anda. Kami membantu merumuskan strategi teknologi yang tepat.',
        tag: 'Advisory',
        num: '01',
    },
    {
        icon: Palette,
        title: 'UI/UX Design',
        desc: 'Desain produk atau aplikasi dengan metode yang efektif dan efisien. Mengutamakan pengalaman pengguna yang intuitif dan menarik.',
        tag: 'Design',
        num: '02',
    },
    {
        icon: TestTube,
        title: 'Pengujian Software',
        desc: 'Percayai para ahli untuk melakukan pengujian yang diperlukan software Anda. Pastikan produk bebas bug sebelum diluncurkan.',
        tag: 'QA Testing',
        num: '03',
    },
    {
        icon: Code2,
        title: 'Custom Software',
        desc: 'Tingkatkan efisiensi bisnis dengan software yang dibangun khusus sesuai kebutuhan — dari manajemen stok hingga sistem enterprise.',
        tag: 'Development',
        num: '04',
    },
    {
        icon: Smartphone,
        title: 'Mobile App',
        desc: 'Pindahkan identitas merek Anda ke platform yang lebih mudah diakses. Aplikasi mobile yang responsif dan engaging.',
        tag: 'Mobile',
        num: '05',
    },
    {
        icon: Globe,
        title: 'Web Development',
        desc: 'Solusi web profesional dari landing page hingga platform enterprise yang skalabel dan modern.',
        tag: 'Web',
        num: '06',
    },
]

const stats = [
    { num: '50+', label: 'Proyek Selesai' },
    { num: '6',   label: 'Layanan Utama' },
    { num: '98%', label: 'Klien Puas' },
    { num: '5+', label: 'Tahun Pengalaman' },
]

export default function ServicesSection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const [active, setActive] = useState<number | null>(null)

    return (
        <section id="services" ref={ref} style={{ position: 'relative' }}>
            <div className="container-main">

                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}
                >
                    <span style={{
                        fontSize: '0.65rem', fontWeight: 800,
                        letterSpacing: '0.3em', textTransform: 'uppercase', color: '#DBC977',
                    }}>
                        — Services
                    </span>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(219,201,119,0.4), transparent)' }} />
                </motion.div>

                {/* Main layout */}
                <div className="services-layout">

                    {/* ── Left ── */}
                    <div className="services-left">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.15 }}
                            style={{
                                fontWeight: 900,
                                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                                color: '#F8F8F8',
                                lineHeight: 1.1,
                                marginBottom: '1.25rem',
                            }}
                        >
                            Jasa<br />
                            <span className="gold-gradient">Kami</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.25 }}
                            style={{
                                color: 'rgba(248,248,248,0.4)',
                                fontWeight: 300,
                                lineHeight: 1.8,
                                fontSize: '0.85rem',
                                marginBottom: '2rem',
                            }}
                        >
                            Kami menawarkan berbagai solusi teknologi yang dirancang khusus untuk kebutuhan bisnis Anda — dari konsultasi hingga produk jadi.
                        </motion.p>

                        {/* Stats grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.35 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1px',
                                background: 'rgba(219,201,119,0.12)',
                                border: '1px solid rgba(219,201,119,0.12)',
                                marginBottom: '2rem',
                            }}
                        >
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    style={{
                                        background: '#0E1E30',
                                        padding: '1.1rem 1rem',
                                    }}
                                >
                                    <div style={{
                                        fontSize: '1.6rem', fontWeight: 900,
                                        color: '#DBC977', lineHeight: 1,
                                        marginBottom: '0.25rem',
                                    }}>
                                        {s.num}
                                    </div>
                                    <div style={{
                                        fontSize: '0.6rem', fontWeight: 700,
                                        letterSpacing: '0.15em', textTransform: 'uppercase',
                                        color: 'rgba(248,248,248,0.35)',
                                    }}>
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA */}
                        <motion.a
                            href="#contact"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.45 }}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em',
                                textTransform: 'uppercase', color: '#DBC977',
                                padding: '0.75rem 1.25rem',
                                border: '1px solid rgba(219,201,119,0.3)',
                                transition: 'all 0.25s',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(219,201,119,0.08)'
                                e.currentTarget.style.borderColor = 'rgba(219,201,119,0.6)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent'
                                e.currentTarget.style.borderColor = 'rgba(219,201,119,0.3)'
                            }}
                        >
                            Hubungi Kami
                            <ArrowUpRight size={13} />
                        </motion.a>
                    </div>

                    {/* ── Right — service card grid ── */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '1px',
                            background: 'rgba(219,201,119,0.1)',
                            border: '1px solid rgba(219,201,119,0.1)',
                            alignSelf: 'start',
                        }}
                        className="services-right"
                    >
                        {services.map((s, i) => (
                            <motion.div
                                key={s.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.1 + i * 0.07 }}
                                onMouseEnter={() => setActive(i)}
                                onMouseLeave={() => setActive(null)}
                                style={{
                                    position: 'relative',
                                    background: active === i ? 'rgba(29,52,81,0.6)' : '#0E1E30',
                                    padding: '1.75rem 1.5rem',
                                    cursor: 'default',
                                    transition: 'background 0.3s',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Top accent bar on hover */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                                    background: 'linear-gradient(to right, #DBC977, rgba(219,201,119,0))',
                                    opacity: active === i ? 1 : 0,
                                    transition: 'opacity 0.3s',
                                }} />

                                {/* Card top row: icon + num | tag */}
                                <div style={{
                                    display: 'flex', alignItems: 'flex-start',
                                    justifyContent: 'space-between', marginBottom: '1.1rem',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{
                                            width: 42, height: 42,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            border: `1px solid ${active === i ? 'rgba(219,201,119,0.45)' : 'rgba(219,201,119,0.2)'}`,
                                            background: active === i ? 'rgba(219,201,119,0.12)' : 'rgba(219,201,119,0.05)',
                                            color: '#DBC977',
                                            transition: 'all 0.3s',
                                            flexShrink: 0,
                                        }}>
                                            <s.icon size={17} />
                                        </div>
                                        <span style={{
                                            fontSize: '0.6rem', fontWeight: 800,
                                            letterSpacing: '0.15em',
                                            color: 'rgba(248,248,248,0.18)',
                                        }}>
                                            {s.num}
                                        </span>
                                    </div>
                                    <span style={{
                                        fontSize: '0.58rem', fontWeight: 800,
                                        letterSpacing: '0.2em', textTransform: 'uppercase',
                                        padding: '0.2rem 0.65rem',
                                        border: `1px solid ${active === i ? 'rgba(219,201,119,0.4)' : 'rgba(219,201,119,0.15)'}`,
                                        color: active === i ? 'rgba(219,201,119,0.85)' : 'rgba(219,201,119,0.45)',
                                        transition: 'all 0.3s',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {s.tag}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 style={{
                                    fontWeight: 700, fontSize: '0.92rem',
                                    color: active === i ? '#DBC977' : '#F8F8F8',
                                    letterSpacing: '0.02em',
                                    marginBottom: '0.6rem',
                                    transition: 'color 0.3s',
                                }}>
                                    {s.title}
                                </h3>

                                {/* Description — always visible */}
                                <p style={{
                                    fontSize: '0.78rem', lineHeight: 1.75,
                                    fontWeight: 300,
                                    color: 'rgba(248,248,248,0.38)',
                                }}>
                                    {s.desc}
                                </p>

                                {/* Arrow button */}
                                <div style={{
                                    display: 'flex', justifyContent: 'flex-end',
                                    marginTop: '1.1rem',
                                }}>
                                    <div style={{
                                        width: 28, height: 28,
                                        border: `1px solid ${active === i ? 'rgba(219,201,119,0.4)' : 'rgba(248,248,248,0.08)'}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: active === i ? '#DBC977' : 'rgba(248,248,248,0.2)',
                                        transition: 'all 0.3s',
                                    }}>
                                        <ArrowUpRight size={13} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .services-layout {
                    display: flex;
                    flex-direction: column;
                    gap: 3rem;
                    align-items: flex-start;
                }
                .services-left {
                    width: 100%;
                }
                .services-right {
                    width: 100%;
                }
                @media (min-width: 1024px) {
                    .services-layout {
                        flex-direction: row !important;
                        gap: 5rem !important;
                    }
                    .services-left {
                        width: 280px;
                        flex-shrink: 0;
                        position: sticky;
                        top: 8rem;
                    }
                    .services-right {
                        flex: 1;
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
                @media (max-width: 600px) {
                    .services-right {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    )
}