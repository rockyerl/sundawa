import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/src/i18n/navigation'
import SubpageNav from '@/src/shared/ui/SubpageNav'
import { INDUSTRY_SPECS } from '../data'
import type { LocalizedIndustryContent } from '../types'

export default async function IndustriesArchive() {
    const t = await getTranslations('industriesPage')
    const items = t.raw('items') as Record<string, LocalizedIndustryContent>

    return (
        <div className="min-h-screen bg-navy text-cream">
            <SubpageNav backLabel={t('navBack')} titleLabel={t('navTitle')} />

            {/* Editorial Header */}
            <section className="relative overflow-hidden border-b border-gold/15 pt-16 pb-16 md:pt-24 md:pb-20">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(ellipse 68% 52% at 75% 20%, rgba(0,86,170,0.12), transparent 70%)',
                    }}
                />

                <div className="container-main relative z-10">
                    <div className="mb-6 flex items-center gap-4">
                        <span className="flex items-center gap-2 text-[0.65rem] font-extrabold tracking-[0.3em] text-gold uppercase">
                            <span className="h-0.5 w-4 bg-gold" aria-hidden="true" />
                            {t('eyebrow')}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
                        <div className="lg:col-span-8">
                            <h1 className="mb-5 text-[clamp(2.2rem,4.4vw,3.5rem)] leading-[1.08] font-black text-cream">
                                {t('heading1')}
                                <br />
                                <span className="gold-gradient">{t('heading2')}</span>
                            </h1>
                            <p className="max-w-3xl text-sm leading-relaxed font-light text-cream/80 sm:text-base">
                                {t('subtitle')}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                            <Link
                                href="/assessment"
                                className="inline-flex min-h-[44px] items-center gap-2 bg-gold px-5 py-3 text-xs font-extrabold tracking-[0.15em] text-navy uppercase no-underline transition-colors hover:bg-[#e5d68a]"
                            >
                                <span>{t('ctaAssessment')}</span>
                                <ArrowUpRight size={14} aria-hidden="true" />
                            </Link>
                            <Link
                                href="/trust-center"
                                className="inline-flex min-h-[44px] items-center gap-2 border border-sky/35 bg-sky/10 px-5 py-3 text-xs font-bold tracking-[0.15em] text-sky uppercase no-underline transition-colors hover:border-sky hover:bg-sky/20"
                            >
                                <ShieldCheck size={14} aria-hidden="true" />
                                <span>{t('ctaTrust')}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6 Enterprise Sector Directory */}
            <section className="py-16 md:py-24">
                <div className="container-main">
                    <div className="grid grid-cols-1 gap-[1px] border border-gold/20 bg-gold/20 md:grid-cols-2">
                        {INDUSTRY_SPECS.map((spec) => {
                            const content = items[spec.slug]
                            return (
                                <Link
                                    key={spec.slug}
                                    href={`/industries/${spec.slug}`}
                                    className="group flex flex-col justify-between bg-[#0E1E30] p-7 no-underline transition-colors duration-200 hover:bg-[#12263D] sm:p-9"
                                >
                                    <div>
                                        <div className="mb-5 flex items-center justify-between border-b border-gold/15 pb-4">
                                            <span className="font-mono text-[0.65rem] font-bold tracking-[0.2em] text-gold uppercase">
                                                {spec.num} · {spec.code}
                                            </span>
                                            <span className="border border-sky/30 bg-sky/10 px-2.5 py-0.5 text-[0.6rem] font-bold tracking-wider text-sky uppercase">
                                                {content.shortTag}
                                            </span>
                                        </div>

                                        <h2 className="mb-3 text-xl font-black text-cream transition-colors group-hover:text-gold sm:text-2xl">
                                            {content.name}
                                        </h2>
                                        <p className="mb-6 text-xs leading-relaxed font-light text-cream/80 sm:text-sm">
                                            {content.summary}
                                        </p>

                                        <div className="mb-6 border-l-2 border-gold/40 pl-3.5 text-xs text-cream/80">
                                            <span className="block text-[0.62rem] font-bold tracking-[0.16em] text-gold/90 uppercase">
                                                {t('labels.typicalSystems')}
                                            </span>
                                            <span className="mt-0.5 block font-light">{content.typicalSystems}</span>
                                        </div>
                                    </div>

                                    <div className="inline-flex min-h-[40px] items-center gap-2 text-xs font-extrabold tracking-[0.16em] text-gold uppercase">
                                        <span>{t('labels.exploreSector')}</span>
                                        <ArrowUpRight
                                            size={14}
                                            aria-hidden="true"
                                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        />
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}
