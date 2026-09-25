import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { client, urlFor } from '@/lib/sanity'
import { postBySlugQuery, postSlugsQuery } from '@/lib/Queries'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import type { Post } from '@/lib/types'

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
    const { slug } = await params
    const t = await getTranslations('blog')

    const post: Post | null = await client.fetch(postBySlugQuery, { slug })

    if (!post) {
        notFound()
    }

    return (
        <main className="relative min-h-screen pt-32 pb-24" style={{ background: '#0E1E30' }}>
            <article className="container-main max-w-3xl mx-auto">
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
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#F8F8F8] leading-tight">
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
                <div className="prose prose-invert max-w-none text-[#F8F8F8]/80">
                    {post.body && <PortableTextRenderer value={post.body} />}
                </div>
            </article>
        </main>
    )
}