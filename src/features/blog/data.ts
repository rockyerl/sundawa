import { supabase } from '@/lib/supabase'
import { isPost, type Post } from '@/lib/types'

export type PostSlug = { slug: string; published_at?: string; updated_at?: string }

export async function getPosts(): Promise<Post[]> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('published_at', { ascending: false })
        .not('published_at', 'is', null)

    if (error) {
        console.error('[blog] failed to load posts:', error)
        return []
    }

    return (data ?? []).filter(isPost)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error || !data) return null
    return isPost(data) ? data : null
}

export async function getPostSlugs(): Promise<PostSlug[]> {
    const { data, error } = await supabase
        .from('posts')
        .select('slug, published_at, updated_at')
        .not('published_at', 'is', null)

    if (error) {
        console.error('[blog] failed to load slugs:', error)
        return []
    }

    return (data ?? []).map(row => ({
        slug: row.slug as string,
        published_at: row.published_at as string | undefined,
        updated_at: row.updated_at as string | undefined,
    }))
}

export async function searchPosts(query: string): Promise<Post[]> {
    if (!query.trim()) return getPosts()

    const escaped = query.trim().replace(/[{}]/g, '\\$&')
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .or(`title.ilike.%${escaped}%,excerpt.ilike.%${escaped}%,body_html.ilike.%${escaped}%`)
        .order('published_at', { ascending: false })
        .not('published_at', 'is', null)

    if (error) {
        console.error('[blog] failed to search posts:', error)
        return []
    }

    return (data ?? []).filter(isPost)
}
