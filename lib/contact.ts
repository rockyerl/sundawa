export const COMPANY_CONTACT = {
    name: 'PT Sundawa Teknologi Indonesia',
    shortName: 'Sundawa Teknologi',
    email: 'contact@sundawa.net',
    emailHref: 'mailto:contact@sundawa.net',
    phoneDisplay: '0823 1808 7980',
    phoneInternational: '+62 823-1808-7980',
    phoneSchema: '+6282318087980',
    telHref: 'tel:+6282318087980',
    waNumber: '6282318087980',
    waBaseUrl: 'https://wa.me/6282318087980',
    linkedinUrl: 'https://www.linkedin.com/company/sundawa-teknologi-indonesia',
} as const

export function buildWhatsAppUrl(message?: string): string {
    if (!message) return COMPANY_CONTACT.waBaseUrl
    return `${COMPANY_CONTACT.waBaseUrl}?text=${encodeURIComponent(message)}`
}

export function buildMailtoUrl(subject?: string, body?: string): string {
    const params = new URLSearchParams()
    if (subject) params.set('subject', subject)
    if (body) params.set('body', body)
    const query = params.toString()
    return query ? `${COMPANY_CONTACT.emailHref}?${query}` : COMPANY_CONTACT.emailHref
}
