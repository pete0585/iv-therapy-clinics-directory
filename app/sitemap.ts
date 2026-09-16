import {articles as editorialArticles} from '@/lib/editorial-blog'
import type { MetadataRoute } from 'next'
import { discoverCityPageFolders } from '@/lib/city-pages'
import { SITE_URL } from '@/lib/site'
import { createStaticClient } from '@/lib/supabase/server'
import { stateSlug, citySlug } from '@/lib/utils'
import { TREATMENT_SLUGS } from '@/lib/types'

async function originalSitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createStaticClient()

  const urls: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/iv-therapy-clinics`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  for (const folder of discoverCityPageFolders()) {
    urls.push({
      url: `${SITE_URL}/best/${folder}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  }

  // Treatment pages
  for (const slug of Object.keys(TREATMENT_SLUGS)) {
    urls.push({
      url: `${SITE_URL}/iv-therapy/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  }

  // Listings
  const { data: listings } = await supabase
    .from('iv_therapy_clinics_listings')
    .select('slug, city, state, updated_at')
    .eq('is_active', true)
    .eq('is_approved', true)
    .limit(5000)

  if (listings) {
    const seen = new Set<string>()

    for (const listing of listings) {
      const stateParam = stateSlug(listing.state)
      const cityParam = citySlug(listing.city)

      const statePath = `${SITE_URL}/iv-therapy-clinics/${stateParam}`
      if (!seen.has(statePath)) {
        seen.add(statePath)
        urls.push({ url: statePath, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 })
      }

      const cityPath = `${SITE_URL}/iv-therapy-clinics/${stateParam}/${cityParam}`
      if (!seen.has(cityPath)) {
        seen.add(cityPath)
        urls.push({ url: cityPath, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 })
      }

      urls.push({
        url: `${SITE_URL}/listings/${listing.slug}`,
        lastModified: new Date(listing.updated_at),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  }

  return urls
}

export default async function editorialSitemap():Promise<MetadataRoute.Sitemap>{const existing=await originalSitemap();const site="https://ivtherapyclinicfinder.com";return [...existing,{url:site+'/blog',changeFrequency:'weekly'},...editorialArticles().map(p=>({url:site+'/blog/'+p.slug,lastModified:new Date(p.date),changeFrequency:'monthly' as const}))]}
