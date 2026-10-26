import type { PortableTextBlock } from '@portabletext/react'


export interface SanityImage {
    _type: 'image'
    asset: {
        _ref: string
        _type: 'reference'
    }
}

export interface Post {
    _id: string
    title: string
    slug: { current: string }
    mainImage?: SanityImage
    excerpt?: string
    body?: PortableTextBlock[]
    publishedAt?: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null
}

export function isPost(value: unknown): value is Post {
    if (!isRecord(value) || typeof value._id !== 'string' || typeof value.title !== 'string') return false
    return isRecord(value.slug) && typeof value.slug.current === 'string'
}