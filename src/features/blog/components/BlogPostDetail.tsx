import Image from 'next/image'
import { Link } from '@/src/i18n/navigation'
import { urlFor } from '@/lib/sanity'
import { SITE_URL } from '@/lib/Seo'
import type { Post } from '@/lib/types'
import PortableTextRenderer from './PortableTextRenderer'

interface BlogPostDetailProps {
    post: Post
    canonicalUrl: string
    backToBlogLabel: string
}

export default function BlogPostDetail({ post, canonicalUrl, backToBlogLabel }: BlogPostDetailProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        image: post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : `${SITE_URL}/og-image.png`,
        mainEntityOfPage: canonicalUrl,
        author: { '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
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
                    href="/#blog"
                    className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#DBC977]/70 hover:text-[#DBC977] transition-colors duration-300 mb-10"
                >
                    ← {backToBlogLabel}
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

