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
            <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
                className="grid grid-cols-2 gap-[1px] bg-gold/12 border border-gold/12 mb-5">
                {stats.map(stat => (
                    <div key={stat.label} className="bg-navy p-4">
                        <div className="text-3xl font-black text-gold leading-none mb-1">{stat.num}</div>
                        <div className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-cream/35">{stat.label}</div>
                    </div>
                ))}
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
                className="flex items-center gap-2.5 py-3 px-4 border border-gold/15 bg-gold/[0.04]">
                <div className="w-[5px] h-[5px] rounded-full bg-gold flex-shrink-0" />
                <span className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-gold/60">{confidentialNotice}</span>
            </motion.div>
        </>
    )
}
