import { describe, expect, it } from 'vitest'
import { createAdminSessionToken, verifyAdminSessionToken } from './adminAuth'

describe('admin session auth tokens', () => {
    it('creates deterministic HMAC tokens and verifies matching secrets', () => {
        const token = createAdminSessionToken('super-secret-password')
        expect(token).toMatch(/^[a-f0-9]{64}$/)
        expect(verifyAdminSessionToken(token, 'super-secret-password')).toBe(true)
    })

    it('rejects missing, tampered, or mismatched tokens', () => {
        const token = createAdminSessionToken('secret-a')
        expect(verifyAdminSessionToken(undefined, 'secret-a')).toBe(false)
        expect(verifyAdminSessionToken('true', 'secret-a')).toBe(false)
        expect(verifyAdminSessionToken(token, 'secret-b')).toBe(false)
        expect(verifyAdminSessionToken(token, undefined)).toBe(false)
    })
})
