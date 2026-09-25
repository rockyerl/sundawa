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
    publishedAt: string
}