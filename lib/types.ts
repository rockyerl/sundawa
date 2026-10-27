export interface Post {
    id: string
    title: string
    slug: string
    body_html: string
    excerpt?: string
    main_image_url?: string
    published_at?: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null
}

export function isPost(value: unknown): value is Post {
    if (!isRecord(value) || typeof value.id !== 'string' || typeof value.title !== 'string') return false
    return typeof value.slug === 'string' && typeof value.body_html === 'string'
}