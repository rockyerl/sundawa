'use client'

import { Lock, X } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Client } from '../clients'

type DetailSection = {
    key: string
    label: string
    text: string
}

type ClientProjectDialogProps = {
    client: Client
    details: DetailSection[]
    confidentialLabel: string
    closeLabel: string
    onClose: () => void
}

export default function ClientProjectDialog({ client, details, confidentialLabel, closeLabel, onClose }: ClientProjectDialogProps) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(6,13,22,0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1.5rem' }}>
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.97 }} transition={{ duration: 0.25, ease: 'easeOut' }} onClick={event => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="client-dialog-title" style={{ position: 'relative', width: '100%', maxWidth: 580, maxHeight: '88dvh', overflowY: 'auto', background: '#0E1E30', border: '1px solid rgba(219,201,119,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', padding: 'clamp(1.25rem, 5vw, 2rem)' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right, #DBC977, rgba(219,201,119,0))' }} />
                <button type="button" onClick={onClose} aria-label={closeLabel} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', width: 36, height: 36, border: '1px solid rgba(248,248,248,0.1)', background: 'transparent', color: 'rgba(248,248,248,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={14} /></button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingRight: '2.25rem' }}>
                    <div style={{ width: 52, height: 52, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(219,201,119,0.4)', background: 'rgba(219,201,119,0.1)', fontSize: '0.75rem', fontWeight: 800, color: '#DBC977' }}>{client.initials}</div>
                    <div><div style={{ display: 'inline-flex', padding: '0.2rem 0.65rem', border: '1px solid rgba(45,125,210,0.25)', background: 'rgba(45,125,210,0.07)', marginBottom: '0.4rem', fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(45,125,210,0.8)' }}>{client.type}</div><h3 id="client-dialog-title" style={{ fontWeight: 700, fontSize: '1.1rem', color: '#F8F8F8' }}>{client.name}</h3></div>
                </div>
                {client.confidential && <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.2rem 0.6rem', border: '1px solid rgba(219,201,119,0.15)', marginBottom: '1rem', fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(219,201,119,0.4)' }}><Lock size={10} />{confidentialLabel}</div>}
                <p style={{ fontSize: '0.85rem', lineHeight: 1.8, fontWeight: 300, color: 'rgba(248,248,248,0.55)', marginBottom: '1.5rem' }}>{client.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginBottom: '1.5rem' }}>{details.map(detail => <div key={detail.key} style={{ paddingLeft: '0.9rem', borderLeft: '2px solid rgba(219,201,119,0.25)' }}><div style={{ fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#DBC977', marginBottom: '0.35rem' }}>{detail.label}</div><p style={{ fontSize: '0.8rem', lineHeight: 1.75, fontWeight: 300, color: 'rgba(248,248,248,0.55)', margin: 0 }}>{detail.text}</p></div>)}</div>
                <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(248,248,248,0.05)', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(248,248,248,0.25)' }}>{client.num}</div>
            </motion.div>
        </motion.div>
    )
}
