import { describe, expect, it } from 'vitest'
import { isPost, isPortfolioProject } from './types'

describe('Post validation', () => {
    it('accepts the minimum renderable post shape', () => {
        expect(isPost({
            id: 'post-1',
            title: 'A post',
            slug: 'a-post',
            body_html: '<h1>Hello</h1>',
        })).toBe(true)
    })

    it('rejects malformed or incomplete documents', () => {
        expect(isPost(null)).toBe(false)
        expect(isPost({ id: 'post-1', title: 'Missing slug' })).toBe(false)
        expect(isPost({ id: 42, title: 'Invalid id', slug: 'invalid', body_html: 'test' })).toBe(false)
    })
})

describe('PortfolioProject validation', () => {
    it('accepts a valid portfolio project', () => {
        expect(isPortfolioProject({
            id: 'proj-1',
            slug: 'project-one',
            num: '01',
            name: 'Project One',
            initials: 'PO',
            type: 'Web App',
            desc: 'A test project',
            confidential: false,
            challenge: 'Challenge text',
            architecture: 'Architecture text',
            role: 'Role text',
            impact: 'Impact text',
        })).toBe(true)
    })

    it('rejects malformed or incomplete documents', () => {
        expect(isPortfolioProject(null)).toBe(false)
        expect(isPortfolioProject({ id: 'proj-1', name: 'Missing fields' })).toBe(false)
        expect(isPortfolioProject({ id: 42, slug: 'invalid', name: 'Invalid id' })).toBe(false)
    })
})
