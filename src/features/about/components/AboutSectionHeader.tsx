import type { ReactNode } from 'react'

interface AboutSectionHeaderProps {
    label: string
    heading?: string
    action?: ReactNode
}

export default function AboutSectionHeader({ label, heading, action }: AboutSectionHeaderProps) {
    return (
        <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
                <div className="w-5 h-[2px] bg-gold" />
                <span className="text-[0.65rem] font-extrabold tracking-[0.25em] text-gold uppercase">
                    {label}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                {action}
            </div>
            {heading ? (
                <h2 className="max-w-3xl text-2xl leading-tight font-black text-cream sm:text-3xl">
                    {heading}
                </h2>
            ) : null}
        </div>
    )
}
