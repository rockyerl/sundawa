import { describe, expect, it } from 'vitest'
import { isPost } from './types'

describe('Sanity post validation', () => {
    it('accepts the minimum renderable post shape', () => {
        expect(isPost({
            _id: 'post-1',
            title: 'A post',
            slug: { current: 'a-post' },
        })).toBe(true)
    })

    it('rejects malformed or incomplete documents', () => {
        expect(isPost(null)).toBe(false)
        expect(isPost({ _id: 'post-1', title: 'Missing slug' })).toBe(false)
        expect(isPost({ _id: 42, title: 'Invalid id', slug: { current: 'invalid' } })).toBe(false)
    })
})
