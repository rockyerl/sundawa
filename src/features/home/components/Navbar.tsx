'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/src/i18n/navigation'
import { PRODUCT_SPECS } from '@/src/features/products'
import { LangToggle, scrollToPendingOrLocationHash, setPendingSectionHash } from '@/src/shared/ui'

type NavGroupId = 'solutions' | 'products' | 'work' | 'company'

interface NavChildItem {
    href: string
    label: string
    desc?: string
    badge?: string
}

interface NavGroup {
    id: NavGroupId
    label: string
    href: string
    items: NavChildItem[]
    activePrefixes: string[]
}

export default function Navbar() {
    const t = useTranslations('nav')
    const tp = useTranslations('products')
    const pathname = usePathname()

    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState<NavGroupId | null>(null)
    const [openMobileGroup, setOpenMobileGroup] = useState<NavGroupId | null>('products')

    const navRef = useRef<HTMLElement>(null)
    const isHomepage = pathname === '/' || pathname === ''

    const navGroups: NavGroup[] = useMemo(() => {
        const productItems = PRODUCT_SPECS.map((spec) => ({
            href: `/products/${spec.slug}`,
            label: tp(`items.${spec.slug}.name`),
            desc: tp(`items.${spec.slug}.sector`),
            badge: spec.num,
        }))

        return [
            {
                id: 'solutions',
                label: t('groups.solutions'),
                href: '/services',
                activePrefixes: ['/services', '/proses-kerja', '/outsource', '/assessment', '/calculator'],
                items: [
                    { href: '/services', label: t('items.servicesTitle'), desc: t('items.servicesDesc') },
                    { href: '/assessment', label: t('items.assessmentTitle'), desc: t('items.assessmentDesc') },
                    { href: '/calculator', label: t('items.calculatorTitle'), desc: t('items.calculatorDesc') },
                    { href: '/proses-kerja', label: t('items.processTitle'), desc: t('items.processDesc') },
                    { href: '/outsource', label: t('items.outsourceTitle'), desc: t('items.outsourceDesc') },
                    { href: '/#tech', label: t('items.techTitle'), desc: t('items.techDesc') },
                ],
            },
            {
                id: 'products',
                label: t('groups.products'),
                href: '/products',
                activePrefixes: ['/products'],
                items: [
                    { href: '/products', label: t('items.allProductsTitle'), desc: t('items.allProductsDesc') },
                    ...productItems,
                ],
            },
            {
                id: 'work',
                label: t('groups.work'),
                href: '/portfolio',
                activePrefixes: ['/portfolio', '/blog', '/resources'],
                items: [
                    { href: '/portfolio', label: t('items.portfolioTitle'), desc: t('items.portfolioDesc') },
                    { href: '/resources', label: t('items.resourcesTitle'), desc: t('items.resourcesDesc') },
                    { href: '/blog', label: t('items.blogTitle'), desc: t('items.blogDesc') },
                ],
            },
            {
                id: 'company',
                label: t('groups.company'),
                href: '/about',
                activePrefixes: ['/about', '/trust-center', '/partners'],
                items: [
                    { href: '/about', label: t('items.aboutTitle'), desc: t('items.aboutDesc') },
                    { href: '/trust-center', label: t('items.trustCenterTitle'), desc: t('items.trustCenterDesc') },
                    { href: '/partners', label: t('items.partnersTitle'), desc: t('items.partnersDesc') },
                    { href: '/#values', label: t('items.valuesTitle'), desc: t('items.valuesDesc') },
                ],
            },
        ]
    }, [t, tp])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpenDropdown(null)
                setMobileOpen(false)
            }
        }
        const onClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setOpenDropdown(null)
            }
        }
        document.addEventListener('keydown', onKeyDown)
        document.addEventListener('mousedown', onClickOutside)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.removeEventListener('mousedown', onClickOutside)
        }
    }, [])

    useEffect(() => {
        if (mobileOpen) {
            const previousOverflow = document.body.style.overflow
            document.body.style.overflow = 'hidden'
            return () => {
                document.body.style.overflow = previousOverflow
            }
        }
    }, [mobileOpen])

    const isGroupActive = (group: NavGroup) =>
        group.activePrefixes.some((prefix) => pathname?.startsWith(prefix))

    const isCompactBar = scrolled || !isHomepage
    const closeAllMenus = () => {
        setOpenDropdown(null)
        setMobileOpen(false)
    }

    const handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        closeAllMenus()
        const hashIndex = href.indexOf('#')
        if (hashIndex === -1) {
            setPendingSectionHash(null)
            return
        }

        const hash = href.slice(hashIndex)
        setPendingSectionHash(hash)

        if (isHomepage) {
            event.preventDefault()
            window.history.pushState(null, '', hash)
            scrollToPendingOrLocationHash()
        }
    }

    return (
        <>
            <motion.nav
                ref={navRef}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
                    isCompactBar ? 'py-3' : 'py-5'
                }`}
            >
                <div
                    className="pointer-events-none absolute inset-0 transition-all duration-300"
                    style={{
                        background: isCompactBar ? 'rgba(14,30,48,0.96)' : 'transparent',
                        backdropFilter: isCompactBar ? 'blur(20px)' : 'none',
                        borderBottom: isCompactBar ? '1px solid rgba(219,201,119,0.14)' : 'none',
                        boxShadow: isCompactBar ? '0 4px 36px rgba(0,0,0,0.32)' : 'none',
                    }}
                />

                <div
                    className={`container-main relative flex items-center justify-between gap-4 ${
                        isCompactBar ? 'min-h-[52px]' : 'min-h-[60px]'
                    }`}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={closeAllMenus}
                        className="group flex flex-shrink-0 items-center gap-3 no-underline"
                        aria-label="Sundawa Teknologi"
                    >
                        <div className="relative h-9 w-9">
                            <Image
                                src="/assets/logo2.png"
                                alt="Sundawa Teknologi"
                                fill
                                className="object-contain p-0.5"
                                priority
                                sizes="36px"
                            />
                        </div>
                        <div>
                            <div className="text-sm leading-none font-black tracking-[0.25em] text-cream transition-colors duration-300 group-hover:text-gold">
                                SUNDAWA
                            </div>
                            <div className="-mt-0.5 text-[9px] font-light tracking-[0.4em] text-gold/55 uppercase">
                                Teknologi
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Categorized Menu */}
                    <div className="hidden items-center gap-5 lg:flex lg:gap-7">
                        {navGroups.map((group) => {
                            const active = isGroupActive(group)
                            const isOpen = openDropdown === group.id
                            return (
                                <div
                                    key={group.id}
                                    className="relative"
                                    onMouseEnter={() => setOpenDropdown(group.id)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <button
                                        type="button"
                                        aria-expanded={isOpen}
                                        aria-haspopup="true"
                                        onClick={() => setOpenDropdown(isOpen ? null : group.id)}
                                        className={`inline-flex cursor-pointer items-center gap-1.5 border-none bg-transparent py-2 text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors duration-200 ${
                                            active || isOpen ? 'text-gold' : 'text-cream/65 hover:text-gold'
                                        }`}
                                    >
                                        <span>{group.label}</span>
                                        <ChevronDown
                                            size={13}
                                            className={`transition-transform duration-200 ${
                                                isOpen ? 'rotate-180 text-gold' : 'opacity-70'
                                            }`}
                                            aria-hidden="true"
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                key={group.id}
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 4 }}
                                                transition={{ duration: 0.16 }}
                                                className="absolute top-full left-0 z-50 pt-1.5"
                                            >
                                                <div
                                                    className={`border border-gold/25 bg-navy/98 p-2 shadow-2xl backdrop-blur-xl ${
                                                        group.id === 'products' ? 'w-[340px]' : 'w-[300px]'
                                                    }`}
                                                    style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.55)' }}
                                                >
                                                    <div className="flex flex-col gap-0.5">
                                                        {group.items.map((item, idx) => (
                                                            <Link
                                                                key={`${item.href}-${idx}`}
                                                                href={item.href}
                                                                scroll={!item.href.includes('#')}
                                                                onClick={(event) => handleItemClick(event, item.href)}
                                                                className={`group/item flex items-start gap-3 px-3 py-2.5 no-underline transition-colors duration-150 hover:bg-dark-slate/70 ${
                                                                    idx === 0 && group.id === 'products'
                                                                        ? 'mb-1 border-b border-gold/15 pb-3'
                                                                        : ''
                                                                }`}
                                                            >
                                                                {item.badge && (
                                                                    <span className="mt-0.5 border border-gold/30 bg-gold/10 px-1.5 py-0.5 text-[0.55rem] font-extrabold text-gold">
                                                                        {item.badge}
                                                                    </span>
                                                                )}
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="flex items-center justify-between gap-2 text-xs font-bold text-cream transition-colors group-hover/item:text-gold">
                                                                        <span className="truncate">{item.label}</span>
                                                                        <ArrowUpRight
                                                                            size={12}
                                                                            className="flex-shrink-0 text-gold/0 transition-colors group-hover/item:text-gold"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </div>
                                                                    {item.desc && (
                                                                        <p className="mt-0.5 text-[0.68rem] leading-snug font-light text-cream/75">
                                                                            {item.desc}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        })}
                    </div>

                    {/* Right Actions */}
                    <div className="hidden items-center gap-3 lg:flex">
                        <LangToggle />
                        <Link
                            href="/contact"
                            onClick={closeAllMenus}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 text-[10px] font-black tracking-[0.18em] uppercase no-underline transition-all duration-200 ${
                                pathname === '/contact'
                                    ? 'border border-gold bg-transparent text-gold'
                                    : 'border border-gold bg-gold text-navy hover:shadow-[0_0_24px_rgba(219,201,119,0.4)]'
                            }`}
                        >
                            <span>{t('getInTouch')}</span>
                            <ArrowUpRight size={12} aria-hidden="true" />
                        </Link>
                    </div>

                    {/* Mobile / Tablet Controls */}
                    <div className="flex items-center gap-3 lg:hidden">
                        <LangToggle />
                        <button
                            type="button"
                            className="relative z-[70] flex h-10 w-10 cursor-pointer items-center justify-center border-none bg-transparent transition-colors duration-300"
                            style={{ color: mobileOpen ? '#DBC977' : 'rgba(248,248,248,0.85)' }}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={mobileOpen}
                        >
                            <AnimatePresence mode="wait">
                                {mobileOpen ? (
                                    <motion.span
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.18 }}
                                    >
                                        <X size={22} />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.18 }}
                                    >
                                        <Menu size={22} />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Categorized Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="fixed inset-0 z-[60] flex flex-col overflow-y-auto pt-24 pb-24 lg:hidden"
                        style={{ background: 'rgba(14,30,48,0.98)', backdropFilter: 'blur(24px)' }}
                    >
                        <div className="container-main flex flex-1 flex-col gap-3">
                            {navGroups.map((group, idx) => {
                                const expanded = openMobileGroup === group.id
                                return (
                                    <div key={group.id} className="border border-gold/15 bg-dark-slate/25">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenMobileGroup(expanded ? null : group.id)
                                            }
                                            aria-expanded={expanded}
                                            className="flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-4 py-3.5 text-left"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-extrabold tracking-widest text-gold/55">
                                                    {String(idx + 1).padStart(2, '0')}
                                                </span>
                                                <span className="text-sm font-black tracking-[0.16em] text-cream uppercase">
                                                    {group.label}
                                                </span>
                                            </div>
                                            <ChevronDown
                                                size={16}
                                                className={`text-gold transition-transform duration-200 ${
                                                    expanded ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </button>

                                        {expanded && (
                                            <div className="flex flex-col border-t border-gold/10 bg-navy/60">
                                                {group.items.map((item) => (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        scroll={!item.href.includes('#')}
                                                        onClick={(event) => handleItemClick(event, item.href)}
                                                        className="flex items-center justify-between border-b border-cream/[0.05] px-4 py-3 no-underline last:border-b-0"
                                                    >
                                                        <div>
                                                            <div className="text-xs font-bold text-cream">
                                                                {item.label}
                                                            </div>
                                                            {item.desc && (
                                                                <div className="mt-0.5 text-[0.68rem] text-cream/75">
                                                                    {item.desc}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <ArrowUpRight size={13} className="flex-shrink-0 text-gold/65" />
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}

                            <Link
                                href="/contact"
                                onClick={closeAllMenus}
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-gold px-6 py-4 text-xs font-black tracking-[0.22em] text-navy uppercase no-underline"
                            >
                                <span>{t('getInTouch')}</span>
                                <ArrowUpRight size={15} aria-hidden="true" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
