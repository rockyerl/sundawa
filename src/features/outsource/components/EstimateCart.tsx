'use client'

import { MessageCircle, Trash2, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { formatFullPrice, formatMillions, type CartItem } from '../domain'
import ModeBadge from './ModeBadge'

type EstimateCartProps = {
    cart: CartItem[]
    totalCount: number
    totalPrice: number
    onRemove: (id: number) => void
    onClear: () => void
    buildMessage: () => string
}

export default function EstimateCart({ cart, totalCount, totalPrice, onRemove, onClear, buildMessage }: EstimateCartProps) {
    const t = useTranslations('outsource')
    return (
        <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', minHeight: 480 }}>
            <p style={{ marginBottom: '1.2rem', color: 'rgba(219,201,119,0.6)', fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('summaryTitle')}</p>
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', maxHeight: 320 }}>
                {cart.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2.25rem 1rem', color: 'rgba(248,248,248,0.2)' }}>
                        <div style={{ position: 'relative', width: 72, height: 72, margin: '0 auto 10px', opacity: 0.45 }}><Image src="/assets/mascot.png" alt="" fill className="object-contain" sizes="72px" /></div>
                        <p style={{ fontSize: '0.78rem' }}>{t('emptyCart')}</p>
                    </div>
                ) : cart.map(item => (
                    <motion.div key={item.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} style={{ background: 'rgba(29,52,81,0.5)', border: '1px solid rgba(219,201,119,0.1)', borderRadius: 10, padding: '10px 12px', marginBottom: 8, display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'start', gap: 8 }}>
                        <div><div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#F8F8F8', marginBottom: 4 }}>{item.qty}x {item.pos}</div><div style={{ fontSize: '0.65rem', color: 'rgba(248,248,248,0.4)', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}><ModeBadge mode={item.mode} /><span>{item.level} - {item.city === 'bandung' ? 'Bandung' : 'Jakarta'}</span></div></div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}><div style={{ textAlign: 'right' }}><div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#DBC977', whiteSpace: 'nowrap' }}>{formatMillions(item.sell20 * item.qty)}</div><div style={{ fontSize: '0.6rem', color: 'rgba(219,201,119,0.5)' }}>{formatMillions(item.sell20)}/org</div></div><button type="button" onClick={() => onRemove(item.id)} aria-label="Remove talent" style={{ background: 'none', border: 'none', color: 'rgba(248,248,248,0.25)', cursor: 'pointer', padding: 2, lineHeight: 1, marginTop: 2 }}><X size={13} /></button></div>
                    </motion.div>
                ))}
            </div>
            <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(219,201,119,0.18)', borderRadius: 10, padding: '14px 16px', marginBottom: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'rgba(248,248,248,0.5)', padding: '3px 0' }}><span>{t('totalTalent')}</span><span>{totalCount} orang</span></div>
                <div style={{ borderTop: '1px solid rgba(219,201,119,0.18)', marginTop: 8, paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 800, color: '#DBC977' }}><span>{t('totalPerMonth')}</span><span>{formatFullPrice(totalPrice)}</span></div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
                <a href={cart.length > 0 ? `https://wa.me/6287893355332?text=${encodeURIComponent(buildMessage())}` : '#'} target="_blank" rel="noopener noreferrer" aria-disabled={cart.length === 0} style={{ flex: 1, background: cart.length > 0 ? '#25D366' : 'rgba(37,211,102,0.2)', color: cart.length > 0 ? 'white' : 'rgba(255,255,255,0.3)', borderRadius: 8, padding: 10, fontSize: '0.72rem', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, pointerEvents: cart.length > 0 ? 'auto' : 'none' }}><MessageCircle size={14} />{t('waButton')}</a>
                {cart.length > 0 && <button type="button" onClick={onClear} style={{ background: 'rgba(226,75,74,0.12)', color: '#E24B4A', border: '1px solid rgba(226,75,74,0.25)', borderRadius: 8, padding: '10px 12px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}><Trash2 size={13} />{t('reset')}</button>}
            </div>
        </div>
    )
}
