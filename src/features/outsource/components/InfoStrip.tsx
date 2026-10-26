import { useTranslations } from 'next-intl'

export default function InfoStrip() {
    const t = useTranslations('outsource')
    const items = [
        { icon: 'Remote', title: t('infoTitleRemote'), desc: t('infoRemote') },
        { icon: 'Hybrid', title: t('infoTitleHybrid'), desc: t('infoHybrid') },
        { icon: 'Onsite', title: t('infoTitleOnsite'), desc: t('infoOnsite') },
        { icon: 'Note', title: t('infoTitleNote'), desc: t('infoNote') },
    ]

    return (
        <div style={{ background: 'rgba(29,52,81,0.3)', borderTop: '1px solid rgba(219,201,119,0.1)', padding: '2rem' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                {items.map(item => (
                    <div key={item.title}>
                        <div style={{ fontSize: '0.8rem', color: '#DBC977', marginBottom: 6, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item.icon}</div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#DBC977', marginBottom: 6 }}>{item.title}</div>
                        <p style={{ fontSize: '0.7rem', color: 'rgba(248,248,248,0.35)', lineHeight: 1.7, fontWeight: 300 }}>{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
