import { notFound, redirect } from 'next/navigation'
import { getListingBySlug } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const listing = await getListingBySlug(slug).catch(() => null)
  if (!listing) notFound()
  const state = (listing.state ?? '').toLowerCase().replace(/\s+/g, '-')
  const city = (listing.city ?? '').toLowerCase().replace(/\s+/g, '-')
  redirect(`/iv-therapy-clinics/${state}/${city}/${slug}`)
}
