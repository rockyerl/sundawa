'use client'

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { getIntroSeenSnapshot, markIntroSeen, subscribeIntroSeen } from './IntroEvents'

function getServerSnapshot() {
    return false
}

export default function IntroLoader() {
    const t = useTranslations('hero')

    const introSeen = useSyncExternalStore(subscribeIntroSeen, getIntroSeenSnapshot, getServerSnapshot)
    const [dismissed, setDismissed] = useState(false)
    const [showSkip, setShowSkip] = useState(false)

    const show = !introSeen && !dismissed

    const finish = useCallback(() => {
        setDismissed(true)
    }, [])

    // Fires once the exit animation below has fully played out — only
    // then do we unlock scrolling and let HeroSection reveal itself.
    const handleExitComplete = useCallback(() => {
        document.body.style.overflow = ''
        markIntroSeen()
    }, [])

    useEffect(() => {
        if (!show) return

        document.body.style.overflow = 'hidden'

        const skipTimer = window.setTimeout(() => {
            setShowSkip(true)
        }, 1000)

        const autoHideTimer = window.setTimeout(() => {
            finish()
        }, 3400)

        return () => {
            window.clearTimeout(skipTimer)
            window.clearTimeout(autoHideTimer)
        }
    }, [show, finish])

    return (
        <AnimatePresence onExitComplete={handleExitComplete}>
            {show && (
                <motion.div
                    key="intro-loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 2,
                        ease: 'easeInOut',
                    }}
                    onClick={() => {
                        if (showSkip) {
                            finish()
                        }
                    }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        background: '#0E1E30',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: showSkip ? 'pointer' : 'default',
                    }}
                >
                    {/* Background grid */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage:
                                'linear-gradient(rgba(219,201,119,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(219,201,119,0.04) 1px, transparent 1px)',
                            backgroundSize: '32px 32px',
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Dark overlay (vignette) */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background:
                                'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.35), rgba(0,0,0,0.8) 100%)',
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Background glow */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.6,
                        }}
                        style={{
                            position: 'absolute',
                            width: 260,
                            height: 260,
                            borderRadius: '50%',
                            background:
                                'radial-gradient(circle, rgba(0,86,170,0.35), transparent 70%)',
                            filter: 'blur(40px)',
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Mascot */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 16,
                            rotate: 0,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            rotate: [0, -4, 4, -2, 0],
                        }}
                        transition={{
                            opacity: {
                                duration: 0.45,
                            },
                            y: {
                                duration: 0.45,
                            },
                            rotate: {
                                duration: 1.1,
                                delay: 0.4,
                                ease: 'easeInOut',
                            },
                        }}
                        style={{
                            position: 'relative',
                            width: 150,
                            filter: 'drop-shadow(0 16px 20px rgba(0,0,0,0.5))',
                        }}
                    >
                        <Image
                            src="/assets/mascot.png"
                            alt="Sundawa Teknologi mascot"
                            width={600}
                            height={600}
                            sizes="150px"
                            preload
                        />
                    </motion.div>

                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            delay: 0.4,
                            duration: 0.4,
                        }}
                        style={{
                            position: 'relative',
                            marginTop: '1.25rem',
                            fontWeight: 900,
                            fontSize: '1rem',
                            letterSpacing: '0.35em',
                            color: '#F8F8F8',
                        }}
                    >
                        SUNDAWA
                        <span style={{ color: '#DBC977' }}>.</span>
                    </motion.div>

                    {/* Tagline */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            delay: 0.8,
                            duration: 0.4,
                        }}
                        style={{
                            position: 'relative',
                            marginTop: '0.6rem',
                            fontSize: '0.68rem',
                            fontWeight: 300,
                            letterSpacing: '0.15em',
                            color: 'rgba(248,248,248,0.35)',
                            textTransform: 'uppercase',
                        }}
                    >
                        {t('badge')}
                    </motion.div>

                    {/* Progress bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            delay: 1,
                            duration: 0.4,
                        }}
                        style={{
                            position: 'relative',
                            marginTop: '2rem',
                            width: 140,
                            height: 2,
                            background: 'rgba(219,201,119,0.15)',
                            overflow: 'hidden',
                        }}
                    >
                        <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{
                                delay: 1,
                                duration: 2.2,
                                ease: 'linear',
                            }}
                            style={{
                                height: '100%',
                                background: '#DBC977',
                            }}
                        />
                    </motion.div>

                    {/* Skip button */}
                    <AnimatePresence>
                        {showSkip && (
                            <motion.button
                                key="skip"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    finish()
                                }}
                                aria-label="Lewati"
                                type="button"
                                style={{
                                    position: 'absolute',
                                    bottom: '2rem',
                                    right: '2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    fontSize: '0.62rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    color: 'rgba(248,248,248,0.3)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontFamily: 'inherit',
                                    transition: 'color 0.2s',
                                }}
                                onMouseEnter={(event) => {
                                    event.currentTarget.style.color =
                                        'rgba(219,201,119,0.8)'
                                }}
                                onMouseLeave={(event) => {
                                    event.currentTarget.style.color =
                                        'rgba(248,248,248,0.3)'
                                }}
                            >
                                Lewati
                                <X size={11} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    )
}