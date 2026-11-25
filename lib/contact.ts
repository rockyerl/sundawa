export const COMPANY_CONTACT = {
    name: 'PT Sundawa Teknologi Indonesia',
    shortName: 'Sundawa Teknologi',
    location: 'Bandung, Jawa Barat, Indonesia',
    email: 'contact@sundawa.net',
    emailHref: 'mailto:contact@sundawa.net',
    // Role-based contacts currently route to contact@sundawa.net until dedicated mail aliases are provisioned
    emails: {
        general: 'contact@sundawa.net',
        sales: 'contact@sundawa.net',
        partnership: 'contact@sundawa.net',
        privacy: 'contact@sundawa.net',
        legal: 'contact@sundawa.net',
        security: 'contact@sundawa.net',
    },
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

export function buildMailtoUrl(subject?: string, body?: string, recipient?: string): string {
    const targetHref = recipient ? `mailto:${recipient}` : COMPANY_CONTACT.emailHref
    const params = new URLSearchParams()
    if (subject) params.set('subject', subject)
    if (body) params.set('body', body)
    const query = params.toString()
    return query ? `${targetHref}?${query}` : targetHref
}
