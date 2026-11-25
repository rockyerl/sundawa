import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Layers, ShieldCheck } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/src/i18n/navigation'
import { buildWhatsAppUrl } from '@/lib/contact'
import SubpageNav from '@/src/shared/ui/SubpageNav'
import { getAdjacentIndustries } from '../domain'
import type { IndustrySpec, LocalizedIndustryContent } from '../types'

interface IndustryDetailProps {
    spec: IndustrySpec
}

export default async function IndustryDetail({ spec }: IndustryDetailProps) {
    const t = await getTranslations('industriesPage')
    const allItems = t.raw('items') as Record<string, LocalizedIndustryContent>
    const content = allItems[spec.slug]
    const { prev, next } = getAdjacentIndustries(spec.slug)

    return (
        <div className="min-h-screen bg-navy text-cream">
            <SubpageNav
                backLabel={t('labels.backToIndustries')}
                backHref="/industries"
                titleLabel={content.name}
            />

            {/* Editorial Split Hero */}
            <section className="relative overflow-hidden border-b border-gold/15 pt-16 pb-16 md:pt-24 md:pb-20">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(ellipse 68% 55% at 80% 18%, rgba(219,201,119,0.08), transparent 70%)',
                    }}
                />

                <div className="container-main relative z-10">
                    <div className="mb-6 flex items-center gap-4">
                        <span className="flex items-center gap-2 text-[0.65rem] font-extrabold tracking-[0.3em] text-gold uppercase">
                            <span className="h-0.5 w-4 bg-gold" aria-hidden="true" />
                            {t('eyebrow')} · {spec.code}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
                        <div className="lg:col-span-7">
                            <div className="mb-3 inline-block border border-sky/35 bg-sky/10 px-3 py-1 text-[0.65rem] font-bold tracking-[0.16em] text-sky uppercase">
                                {content.name}
                            </div>
                            <h1 className="mb-5 text-[clamp(2rem,4.2vw,3.3rem)] leading-[1.09] font-black text-cream">
                                {content.headline}
                            </h1>
                            <p className="mb-8 max-w-2xl text-sm leading-relaxed font-light text-cream/85 sm:text-base">
                                {content.summary}
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href={`/contact?service=${spec.recommendedServiceParam}`}
                                    className="inline-flex min-h-[48px] items-center gap-2 bg-gold px-6 py-3.5 text-xs font-extrabold tracking-[0.16em] text-navy uppercase no-underline transition-colors hover:bg-[#e5d68a]"
                                >
                                    <span>{t('labels.ctaConsult')}</span>
                                    <ArrowUpRight size={14} aria-hidden="true" />
                                </Link>
                                <Link
                                    href="/assessment"
                                    className="inline-flex min-h-[48px] items-center gap-2 border border-gold/35 bg-gold/[0.05] px-6 py-3.5 text-xs font-bold tracking-[0.16em] text-gold uppercase no-underline transition-colors hover:border-gold hover:bg-gold/15"
                                >
                                    <span>{t('ctaAssessment')}</span>
                                    <ArrowUpRight size={14} aria-hidden="true" />
                                </Link>
                            </div>
                        </div>

                        {/* Operational Profile Panel */}
                        <div className="lg:col-span-5">
                            <div className="border border-gold/25 bg-[#0E1E30] p-6 sm:p-7">
                                <div className="mb-4 border-b border-gold/15 pb-3 text-[0.65rem] font-black tracking-[0.2em] text-gold uppercase">
                                    {t('labels.sectorProfile')}
                                </div>
                                <dl className="space-y-4 text-xs">
                                    <div>
                                        <dt className="mb-1 font-bold tracking-[0.12em] text-sky uppercase">
                                            {t('labels.typicalSystems')}
                                        </dt>
                                        <dd className="leading-relaxed font-light text-cream/85">
                                            {content.typicalSystems}
                                        </dd>
                                    </div>
                                    <div className="border-t border-cream/10 pt-4">
                                        <dt className="mb-1 font-bold tracking-[0.12em] text-sky uppercase">
                                            {t('labels.deploymentModel')}
                                        </dt>
                                        <dd className="leading-relaxed font-light text-cream/85">
                                            {content.deploymentModel}
                                        </dd>
                                    </div>
                                    <div className="border-t border-cream/10 pt-4">
                                        <dt className="mb-1 font-bold tracking-[0.12em] text-sky uppercase">
                                            {t('labels.governanceFocus')}
                                        </dt>
                                        <dd className="leading-relaxed font-light text-cream/85">
                                            {content.governanceFocus}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Asymmetric Challenge -> Architecture Mapping */}
            <section className="py-16 md:py-24">
                <div className="container-main">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <div className="sticky top-24">
                                <div className="mb-3 flex items-center gap-2 text-[0.65rem] font-extrabold tracking-[0.26em] text-gold uppercase">
                                    <span className="h-0.5 w-4 bg-gold" aria-hidden="true" />
                                    {t('labels.challengeEyebrow')}
                                </div>
                                <h2 className="mb-4 text-2xl leading-tight font-black text-cream sm:text-3xl">
                                    {t('labels.challengeHeading')}
                                </h2>
                                <p className="mb-6 text-xs leading-relaxed font-light text-cream/80 sm:text-sm">
                                    {t('labels.challengeSub')}
                                </p>

                                <div className="border border-gold/15 bg-[#081320] p-5">
                                    <div className="mb-3 flex items-center gap-2 text-[0.65rem] font-black tracking-[0.18em] text-gold uppercase">
                                        <Layers size={14} aria-hidden="true" />
                                        <span>{t('labels.deliverablesTitle')}</span>
                                    </div>
                                    <ul className="space-y-2.5 text-xs text-cream/85">
                                        {content.deliverables.map((item) => (
                                            <li key={item} className="flex items-start gap-2.5">
                                                <CheckCircle2
                                                    size={14}
                                                    className="mt-0.5 flex-shrink-0 text-gold"
                                                    aria-hidden="true"
                                                />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5 lg:col-span-8">
                            {content.challengePairs.map((pair, idx) => (
                                <article
                                    key={pair.challenge}
                                    className="border border-gold/20 bg-[#0E1E30] p-6 sm:p-7"
                                >
                                    <div className="mb-4 font-mono text-[0.65rem] font-bold tracking-[0.2em] text-gold/85 uppercase">
                                        {t('labels.scenarioPrefix')} 0{idx + 1}
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <div className="mb-2 text-[0.65rem] font-extrabold tracking-[0.18em] text-cream/75 uppercase">
                                                {t('labels.problemCol')}
                                            </div>
                                            <p className="text-sm leading-relaxed font-semibold text-cream">
                                                {pair.challenge}
                                            </p>
                                        </div>
                                        <div className="border-t border-gold/15 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
                                            <div className="mb-2 text-[0.65rem] font-extrabold tracking-[0.18em] text-sky uppercase">
                                                {t('labels.architectureCol')}
                                            </div>
                                            <p className="text-xs leading-relaxed font-light text-cream/85 sm:text-sm">
                                                {pair.architecture}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            ))}

                            {/* Grounded Reference Proof Box */}
                            <div className="border border-sky/30 bg-[#081320] p-6 sm:p-8">
                                <div className="mb-2 flex items-center gap-2 text-[0.65rem] font-extrabold tracking-[0.22em] text-sky uppercase">
                                    <ShieldCheck size={15} aria-hidden="true" />
                                    <span>{t('labels.proofEyebrow')}</span>
                                </div>
                                <h3 className="mb-2 text-lg font-black text-cream sm:text-xl">
                                    {content.proofTitle}
                                </h3>
                                <p className="mb-6 text-xs leading-relaxed font-light text-cream/85 sm:text-sm">
                                    {content.proofSummary}
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        href={spec.proofHref}
                                        className="inline-flex min-h-[44px] items-center gap-2 bg-gold px-5 py-2.5 text-xs font-extrabold tracking-[0.15em] text-navy uppercase no-underline transition-colors hover:bg-[#e5d68a]"
                                    >
                                        <span>{content.proofCta}</span>
                                        <ArrowUpRight size={14} aria-hidden="true" />
                                    </Link>
                                    <Link
                                        href={spec.secondaryProofHref}
                                        className="inline-flex min-h-[44px] items-center gap-2 border border-gold/35 px-5 py-2.5 text-xs font-bold tracking-[0.15em] text-gold uppercase no-underline transition-colors hover:border-gold hover:bg-gold/10"
                                    >
                                        <span>{content.secondaryProofCta}</span>
                                        <ArrowUpRight size={14} aria-hidden="true" />
                                    </Link>
                                    <a
                                        href={buildWhatsAppUrl(
                                            t('labels.whatsappTemplate', { sector: content.name }),
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex min-h-[44px] items-center gap-2 border border-cream/25 px-5 py-2.5 text-xs font-bold tracking-[0.15em] text-cream/85 uppercase no-underline transition-colors hover:border-gold/50 hover:text-gold"
                                    >
                                        <span>{t('labels.ctaWhatsapp')}</span>
                                        <ArrowUpRight size={14} aria-hidden="true" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Adjacent Sector Navigation */}
                    <nav
                        aria-label={t('labels.sectorNavAria')}
                        className="mt-16 grid grid-cols-1 gap-4 border-t border-gold/15 pt-10 sm:grid-cols-2"
                    >
                        <div>
                            {prev && (
                                <Link
                                    href={`/industries/${prev.slug}`}
                                    className="group inline-flex min-h-[48px] flex-col border border-gold/20 bg-[#0E1E30] px-5 py-4 no-underline transition-colors hover:border-gold/50"
                                >
                                    <span className="mb-1 inline-flex items-center gap-1.5 text-[0.62rem] font-bold tracking-[0.18em] text-gold uppercase">
                                        <ArrowLeft size={12} aria-hidden="true" />
                                        <span>{t('labels.prevSector')}</span>
                                    </span>
                                    <span className="text-sm font-black text-cream group-hover:text-gold">
                                        {allItems[prev.slug].name}
                                    </span>
                                </Link>
                            )}
                        </div>
                        <div className="sm:text-right">
                            {next && (
                                <Link
                                    href={`/industries/${next.slug}`}
                                    className="group inline-flex min-h-[48px] flex-col items-start border border-gold/20 bg-[#0E1E30] px-5 py-4 no-underline transition-colors hover:border-gold/50 sm:items-end"
                                >
                                    <span className="mb-1 inline-flex items-center gap-1.5 text-[0.62rem] font-bold tracking-[0.18em] text-gold uppercase">
                                        <span>{t('labels.nextSector')}</span>
                                        <ArrowRight size={12} aria-hidden="true" />
                                    </span>
                                    <span className="text-sm font-black text-cream group-hover:text-gold">
                                        {allItems[next.slug].name}
                                    </span>
                                </Link>
                            )}
                        </div>
                    </nav>
                </div>
            </section>
        </div>
    )
}
