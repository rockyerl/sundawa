import { motion } from 'framer-motion'
import type { ClientStat } from '../clients'

type ClientsStatsProps = {
    stats: ClientStat[]
    confidentialNotice: string
    inView: boolean
}

export default function ClientsStats({ stats, confidentialNotice, inView }: ClientsStatsProps) {
    return (
        <>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(219,201,119,0.12)', border: '1px solid rgba(219,201,119,0.12)', marginBottom: '1.25rem' }}>
                {stats.map(stat => <div key={stat.label} style={{ background: '#0E1E30', padding: '1.1rem 1rem' }}><div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#DBC977', lineHeight: 1, marginBottom: '0.25rem' }}>{stat.num}</div><div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(248,248,248,0.35)' }}>{stat.label}</div></div>)}
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem 1rem', border: '1px solid rgba(219,201,119,0.15)', background: 'rgba(219,201,119,0.04)' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#DBC977', flexShrink: 0 }} />
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(219,201,119,0.6)' }}>{confidentialNotice}</span>
            </motion.div>
        </>
    )
}
