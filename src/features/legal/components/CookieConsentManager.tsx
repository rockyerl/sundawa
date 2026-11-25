'use client'

import { useEffect, useState } from 'react'
import { ShieldCheck, SlidersHorizontal, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/navigation'
import {
    readStoredConsent,
    saveConsent,
    subscribeOpenPreferences,
} from '../consent'

export default function CookieConsentManager() {
    const t = useTranslations('cookieConsent')
    const [mounted, setMounted] = useState(false)
    const [bannerVisible, setBannerVisible] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
    const [marketingEnabled, setMarketingEnabled] = useState(false)

    useEffect(() => {
        const frame = window.requestAnimationFrame(() => {
            const existing = readStoredConsent()
            setMounted(true)
            if (existing) {
                setAnalyticsEnabled(existing.analytics)
                setMarketingEnabled(existing.marketing)
                setBannerVisible(false)
            } else {
                setBannerVisible(true)
            }
        })

        const unsubscribe = subscribeOpenPreferences(() => {
            const latest = readStoredConsent()
            if (latest) {
                setAnalyticsEnabled(latest.analytics)
                setMarketingEnabled(latest.marketing)
            }
            setModalOpen(true)
            setBannerVisible(false)
        })

        return () => {
            window.cancelAnimationFrame(frame)
            unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (!modalOpen) return
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setModalOpen(false)
            }
        }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [modalOpen])

    if (!mounted) return null

    const handleAcceptAll = () => {
        saveConsent({ analytics: true, marketing: true })
        setAnalyticsEnabled(true)
        setMarketingEnabled(true)
        setBannerVisible(false)
        setModalOpen(false)
    }

    const handleRejectAll = () => {
        saveConsent({ analytics: false, marketing: false })
        setAnalyticsEnabled(false)
        setMarketingEnabled(false)
        setBannerVisible(false)
        setModalOpen(false)
    }

    const handleSaveCustom = () => {
        saveConsent({ analytics: analyticsEnabled, marketing: marketingEnabled })
        setBannerVisible(false)
        setModalOpen(false)
    }

    return (
        <>
            {/* Bottom Architectural Cookie Banner */}
            {bannerVisible && !modalOpen && (
                <aside
                    aria-label={t('bannerAriaLabel')}
                    className="print-hidden fixed right-4 bottom-4 left-4 z-50 mx-auto max-w-4xl border border-gold/35 bg-[#081320]/98 p-5 shadow-2xl backdrop-blur-md sm:p-6"
                >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl">
                            <div className="mb-1.5 flex items-center gap-2 text-[0.6rem] font-extrabold tracking-[0.26em] text-gold uppercase">
                                <ShieldCheck size={14} aria-hidden="true" />
                                <span>SUNDAWA · {t('tagline')}</span>
                            </div>
                            <h2 className="mb-1.5 text-base font-black text-cream sm:text-lg">
                                {t('heading')}
                            </h2>
                            <p className="text-xs leading-relaxed font-light text-cream/80">
                                {t('body')}
                            </p>
                            <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[0.7rem]">
                                <Link
                                    href="/privacy-policy"
                                    className="font-semibold text-gold/90 underline underline-offset-4 hover:text-gold"
                                >
                                    {t('links.privacy')}
                                </Link>
                                <span className="text-cream/70" aria-hidden="true">·</span>
                                <Link
                                    href="/cookie-policy"
                                    className="font-semibold text-gold/90 underline underline-offset-4 hover:text-gold"
                                >
                                    {t('links.cookie')}
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5 lg:flex-shrink-0">
                            <button
                                type="button"
                                onClick={handleRejectAll}
                                className="inline-flex min-h-[44px] cursor-pointer items-center justify-center border border-cream/30 bg-navy px-4 py-2.5 text-[0.68rem] font-bold tracking-[0.14em] text-cream uppercase transition-colors hover:border-gold hover:text-gold"
                            >
                                {t('actions.rejectAll')}
                            </button>
                            <button
                                type="button"
                                onClick={() => setModalOpen(true)}
                                className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-1.5 border border-gold/40 bg-gold/10 px-4 py-2.5 text-[0.68rem] font-bold tracking-[0.14em] text-gold uppercase transition-colors hover:border-gold hover:bg-gold/20"
                            >
                                <SlidersHorizontal size={13} aria-hidden="true" />
                                <span>{t('actions.customize')}</span>
                            </button>
                            <button
                                type="button"
                                onClick={handleAcceptAll}
                                className="inline-flex min-h-[44px] cursor-pointer items-center justify-center bg-gold px-5 py-2.5 text-[0.68rem] font-extrabold tracking-[0.14em] text-navy uppercase transition-colors hover:bg-[#e5d68a]"
                            >
                                {t('actions.acceptAll')}
                            </button>
                        </div>
                    </div>
                </aside>
            )}

            {/* Customize Preferences Modal */}
            {modalOpen && (
                <div
                    className="print-hidden fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
                    onClick={() => setModalOpen(false)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="cookie-modal-title"
                        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto border border-gold/35 bg-[#081320] p-6 shadow-2xl sm:p-8"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setModalOpen(false)}
                            aria-label={t('actions.close')}
                            className="absolute top-4 right-4 flex h-10 w-10 cursor-pointer items-center justify-center border border-cream/20 text-cream/80 transition-colors hover:border-gold hover:text-gold"
                        >
                            <X size={16} aria-hidden="true" />
                        </button>

                        <div className="mb-1 text-[0.62rem] font-extrabold tracking-[0.26em] text-gold uppercase">
                            SUNDAWA · {t('tagline')}
                        </div>
                        <h2 id="cookie-modal-title" className="mb-2 text-xl font-black text-cream">
                            {t('modal.title')}
                        </h2>
                        <p className="mb-6 text-xs leading-relaxed font-light text-cream/80">
                            {t('modal.desc')}
                        </p>

                        <div className="space-y-4">
                            {/* Strictly Necessary */}
                            <div className="border border-gold/20 bg-[#0E1E30] p-4">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-sm font-bold text-cream">
                                            {t('categories.necessary.title')}
                                        </h3>
                                        <p className="mt-1 text-xs font-light text-cream/80">
                                            {t('categories.necessary.desc')}
                                        </p>
                                    </div>
                                    <span className="flex-shrink-0 border border-sky/40 bg-sky/10 px-2.5 py-1 text-[0.62rem] font-bold tracking-wider text-sky uppercase">
                                        {t('categories.necessary.badge')}
                                    </span>
                                </div>
                            </div>

                            {/* Analytics */}
                            <div className="border border-gold/20 bg-[#0E1E30] p-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="text-sm font-bold text-cream">
                                            {t('categories.analytics.title')}
                                        </h3>
                                        <p className="mt-1 text-xs font-light text-cream/80">
                                            {t('categories.analytics.desc')}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        role="switch"
                                        aria-checked={analyticsEnabled}
                                        aria-label={t('categories.analytics.title')}
                                        onClick={() => setAnalyticsEnabled((prev) => !prev)}
                                        className={`relative mt-0.5 flex h-7 w-12 flex-shrink-0 cursor-pointer items-center border transition-colors ${
                                            analyticsEnabled
                                                ? 'border-gold bg-gold/25'
                                                : 'border-cream/30 bg-navy'
                                        }`}
                                    >
                                        <span
                                            className={`block h-5 w-5 transition-transform ${
                                                analyticsEnabled
                                                    ? 'translate-x-6 bg-gold'
                                                    : 'translate-x-1 bg-cream/60'
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Marketing */}
                            <div className="border border-gold/20 bg-[#0E1E30] p-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="text-sm font-bold text-cream">
                                            {t('categories.marketing.title')}
                                        </h3>
                                        <p className="mt-1 text-xs font-light text-cream/80">
                                            {t('categories.marketing.desc')}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        role="switch"
                                        aria-checked={marketingEnabled}
                                        aria-label={t('categories.marketing.title')}
                                        onClick={() => setMarketingEnabled((prev) => !prev)}
                                        className={`relative mt-0.5 flex h-7 w-12 flex-shrink-0 cursor-pointer items-center border transition-colors ${
                                            marketingEnabled
                                                ? 'border-gold bg-gold/25'
                                                : 'border-cream/30 bg-navy'
                                        }`}
                                    >
                                        <span
                                            className={`block h-5 w-5 transition-transform ${
                                                marketingEnabled
                                                    ? 'translate-x-6 bg-gold'
                                                    : 'translate-x-1 bg-cream/60'
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-gold/15 pt-5">
                            <button
                                type="button"
                                onClick={handleRejectAll}
                                className="inline-flex min-h-[44px] cursor-pointer items-center justify-center border border-cream/30 px-4 py-2.5 text-xs font-bold tracking-[0.14em] text-cream uppercase transition-colors hover:border-gold hover:text-gold"
                            >
                                {t('actions.rejectAll')}
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveCustom}
                                className="inline-flex min-h-[44px] cursor-pointer items-center justify-center bg-gold px-5 py-2.5 text-xs font-extrabold tracking-[0.14em] text-navy uppercase transition-colors hover:bg-[#e5d68a]"
                            >
                                {t('actions.savePreferences')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
