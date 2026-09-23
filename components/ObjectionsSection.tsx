'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function ObjectionsSection() {
    const t = useTranslations('objections')
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    const items = t.raw('items') as { question: string; answer: string }[]

    return (
        <section id="objections" ref={ref} style={{ position: 'relative' }}>
            <div className="container-main">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'start' }} className="objections-grid">
                    {/* LEFT — the fear + reassurance */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
                            style={{ fontWeight: 900, fontSize: 'clamp(1.9rem, 3.6vw, 2.7rem)', lineHeight: 1.25, color: '#F8F8F8', marginBottom: '2rem', fontStyle: 'italic', paddingRight: '0.2em' }}
                        >
                            &ldquo;<span className="gold-gradient" style={{ display: 'inline-block', paddingRight: '0.12em' }}>{t('heading')}</span>&rdquo;
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}
                            style={{ color: '#DBC977', fontWeight: 600, fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}
                        >
                            {t('reassuranceLead')}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.25 }}
                            style={{ color: 'rgba(248,248,248,0.5)', fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.85, maxWidth: '32rem' }}
                        >
                            {t('reassuranceBody')}
                        </motion.p>
                    </div>

                    {/* RIGHT — objections list */}
                    <div>
                        {items.map((o, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                                style={{ position: 'relative', padding: '1.5rem 0', borderTop: '1px solid rgba(219,201,119,0.12)', borderBottom: i === items.length - 1 ? '1px solid rgba(219,201,119,0.12)' : 'none' }}
                            >
                                <p style={{ fontWeight: 700, fontSize: '0.95rem', color: '#F8F8F8', marginBottom: '0.6rem', fontStyle: 'italic' }}>
                                    &ldquo;{o.question}&rdquo;
                                </p>
                                <p style={{ fontSize: '0.85rem', lineHeight: 1.75, fontWeight: 300, color: 'rgba(219,201,119,0.75)' }}>
                                    {o.answer}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .gold-gradient {
                    background: linear-gradient(135deg, #DBC977, #A66A2C, #DBC977);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    padding-right: 0.05em;
                    overflow: visible;
                }
                @media (min-width: 1024px) { .objections-grid { grid-template-columns: 1fr 1fr !important; gap: 6rem !important; } }
            `}</style>
        </section>
    )
}