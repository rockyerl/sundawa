type PublicEnvironment = {
    sanityProjectId: string
    sanityDataset: string
}

function required(name: string, value: string | undefined): string {
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`)
    }

    return value
}

export function getPublicEnvironment(): PublicEnvironment {
    return {
        sanityProjectId: required('NEXT_PUBLIC_SANITY_PROJECT_ID', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID),
        sanityDataset: required('NEXT_PUBLIC_SANITY_DATASET', process.env.NEXT_PUBLIC_SANITY_DATASET),
    }
}
