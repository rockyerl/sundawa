'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function AboutSection() {
    const t = useTranslations('about')
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })

    const missions = t.raw('missions') as { num: string; title: string; body: string }[]

    return (
        <section id="about" ref={ref} className="relative overflow-hidden">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#0056AA]/5 to-transparent" />

            <div className="container-main">
                <motion.div
                    initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}
                >
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#DBC977' }}>— {t('label')}</span>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(219,201,119,0.4), transparent)' }} />
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem', alignItems: 'start' }} className="lg-grid-2col">
                    {/* Left */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ fontWeight: 900, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.15, color: '#F8F8F8', marginBottom: '2rem' }}
                        >
                            {t('heading1')}<br />
                            <span className="gold-gradient">{t('heading2')}</span><br />
                            {t('heading3')}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}
                            style={{ color: 'rgba(248,248,248,0.55)', fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}
                        >
                            {t('p1')}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }}
                            style={{ color: 'rgba(248,248,248,0.4)', fontWeight: 300, lineHeight: 1.8 }}
                        >
                            {t('p2')}
                        </motion.p>

                        <motion.blockquote
                            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.6 }}
                            style={{ marginTop: '2.5rem', paddingLeft: '1.5rem', borderLeft: '2px solid #DBC977' }}
                        >
                            <p style={{ color: 'rgba(219,201,119,0.8)', fontWeight: 600, fontSize: '1.15rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                                &ldquo;{t('quote')}&rdquo;
                            </p>
                        </motion.blockquote>
                    </div>

                    {/* Right — Mission list */}
                    <div>
                        {missions.map((m, i) => (
                            <motion.div
                                key={m.num}
                                initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                                style={{ position: 'relative', padding: '1.75rem 0', borderTop: '1px solid rgba(219,201,119,0.12)', borderBottom: i === missions.length - 1 ? '1px solid rgba(219,201,119,0.12)' : 'none', cursor: 'default' }}
                                className="group"
                            >
                                <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(219,201,119,0.05), transparent)', pointerEvents: 'none' }} />
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '2rem' }}>
                                        <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(219,201,119,0.45)' }}>{m.num}</span>
                                        {i < missions.length - 1 && (
                                            <div style={{ width: '1px', height: '2.5rem', marginTop: '0.5rem', background: 'linear-gradient(to bottom, rgba(219,201,119,0.25), transparent)' }} />
                                        )}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                                            <h3 style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.04em', color: '#F8F8F8', transition: 'color 0.3s' }} className="group-hover:!text-[#DBC977]">
                                                {m.title}
                                            </h3>
                                            <div style={{ height: '1px', background: 'rgba(219,201,119,0.3)', transition: 'width 0.4s', width: '1.5rem', flexShrink: 0, marginLeft: '1rem' }} className="group-hover:!w-10" />
                                        </div>
                                        <p style={{ fontSize: '0.85rem', lineHeight: 1.75, fontWeight: 300, color: 'rgba(248,248,248,0.45)' }}>{m.body}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`@media (min-width: 1024px) { .lg-grid-2col { grid-template-columns: 1fr 1fr !important; } }`}</style>
        </section>
    )
}