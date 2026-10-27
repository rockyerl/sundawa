import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { pageMetadata } from '@/lib/Seo'
import { BlogArchive, getPosts, searchPosts } from '@/src/features/blog'

export async function generateMetadata({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
    const { locale } = await params
    const { q } = await searchParams
    if (q?.trim()) {
        return {
            title: `Search results for "${q.trim()}" - Blog - Sundawa`,
            description: `Search results for "${q.trim()}" in Sundawa Teknologi blog.`,
            alternates: {
                languages: {
                    id: `/id/blog?q=${encodeURIComponent(q.trim())}`,
                    en: `/en/blog?q=${encodeURIComponent(q.trim())}`,
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
                searchNoResults: t('searchNoResults'),
                searchResultsCount: t('searchResultsCount'),
            }}
        />
    )
}
