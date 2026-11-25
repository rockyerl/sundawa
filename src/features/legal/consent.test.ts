import { describe, expect, it } from 'vitest'
import {
    COOKIE_CONSENT_VERSION,
    createConsentRecord,
    parseConsentRecord,
} from './consent'

describe('cookie consent record domain', () => {
    it('creates a valid versioned consent record with necessary always true', () => {
        const fixedDate = new Date('2026-11-25T12:00:00.000Z')
        const record = createConsentRecord({ analytics: true, marketing: false }, fixedDate)

        expect(record).toEqual({
            version: COOKIE_CONSENT_VERSION,
            updatedAt: '2026-11-25T12:00:00.000Z',
            necessary: true,
            analytics: true,
            marketing: false,
        })
    })

    it('parses valid serialized JSON and rejects malformed or outdated versions', () => {
        const valid = createConsentRecord({ analytics: false, marketing: false })
        expect(parseConsentRecord(JSON.stringify(valid))).toEqual(valid)

        expect(parseConsentRecord(null)).toBeNull()
        expect(parseConsentRecord('not-json')).toBeNull()
        expect(
            parseConsentRecord(
                JSON.stringify({ version: '0.1', updatedAt: '2025-01-01', analytics: true, marketing: true }),
            ),
        ).toBeNull()
        expect(
            parseConsentRecord(
                JSON.stringify({ version: COOKIE_CONSENT_VERSION, updatedAt: '2026-01-01', analytics: 'yes', marketing: false }),
            ),
        ).toBeNull()
    })
})
