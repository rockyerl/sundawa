'use client'

import Image from 'next/image'
import { ArrowUpRight, ChevronDown, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import type { PortfolioProject } from '@/lib/types'

type ClientsGridProps = {
    clients: PortfolioProject[]
    inView: boolean
    activeIndex: number | null
    expanded: boolean
    hasMore: boolean
    showLessLabel: string
    showAllLabel: string
    viewProjectLabel: string
    confidentialLabel: string
    onHover: (index: number | null) => void
    onSelect: (index: number) => void
    onToggleExpanded: () => void
}

export default function ClientsGrid({ clients, inView, activeIndex, expanded, hasMore, showLessLabel, showAllLabel, viewProjectLabel, confidentialLabel, onHover, onSelect, onToggleExpanded }: ClientsGridProps) {
    return (
        <div className="clients-right self-start">
            <div className="clients-grid grid grid-cols-2 gap-[1px] bg-gold/10 border border-gold/10">
                {clients.map((client, index) => {
                    const active = activeIndex === index
                    return (
                        <motion.div
                            key={client.id || client.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.15 + index * 0.06 }}
                            onMouseEnter={() => onHover(index)}
                            onMouseLeave={() => onHover(null)}
                            onClick={() => onSelect(index)}
                            className={`relative flex flex-col overflow-hidden cursor-pointer transition-colors duration-300 ${active ? 'bg-dark-slate/60' : 'bg-navy'}`}
                        >
                            {/* Image (fixed height so every card is the same size) */}
                            <div className="relative w-full flex-shrink-0 overflow-hidden" style={{ height: '8.5rem' }}>
                                {client.main_image_url ? (
                                    <>
                                        {/* Blurred backdrop from the same image fills any empty space */}
                                        <Image
                                            src={client.main_image_url}
                                            alt=""
                                            aria-hidden
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            loading="lazy"
                                            style={{ filter: 'blur(18px)', transform: 'scale(1.2)', opacity: 0.45 }}
                                        />
                                        {/* Full image, never cropped, with breathing room on every side */}
                                        <div className="absolute" style={{ inset: '1.0rem 1.5rem' }}>
                                            <Image
                                                src={client.main_image_url}
                                                alt={client.name}
                                                fill
                                                className="object-contain"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                loading="lazy"
                                                style={{ transform: active ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.5s' }}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gold/10 via-blue/20 to-navy">
                                        <div className="flex items-center justify-center w-14 h-14 border border-gold/40 bg-gold/10 text-[0.7rem] font-extrabold text-gold">
                                            {client.initials}
                                        </div>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/12 to-transparent pointer-events-none" />

                                {/* Number + confidential on top of the image */}
                                <span className="absolute top-2.5 left-3 text-[0.65rem] font-extrabold text-gold" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>
                                    {client.num}
                                </span>
                                {client.confidential && (
                                    <div className="absolute top-2 right-2.5 flex items-center gap-1 py-0.5 px-2 border border-gold/30 bg-navy/75 text-[0.52rem] font-extrabold tracking-[0.18em] uppercase text-gold/80">
                                        <Lock size={9} />{confidentialLabel}
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="relative flex flex-col flex-1 py-3.5 px-4 pb-3">
                                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-transparent transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`} />

                                <div className="text-[0.55rem] font-extrabold tracking-[0.18em] uppercase text-sky/85 mb-1.5 truncate">{client.type}</div>

                                <h3 className={`font-bold text-[0.92rem] leading-snug mb-1.5 truncate transition-colors duration-300 ${active ? 'text-gold' : 'text-cream'}`}>
                                    {client.name}
                                </h3>

                                <p className="text-[0.74rem] leading-snug font-light text-cream/42 margin-0 overflow-hidden"
                                   style={{ minHeight: '2.37rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                    {client.desc}
                                </p>

                                {/* Footer pushed to the bottom so all cards line up */}
                                <div className="mt-auto pt-2.5 flex justify-end">
                                    <button
                                        type="button"
                                        aria-label={`${viewProjectLabel}: ${client.name}`}
                                        className={`inline-flex items-center gap-1 p-0 border-none bg-transparent cursor-pointer text-[0.6rem] font-extrabold tracking-[0.15em] uppercase transition-colors duration-300 ${active ? 'text-gold' : 'text-cream/35'}`}
                                    >
                                        {viewProjectLabel}<ArrowUpRight size={12} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {hasMore && (
                <div className="flex justify-center mt-6">
                    <button
                        type="button"
                        onClick={onToggleExpanded}
                        aria-expanded={expanded}
                        className="inline-flex items-center gap-2 py-3 px-6 border border-gold/35 bg-gold/5 text-gold text-[0.68rem] font-extrabold tracking-[0.15em] uppercase cursor-pointer"
                    >
                        {expanded ? showLessLabel : showAllLabel}
                        <ChevronDown size={14} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                    </button>
                </div>
            )}
        </div>
    )
}