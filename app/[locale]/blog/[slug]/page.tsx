import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildAlternates, SITE_NAME } from '@/lib/Seo'
import { BlogPostDetail, getPostBySlug, getPostSlugs } from '@/src/features/blog'
import { routing } from '@/src/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params
    const post = await getPostBySlug(slug)
    if (!post) return {}
    const { canonical } = buildAlternates(locale, `/blog/${slug}`)
    const image = post.main_image_url || '/og-image.png'
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
            publishedTime: post.published_at,
            images: [{ url: image, width: 1200, height: 630, alt: post.title }],
        },
        twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt, images: [image] },
    }
}

// Generate static params for all slugs across supported locales (SSG)
export async function generateStaticParams() {
    const slugs = await getPostSlugs()
    return routing.locales.flatMap((locale) =>
        slugs.map((s) => ({ locale, slug: s.slug }))
    )
}

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>
}) {
    const { locale, slug } = await params
    setRequestLocale(locale)

    const post = await getPostBySlug(slug)
    if (!post) {
        notFound()
    }

    const t = await getTranslations({ locale, namespace: 'blog' })
    const { canonical } = buildAlternates(locale, `/blog/${slug}`)

    return (
        <BlogPostDetail
            post={post}
            canonicalUrl={canonical}
            backToBlogLabel={t('backToBlog')}
        />
    )
}
