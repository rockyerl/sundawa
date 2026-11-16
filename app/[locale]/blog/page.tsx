import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { pageMetadata, SITE_URL } from '@/lib/Seo'
import { BlogArchive, getPosts, searchPosts } from '@/src/features/blog'
import { BreadcrumbJsonLd } from '@/src/shared/ui'

export async function generateMetadata({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
    const { locale } = await params
    const { q } = await searchParams
    if (q?.trim()) {
        const query = q.trim()
        return {
            title: `Search: "${query}" — Blog`,
            description: `Search results for "${query}" in Sundawa Teknologi blog.`,
            robots: {
                index: false,
                follow: true,
            },
            alternates: {
                languages: {
                    id: `${SITE_URL}/id/blog?q=${encodeURIComponent(query)}`,
                    en: `${SITE_URL}/en/blog?q=${encodeURIComponent(query)}`,
                },
            },
        }
    }
    return pageMetadata(locale, 'blog', '/blog')
}

export default async function BlogPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ q?: string }> }) {
    const { locale } = await params
    const { q } = await searchParams
    setRequestLocale(locale)

    const t = await getTranslations({ locale, namespace: 'blog' })
    const query = q?.trim() ?? ''
    const posts = query ? await searchPosts(query) : await getPosts()

    return (
        <>
            <BreadcrumbJsonLd breadcrumbs={[{ name: 'Blog', url: `/${locale}/blog` }]}/>
            <BlogArchive
            posts={posts}
            initialQuery={query}
            translations={{
                navBack: t('navBack'),
                navTitle: t('navTitle'),
                eyebrow: t('eyebrow'),
                title: t('title'),
                subtitle: t('subtitle'),
                empty: t('empty'),
                readMore: t('readMore'),
                searchPlaceholder: t('searchPlaceholder'),
            }}
        />
        </>
    )
}
