"use client";

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Search, PenTool, Code2, TestTube, PackageCheck, HeartHandshake, Check } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/src/i18n/navigation'
import { useTranslations } from 'next-intl'
import LangToggle from '@/components/LangToggle'

const icons = [Search, PenTool, Code2, TestTube, PackageCheck, HeartHandshake]

export default function Process() {
    const t = useTranslations('process')
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const [active, setActive] = useState<number | null>(null)

    const steps = t.raw('steps') as { num: string; tag: string; title: string; desc: string; points: string[] }[]
    const infoItems = t.raw('infoItems') as { icon: string; title: string; desc: string }[]

    return (
        <main style={{ background: '#0E1E30', minHeight: '100vh', color: '#F8F8F8' }}>

            {/* ── Top bar — sama persis pola Outsource.tsx ── */}
            <nav style={{
                borderBottom: '1px solid rgba(219,201,119,0.15)',
                padding: '1rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                background: 'rgba(14,30,48,0.95)',
                backdropFilter: 'blur(20px)',
                position: 'sticky',
                top: 0,
                zIndex: 50,
            }}>
                <Link href="/" style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: 'rgba(248,248,248,0.5)',
                    textDecoration: 'none', transition: 'color 0.2s',
                }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#DBC977')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,248,248,0.5)')}
                >
                    <ArrowLeft size={14} />
                    {t('navBack')}
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <LangToggle />
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
                        <div style={{ position: 'relative', width: 32, height: 32, flexShrink: 0 }}>
                            <Image src="/assets/logo2.png" alt="Sundawa Teknologi" fill style={{ objectFit: 'contain', padding: 2 }} priority sizes="32px" />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.72rem', fontWeight: 900, letterSpacing: '0.25em', color: '#F8F8F8', lineHeight: 1 }}>
                                SUNDAWA
                            </div>
                            <div style={{ fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.4em', color: 'rgba(219,201,119,0.5)', textTransform: 'uppercase', marginTop: 1 }}>
                                Teknologi
                            </div>
                        </div>
                    </Link>
                </div>

                <span style={{
                    fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'rgba(248,248,248,0.3)',
                }} className="nav-title-hidden">
                    {t('navTitle')}
                </span>
            </nav>

            {/* ── Hero strip ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ position: 'relative', padding: '3rem 2rem 2rem', maxWidth: 1100, margin: '0 auto', overflow: 'hidden' }}
            >
                {/* Subtle mascot watermark, purely decorative */}
                <div className="process-mascot-watermark" style={{ position: 'absolute', right: '-1.5rem', top: '0.5rem', width: 220, opacity: 0.1, pointerEvents: 'none', userSelect: 'none' }}>
                    <Image src="/assets/mascot.png" alt="" width={600} height={600} style={{ width: '100%', height: 'auto' }} />
                </div>

                <div style={{
                    fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.3em',
                    textTransform: 'uppercase', color: '#DBC977', marginBottom: '0.75rem',
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}>
                    <span>— {t('label')}</span>
                    <div style={{ height: 1, width: 60, background: 'linear-gradient(to right, rgba(219,201,119,0.4), transparent)' }} />
                </div>
                <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '0.75rem' }}>
                    {t('heading1')}<br />
                    <span className="gold-gradient">{t('heading2')}</span>
                </h1>
                <p style={{ fontSize: '0.82rem', color: 'rgba(248,248,248,0.4)', fontWeight: 300, lineHeight: 1.8, maxWidth: 520 }}>
                    {t('sub')}
                </p>
            </motion.div>

            {/* ── Timeline steps ── */}
            <div ref={ref} style={{ maxWidth: 1100, margin: '0 auto', padding: '1rem 2rem 3rem' }}>
                <div className="process-timeline">
                    {steps.map((s, i) => {
                        const Icon = icons[i]
                        return (
                            <motion.div key={s.num}
                                        initial={{ opacity: 0, y: 24 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.08 + i * 0.07 }}
                                        onMouseEnter={() => setActive(i)}
                                        onMouseLeave={() => setActive(null)}
                                        style={{ position: 'relative', background: active === i ? 'rgba(29,52,81,0.6)' : '#0E1E30', border: `1px solid ${active === i ? 'rgba(219,201,119,0.45)' : 'rgba(219,201,119,0.12)'}`, padding: '1.75rem 1.5rem', transition: 'all 0.3s', overflow: 'hidden' }}>

                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right, #DBC977, rgba(219,201,119,0))', opacity: active === i ? 1 : 0, transition: 'opacity 0.3s' }} />
                                <div style={{ position: 'absolute', bottom: '0.5rem', right: '1rem', fontSize: '4.5rem', fontWeight: 900, lineHeight: 1, color: 'rgba(248,248,248,0.03)', userSelect: 'none', pointerEvents: 'none' }}>{s.num}</div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
                                    <div style={{ width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${active === i ? 'rgba(219,201,119,0.45)' : 'rgba(219,201,119,0.2)'}`, background: active === i ? 'rgba(219,201,119,0.12)' : 'rgba(219,201,119,0.05)', color: '#DBC977', transition: 'all 0.3s', flexShrink: 0 }}>
                                        <Icon size={17} />
                                    </div>
                                    <span style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.15em', color: `${active === i ? 'rgba(219,201,119,0.6)' : 'rgba(219,201,119,0.35)'}` }}>{s.num}</span>
                                </div>

                                <span style={{ display: 'inline-block', fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.2rem 0.65rem', border: `1px solid ${active === i ? 'rgba(219,201,119,0.4)' : 'rgba(219,201,119,0.15)'}`, color: active === i ? 'rgba(219,201,119,0.85)' : 'rgba(219,201,119,0.45)', marginBottom: '0.75rem', transition: 'all 0.3s' }}>
                                    {s.tag}
                                </span>

                                <h3 style={{ fontWeight: 700, fontSize: '0.92rem', color: active === i ? '#DBC977' : '#F8F8F8', letterSpacing: '0.02em', marginBottom: '0.6rem', transition: 'color 0.3s' }}>{s.title}</h3>
                                <p style={{ fontSize: '0.78rem', lineHeight: 1.75, fontWeight: 300, color: 'rgba(248,248,248,0.38)', marginBottom: '1rem' }}>{s.desc}</p>

                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {s.points?.map((p, pi) => (
                                        <li key={pi} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.72rem', fontWeight: 300, color: 'rgba(248,248,248,0.5)', lineHeight: 1.5 }}>
                                            <Check size={12} style={{ color: '#DBC977', marginTop: '0.15rem', flexShrink: 0 }} />
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* ── Info strip — pola persis Outsource.tsx ── */}
            <div style={{ background: 'rgba(29,52,81,0.3)', borderTop: '1px solid rgba(219,201,119,0.1)', padding: '2rem' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                    {infoItems.map(item => (
                        <div key={item.title}>
                            <div style={{ fontSize: '1.1rem', marginBottom: 6 }}>{item.icon}</div>
                            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#DBC977', marginBottom: 6, letterSpacing: '0.03em' }}>{item.title}</div>
                            <p style={{ fontSize: '0.7rem', color: 'rgba(248,248,248,0.35)', lineHeight: 1.7, fontWeight: 300 }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Contact CTA — pola persis Outsource.tsx ── */}
            <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.72rem', color: 'rgba(248,248,248,0.35)', marginBottom: '1rem' }}>
                    {t('contactCta')}
                </p>
                <Link
                    href="/#contact"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.15em',
                        textTransform: 'uppercase', color: '#DBC977',
                        padding: '0.6rem 1.5rem',
                        border: '1px solid rgba(219,201,119,0.35)',
                        background: 'rgba(219,201,119,0.06)',
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                    }}
                >
                    {t('contactButton')} <ArrowUpRight size={12} />
                </Link>
            </div>

            <style>{`
                .gold-gradient {
                    background: linear-gradient(135deg, #DBC977, #A66A2C, #DBC977);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .process-timeline {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1px;
                    background: rgba(219,201,119,0.1);
                    border: 1px solid rgba(219,201,119,0.1);
                }
                @media (min-width: 700px) {
                    .process-timeline { grid-template-columns: repeat(2, 1fr); }
                }
                @media (min-width: 1024px) {
                    .process-timeline { grid-template-columns: repeat(3, 1fr); }
                }
                @media (max-width: 480px) {
                    .nav-title-hidden { display: none !important; }
                    .process-mascot-watermark { display: none !important; }
                }
            `}</style>
        </main>
    )
}