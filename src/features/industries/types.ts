export type IndustrySlug =
    | 'banking-financial-services'
    | 'manufacturing-industrial'
    | 'logistics-supply-chain'
    | 'healthcare'
    | 'government-public-sector'
    | 'international-organizations'

export interface IndustrySpec {
    slug: IndustrySlug
    num: string
    code: string
    recommendedServiceParam: string
    proofHref: string
    secondaryProofHref: string
}

export interface IndustryChallengePair {
    challenge: string
    architecture: string
}

export interface LocalizedIndustryContent {
    name: string
    shortTag: string
    headline: string
    summary: string
    typicalSystems: string
    deploymentModel: string
    governanceFocus: string
    challengePairs: IndustryChallengePair[]
    deliverables: string[]
    proofTitle: string
    proofSummary: string
    proofCta: string
    secondaryProofCta: string
}

export interface IndustryItem extends IndustrySpec {
    content: LocalizedIndustryContent
}
