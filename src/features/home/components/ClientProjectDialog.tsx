'use client'

import Image from 'next/image'
import { Lock, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { PortfolioProject } from '@/lib/types'

type DetailSection = {
    key: string
    label: string
    text: string
}

type ClientProjectDialogProps = {
    client: PortfolioProject
    details: DetailSection[]
    confidentialLabel: string
    closeLabel: string
    onClose: () => void
}

export default function ClientProjectDialog({ client, details, confidentialLabel, closeLabel, onClose }: ClientProjectDialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null)
    const previousFocusRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        previousFocusRef.current = document.activeElement as HTMLElement
        const modal = dialogRef.current
        if (modal) {
            modal.focus()
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
            if (e.key === 'Tab' && modal) {
                const focusable = modal.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                )
                const first = focusable[0]
                const last = focusable[focusable.length - 1]

                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault()
                        last?.focus()
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault()
                        first?.focus()
                    }
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            previousFocusRef.current?.focus()
        }
    }, [onClose])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            style={{ background: 'rgba(6,13,22,0.75)', backdropFilter: 'blur(4px)' }}
        >
            <motion.div
                ref={dialogRef}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={event => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="client-dialog-title"
                tabIndex={-1}
                className="relative overflow-y-auto border shadow-2xl"
                style={{
                    width: '100%',
                    maxWidth: 580,
                    maxHeight: '88dvh',
                    background: '#0E1E30',
                    borderColor: 'rgba(219,201,119,0.2)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    padding: 'clamp(1.25rem, 5vw, 2rem)',
                }}
            >
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ zIndex: 20, background: 'linear-gradient(to right, #DBC977, rgba(219,201,119,0))' }} />
                <button
                    type="button"
                    onClick={onClose}
                    aria-label={closeLabel}
                    className="absolute flex items-center justify-center cursor-pointer"
                    style={{
                        top: '1.25rem',
                        right: '1.25rem',
                        zIndex: 20,
                        width: 36,
                        height: 36,
                        border: '1px solid rgba(248,248,248,0.15)',
                        background: 'rgba(14,30,48,0.75)',
                        color: 'rgba(248,248,248,0.7)',
                    }}
                >
                    <X size={14} />
                </button>
                {client.main_image_url && (
                    <div
                        className="relative overflow-hidden"
                        style={{
                            height: '11rem',
                            margin: 'calc(-1 * clamp(1.25rem, 5vw, 2rem)) calc(-1 * clamp(1.25rem, 5vw, 2rem)) 1.5rem',
                            background: '#0A192F',
                        }}
                    >
                        {/* Blurred backdrop from the same image fills any empty space */}
                        <Image
                            src={client.main_image_url}
                            alt=""
                            aria-hidden
                            fill
                            className="object-cover"
                            sizes="580px"
                            style={{ filter: 'blur(18px)', transform: 'scale(1.2)', opacity: 0.45 }}
                        />
                        {/* Full image, never cropped */}
                        <Image
                            src={client.main_image_url}
                            alt={client.name}
                            fill
                            className="object-contain"
                            sizes="580px"
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0E1E30, transparent 35%)', pointerEvents: 'none' }} />
                    </div>
                )}
                <div className="flex items-center gap-4 mb-6" style={{ paddingRight: '2.25rem' }}>
                    <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{
                            width: 52,
                            height: 52,
                            border: '1px solid rgba(219,201,119,0.4)',
                            background: 'rgba(219,201,119,0.1)',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            color: '#DBC977',
                        }}
                    >
                        {client.initials}
                    </div>
                    <div>
                        <div
                            className="inline-flex"
                            style={{
                                padding: '0.2rem 0.65rem',
                                border: '1px solid rgba(45,125,210,0.25)',
                                background: 'rgba(45,125,210,0.07)',
                                marginBottom: '0.4rem',
                                fontSize: '0.55rem',
                                fontWeight: 800,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'rgba(45,125,210,0.8)',
                            }}
                        >
                            {client.type}
                        </div>
                        <h3 id="client-dialog-title" className="font-bold text-lg text-cream">
                            {client.name}
                        </h3>
                    </div>
                </div>
                {client.confidential && (
                    <div
                        className="inline-flex items-center gap-1 mb-4"
                        style={{
                            padding: '0.2rem 0.6rem',
                            border: '1px solid rgba(219,201,119,0.15)',
                            fontSize: '0.55rem',
                            fontWeight: 800,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'rgba(219,201,119,0.55)',
                        }}
                    >
                        <Lock size={10} />
                        {confidentialLabel}
                    </div>
                )}
                <p className="text-sm leading-8 font-light mb-6" style={{ color: 'rgba(248,248,248,0.55)' }}>
                    {client.desc}
                </p>
                <div className="flex flex-col gap-4 mb-6">
                    {details.map(detail => (
                        <div key={detail.key} className="pl-4" style={{ borderLeft: '2px solid rgba(219,201,119,0.25)' }}>
                            <div
                                className="text-[0.58rem] font-black tracking-[0.2em] uppercase mb-1"
                                style={{ color: '#DBC977' }}
                            >
                                {detail.label}
                            </div>
                            <p className="text-xs leading-[1.75] font-light m-0" style={{ color: 'rgba(248,248,248,0.55)' }}>
                                {detail.text}
                            </p>
                        </div>
                    ))}
                </div>
                <div
                    className="pt-4 text-[0.6rem] font-black tracking-[0.15em]"
                    style={{
                        borderTop: '1px solid rgba(248,248,248,0.05)',
                        color: 'rgba(248,248,248,0.25)',
                    }}
                >
                    {client.num}
                </div>
            </motion.div>
        </motion.div>
    )
}