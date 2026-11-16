"use client";

import { ArrowLeft } from 'lucide-react'
import { Link } from '@/src/i18n/navigation'

export interface SubpageNavProps {
    backLabel: string
    titleLabel?: string
    backHref?: string
}

export default function SubpageNav({ backLabel, titleLabel, backHref = '/' }: SubpageNavProps) {
    return (
        <div className="pt-[76px]">
            <nav
                aria-label="Breadcrumb"
                className="border-b border-gold/15 bg-navy/95 backdrop-blur-md"
            >
                <div className="container-main flex items-center justify-between gap-4 py-3.5">
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-cream/55 uppercase no-underline transition-colors duration-200 hover:text-gold"
                    >
                        <ArrowLeft size={14} aria-hidden="true" />
                        <span>{backLabel}</span>
                    </Link>

                    {titleLabel ? (
                        <span className="border border-gold/20 bg-gold/[0.05] px-2.5 py-0.5 text-[0.6rem] font-extrabold tracking-[0.2em] text-gold/80 uppercase">
                            {titleLabel}
                        </span>
                    ) : null}
                </div>
            </nav>
        </div>
    )
}
