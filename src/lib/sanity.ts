import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Replace with your Sanity project ID and dataset
const config = {
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'your-sanity-project-id',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.VITE_SANITY_TOKEN, // Only if you need to write data
}

export const sanityClient = createClient(config)

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}