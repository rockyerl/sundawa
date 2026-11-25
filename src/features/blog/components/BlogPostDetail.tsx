import Image from 'next/image'
import { ArrowUpRight, FolderGit2, Layers, MessageSquareText } from 'lucide-react'
import { Link } from '@/src/i18n/navigation'
import { SITE_URL } from '@/lib/Seo'
import type { Post } from '@/lib/types'
import HtmlRenderer from './MdxRenderer'

interface BlogPostDetailProps {
    post: Post
    canonicalUrl: string
    backToBlogLabel: string
    locale?: string
}

interface ArticleGateway {
    serviceHref: string
    serviceName: string
    serviceTag: string
    caseStudyHref: string
    caseStudyName: string
    caseStudyTag: string
    contactHref: string
    contactLabel: string
}

function getArticleGateway(slug: string, isEn: boolean): ArticleGateway {
    if (slug === 'kapan-erp-perlu-diintegrasikan-dimodernisasi-atau-diganti') {
        return {
            serviceHref: isEn ? '/services/system-integration' : '/services/integrasi-sistem',
            serviceName: isEn ? 'Enterprise ERP & System Integration' : 'Integrasi ERP & Sistem Perusahaan',
            serviceTag: isEn ? 'Core Service' : 'Layanan Terkait',
            caseStudyHref: '/products/nawasanga',
            caseStudyName: isEn ? 'Nawasanga: Enterprise ERP & IoT Telematics Integration' : 'Nawasanga: Integrasi ERP & Telematika IoT Korporat',
            caseStudyTag: isEn ? 'Reference Case Study' : 'Studi Kasus Rujukan',
            contactHref: isEn ? '/contact?service=system-integration&topic=Otomatisasi%20%26%20Integrasi%20Data' : '/contact?service=integrasi-sistem&topic=Otomatisasi%20%26%20Integrasi%20Data',
            contactLabel: isEn ? 'Schedule 30-Minute ERP Discovery' : 'Jadwalkan Diskusi Integrasi ERP 30 Menit',
        }
    }

    if (slug === 'apa-yang-perlu-disiapkan-sebelum-migrasi-sistem-lama') {
        return {
            serviceHref: isEn ? '/services/system-modernization' : '/services/modernisasi-sistem',
            serviceName: isEn ? 'Legacy System Modernization' : 'Modernisasi Sistem Lama',
            serviceTag: isEn ? 'Core Service' : 'Layanan Terkait',
            caseStudyHref: '/portfolio/dacar-by-undp',
            caseStudyName: isEn ? 'DACAR by UNDP: Multi-Platform Modernization' : 'DACAR by UNDP: Modernisasi Sistem Misi-Kritis',
            caseStudyTag: isEn ? 'Verified Case Study' : 'Studi Kasus Relevan',
            contactHref: isEn ? '/contact?service=system-modernization&topic=Modernisasi%20Sistem%20Lama' : '/contact?service=modernisasi-sistem&topic=Modernisasi%20Sistem%20Lama',
            contactLabel: isEn ? 'Consult Your System Migration Plan' : 'Konsultasikan Rencana Migrasi Anda',
        }
    }

    if (slug === 'kapan-perusahaan-membutuhkan-aplikasi-bisnis-custom') {
        return {
            serviceHref: isEn ? '/services/custom-platform' : '/services/platform-khusus',
            serviceName: isEn ? 'Custom Business Platform Engineering' : 'Platform Bisnis Khusus & Custom Apps',
            serviceTag: isEn ? 'Core Service' : 'Layanan Terkait',
            caseStudyHref: '/portfolio/e-office',
            caseStudyName: isEn ? 'E-Office: Integrated Digital Administration' : 'E-Office: Tata Usaha Perkantoran Terintegrasi',
            caseStudyTag: isEn ? 'Verified Case Study' : 'Studi Kasus Relevan',
            contactHref: isEn ? '/contact?service=custom-platform&topic=Pengembangan%20Aplikasi%20Baru' : '/contact?service=platform-khusus&topic=Pengembangan%20Aplikasi%20Baru',
            contactLabel: isEn ? 'Discuss Your Custom Platform Requirements' : 'Diskusikan Aplikasi Bisnis Custom Anda',
        }
    }

    return {
        serviceHref: isEn ? '/services' : '/services',
        serviceName: isEn ? 'Software Modernization & Engineering Services' : 'Layanan Rekayasa & Modernisasi Sistem',
        serviceTag: isEn ? 'Core Service' : 'Layanan Terkait',
        caseStudyHref: '/portfolio/dacar-by-undp',
        caseStudyName: 'DACAR by UNDP: Multi-Platform Digital Distribution',
        caseStudyTag: isEn ? 'Featured Case Study' : 'Studi Kasus Pilihan',
        contactHref: isEn ? '/contact?service=system-integration' : '/contact?service=integrasi-sistem',
        contactLabel: isEn ? 'Consult Your Architecture with Sundawa' : 'Konsultasikan Arsitektur Anda Bersama Sundawa',
    }
}

export default function BlogPostDetail({ post, canonicalUrl, backToBlogLabel, locale }: BlogPostDetailProps) {
    const isEn = locale === 'en'
    const gateway = getArticleGateway(post.slug, isEn)
    const imageUrl = post.main_image_url || `${SITE_URL}/og-image.png`

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.published_at,
        dateModified: post.published_at,
        image: imageUrl,
        mainEntityOfPage: canonicalUrl,
        author: { '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        articleSection: 'Technology',
    }

    return (
        <main className="relative min-h-screen pt-28 pb-16 md:pt-32 md:pb-24" style={{ background: '#0E1E30' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />
            <article className="container-main max-w-3xl mx-auto min-w-0">
                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#DBC977]/70 hover:text-[#DBC977] transition-colors duration-300 mb-10"
                >
                    ← {backToBlogLabel}
                </Link>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        {post.published_at && (
                            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#DBC977]/50">
                                {new Date(post.published_at).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </span>
                        )}
                        <span className="inline-flex items-center border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[9px] font-extrabold tracking-[0.14em] text-gold uppercase">
                            Bahasa Indonesia
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-[#F8F8F8] leading-tight break-words">
                        {post.title}
                    </h1>
                    {post.excerpt && (
                        <p className="mt-5 text-base md:text-lg text-cream/75 leading-relaxed">
                            {post.excerpt}
                        </p>
                    )}
                </div>

                {/* Main image */}
                {post.main_image_url && (
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-12">
                        <Image
                            src={post.main_image_url}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 768px"
                            priority
                        />
                    </div>
                )}

                {/* Body content */}
                <div className="prose prose-invert max-w-none break-words text-[#F8F8F8]/80 prose-img:rounded-xl prose-pre:overflow-x-auto">
                    {post.body_html && <HtmlRenderer source={post.body_html} />}
                </div>

                {/* Related Service, Case Study, & Consultation Gateway */}
                <div className="mt-16 border border-gold/30 bg-gradient-to-br from-[#0E1E30] via-navy to-[#071322] p-6 sm:p-8 rounded-xl shadow-xl">
                    <div className="mb-6 border-b border-gold/15 pb-4">
                        <span className="text-[0.65rem] font-extrabold tracking-[0.24em] text-gold uppercase flex items-center gap-2 mb-1">
                            <span className="h-0.5 w-4 bg-gold inline-block" aria-hidden="true" />
                            {isEn ? 'Engineering & Transformation Gateway' : 'Pintu Masuk Layanan & Rekam Jejak'}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-cream">
                            {isEn ? 'Connect Strategy with Direct Execution' : 'Hubungkan Strategi dengan Eksekusi Nyata'}
                        </h3>
                        <p className="mt-1 text-xs text-cream/75 leading-relaxed font-light">
                            {isEn
                                ? 'Explore the corresponding Sundawa service, review verified production case studies, or consult with our software architects.'
                                : 'Pelajari spesifikasi layanan teknis kami, telusuri studi kasus pengerjaan nyata di lingkungan produksi, atau jadwalkan konsultasi arsitektur.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {/* Service Box */}
                        <Link
                            href={gateway.serviceHref}
                            className="group flex flex-col justify-between border border-gold/20 bg-navy/80 p-5 no-underline transition-all duration-200 hover:border-gold hover:bg-gold/[0.05]"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[0.62rem] font-black tracking-wider uppercase text-sky">
                                        {gateway.serviceTag}
                                    </span>
                                    <Layers size={14} className="text-sky" aria-hidden="true" />
                                </div>
                                <h4 className="text-sm font-bold text-cream group-hover:text-gold transition-colors">
                                    {gateway.serviceName}
                                </h4>
                            </div>
                            <span className="mt-4 inline-flex items-center gap-1 text-[0.68rem] font-bold tracking-wider uppercase text-gold">
                                <span>{isEn ? 'View Service' : 'Lihat Layanan'}</span>
                                <ArrowUpRight size={12} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                        </Link>

                        {/* Case Study Box */}
                        <Link
                            href={gateway.caseStudyHref}
                            className="group flex flex-col justify-between border border-gold/20 bg-navy/80 p-5 no-underline transition-all duration-200 hover:border-gold hover:bg-gold/[0.05]"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[0.62rem] font-black tracking-wider uppercase text-gold">
                                        {gateway.caseStudyTag}
                                    </span>
                                    <FolderGit2 size={14} className="text-gold" aria-hidden="true" />
                                </div>
                                <h4 className="text-sm font-bold text-cream group-hover:text-gold transition-colors">
                                    {gateway.caseStudyName}
                                </h4>
                            </div>
                            <span className="mt-4 inline-flex items-center gap-1 text-[0.68rem] font-bold tracking-wider uppercase text-gold">
                                <span>{isEn ? 'View Case Study' : 'Lihat Studi Kasus'}</span>
                                <ArrowUpRight size={12} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                        </Link>
                    </div>

                    {/* Consultation CTA */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gold/15 pt-5">
                        <div className="text-xs text-cream/70 leading-relaxed text-center sm:text-left">
                            <span className="font-semibold text-cream">
                                {isEn ? 'Need an independent system dependency or architecture audit?' : 'Butuh audit arsitektur atau integrasi sistem independen?'}
                            </span>
                        </div>
                        <Link
                            href={gateway.contactHref}
                            className="inline-flex items-center gap-2 bg-gold px-5 py-3 text-xs font-black tracking-[0.14em] text-navy uppercase no-underline transition-shadow hover:shadow-[0_0_20px_rgba(219,201,119,0.4)] flex-shrink-0"
                        >
                            <MessageSquareText size={14} aria-hidden="true" />
                            <span>{gateway.contactLabel}</span>
                        </Link>
                    </div>
                </div>
            </article>
        </main>
    )
}

