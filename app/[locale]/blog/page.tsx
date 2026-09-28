import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/src/i18n/navigation'
import { client, urlFor } from '@/lib/sanity'
import { postsQuery } from '@/lib/Queries'
import type { Post } from '@/lib/types'
import { pageMetadata } from '@/lib/Seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    return pageMetadata(locale, 'blog', '/blog')
}

export default async function BlogPage() {
    const t = await getTranslations('blog')
    const posts: Post[] = await client.fetch(postsQuery)

    return (
        <main className="relative min-h-screen pt-28 pb-16 md:pt-32 md:pb-24" style={{ background: '#0E1E30' }}>
            <div className="container-main">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-10 md:mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px w-8 bg-[#DBC977]/40" />
                        <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#DBC977]/60">
                            {t('eyebrow')}
                        </span>
                        <div className="h-px w-8 bg-[#DBC977]/40" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#F8F8F8] break-words">
                        {t('title')}
                    </h1>
                    <p className="mt-4 max-w-xl text-sm md:text-base text-[#F8F8F8]/60">
                        {t('subtitle')}
                    </p>
                </div>

                {!posts.length ? (
                    <div
                        className="flex flex-col items-center justify-center text-center py-16 rounded-2xl"
                        style={{ background: 'rgba(248,248,248,0.03)', border: '1px dashed rgba(219,201,119,0.2)' }}
                    >
                        <p className="text-sm text-[#F8F8F8]/50">{t('empty')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {posts.map((post) => (
                            <Link
                                key={post._id}
                                href={`/blog/${post.slug.current}`}
                                className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 min-w-0"
                                style={{ background: 'rgba(248,248,248,0.03)', border: '1px solid rgba(219,201,119,0.12)' }}
                            >
                                {post.mainImage && (
                                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                                        <Image
                                            src={urlFor(post.mainImage).width(600).height(375).url()}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        <div
                                            className="absolute inset-0"
                                            style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(14,30,48,0.8) 100%)' }}
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col flex-1 p-5 md:p-6">
                                    {post.publishedAt && (
                                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#DBC977]/50 mb-3">
                                            {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    )}

                                    <h2 className="text-lg font-bold text-[#F8F8F8] leading-snug mb-3 break-words group-hover:text-[#DBC977] transition-colors duration-300">
                                        {post.title}
                                    </h2>

                                    {post.excerpt && (
                                        <p className="text-sm text-[#F8F8F8]/55 leading-relaxed line-clamp-3 mb-4">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    <span className="mt-auto inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-[#DBC977]">
                                        {t('readMore')}
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}