'use client'

import { Printer } from 'lucide-react'

export default function PrintBriefButton({ label }: { label: string }) {
    return (
        <button
            type="button"
            onClick={() => window.print()}
            className="print-hidden inline-flex min-h-[44px] cursor-pointer items-center gap-2 border border-cream/25 bg-navy/80 px-5 py-3 text-xs font-bold tracking-[0.15em] text-cream/90 uppercase transition-colors hover:border-gold/60 hover:text-gold"
        >
            <Printer size={14} aria-hidden="true" />
            <span>{label}</span>
        </button>
    )
}
