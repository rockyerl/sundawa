'use client'

import Image from 'next/image'
import { Quote } from 'lucide-react'
import { LEADERSHIP_TEAM } from '../team'
import AboutSectionHeader from './AboutSectionHeader'

interface CeoGreetingSpreadProps {
    label: string
    stoicQuote: {
        tag: string
        quote: string
        author: string
        bridge: string
    }
    paragraphs: string[]
    authorName: string
    authorRole: string
}

export default function CeoGreetingSpread({
    label,
    stoicQuote,
    paragraphs,
    authorName,
    authorRole,
}: CeoGreetingSpreadProps) {
    const ceoSpec = LEADERSHIP_TEAM.find((leader) => leader.isCeo) ?? LEADERSHIP_TEAM[0]

    return (
        <div className="mb-20">
            <AboutSectionHeader label={label} />

            <div className="grid grid-cols-1 border border-gold/25 bg-dark-slate/25 lg:grid-cols-12">
                {/* Left: Framed CEO Executive Portrait */}
                <div className="flex flex-col border-b border-gold/20 bg-navy lg:col-span-4 lg:border-r lg:border-b-0">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#07111D]">
                        <Image
                            src={ceoSpec.avatarSrc}
                            alt={`${authorName} — ${authorRole}`}
                            fill
                            unoptimized
                            className="object-cover object-top"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
                    </div>

                    <div className="border-t border-gold/15 p-6">
                        <div className="text-base font-black text-gold">{authorName}</div>
                        <div className="mt-1 text-xs leading-relaxed text-cream/60">{authorRole}</div>
                    </div>
                </div>

                {/* Right: Stoic Philosophy Epigraph & Full CEO Message */}
                <div className="flex flex-col justify-between p-5 sm:p-8 lg:p-10 lg:col-span-8">
                    {/* Stoic Epigraph Callout */}
                    <div className="mb-8 border border-gold/25 bg-navy/85 p-5 sm:p-6">
                        <div className="mb-3 flex items-center gap-2 text-[0.6rem] font-black tracking-[0.2em] text-gold uppercase">
                            <Quote size={14} aria-hidden="true" />
                            <span>{stoicQuote.tag}</span>
                        </div>
                        <blockquote className="mb-2 text-lg leading-snug font-bold italic text-cream sm:text-xl">
                            &ldquo;{stoicQuote.quote}&rdquo;
                        </blockquote>
                        <cite className="block text-xs font-extrabold tracking-[0.12em] text-gold/85 not-italic uppercase">
                            — {stoicQuote.author}
                        </cite>
                        <p className="mt-4 border-t border-cream/10 pt-4 text-xs leading-[1.75] font-light text-cream/70">
                            {stoicQuote.bridge}
                        </p>
                    </div>

                    {/* CEO Message Body */}
                    <div className="space-y-4 border-l-2 border-gold pl-5">
                        {paragraphs.map((paragraph, idx) => (
                            <p
                                key={idx}
                                className="text-sm leading-[1.9] font-light text-cream/85 sm:text-base"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Executive Sign-Off */}
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-5">
                        <div>
                            <div className="text-sm font-black tracking-wide text-gold">
                                {authorName}
                            </div>
                            <div className="text-xs text-cream/55">{authorRole}</div>
                        </div>
                        <span className="border border-gold/25 bg-gold/[0.06] px-3 py-1 text-[0.6rem] font-extrabold tracking-[0.16em] text-gold/85 uppercase">
                            Professional Precision · Customer Comfort
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
