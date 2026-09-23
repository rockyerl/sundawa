'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function ProblemSection() {
    const t = useTranslations('problem')
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })

    const points = t.raw('points') as string[]

    return (
        <section id="problem" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: '40%', height: '100%', background: 'linear-gradient(to right, rgba(219,201,119,0.04), transparent)', pointerEvents: 'none' }} />

            <div className="container-main">
                <motion.div
                    initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}
                >
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#DBC977' }}>— {t('label')}</span>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(219,201,119,0.4), transparent)' }} />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.15 }}
                    style={{ fontWeight: 900, fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)', lineHeight: 1.15, color: '#F8F8F8', marginBottom: '3.5rem', maxWidth: '42rem' }}
                >
                    {t('heading1')}<br />
                    <span className="gold-gradient">{t('heading2')}</span>
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }} className="problem-grid">
                    {/* LEFT — cascading points */}
                    <div>
                        {points.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.25 + i * 0.09 }}
                                style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', padding: '1.1rem 0', borderBottom: i < points.length - 1 ? '1px solid rgba(219,201,119,0.1)' : 'none' }}
                            >
                                <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(219,201,119,0.5)', minWidth: '1.6rem', paddingTop: '0.15rem' }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <p style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.6, color: 'rgba(248,248,248,0.65)', margin: 0 }}>
                                    {p}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* RIGHT — closing + transition */}
                    <div style={{ padding: '2rem', border: '1px solid rgba(219,201,119,0.15)', background: 'rgba(219,201,119,0.03)' }}>
                        <motion.blockquote
                            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.7 }}
                            style={{ paddingLeft: '1.5rem', borderLeft: '2px solid #DBC977', margin: 0, marginBottom: '2.5rem' }}
                        >
                            <p style={{ color: 'rgba(219,201,119,0.85)', fontWeight: 600, fontSize: '1.15rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                                {t('closing')}
                            </p>
                        </motion.blockquote>

                        <motion.div
                            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.9 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                        >
                            <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', color: '#F8F8F8' }}>{t('transition')}</span>
                            <ChevronDown size={16} style={{ color: '#DBC977', animation: 'bounce 1.5s infinite' }} />
                        </motion.div>
                    </div>
                </div>
            </div>

            <style>{`
                .gold-gradient {
                    background: linear-gradient(135deg, #DBC977, #A66A2C, #DBC977);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
                @media (min-width: 1024px) { .problem-grid { grid-template-columns: 1.3fr 1fr !important; gap: 5rem !important; } }
            `}</style>
        </section>
    )
}