import type { IndustrySpec } from './types'

export const INDUSTRY_SPECS: readonly IndustrySpec[] = [
    {
        slug: 'banking-financial-services',
        num: '01',
        code: 'IND-FIN',
        recommendedServiceParam: 'integrasi-sistem',
        proofHref: '/products/laku-pandai',
        secondaryProofHref: '/trust-center',
    },
    {
        slug: 'manufacturing-industrial',
        num: '02',
        code: 'IND-MFG',
        recommendedServiceParam: 'modernisasi-sistem',
        proofHref: '/products/sundawa-people',
        secondaryProofHref: '/calculator',
    },
    {
        slug: 'logistics-supply-chain',
        num: '03',
        code: 'IND-LOG',
        recommendedServiceParam: 'otomatisasi-ai',
        proofHref: '/products/nawasanga',
        secondaryProofHref: '/calculator',
    },
    {
        slug: 'healthcare',
        num: '04',
        code: 'IND-HLT',
        recommendedServiceParam: 'integrasi-sistem',
        proofHref: '/portfolio',
        secondaryProofHref: '/trust-center',
    },
    {
        slug: 'government-public-sector',
        num: '05',
        code: 'IND-GOV',
        recommendedServiceParam: 'modernisasi-sistem',
        proofHref: '/products/si-geomedik',
        secondaryProofHref: '/trust-center',
    },
    {
        slug: 'international-organizations',
        num: '06',
        code: 'IND-INT',
        recommendedServiceParam: 'platform-khusus',
        proofHref: '/portfolio',
        secondaryProofHref: '/partners',
    },
] as const
