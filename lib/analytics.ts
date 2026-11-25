import { COOKIE_CONSENT_STORAGE_KEY, parseConsentRecord } from '@/src/features/legal/consent'

export function getGoogleAnalyticsId(): string | null {
    return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || null
}

export function getGoogleTagManagerId(): string | null {
    return process.env.NEXT_PUBLIC_GTM_ID || null
}

export interface LeadConversionParams {
    topic: string
    service?: string | null
    sourceUrl?: string | null
    company?: string | null
    currency?: string
    value?: number
}

function isAnalyticsBlockedByConsent(): boolean {
    if (typeof window === 'undefined' || !('localStorage' in window) || !window.localStorage) {
        return false
    }
    try {
        const stored = parseConsentRecord(window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY))
        // Suppress event dispatch whenever a visitor has explicitly declined/revoked analytics consent
        return stored !== null && stored.analytics === false
    } catch {
        return false
    }
}

/**
 * Fires the standard GA4 `generate_lead` event to window.gtag and window.dataLayer.
 * Respects CookieConsentManager preferences and suppresses dispatch if analytics consent is declined.
 */
export function trackLeadConversion(params: LeadConversionParams): void {
    if (typeof window === 'undefined' || isAnalyticsBlockedByConsent()) return

    const eventData = {
        event: 'generate_lead',
        event_category: 'lead',
        event_label: params.topic,
        topic: params.topic,
        service: params.service || 'general',
        source_url: params.sourceUrl || window.location.pathname,
        has_company: Boolean(params.company),
        currency: params.currency || 'IDR',
        value: params.value ?? 1,
    }

    const win = window as unknown as {
        gtag?: (...args: unknown[]) => void
        dataLayer?: Array<Record<string, unknown>>
    }

    if (typeof win.gtag === 'function') {
        win.gtag('event', 'generate_lead', eventData)
    }

    if (Array.isArray(win.dataLayer)) {
        win.dataLayer.push(eventData)
    }

    if (process.env.NODE_ENV !== 'production') {
        console.log('[Analytics] generate_lead tracked:', eventData)
    }
}

/**
 * Fires the `contact_whatsapp` conversion event to window.gtag and window.dataLayer.
 * Respects CookieConsentManager preferences and suppresses dispatch if analytics consent is declined.
 */
export function trackWhatsAppClick(params: {
    topic: string
    service?: string | null
    sourceUrl?: string | null
}): void {
    if (typeof window === 'undefined' || isAnalyticsBlockedByConsent()) return

    const eventData = {
        event: 'contact_whatsapp',
        event_category: 'lead',
        event_label: params.topic,
        topic: params.topic,
        service: params.service || 'general',
        source_url: params.sourceUrl || window.location.pathname,
    }

    const win = window as unknown as {
        gtag?: (...args: unknown[]) => void
        dataLayer?: Array<Record<string, unknown>>
    }

    if (typeof win.gtag === 'function') {
        win.gtag('event', 'contact_whatsapp', eventData)
    }

    if (Array.isArray(win.dataLayer)) {
        win.dataLayer.push(eventData)
    }

    if (process.env.NODE_ENV !== 'production') {
        console.log('[Analytics] contact_whatsapp tracked:', eventData)
    }
}
