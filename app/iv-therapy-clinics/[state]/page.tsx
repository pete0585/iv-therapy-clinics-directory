import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getStateListings, getStateCityCounts } from '@/lib/data'
import { getStateName, US_STATES } from '@/lib/utils'

interface PageProps {
  params: Promise<{ state: string }>
}

export async function generateStaticParams() {
  return Object.keys(US_STATES).map(abbr => ({ state: abbr.toLowerCase() }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params
  const stateAbbr = state.toUpperCase()
  const stateName = getStateName(stateAbbr)

  return {
    title: `IV Therapy Clinics in ${stateName} — Find IV Drip Clinics by City`,
    description: `Directory of IV therapy and IV hydration clinics across ${stateName}. Browse by city. Compare Myers Cocktail, NAD+, hangover recovery, and mobile IV services statewide.`,
    openGraph: {
      url: `https://ivtherapyclinicfinder.com/iv-therapy-clinics/${state}`,
    },
  }
}

export default async function StatePage({ params }: PageProps) {
  const { state } = await params
  const stateAbbr = state.toUpperCase()

  if (!US_STATES[stateAbbr]) notFound()

  const stateName = getStateName(stateAbbr)
  const [stateListings, cityCounts] = await Promise.all([
    getStateListings(stateAbbr),
    getStateCityCounts(stateAbbr),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-brand-steel mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand-teal">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/listings" className="hover:text-brand-teal">IV Therapy Clinics</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-brand-navy font-medium">{stateName}</span>
      </nav>

      <h1 className="text-3xl font-bold text-brand-navy mb-2">
        {stateName} IV Therapy Clinic Directory
      </h1>
      <p className="text-brand-steel mb-8 max-w-2xl">
        {stateListings.length > 0
          ? `${stateListings.length} IV therapy ${stateListings.length === 1 ? 'clinic' : 'clinics'} listed across ${stateName}. Browse by city below.`
          : `IV therapy clinics across ${stateName}. Browse by city or add your clinic free.`}
      </p>

      {/* City grid */}
      {cityCounts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-lg font-bold text-brand-navy mb-4">Cities in {stateName}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {cityCounts.map(({ city, count }) => {
              const citySlug = city.toLowerCase().replace(/\s+/g, '-')
              const cityName = city.replace(/\b\w/g, c => c.toUpperCase())
              return (
                <Link
                  key={city}
                  href={`/iv-therapy-clinics/${state.toLowerCase()}/${citySlug}`}
                  className="flex items-center justify-between bg-white rounded-lg border border-brand-light-2 px-4 py-3 hover:border-brand-teal hover:shadow-sm transition-all group"
                >
                  <span className="text-brand-navy font-medium group-hover:text-brand-teal text-sm">{cityName}</span>
                  <span className="text-brand-steel text-xs">{count} {count === 1 ? 'clinic' : 'clinics'}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Featured clinics preview */}
      {stateListings.length > 0 && (
        <div className="mb-12">
          <h2 className="text-lg font-bold text-brand-navy mb-4">Featured Clinics in {stateName}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stateListings.slice(0, 6).map(listing => (
              <div key={listing.id} className="bg-white rounded-xl border border-brand-light-2 p-5">
                <h3 className="font-semibold text-brand-navy text-sm mb-1">{listing.business_name}</h3>
                <p className="text-brand-steel text-xs mb-3">{listing.city}, {listing.state}</p>
                <Link
                  href={`/iv-therapy-clinics/${listing.state.toLowerCase()}/${listing.city.toLowerCase().replace(/\s+/g, '-')}/${listing.slug}`}
                  className="text-brand-teal text-xs font-medium hover:underline"
                >
                  View listing →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What to know callout */}
      <div className="bg-brand-teal-light rounded-xl p-6 mb-8 border border-brand-teal/20">
        <h2 className="font-bold text-brand-navy mb-3">What to Look for in a {stateName} IV Therapy Clinic</h2>
        <ul className="space-y-2 text-sm text-brand-slate">
          <li>✓ Medical oversight — a physician or NP should sign off on every patient's protocol</li>
          <li>✓ Registered nurse administering the IV — not an untrained tech</li>
          <li>✓ Health intake before your first session — not just a credit card swipe</li>
          <li>✓ Transparent pricing — if a clinic won&apos;t post prices, that&apos;s a red flag</li>
          <li>✓ FDA-approved sterile compounded solutions — ask where ingredients are sourced</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="bg-brand-navy text-white rounded-xl p-8 text-center">
        <h2 className="font-bold text-xl mb-2">Own an IV Therapy Clinic in {stateName}?</h2>
        <p className="text-blue-200 text-sm mb-5">
          Add your clinic free and start appearing in search results for IV therapy in your city.
        </p>
        <Link
          href="/submit"
          className="inline-block bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm"
        >
          Add Free Listing →
        </Link>
      </div>
    </div>
  )
}
