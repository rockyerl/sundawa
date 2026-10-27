export function getGoogleAnalyticsId(): string | null {
    return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || null
}

export function getGoogleTagManagerId(): string | null {
    return process.env.NEXT_PUBLIC_GTM_ID || null
}
