import { describe, expect, it } from 'vitest'
import { isPost } from './types'

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
