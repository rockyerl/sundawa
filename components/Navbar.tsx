'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import LangToggle from './LangToggle'

export default function Navbar() {
    const t = useTranslations('nav')
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState('')

    const navLinks = [
        { href: '#about',    label: t('about')    },
        { href: '#values',   label: t('values')   },
        { href: '#services', label: t('services') },
        { href: '#tech',     label: t('tech')     },
        { href: '#clients',  label: t('clients')  },
        { href: '#contact',  label: t('contact')  },
    ]

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', handler)
        return () => window.removeEventListener('scroll', handler)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) setActive('#' + e.target.id)
                })
            },
            { threshold: 0.4 }
        )
        navLinks.forEach(l => {
            const el = document.querySelector(l.href)
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled ? 'py-4' : 'py-6'
                }`}
            >
                <div
                    className="absolute inset-0 transition-all duration-500 pointer-events-none"
                    style={{
                        background: scrolled ? 'rgba(14,30,48,0.95)' : 'transparent',
                        backdropFilter: scrolled ? 'blur(20px)' : 'none',
                        borderBottom: scrolled ? '1px solid rgba(219,201,119,0.12)' : 'none',
                        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.3)' : 'none',
                    }}
                />

                <div className="container-main relative flex items-center justify-between min-h-[78px] md:min-h-[82px]">

                    {/* Logo */}
                    <a href="#hero" className="flex items-center gap-3 group flex-shrink-0">
                        <div className="relative w-10 h-10">
                            <Image
                                src="/assets/logo2.png"
                                alt="Sundawa Teknologi"
                                fill
                                className="object-contain p-1"
                                priority={true}
                                sizes="40px"
                            />
                        </div>
                        <div>
                            <div className="font-black text-sm tracking-[0.25em] text-[#F8F8F8] group-hover:text-[#DBC977] transition-colors duration-300 leading-none">
                                SUNDAWA
                            </div>
                            <div className="text-[9px] font-light tracking-[0.4em] text-[#DBC977]/50 uppercase -mt-0.5">
                                Teknologi
                            </div>
                        </div>
                    </a>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-7">
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                                className="relative text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 group"
                                style={{ color: active === link.href ? '#DBC977' : 'rgba(248,248,248,0.55)' }}
                            >
                                {link.label}
                                <span
                                    className="absolute -bottom-1 left-0 h-px bg-[#DBC977] transition-all duration-300"
                                    style={{ width: active === link.href ? '100%' : '0%' }}
                                />
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#DBC977]/50 group-hover:w-full transition-all duration-300" />
                            </motion.a>
                        ))}

                        {/* Language toggle — desktop */}
                        <LangToggle />
                    </div>

                    {/* Mobile: lang toggle + hamburger */}
                    <div className="md:hidden flex items-center gap-3">
                        <LangToggle />
                        <button
                            className="relative z-50 w-10 h-10 flex items-center justify-center transition-colors duration-300"
                            style={{ color: open ? '#DBC977' : 'rgba(248,248,248,0.8)' }}
                            onClick={() => setOpen(!open)}
                            aria-label="Toggle menu"
                        >
                            <AnimatePresence mode="wait">
                                {open ? (
                                    <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <X size={22} />
                                    </motion.span>
                                ) : (
                                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <Menu size={22} />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 flex flex-col"
                        style={{ background: 'rgba(14,30,48,0.98)', backdropFilter: 'blur(24px)' }}
                    >
                        <div className="absolute inset-0 pointer-events-none" style={{
                            backgroundImage: `linear-gradient(rgba(219,201,119,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(219,201,119,0.03) 1px, transparent 1px)`,
                            backgroundSize: '60px 60px',
                        }} />

                        <div className="relative flex flex-col items-center justify-center flex-1 gap-2 px-8">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 }}
                                className="flex items-center gap-3 mb-8"
                            >
                                <div className="h-px w-8 bg-[#DBC977]/30" />
                                <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#DBC977]/40">Navigation</span>
                                <div className="h-px w-8 bg-[#DBC977]/30" />
                            </motion.div>

                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    initial={{ opacity: 0, x: -24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -24 }}
                                    transition={{ delay: 0.08 + i * 0.06 }}
                                    className="group flex items-center gap-4 py-3 w-full max-w-xs"
                                    style={{ borderBottom: '1px solid rgba(219,201,119,0.06)', textDecoration: 'none' }}
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="text-[10px] font-bold tracking-widest text-[#DBC977]/30 w-5 text-right">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span
                                        className="text-xl font-black tracking-widest uppercase transition-colors duration-300 group-hover:text-[#DBC977]"
                                        style={{ color: 'rgba(248,248,248,0.75)' }}
                                    >
                                        {link.label}
                                    </span>
                                </motion.a>
                            ))}

                            <motion.a
                                href="#contact"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-10 block mx-auto w-full max-w-[260px] text-center px-10 py-4 rounded-2xl font-black tracking-[0.25em] text-sm transition-all duration-300"
                                style={{ background: '#DBC977', color: '#0E1E30', boxShadow: '0 10px 30px rgba(219, 201, 119, 0.3)' }}
                                onClick={() => setOpen(false)}
                            >
                                {t('getInTouch')}
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}