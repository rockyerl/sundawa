import type { Client } from '@/src/features/home/clients'
import type { PortfolioProject } from './types'

function clientToSlug(client: Client): string {
    return client.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function clientToPortfolio(client: Client): PortfolioProject {
    return {
        slug: clientToSlug(client),
        num: client.num,
        name: client.name,
        initials: client.initials,
        type: client.type,
        desc: client.desc,
        confidential: client.confidential,
        challenge: client.details.challenge,
        architecture: client.details.architecture,
        role: client.details.role,
        impact: client.details.impact,
    }
}

export function getPortfolioProjects(clients: Client[]): PortfolioProject[] {
    return clients.map(clientToPortfolio)
}

export function getPortfolioProjectBySlug(clients: Client[], slug: string): PortfolioProject | undefined {
    const project = getPortfolioProjects(clients).find((p) => p.slug === slug)
    return project
}
