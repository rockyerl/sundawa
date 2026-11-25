export const COOKIE_CONSENT_STORAGE_KEY = 'sundawa_cookie_consent_v1'
export const COOKIE_CONSENT_VERSION = '1.0'

export interface CookieConsentRecord {
    version: string
    updatedAt: string
    necessary: true
    analytics: boolean
    marketing: boolean
}

export interface CookieConsentInput {
    analytics: boolean
    marketing: boolean
}

const CONSENT_CHANGED_EVENT = 'sundawa:cookie-consent-changed'
const OPEN_PREFERENCES_EVENT = 'sundawa:cookie-preferences-open'

export function createConsentRecord(
    input: CookieConsentInput,
    now: Date = new Date(),
): CookieConsentRecord {
    return {
        version: COOKIE_CONSENT_VERSION,
        updatedAt: now.toISOString(),
        necessary: true,
        analytics: Boolean(input.analytics),
        marketing: Boolean(input.marketing),
    }
}

export function parseConsentRecord(raw: string | null): CookieConsentRecord | null {
    if (!raw) return null
    try {
        const parsed = JSON.parse(raw) as Partial<CookieConsentRecord>
        if (
            typeof parsed !== 'object' ||
            parsed === null ||
            parsed.version !== COOKIE_CONSENT_VERSION ||
            typeof parsed.analytics !== 'boolean' ||
            typeof parsed.marketing !== 'boolean' ||
            typeof parsed.updatedAt !== 'string'
        ) {
            return null
        }
        return {
            version: COOKIE_CONSENT_VERSION,
            updatedAt: parsed.updatedAt,
            necessary: true,
            analytics: parsed.analytics,
            marketing: parsed.marketing,
        }
    } catch {
        return null
    }
}

export function readStoredConsent(): CookieConsentRecord | null {
    if (typeof window === 'undefined') return null
    try {
        return parseConsentRecord(window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY))
    } catch {
        return null
    }
}

export function saveConsent(input: CookieConsentInput): CookieConsentRecord {
    const record = createConsentRecord(input)
    if (typeof window !== 'undefined') {
        try {
            window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(record))
        } catch {
            // Ignore storage quota / private mode failures gracefully
        }
        window.dispatchEvent(new CustomEvent<CookieConsentRecord>(CONSENT_CHANGED_EVENT, { detail: record }))
    }
    return record
}

export function hasAnalyticsConsent(): boolean {
    return readStoredConsent()?.analytics === true
}

export function openCookiePreferences(): void {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(OPEN_PREFERENCES_EVENT))
    }
}

export function subscribeConsentChanges(
    listener: (record: CookieConsentRecord | null) => void,
): () => void {
    if (typeof window === 'undefined') return () => {}
    const handler = (event: Event) => {
        const custom = event as CustomEvent<CookieConsentRecord>
        listener(custom.detail ?? readStoredConsent())
    }
    window.addEventListener(CONSENT_CHANGED_EVENT, handler)
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, handler)
}

export function subscribeOpenPreferences(listener: () => void): () => void {
    if (typeof window === 'undefined') return () => {}
    window.addEventListener(OPEN_PREFERENCES_EVENT, listener)
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, listener)
}
