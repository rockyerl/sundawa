import { describe, expect, it } from 'vitest'
import {
    buildWhatsAppMessage,
    calculateCartTotals,
    formatFullPrice,
    formatMillions,
    getSellPrice,
    type CartItem,
    type TalentEntry,
} from './domain'

const entry: TalentEntry = {
    cat: 'Software Development',
    pos: 'Frontend Developer',
    level: 'Mid',
    hybridMin: 8_000_000,
    hybridMax: 13_000_000,
    remoteSell20: 8_500_000,
    remoteSell25: 9_000_000,
    hybridSell20: 9_500_000,
    hybridSell25: 10_000_000,
    onsiteSell20: 11_500_000,
    onsiteSell25: 12_000_000,
}

const sampleCart: CartItem[] = [
    {
        id: 1,
        city: 'bandung',
        pos: 'Frontend Developer',
        level: 'Mid',
        cat: 'Software Development',
        mode: 'remote',
        qty: 2,
        sell20: 8_500_000,
        sell25: 9_000_000,
        feeAvg: 10_500_000,
    },
    {
        id: 2,
        city: 'jakarta',
        pos: 'DevOps / SRE',
        level: 'Senior',
        cat: 'Infrastructure & Cloud',
        mode: 'hybrid',
        qty: 1,
        sell20: 30_000_000,
        sell25: 31_000_000,
        feeAvg: 35_000_000,
    },
]

describe('outsource pricing domain', () => {
    it('selects the sell price for each work mode', () => {
        expect(getSellPrice(entry, 'remote')).toBe(8_500_000)
        expect(getSellPrice(entry, 'hybrid')).toBe(9_500_000)
        expect(getSellPrice(entry, 'onsite')).toBe(11_500_000)
    })

    it('formats monthly prices consistently', () => {
        expect(formatMillions(0)).toBe('Rp 0')
        expect(formatMillions(9_500_000)).toBe('Rp 9.5 jt')
        expect(formatFullPrice(9_500_000)).toBe('Rp 9.500.000')
    })

    it('calculates cart totals accurately', () => {
        const { totalCount, totalPrice } = calculateCartTotals(sampleCart)
        expect(totalCount).toBe(3)
        expect(totalPrice).toBe(2 * 8_500_000 + 30_000_000) // 17_000_000 + 30_000_000 = 47_000_000
    })

    it('builds formatted WhatsApp message for non-empty cart', () => {
        const translations = {
            waButton: 'Halo Sundawa, saya ingin estimasi tim:',
            summaryTitle: 'Ringkasan Kebutuhan',
            totalTalent: 'Total Talent',
        }
        const message = buildWhatsAppMessage(sampleCart, translations, 20)
        expect(message).toContain('Halo Sundawa, saya ingin estimasi tim:')
        expect(message).toContain('• 2× Frontend Developer (Mid) — remote — Bandung → Rp 17 jt/bln')
        expect(message).toContain('• 1× DevOps / SRE (Senior) — hybrid — Jakarta → Rp 30 jt/bln')
        expect(message).toContain('Total Talent 3: Rp 47.000.000/bln')
    })

    it('returns empty string when building WhatsApp message for empty cart', () => {
        const message = buildWhatsAppMessage([], {
            waButton: 'Halo',
            summaryTitle: 'Ringkasan',
            totalTalent: 'Total',
        })
        expect(message).toBe('')
    })
})
