"use client";

import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/src/i18n/navigation'
import LangToggle from './LangToggle'

export interface SubpageNavProps {
    backLabel: string
    titleLabel?: string
    backHref?: string
}

export default function SubpageNav({ backLabel, titleLabel, backHref = '/' }: SubpageNavProps) {
    return (
        <nav
            style={{
                borderBottom: '1px solid rgba(219,201,119,0.15)',
                padding: '1rem clamp(1rem, 4vw, 2rem)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                background: 'rgba(14,30,48,0.95)',
                backdropFilter: 'blur(20px)',
                position: 'sticky',
                top: 0,
                zIndex: 50,
            }}
        >
            <Link
                href={backHref}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(248,248,248,0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#DBC977')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(248,248,248,0.5)')}
            >
                <ArrowLeft size={14} />
                {backLabel}
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <LangToggle />
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
                    <div style={{ position: 'relative', width: 32, height: 32, flexShrink: 0 }}>
                        <Image
                            src="/assets/logo2.png"
                            alt="Sundawa Teknologi"
                            fill
                            style={{ objectFit: 'contain', padding: 2 }}
                            priority
                            sizes="32px"
                        />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 900, letterSpacing: '0.25em', color: '#F8F8F8', lineHeight: 1 }}>
                            SUNDAWA
                        </div>
                        <div style={{ fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.4em', color: 'rgba(219,201,119,0.5)', textTransform: 'uppercase', marginTop: 1 }}>
                            Teknologi
                        </div>
                    </div>
                </Link>
            </div>

            {titleLabel ? (
                <span
                    style={{
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(248,248,248,0.3)',
                    }}
                    className="nav-title-hidden"
                >
                    {titleLabel}
                </span>
            ) : null}
        </nav>
    )
}

