export interface Post {
    _id: string
    title: string
    slug: {
        current: string
    }
    mainImage?: SanityImageSource
    excerpt?: string
    publishedAt: string
}