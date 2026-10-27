'use client'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { categories, techs } from '../techCatalog'
import TechIcon from './TechIcon'

export default function TechSection() {
    const t = useTranslations('tech')
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const [activeCategory, setActiveCategory] = useState('Backend')
    const [hoveredTech, setHoveredTech] = useState<number | null>(null)

    const activeCat = categories.find(c => c.name === activeCategory)!
    const filteredTechs = techs.filter(item => item.category === activeCategory)

    return (
        <section id="tech" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container-main">

                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}
                >
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#DBC977' }}>
                        — {t('label')}
                    </span>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(219,201,119,0.4), transparent)' }} />
                </motion.div>

                {/* Main layout */}
                <div className="tech-layout" style={{ marginBottom: '4rem' }}>

                    {/* ── Left — category selector ── */}
                    <div className="tech-left">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 }}
                            style={{ fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#F8F8F8', lineHeight: 1.1, marginBottom: '1rem' }}
                        >
                            {t('heading1')}<br />
                            <span className="gold-gradient">{t('heading2')}</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.2 }}
                            style={{ color: 'rgba(248,248,248,0.4)', fontWeight: 300, lineHeight: 1.8, fontSize: '0.85rem', marginBottom: '2.5rem' }}
                        >
                            {t('sub')}
                        </motion.p>

                        {/* Clickable category list */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 }}
                            className="tech-cats"
                            style={{
                                display: 'flex', flexDirection: 'column',
                                gap: '1px',
                                background: 'rgba(219,201,119,0.1)',
                                border: '1px solid rgba(219,201,119,0.1)',
                            }}
                        >
                            {categories.map((cat) => {
                                const isActive = cat.name === activeCategory
                                return (
                                    <button
                                        key={cat.name}
                                        className={`tech-cat-btn${isActive ? ' is-active' : ''}`}
                                        onClick={() => { setActiveCategory(cat.name); setHoveredTech(null) }}
                                        style={{
                                            background: isActive ? 'rgba(29,52,81,0.9)' : '#0E1E30',
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            padding: '0.85rem 1rem',
                                            transition: 'background 0.25s',
                                            cursor: 'pointer',
                                            border: 'none',
                                            borderLeft: isActive ? `2px solid ${cat.color}` : '2px solid transparent',
                                            width: '100%',
                                            textAlign: 'left',
                                        }}
                                        onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(29,52,81,0.5)' }}
                                        onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = '#0E1E30' }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <TechIcon item={cat} size={14} style={{ opacity: isActive ? 1 : 0.6 }} />
                                            <span style={{
                                                fontSize: '0.75rem', fontWeight: 700,
                                                letterSpacing: '0.08em', textTransform: 'uppercase',
                                                color: isActive ? '#F8F8F8' : 'rgba(248,248,248,0.5)',
                                                transition: 'color 0.2s',
                                            }}>
                                                {cat.name}
                                            </span>
                                        </div>
                                        <span style={{
                                            fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.15em',
                                            color: isActive ? cat.color : 'rgba(219,201,119,0.35)',
                                            background: isActive ? `${cat.color}15` : 'rgba(219,201,119,0.06)',
                                            border: `1px solid ${isActive ? cat.color + '40' : 'rgba(219,201,119,0.15)'}`,
                                            padding: '0.15rem 0.5rem',
                                            transition: 'all 0.2s',
                                        }}>
                                            {cat.count} Tech
                                        </span>
                                    </button>
                                )
                            })}
                        </motion.div>
                    </div>

                    {/* ── Right — filtered tech grid with AnimatePresence ── */}
                    <div className="tech-right" style={{ alignSelf: 'start' }}>

                        {/* Active category header */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.2 }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.75rem',
                                marginBottom: '1px',
                                padding: '0.75rem 1rem',
                                background: 'rgba(29,52,81,0.5)',
                                border: '1px solid rgba(219,201,119,0.1)',
                                borderBottom: 'none',
                            }}
                        >
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: activeCat.color, flexShrink: 0 }} />
                            <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: activeCat.color }}>
                                {activeCategory}
                            </span>
                            <span style={{ fontSize: '0.6rem', color: 'rgba(248,248,248,0.3)', marginLeft: 'auto' }}>
                                {filteredTechs.length} {t('technologies')}
                            </span>
                        </motion.div>

                        {/* Grid with AnimatePresence for smooth category switching */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                            gap: '1px',
                            background: 'rgba(219,201,119,0.1)',
                            border: '1px solid rgba(219,201,119,0.1)',
                            minHeight: '200px',
                        }}
                             className="tech-grid-inner"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeCategory}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        display: 'contents',
                                    }}
                                >
                                    {filteredTechs.map((t, i) => (
                                        <motion.div
                                            key={t.name}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.06, duration: 0.25 }}
                                            onMouseEnter={() => setHoveredTech(i)}
                                            onMouseLeave={() => setHoveredTech(null)}
                                            style={{
                                                position: 'relative',
                                                background: hoveredTech === i ? 'rgba(29,52,81,0.7)' : '#0E1E30',
                                                padding: '1.5rem 1.25rem',
                                                cursor: 'default',
                                                transition: 'background 0.25s',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {/* Top accent bar */}
                                            <div style={{
                                                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                                                background: t.color,
                                                opacity: hoveredTech === i ? 1 : 0,
                                                transition: 'opacity 0.25s',
                                            }} />

                                            {/* Icon */}
                                            <div style={{ marginBottom: '1rem' }}>
                                                <TechIcon
                                                    item={t}
                                                    size={28}
                                                    style={{
                                                        opacity: hoveredTech === i ? 1 : 0.55,
                                                        transition: 'opacity 0.25s, transform 0.3s',
                                                        transform: hoveredTech === i ? 'scale(1.15)' : 'scale(1)',
                                                    }}
                                                />
                                            </div>

                                            <div style={{
                                                fontSize: '0.82rem', fontWeight: 700,
                                                color: hoveredTech === i ? '#F8F8F8' : 'rgba(248,248,248,0.65)',
                                                letterSpacing: '0.04em',
                                                transition: 'color 0.25s',
                                            }}>
                                                {t.name}
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .tech-layout {
                    display: flex;
                    flex-direction: column;
                    gap: 3rem;
                }
                .tech-left { width: 100%; min-width: 0; }
                .tech-right { min-width: 0; }
                @media (max-width: 1023px) {
                    .tech-cats { flex-direction: row !important; overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
                    .tech-cats::-webkit-scrollbar { display: none; }
                    .tech-cat-btn { flex: 0 0 auto; width: auto !important; gap: 0.75rem; border-left: none !important; border-bottom: 2px solid transparent !important; }
                    .tech-cat-btn.is-active { border-bottom-color: #DBC977 !important; }
                    .tech-cat-btn span, .tech-cat-btn div { white-space: nowrap; }
                }
                .tech-right { width: 100%; }

                @media (min-width: 1024px) {
                    .tech-layout {
                        display: grid !important;
                        grid-template-columns: 280px 1fr !important;
                        gap: 5rem !important;
                        align-items: start !important;
                    }
                }

                @media (max-width: 640px) { .tech-grid-inner { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
            `}</style>
        </section>
    )
}