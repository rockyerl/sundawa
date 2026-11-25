import { ArrowUpRight, BookOpen, CheckSquare, ClipboardList, Layers, ShieldAlert } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/src/i18n/navigation'
import SubpageNav from '@/src/shared/ui/SubpageNav'

interface ResourceGuide {
    id: string
    pillar: string
    audience: string
    title: string
    summary: string
    checklist: string[]
    relatedServiceHref: string
    relatedServiceLabel: string
}

const GUIDE_ICONS = [CheckSquare, Layers, ClipboardList, ShieldAlert] as const

export default async function ResourcesPage() {
    const t = await getTranslations('resourcesPage')
    const guides = t.raw('guides') as ResourceGuide[]

    return (
        <div className="min-h-screen bg-navy text-cream">
            <SubpageNav backLabel={t('navBack')} titleLabel={t('navTitle')} />

            {/* Hero */}
            <section className="border-b border-gold/15 pt-16 pb-16 md:pt-24 md:pb-20">
                <div className="container-main">
                    <div className="mb-6 flex items-center gap-4">
                        <span className="flex items-center gap-2 text-[0.65rem] font-extrabold tracking-[0.3em] text-gold uppercase">
                            <span className="h-0.5 w-4 bg-gold" aria-hidden="true" />
                            {t('eyebrow')}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
                        <div className="lg:col-span-8">
                            <h1 className="mb-5 text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.08] font-black text-cream">
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
                                <span>{t('quickTools.assessment')}</span>
                                <ArrowUpRight size={14} aria-hidden="true" />
                            </Link>
                            <Link
                                href="/calculator"
                                className="inline-flex min-h-[44px] items-center gap-2 border border-gold/35 px-5 py-3 text-xs font-bold tracking-[0.15em] text-gold uppercase no-underline transition-colors hover:border-gold hover:bg-gold/10"
                            >
                                <span>{t('quickTools.calculator')}</span>
                                <ArrowUpRight size={14} aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Executive Checklists & Guides */}
            <section className="py-16 md:py-24">
                <div className="container-main space-y-8">
                    {guides.map((guide, index) => {
                        const Icon = GUIDE_ICONS[index % GUIDE_ICONS.length]
                        return (
                            <article
                                key={guide.id}
                                className="border border-gold/20 bg-[#0E1E30] p-6 sm:p-8"
                            >
                                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                                    <div className="lg:col-span-5">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center border border-gold/30 bg-gold/10 text-gold">
                                                <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                                            </div>
                                            <div>
                                                <div className="text-[0.62rem] font-extrabold tracking-[0.2em] text-sky uppercase">
                                                    {guide.pillar}
                                                </div>
                                                <div className="text-[0.68rem] text-cream/75">
                                                    {guide.audience}
                                                </div>
                                            </div>
                                        </div>

                                        <h2 className="mb-3 text-xl font-black text-cream sm:text-2xl">
                                            {guide.title}
                                        </h2>
                                        <p className="mb-6 text-xs leading-relaxed font-light text-cream/80 sm:text-sm">
                                            {guide.summary}
                                        </p>

                                        <div className="flex flex-wrap gap-3">
                                            <Link
                                                href={guide.relatedServiceHref}
                                                className="inline-flex min-h-[44px] items-center gap-1.5 border border-gold/35 bg-gold/[0.06] px-4 py-2.5 text-[0.68rem] font-bold tracking-[0.15em] text-gold uppercase no-underline transition-colors hover:border-gold hover:bg-gold/15"
                                            >
                                                <span>{guide.relatedServiceLabel}</span>
                                                <ArrowUpRight size={13} aria-hidden="true" />
                                            </Link>
                                            <Link
                                                href="/contact"
                                                className="inline-flex min-h-[44px] items-center gap-1.5 border border-cream/20 px-4 py-2.5 text-[0.68rem] font-bold tracking-[0.15em] text-cream/85 uppercase no-underline transition-colors hover:border-gold/50 hover:text-gold"
                                            >
                                                <BookOpen size={13} aria-hidden="true" />
                                                <span>{t('requestWalkthrough')}</span>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="border-t border-gold/15 pt-6 lg:col-span-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                                        <div className="mb-4 text-[0.65rem] font-black tracking-[0.2em] text-gold uppercase">
                                            {t('checklistHeading')}
                                        </div>
                                        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            {guide.checklist.map((item, idx) => (
                                                <li
                                                    key={item}
                                                    className="flex items-start gap-2.5 border border-cream/10 bg-navy/70 p-3.5 text-xs leading-relaxed text-cream/85"
                                                >
                                                    <span className="font-mono text-[0.65rem] font-bold text-gold">
                                                        {String(idx + 1).padStart(2, '0')}
                                                    </span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}
