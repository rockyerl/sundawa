import { ArrowUpRight, Mail, MapPin, ShieldCheck } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/src/i18n/navigation'
import { buildMailtoUrl, COMPANY_CONTACT } from '@/lib/contact'
import SubpageNav from '@/src/shared/ui/SubpageNav'
import CookiePreferencesButton from './CookiePreferencesButton'

export type LegalDocKey =
    | 'privacyPolicy'
    | 'termsOfUse'
    | 'cookiePolicy'
    | 'disclaimer'
    | 'responsibleDisclosure'
    | 'dpa'

interface LegalSectionItem {
    id: string
    heading: string
    paragraphs: string[]
    bullets?: string[]
}

interface LegalTableSpec {
    title: string
    headers: string[]
    rows: string[][]
}

interface LegalDocumentPageProps {
    docKey: LegalDocKey
    mailSubject: string
    showCookieControls?: boolean
}

export default async function LegalDocumentPage({
    docKey,
    mailSubject,
    showCookieControls = false,
}: LegalDocumentPageProps) {
    const tCommon = await getTranslations('legalCommon')
    const t = await getTranslations(`legalDocs.${docKey}`)

    const sections = t.raw('sections') as LegalSectionItem[]
    const table = t.has('table') ? (t.raw('table') as LegalTableSpec) : null

    return (
        <div className="min-h-screen bg-navy text-cream">
            <SubpageNav backLabel={tCommon('navBack')} titleLabel={t('navTitle')} />

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

                    <div className="max-w-4xl">
                        <h1 className="mb-4 text-[clamp(2rem,4.2vw,3.3rem)] leading-[1.1] font-black text-cream">
                            {t('title')}
                        </h1>
                        <p className="mb-6 text-sm leading-relaxed font-light text-cream/80 sm:text-base">
                            {t('subtitle')}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs">
                            <span className="border border-gold/30 bg-gold/10 px-3 py-1 font-bold tracking-wider text-gold uppercase">
                                {tCommon('lastUpdatedLabel')}: {t('lastUpdated')}
                            </span>
                            <span className="border border-sky/30 bg-sky/10 px-3 py-1 font-bold tracking-wider text-sky uppercase">
                                {t('jurisdictionBadge')}
                            </span>
                            {showCookieControls && (
                                <CookiePreferencesButton
                                    label={tCommon('manageCookiesCta')}
                                    className="inline-flex min-h-[36px] cursor-pointer items-center border border-cream/30 bg-[#0E1E30] px-3.5 py-1 text-xs font-bold tracking-wider text-cream uppercase transition-colors hover:border-gold hover:text-gold"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Body with Sticky TOC */}
            <section className="py-14 md:py-20">
                <div className="container-main">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                        {/* Sticky Table of Contents */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-24 space-y-6">
                                <nav
                                    aria-label={tCommon('tocHeading')}
                                    className="border border-gold/20 bg-[#0E1E30] p-5"
                                >
                                    <div className="mb-3 text-[0.65rem] font-black tracking-[0.2em] text-gold uppercase">
                                        {tCommon('tocHeading')}
                                    </div>
                                    <ol className="space-y-2 text-xs">
                                        {sections.map((sec, idx) => (
                                            <li key={sec.id}>
                                                <a
                                                    href={`#${sec.id}`}
                                                    className="flex items-start gap-2 text-cream/80 no-underline transition-colors hover:text-gold"
                                                >
                                                    <span className="font-mono text-[0.65rem] text-gold/80">
                                                        {String(idx + 1).padStart(2, '0')}
                                                    </span>
                                                    <span>{sec.heading}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ol>
                                </nav>

                                {/* Official Legal & Privacy Contact Card */}
                                <div className="border border-gold/25 bg-[#081320] p-5">
                                    <div className="mb-2 flex items-center gap-2 text-[0.65rem] font-black tracking-[0.18em] text-gold uppercase">
                                        <ShieldCheck size={14} aria-hidden="true" />
                                        <span>{tCommon('contactBox.title')}</span>
                                    </div>
                                    <p className="mb-3 text-xs font-bold text-cream">
                                        {COMPANY_CONTACT.name}
                                    </p>
                                    <div className="mb-4 space-y-2 text-xs text-cream/80">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={13} className="flex-shrink-0 text-gold/80" aria-hidden="true" />
                                            <span>{COMPANY_CONTACT.location}</span>
                                        </div>
                                        <a
                                            href={buildMailtoUrl(mailSubject)}
                                            className="inline-flex items-center gap-2 font-semibold text-gold no-underline hover:underline"
                                        >
                                            <Mail size={13} className="flex-shrink-0" aria-hidden="true" />
                                            <span>{COMPANY_CONTACT.email}</span>
                                        </a>
                                    </div>
                                    <p className="text-[0.7rem] leading-relaxed text-cream/75">
                                        {tCommon('contactBox.subjectHint', { subject: mailSubject })}
                                    </p>
                                </div>
                            </div>
                        </aside>

                        {/* Structured Sections */}
                        <div className="space-y-8 lg:col-span-8">
                            {table && (
                                <div className="overflow-x-auto border border-gold/25 bg-[#081320]">
                                    <div className="border-b border-gold/15 px-5 py-3.5 text-xs font-black tracking-[0.18em] text-gold uppercase">
                                        {table.title}
                                    </div>
                                    <table className="w-full min-w-[600px] border-collapse text-left text-xs">
                                        <thead>
                                            <tr className="border-b border-gold/20 bg-[#0E1E30] text-[0.62rem] font-extrabold tracking-[0.16em] text-gold uppercase">
                                                {table.headers.map((header) => (
                                                    <th key={header} className="px-4 py-3">
                                                        {header}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gold/10 bg-navy">
                                            {table.rows.map((row) => (
                                                <tr key={row[0]}>
                                                    {row.map((cell, cellIdx) => (
                                                        <td
                                                            key={`${row[0]}-${cellIdx}`}
                                                            className={`px-4 py-3 leading-relaxed ${
                                                                cellIdx === 0
                                                                    ? 'font-bold text-cream'
                                                                    : 'text-cream/80'
                                                            }`}
                                                        >
                                                            {cell}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {sections.map((section, idx) => (
                                <section
                                    key={section.id}
                                    id={section.id}
                                    className="border border-gold/15 bg-[#0E1E30] p-6 sm:p-7"
                                >
                                    <div className="mb-2 font-mono text-[0.65rem] font-bold tracking-[0.2em] text-gold/85 uppercase">
                                        {tCommon('sectionPrefix')} {String(idx + 1).padStart(2, '0')}
                                    </div>
                                    <h2 className="mb-3 text-lg font-black text-cream sm:text-xl">
                                        {section.heading}
                                    </h2>
                                    <div className="space-y-3 text-xs leading-relaxed font-light text-cream/85 sm:text-sm">
                                        {section.paragraphs.map((paragraph) => (
                                            <p key={paragraph}>{paragraph}</p>
                                        ))}
                                    </div>
                                    {section.bullets && section.bullets.length > 0 && (
                                        <ul className="mt-4 space-y-2 border-t border-cream/10 pt-4">
                                            {section.bullets.map((bullet) => (
                                                <li
                                                    key={bullet}
                                                    className="flex items-start gap-2.5 text-xs leading-relaxed text-cream/85 sm:text-sm"
                                                >
                                                    <span
                                                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-gold"
                                                        aria-hidden="true"
                                                    />
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </section>
                            ))}

                            {/* Related Legal & Trust Links */}
                            <div className="border border-gold/25 bg-[#081320] p-6">
                                <div className="mb-3 text-[0.65rem] font-black tracking-[0.2em] text-gold uppercase">
                                    {tCommon('relatedHeading')}
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {[
                                        { href: '/trust-center', label: tCommon('links.trustCenter') },
                                        { href: '/privacy-policy', label: tCommon('links.privacyPolicy') },
                                        { href: '/terms-of-use', label: tCommon('links.termsOfUse') },
                                        { href: '/cookie-policy', label: tCommon('links.cookiePolicy') },
                                        { href: '/disclaimer', label: tCommon('links.disclaimer') },
                                        { href: '/responsible-disclosure', label: tCommon('links.responsibleDisclosure') },
                                        { href: '/dpa', label: tCommon('links.dpa') },
                                    ].map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="inline-flex min-h-[40px] items-center gap-1.5 border border-gold/25 bg-navy px-3.5 py-2 text-xs font-semibold text-cream/85 no-underline transition-colors hover:border-gold hover:text-gold"
                                        >
                                            <span>{item.label}</span>
                                            <ArrowUpRight size={12} aria-hidden="true" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
