export const STORAGE_KEY = 'sundawa-intro-seen'
export const INTRO_FINISHED_EVENT = 'sundawa-intro-finished'

export function getIntroSeenSnapshot(): boolean {
    if (typeof window === 'undefined') return false

    try {
        return sessionStorage.getItem(STORAGE_KEY) === '1'
    } catch {
        return false
    }
}

export function subscribeIntroSeen(callback: () => void) {
    window.addEventListener(INTRO_FINISHED_EVENT, callback)
    return () => window.removeEventListener(INTRO_FINISHED_EVENT, callback)
}

export function markIntroSeen() {
    try {
        sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
        // Ignore storage errors.
    }

    window.dispatchEvent(new Event(INTRO_FINISHED_EVENT))
}