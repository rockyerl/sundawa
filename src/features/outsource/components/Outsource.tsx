"use client";

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SubpageNav } from '@/src/shared/ui'
import {
    buildWhatsAppMessage,
    calculateCartTotals,
    getSellPrice,
    LEVEL_ORDER,
    type CartItem,
    type City,
    type Level,
    type Mode,
} from '../domain'
import { PRICING } from '../data'
import TalentSelector from './TalentSelector'
import EstimateCart from './EstimateCart'
import InfoStrip from './InfoStrip'
import ContactCta from './ContactCta'

export default function OutsourcePage() {
    const t = useTranslations('outsource')

    const [city,   setCity]   = useState<City>('bandung')
    const margin = 20 as const
    const [mode,   setMode]   = useState<Mode>('remote')
    const [cat,    setCat]    = useState('')
    const [pos,    setPos]    = useState('')
    const [level,  setLevel]  = useState<Level | ''>('')
    const [qty,    setQty]    = useState(1)
    const [cart,   setCart]   = useState<CartItem[]>([])
    const [idSeq,  setIdSeq]  = useState(0)

    const data       = PRICING[city]
    const categories = [...new Set(data.map(d => d.cat))]
    const positions  = cat ? [...new Set(data.filter(d => d.cat === cat).map(d => d.pos))] : []
    const levels     = (cat && pos)
        ? [...new Set(data.filter(d => d.cat === cat && d.pos === pos).map(d => d.level))]
            .sort((a, b) => LEVEL_ORDER.indexOf(a) - LEVEL_ORDER.indexOf(b))
        : []

    const activeEntry = (cat && pos && level)
        ? data.find(d => d.cat === cat && d.pos === pos && d.level === level) ?? null
        : null

    const previewSell = activeEntry ? getSellPrice(activeEntry, mode) : 0

    const handleCityChange = (c: City) => {
        setCity(c)
        setCat(''); setPos(''); setLevel('')
    }

    const handleCatChange = (c: string) => {
        setCat(c); setPos(''); setLevel('')
    }

    const handlePosChange = (p: string) => {
        setPos(p); setLevel('')
    }

    const addTalent = () => {
        if (!activeEntry || !level) return
        const sellPrice = getSellPrice(activeEntry, mode)
        setCart(prev => [...prev, {
            id:     idSeq,
            city,
            pos:    activeEntry.pos,
            level:  activeEntry.level,
            cat:    activeEntry.cat,
            mode,
            qty,
            sell20:  sellPrice,
            sell25:  sellPrice,
            feeAvg: Math.round((activeEntry.hybridMin + activeEntry.hybridMax) / 2),
        }])
        setIdSeq(s => s + 1)
    }

    const removeItem = (id: number) => setCart(prev => prev.filter(i => i.id !== id))

    const { totalCount, totalPrice } = calculateCartTotals(cart)

    const handleBuildWAMessage = () => {
        return buildWhatsAppMessage(
            cart,
            {
                waButton: t('waButton'),
                summaryTitle: t('summaryTitle'),
                totalTalent: t('totalTalent'),
            },
            margin
        )
    }

    const tabBtnStyle = (active: boolean): React.CSSProperties => ({
        padding: '6px 18px',
        borderRadius: 6,
        fontSize: '0.7rem',
        fontWeight: 700,
        cursor: 'pointer',
        border: 'none',
        background: active ? '#DBC977' : 'transparent',
        color: active ? '#0E1E30' : 'rgba(248,248,248,0.45)',
        transition: 'all 0.18s',
        letterSpacing: '0.03em',
        fontFamily: 'inherit',
    })

    return (
        <main style={{ background: '#0E1E30', minHeight: '100vh', color: '#F8F8F8' }}>
            <SubpageNav backLabel={t('navBack')} titleLabel={t('navTitle')} />

            {/* ── Hero strip ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ padding: '3rem 2rem 2rem', maxWidth: 1100, margin: '0 auto' }}
            >
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

            {/* ── Calculator container ── */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 4rem' }}
            >
                <div style={{ border: '1px solid rgba(219,201,119,0.2)', borderRadius: 16, overflow: 'hidden' }}>

                    {/* ── Calculator header ── */}
                    <div style={{
                        background: 'rgba(29,52,81,0.5)',
                        borderBottom: '1px solid rgba(219,201,119,0.2)',
                        padding: '1.2rem 1.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1rem',
                    }}>
                        <div style={{ display: 'flex', gap: 4, background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: 4 }}>
                            {(['bandung', 'jakarta'] as City[]).map(c => (
                                <button key={c} style={tabBtnStyle(city === c)} onClick={() => handleCityChange(c)}>
                                    {c.charAt(0).toUpperCase() + c.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Calculator body ── */}
                    <div className="calc-body-grid">
                        <TalentSelector
                            categories={categories}
                            positions={positions}
                            levels={levels}
                            category={cat}
                            position={pos}
                            level={level}
                            quantity={qty}
                            mode={mode}
                            activeEntry={activeEntry}
                            previewPrice={previewSell}
                            onCategoryChange={handleCatChange}
                            onPositionChange={handlePosChange}
                            onLevelChange={setLevel}
                            onQuantityChange={setQty}
                            onModeChange={setMode}
                            onAdd={addTalent}
                        />

                        <EstimateCart
                            cart={cart}
                            totalCount={totalCount}
                            totalPrice={totalPrice}
                            onRemove={removeItem}
                            onClear={() => setCart([])}
                            buildMessage={handleBuildWAMessage}
                        />
                    </div>
                </div>
            </motion.div>

            <InfoStrip />
            <ContactCta />

            <style>{`
                .gold-gradient {
                    background: linear-gradient(135deg, #DBC977, #A66A2C, #DBC977);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .calc-body-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                }
                @media (min-width: 768px) {
                    .calc-body-grid {
                        grid-template-columns: 1.2fr 0.8fr;
                    }
                }
                @media (max-width: 480px) {
                    .nav-title-hidden { display: none !important; }
                }
                select option {
                    background: #1D3451;
                    color: #F8F8F8;
                }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(219,201,119,0.3); border-radius: 2px; }
            `}</style>
        </main>
    )
}
