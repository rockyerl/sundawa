'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowUpRight, Lock } from 'lucide-react'

const clients = [
    {
        name: 'Oetomo Hospital',
        initials: 'OH',
        type: 'Healthcare',
        desc: 'Sistem informasi rumah sakit terintegrasi mencakup manajemen pasien, rekam medis, dan billing.',
        num: '01',
    },
    {
        name: 'PT. Kimu Enam Kemasindo',
        initials: 'KE',
        type: 'Manufacturing',
        desc: 'Solusi ERP dan manajemen produksi untuk mengoptimalkan rantai pasokan dan efisiensi pabrik.',
        num: '02',
    },
    {
        name: 'Sistem Informasi Konveksi',
        initials: 'SIK',
        type: 'Textile & Fashion',
        desc: 'Platform manajemen produksi konveksi dari pemesanan hingga pengiriman secara real-time.',
        num: '03',
    },
    {
        name: 'Healthcare App Client',
        initials: 'HC',
        type: 'Healthcare',
        desc: 'Aplikasi kesehatan mobile dengan fitur telemedicine dan manajemen rekam medis digital.',
        num: '04',
        confidential: true,
    },
]

const stats = [
    { num: '15+', label: 'Klien Aktif' },
    { num: '30+', label: 'Project Selesai' },
    { num: '5+',  label: 'Tahun Pengalaman' },
    { num: '10+', label: 'Tim Profesional' },
]

export default function ClientsSection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const [active, setActive] = useState<number | null>(null)

    return (
        <section id="clients" ref={ref} style={{ position: 'relative' }}>
            <div className="container-main">

                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}
                >
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#DBC977' }}>
                        — Clients
                    </span>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(219,201,119,0.4), transparent)' }} />
                </motion.div>

                {/* Main layout */}
                <div className="clients-layout">

                    {/* ── Left ── */}
                    <div className="clients-left">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 }}
                            style={{ fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#F8F8F8', lineHeight: 1.1, marginBottom: '1rem' }}
                        >
                            Klien<br />
                            <span className="gold-gradient">Kami</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.2 }}
                            style={{ color: 'rgba(248,248,248,0.4)', fontWeight: 300, lineHeight: 1.8, fontSize: '0.85rem', marginBottom: '2rem' }}
                        >
                            Dipercaya oleh berbagai perusahaan dari beragam industri untuk menghadirkan solusi teknologi terbaik.
                        </motion.p>

                        {/* Stats grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 }}
                            style={{
                                display: 'grid', gridTemplateColumns: '1fr 1fr',
                                gap: '1px',
                                background: 'rgba(219,201,119,0.12)',
                                border: '1px solid rgba(219,201,119,0.12)',
                                marginBottom: '1.25rem',
                            }}
                        >
                            {stats.map((s) => (
                                <div key={s.label} style={{ background: '#0E1E30', padding: '1.1rem 1rem' }}>
                                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#DBC977', lineHeight: 1, marginBottom: '0.25rem' }}>
                                        {s.num}
                                    </div>
                                    <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(248,248,248,0.35)' }}>
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Confidential notice */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.4 }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.6rem',
                                padding: '0.75rem 1rem',
                                border: '1px solid rgba(219,201,119,0.15)',
                                background: 'rgba(219,201,119,0.04)',
                            }}
                        >
                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#DBC977', flexShrink: 0 }} />
                            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(219,201,119,0.6)' }}>
                                Beberapa klien bersifat confidential
                            </span>
                        </motion.div>
                    </div>

                    {/* ── Right — client grid ── */}
                    <div
                        className="clients-right"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '1px',
                            background: 'rgba(219,201,119,0.1)',
                            border: '1px solid rgba(219,201,119,0.1)',
                            alignSelf: 'start',
                        }}
                    >
                        {clients.map((c, i) => (
                            <motion.div
                                key={c.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.15 + i * 0.08 }}
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
                                {/* Top accent bar */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                                    background: 'linear-gradient(to right, #DBC977, rgba(219,201,119,0))',
                                    opacity: active === i ? 1 : 0,
                                    transition: 'opacity 0.3s',
                                }} />

                                {/* Card top: initials + confidential badge */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', gap: '0.75rem' }}>
                                    <div style={{
                                        width: 44, height: 44, flexShrink: 0,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        border: `1px solid ${active === i ? 'rgba(219,201,119,0.5)' : 'rgba(219,201,119,0.2)'}`,
                                        background: active === i ? 'rgba(219,201,119,0.12)' : 'rgba(219,201,119,0.06)',
                                        fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.05em',
                                        color: active === i ? '#DBC977' : 'rgba(219,201,119,0.7)',
                                        transition: 'all 0.3s',
                                    }}>
                                        {c.initials}
                                    </div>

                                    {c.confidential && (
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: '0.35rem',
                                            padding: '0.2rem 0.6rem',
                                            border: '1px solid rgba(219,201,119,0.15)',
                                        }}>
                                            <Lock size={10} color="rgba(219,201,119,0.4)" />
                                            <span style={{ fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(219,201,119,0.4)' }}>
                                                Confidential
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Industry tag */}
                                <div style={{
                                    display: 'inline-flex', alignItems: 'center',
                                    padding: '0.25rem 0.75rem',
                                    border: '1px solid rgba(45,125,210,0.25)',
                                    background: 'rgba(45,125,210,0.07)',
                                    marginBottom: '0.75rem',
                                }}>
                                    <span style={{ fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(45,125,210,0.8)' }}>
                                        {c.type}
                                    </span>
                                </div>

                                {/* Name */}
                                <h3 style={{
                                    fontWeight: 700, fontSize: '0.95rem',
                                    color: active === i ? '#DBC977' : '#F8F8F8',
                                    letterSpacing: '0.01em', lineHeight: 1.3,
                                    marginBottom: '0.5rem',
                                    transition: 'color 0.3s',
                                }}>
                                    {c.name}
                                </h3>

                                {/* Desc */}
                                <p style={{ fontSize: '0.78rem', lineHeight: 1.7, fontWeight: 300, color: 'rgba(248,248,248,0.38)' }}>
                                    {c.desc}
                                </p>

                                {/* Footer */}
                                <div style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    marginTop: '1.25rem', paddingTop: '1rem',
                                    borderTop: '1px solid rgba(248,248,248,0.05)',
                                }}>
                                    <span style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(248,248,248,0.15)' }}>
                                        {c.num}
                                    </span>
                                    <div style={{
                                        width: 26, height: 26,
                                        border: `1px solid ${active === i ? 'rgba(219,201,119,0.4)' : 'rgba(248,248,248,0.08)'}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: active === i ? '#DBC977' : 'rgba(248,248,248,0.2)',
                                        transition: 'all 0.3s',
                                    }}>
                                        <ArrowUpRight size={12} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .clients-layout {
                    display: flex;
                    flex-direction: column;
                    gap: 3rem;
                    align-items: flex-start;
                }
                .clients-left { width: 100%; }
                .clients-right { width: 100%; }

                @media (min-width: 1024px) {
                    .clients-layout {
                        display: grid !important;
                        grid-template-columns: 260px 1fr !important;
                        gap: 5rem !important;
                        align-items: start !important;
                    }
                }

                @media (max-width: 480px) {
                    .clients-right {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    )
}
