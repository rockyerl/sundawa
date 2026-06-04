'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star, Shield, Users, Award, Lightbulb } from 'lucide-react'

const values = [
    {
        icon: Star,
        title: 'Kepuasan Klien Utama',
        desc: 'Kepuasan dan kebutuhan klien adalah prioritas utama dalam setiap tindakan dan keputusan yang diambil.',
        color: '#DBC977',
        num: '01',
    },
    {
        icon: Users,
        title: 'Pelayanan Ramah & Nyaman',
        desc: 'Menyediakan lingkungan dan pengalaman yang nyaman bagi klien, dari awal interaksi hingga penyelesaian proyek.',
        color: '#2d7dd2',
        num: '02',
    },
    {
        icon: Shield,
        title: 'Keandalan & Ketepatan',
        desc: 'Memberikan layanan berkualitas tinggi dengan presisi dan keandalan yang tinggi dalam setiap aspek bisnis.',
        color: '#DBC977',
        num: '03',
    },
    {
        icon: Users,
        title: 'Kolaborasi Aktif',
        desc: 'Mendorong komunikasi terbuka dan kolaborasi erat antara tim internal dan klien untuk pemahaman mendalam.',
        color: '#2d7dd2',
        num: '04',
    },
    {
        icon: Award,
        title: 'Komitmen Profesionalisme',
        desc: 'Menempatkan standar keahlian tinggi dan etika kerja yang tinggi dalam setiap aspek bisnis.',
        color: '#DBC977',
        num: '05',
    },
    {
        icon: Lightbulb,
        title: 'Inovasi Berkelanjutan',
        desc: 'Mendorong inovasi dan peningkatan dalam solusi yang ditawarkan, sesuai perkembangan teknologi dan kebutuhan pasar.',
        color: '#2d7dd2',
        num: '06',
    },
]

export default function ValuesSection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="values" ref={ref} style={{ position: 'relative' }}>
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, transparent, rgba(0,86,170,0.04), transparent)',
                pointerEvents: 'none',
            }} />

            <div className="container-main">
                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}
                >
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#DBC977' }}>— Values</span>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(219,201,119,0.4), transparent)' }} />
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15 }}
                    style={{ fontWeight: 900, fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: '#F8F8F8', marginBottom: '1rem', lineHeight: 1.1 }}
                >
                    Nilai-Nilai<br />
                    <span className="gold-gradient">Penting Kami</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.25 }}
                    style={{ color: 'rgba(248,248,248,0.4)', fontWeight: 300, fontSize: '1rem', marginBottom: '4rem', maxWidth: '32rem', lineHeight: 1.8 }}
                >
                    Prinsip-prinsip yang membentuk setiap keputusan dan interaksi di Sundawa Teknologi.
                </motion.p>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1px', background: 'rgba(219,201,119,0.08)' }}
                     className="values-grid">
                    {values.map((v, i) => (
                        <motion.div
                            key={v.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 + i * 0.07, duration: 0.6 }}
                            style={{
                                position: 'relative',
                                padding: '2.5rem',
                                background: 'rgba(14,30,48,0.95)',
                                cursor: 'default',
                                overflow: 'hidden',
                                transition: 'background 0.4s',
                            }}
                            className="value-card"
                        >
                            {/* Top color accent line */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                                background: `linear-gradient(90deg, ${v.color}60, transparent)`,
                                opacity: 0, transition: 'opacity 0.4s',
                            }} className="value-top-line" />

                            {/* Number — large background watermark */}
                            <div style={{
                                position: 'absolute', bottom: '1rem', right: '1.5rem',
                                fontSize: '5rem', fontWeight: 900, lineHeight: 1,
                                color: 'rgba(248,248,248,0.03)',
                                userSelect: 'none', pointerEvents: 'none',
                                fontVariantNumeric: 'tabular-nums',
                            }}>
                                {v.num}
                            </div>

                            {/* Header row */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                                {/* Icon — minimal line style */}
                                <div style={{
                                    width: 40, height: 40,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    position: 'relative',
                                }}>
                                    {/* Diagonal corner lines */}
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: 10, height: 10, borderTop: `1.5px solid ${v.color}`, borderLeft: `1.5px solid ${v.color}` }} />
                                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderBottom: `1.5px solid ${v.color}`, borderRight: `1.5px solid ${v.color}` }} />
                                    <v.icon size={16} style={{ color: v.color, opacity: 0.9 }} />
                                </div>

                                {/* Small number tag */}
                                <span style={{
                                    fontSize: '0.6rem', fontWeight: 800,
                                    letterSpacing: '0.15em', color: `${v.color}60`,
                                }}>
                                    {v.num}
                                </span>
                            </div>

                            <h3 style={{
                                fontWeight: 700, fontSize: '0.9rem',
                                letterSpacing: '0.04em', color: '#F8F8F8',
                                marginBottom: '0.75rem', lineHeight: 1.4,
                                transition: 'color 0.3s',
                            }} className="value-title">
                                {v.title}
                            </h3>

                            <p style={{
                                fontSize: '0.82rem', lineHeight: 1.75,
                                fontWeight: 300, color: 'rgba(248,248,248,0.38)',
                            }}>
                                {v.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
                @media (min-width: 768px) {
                    .values-grid { grid-template-columns: 1fr 1fr !important; }
                }
                @media (min-width: 1024px) {
                    .values-grid { grid-template-columns: 1fr 1fr 1fr !important; }
                }
                .value-card:hover {
                    background: rgba(20, 38, 60, 0.98) !important;
                }
                .value-card:hover .value-top-line {
                    opacity: 1 !important;
                }
                .value-card:hover .value-title {
                    color: #DBC977 !important;
                }
            `}</style>
        </section>
    )
}