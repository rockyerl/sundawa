import { describe, expect, it, vi, beforeEach } from 'vitest'
import {
    getGoogleAnalyticsId,
    getGoogleTagManagerId,
    trackLeadConversion,
    trackWhatsAppClick,
} from './analytics'

describe('analytics utilities', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
        // Reset window mock
        delete (globalThis as unknown as { window?: unknown }).window
    })

    it('returns null when GA/GTM environment variables are not set', () => {
        expect(getGoogleAnalyticsId()).toBeNull()
        expect(getGoogleTagManagerId()).toBeNull()
    })

    it('dispatches generate_lead event to both window.gtag and window.dataLayer', () => {
        const mockGtag = vi.fn()
        const mockDataLayer: Array<Record<string, unknown>> = []

        ;(globalThis as unknown as { window: unknown }).window = {
            gtag: mockGtag,
            dataLayer: mockDataLayer,
            location: { pathname: '/id/services/integrasi-sistem' },
        }

        trackLeadConversion({
            topic: 'Otomatisasi & Integrasi Data',
            service: 'integrasi-sistem',
            sourceUrl: '/id/services/integrasi-sistem',
            company: 'PT Logistik Maju',
        })

        // Check gtag call
        expect(mockGtag).toHaveBeenCalledWith(
            'event',
            'generate_lead',
            expect.objectContaining({
                event: 'generate_lead',
                event_category: 'lead',
                event_label: 'Otomatisasi & Integrasi Data',
                topic: 'Otomatisasi & Integrasi Data',
                service: 'integrasi-sistem',
                has_company: true,
            })
        )

        // Check dataLayer push
        expect(mockDataLayer).toHaveLength(1)
        expect(mockDataLayer[0]).toMatchObject({
            event: 'generate_lead',
            event_category: 'lead',
            event_label: 'Otomatisasi & Integrasi Data',
            topic: 'Otomatisasi & Integrasi Data',
        })
    })

    it('dispatches contact_whatsapp event to both window.gtag and window.dataLayer', () => {
        const mockGtag = vi.fn()
        const mockDataLayer: Array<Record<string, unknown>> = []

        ;(globalThis as unknown as { window: unknown }).window = {
            gtag: mockGtag,
            dataLayer: mockDataLayer,
            location: { pathname: '/id/contact' },
        }

        trackWhatsAppClick({
            topic: 'Otomatisasi & Integrasi Data',
            service: 'integrasi-sistem',
        })

        expect(mockGtag).toHaveBeenCalledWith(
            'event',
            'contact_whatsapp',
            expect.objectContaining({
                event: 'contact_whatsapp',
                event_label: 'Otomatisasi & Integrasi Data',
            })
        )
        expect(mockDataLayer).toHaveLength(1)
        expect(mockDataLayer[0].event).toBe('contact_whatsapp')
    })

    it('does not crash if window is undefined (SSR)', () => {
        expect(() => {
            trackLeadConversion({ topic: 'Test' })
            trackWhatsAppClick({ topic: 'Test' })
        }).not.toThrow()
    })
})
