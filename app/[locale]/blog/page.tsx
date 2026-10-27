import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { pageMetadata } from '@/lib/Seo'
import { BlogArchive, getPosts } from '@/src/features/blog'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    return pageMetadata(locale, 'blog', '/blog')
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)

    const t = await getTranslations({ locale, namespace: 'blog' })
    const posts = await getPosts()

    return (
        <BlogArchive
            posts={posts}
            translations={{
                navBack: t('navBack'),
                navTitle: t('navTitle'),
                eyebrow: t('eyebrow'),
                title: t('title'),
                subtitle: t('subtitle'),
                empty: t('empty'),
                readMore: t('readMore'),
            }}
        />
    )
}
