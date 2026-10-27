"use client"

import { ArrowUpRight } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/navigation'
import { SITE_URL } from '@/lib/Seo'
import SubpageNav from '@/src/shared/ui/SubpageNav'

export default function ServicesPage() {
    const t = useTranslations('servicesPage')
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    const services = t.raw('detail') as Record<string, { slug: string; problem: string; title: string; desc: string; outcome: string; details: string }>
    const serviceList = Object.values(services)

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: serviceList.map((service, index) => ({
            '@type': 'Service',
            position: index + 1,
            name: service.title,
            description: service.desc,
            provider: { '@id': `${SITE_URL}/#organization` },
            url: `${SITE_URL}/en/services/${service.slug}`,
        })),
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />
            <SubpageNav backLabel={t('navBack')} titleLabel={t('navTitle')} backHref="/" />
            <section ref={ref} style={{ padding: '4rem 0' }}>
                <div className="container-main">
                    {/* Hero */}
                    <div style={{ marginBottom: '3rem' }}>
                        <motion.p initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                                  style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#DBC977', marginBottom: '1rem' }}>
                            {t('eyebrow')}
                        </motion.p>
                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
                                   style={{ fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#F8F8F8', lineHeight: 1.1, marginBottom: '1rem' }}>
                            {t('title')}
                        </motion.h1>
                        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
                                  style={{ fontSize: '1.1rem', color: 'rgba(248,248,248,0.6)', maxWidth: '600px', lineHeight: 1.6 }}>
                            {t('subtitle')}
                        </motion.p>
                    </div>

                    {/* Services Grid */}
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {serviceList.map((service, index) => (
                            <motion.div key={service.slug} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + index * 0.1 }}
                                        style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                                <Link
                                    href={`/services/${service.slug}`}
                                    style={{
                                        display: 'block',
                                        padding: '2rem',
                                        background: 'rgba(219,201,119,0.03)',
                                        border: '1px solid rgba(219,201,119,0.1)',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(219,201,119,0.3)'
                                        e.currentTarget.style.background = 'rgba(219,201,119,0.06)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(219,201,119,0.1)'
                                        e.currentTarget.style.background = 'rgba(219,201,119,0.03)'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
                                        <div>
                                            <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,240,255,0.6)', marginBottom: '0.5rem' }}>
                                                {service.problem}
                                            </p>
                                            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#F8F8F8', lineHeight: 1.3 }}>
                                                {service.title}
                                            </h3>
                                        </div>
                                        <ArrowUpRight size={20} color="#DBC977" style={{ flexShrink: 0, marginTop: '0.5rem' }} />
                                    </div>
                                    <p style={{ fontSize: '0.95rem', color: 'rgba(248,248,248,0.6)', lineHeight: 1.6, marginBottom: '1rem' }}>
                                        {service.desc}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DBC977', letterSpacing: '0.1em' }}>
                                            {t('viewDetail')}
                                        </span>
                                        <span style={{ fontSize: '0.8rem', color: 'rgba(248,248,248,0.4)', fontStyle: 'italic' }}>
                                            {t('outcome')}: {service.outcome}
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
