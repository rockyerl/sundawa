import { supabase } from '@/lib/supabase'
import { isPost, type Post } from '@/lib/types'
import { getPinnedPosts, isPostTranslated, PINNED_POSTS, PINNED_POSTS_EN } from './pinnedPosts'

export type PostSlug = { slug: string; published_at?: string; updated_at?: string }

export async function getPosts(locale = 'id'): Promise<Post[]> {
    let supabasePosts: Post[] = []
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('published_at', { ascending: false })
            .not('published_at', 'is', null)

        if (error) {
            console.error('[blog] failed to load posts:', error)
        } else {
            supabasePosts = (data ?? []).filter(isPost)
        }
    } catch (err) {
        console.error('[blog] unexpected error loading posts:', err)
    }

    const pinned = getPinnedPosts(locale)
    const pinnedSlugs = new Set(pinned.map((p) => p.slug))
    const nonPinnedFromSupabase = supabasePosts.filter((p) => !pinnedSlugs.has(p.slug))
    return [...pinned, ...nonPinnedFromSupabase]
}

export async function getPostBySlug(slug: string, locale = 'id'): Promise<Post | null> {
    const pinned = getPinnedPosts(locale).find((p) => p.slug === slug)
    if (pinned) return pinned

    if (locale === 'en' && !isPostTranslated(slug)) {
        return null
    }

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error || !data) return null
    return isPost(data) ? data : null
}

export async function getPostSlugs(locale?: string): Promise<PostSlug[]> {
    let supabaseSlugs: PostSlug[] = []
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('slug, published_at, updated_at')
            .not('published_at', 'is', null)

        if (!error && data) {
            supabaseSlugs = data.map((row) => ({
                slug: row.slug as string,
                published_at: row.published_at as string | undefined,
                updated_at: row.updated_at as string | undefined,
            }))
        }
    } catch (err) {
        console.error('[blog] unexpected error loading slugs:', err)
    }

    const pinned = getPinnedPosts(locale || 'id')
    const pinnedSlugs = new Set(pinned.map((p) => p.slug))
    const nonPinned = locale === 'en'
        ? []
        : supabaseSlugs.filter((p) => !pinnedSlugs.has(p.slug))

    const pinnedList: PostSlug[] = pinned.map((p) => ({
        slug: p.slug,
        published_at: p.published_at,
        updated_at: p.published_at,
    }))

    return [...pinnedList, ...nonPinned]
}

export async function searchPosts(query: string, locale = 'id'): Promise<Post[]> {
    if (!query.trim()) return getPosts(locale)

    const q = query.trim().toLowerCase()
    const pinned = getPinnedPosts(locale)
    const matchingPinned = pinned.filter(
        (p) =>
            p.title.toLowerCase().includes(q) ||
            (p.excerpt?.toLowerCase().includes(q) ?? false) ||
            p.body_html.toLowerCase().includes(q)
    )

    let supabasePosts: Post[] = []
    try {
        const escaped = query.trim().replace(/[{}]/g, '\\$&')
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .or(`title.ilike.%${escaped}%,excerpt.ilike.%${escaped}%,body_html.ilike.%${escaped}%`)
            .order('published_at', { ascending: false })
            .not('published_at', 'is', null)

        if (!error && data) {
            supabasePosts = data.filter(isPost)
        }
    } catch (err) {
        console.error('[blog] error searching posts:', err)
    }

    const pinnedSlugs = new Set(matchingPinned.map((p) => p.slug))
    const nonPinned = supabasePosts.filter((p) => !pinnedSlugs.has(p.slug))
    return [...matchingPinned, ...nonPinned]
}

export { isPostTranslated, PINNED_POSTS, PINNED_POSTS_EN }
