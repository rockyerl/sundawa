import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildAlternates, SITE_NAME, SITE_URL } from '@/lib/Seo'
import { BlogPostDetail, getPostBySlug, getPostSlugs, isPostTranslated } from '@/src/features/blog'
import { BreadcrumbJsonLd } from '@/src/shared/ui'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
    const { locale, slug } = await params
    const post = await getPostBySlug(slug, locale)
    if (!post) return {}

    const hasEnglishTranslation = isPostTranslated(slug)
    let alternates
    if (hasEnglishTranslation) {
        alternates = buildAlternates(locale, `/blog/${slug}`)
    } else {
        // Only Indonesian version exists — do not emit invalid en hreflang for Indonesian-only content
        alternates = {
            canonical: `${SITE_URL}/id/blog/${slug}`,
            languages: {
                id: `${SITE_URL}/id/blog/${slug}`,
                'x-default': `${SITE_URL}/id/blog/${slug}`,
            },
        }
    }

    const image = post.main_image_url || '/og-image.png'
    return {
        title: post.title,
        description: post.excerpt,
        alternates,
        openGraph: {
            type: 'article',
            url: alternates.canonical,
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
    const idSlugs = await getPostSlugs('id')
    const enSlugs = await getPostSlugs('en')
    return [
        ...idSlugs.map((s) => ({ locale: 'id', slug: s.slug })),
        ...enSlugs.map((s) => ({ locale: 'en', slug: s.slug })),
    ]
}

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>
}) {
    const { locale, slug } = await params
    setRequestLocale(locale)

    const post = await getPostBySlug(slug, locale)
    if (!post) {
        notFound()
    }

    const t = await getTranslations({ locale, namespace: 'blog' })
    const canonical = isPostTranslated(slug)
        ? buildAlternates(locale, `/blog/${slug}`).canonical
        : `${SITE_URL}/id/blog/${slug}`

    return (
        <>
            <BreadcrumbJsonLd
                breadcrumbs={[
                    { name: t('navTitle'), url: `/${locale}/blog` },
                    { name: post.title, url: `/${locale}/blog/${post.slug}` },
                ]}
            />
            <BlogPostDetail
                post={post}
                canonicalUrl={canonical}
                backToBlogLabel={t('backToBlog')}
                locale={locale}
            />
        </>
    )
}
