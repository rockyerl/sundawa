import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImage } from './types'
import { getPublicEnvironment } from './env'

const { sanityProjectId, sanityDataset } = getPublicEnvironment()

export const client = createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: '2024-01-01',
    useCdn: true,
})

const builder = createImageUrlBuilder(client)
export const urlFor = (source: SanityImage) => builder.image(source)