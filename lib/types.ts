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

export interface PortfolioProject {
    id: string
    slug: string
    num: string
    name: string
    initials: string
    type: string
    desc: string
    confidential: boolean
    challenge: string
    architecture: string
    role: string
    impact: string
    main_image_url?: string
    created_at?: string
    updated_at?: string
}

export function isPortfolioProject(value: unknown): value is PortfolioProject {
    if (!isRecord(value) || typeof value.id !== 'string') return false
    if (typeof value.slug !== 'string' || typeof value.name !== 'string') return false
    // Allow empty strings for optional-ish fields that have defaults
    if (typeof value.num !== 'string') value.num = ''
    if (typeof value.initials !== 'string') value.initials = value.name?.slice(0, 2).toUpperCase() ?? ''
    if (typeof value.type !== 'string') value.type = ''
    if (typeof value.desc !== 'string') value.desc = ''
    if (typeof value.challenge !== 'string') value.challenge = ''
    if (typeof value.architecture !== 'string') value.architecture = ''
    if (typeof value.role !== 'string') value.role = ''
    if (typeof value.impact !== 'string') value.impact = ''
    if (typeof value.confidential !== 'boolean') value.confidential = false
    return true
}