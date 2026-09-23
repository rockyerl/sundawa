'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { X, Check, ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function ValuesSection() {
    const t = useTranslations('values')
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    const rows = t.raw('rows') as { today: string; withSundawa: string }[]

    return (
        <section id="values" ref={ref} style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,86,170,0.04), transparent)', pointerEvents: 'none' }} />

            <div className="container-main">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#DBC977' }}>— {t('label')}</span>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(219,201,119,0.4), transparent)' }} />
                </motion.div>

                <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}
                           style={{ fontWeight: 900, fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: '#F8F8F8', marginBottom: '3.5rem', lineHeight: 1.15, maxWidth: '46rem' }}>
                    {t('heading1')}<br />
                    <span className="gold-gradient">{t('heading2')}</span>
                </motion.h2>

                {/* Comparison table */}
                <div style={{ border: '1px solid rgba(219,201,119,0.12)', overflow: 'hidden' }}>
                    {/* Header row */}
                    <div className="values-table-row" style={{ background: 'rgba(219,201,119,0.05)', borderBottom: '1px solid rgba(219,201,119,0.15)' }}>
                        <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <X size={13} style={{ color: 'rgba(248,248,248,0.3)' }} />
                            <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(248,248,248,0.4)' }}>{t('todayLabel')}</span>
                        </div>
                        <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderLeft: '1px solid rgba(219,201,119,0.1)' }}>
                            <Check size={13} style={{ color: '#DBC977' }} />
                            <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#DBC977' }}>{t('withLabel')}</span>
                        </div>
                    </div>

                    {/* Data rows */}
                    {rows.map((r, i) => (
                        <motion.div key={i}
                                    initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                                    className="values-table-row"
                                    style={{ borderBottom: i < rows.length - 1 ? '1px solid rgba(219,201,119,0.08)' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(29,52,81,0.2)' }}>
                            <div style={{ padding: '1.1rem 1.5rem', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.6, color: 'rgba(248,248,248,0.4)' }}>
                                {r.today}
                            </div>
                            <div style={{ padding: '1.1rem 1.5rem', fontSize: '0.85rem', fontWeight: 400, lineHeight: 1.6, color: 'rgba(248,248,248,0.85)', borderLeft: '1px solid rgba(219,201,119,0.08)' }}>
                                {r.withSundawa}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Closing paragraph */}
                <motion.blockquote
                    initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7, duration: 0.8 }}
                    style={{ marginTop: '3rem', marginBottom: '2.5rem', paddingLeft: '1.5rem', borderLeft: '2px solid #DBC977', maxWidth: '42rem' }}
                >
                    <p style={{ color: 'rgba(248,248,248,0.6)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.8 }}>
                        {t('closing')}
                    </p>
                </motion.blockquote>

                {/* CTA */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.85 }}>
                    <a href="#contact" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', background: '#DBC977', color: '#0E1E30', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'box-shadow 0.3s', textDecoration: 'none' }}
                       onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 40px rgba(219,201,119,0.5)')}
                       onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
                        {t('cta')} <ArrowUpRight size={14} />
                    </a>
                </motion.div>
            </div>

            <style>{`
                .gold-gradient {
                    background: linear-gradient(135deg, #DBC977, #A66A2C, #DBC977);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .values-table-row { display: grid; grid-template-columns: 1fr; }
                @media (min-width: 700px) { .values-table-row { grid-template-columns: 1fr 1fr !important; } }
            `}</style>
        </section>
    )
}