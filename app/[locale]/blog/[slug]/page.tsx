import type { Metadata } from 'next'
import { cache } from 'react'
import Image from 'next/image'
import { Link } from '@/src/i18n/navigation'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { client, urlFor } from '@/lib/sanity'
import { postBySlugQuery, postSlugsQuery } from '@/lib/Queries'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import type { Post } from '@/lib/types'
import { buildAlternates, SITE_URL, SITE_NAME } from '@/lib/Seo'

const getPost = cache((slug: string): Promise<Post | null> => client.fetch(postBySlugQuery, { slug }))

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params
    const post = await getPost(slug)
    if (!post) return {}
    const { canonical } = buildAlternates(locale, `/blog/${slug}`)
    const image = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : '/og-image.png'
    return {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical },
        openGraph: {
            type: 'article',
            url: canonical,
            siteName: SITE_NAME,
            title: post.title,
            description: post.excerpt,
            publishedTime: post.publishedAt,
            images: [{ url: image, width: 1200, height: 630, alt: post.title }],
        },
        twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt, images: [image] },
    }
}

// Generate static params buat semua slug yang ada (SSG)
export async function generateStaticParams() {
    const slugs: { slug: string }[] = await client.fetch(postSlugsQuery)
    return slugs.map((s) => ({ slug: s.slug }))
}

export default async function BlogDetailPage({
                                                 params,
                                             }: {
    params: Promise<{ locale: string; slug: string }>
}) {
    const { locale, slug } = await params
    const t = await getTranslations('blog')

    const post: Post | null = await getPost(slug)

    if (!post) {
        notFound()
    }

    const canonical = buildAlternates(locale, `/blog/${slug}`).canonical
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        image: post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : `${SITE_URL}/og-image.png`,
        mainEntityOfPage: canonical,
        author: { '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
    }

    return (
        <main className="relative min-h-screen pt-28 pb-16 md:pt-32 md:pb-24" style={{ background: '#0E1E30' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
            <article className="container-main max-w-3xl mx-auto min-w-0">
                {/* Back link */}
                <Link
                    href="/#blog"
                    className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#DBC977]/70 hover:text-[#DBC977] transition-colors duration-300 mb-10"
                >
                    ← {t('backToBlog')}
                </Link>

                {/* Header */}
                <div className="mb-10">
                    {post.publishedAt && (
                        <span className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#DBC977]/50 mb-4">
                            {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </span>
                    )}
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-[#F8F8F8] leading-tight break-words">
                        {post.title}
                    </h1>
                    {post.excerpt && (
                        <p className="mt-5 text-base md:text-lg text-[#F8F8F8]/60 leading-relaxed">
                            {post.excerpt}
                        </p>
                    )}
                </div>

                {/* Main image */}
                {post.mainImage && (
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-12">
                        <Image
                            src={urlFor(post.mainImage).width(1200).height(675).url()}
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
                    {post.body && <PortableTextRenderer value={post.body} />}
                </div>
            </article>
        </main>
    )
}