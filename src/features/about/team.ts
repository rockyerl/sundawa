export type LeaderId = 'rocky' | 'akbar' | 'velia'

export interface LeadershipSpec {
    id: LeaderId
    initials: string
    /** Replace placeholder SVG path with final real portrait path (e.g. '/assets/team/ceo-rocky.webp'). */
    avatarSrc: string
    isCeo?: boolean
}

export const ABOUT_STUDIO_IMAGE = '/assets/about-studio.svg'

export const LEADERSHIP_TEAM: readonly LeadershipSpec[] = [
    {
        id: 'rocky',
        initials: 'RR',
        avatarSrc: '/assets/team/ceo-rocky.svg',
        isCeo: true,
    },
    {
        id: 'akbar',
        initials: 'MA',
        avatarSrc: '/assets/team/cto-akbar.svg',
    },
    {
        id: 'velia',
        initials: 'VA',
        avatarSrc: '/assets/team/coo-velia.svg',
    },
] as const
