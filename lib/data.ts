import { createStaticClient } from '@/lib/supabase/server'
import type { IvTherapyListing, BrowseFilters } from '@/lib/types'

const TABLE = 'iv_therapy_clinics_listings'
const PAGE_SIZE = 24

export async function getTotalCount(): Promise<number> {
  const supabase = createStaticClient()
  const { count } = await supabase
    .from(TABLE)
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)
    .eq('is_approved', true)
  return count ?? 0
}

export async function getFeaturedListings(limit = 6): Promise<IvTherapyListing[]> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .eq('listing_tier', 'featured')
    .order('listing_tier_rank', { ascending: true })
    .limit(limit)
  return (data ?? []) as IvTherapyListing[]
}

export async function getTopCities(limit = 24): Promise<{ city: string; state: string; count: number }[]> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from(TABLE)
    .select('city, state')
    .eq('is_active', true)
    .eq('is_approved', true)

  if (!data) return []

  const counts: Record<string, { city: string; state: string; count: number }> = {}
  for (const row of data) {
    const key = `${row.city}|${row.state}`
    if (!counts[key]) counts[key] = { city: row.city, state: row.state, count: 0 }
    counts[key].count++
  }

  return Object.values(counts)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

export async function getStateCounts(): Promise<Record<string, number>> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from(TABLE)
    .select('state')
    .eq('is_active', true)
    .eq('is_approved', true)

  if (!data) return {}

  const counts: Record<string, number> = {}
  for (const row of data) {
    counts[row.state] = (counts[row.state] ?? 0) + 1
  }
  return counts
}

export async function getListings(filters: BrowseFilters): Promise<{ listings: IvTherapyListing[]; total: number }> {
  const supabase = createStaticClient()
  const page = filters.page ?? 1
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from(TABLE)
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .eq('is_approved', true)

  if (filters.state) {
    query = query.ilike('state', filters.state)
  }
  if (filters.city) {
    query = query.ilike('city', filters.city.replace(/-/g, ' '))
  }
  if (filters.mobile) {
    query = query.eq('is_mobile', true)
  }
  if (filters.franchise) {
    query = query.eq('is_franchise', true)
  }
  if (filters.tier && filters.tier !== 'all') {
    query = query.eq('listing_tier', filters.tier)
  }
  if (filters.treatment) {
    const treatmentName = filters.treatment
    query = query.contains('services_offered', [treatmentName])
  }
  if (filters.q) {
    query = query.textSearch('search_vector', filters.q, { type: 'websearch' })
  }

  query = query
    .order('listing_tier_rank', { ascending: true })
    .order('listing_tier', { ascending: false })
    .order('name', { ascending: true })
    .range(from, to)

  const { data, count } = await query
  return { listings: (data ?? []) as IvTherapyListing[], total: count ?? 0 }
}

export async function getListingBySlug(slug: string): Promise<IvTherapyListing | null> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .single()
  return data as IvTherapyListing | null
}

export async function getListingById(id: string): Promise<IvTherapyListing | null> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single()
  return data as IvTherapyListing | null
}

export async function getCityListings(state: string, city: string): Promise<IvTherapyListing[]> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .ilike('state', state)
    .ilike('city', city.replace(/-/g, ' '))
    .order('listing_tier_rank', { ascending: true })
    .order('listing_tier', { ascending: false })
    .limit(100)
  return (data ?? []) as IvTherapyListing[]
}

export async function getStateListings(stateAbbrev: string): Promise<IvTherapyListing[]> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .ilike('state', stateAbbrev)
    .order('listing_tier_rank', { ascending: true })
    .order('listing_tier', { ascending: false })
    .limit(500)
  return (data ?? []) as IvTherapyListing[]
}

export async function getListingsByTreatment(treatment: string, limit = 24): Promise<IvTherapyListing[]> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .contains('services_offered', [treatment])
    .order('listing_tier_rank', { ascending: true })
    .order('listing_tier', { ascending: false })
    .limit(limit)
  return (data ?? []) as IvTherapyListing[]
}

export async function getNearbyListings(city: string, state: string, excludeSlug: string, limit = 4): Promise<IvTherapyListing[]> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .ilike('city', city)
    .ilike('state', state)
    .neq('slug', excludeSlug)
    .order('listing_tier_rank', { ascending: true })
    .limit(limit)
  return (data ?? []) as IvTherapyListing[]
}

export async function getFeaturedListingsByCity(state: string, city: string, limit = 6): Promise<IvTherapyListing[]> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .ilike('city', city.replace(/-/g, ' '))
    .ilike('state', state)
    .order('listing_tier_rank', { ascending: true })
    .limit(limit)
  return (data ?? []) as IvTherapyListing[]
}

// Admin queries — use service role
export async function getAllListingsAdmin(page = 1): Promise<{ listings: IvTherapyListing[]; total: number }> {
  const supabase = createStaticClient()
  const from = (page - 1) * 50
  const to = from + 49
  const { data, count } = await supabase
    .from(TABLE)
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)
  return { listings: (data ?? []) as IvTherapyListing[], total: count ?? 0 }
}
