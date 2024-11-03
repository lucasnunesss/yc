import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'


// This is the sanity read client for fetching data to queries
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
