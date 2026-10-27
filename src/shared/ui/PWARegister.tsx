'use client'

import { useEffect } from 'react'

export default function PWARegister() {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            const swUrl = '/sw.js'

            navigator.serviceWorker.register(swUrl).then((registration) => {
                console.log('SW registered:', registration.scope)

                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                console.log('New content available; please refresh.')
                            }
                        })
                    }
                })
            }).catch((error) => {
                console.error('SW registration failed:', error)
            })

            // Handle skip waiting
            const sw = navigator.serviceWorker
            sw.addEventListener('controllerchange', () => {
                console.log('SW controller changed, reloading...')
                window.location.reload()
            })
        }
    }, [])

    return null
}
