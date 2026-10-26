import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/navigation'

export default function ContactCta() {
    const t = useTranslations('outsource')

    return (
        <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.72rem', color: 'rgba(248,248,248,0.35)', marginBottom: '1rem' }}>{t('contactCta')}</p>
            <Link href="/#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#DBC977', padding: '0.6rem 1.5rem', border: '1px solid rgba(219,201,119,0.35)', background: 'rgba(219,201,119,0.06)', textDecoration: 'none' }}>
                {t('contactButton')} <ArrowUpRight size={12} />
            </Link>
        </div>
    )
}
