import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { MapPin, ChevronRight } from 'lucide-react'
import { getStateListings } from '@/lib/data'
import { stateAbbrevToName, stateNameToAbbrev, citySlug, stateSlug, formatPriceRange } from '@/lib/utils'
import type { IvTherapyListing } from '@/lib/types'

const VALID_STATE_ABBREVS = new Set([
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC',
])

interface PageProps {
  params: Promise<{ state: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params
  const stateAbbrev = stateNameToAbbrev(state.replace(/-/g, ' '))
  if (!VALID_STATE_ABBREVS.has(stateAbbrev)) {
    return { title: 'IV Therapy Clinic | IVTherapyClinicFinder' }
  }
  const stateName = stateAbbrevToName(stateAbbrev)

  return {
    title: `IV Therapy Clinics in ${stateName} — Find IV Drip Near You`,
    description: `Find IV therapy and IV hydration clinics in ${stateName}. Compare treatments, pricing, and medical oversight. Myers Cocktail, NAD+, hangover recovery, and more.`,
    openGraph: {
      title: `IV Therapy Clinics in ${stateName} | IVTherapyClinicFinder`,
      description: `Browse all IV therapy clinics in ${stateName}. Filter by treatment, mobile service, and more.`,
    },
  }
}

export default async function StatePage({ params }: PageProps) {
  const { state } = await params
  const stateAbbrev = stateNameToAbbrev(state.replace(/-/g, ' '))
  const stateName = stateAbbrevToName(stateAbbrev)

  if (!VALID_STATE_ABBREVS.has(stateAbbrev)) {
    // param is a listing slug, not a state name — redirect to the slug handler
    redirect(`/listing/${state}`)
  }

  const listings = await getStateListings(stateAbbrev).catch(() => [])
  if (listings.length === 0) notFound()

  // Group by city
  const cityMap: Record<string, IvTherapyListing[]> = {}
  for (const listing of listings) {
    const key = listing.city
    if (!cityMap[key]) cityMap[key] = []
    cityMap[key].push(listing)
  }
  const cities = Object.entries(cityMap).sort((a, b) => b[1].length - a[1].length)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.ivtherapyclinicfinder.com' },
      { '@type': 'ListItem', position: 2, name: 'IV Therapy Clinics', item: 'https://www.ivtherapyclinicfinder.com/iv-therapy-clinics' },
      { '@type': 'ListItem', position: 3, name: stateName },
    ],
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <section className="bg-brand-navy text-white py-10">
        <div className="page-container">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-brand-cyan">Home</Link>
            <ChevronRight className="w-4 h-4" aria-label="" />
            <Link href="/iv-therapy-clinics" className="hover:text-brand-cyan">IV Therapy Clinics</Link>
            <ChevronRight className="w-4 h-4" aria-label="" />
            <span className="text-white">{stateName}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            IV Therapy Clinics in {stateName}
          </h1>
          <p className="text-gray-300">
            {listings.length.toLocaleString()} IV therapy {listings.length === 1 ? 'clinic' : 'clinics'} across {cities.length} {cities.length === 1 ? 'city' : 'cities'} in {stateName}
          </p>
        </div>
      </section>

      {/* City index */}
      <section className="py-10 bg-white">
        <div className="page-container">
          <h2 className="section-heading mb-2">Browse by City in {stateName}</h2>
          <p className="text-gray-600 mb-8">Select a city to see IV therapy clinics near you</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {cities.map(([city, cityListings]) => (
              <Link
                key={city}
                href={`/iv-therapy-clinics/${state}/${citySlug(city)}`}
                className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-white hover:border-brand-cyan hover:bg-brand-cyan-light transition-all group"
              >
                <span className="font-medium text-sm text-gray-900 group-hover:text-brand-cyan-dark truncate">{city}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0 ml-1">{cityListings.length}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured listings in state */}
      {listings.some(l => l.listing_tier !== 'free') && (
        <section className="py-10 bg-gray-50">
          <div className="page-container">
            <h2 className="section-heading mb-6">Featured Clinics in {stateName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings
                .filter(l => l.listing_tier !== 'free')
                .slice(0, 6)
                .map((listing) => (
                  <StateListingCard key={listing.id} listing={listing} stateParam={state} />
                ))}
            </div>
          </div>
        </section>
      )}

      {/* SEO content */}
      <section className="py-10 bg-white">
        <div className="page-container">
          <div className="max-w-3xl">
            <h2 className="section-heading mb-4">IV Therapy in {stateName}</h2>
            <div className="prose prose-gray text-sm text-gray-600 space-y-3">
              <p>
                {stateName} has a growing IV therapy market with clinics offering everything from basic hydration and hangover recovery to advanced NAD+ and Myers Cocktail drips.
                Whether you&apos;re a biohacker looking for weekly optimization sessions, an athlete recovering from training, or someone who needs fast hangover relief,
                IVTherapyClinicFinder helps you find the right clinic in {stateName}.
              </p>
              <p>
                Use our filters to find medically supervised IV therapy in {stateName} — many patients want to know whether a clinic is MD-supervised, NP-led,
                or RN-administered before booking. You can also filter for mobile IV services in {stateName} if you prefer treatment at home, your hotel, or your office.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function StateListingCard({ listing, stateParam }: { listing: IvTherapyListing; stateParam: string }) {
  const price = formatPriceRange(listing.price_low, listing.price_high)
  return (
    <Link
      href={`/iv-therapy-clinics/${stateParam}/${citySlug(listing.city)}/${listing.slug}`}
      className="card p-5 block hover:border-brand-cyan"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2">{listing.name}</h3>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <MapPin className="w-3 h-3" aria-label="Location" />
            <span>{listing.city}, {listing.state}</span>
          </div>
        </div>
        {listing.listing_tier === 'featured' && <span className="badge-featured">Featured</span>}
        {listing.listing_tier === 'verified' && <span className="badge-verified">Verified</span>}
      </div>
      {listing.services_offered && listing.services_offered.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {listing.services_offered.slice(0, 3).map(s => (
            <span key={s} className="badge-treatment">{s}</span>
          ))}
        </div>
      )}
      {price && <div className="text-xs font-semibold text-brand-emerald">{price}</div>}
    </Link>
  )
}
