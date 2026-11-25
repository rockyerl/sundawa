import { ArrowUpRight, Calculator, ClipboardCheck, ShieldCheck } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/src/i18n/navigation'

export default async function DemandToolsSection() {
    const t = await getTranslations('demandTools')

    return (
        <section id="diagnostics" className="relative overflow-hidden py-16 md:py-24">
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse 70% 50% at 80% 35%, rgba(219,201,119,0.08), transparent 70%)',
                }}
            />

            <div className="container-main relative z-10">
                <div className="mb-8 flex items-center gap-4">
                    <span className="flex items-center gap-2 text-[0.65rem] font-extrabold tracking-[0.3em] text-gold uppercase">
                        <span className="h-0.5 w-4 bg-gold" aria-hidden="true" />
                        {t('eyebrow')}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                </div>

                <div className="mb-10 max-w-3xl">
                    <h2 className="mb-4 text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.1] font-black text-cream">
                        {t('heading1')}{' '}
                        <span className="gold-gradient">{t('heading2')}</span>
                    </h2>
                    <p className="text-sm leading-relaxed font-light text-cream/80 sm:text-base">
                        {t('sub')}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Card 1: System Health Assessment */}
                    <article className="flex flex-col justify-between border border-gold/25 bg-[#0E1E30] p-7 transition-colors hover:border-gold/55 sm:p-8">
                        <div>
                            <div className="mb-5 flex items-center justify-between border-b border-gold/15 pb-4">
                                <div className="flex h-11 w-11 items-center justify-center border border-gold/30 bg-gold/10 text-gold">
                                    <ClipboardCheck size={20} strokeWidth={1.6} aria-hidden="true" />
                                </div>
                                <span className="border border-sky/35 bg-sky/10 px-2.5 py-1 text-[0.62rem] font-bold tracking-[0.16em] text-sky uppercase">
                                    {t('assessment.badge')}
                                </span>
                            </div>
                            <h3 className="mb-3 text-xl font-black text-cream sm:text-2xl">
                                {t('assessment.title')}
                            </h3>
                            <p className="mb-6 text-xs leading-relaxed font-light text-cream/80 sm:text-sm">
                                {t('assessment.desc')}
                            </p>
                        </div>

                        <Link
                            href="/assessment"
                            className="inline-flex min-h-[46px] w-fit items-center gap-2 bg-gold px-6 py-3 text-xs font-extrabold tracking-[0.16em] text-navy uppercase no-underline transition-colors hover:bg-[#e5d68a]"
                        >
                            <span>{t('assessment.cta')}</span>
                            <ArrowUpRight size={14} aria-hidden="true" />
                        </Link>
                    </article>

                    {/* Card 2: Legacy System Cost Calculator */}
                    <article className="flex flex-col justify-between border border-gold/25 bg-[#0E1E30] p-7 transition-colors hover:border-gold/55 sm:p-8">
                        <div>
                            <div className="mb-5 flex items-center justify-between border-b border-gold/15 pb-4">
                                <div className="flex h-11 w-11 items-center justify-center border border-gold/30 bg-gold/10 text-gold">
                                    <Calculator size={20} strokeWidth={1.6} aria-hidden="true" />
                                </div>
                                <span className="border border-gold/35 bg-gold/10 px-2.5 py-1 text-[0.62rem] font-bold tracking-[0.16em] text-gold uppercase">
                                    {t('calculator.badge')}
                                </span>
                            </div>
                            <h3 className="mb-3 text-xl font-black text-cream sm:text-2xl">
                                {t('calculator.title')}
                            </h3>
                            <p className="mb-6 text-xs leading-relaxed font-light text-cream/80 sm:text-sm">
                                {t('calculator.desc')}
                            </p>
                        </div>

                        <Link
                            href="/calculator"
                            className="inline-flex min-h-[46px] w-fit items-center gap-2 border border-gold/40 bg-gold/[0.06] px-6 py-3 text-xs font-extrabold tracking-[0.16em] text-gold uppercase no-underline transition-colors hover:border-gold hover:bg-gold/15"
                        >
                            <span>{t('calculator.cta')}</span>
                            <ArrowUpRight size={14} aria-hidden="true" />
                        </Link>
                    </article>
                </div>

                {/* Compact Trust Center Assurance Bar */}
                <div className="mt-6 flex flex-col justify-between gap-4 border border-sky/25 bg-[#081320] px-6 py-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3 text-xs text-cream/85">
                        <ShieldCheck size={17} className="flex-shrink-0 text-sky" aria-hidden="true" />
                        <span>{t('trustStrip.text')}</span>
                    </div>
                    <Link
                        href="/trust-center"
                        className="inline-flex min-h-[40px] flex-shrink-0 items-center gap-1.5 text-xs font-bold tracking-[0.15em] text-sky uppercase no-underline transition-colors hover:text-gold"
                    >
                        <span>{t('trustStrip.cta')}</span>
                        <ArrowUpRight size={13} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
