import { describe, expect, it } from 'vitest'
import {
    calculateLegacyCost,
    DEFAULT_INPUTS_BY_CURRENCY,
    formatCurrencyAmount,
} from './domain'

describe('legacy system cost calculator domain', () => {
    it('computes annual manual, maintenance, downtime, and 3-year totals accurately', () => {
        const result = calculateLegacyCost({
            staffCount: 10,
            manualHoursPerWeek: 5,
            hourlyCost: 100_000,
            monthlyMaintenance: 10_000_000,
            downtimeHoursPerMonth: 4,
            downtimeCostPerHour: 1_000_000,
        })

        // 10 * 5 * 50 * 100,000 = 250,000,000
        expect(result.annualManualWaste).toBe(250_000_000)
        // 10,000,000 * 12 = 120,000,000
        expect(result.annualMaintenanceDrain).toBe(120_000_000)
        // 4 * 12 * 1,000,000 = 48,000,000
        expect(result.annualDowntimeLoss).toBe(48_000_000)
        expect(result.totalAnnualCost).toBe(418_000_000)
        expect(result.threeYearCumulativeCost).toBe(1_254_000_000)
        expect(result.estimatedAnnualSavingsLow).toBe(Math.round(418_000_000 * 0.4))
        expect(result.estimatedAnnualSavingsHigh).toBe(Math.round(418_000_000 * 0.6))
    })

    it('clamps negative or NaN values safely to zero', () => {
        const result = calculateLegacyCost({
            staffCount: -5,
            manualHoursPerWeek: Number.NaN,
            hourlyCost: 50,
            monthlyMaintenance: -100,
            downtimeHoursPerMonth: 0,
            downtimeCostPerHour: 0,
        })

        expect(result.totalAnnualCost).toBe(0)
        expect(result.threeYearCumulativeCost).toBe(0)
    })

    it('formats IDR and USD outputs cleanly using defaults', () => {
        const idr = calculateLegacyCost(DEFAULT_INPUTS_BY_CURRENCY.IDR)
        const usd = calculateLegacyCost(DEFAULT_INPUTS_BY_CURRENCY.USD)

        expect(idr.totalAnnualCost).toBeGreaterThan(0)
        expect(usd.totalAnnualCost).toBeGreaterThan(0)
        expect(formatCurrencyAmount(1000, 'USD')).toBe('$1,000')
        expect(formatCurrencyAmount(1000000, 'IDR')).toContain('1.000.000')
    })
})
