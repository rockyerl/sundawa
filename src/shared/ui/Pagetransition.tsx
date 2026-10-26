'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from '@/src/i18n/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [railVisible, setRailVisible] = useState(false)
    const [railDone, setRailDone] = useState(false)
    const prevPathname = useRef(pathname)

    useEffect(() => {
        if (prevPathname.current === pathname) return
        prevPathname.current = pathname

        setRailDone(false)
        setRailVisible(true)

        const doneTimer = setTimeout(() => setRailDone(true), 300)
        const hideTimer = setTimeout(() => setRailVisible(false), 560)

        return () => {
            clearTimeout(doneTimer)
            clearTimeout(hideTimer)
        }
    }, [pathname])

    return (
        <>
            {/* Thin nav rail — runs once per route change, never blocks the page */}
            <AnimatePresence>
                {railVisible && (
                    <motion.div
                        key="nav-rail"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 2,
                            zIndex: 200,
                            background: 'rgba(219,201,119,0.08)',
                            pointerEvents: 'none',
                        }}
                    >
                        <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: railDone ? '100%' : '92%' }}
                            transition={{ duration: railDone ? 0.15 : 0.3, ease: [0.4, 0, 0.2, 1] }}
                            style={{ height: '100%', background: '#DBC977', boxShadow: '0 0 8px rgba(219,201,119,0.6)', position: 'relative' }}
                        >
                            <motion.div
                                initial={{ left: '-20px' }}
                                animate={{ left: railDone ? 'calc(100% - 10px)' : 'calc(92% - 10px)' }}
                                transition={{ duration: railDone ? 0.15 : 0.3, ease: [0.4, 0, 0.2, 1] }}
                                style={{
                                    position: 'absolute',
                                    top: -9,
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    border: '1.5px solid #DBC977',
                                    background: '#0E1E30',
                                }}
                            >
                                <Image src="/assets/mascot-face.png" alt="" width={20} height={20} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quick crossfade — tied to real navigation, capped at ~300ms total */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.16, ease: 'easeInOut' }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </>
    )
}