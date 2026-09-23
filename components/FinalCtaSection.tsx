'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function FinalCtaSection() {
    const t = useTranslations('finalCta')
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    const points = t.raw('points') as string[]

    return (
        <section id="final-cta" ref={ref} style={{ position: 'relative', textAlign: 'center' }}>
            <div className="container-main" style={{ maxWidth: '46rem' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
                    style={{ fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2, color: '#F8F8F8', marginBottom: '2.5rem' }}
                >
                    {t('heading')}
                </motion.h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', alignItems: 'center' }}>
                    {points.map((p, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                            style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.6, color: 'rgba(248,248,248,0.55)', margin: 0 }}
                        >
                            {p}
                        </motion.p>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.65 }}
                    style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '0.02em', color: '#DBC977', marginBottom: '2.5rem' }}
                >
                    {t('startThere')}
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8 }} style={{ marginBottom: '1rem' }}>
                    <a href="#contact" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2.25rem', background: '#DBC977', color: '#0E1E30', fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'box-shadow 0.3s', textDecoration: 'none' }}
                       onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 40px rgba(219,201,119,0.5)')}
                       onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
                        {t('cta')} <ArrowUpRight size={14} />
                    </a>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.95 }}
                    style={{ fontSize: '0.8rem', fontWeight: 300, color: 'rgba(248,248,248,0.35)', maxWidth: '30rem', margin: '0 auto' }}
                >
                    {t('supporting')}
                </motion.p>
            </div>
        </section>
    )
}