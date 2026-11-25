'use client'

import { useMemo, useState } from 'react'
import { AlertCircle, ArrowUpRight, CheckCircle2, ClipboardCheck, RotateCcw, Send } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/navigation'
import { buildWhatsAppUrl } from '@/lib/contact'
import { trackLeadConversion, trackWhatsAppClick } from '@/lib/analytics'
import SubpageNav from '@/src/shared/ui/SubpageNav'
import {
    ASSESSMENT_QUESTIONS,
    buildAssessmentSummary,
    evaluateAssessment,
    type AssessmentDimensionId,
} from '../domain'

interface QuestionCopy {
    prompt: string
    options: string[]
}

export default function AssessmentPage() {
    const t = useTranslations('assessmentPage')
    const [answers, setAnswers] = useState<Record<string, number>>({})
    const [showResults, setShowResults] = useState(false)

    // Lead capture state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [honeypot, setHoneypot] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    const answeredCount = Object.keys(answers).length
    const totalQuestions = ASSESSMENT_QUESTIONS.length
    const isComplete = answeredCount === totalQuestions

    const dimensionLabels = useMemo<Record<AssessmentDimensionId, string>>(
        () => ({
            legacy: t('dimensions.legacy.label'),
            integration: t('dimensions.integration.label'),
            security: t('dimensions.security.label'),
            operations: t('dimensions.operations.label'),
        }),
        [t],
    )

    const result = useMemo(() => evaluateAssessment(answers), [answers])

    const tierLabel = t(`tiers.${result.tier}.label`)
    const tierSummary = t(`tiers.${result.tier}.summary`)
    const tierColor =
        result.tier === 'critical'
            ? 'text-red-400 border-red-400/40 bg-red-500/10'
            : result.tier === 'fragmented'
                ? 'text-amber-300 border-amber-400/40 bg-amber-500/10'
                : result.tier === 'stabilizing'
                    ? 'text-sky border-sky/40 bg-sky/10'
                    : 'text-emerald-300 border-emerald-400/40 bg-emerald-500/10'

    const handleSelect = (questionId: string, score: number) => {
        setAnswers((prev) => ({ ...prev, [questionId]: score }))
    }

    const handleReset = () => {
        setAnswers({})
        setShowResults(false)
        setSubmitted(false)
        setSubmitError(null)
    }

    const handleLeadSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setSubmitError(null)

        if (!name.trim() || !email.trim()) {
            setSubmitError(t('leadForm.errorRequired'))
            return
        }

        setSubmitting(true)
        try {
            const summaryLabels = {
                header: t('summaryLabels.header'),
                company: t('summaryLabels.company'),
                priority: t('summaryLabels.priority'),
            }
            const summary = buildAssessmentSummary(
                result,
                dimensionLabels,
                tierLabel,
                company.trim() || undefined,
                summaryLabels,
            )
            const response = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    company: company.trim(),
                    topic: `${t('navTitle')} (${result.percentage}/100 - ${tierLabel})`,
                    message: summary,
                    sourceUrl: typeof window !== 'undefined' ? window.location.pathname : '/assessment',
                    website: honeypot,
                }),
            })

            const data = await response.json().catch(() => ({}))
            if (!response.ok || !data.success) {
                throw new Error(data.error || t('leadForm.errorGeneric'))
            }

            trackLeadConversion({
                topic: 'System Health Assessment',
                service: result.recommendedServiceKey,
                sourceUrl: typeof window !== 'undefined' ? window.location.pathname : '/assessment',
                company: company.trim() || undefined,
            })
            setSubmitted(true)
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : t('leadForm.errorGeneric'))
        } finally {
            setSubmitting(false)
        }
    }

    const waSummary = buildAssessmentSummary(
        result,
        dimensionLabels,
        tierLabel,
        company.trim() || undefined,
        {
            header: t('summaryLabels.header'),
            company: t('summaryLabels.company'),
            priority: t('summaryLabels.priority'),
        },
    )

    return (
        <div className="min-h-screen bg-navy text-cream">
            <SubpageNav backLabel={t('navBack')} titleLabel={t('navTitle')} />

            {/* Header */}
            <section className="border-b border-gold/15 pt-16 pb-14 md:pt-24">
                <div className="container-main">
                    <div className="mb-6 flex items-center gap-4">
                        <span className="flex items-center gap-2 text-[0.65rem] font-extrabold tracking-[0.3em] text-gold uppercase">
                            <span className="h-0.5 w-4 bg-gold" aria-hidden="true" />
                            {t('eyebrow')}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                    </div>

                    <div className="max-w-3xl">
                        <h1 className="mb-4 text-[clamp(2rem,4.2vw,3.3rem)] leading-[1.1] font-black text-cream">
                            {t('heading1')}{' '}
                            <span className="gold-gradient">{t('heading2')}</span>
                        </h1>
                        <p className="text-sm leading-relaxed font-light text-cream/80 sm:text-base">
                            {t('subtitle')}
                        </p>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-8 max-w-2xl">
                        <div className="mb-2 flex items-center justify-between text-xs font-bold tracking-wider uppercase">
                            <span className="text-gold">
                                {t('progressLabel', { answered: answeredCount, total: totalQuestions })}
                            </span>
                            <span className="text-cream/75">
                                {Math.round((answeredCount / totalQuestions) * 100)}%
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-cream/10">
                            <div
                                className="h-full bg-gold transition-all duration-300"
                                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Questionnaire or Results */}
            <section className="py-14 md:py-20">
                <div className="container-main">
                    {!showResults ? (
                        <div className="mx-auto max-w-4xl space-y-6">
                            {ASSESSMENT_QUESTIONS.map((q, qIndex) => {
                                const qCopy = t.raw(`questions.${q.id}`) as QuestionCopy
                                const selected = answers[q.id]
                                return (
                                    <fieldset
                                        key={q.id}
                                        className="border border-gold/15 bg-[#0E1E30] p-6 sm:p-7"
                                    >
                                        <legend className="sr-only">{qCopy.prompt}</legend>
                                        <div className="mb-3 flex items-center justify-between gap-3">
                                            <span className="font-mono text-[0.65rem] font-bold tracking-[0.2em] text-sky uppercase">
                                                0{qIndex + 1} · {dimensionLabels[q.dimension]}
                                            </span>
                                            {selected !== undefined && (
                                                <CheckCircle2 size={15} className="text-gold" aria-hidden="true" />
                                            )}
                                        </div>
                                        <h2 className="mb-5 text-base font-bold text-cream sm:text-lg">
                                            {qCopy.prompt}
                                        </h2>
                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            {qCopy.options.map((optionText, scoreValue) => {
                                                const isPicked = selected === scoreValue
                                                return (
                                                    <button
                                                        key={optionText}
                                                        type="button"
                                                        onClick={() => handleSelect(q.id, scoreValue)}
                                                        aria-pressed={isPicked}
                                                        className={`min-h-[52px] cursor-pointer border p-4 text-left text-xs leading-relaxed transition-colors sm:text-sm ${
                                                            isPicked
                                                                ? 'border-gold bg-gold/15 font-semibold text-cream'
                                                                : 'border-cream/15 bg-navy/70 font-light text-cream/80 hover:border-gold/50 hover:text-cream'
                                                        }`}
                                                    >
                                                        {optionText}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </fieldset>
                                )
                            })}

                            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gold/15 pt-8">
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 border border-cream/20 px-5 py-3 text-xs font-bold tracking-[0.14em] text-cream/80 uppercase transition-colors hover:border-gold/50 hover:text-gold"
                                >
                                    <RotateCcw size={14} aria-hidden="true" />
                                    <span>{t('actions.reset')}</span>
                                </button>

                                <button
                                    type="button"
                                    disabled={!isComplete}
                                    onClick={() => {
                                        setShowResults(true)
                                        window.scrollTo({ top: 0, behavior: 'smooth' })
                                    }}
                                    className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 bg-gold px-7 py-3.5 text-xs font-extrabold tracking-[0.16em] text-navy uppercase transition-colors hover:bg-[#e5d68a] disabled:cursor-not-allowed disabled:opacity-45"
                                >
                                    <ClipboardCheck size={15} aria-hidden="true" />
                                    <span>{t('actions.calculate')}</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="mx-auto max-w-5xl space-y-10">
                            {/* Score Summary Card */}
                            <div className="grid grid-cols-1 gap-8 border border-gold/25 bg-[#0E1E30] p-7 lg:grid-cols-12 sm:p-9">
                                <div className="lg:col-span-5">
                                    <div className="mb-2 text-[0.65rem] font-extrabold tracking-[0.22em] text-gold uppercase">
                                        {t('results.scoreLabel')}
                                    </div>
                                    <div className="mb-3 flex items-baseline gap-2">
                                        <span className="text-5xl font-black text-cream sm:text-6xl">
                                            {result.percentage}
                                        </span>
                                        <span className="text-lg font-bold text-cream/60">/100</span>
                                    </div>
                                    <span className={`inline-block border px-3 py-1 text-xs font-extrabold tracking-[0.14em] uppercase ${tierColor}`}>
                                        {tierLabel}
                                    </span>
                                    <p className="mt-4 text-xs leading-relaxed font-light text-cream/85 sm:text-sm">
                                        {tierSummary}
                                    </p>
                                </div>

                                <div className="space-y-4 border-t border-gold/15 pt-6 lg:col-span-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                                    <h2 className="text-xs font-black tracking-[0.2em] text-gold uppercase">
                                        {t('results.breakdownTitle')}
                                    </h2>
                                    {result.dimensions.map((dim) => (
                                        <div key={dim.dimension}>
                                            <div className="mb-1.5 flex items-center justify-between text-xs">
                                                <span className="font-bold text-cream">
                                                    {dimensionLabels[dim.dimension]}
                                                </span>
                                                <span className="font-mono text-gold">{dim.percentage}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-navy">
                                                <div
                                                    className="h-full bg-gold"
                                                    style={{ width: `${dim.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Priority Recommendations */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {result.priorityDimensions.map((dimId) => (
                                    <div key={dimId} className="border border-gold/20 bg-[#0E1E30] p-6">
                                        <div className="mb-2 text-[0.62rem] font-bold tracking-[0.2em] text-sky uppercase">
                                            {t('results.priorityBadge')} · {dimensionLabels[dimId]}
                                        </div>
                                        <h3 className="mb-2 text-lg font-black text-cream">
                                            {t(`dimensions.${dimId}.recommendationTitle`)}
                                        </h3>
                                        <p className="text-xs leading-relaxed font-light text-cream/80 sm:text-sm">
                                            {t(`dimensions.${dimId}.recommendationDesc`)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Lead Capture Handoff */}
                            <div className="border border-gold/30 bg-[#081320] p-7 sm:p-9">
                                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                                    <div className="lg:col-span-5">
                                        <div className="mb-2 text-[0.65rem] font-extrabold tracking-[0.22em] text-gold uppercase">
                                            {t('leadForm.eyebrow')}
                                        </div>
                                        <h2 className="mb-3 text-2xl font-black text-cream">
                                            {t('leadForm.heading')}
                                        </h2>
                                        <p className="mb-6 text-xs leading-relaxed font-light text-cream/80 sm:text-sm">
                                            {t('leadForm.desc')}
                                        </p>

                                        <div className="flex flex-col gap-3">
                                            <a
                                                href={buildWhatsAppUrl(waSummary)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() =>
                                                    trackWhatsAppClick({
                                                        topic: 'System Health Assessment',
                                                        service: result.recommendedServiceKey,
                                                        sourceUrl: '/assessment',
                                                    })
                                                }
                                                className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-gold/35 px-5 py-3 text-xs font-bold tracking-[0.15em] text-gold uppercase no-underline transition-colors hover:border-gold hover:bg-gold/10"
                                            >
                                                <span>{t('leadForm.whatsappCta')}</span>
                                                <ArrowUpRight size={14} aria-hidden="true" />
                                            </a>
                                            <Link
                                                href="/calculator"
                                                className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-cream/20 px-5 py-3 text-xs font-bold tracking-[0.15em] text-cream/85 uppercase no-underline transition-colors hover:border-gold/50 hover:text-gold"
                                            >
                                                <span>{t('leadForm.calculatorCta')}</span>
                                                <ArrowUpRight size={14} aria-hidden="true" />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-7">
                                        {submitted ? (
                                            <div className="border border-emerald-400/40 bg-emerald-500/10 p-6">
                                                <div className="mb-2 flex items-center gap-2 text-emerald-300">
                                                    <CheckCircle2 size={18} aria-hidden="true" />
                                                    <span className="text-sm font-black uppercase">
                                                        {t('leadForm.successTitle')}
                                                    </span>
                                                </div>
                                                <p className="text-xs leading-relaxed text-cream/85 sm:text-sm">
                                                    {t('leadForm.successBody')}
                                                </p>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleLeadSubmit} className="space-y-4">
                                                <input
                                                    type="text"
                                                    name="website"
                                                    value={honeypot}
                                                    onChange={(e) => setHoneypot(e.target.value)}
                                                    tabIndex={-1}
                                                    autoComplete="off"
                                                    className="hidden"
                                                    aria-hidden="true"
                                                />

                                                {submitError && (
                                                    <div
                                                        role="alert"
                                                        aria-live="assertive"
                                                        className="flex items-start gap-2.5 border border-red-400/40 bg-red-500/10 p-3.5 text-xs text-red-200"
                                                    >
                                                        <AlertCircle size={15} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                                                        <span>{submitError}</span>
                                                    </div>
                                                )}

                                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                    <div>
                                                        <label htmlFor="assess-name" className="mb-1.5 block text-[0.68rem] font-bold tracking-wider text-cream/85 uppercase">
                                                            {t('leadForm.nameLabel')} *
                                                        </label>
                                                        <input
                                                            id="assess-name"
                                                            type="text"
                                                            required
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            className="w-full border border-cream/20 bg-navy px-4 py-3 text-sm text-cream outline-none focus:border-gold"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="assess-email" className="mb-1.5 block text-[0.68rem] font-bold tracking-wider text-cream/85 uppercase">
                                                            {t('leadForm.emailLabel')} *
                                                        </label>
                                                        <input
                                                            id="assess-email"
                                                            type="email"
                                                            required
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="w-full border border-cream/20 bg-navy px-4 py-3 text-sm text-cream outline-none focus:border-gold"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="assess-company" className="mb-1.5 block text-[0.68rem] font-bold tracking-wider text-cream/85 uppercase">
                                                        {t('leadForm.companyLabel')}
                                                    </label>
                                                    <input
                                                        id="assess-company"
                                                        type="text"
                                                        value={company}
                                                        onChange={(e) => setCompany(e.target.value)}
                                                        className="w-full border border-cream/20 bg-navy px-4 py-3 text-sm text-cream outline-none focus:border-gold"
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={submitting}
                                                    className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 bg-gold px-6 py-3.5 text-xs font-extrabold tracking-[0.16em] text-navy uppercase transition-colors hover:bg-[#e5d68a] disabled:opacity-60"
                                                >
                                                    <Send size={14} aria-hidden="true" />
                                                    <span>
                                                        {submitting ? t('leadForm.submitting') : t('leadForm.submit')}
                                                    </span>
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 border border-cream/20 px-5 py-3 text-xs font-bold tracking-[0.15em] text-cream/80 uppercase transition-colors hover:border-gold/50 hover:text-gold"
                                >
                                    <RotateCcw size={14} aria-hidden="true" />
                                    <span>{t('actions.retake')}</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
