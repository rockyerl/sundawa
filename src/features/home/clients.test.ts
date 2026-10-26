import { describe, expect, it } from 'vitest'
import { INITIAL_VISIBLE_CLIENTS } from './clients'

describe('clients feature contract', () => {
    it('keeps the initial grid bounded for scanability', () => {
        expect(INITIAL_VISIBLE_CLIENTS).toBe(6)
        expect(INITIAL_VISIBLE_CLIENTS).toBeGreaterThan(0)
    })
})
