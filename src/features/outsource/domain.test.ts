import { describe, expect, it } from 'vitest'
import { formatFullPrice, formatMillions, getSellPrice, type TalentEntry } from './domain'

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
})
