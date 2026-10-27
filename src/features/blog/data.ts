import { cache } from 'react'
import { supabase } from '@/lib/supabase'
import { isPost, type Post } from '@/lib/types'

export type PostSlug = { slug: string }

export const getPosts = cache(async (): Promise<Post[]> => {
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
})

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error || !data) return null
    return isPost(data) ? data : null
})

export const getPostSlugs = cache(async (): Promise<PostSlug[]> => {
    const { data, error } = await supabase
        .from('posts')
        .select('slug')
        .not('published_at', 'is', null)

    if (error) {
        console.error('[blog] failed to load slugs:', error)
        return []
    }

    return (data ?? []).map(row => ({ slug: row.slug as string }))
})
