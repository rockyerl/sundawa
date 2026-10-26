'use client'

import { ArrowUpRight, ChevronDown, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Client } from '../clients'

type ClientsGridProps = {
    clients: Client[]
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

export default function ClientsGrid({ clients, inView, activeIndex, expanded, hasMore, showLessLabel, showAllLabel, viewProjectLabel, confidentialLabel, onHover, onSelect, onToggleExpanded }: ClientsGridProps) {
    return (
        <div className="clients-right" style={{ alignSelf: 'start' }}>
            <div className="clients-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(219,201,119,0.1)', border: '1px solid rgba(219,201,119,0.1)' }}>
                {clients.map((client, index) => {
                    const active = activeIndex === index
                    return <motion.div key={client.name} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 + index * 0.06 }} onMouseEnter={() => onHover(index)} onMouseLeave={() => onHover(null)} style={{ position: 'relative', background: active ? 'rgba(29,52,81,0.6)' : '#0E1E30', padding: '1.75rem 1.5rem', transition: 'background 0.3s', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right, #DBC977, rgba(219,201,119,0))', opacity: active ? 1 : 0 }} />
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', gap: '0.75rem' }}>
                            <div style={{ width: 44, height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${active ? 'rgba(219,201,119,0.5)' : 'rgba(219,201,119,0.2)'}`, background: active ? 'rgba(219,201,119,0.12)' : 'rgba(219,201,119,0.06)', fontSize: '0.65rem', fontWeight: 800, color: active ? '#DBC977' : 'rgba(219,201,119,0.7)' }}>{client.initials}</div>
                            {client.confidential && <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.2rem 0.6rem', border: '1px solid rgba(219,201,119,0.15)', fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(219,201,119,0.4)' }}><Lock size={10} />{confidentialLabel}</div>}
                        </div>
                        <div style={{ display: 'inline-flex', padding: '0.25rem 0.75rem', border: '1px solid rgba(45,125,210,0.25)', background: 'rgba(45,125,210,0.07)', marginBottom: '0.75rem', fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(45,125,210,0.8)' }}>{client.type}</div>
                        <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: active ? '#DBC977' : '#F8F8F8', lineHeight: 1.3, marginBottom: '0.5rem' }}>{client.name}</h3>
                        <p style={{ fontSize: '0.78rem', lineHeight: 1.7, fontWeight: 300, color: 'rgba(248,248,248,0.38)' }}>{client.desc}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(248,248,248,0.05)' }}><span style={{ fontSize: '0.6rem', fontWeight: 800, color: 'rgba(248,248,248,0.15)' }}>{client.num}</span><button type="button" onClick={() => onSelect(index)} aria-label={viewProjectLabel} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.7rem', border: `1px solid ${active ? 'rgba(219,201,119,0.4)' : 'rgba(248,248,248,0.08)'}`, color: active ? '#DBC977' : 'rgba(248,248,248,0.3)', background: 'transparent', cursor: 'pointer' }}>{viewProjectLabel}<ArrowUpRight size={12} /></button></div>
                    </motion.div>
                })}
            </div>
            {hasMore && <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}><button type="button" onClick={onToggleExpanded} aria-expanded={expanded} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.6rem', border: '1px solid rgba(219,201,119,0.35)', background: 'rgba(219,201,119,0.05)', color: '#DBC977', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{expanded ? showLessLabel : showAllLabel}<ChevronDown size={14} style={{ transform: expanded ? 'rotate(180deg)' : 'none' }} /></button></div>}
        </div>
    )
}
