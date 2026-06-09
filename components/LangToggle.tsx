'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/src/i18n/navigation'
export default function LangToggle() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const toggle = () => {
        router.replace(pathname, { locale: locale === 'id' ? 'en' : 'id' })
    }

    return (
        <button
            onClick={toggle}
            style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                letterSpacing: '0.15em',
                color: '#DBC977',
                background: 'none',
                border: '1px solid rgba(219,201,119,0.3)',
                padding: '4px 10px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(219,201,119,0.7)'
                e.currentTarget.style.background = 'rgba(219,201,119,0.08)'
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(219,201,119,0.3)'
                e.currentTarget.style.background = 'none'
            }}
        >
            {locale === 'id' ? 'EN' : 'ID'}
        </button>
    )
}