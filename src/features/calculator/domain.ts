export type CalculatorCurrency = 'IDR' | 'USD' | 'GBP' | 'EUR'

export const CALCULATOR_CURRENCIES: readonly CalculatorCurrency[] = ['IDR', 'USD', 'GBP', 'EUR'] as const

export interface LegacyCostInputs {
    staffCount: number
    manualHoursPerWeek: number
    hourlyCost: number
    monthlyMaintenance: number
    downtimeHoursPerMonth: number
    downtimeCostPerHour: number
}

export interface LegacyCostBreakdown {
    annualManualWaste: number
    annualMaintenanceDrain: number
    annualDowntimeLoss: number
    totalAnnualCost: number
    threeYearCumulativeCost: number
    estimatedAnnualSavingsLow: number
    estimatedAnnualSavingsHigh: number
}

export const DEFAULT_INPUTS_BY_CURRENCY: Record<CalculatorCurrency, LegacyCostInputs> = {
    IDR: {
        staffCount: 15,
        manualHoursPerWeek: 6,
        hourlyCost: 75_000,
        monthlyMaintenance: 25_000_000,
        downtimeHoursPerMonth: 8,
        downtimeCostPerHour: 2_500_000,
    },
    USD: {
        staffCount: 15,
        manualHoursPerWeek: 6,
        hourlyCost: 35,
        monthlyMaintenance: 3_500,
        downtimeHoursPerMonth: 8,
        downtimeCostPerHour: 600,
    },
    GBP: {
        staffCount: 15,
        manualHoursPerWeek: 6,
        hourlyCost: 28,
        monthlyMaintenance: 2_800,
        downtimeHoursPerMonth: 8,
        downtimeCostPerHour: 480,
    },
    EUR: {
        staffCount: 15,
        manualHoursPerWeek: 6,
        hourlyCost: 32,
        monthlyMaintenance: 3_200,
        downtimeHoursPerMonth: 8,
        downtimeCostPerHour: 550,
    },
}

export const CALCULATOR_ASSUMPTIONS = {
    weeksPerYear: 50,
    monthsPerYear: 12,
    savingsRateLow: 0.4,
    savingsRateHigh: 0.6,
} as const

function clampNonNegative(value: number): number {
    return Number.isFinite(value) && value > 0 ? value : 0
}

export function calculateLegacyCost(inputs: LegacyCostInputs): LegacyCostBreakdown {
    const staff = clampNonNegative(inputs.staffCount)
    const manualHours = clampNonNegative(inputs.manualHoursPerWeek)
    const hourlyCost = clampNonNegative(inputs.hourlyCost)
    const monthlyMaintenance = clampNonNegative(inputs.monthlyMaintenance)
    const downtimeHours = clampNonNegative(inputs.downtimeHoursPerMonth)
    const downtimeCost = clampNonNegative(inputs.downtimeCostPerHour)

    const annualManualWaste = Math.round(
        staff * manualHours * CALCULATOR_ASSUMPTIONS.weeksPerYear * hourlyCost,
    )
    const annualMaintenanceDrain = Math.round(
        monthlyMaintenance * CALCULATOR_ASSUMPTIONS.monthsPerYear,
    )
    const annualDowntimeLoss = Math.round(
        downtimeHours * CALCULATOR_ASSUMPTIONS.monthsPerYear * downtimeCost,
    )

    const totalAnnualCost = annualManualWaste + annualMaintenanceDrain + annualDowntimeLoss
    const threeYearCumulativeCost = totalAnnualCost * 3

    return {
        annualManualWaste,
        annualMaintenanceDrain,
        annualDowntimeLoss,
        totalAnnualCost,
        threeYearCumulativeCost,
        estimatedAnnualSavingsLow: Math.round(
            totalAnnualCost * CALCULATOR_ASSUMPTIONS.savingsRateLow,
        ),
        estimatedAnnualSavingsHigh: Math.round(
            totalAnnualCost * CALCULATOR_ASSUMPTIONS.savingsRateHigh,
        ),
    }
}

const CURRENCY_LOCALES: Record<CalculatorCurrency, string> = {
    IDR: 'id-ID',
    USD: 'en-US',
    GBP: 'en-GB',
    EUR: 'de-DE',
}

export function formatCurrencyAmount(amount: number, currency: CalculatorCurrency): string {
    return new Intl.NumberFormat(CURRENCY_LOCALES[currency], {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(amount)
}
