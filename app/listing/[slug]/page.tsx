import { redirect, notFound } from 'next/navigation'
import { createStaticClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function ListingRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = createStaticClient()

  const { data: listing } = await supabase
    .from('iv_therapy_clinics_listings')
    .select('slug, city, state')
    .eq('slug', slug)
    .single()

  if (!listing) notFound()

  const state = listing.state.toLowerCase()
  const city = listing.city.toLowerCase().replace(/\s+/g, '-')

  redirect(`/iv-therapy-clinics/${state}/${city}/${listing.slug}`)
}
