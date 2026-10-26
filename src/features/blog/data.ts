import { cache } from 'react'
import { client } from '@/lib/sanity'
import { postBySlugQuery, postSlugsQuery, postsQuery } from '@/lib/Queries'
import { isPost, type Post } from '@/lib/types'

export type PostSlug = { slug: string }

export const getPosts = cache(async (): Promise<Post[]> => {
    const posts = await client.fetch<unknown[]>(postsQuery)
    return (posts ?? []).filter(isPost)
})

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
    const post = await client.fetch<unknown>(postBySlugQuery, { slug })
    return isPost(post) ? post : null
})

export const getPostSlugs = cache(async (): Promise<PostSlug[]> => {
    return (await client.fetch<PostSlug[]>(postSlugsQuery)) ?? []
})
