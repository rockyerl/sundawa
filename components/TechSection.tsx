'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const techs = [
    // Backend
    { name: 'Laravel',        color: '#FF2D20', category: 'Backend',  icon: 'https://cdn.simpleicons.org/laravel/FF2D20'  },
    { name: 'Node.js',        color: '#539E43', category: 'Backend',  icon: 'https://cdn.simpleicons.org/nodedotjs/539E43' },
    { name: 'Go',             color: '#00ADD8', category: 'Backend',  icon: 'https://cdn.simpleicons.org/go/00ADD8'        },
    { name: '.NET',           color: '#512BD4', category: 'Backend',  icon: 'https://cdn.simpleicons.org/dotnet/512BD4'    },
    // Mobile
    { name: 'Flutter',        color: '#54C5F8', category: 'Mobile',   icon: 'https://cdn.simpleicons.org/flutter/54C5F8'  },
    { name: 'Kotlin',         color: '#7F52FF', category: 'Mobile',   icon: 'https://cdn.simpleicons.org/kotlin/7F52FF'   },
    // Frontend
    { name: 'Next.js',        color: '#F8F8F8', category: 'Frontend', icon: 'https://cdn.simpleicons.org/nextdotjs/F8F8F8' },
    { name: 'React',          color: '#61DAFB', category: 'Frontend', icon: 'https://cdn.simpleicons.org/react/61DAFB'     },
    { name: 'TypeScript',     color: '#3178C6', category: 'Frontend', icon: 'https://cdn.simpleicons.org/typescript/3178C6'},
    // Database
    { name: 'MySQL',          color: '#4479A1', category: 'Database', icon: 'https://cdn.simpleicons.org/mysql/4479A1'    },
    { name: 'PostgreSQL',     color: '#336791', category: 'Database', icon: 'https://cdn.simpleicons.org/postgresql/336791'},
    { name: 'Redis',          color: '#DC382D', category: 'Database', icon: 'https://cdn.simpleicons.org/redis/DC382D'    },
    // DevOps
    { name: 'Docker',         color: '#2496ED', category: 'DevOps',   icon: 'https://cdn.simpleicons.org/docker/2496ED'        },
    { name: 'NGINX',          color: '#009639', category: 'DevOps',   icon: 'https://cdn.simpleicons.org/nginx/009639'          },
    { name: 'GitHub Actions', color: '#2088FF', category: 'DevOps',   icon: 'https://cdn.simpleicons.org/githubactions/2088FF'  },
]

const categories = [
    { name: 'Backend',  color: '#FF2D20', count: 4, icon: 'https://cdn.simpleicons.org/serverless/FF2D20' },
    { name: 'Mobile',   color: '#54C5F8', count: 2, icon: 'https://cdn.simpleicons.org/android/54C5F8'   },
    { name: 'Frontend', color: '#61DAFB', count: 3, icon: 'https://cdn.simpleicons.org/html5/61DAFB'      },
    { name: 'Database', color: '#4479A1', count: 3, icon: 'https://cdn.simpleicons.org/databricks/4479A1' },
    { name: 'DevOps',   color: '#009639', count: 3, icon: 'https://cdn.simpleicons.org/kubernetes/009639' },
]

export default function TechSection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const [active, setActive] = useState<number | null>(null)

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

                    {/* Left */}
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

                        {/* Category list */}
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
                            {categories.map((cat) => (
                                <div
                                    key={cat.name}
                                    style={{
                                        background: '#0E1E30',
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '0.85rem 1rem',
                                        transition: 'background 0.25s',
                                        cursor: 'default',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(29,52,81,0.7)'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#0E1E30'}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        {/* Icon replacing the dot */}
                                        <img
                                            src={cat.icon}
                                            alt={cat.name}
                                            width={14}
                                            height={14}
                                            style={{ flexShrink: 0, opacity: 0.85 }}
                                        />
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(248,248,248,0.7)' }}>
                                            {cat.name}
                                        </span>
                                    </div>
                                    <span style={{
                                        fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.15em',
                                        color: 'rgba(219,201,119,0.5)',
                                        background: 'rgba(219,201,119,0.06)',
                                        border: '1px solid rgba(219,201,119,0.15)',
                                        padding: '0.15rem 0.5rem',
                                    }}>
                                        {cat.count} Tech
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right — tech grid */}
                    <motion.div
                        className="tech-right"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '1px',
                            background: 'rgba(219,201,119,0.1)',
                            border: '1px solid rgba(219,201,119,0.1)',
                            alignSelf: 'start',
                        }}
                    >
                        {techs.map((t, i) => (
                            <motion.div
                                key={t.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.15 + i * 0.04 }}
                                onMouseEnter={() => setActive(i)}
                                onMouseLeave={() => setActive(null)}
                                style={{
                                    position: 'relative',
                                    background: active === i ? 'rgba(29,52,81,0.7)' : '#0E1E30',
                                    padding: '1.25rem 1rem',
                                    cursor: 'default',
                                    transition: 'background 0.25s',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Top color bar on hover */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                                    background: t.color,
                                    opacity: active === i ? 1 : 0,
                                    transition: 'opacity 0.25s',
                                }} />

                                {/* Tech icon replacing the dot */}
                                <div style={{ marginBottom: '0.75rem' }}>
                                    <img
                                        src={t.icon}
                                        alt={t.name}
                                        width={22}
                                        height={22}
                                        style={{
                                            display: 'block',
                                            opacity: active === i ? 1 : 0.55,
                                            transition: 'opacity 0.25s, transform 0.3s',
                                            transform: active === i ? 'scale(1.15)' : 'scale(1)',
                                        }}
                                    />
                                </div>

                                <div style={{
                                    fontSize: '0.78rem', fontWeight: 700,
                                    color: active === i ? '#F8F8F8' : 'rgba(248,248,248,0.65)',
                                    letterSpacing: '0.05em',
                                    marginBottom: '0.25rem',
                                    transition: 'color 0.25s',
                                }}>
                                    {t.name}
                                </div>
                                <div style={{
                                    fontSize: '0.58rem', fontWeight: 600,
                                    letterSpacing: '0.12em', textTransform: 'uppercase',
                                    color: active === i ? 'rgba(219,201,119,0.5)' : 'rgba(248,248,248,0.22)',
                                    transition: 'color 0.25s',
                                }}>
                                    {t.category}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
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
                    .tech-right {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
            `}</style>
        </section>
    )
}