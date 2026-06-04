'use client'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

// Inline SVG for icons not on Simple Icons
const SVG_HARDHAT = `<svg viewBox="0 0 24 24" fill="#FFF100" xmlns="http://www.w3.org/2000/svg"><path d="M12 1C8 1 4.5 4 4.5 8v.5C3 9 2 10.1 2 11.5V13h20v-1.5C22 10.1 21 9 19.5 8.5V8C19.5 4 16 1 12 1zm0 2c3 0 5.5 2.2 5.5 5H6.5C6.5 5.2 9 3 12 3zM2 14v1c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-1H2z"/></svg>`
const SVG_OPENZEPPELIN = `<svg viewBox="0 0 24 24" fill="#4E5EE4" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7v5c0 5.25 4.25 10.15 10 11.35C17.75 22.15 22 17.25 22 12V7L12 2zm0 2.18l8 4.07V12c0 4.34-3.46 8.48-8 9.71C7.46 20.48 4 16.34 4 12V8.25l8-4.07zM11 7v6l5.25 3.15.75-1.23-4.5-2.67V7H11z"/></svg>`

type Tech = {
    name: string
    color: string
    category: string
    icon?: string
    svgIcon?: string
}

type Category = {
    name: string
    color: string
    count: number
    icon?: string
    svgIcon?: string
}

const techs: Tech[] = [
    { name: 'Laravel',        color: '#FF2D20', category: 'Backend',  icon: 'https://cdn.simpleicons.org/laravel/FF2D20'        },
    { name: 'Node.js',        color: '#539E43', category: 'Backend',  icon: 'https://cdn.simpleicons.org/nodedotjs/539E43'      },
    { name: 'Go',             color: '#00ADD8', category: 'Backend',  icon: 'https://cdn.simpleicons.org/go/00ADD8'             },
    { name: '.NET',           color: '#512BD4', category: 'Backend',  icon: 'https://cdn.simpleicons.org/dotnet/512BD4'         },
    { name: 'Flutter',        color: '#54C5F8', category: 'Mobile',   icon: 'https://cdn.simpleicons.org/flutter/54C5F8'       },
    { name: 'Kotlin',         color: '#7F52FF', category: 'Mobile',   icon: 'https://cdn.simpleicons.org/kotlin/7F52FF'        },
    { name: 'Next.js',        color: '#F8F8F8', category: 'Frontend', icon: 'https://cdn.simpleicons.org/nextdotjs/F8F8F8'     },
    { name: 'React',          color: '#61DAFB', category: 'Frontend', icon: 'https://cdn.simpleicons.org/react/61DAFB'         },
    { name: 'TypeScript',     color: '#3178C6', category: 'Frontend', icon: 'https://cdn.simpleicons.org/typescript/3178C6'    },
    { name: 'MySQL',          color: '#4479A1', category: 'Database', icon: 'https://cdn.simpleicons.org/mysql/4479A1'         },
    { name: 'PostgreSQL',     color: '#336791', category: 'Database', icon: 'https://cdn.simpleicons.org/postgresql/336791'    },
    { name: 'Redis',          color: '#DC382D', category: 'Database', icon: 'https://cdn.simpleicons.org/redis/DC382D'         },
    { name: 'Docker',         color: '#2496ED', category: 'DevOps',   icon: 'https://cdn.simpleicons.org/docker/2496ED'        },
    { name: 'NGINX',          color: '#009639', category: 'DevOps',   icon: 'https://cdn.simpleicons.org/nginx/009639'         },
    { name: 'GitHub Actions', color: '#2088FF', category: 'DevOps',   icon: 'https://cdn.simpleicons.org/githubactions/2088FF' },
    { name: 'Solidity',       color: '#A0A0A0', category: 'Web3',     icon: 'https://cdn.simpleicons.org/solidity/A0A0A0'      },
    { name: 'Ethereum',       color: '#627EEA', category: 'Web3',     icon: 'https://cdn.simpleicons.org/ethereum/627EEA'      },
    { name: 'Web3.js',        color: '#F16822', category: 'Web3',     icon: 'https://cdn.simpleicons.org/web3dotjs/F16822'     },
    { name: 'Hardhat',        color: '#FFF100', category: 'Web3',     svgIcon: SVG_HARDHAT                                     },
    { name: 'OpenZeppelin',   color: '#4E5EE4', category: 'Web3',     svgIcon: SVG_OPENZEPPELIN                                },
]

const categories: Category[] = [
    { name: 'Backend',  color: '#FF2D20', count: 4, icon: 'https://cdn.simpleicons.org/serverless/FF2D20' },
    { name: 'Mobile',   color: '#54C5F8', count: 2, icon: 'https://cdn.simpleicons.org/android/54C5F8'   },
    { name: 'Frontend', color: '#61DAFB', count: 3, icon: 'https://cdn.simpleicons.org/html5/61DAFB'      },
    { name: 'Database', color: '#4479A1', count: 3, icon: 'https://cdn.simpleicons.org/databricks/4479A1' },
    { name: 'DevOps',   color: '#009639', count: 3, icon: 'https://cdn.simpleicons.org/kubernetes/009639' },
    { name: 'Web3',     color: '#627EEA', count: 5, icon: 'https://cdn.simpleicons.org/ethereum/627EEA'   },
]

function TechIcon({ item, size, style }: { item: Tech | Category; size: number; style?: React.CSSProperties }) {
    if (item.svgIcon) {
        return (
            <span
                style={{ display: 'inline-block', width: size, height: size, flexShrink: 0, ...style }}
                dangerouslySetInnerHTML={{ __html: item.svgIcon }}
            />
        )
    }
    return (
        <img
            src={item.icon}
            alt={item.name}
            width={size}
            height={size}
            style={{ display: 'block', flexShrink: 0, ...style }}
        />
    )
}

export default function TechSection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const [activeCategory, setActiveCategory] = useState('Backend')
    const [hoveredTech, setHoveredTech] = useState<number | null>(null)

    const activeCat = categories.find(c => c.name === activeCategory)!
    const filteredTechs = techs.filter(t => t.category === activeCategory)

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
                        — Technology
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
                            Teknologi<br />
                            <span className="gold-gradient">Yang Kami Gunakan</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.2 }}
                            style={{ color: 'rgba(248,248,248,0.4)', fontWeight: 300, lineHeight: 1.8, fontSize: '0.85rem', marginBottom: '2.5rem' }}
                        >
                            Stack teknologi modern yang kami kuasai untuk menghadirkan solusi terbaik di setiap proyek.
                        </motion.p>

                        {/* Clickable category list */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 }}
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
                                {filteredTechs.length} technologies
                            </span>
                        </motion.div>

                        {/* Grid with AnimatePresence for smooth category switching */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
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
                .tech-left { width: 100%; }
                .tech-right { width: 100%; }

                @media (min-width: 1024px) {
                    .tech-layout {
                        display: grid !important;
                        grid-template-columns: 280px 1fr !important;
                        gap: 5rem !important;
                        align-items: start !important;
                    }
                }

                @media (max-width: 480px) {
                    .tech-grid-inner {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
            `}</style>
        </section>
    )
}