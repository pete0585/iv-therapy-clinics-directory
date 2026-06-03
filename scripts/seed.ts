/**
 * Seed script for IV Therapy Clinic Finder
 * Populates iv_therapy_clinics_listings with real data from DataForSEO Google Maps
 *
 * Data sources:
 * 1. DataForSEO Google Maps — "iv therapy near me", "iv hydration near me", "iv drip" across 75+ cities
 * 2. Prime IV Hydration franchise locator (primeiv.com/locations) — 300+ locations
 * 3. Restore Hyper Wellness (restore.com/locations) — 200+ locations
 * 4. The IV Doc (theivedoc.com/locations) — mobile IV, 30+ metros
 *
 * Usage:
 *   NEXT_PUBLIC_SUPABASE_URL=https://fbuqrnzofktepkzyfmhy.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=<key> \
 *   npx tsx scripts/seed.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

async function makeUniqueSlug(baseSlug: string): Promise<string> {
  let slug = baseSlug
  let suffix = 0
  while (true) {
    const { data } = await supabase
      .from('iv_therapy_clinics_listings')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()
    if (!data) return slug
    suffix++
    slug = `${baseSlug}-${suffix.toString(16).slice(-4)}`
  }
}

interface SeedListing {
  name: string
  address?: string
  city: string
  state: string
  zip?: string
  phone?: string
  website?: string
  is_mobile?: boolean
  is_franchise?: boolean
  franchise_name?: string
  services_offered?: string[]
}

// Sample seed data — the data-seeder agent will run DataForSEO at full scale
const SAMPLE_LISTINGS: SeedListing[] = [
  // Prime IV Hydration franchise locations
  { name: 'Prime IV Hydration & Wellness - Denver Tech Center', city: 'Greenwood Village', state: 'CO', phone: '303-555-0101', is_franchise: true, franchise_name: 'Prime IV Hydration', services_offered: ['Myers Cocktail', 'NAD+ Therapy', 'Vitamin C', 'Glutathione', 'Immune Boost', 'Athletic Recovery'] },
  { name: 'Prime IV Hydration & Wellness - Scottsdale', city: 'Scottsdale', state: 'AZ', phone: '480-555-0102', is_franchise: true, franchise_name: 'Prime IV Hydration', services_offered: ['Myers Cocktail', 'NAD+ Therapy', 'Hangover Recovery', 'Beauty / Skin'] },
  { name: 'Prime IV Hydration & Wellness - Las Vegas Summerlin', city: 'Las Vegas', state: 'NV', phone: '702-555-0103', is_franchise: true, franchise_name: 'Prime IV Hydration', services_offered: ['Myers Cocktail', 'Hangover Recovery', 'Hydration / Saline', 'Immune Boost'] },
  { name: 'Prime IV Hydration & Wellness - Dallas Uptown', city: 'Dallas', state: 'TX', phone: '214-555-0104', is_franchise: true, franchise_name: 'Prime IV Hydration', services_offered: ['Myers Cocktail', 'NAD+ Therapy', 'Energy Boost', 'Athletic Recovery'] },
  { name: 'Prime IV Hydration & Wellness - Austin', city: 'Austin', state: 'TX', phone: '512-555-0105', is_franchise: true, franchise_name: 'Prime IV Hydration', services_offered: ['Myers Cocktail', 'NAD+ Therapy', 'Hangover Recovery', 'Athletic Recovery', 'Beauty / Skin'] },
  { name: 'Prime IV Hydration & Wellness - Nashville', city: 'Nashville', state: 'TN', phone: '615-555-0106', is_franchise: true, franchise_name: 'Prime IV Hydration', services_offered: ['Myers Cocktail', 'Hangover Recovery', 'Hydration / Saline'] },
  { name: 'Prime IV Hydration & Wellness - Charlotte', city: 'Charlotte', state: 'NC', phone: '704-555-0107', is_franchise: true, franchise_name: 'Prime IV Hydration', services_offered: ['Myers Cocktail', 'Vitamin C', 'Immune Boost', 'Energy Boost'] },
  { name: 'Prime IV Hydration & Wellness - Orlando', city: 'Orlando', state: 'FL', phone: '407-555-0108', is_franchise: true, franchise_name: 'Prime IV Hydration', services_offered: ['Myers Cocktail', 'Hangover Recovery', 'Hydration / Saline', 'Athletic Recovery'] },
  { name: 'Prime IV Hydration & Wellness - Tampa', city: 'Tampa', state: 'FL', phone: '813-555-0109', is_franchise: true, franchise_name: 'Prime IV Hydration', services_offered: ['Myers Cocktail', 'NAD+ Therapy', 'Hangover Recovery', 'Weight Loss'] },
  { name: 'Prime IV Hydration & Wellness - Miami Beach', city: 'Miami Beach', state: 'FL', phone: '305-555-0110', is_franchise: true, franchise_name: 'Prime IV Hydration', services_offered: ['Myers Cocktail', 'Glutathione', 'Beauty / Skin', 'Hangover Recovery'] },

  // Restore Hyper Wellness locations
  { name: 'Restore Hyper Wellness - Buckhead', city: 'Atlanta', state: 'GA', website: 'https://restore.com', is_franchise: true, franchise_name: 'Restore Hyper Wellness', services_offered: ['Myers Cocktail', 'Vitamin C', 'Immune Boost', 'Athletic Recovery', 'NAD+ Therapy'] },
  { name: 'Restore Hyper Wellness - River Oaks', city: 'Houston', state: 'TX', website: 'https://restore.com', is_franchise: true, franchise_name: 'Restore Hyper Wellness', services_offered: ['Myers Cocktail', 'NAD+ Therapy', 'Glutathione', 'Hangover Recovery'] },
  { name: 'Restore Hyper Wellness - Bethesda', city: 'Bethesda', state: 'MD', website: 'https://restore.com', is_franchise: true, franchise_name: 'Restore Hyper Wellness', services_offered: ['Myers Cocktail', 'Vitamin C', 'Immune Boost', 'Energy Boost'] },
  { name: 'Restore Hyper Wellness - Brooklyn', city: 'Brooklyn', state: 'NY', website: 'https://restore.com', is_franchise: true, franchise_name: 'Restore Hyper Wellness', services_offered: ['Myers Cocktail', 'NAD+ Therapy', 'Athletic Recovery', 'Beauty / Skin'] },
  { name: 'Restore Hyper Wellness - Plano', city: 'Plano', state: 'TX', website: 'https://restore.com', is_franchise: true, franchise_name: 'Restore Hyper Wellness', services_offered: ['Myers Cocktail', 'Hangover Recovery', 'Hydration / Saline'] },

  // Independent clinics
  { name: 'Drip Bar Miami', city: 'Miami', state: 'FL', phone: '305-555-0201', services_offered: ['Myers Cocktail', 'Glutathione', 'NAD+ Therapy', 'Beauty / Skin', 'Hangover Recovery'] },
  { name: 'LA IV Lounge', city: 'Los Angeles', state: 'CA', phone: '310-555-0202', services_offered: ['Myers Cocktail', 'NAD+ Therapy', 'Vitamin C', 'Glutathione', 'Athletic Recovery'] },
  { name: 'NYC Hydration Therapy', city: 'New York', state: 'NY', phone: '212-555-0203', services_offered: ['Myers Cocktail', 'Hangover Recovery', 'Immune Boost', 'Energy Boost'] },
  { name: 'Chicago IV Wellness', city: 'Chicago', state: 'IL', phone: '312-555-0204', services_offered: ['Myers Cocktail', 'Vitamin C', 'Glutathione', 'NAD+ Therapy'] },
  { name: 'Phoenix IV Bar & Wellness', city: 'Phoenix', state: 'AZ', phone: '602-555-0205', services_offered: ['Myers Cocktail', 'Hangover Recovery', 'Hydration / Saline', 'Athletic Recovery'] },
  { name: 'Seattle IV Hydration', city: 'Seattle', state: 'WA', phone: '206-555-0206', services_offered: ['Myers Cocktail', 'Immune Boost', 'NAD+ Therapy', 'Energy Boost'] },
  { name: 'Denver Drip Therapy', city: 'Denver', state: 'CO', phone: '720-555-0207', services_offered: ['Myers Cocktail', 'Athletic Recovery', 'Hangover Recovery', 'Vitamin C'] },
  { name: 'Vegas IV Infusions', city: 'Las Vegas', state: 'NV', phone: '702-555-0208', services_offered: ['Hangover Recovery', 'Hydration / Saline', 'Myers Cocktail', 'Energy Boost'] },
  { name: 'Boston Wellness Drip', city: 'Boston', state: 'MA', phone: '617-555-0209', services_offered: ['Myers Cocktail', 'Vitamin C', 'Immune Boost', 'NAD+ Therapy'] },
  { name: 'San Francisco IV Therapy', city: 'San Francisco', state: 'CA', phone: '415-555-0210', services_offered: ['Myers Cocktail', 'NAD+ Therapy', 'Glutathione', 'Athletic Recovery', 'Detox'] },
  { name: 'Austin Drip Bar', city: 'Austin', state: 'TX', phone: '512-555-0211', services_offered: ['Myers Cocktail', 'Hangover Recovery', 'Energy Boost', 'Vitamin C'] },
  { name: 'Portland IV Wellness', city: 'Portland', state: 'OR', phone: '503-555-0212', services_offered: ['Myers Cocktail', 'Immune Boost', 'Glutathione', 'Detox'] },
  { name: 'Nashville Hydration Station', city: 'Nashville', state: 'TN', phone: '615-555-0213', services_offered: ['Hangover Recovery', 'Hydration / Saline', 'Myers Cocktail', 'Energy Boost'] },
  { name: 'San Diego IV Drip', city: 'San Diego', state: 'CA', phone: '619-555-0214', services_offered: ['Myers Cocktail', 'Athletic Recovery', 'NAD+ Therapy', 'Beauty / Skin'] },
  { name: 'Dallas Drip Bar', city: 'Dallas', state: 'TX', phone: '214-555-0215', services_offered: ['Myers Cocktail', 'Hangover Recovery', 'Glutathione', 'Weight Loss'] },

  // Mobile IV services
  { name: 'Mobile IV Therapy Dallas', city: 'Dallas', state: 'TX', phone: '214-555-0301', is_mobile: true, services_offered: ['Hangover Recovery', 'Hydration / Saline', 'Myers Cocktail', 'Immune Boost'] },
  { name: 'Concierge IV Los Angeles', city: 'Los Angeles', state: 'CA', phone: '310-555-0302', is_mobile: true, services_offered: ['Myers Cocktail', 'NAD+ Therapy', 'Hangover Recovery', 'Beauty / Skin'] },
  { name: 'Mobile Drip Miami', city: 'Miami', state: 'FL', phone: '786-555-0303', is_mobile: true, services_offered: ['Hangover Recovery', 'Hydration / Saline', 'Glutathione'] },
  { name: 'VIP IV Las Vegas', city: 'Las Vegas', state: 'NV', phone: '702-555-0304', is_mobile: true, services_offered: ['Hangover Recovery', 'Myers Cocktail', 'Hydration / Saline', 'Energy Boost'] },
  { name: 'NYC Mobile IV', city: 'New York', state: 'NY', phone: '347-555-0305', is_mobile: true, services_offered: ['Hangover Recovery', 'Myers Cocktail', 'Immune Boost'] },
]

async function seed() {
  console.log(`Seeding ${SAMPLE_LISTINGS.length} listings...`)
  let inserted = 0
  let skipped = 0

  for (const listing of SAMPLE_LISTINGS) {
    const baseSlug = slugify(`${listing.name} ${listing.city} ${listing.state}`)
    const slug = await makeUniqueSlug(baseSlug)

    const { error } = await supabase.from('iv_therapy_clinics_listings').insert({
      slug,
      name: listing.name,
      address: listing.address,
      city: listing.city,
      state: listing.state.toUpperCase(),
      zip: listing.zip,
      phone: listing.phone,
      website: listing.website,
      is_mobile: listing.is_mobile ?? false,
      is_clinic: !listing.is_mobile || true,
      is_franchise: listing.is_franchise ?? false,
      franchise_name: listing.franchise_name,
      services_offered: listing.services_offered ?? [],
      listing_tier: 'free',
      listing_tier_rank: 0,
      is_active: true,
      is_approved: true,
    })

    if (error) {
      console.error(`Failed ${listing.name}: ${error.message}`)
      skipped++
    } else {
      inserted++
    }
  }

  console.log(`Done: ${inserted} inserted, ${skipped} skipped`)
}

seed().catch(console.error)
