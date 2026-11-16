'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ArrowUpRight, CheckCircle2, Compass, ShieldCheck, Target } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/navigation'
import { SITE_URL } from '@/lib/Seo'
import SubpageNav from '@/src/shared/ui/SubpageNav'
import { ABOUT_STUDIO_IMAGE } from '../team'
import AboutSectionHeader from './AboutSectionHeader'
import CeoGreetingSpread from './CeoGreetingSpread'
import LeadershipShowcase, { type LeadershipMemberCopy } from './LeadershipShowcase'

interface SectorProofItem {
    sector: string
    proof: string
}

interface PillarItem {
    num: string
    tag: string
    title: string
    body: string
    checkpoints: string[]
}

interface MissionPoint {
    num: string
    body: string
}

interface ValueItem {
    num: string
    title: string
    body: string
}

interface GovernanceItem {
    title: string
    desc: string
}

export default function AboutPage() {
    const t = useTranslations('aboutPage')
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    const sectors = t.raw('criticalSectors.items') as SectorProofItem[]
    const governanceItems = t.raw('governance.items') as GovernanceItem[]
    const pillars = t.raw('howWeWork.pillars') as PillarItem[]
    const missions = t.raw('visionMission.missions') as MissionPoint[]
    const values = t.raw('values.items') as ValueItem[]
    const leadership = t.raw('leadership.members') as LeadershipMemberCopy[]
    const stoicQuote = t.raw('ceoGreeting.stoicQuote') as {
        tag: string
        quote: string
        author: string
        bridge: string
    }
    const ceoParagraphs = t.raw('ceoGreeting.paragraphs') as string[]

    const stats = [
        { num: '30+', label: t('stats.projects') },
        { num: '15+', label: t('stats.clients') },
        { num: '5+', label: t('stats.years') },
        { num: '10+', label: t('stats.professionals') },
    ]

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        mainEntity: { '@id': `${SITE_URL}/#organization` },
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />
            <SubpageNav backLabel={t('navBack')} titleLabel={t('navTitle')} backHref="/" />

            <section ref={ref} className="relative overflow-hidden py-14 md:py-20">
                <div
                    className="pointer-events-none absolute top-0 right-0 left-0 h-[560px]"
                    style={{
                        background:
                            'radial-gradient(ellipse 75% 55% at 75% 15%, rgba(0,86,170,0.16), transparent 72%)',
                    }}
                />

                <div className="container-main relative z-10">
                    {/* Executive Hero & Company Profile + Studio Visual Frame */}
                    <div className="mb-16 border-b border-gold/20 pb-16">
                        <div className="mb-5 flex flex-wrap items-center gap-3">
                            <span className="text-xs font-extrabold tracking-[0.26em] text-gold uppercase">
                                — {t('eyebrow')}
                            </span>
                            <span className="border border-gold/35 bg-gold/[0.08] px-3 py-1 text-[0.65rem] font-extrabold tracking-[0.16em] text-gold uppercase">
                                {t('slogan')}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
                            {/* Left Column: Corporate Narrative */}
                            <div className="lg:col-span-7">
                                <motion.h1
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5 }}
                                    className="mb-6 text-[clamp(2.2rem,4.2vw,3.5rem)] leading-[1.06] font-black tracking-tight text-cream"
                                >
                                    {t('title')}
                                </motion.h1>

                                <div className="mb-8 border-l-2 border-gold pl-5">
                                    <div className="mb-2 text-[0.65rem] font-black tracking-[0.2em] text-gold uppercase">
                                        {t('profileLabel')}
                                    </div>
                                    <p className="text-base leading-[1.85] font-light text-cream/85 sm:text-lg">
                                        {t('subtitle')}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-4">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 bg-gold px-7 py-3.5 text-xs font-black tracking-[0.16em] text-navy uppercase no-underline transition-shadow hover:shadow-[0_0_28px_rgba(219,201,119,0.45)]"
                                    >
                                        <span>{t('heroCtaPrimary')}</span>
                                        <ArrowUpRight size={15} aria-hidden="true" />
                                    </Link>
                                    <Link
                                        href="/products"
                                        className="inline-flex items-center gap-2 border border-gold/35 bg-gold/[0.04] px-6 py-3.5 text-xs font-bold tracking-[0.16em] text-gold uppercase no-underline transition-colors hover:border-gold hover:bg-gold/10"
                                    >
                                        <span>{t('heroCtaSecondary')}</span>
                                        <ArrowRight size={14} aria-hidden="true" />
                                    </Link>
                                </div>
                            </div>

                            {/* Right Column: Studio Image Placeholder + Enterprise Metrics Matrix */}
                            <div className="flex flex-col border border-gold/25 bg-navy lg:col-span-5">
                                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-gold/20 bg-[#07111D]">
                                    <Image
                                        src={ABOUT_STUDIO_IMAGE}
                                        alt={t('studioCard.title')}
                                        fill
                                        priority
                                        unoptimized
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 42vw"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent" />
                                    <div className="absolute right-4 bottom-4 left-4">
                                        <span className="mb-1 inline-block border border-gold/30 bg-navy/85 px-2.5 py-0.5 text-[0.56rem] font-extrabold tracking-[0.16em] text-gold uppercase backdrop-blur-sm">
                                            {t('studioCard.badge')}
                                        </span>
                                        <p className="text-sm font-bold text-cream">
                                            {t('studioCard.title')}
                                        </p>
                                        <p className="mt-0.5 text-[0.65rem] text-cream/55">
                                            {t('studioCard.caption')}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-[1px] bg-gold/15">
                                    {stats.map((stat) => (
                                        <div key={stat.label} className="bg-navy p-5">
                                            <div className="mb-1 text-2xl font-black leading-none text-gold sm:text-3xl">
                                                {stat.num}
                                            </div>
                                            <div className="text-[0.58rem] font-bold tracking-[0.14em] text-cream/50 uppercase">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Regulated & Critical Sectors Proof Strip */}
                    <div className="mb-20">
                        <AboutSectionHeader
                            label={t('criticalSectors.label')}
                            action={
                                <Link
                                    href="/portfolio"
                                    className="inline-flex flex-shrink-0 items-center gap-1 text-[0.65rem] font-extrabold tracking-[0.16em] text-gold uppercase no-underline transition-colors hover:text-cream"
                                >
                                    <span>{t('criticalSectors.ctaPortfolio')}</span>
                                    <ArrowUpRight size={13} aria-hidden="true" />
                                </Link>
                            }
                        />

                        <div className="grid grid-cols-1 gap-[1px] border border-gold/15 bg-gold/15 sm:grid-cols-2 lg:grid-cols-5">
                            {sectors.map((item) => (
                                <div key={item.sector} className="flex flex-col justify-between bg-navy p-5">
                                    <div className="mb-3 flex items-center gap-2 text-[0.62rem] font-extrabold tracking-[0.16em] text-gold uppercase">
                                        <ShieldCheck size={13} className="flex-shrink-0" aria-hidden="true" />
                                        <span>{item.sector}</span>
                                    </div>
                                    <p className="text-xs leading-relaxed font-light text-cream/75">
                                        {item.proof}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dual Discipline: Professional Precision & Customer Comfort */}
                    <div className="mb-20">
                        <AboutSectionHeader
                            label={t('howWeWork.label')}
                            heading={t('howWeWork.heading')}
                        />

                        <div className="grid grid-cols-1 gap-[1px] border border-gold/20 bg-gold/20 lg:grid-cols-2">
                            {pillars.map((pillar) => (
                                <div
                                    key={pillar.num}
                                    className="flex flex-col justify-between bg-navy p-7 sm:p-9"
                                >
                                    <div>
                                        <div className="mb-5 flex items-center justify-between gap-2">
                                            <span className="border border-gold/30 bg-gold/[0.07] px-3 py-1 text-[0.6rem] font-extrabold tracking-[0.18em] text-gold uppercase">
                                                {pillar.tag}
                                            </span>
                                            <span className="text-2xl font-black text-gold/25">
                                                {pillar.num}
                                            </span>
                                        </div>

                                        <h3 className="mb-4 text-2xl font-black text-cream">
                                            {pillar.title}
                                        </h3>

                                        <p className="mb-6 text-sm leading-[1.85] font-light text-cream/75">
                                            {pillar.body}
                                        </p>
                                    </div>

                                    <ul className="flex flex-col gap-2.5 border-t border-gold/15 pt-5">
                                        {pillar.checkpoints.map((point) => (
                                            <li
                                                key={point}
                                                className="flex items-start gap-2.5 text-xs font-medium text-cream/85"
                                            >
                                                <CheckCircle2
                                                    size={14}
                                                    className="mt-0.5 flex-shrink-0 text-gold"
                                                    aria-hidden="true"
                                                />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CEO Message Spread + Portrait Avatar + Stoic Epigraph */}
                    <CeoGreetingSpread
                        label={t('ceoGreeting.label')}
                        stoicQuote={stoicQuote}
                        paragraphs={ceoParagraphs}
                        authorName={t('ceoGreeting.authorName')}
                        authorRole={t('ceoGreeting.authorRole')}
                    />

                    {/* Executive Leadership Showcase with Avatar Portraits */}
                    <LeadershipShowcase
                        label={t('leadership.label')}
                        heading={t('leadership.heading')}
                        members={leadership}
                    />

                    {/* Enterprise Engagement Governance Readiness */}
                    <div className="mb-20">
                        <AboutSectionHeader
                            label={t('governance.label')}
                            heading={t('governance.heading')}
                            action={
                                <Link
                                    href="/proses-kerja"
                                    className="inline-flex flex-shrink-0 items-center gap-1 text-[0.65rem] font-extrabold tracking-[0.16em] text-gold uppercase no-underline transition-colors hover:text-cream"
                                >
                                    <span>{t('governance.ctaProcess')}</span>
                                    <ArrowUpRight size={13} aria-hidden="true" />
                                </Link>
                            }
                        />

                        <div className="grid grid-cols-1 gap-[1px] border border-gold/20 bg-gold/20 sm:grid-cols-2 lg:grid-cols-4">
                            {governanceItems.map((item, idx) => (
                                <div key={item.title} className="bg-navy p-6">
                                    <span className="mb-3 block text-[0.62rem] font-black tracking-[0.2em] text-gold/60">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className="mb-2.5 text-sm font-bold text-cream">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs leading-[1.75] font-light text-cream/70">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Visi & Misi */}
                    <div className="mb-20">
                        <AboutSectionHeader label={t('visionMission.label')} />

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                            <div className="flex flex-col justify-between border border-gold/25 bg-dark-slate/35 p-7 sm:p-9 lg:col-span-5">
                                <div>
                                    <div className="mb-4 flex items-center gap-2 text-xs font-black tracking-[0.2em] text-gold uppercase">
                                        <Compass size={15} aria-hidden="true" />
                                        <span>{t('visionMission.visionLabel')}</span>
                                    </div>
                                    <p className="text-lg leading-[1.8] font-semibold text-cream sm:text-xl">
                                        {t('visionMission.vision')}
                                    </p>
                                </div>
                                <div className="mt-8 h-px w-16 bg-gold/50" />
                            </div>

                            <div className="border border-gold/15 bg-gold/[0.02] p-7 sm:p-9 lg:col-span-7">
                                <div className="mb-5 flex items-center gap-2 text-xs font-black tracking-[0.2em] text-gold uppercase">
                                    <Target size={15} aria-hidden="true" />
                                    <span>{t('visionMission.missionLabel')}</span>
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {missions.map((mission) => (
                                        <div
                                            key={mission.num}
                                            className="border border-gold/15 bg-navy/95 p-5"
                                        >
                                            <div className="mb-2 text-xs font-black tracking-widest text-gold">
                                                {mission.num}
                                            </div>
                                            <p className="text-xs leading-[1.75] font-light text-cream/80">
                                                {mission.body}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 6 Nilai Perusahaan */}
                    <div className="mb-20">
                        <AboutSectionHeader label={t('values.label')} heading={t('values.heading')} />

                        <div className="grid grid-cols-1 gap-[1px] border border-gold/15 bg-gold/15 md:grid-cols-2 lg:grid-cols-3">
                            {values.map((value) => (
                                <div
                                    key={value.title}
                                    className="group relative bg-navy p-7 transition-colors duration-200 hover:bg-dark-slate/45"
                                >
                                    <div
                                        className="pointer-events-none absolute top-0 right-0 left-0 h-[2px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                        style={{
                                            background:
                                                'linear-gradient(to right, #DBC977, rgba(219,201,119,0))',
                                        }}
                                    />
                                    <div className="mb-3 text-[0.65rem] font-black tracking-[0.2em] text-gold/65">
                                        {value.num}
                                    </div>
                                    <h3 className="mb-2.5 text-base font-bold text-cream">
                                        {value.title}
                                    </h3>
                                    <p className="text-xs leading-[1.8] font-light text-cream/70">
                                        {value.body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Boardroom Executive CTA */}
                    <div className="border border-gold/30 bg-gradient-to-br from-dark-slate/50 via-navy to-navy p-8 text-center sm:p-14">
                        <span className="mb-3 inline-block text-[0.65rem] font-extrabold tracking-[0.26em] text-gold uppercase">
                            — {t('cta.eyebrow')}
                        </span>
                        <h2 className="mx-auto mb-4 max-w-2xl text-[clamp(1.6rem,2.8vw,2.4rem)] leading-tight font-black text-cream">
                            {t('cta.title')}
                        </h2>
                        <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed font-light text-cream/70 sm:text-base">
                            {t('cta.subtitle')}
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-gold px-8 py-4 text-xs font-black tracking-[0.18em] text-navy uppercase no-underline transition-shadow hover:shadow-[0_0_30px_rgba(219,201,119,0.45)]"
                            >
                                <span>{t('cta.button')}</span>
                                <ArrowRight size={14} aria-hidden="true" />
                            </Link>
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 border border-gold/35 bg-navy/80 px-8 py-4 text-xs font-bold tracking-[0.16em] text-gold uppercase no-underline transition-colors hover:border-gold hover:bg-gold/10"
                            >
                                <span>{t('cta.secondaryButton')}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
