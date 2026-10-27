'use client'

import Image from 'next/image'
import { ArrowUpRight, ChevronDown, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import type { PortfolioProject } from '@/lib/types'

type ClientsGridProps = {
    clients: PortfolioProject[]
    inView: boolean
    activeIndex: number | null
    expanded: boolean
    hasMore: boolean
    showLessLabel: string
    showAllLabel: string
    viewProjectLabel: string
    confidentialLabel: string
    onHover: (index: number | null) => void
    onSelect: (index: number) => void
    onToggleExpanded: () => void
}

const IMAGE_HEIGHT = '8.5rem'
const IMAGE_PADDING = '1.0rem 1.5rem' // jarak kosong atas-bawah / kiri-kanan di sekitar gambar

export default function ClientsGrid({ clients, inView, activeIndex, expanded, hasMore, showLessLabel, showAllLabel, viewProjectLabel, confidentialLabel, onHover, onSelect, onToggleExpanded }: ClientsGridProps) {
    return (
        <div className="clients-right" style={{ alignSelf: 'start' }}>
            <div className="clients-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(219,201,119,0.1)', border: '1px solid rgba(219,201,119,0.1)' }}>
                {clients.map((client, index) => {
                    const active = activeIndex === index
                    return (
                        <motion.div
                            key={client.id || client.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.15 + index * 0.06 }}
                            onMouseEnter={() => onHover(index)}
                            onMouseLeave={() => onHover(null)}
                            onClick={() => onSelect(index)}
                            style={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                background: active ? 'rgba(29,52,81,0.6)' : '#0E1E30',
                                transition: 'background 0.3s',
                                overflow: 'hidden',
                                cursor: 'pointer',
                            }}
                        >
                            {/* Image (fixed height so every card is the same size) */}
                            <div style={{ position: 'relative', width: '100%', height: IMAGE_HEIGHT, flexShrink: 0, overflow: 'hidden' }}>
                                {client.main_image_url ? (
                                    <>
                                        {/* Blurred backdrop from the same image fills any empty space */}
                                        <Image
                                            src={client.main_image_url}
                                            alt=""
                                            aria-hidden
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            loading="lazy"
                                            style={{ filter: 'blur(18px)', transform: 'scale(1.2)', opacity: 0.45 }}
                                        />
                                        {/* Full image, never cropped, with breathing room on every side */}
                                        <div style={{ position: 'absolute', inset: IMAGE_PADDING }}>
                                            <Image
                                                src={client.main_image_url}
                                                alt={client.name}
                                                fill
                                                className="object-contain"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                loading="lazy"
                                                style={{ transform: active ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.5s' }}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(219,201,119,0.1) 0%, rgba(30,58,138,0.2) 60%, #0E1E30 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ width: '3.5rem', height: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(219,201,119,0.4)', background: 'rgba(219,201,119,0.1)', fontSize: '0.7rem', fontWeight: 800, color: '#DBC977' }}>{client.initials}</div>
                                    </div>
                                )}
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0E1E30, rgba(14,30,48,0.12), transparent)', pointerEvents: 'none' }} />

                                {/* Number + confidential on top of the image */}
                                <span style={{ position: 'absolute', top: '0.6rem', left: '0.75rem', fontSize: '0.65rem', fontWeight: 800, color: '#DBC977', textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>{client.num}</span>
                                {client.confidential && (
                                    <div style={{ position: 'absolute', top: '0.5rem', right: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.15rem 0.5rem', border: '1px solid rgba(219,201,119,0.3)', background: 'rgba(14,30,48,0.75)', fontSize: '0.52rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(219,201,119,0.8)' }}>
                                        <Lock size={9} />{confidentialLabel}
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', flex: 1, padding: '0.9rem 1.1rem 0.8rem' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right, #DBC977, rgba(219,201,119,0))', opacity: active ? 1 : 0, transition: 'opacity 0.3s' }} />

                                <div style={{ fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(45,125,210,0.85)', marginBottom: '0.35rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{client.type}</div>

                                <h3 style={{ fontWeight: 700, fontSize: '0.92rem', color: active ? '#DBC977' : '#F8F8F8', lineHeight: 1.3, marginBottom: '0.35rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'color 0.3s' }}>{client.name}</h3>

                                <p style={{ fontSize: '0.74rem', lineHeight: 1.6, minHeight: '2.37rem', fontWeight: 300, color: 'rgba(248,248,248,0.42)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: 0 }}>{client.desc}</p>

                                {/* Footer pushed to the bottom so all cards line up */}
                                <div style={{ marginTop: 'auto', paddingTop: '0.7rem', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button
                                        type="button"
                                        aria-label={`${viewProjectLabel}: ${client.name}`}
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: 0, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: active ? '#DBC977' : 'rgba(248,248,248,0.35)', transition: 'color 0.3s' }}
                                    >
                                        {viewProjectLabel}<ArrowUpRight size={12} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {hasMore && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                    <button
                        type="button"
                        onClick={onToggleExpanded}
                        aria-expanded={expanded}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.6rem', border: '1px solid rgba(219,201,119,0.35)', background: 'rgba(219,201,119,0.05)', color: '#DBC977', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}
                    >
                        {expanded ? showLessLabel : showAllLabel}
                        <ChevronDown size={14} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                    </button>
                </div>
            )}
        </div>
    )
}