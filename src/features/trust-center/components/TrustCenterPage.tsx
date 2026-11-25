import {
    ArrowUpRight,
    CheckCircle2,
    Code2,
    FileCheck2,
    GitBranch,
    Info,
    Lock,
    Server,
    ShieldCheck,
    Workflow,
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/src/i18n/navigation'
import { buildWhatsAppUrl } from '@/lib/contact'
import SubpageNav from '@/src/shared/ui/SubpageNav'

interface TrustPillar {
    id: string
    code: string
    title: string
    summary: string
    controls: string[]
}

interface StandardAlignmentRow {
    framework: string
    scope: string
    practice: string
    statusLabel: string
}

const PILLAR_ICONS = [
    Lock,
    Workflow,
    CheckCircle2,
    GitBranch,
    Server,
    Code2,
    FileCheck2,
    ShieldCheck,
] as const

export default async function TrustCenterPage() {
    const t = await getTranslations('trustCenter')
    const pillars = t.raw('pillars') as TrustPillar[]
    const standards = t.raw('standardsTable.rows') as StandardAlignmentRow[]
    const gates = t.raw('qualityGates.items') as { code: string; name: string; desc: string }[]

    return (
        <div className="min-h-screen bg-navy text-cream">
            <SubpageNav backLabel={t('navBack')} titleLabel={t('navTitle')} />

            {/* Hero */}
            <section className="relative overflow-hidden border-b border-gold/15 pt-16 pb-16 md:pt-24 md:pb-20">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(ellipse 70% 55% at 75% 15%, rgba(0,86,170,0.14), transparent 70%)',
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
                            <h1 className="mb-5 text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.08] font-black text-cream">
                                {t('heading1')}
                                <br />
                                <span className="gold-gradient">{t('heading2')}</span>
                            </h1>
                            <p className="max-w-3xl text-sm leading-relaxed font-light text-cream/80 sm:text-base">
                                {t('subtitle')}
                            </p>
                        </div>

                        <div className="lg:col-span-4">
                            <div className="border border-gold/25 bg-[#0E1E30] p-6">
                                <div className="mb-2 text-[0.62rem] font-black tracking-[0.22em] text-gold uppercase">
                                    {t('commitmentBox.label')}
                                </div>
                                <p className="mb-4 text-xs leading-relaxed text-cream/80">
                                    {t('commitmentBox.desc')}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Link
                                        href="/contact?topic=Security%20%26%20NDA%20Review"
                                        className="inline-flex min-h-[44px] items-center gap-2 bg-gold px-4 py-2.5 text-[0.68rem] font-extrabold tracking-[0.16em] text-navy uppercase no-underline transition-colors hover:bg-[#e5d68a]"
                                    >
                                        <span>{t('commitmentBox.ctaNda')}</span>
                                        <ArrowUpRight size={13} aria-hidden="true" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Non-Certification Transparency Banner */}
                    <div
                        role="note"
                        className="mt-10 flex items-start gap-3.5 border border-sky/30 bg-sky/[0.06] p-5"
                    >
                        <Info size={18} className="mt-0.5 flex-shrink-0 text-sky" aria-hidden="true" />
                        <div className="text-xs leading-relaxed text-cream/85">
                            <span className="font-bold text-sky">{t('transparencyNotice.title')}: </span>
                            {t('transparencyNotice.body')}
                        </div>
                    </div>
                </div>
            </section>

            {/* 8 Core Enterprise Trust Pillars */}
            <section className="py-16 md:py-24">
                <div className="container-main">
                    <div className="mb-12 max-w-2xl">
                        <div className="mb-3 flex items-center gap-2 text-[0.65rem] font-extrabold tracking-[0.26em] text-gold uppercase">
                            <span className="h-0.5 w-4 bg-gold" aria-hidden="true" />
                            {t('pillarsSection.eyebrow')}
                        </div>
                        <h2 className="text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.15] font-black text-cream">
                            {t('pillarsSection.heading')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {pillars.map((pillar, index) => {
                            const Icon = PILLAR_ICONS[index % PILLAR_ICONS.length]
                            return (
                                <article
                                    key={pillar.id}
                                    className="flex flex-col justify-between border border-gold/15 bg-[#0E1E30] p-6 transition-colors hover:border-gold/40 sm:p-7"
                                >
                                    <div>
                                        <div className="mb-5 flex items-center justify-between border-b border-gold/15 pb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center border border-gold/30 bg-gold/10 text-gold">
                                                    <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                                                </div>
                                                <span className="font-mono text-[0.65rem] font-bold tracking-[0.2em] text-gold/85 uppercase">
                                                    {pillar.code}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="mb-3 text-lg font-black text-cream sm:text-xl">
                                            {pillar.title}
                                        </h3>
                                        <p className="mb-5 text-xs leading-relaxed font-light text-cream/80 sm:text-sm">
                                            {pillar.summary}
                                        </p>
                                    </div>

                                    <ul className="space-y-2 border-t border-cream/10 pt-4">
                                        {pillar.controls.map((control) => (
                                            <li
                                                key={control}
                                                className="flex items-start gap-2.5 text-xs leading-relaxed text-cream/85"
                                            >
                                                <span
                                                    className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 bg-gold"
                                                    aria-hidden="true"
                                                />
                                                <span>{control}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Standards & Compliance Alignment Matrix */}
            <section className="border-y border-gold/15 bg-[#081320] py-16 md:py-24">
                <div className="container-main">
                    <div className="mb-10 max-w-3xl">
                        <div className="mb-3 flex items-center gap-2 text-[0.65rem] font-extrabold tracking-[0.26em] text-gold uppercase">
                            <span className="h-0.5 w-4 bg-gold" aria-hidden="true" />
                            {t('standardsTable.eyebrow')}
                        </div>
                        <h2 className="mb-3 text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.15] font-black text-cream">
                            {t('standardsTable.heading')}
                        </h2>
                        <p className="text-sm leading-relaxed font-light text-cream/80">
                            {t('standardsTable.sub')}
                        </p>
                    </div>

                    <div className="overflow-x-auto border border-gold/20">
                        <table className="w-full min-w-[680px] border-collapse text-left text-xs sm:text-sm">
                            <thead>
                                <tr className="border-b border-gold/20 bg-[#0E1E30] text-[0.65rem] font-black tracking-[0.18em] text-gold uppercase">
                                    <th className="px-5 py-4">{t('standardsTable.headers.framework')}</th>
                                    <th className="px-5 py-4">{t('standardsTable.headers.scope')}</th>
                                    <th className="px-5 py-4">{t('standardsTable.headers.practice')}</th>
                                    <th className="px-5 py-4">{t('standardsTable.headers.status')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gold/10 bg-navy">
                                {standards.map((row) => (
                                    <tr key={row.framework} className="transition-colors hover:bg-[#0E1E30]/70">
                                        <td className="px-5 py-4 font-bold text-cream">{row.framework}</td>
                                        <td className="px-5 py-4 text-cream/80">{row.scope}</td>
                                        <td className="px-5 py-4 leading-relaxed text-cream/80">{row.practice}</td>
                                        <td className="px-5 py-4">
                                            <span className="inline-block border border-sky/35 bg-sky/10 px-2.5 py-1 text-[0.62rem] font-bold tracking-wider text-sky uppercase">
                                                {row.statusLabel}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Release Quality Gates (Sundawa AI Engineering v1.1.0) */}
            <section className="py-16 md:py-24">
                <div className="container-main">
                    <div className="mb-10 max-w-3xl">
                        <div className="mb-3 flex items-center gap-2 text-[0.65rem] font-extrabold tracking-[0.26em] text-gold uppercase">
                            <span className="h-0.5 w-4 bg-gold" aria-hidden="true" />
                            {t('qualityGates.eyebrow')}
                        </div>
                        <h2 className="mb-3 text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.15] font-black text-cream">
                            {t('qualityGates.heading')}
                        </h2>
                        <p className="text-sm leading-relaxed font-light text-cream/80">
                            {t('qualityGates.sub')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {gates.map((gate) => (
                            <div
                                key={gate.code}
                                className="border border-gold/15 bg-[#0E1E30] p-5"
                            >
                                <div className="mb-2 font-mono text-[0.65rem] font-bold tracking-[0.18em] text-sky uppercase">
                                    {gate.code}
                                </div>
                                <h3 className="mb-1.5 text-sm font-extrabold text-cream">
                                    {gate.name}
                                </h3>
                                <p className="text-xs leading-relaxed font-light text-cream/80">
                                    {gate.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Final Enterprise CTA */}
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
                                    href="/contact?topic=Security%20%26%20Governance"
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
