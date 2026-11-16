import type { PortfolioProject } from '@/lib/types'

export interface PortfolioTranslationItem {
    num?: string
    name?: string
    initials?: string
    type?: string
    desc?: string
    confidential?: boolean
    details?: {
        challenge?: string
        architecture?: string
        role?: string
        impact?: string
    }
}

export function localizePortfolioProject(
    project: PortfolioProject,
    translationItems?: PortfolioTranslationItem[]
): PortfolioProject {
    if (!translationItems || !Array.isArray(translationItems) || translationItems.length === 0) {
        return project
    }

    const matched = translationItems.find((it) => {
        if (it.num && project.num && it.num.trim() === project.num.trim()) return true
        if (it.name && project.name && it.name.trim().toLowerCase() === project.name.trim().toLowerCase()) return true
        return false
    })

    if (!matched) return project

    return {
        ...project,
        type: matched.type || project.type,
        desc: matched.desc || project.desc,
        challenge: matched.details?.challenge || project.challenge,
        architecture: matched.details?.architecture || project.architecture,
        role: matched.details?.role || project.role,
        impact: matched.details?.impact || project.impact,
    }
}

export function localizePortfolioProjects(
    projects: PortfolioProject[],
    translationItems?: PortfolioTranslationItem[]
): PortfolioProject[] {
    if (!translationItems || !Array.isArray(translationItems) || translationItems.length === 0) {
        return projects
    }
    return projects.map((project) => localizePortfolioProject(project, translationItems))
}
