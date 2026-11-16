import { describe, expect, it } from 'vitest'
import { buildMailtoUrl, buildWhatsAppUrl, COMPANY_CONTACT } from './contact'

describe('company contact configuration', () => {
    it('defines single source of truth for Sundawa contact channels', () => {
        expect(COMPANY_CONTACT.email).toBe('contact@sundawa.net')
        expect(COMPANY_CONTACT.phoneDisplay).toBe('0823 1808 7980')
        expect(COMPANY_CONTACT.waNumber).toBe('6282318087980')
        expect(COMPANY_CONTACT.phoneSchema).toBe('+6282318087980')
    })

    it('builds valid WhatsApp and mailto links', () => {
        expect(buildWhatsAppUrl()).toBe('https://wa.me/6282318087980')
        expect(buildWhatsAppUrl('Halo Sundawa')).toBe(
            'https://wa.me/6282318087980?text=Halo%20Sundawa',
        )
        expect(buildMailtoUrl('Demo Produk', 'Halo tim')).toBe(
            'mailto:contact@sundawa.net?subject=Demo+Produk&body=Halo+tim',
        )
    })
})
