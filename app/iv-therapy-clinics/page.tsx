import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import { getListings } from '@/lib/data'
import { formatPhone, stateAbbrevToName, stateSlug, citySlug, formatPriceRange } from '@/lib/utils'
import type { IvTherapyListing } from '@/lib/types'
import { TREATMENT_CATEGORIES } from '@/lib/types'

export const metadata: Metadata = {
  title: 'IV Therapy Clinics — Browse All Locations',
  description: 'Browse IV therapy and IV hydration clinics across the United States. Filter by treatment type, mobile service, and more.',
}

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC',
]

interface PageProps {
  searchParams: Promise<{ q?: string; state?: string; treatment?: string; mobile?: string; page?: string }>
}

export default async function BrowsePage({ searchParams }: PageProps) {
  const params = await searchParams
  const page = parseInt(params.page ?? '1', 10)
  const filters = {
    q: params.q,
    state: params.state,
    treatment: params.treatment,
    mobile: params.mobile === 'true',
    page,
  }

  const { listings, total } = await getListings(filters).catch(() => ({ listings: [], total: 0 }))
  const totalPages = Math.ceil(total / 24)

  const activeState = params.state?.toUpperCase()
  const activeTreatment = params.treatment
  const activeMobile = params.mobile === 'true'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-brand-navy text-white py-8">
        <div className="page-container">
          <h1 className="text-3xl font-bold mb-2">
            {activeState ? `IV Therapy Clinics in ${stateAbbrevToName(activeState)}` :
             activeTreatment ? `${activeTreatment} IV Therapy Clinics` :
             'IV Therapy Clinics'}
          </h1>
          <p className="text-gray-300">
            {total > 0 ? `${total.toLocaleString()} clinics found` : 'Loading clinics...'}
            {activeState && ` in ${stateAbbrevToName(activeState)}`}
          </p>
        </div>
      </div>

      <div className="page-container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-72 flex-shrink-0">
            <FilterPanel
              activeState={activeState}
              activeTreatment={activeTreatment}
              activeMobile={activeMobile}
              activeQ={params.q}
            />
          </aside>

          {/* Listing grid */}
          <div className="flex-1 min-w-0">
            {listings.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {listings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <Pagination page={page} totalPages={totalPages} params={params} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterPanel({
  activeState,
  activeTreatment,
  activeMobile,
  activeQ,
}: {
  activeState?: string
  activeTreatment?: string
  activeMobile: boolean
  activeQ?: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-20">
      <div className="flex items-center gap-2 mb-5">
        <SlidersHorizontal className="w-4 h-4 text-brand-cyan" aria-label="Filters" />
        <h2 className="font-semibold text-gray-900">Filter Clinics</h2>
      </div>

      <form method="get" action="/iv-therapy-clinics" className="space-y-5">
        {/* Search */}
        <div>
          <label className="form-label" htmlFor="q">Search</label>
          <input
            type="text"
            id="q"
            name="q"
            defaultValue={activeQ}
            placeholder="Clinic name or city..."
            className="input-field"
          />
        </div>

        {/* State */}
        <div>
          <label className="form-label" htmlFor="state">State</label>
          <select id="state" name="state" defaultValue={activeState ?? ''} className="select-field">
            <option value="">All States</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>{stateAbbrevToName(s)}</option>
            ))}
          </select>
        </div>

        {/* Treatment */}
        <div>
          <label className="form-label" htmlFor="treatment">Treatment</label>
          <select id="treatment" name="treatment" defaultValue={activeTreatment ?? ''} className="select-field">
            <option value="">All Treatments</option>
            {TREATMENT_CATEGORIES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Mobile IV */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="mobile"
            name="mobile"
            value="true"
            defaultChecked={activeMobile}
            className="w-4 h-4 text-brand-cyan border-gray-300 rounded focus:ring-brand-cyan"
          />
          <label htmlFor="mobile" className="text-sm font-medium text-gray-700 cursor-pointer">
            Mobile IV Service Only
          </label>
        </div>

        <button type="submit" className="btn-primary w-full justify-center">
          Apply Filters
        </button>
        <Link href="/iv-therapy-clinics" className="btn-secondary w-full justify-center block text-center">
          Clear All
        </Link>
      </form>
    </div>
  )
}

function ListingCard({ listing }: { listing: IvTherapyListing }) {
  const price = formatPriceRange(listing.price_low, listing.price_high)

  return (
    <Link
      href={`/iv-therapy-clinics/${stateSlug(listing.state)}/${citySlug(listing.city)}/${listing.slug}`}
      className="card p-5 block hover:border-brand-cyan"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2">{listing.name}</h3>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <MapPin className="w-3 h-3 flex-shrink-0" aria-label="Location" />
            <span>{listing.city}, {listing.state}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          {listing.listing_tier === 'featured' && <span className="badge-featured">Featured</span>}
          {listing.listing_tier === 'verified' && <span className="badge-verified">Verified</span>}
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {listing.is_mobile && <span className="badge-mobile">Mobile</span>}
        {listing.services_offered?.slice(0, 3).map((s) => (
          <span key={s} className="badge-treatment">{s}</span>
        ))}
      </div>
      {price && <div className="text-xs font-semibold text-brand-emerald mb-2">{price}</div>}
      {listing.phone && (
        <div className="flex items-center gap-1.5 text-xs text-brand-cyan font-medium">
          <Phone className="w-3.5 h-3.5" aria-label="Phone" />
          {formatPhone(listing.phone)}
        </div>
      )}
    </Link>
  )
}

function Pagination({
  page,
  totalPages,
  params,
}: {
  page: number
  totalPages: number
  params: { q?: string; state?: string; treatment?: string; mobile?: string }
}) {
  function buildUrl(p: number) {
    const ps = new URLSearchParams()
    if (params.q) ps.set('q', params.q)
    if (params.state) ps.set('state', params.state)
    if (params.treatment) ps.set('treatment', params.treatment)
    if (params.mobile) ps.set('mobile', params.mobile)
    if (p > 1) ps.set('page', String(p))
    const qs = ps.toString()
    return `/iv-therapy-clinics${qs ? '?' + qs : ''}`
  }

  return (
    <div className="flex items-center justify-center gap-3 mt-10">
      {page > 1 && (
        <Link href={buildUrl(page - 1)} className="btn-secondary inline-flex gap-1 px-4 py-2">
          <ChevronLeft className="w-4 h-4" aria-label="" /> Previous
        </Link>
      )}
      <span className="text-sm text-gray-600 font-medium">Page {page} of {totalPages}</span>
      {page < totalPages && (
        <Link href={buildUrl(page + 1)} className="btn-secondary inline-flex gap-1 px-4 py-2">
          Next <ChevronRight className="w-4 h-4" aria-label="" />
        </Link>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="text-5xl mb-4">💧</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No clinics found</h3>
      <p className="text-gray-600 mb-6">Try adjusting your filters or search in a different area.</p>
      <Link href="/iv-therapy-clinics" className="btn-primary">Clear Filters</Link>
    </div>
  )
}
