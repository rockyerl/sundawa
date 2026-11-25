import { ArrowUpRight, Building2, Globe2, Handshake, ShieldCheck } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/src/i18n/navigation'
import { buildWhatsAppUrl } from '@/lib/contact'
import SubpageNav from '@/src/shared/ui/SubpageNav'
import PrintBriefButton from './PrintBriefButton'

interface PartnerTrack {
    code: string
    title: string
    audience: string
    summary: string
    benefits: string[]
}

interface PartnerAssurance {
    title: string
    desc: string
}

const TRACK_ICONS = [Building2, Globe2, Handshake] as const

export default async function PartnersPage() {
    const t = await getTranslations('partnersPage')
    const tracks = t.raw('tracks') as PartnerTrack[]
    const assurances = t.raw('assurances.items') as PartnerAssurance[]
    const regions = t.raw('regions.items') as { label: string; detail: string }[]

    return (
        <div className="min-h-screen bg-navy text-cream">
            <SubpageNav backLabel={t('navBack')} titleLabel={t('navTitle')} />

            {/* Hero */}
            <section className="relative overflow-hidden border-b border-gold/15 pt-16 pb-16 md:pt-24 md:pb-20">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(ellipse 70% 55% at 25% 20%, rgba(219,201,119,0.09), transparent 70%)',
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

                        <div className="lg:col-span-4">
                            <div className="grid grid-cols-1 gap-[1px] border border-gold/20 bg-gold/20">
                                {regions.map((region) => (
                                    <div key={region.label} className="bg-[#0E1E30] p-4">
                                        <div className="text-xs font-black tracking-[0.14em] text-gold uppercase">
                                            {region.label}
                                        </div>
                                        <div className="mt-1 text-xs font-light text-cream/80">
                                            {region.detail}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3 Partnership Models */}
            <section className="py-16 md:py-24">
                <div className="container-main">
                    <div className="mb-12 max-w-2xl">
                        <div className="mb-3 flex items-center gap-2 text-[0.65rem] font-extrabold tracking-[0.26em] text-gold uppercase">
                            <span className="h-0.5 w-4 bg-gold" aria-hidden="true" />
                            {t('modelsSection.eyebrow')}
                        </div>
                        <h2 className="text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.15] font-black text-cream">
                            {t('modelsSection.heading')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {tracks.map((track, idx) => {
                            const Icon = TRACK_ICONS[idx % TRACK_ICONS.length]
                            return (
                                <article
                                    key={track.code}
                                    className="flex flex-col justify-between border border-gold/20 bg-[#0E1E30] p-6 sm:p-7"
                                >
                                    <div>
                                        <div className="mb-5 flex items-center justify-between border-b border-gold/15 pb-4">
                                            <div className="flex h-10 w-10 items-center justify-center border border-gold/30 bg-gold/10 text-gold">
                                                <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                                            </div>
                                            <span className="font-mono text-[0.65rem] font-bold tracking-[0.2em] text-sky uppercase">
                                                {track.code}
                                            </span>
                                        </div>

                                        <div className="mb-2 text-[0.65rem] font-bold tracking-[0.16em] text-gold uppercase">
                                            {track.audience}
                                        </div>
                                        <h3 className="mb-3 text-xl font-black text-cream">
                                            {track.title}
                                        </h3>
                                        <p className="mb-5 text-xs leading-relaxed font-light text-cream/80 sm:text-sm">
                                            {track.summary}
                                        </p>
                                    </div>

                                    <ul className="space-y-2 border-t border-cream/10 pt-4">
                                        {track.benefits.map((benefit) => (
                                            <li
                                                key={benefit}
                                                className="flex items-start gap-2.5 text-xs leading-relaxed text-cream/85"
                                            >
                                                <span
                                                    className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 bg-gold"
                                                    aria-hidden="true"
                                                />
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Partner Protection & Commercial Governance */}
            <section className="border-y border-gold/15 bg-[#081320] py-16 md:py-24">
                <div className="container-main">
                    <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div className="max-w-2xl">
                            <div className="mb-3 flex items-center gap-2 text-[0.65rem] font-extrabold tracking-[0.26em] text-gold uppercase">
                                <span className="h-0.5 w-4 bg-gold" aria-hidden="true" />
                                {t('assurances.eyebrow')}
                            </div>
                            <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.15] font-black text-cream">
                                {t('assurances.heading')}
                            </h2>
                        </div>
                        <Link
                            href="/trust-center"
                            className="inline-flex min-h-[44px] items-center gap-2 border border-sky/35 bg-sky/10 px-5 py-2.5 text-xs font-bold tracking-[0.15em] text-sky uppercase no-underline transition-colors hover:border-sky hover:bg-sky/20"
                        >
                            <ShieldCheck size={15} aria-hidden="true" />
                            <span>{t('assurances.trustCenterCta')}</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {assurances.map((item) => (
                            <div key={item.title} className="border border-gold/15 bg-navy p-5">
                                <h3 className="mb-2 text-sm font-extrabold text-gold">{item.title}</h3>
                                <p className="text-xs leading-relaxed font-light text-cream/80">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-14 border border-gold/25 bg-[#0E1E30] p-8 sm:p-10">
                        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                            <div className="max-w-2xl">
                                <h2 className="mb-2 text-2xl font-black text-cream">
                                    {t('cta.heading')}
                                </h2>
                                <p className="text-sm leading-relaxed font-light text-cream/80">
                                    {t('cta.sub')}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/contact?topic=Strategic%20Partnership"
                                    className="inline-flex min-h-[44px] items-center gap-2 bg-gold px-6 py-3 text-xs font-extrabold tracking-[0.16em] text-navy uppercase no-underline transition-colors hover:bg-[#e5d68a]"
                                >
                                    <span>{t('cta.primary')}</span>
                                    <ArrowUpRight size={14} aria-hidden="true" />
                                </Link>
                                <a
                                    href={buildWhatsAppUrl(t('cta.whatsappMessage'))}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-[44px] items-center gap-2 border border-gold/35 px-6 py-3 text-xs font-bold tracking-[0.16em] text-gold uppercase no-underline transition-colors hover:border-gold hover:bg-gold/10"
                                >
                                    <span>{t('cta.secondary')}</span>
                                    <ArrowUpRight size={14} aria-hidden="true" />
                                </a>
                                <PrintBriefButton label={t('cta.downloadBrief')} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
