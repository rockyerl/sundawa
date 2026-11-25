'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, Calculator, ChevronDown, Info, Printer, RotateCcw } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/navigation'
import { buildWhatsAppUrl } from '@/lib/contact'
import { trackWhatsAppClick } from '@/lib/analytics'
import SubpageNav from '@/src/shared/ui/SubpageNav'
import {
    CALCULATOR_ASSUMPTIONS,
    CALCULATOR_CURRENCIES,
    calculateLegacyCost,
    DEFAULT_INPUTS_BY_CURRENCY,
    formatCurrencyAmount,
    type CalculatorCurrency,
    type LegacyCostInputs,
} from '../domain'

export default function CalculatorPage() {
    const t = useTranslations('calculatorPage')
    const locale = useLocale()
    const initialCurrency: CalculatorCurrency = locale === 'en' ? 'USD' : 'IDR'
    const [currency, setCurrency] = useState<CalculatorCurrency>(initialCurrency)
    const [inputs, setInputs] = useState<LegacyCostInputs>(DEFAULT_INPUTS_BY_CURRENCY[initialCurrency])
    const [showAssumptions, setShowAssumptions] = useState(false)

    const result = useMemo(() => calculateLegacyCost(inputs), [inputs])

    const handleCurrencyChange = (nextCurrency: CalculatorCurrency) => {
        setCurrency(nextCurrency)
        setInputs(DEFAULT_INPUTS_BY_CURRENCY[nextCurrency])
    }

    const updateField = (field: keyof LegacyCostInputs, value: string) => {
        const numeric = Number(value)
        setInputs((prev) => ({
            ...prev,
            [field]: Number.isFinite(numeric) ? Math.max(0, numeric) : 0,
        }))
    }

    const waMessage = t('whatsappSummary', {
        annualCost: formatCurrencyAmount(result.totalAnnualCost, currency),
        threeYearCost: formatCurrencyAmount(result.threeYearCumulativeCost, currency),
        manualWaste: formatCurrencyAmount(result.annualManualWaste, currency),
    })

    const isLargeUnit = currency === 'IDR'

    return (
        <div className="min-h-screen bg-navy text-cream">
            <SubpageNav backLabel={t('navBack')} titleLabel={t('navTitle')} />

            {/* Hero */}
            <section className="border-b border-gold/15 pt-16 pb-14 md:pt-24">
                <div className="container-main">
                    <div className="mb-6 flex items-center gap-4">
                        <span className="flex items-center gap-2 text-[0.65rem] font-extrabold tracking-[0.3em] text-gold uppercase">
                            <span className="h-0.5 w-4 bg-gold" aria-hidden="true" />
                            {t('eyebrow')}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                    </div>

                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div className="max-w-3xl">
                            <h1 className="mb-4 text-[clamp(2rem,4.2vw,3.3rem)] leading-[1.1] font-black text-cream">
                                {t('heading1')}{' '}
                                <span className="gold-gradient">{t('heading2')}</span>
                            </h1>
                            <p className="text-sm leading-relaxed font-light text-cream/80 sm:text-base">
                                {t('subtitle')}
                            </p>
                        </div>

                        {/* Currency Selector: IDR, USD, GBP, EUR */}
                        <div className="print-hidden inline-flex flex-wrap border border-gold/30 bg-[#0E1E30] p-1">
                            {CALCULATOR_CURRENCIES.map((curr) => (
                                <button
                                    key={curr}
                                    type="button"
                                    onClick={() => handleCurrencyChange(curr)}
                                    aria-pressed={currency === curr}
                                    className={`min-h-[44px] cursor-pointer px-4 text-xs font-extrabold tracking-[0.16em] uppercase transition-colors ${
                                        currency === curr
                                            ? 'bg-gold text-navy'
                                            : 'text-cream/80 hover:text-gold'
                                    }`}
                                >
                                    {curr}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Calculator Split Layout */}
            <section className="py-14 md:py-20">
                <div className="container-main">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        {/* Input Panel */}
                        <div className="space-y-6 lg:col-span-7">
                            <div className="space-y-6 border border-gold/20 bg-[#0E1E30] p-6 sm:p-8">
                                <div className="flex items-center justify-between border-b border-gold/15 pb-4">
                                    <div className="flex items-center gap-2.5">
                                        <Calculator size={18} className="text-gold" aria-hidden="true" />
                                        <h2 className="text-base font-black text-cream uppercase">
                                            {t('inputsSection.title')}
                                        </h2>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setInputs(DEFAULT_INPUTS_BY_CURRENCY[currency])}
                                        className="print-hidden inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 px-3 text-xs font-bold tracking-wider text-cream/75 uppercase hover:text-gold"
                                    >
                                        <RotateCcw size={13} aria-hidden="true" />
                                        <span>{t('inputsSection.reset')}</span>
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="calc-staff" className="mb-1.5 block text-xs font-bold text-cream">
                                            {t('fields.staffCount.label')}
                                        </label>
                                        <p className="mb-2 text-[0.72rem] font-light text-cream/75">
                                            {t('fields.staffCount.hint')}
                                        </p>
                                        <input
                                            id="calc-staff"
                                            type="number"
                                            min={0}
                                            max={5000}
                                            value={inputs.staffCount}
                                            onChange={(e) => updateField('staffCount', e.target.value)}
                                            className="w-full border border-cream/20 bg-navy px-4 py-3 text-sm font-semibold text-cream outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="calc-hours" className="mb-1.5 block text-xs font-bold text-cream">
                                            {t('fields.manualHoursPerWeek.label')}
                                        </label>
                                        <p className="mb-2 text-[0.72rem] font-light text-cream/75">
                                            {t('fields.manualHoursPerWeek.hint')}
                                        </p>
                                        <input
                                            id="calc-hours"
                                            type="number"
                                            min={0}
                                            max={40}
                                            value={inputs.manualHoursPerWeek}
                                            onChange={(e) => updateField('manualHoursPerWeek', e.target.value)}
                                            className="w-full border border-cream/20 bg-navy px-4 py-3 text-sm font-semibold text-cream outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="calc-hourly" className="mb-1.5 block text-xs font-bold text-cream">
                                            {t('fields.hourlyCost.label', { currency })}
                                        </label>
                                        <p className="mb-2 text-[0.72rem] font-light text-cream/75">
                                            {t('fields.hourlyCost.hint')}
                                        </p>
                                        <input
                                            id="calc-hourly"
                                            type="number"
                                            min={0}
                                            step={isLargeUnit ? 5000 : 5}
                                            value={inputs.hourlyCost}
                                            onChange={(e) => updateField('hourlyCost', e.target.value)}
                                            className="w-full border border-cream/20 bg-navy px-4 py-3 text-sm font-semibold text-cream outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="calc-maint" className="mb-1.5 block text-xs font-bold text-cream">
                                            {t('fields.monthlyMaintenance.label', { currency })}
                                        </label>
                                        <p className="mb-2 text-[0.72rem] font-light text-cream/75">
                                            {t('fields.monthlyMaintenance.hint')}
                                        </p>
                                        <input
                                            id="calc-maint"
                                            type="number"
                                            min={0}
                                            step={isLargeUnit ? 1000000 : 250}
                                            value={inputs.monthlyMaintenance}
                                            onChange={(e) => updateField('monthlyMaintenance', e.target.value)}
                                            className="w-full border border-cream/20 bg-navy px-4 py-3 text-sm font-semibold text-cream outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="calc-downtime-hrs" className="mb-1.5 block text-xs font-bold text-cream">
                                            {t('fields.downtimeHoursPerMonth.label')}
                                        </label>
                                        <p className="mb-2 text-[0.72rem] font-light text-cream/75">
                                            {t('fields.downtimeHoursPerMonth.hint')}
                                        </p>
                                        <input
                                            id="calc-downtime-hrs"
                                            type="number"
                                            min={0}
                                            max={720}
                                            value={inputs.downtimeHoursPerMonth}
                                            onChange={(e) => updateField('downtimeHoursPerMonth', e.target.value)}
                                            className="w-full border border-cream/20 bg-navy px-4 py-3 text-sm font-semibold text-cream outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="calc-downtime-cost" className="mb-1.5 block text-xs font-bold text-cream">
                                            {t('fields.downtimeCostPerHour.label', { currency })}
                                        </label>
                                        <p className="mb-2 text-[0.72rem] font-light text-cream/75">
                                            {t('fields.downtimeCostPerHour.hint')}
                                        </p>
                                        <input
                                            id="calc-downtime-cost"
                                            type="number"
                                            min={0}
                                            step={isLargeUnit ? 250000 : 100}
                                            value={inputs.downtimeCostPerHour}
                                            onChange={(e) => updateField('downtimeCostPerHour', e.target.value)}
                                            className="w-full border border-cream/20 bg-navy px-4 py-3 text-sm font-semibold text-cream outline-none focus:border-gold"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Transparent Formula & Assumptions Accordion */}
                            <div className="border border-gold/15 bg-[#081320]">
                                <button
                                    type="button"
                                    onClick={() => setShowAssumptions((prev) => !prev)}
                                    aria-expanded={showAssumptions}
                                    className="flex min-h-[48px] w-full cursor-pointer items-center justify-between px-6 py-4 text-left text-xs font-bold tracking-[0.14em] text-gold uppercase"
                                >
                                    <span>{t('assumptions.toggle')}</span>
                                    <ChevronDown
                                        size={15}
                                        aria-hidden="true"
                                        className={`transition-transform duration-200 ${showAssumptions ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {showAssumptions && (
                                    <div className="space-y-2 border-t border-gold/15 px-6 py-5 text-xs leading-relaxed text-cream/80">
                                        <p>{t('assumptions.manualFormula', { weeks: CALCULATOR_ASSUMPTIONS.weeksPerYear })}</p>
                                        <p>{t('assumptions.maintenanceFormula', { months: CALCULATOR_ASSUMPTIONS.monthsPerYear })}</p>
                                        <p>{t('assumptions.downtimeFormula', { months: CALCULATOR_ASSUMPTIONS.monthsPerYear })}</p>
                                        <p>{t('assumptions.savingsFormula')}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Live Business Case Output Panel */}
                        <div className="flex flex-col justify-between border border-gold/30 bg-[#081320] p-6 sm:p-8 lg:col-span-5">
                            <div>
                                <div className="mb-2 text-[0.65rem] font-black tracking-[0.22em] text-gold uppercase">
                                    {t('results.eyebrow')}
                                </div>

                                <div className="mb-6 border-b border-gold/15 pb-6">
                                    <div className="text-xs font-light text-cream/80">
                                        {t('results.annualTotal')}
                                    </div>
                                    <div className="mt-1 text-3xl font-black text-gold sm:text-4xl">
                                        {formatCurrencyAmount(result.totalAnnualCost, currency)}
                                    </div>
                                    <div className="mt-2 text-xs text-cream/80">
                                        {t('results.threeYearLabel')}:{' '}
                                        <span className="font-bold text-cream">
                                            {formatCurrencyAmount(result.threeYearCumulativeCost, currency)}
                                        </span>
                                    </div>
                                </div>

                                <dl className="space-y-3.5 text-xs sm:text-sm">
                                    <div className="flex items-center justify-between gap-4">
                                        <dt className="font-light text-cream/80">{t('results.manualWaste')}</dt>
                                        <dd className="font-bold text-cream">
                                            {formatCurrencyAmount(result.annualManualWaste, currency)}
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <dt className="font-light text-cream/80">{t('results.maintenanceDrain')}</dt>
                                        <dd className="font-bold text-cream">
                                            {formatCurrencyAmount(result.annualMaintenanceDrain, currency)}
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <dt className="font-light text-cream/80">{t('results.downtimeLoss')}</dt>
                                        <dd className="font-bold text-cream">
                                            {formatCurrencyAmount(result.annualDowntimeLoss, currency)}
                                        </dd>
                                    </div>
                                </dl>

                                <div className="mt-6 border border-sky/30 bg-sky/[0.06] p-4">
                                    <div className="mb-1 text-[0.62rem] font-black tracking-[0.18em] text-sky uppercase">
                                        {t('results.savingsLabel')}
                                    </div>
                                    <div className="text-base font-black text-cream sm:text-lg">
                                        {formatCurrencyAmount(result.estimatedAnnualSavingsLow, currency)} –{' '}
                                        {formatCurrencyAmount(result.estimatedAnnualSavingsHigh, currency)}
                                    </div>
                                    <p className="mt-1.5 flex items-start gap-2 text-[0.72rem] leading-relaxed text-cream/80">
                                        <Info size={13} className="mt-0.5 flex-shrink-0 text-sky" aria-hidden="true" />
                                        <span>{t('results.modelNote')}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="print-hidden mt-8 flex flex-col gap-3">
                                <Link
                                    href="/contact?service=modernisasi-sistem"
                                    className="inline-flex min-h-[48px] items-center justify-center gap-2 bg-gold px-5 py-3.5 text-xs font-extrabold tracking-[0.16em] text-navy uppercase no-underline transition-colors hover:bg-[#e5d68a]"
                                >
                                    <span>{t('cta.primary')}</span>
                                    <ArrowUpRight size={14} aria-hidden="true" />
                                </Link>
                                <a
                                    href={buildWhatsAppUrl(waMessage)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() =>
                                        trackWhatsAppClick({
                                            topic: 'Legacy Cost Calculator',
                                            service: 'modernisasi-sistem',
                                            sourceUrl: '/calculator',
                                        })
                                    }
                                    className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-gold/35 px-5 py-3 text-xs font-bold tracking-[0.15em] text-gold uppercase no-underline transition-colors hover:border-gold hover:bg-gold/10"
                                >
                                    <span>{t('cta.whatsapp')}</span>
                                    <ArrowUpRight size={14} aria-hidden="true" />
                                </a>
                                <button
                                    type="button"
                                    onClick={() => window.print()}
                                    className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 border border-cream/20 px-5 py-3 text-xs font-bold tracking-[0.15em] text-cream/85 uppercase transition-colors hover:border-gold/50 hover:text-gold"
                                >
                                    <Printer size={14} aria-hidden="true" />
                                    <span>{t('cta.printPdf')}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
