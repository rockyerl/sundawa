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

/**
 * Fires the standard GA4 `generate_lead` event to window.gtag and window.dataLayer.
 * Follows Google's recommended parameters for lead conversion measurement.
 */
export function trackLeadConversion(params: LeadConversionParams): void {
    if (typeof window === 'undefined') return

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

    // 1. Google Analytics gtag standard format
    if (typeof win.gtag === 'function') {
        win.gtag('event', 'generate_lead', eventData)
    }

    // 2. Google Tag Manager dataLayer event push
    if (Array.isArray(win.dataLayer)) {
        win.dataLayer.push(eventData)
    }

    if (process.env.NODE_ENV !== 'production') {
        console.log('[Analytics] generate_lead tracked:', eventData)
    }
}

/**
 * Fires the `contact_whatsapp` conversion event to window.gtag and window.dataLayer.
 */
export function trackWhatsAppClick(params: {
    topic: string
    service?: string | null
    sourceUrl?: string | null
}): void {
    if (typeof window === 'undefined') return

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

