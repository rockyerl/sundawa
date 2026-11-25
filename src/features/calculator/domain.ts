export type CalculatorCurrency = 'IDR' | 'USD'

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
}

const WEEKS_PER_YEAR = 50
const MONTHS_PER_YEAR = 12
const SAVINGS_RATE_LOW = 0.4
const SAVINGS_RATE_HIGH = 0.6

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

    const annualManualWaste = Math.round(staff * manualHours * WEEKS_PER_YEAR * hourlyCost)
    const annualMaintenanceDrain = Math.round(monthlyMaintenance * MONTHS_PER_YEAR)
    const annualDowntimeLoss = Math.round(downtimeHours * MONTHS_PER_YEAR * downtimeCost)

    const totalAnnualCost = annualManualWaste + annualMaintenanceDrain + annualDowntimeLoss
    const threeYearCumulativeCost = totalAnnualCost * 3

    return {
        annualManualWaste,
        annualMaintenanceDrain,
        annualDowntimeLoss,
        totalAnnualCost,
        threeYearCumulativeCost,
        estimatedAnnualSavingsLow: Math.round(totalAnnualCost * SAVINGS_RATE_LOW),
        estimatedAnnualSavingsHigh: Math.round(totalAnnualCost * SAVINGS_RATE_HIGH),
    }
}

export function formatCurrencyAmount(amount: number, currency: CalculatorCurrency): string {
    if (currency === 'IDR') {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(amount)
    }
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(amount)
}
