import { SITE_URL } from '@/lib/Seo'

interface BreadcrumbItem {
    name: string
    url: string
}

interface BreadcrumbJsonLdProps {
    breadcrumbs: BreadcrumbItem[]
}

export default function BreadcrumbJsonLd({ breadcrumbs }: BreadcrumbJsonLdProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: SITE_URL,
            },
            ...breadcrumbs.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 2,
                name: item.name,
                item: `${SITE_URL}${item.url}`,
            })),
        ],
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
    )
}
