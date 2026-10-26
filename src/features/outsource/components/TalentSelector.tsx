'use client'

import { ChevronDown, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { formatMillions, type Level, type Mode, type TalentEntry } from '../domain'

type TalentSelectorProps = {
    categories: string[]
    positions: string[]
    levels: Level[]
    category: string
    position: string
    level: Level | ''
    quantity: number
    mode: Mode
    activeEntry: TalentEntry | null
    previewPrice: number
    onCategoryChange: (value: string) => void
    onPositionChange: (value: string) => void
    onLevelChange: (value: Level | '') => void
    onQuantityChange: (value: number) => void
    onModeChange: (value: Mode) => void
    onAdd: () => void
}

const selectStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(29,52,81,0.7)', border: '1px solid rgba(219,201,119,0.2)',
    borderRadius: 8, color: '#F8F8F8', fontSize: '0.8rem', padding: '9px 36px 9px 12px',
    outline: 'none', fontFamily: 'inherit', appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer',
}

const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.6rem', fontWeight: 700, color: 'rgba(248,248,248,0.4)',
    marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.1em',
}

export default function TalentSelector({
    categories, positions, levels, category, position, level, quantity, mode, activeEntry, previewPrice,
    onCategoryChange, onPositionChange, onLevelChange, onQuantityChange, onModeChange, onAdd,
}: TalentSelectorProps) {
    const t = useTranslations('outsource')
    const modeStyle = (active: boolean): React.CSSProperties => ({
        flex: 1, padding: '8px 2px', border: `1px solid ${active ? 'rgba(219,201,119,0.5)' : 'rgba(219,201,119,0.15)'}`,
        background: active ? 'rgba(219,201,119,0.1)' : 'transparent', color: active ? '#DBC977' : 'rgba(248,248,248,0.4)',
        borderRadius: 7, fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
        textAlign: 'center', transition: 'all 0.15s', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0,
    })
    const select = (value: string, values: string[], disabled: boolean, onChange: (next: string) => void) => (
        <div style={{ position: 'relative' }}>
            <select style={{ ...selectStyle, opacity: disabled ? 0.5 : 1 }} value={value} onChange={event => onChange(event.target.value)} disabled={disabled}>
                <option value="">{t('selectCategory')}</option>
                {values.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(219,201,119,0.5)', pointerEvents: 'none' }} />
        </div>
    )

    return (
        <div style={{ padding: '1.75rem', borderRight: '1px solid rgba(219,201,119,0.12)' }}>
            <p style={{ ...labelStyle, marginBottom: '1.2rem', color: 'rgba(219,201,119,0.6)' }}>{t('addTitle')}</p>
            <div style={{ marginBottom: '0.9rem' }}><label style={labelStyle}>{t('labelCategory')}</label>{select(category, categories, false, onCategoryChange)}</div>
            <div style={{ marginBottom: '0.9rem' }}><label style={labelStyle}>{t('labelPosition')}</label>{select(position, positions, !category, onPositionChange)}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.9rem' }}>
                <div><label style={labelStyle}>{t('labelLevel')}</label>{select(level, levels, !position, value => onLevelChange(value as Level | ''))}</div>
                <div><label style={labelStyle}>{t('labelQty')}</label><input type="number" min={1} max={99} value={quantity} onChange={event => onQuantityChange(Math.max(1, Math.min(99, Number.parseInt(event.target.value, 10) || 1)))} style={{ ...selectStyle, textAlign: 'center', padding: '9px 12px' }} /></div>
            </div>
            <div style={{ marginBottom: '1.2rem' }}><label style={labelStyle}>{t('labelMode')}</label><div style={{ display: 'flex', gap: 6 }}>{(['remote', 'hybrid', 'onsite'] as Mode[]).map(item => <button key={item} type="button" style={modeStyle(mode === item)} onClick={() => onModeChange(item)}>{item === 'remote' ? 'Remote' : item === 'hybrid' ? 'Hybrid' : 'Onsite'}</button>)}</div></div>
            {activeEntry && <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'rgba(219,201,119,0.07)', border: '1px solid rgba(219,201,119,0.22)', borderRadius: 10, padding: '12px 14px', marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: '0.6rem', color: 'rgba(248,248,248,0.4)', textTransform: 'uppercase' }}>{t('pricePerPerson')}</span><strong style={{ fontSize: '1rem', color: '#DBC977' }}>{formatMillions(previewPrice * quantity)}</strong></motion.div>}
            <button type="button" onClick={onAdd} disabled={!activeEntry} style={{ width: '100%', background: activeEntry ? '#DBC977' : 'rgba(219,201,119,0.2)', color: activeEntry ? '#0E1E30' : 'rgba(248,248,248,0.3)', border: 'none', borderRadius: 8, padding: 11, fontSize: '0.75rem', fontWeight: 800, cursor: activeEntry ? 'pointer' : 'not-allowed', fontFamily: 'inherit', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><Plus size={15} />{t('addButton')}</button>
            <p style={{ fontSize: '0.62rem', color: 'rgba(248,248,248,0.2)', marginTop: '1rem', lineHeight: 1.7 }}>{t('priceNote')}</p>
        </div>
    )
}
