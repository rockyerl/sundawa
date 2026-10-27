import Image from 'next/image'
import { Link } from '@/src/i18n/navigation'
import { SITE_URL } from '@/lib/Seo'
import type { Post } from '@/lib/types'
import HtmlRenderer from './MdxRenderer'

interface BlogPostDetailProps {
    post: Post
    canonicalUrl: string
    backToBlogLabel: string
}

export default function BlogPostDetail({ post, canonicalUrl, backToBlogLabel }: BlogPostDetailProps) {
    const imageUrl = post.main_image_url || `${SITE_URL}/og-image.png`

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.published_at,
        image: imageUrl,
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
                    {post.published_at && (
                        <span className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#DBC977]/50 mb-4">
                            {new Date(post.published_at).toLocaleDateString('id-ID', {
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
            </article>
        </main>
    )
}

