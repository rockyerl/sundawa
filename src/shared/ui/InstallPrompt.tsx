'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
    const [showBanner, setShowBanner] = useState(false)

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault()
            const promptEvent = e as BeforeInstallPromptEvent
            setDeferredPrompt(promptEvent)
            // Show banner only if user hasn't dismissed before
            const dismissed = localStorage.getItem('pwa-banner-dismissed')
            if (!dismissed) {
                setShowBanner(true)
            }
        }

        window.addEventListener('beforeinstallprompt', handler)

        return () => window.removeEventListener('beforeinstallprompt', handler)
    }, [])

    const handleInstall = async () => {
        if (!deferredPrompt) return

        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice

        if (outcome === 'accepted') {
            setShowBanner(false)
            setDeferredPrompt(null)
        }

        // Clear dismissed flag so banner can show again if app is uninstalled
        localStorage.removeItem('pwa-banner-dismissed')
    }

    const handleDismiss = () => {
        setShowBanner(false)
        localStorage.setItem('pwa-banner-dismissed', 'true')
    }

    if (!showBanner || !deferredPrompt) return null

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50">
            <div className="bg-gold/[0.08] border border-gold/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="text-sm font-bold text-cream mb-1">Install Sundawa</h3>
                        <p className="text-xs text-cream/60 mb-3">
                            Tambahkan aplikasi ke home screen untuk akses cepat.
                        </p>
                        <button
                            onClick={handleInstall}
                            className="px-4 py-2 bg-gradient-to-br from-[#00F0FF] to-[#1E3A8A] rounded-md text-navy text-xs font-bold tracking-wider uppercase no-underline hover:opacity-85 transition-opacity cursor-pointer border-0"
                        >
                            Install
                        </button>
                    </div>
                    <button
                        onClick={handleDismiss}
                        className="text-cream/40 hover:text-cream transition-colors p-1"
                        aria-label="Dismiss install banner"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}
