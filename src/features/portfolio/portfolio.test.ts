import { describe, expect, it } from 'vitest'
import idMessages from '@/messages/id.json'
import enMessages from '@/messages/en.json'
import type { PortfolioProject } from '@/lib/types'
import {
    localizePortfolioProject,
    localizePortfolioProjects,
    type PortfolioTranslationItem,
} from './domain'

describe('portfolio localization', () => {
    const mockRawProject: PortfolioProject = {
        id: '123',
        slug: 'dacar-by-undp',
        num: '04',
        name: 'DACAR by UNDP',
        initials: 'UNDP',
        type: 'Platform Distribusi Dana Tunai Digital',
        desc: 'Aplikasi distribusi dana berbasis acara yang dikembangkan menjadi platform digital yang lebih luas.',
        confidential: false,
        challenge: 'Mengadaptasi aplikasi distribusi dana tunai berbasis acara...',
        architecture: 'Arsitektur aplikasi lintas platform...',
        role: 'Berkontribusi dalam pengembangan platform digital...',
        impact: 'Memperluas kemampuan aplikasi...',
    }

    it('translates project fields when English translation items are provided', () => {
        const enItems = enMessages.clients.items as PortfolioTranslationItem[]
        const translated = localizePortfolioProject(mockRawProject, enItems)

        expect(translated.type).toBe('Digital Cash Fund Distribution Platform')
        expect(translated.desc).toBe(
            'An event-based fund-distribution app extended into a broader digital platform.'
        )
        expect(translated.challenge).toContain('Adapting an event-oriented cash fund distribution')
        expect(translated.architecture).toContain('Cross-platform application architecture')
        expect(translated.role).toContain('Contributed to the development of the digital platform')
        expect(translated.impact).toContain('Extended the application capabilities')
    })

    it('translates multiple projects across portfolio lists', () => {
        const enItems = enMessages.clients.items as PortfolioTranslationItem[]
        const rawList: PortfolioProject[] = [
            mockRawProject,
            {
                id: '456',
                slug: 'e-office',
                num: '05',
                name: 'E-Office',
                initials: 'EO',
                type: 'Sistem Administrasi Perkantoran Terintegrasi',
                desc: 'Platform digital untuk persuratan...',
                confidential: false,
                challenge: 'Digitalisasi proses persuratan...',
                architecture: 'Arsitektur modular...',
                role: 'Menyelesaikan pengembangan...',
                impact: 'Menyediakan platform digital...',
            },
        ]

        const translatedList = localizePortfolioProjects(rawList, enItems)
        expect(translatedList[0].type).toBe('Digital Cash Fund Distribution Platform')
        expect(translatedList[1].type).toBe('Integrated Office Administration System')
        expect(translatedList[1].desc).toBe(
            'A digital platform for correspondence, document disposition, and internal administration.'
        )
    })

    it('falls back safely to original project if no matching translation is found or items are empty', () => {
        const unknownProject: PortfolioProject = {
            id: '999',
            slug: 'custom-internal-app',
            num: '99',
            name: 'Custom Internal App',
            initials: 'CI',
            type: 'Internal Tool',
            desc: 'Custom tool without translation key.',
            confidential: true,
            challenge: 'Internal challenge',
            architecture: 'Internal architecture',
            role: 'Internal role',
            impact: 'Internal impact',
        }

        const fallback = localizePortfolioProject(unknownProject, [])
        expect(fallback).toEqual(unknownProject)

        const fallbackUndefined = localizePortfolioProject(unknownProject, undefined)
        expect(fallbackUndefined).toEqual(unknownProject)
    })
})
