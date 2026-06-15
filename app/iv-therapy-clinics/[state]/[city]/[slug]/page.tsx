import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Phone, Globe, Clock, ChevronRight, CheckCircle, Star, Droplets } from 'lucide-react'
import { getListingBySlug, getNearbyListings } from '@/lib/data'
import { formatPhone, stateAbbrevToName, stateNameToAbbrev, titleCase, stateSlug, citySlug, formatPriceRange, formatMedicalOversight } from '@/lib/utils'
import type { IvTherapyListing } from '@/lib/types'
import { createClient } from '@/lib/supabase/server'
import { ViewTracker } from '@/components/ViewTracker'

interface PageProps {
  params: Promise<{ state: string; city: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, city, state } = await params
  const listing = await getListingBySlug(slug).catch(() => null)
  if (!listing) return { title: 'IV Therapy Clinic | IVTherapyClinicFinder' }

  const stateAbbrev = stateNameToAbbrev(state.replace(/-/g, ' '))
  const cityName = titleCase(city.replace(/-/g, ' '))

  return {
    title: `${listing.name} — IV Therapy in ${cityName}, ${stateAbbrev}`,
    description: `${listing.name} offers IV therapy in ${cityName}, ${listing.state}.${listing.services_offered?.length ? ` Treatments: ${listing.services_offered.slice(0, 3).join(', ')}.` : ''} View pricing, hours, and contact info.`,
    openGraph: {
      title: `${listing.name} | IV Therapy Clinic in ${cityName}, ${stateAbbrev}`,
      description: `IV therapy services in ${cityName}, ${listing.state}. ${listing.services_offered?.join(', ') ?? ''}`,
    },
  }
}

export default async function ListingPage({ params }: PageProps) {
  const { slug, state, city } = await params
  const listing = await getListingBySlug(slug).catch(() => null)
  if (!listing) notFound()

  const stateAbbrev = stateNameToAbbrev(state.replace(/-/g, ' '))
  const stateName = stateAbbrevToName(stateAbbrev)
  const cityName = titleCase(city.replace(/-/g, ' '))

  const nearby = await getNearbyListings(listing.city, listing.state, slug, 4).catch(() => [])

  const isClaimed = (listing.listing_tier as string | null) !== 'unclaimed' && listing.listing_tier != null
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  const supabase = await createClient()
  const { count: viewCount } = await supabase.from('listing_views').select('*', { count: 'exact', head: true })
    .eq('directory_slug', 'iv-therapy-clinics').eq('listing_id', String(listing.id)).gte('viewed_at', monthStart)
  const monthlyViews = viewCount ?? 0

  const price = formatPriceRange(listing.price_low, listing.price_high)
  const oversight = listing.medical_oversight ? formatMedicalOversight(listing.medical_oversight) : null
  const siteUrl = 'https://www.ivtherapyclinicfinder.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': `${siteUrl}/iv-therapy-clinics/${state}/${city}/${slug}`,
    name: listing.name,
    description: listing.description ?? `${listing.name} is an IV therapy clinic in ${listing.city}, ${listing.state}.`,
    address: listing.address ? {
      '@type': 'PostalAddress',
      streetAddress: listing.address,
      addressLocality: listing.city,
      addressRegion: listing.state,
      postalCode: listing.zip ?? '',
      addressCountry: 'US',
    } : undefined,
    telephone: listing.phone ?? undefined,
    url: listing.website ?? undefined,
    medicalSpecialty: 'IV Therapy',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'IV Therapy Clinics', item: `${siteUrl}/iv-therapy-clinics` },
        { '@type': 'ListItem', position: 3, name: stateName, item: `${siteUrl}/iv-therapy-clinics/${state}` },
        { '@type': 'ListItem', position: 4, name: cityName, item: `${siteUrl}/iv-therapy-clinics/${state}/${city}` },
        { '@type': 'ListItem', position: 5, name: listing.name },
      ],
    },
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div className="bg-brand-navy-light border-b border-gray-200 py-3">
        <div className="page-container">
          <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-brand-cyan">Home</Link>
            <ChevronRight className="w-4 h-4" aria-label="" />
            <Link href="/iv-therapy-clinics" className="hover:text-brand-cyan">IV Therapy Clinics</Link>
            <ChevronRight className="w-4 h-4" aria-label="" />
            <Link href={`/iv-therapy-clinics/${state}`} className="hover:text-brand-cyan">{stateName}</Link>
            <ChevronRight className="w-4 h-4" aria-label="" />
            <Link href={`/iv-therapy-clinics/${state}/${city}`} className="hover:text-brand-cyan">{cityName}</Link>
            <ChevronRight className="w-4 h-4" aria-label="" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{listing.name}</span>
          </nav>
        </div>
      </div>

      <div className="page-container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {listing.listing_tier === 'featured' && <span className="badge-featured">⭐ Featured</span>}
                    {listing.listing_tier === 'verified' && <span className="badge-verified">✓ Verified</span>}
                    {listing.is_mobile && <span className="badge-mobile">🚐 Mobile Service</span>}
                    {listing.is_franchise && listing.franchise_name && (
                      <span className="badge-franchise">{listing.franchise_name}</span>
                    )}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-brand-navy mb-2">{listing.name}</h1>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <MapPin className="w-4 h-4 text-brand-cyan flex-shrink-0" aria-label="Location" />
                    <span>{listing.address ? `${listing.address}, ` : ''}{listing.city}, {listing.state}{listing.zip ? ` ${listing.zip}` : ''}</span>
                  </div>
                </div>
              </div>

              {isClaimed && listing.description && (
                <p className="text-gray-600 leading-relaxed mb-4">{listing.description}</p>
              )}
              {!isClaimed && (
                <div className='rounded-lg border border-gray-200 bg-gray-50 p-4 text-center'>
                  <p className='text-sm text-gray-500'>Phone, website, and bio are only visible after this provider claims their listing.</p>
                  <a href={`/claim/${listing.id}`} className='mt-2 inline-block text-sm font-medium text-blue-600 hover:underline'>
                    Is this you? Claim your free profile →
                  </a>
                </div>
              )}

              {/* Key stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {price && (
                  <div className="bg-brand-emerald-light rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-500 mb-1">Price Range</div>
                    <div className="font-bold text-brand-emerald text-sm">{price}</div>
                  </div>
                )}
                {oversight && listing.medical_oversight !== 'unknown' && (
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-500 mb-1">Medical Oversight</div>
                    <div className="font-bold text-blue-700 text-sm">{oversight}</div>
                  </div>
                )}
                {listing.is_mobile && (
                  <div className="bg-brand-navy-light rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-500 mb-1">Service Type</div>
                    <div className="font-bold text-brand-navy text-sm">Mobile + Clinic</div>
                  </div>
                )}
              </div>
            </div>

            {isClaimed && (
              <div className='mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4'>
                <p className='text-xs font-semibold uppercase tracking-wide text-blue-600'>Profile Activity</p>
                <p className='mt-1 text-3xl font-bold text-blue-900'>{monthlyViews}</p>
                <p className='text-sm text-blue-700'>people viewed your profile this month</p>
                {listing.listing_tier === 'free' && (
                  <p className='mt-2 text-xs text-blue-600'>0 could contact you. <a href={`/claim/${listing.id}?upgrade=true`} className='underline font-medium'>Upgrade to be reachable →</a></p>
                )}
              </div>
            )}

            {/* Treatments */}
            {listing.services_offered && listing.services_offered.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h2 className="font-bold text-brand-navy text-lg mb-4 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-brand-cyan" aria-label="" />
                  Treatments Offered
                </h2>
                <div className="flex flex-wrap gap-2">
                  {listing.services_offered.map((service) => (
                    <span key={service} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-cyan-light text-brand-cyan-dark rounded-lg text-sm font-medium">
                      <CheckCircle className="w-3.5 h-3.5" aria-label="" />
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Hours */}
            {listing.hours_text && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h2 className="font-bold text-brand-navy text-lg mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-cyan" aria-label="" />
                  Hours
                </h2>
                <p className="text-gray-600 text-sm whitespace-pre-line">{listing.hours_text}</p>
              </div>
            )}

            {/* Claim CTA */}
            {!listing.is_claimed && (
              <div className="bg-brand-amber-light border border-brand-amber rounded-xl p-5 mb-6">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-brand-amber flex-shrink-0 mt-0.5" aria-label="" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Is this your clinic?</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Claim this listing to add your treatment menu, pricing, photos, and booking link. Free to claim.
                    </p>
                    <Link href={`/claim/${listing.id}`} className="btn-primary text-sm px-4 py-2">
                      Claim This Listing
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            {/* Contact card */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-5 sticky top-20">
              <h2 className="font-bold text-brand-navy mb-4">Contact & Booking</h2>
              <div className="space-y-3">
                {isClaimed && (listing.phone && (
                  <a
                    href={`tel:${listing.phone}`}
                    className="flex items-center gap-3 p-3 bg-brand-navy rounded-xl text-white hover:bg-brand-navy-dark transition-colors"
                  >
                    <Phone className="w-5 h-5 text-brand-cyan" aria-label="Phone" />
                    <div>
                      <div className="text-xs text-gray-400">Call</div>
                      <div className="font-semibold text-sm">{formatPhone(listing.phone)}</div>
                    </div>
                  </a>
                ))}
                {listing.booking_url && (
                  <a
                    href={listing.booking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-brand-amber text-white font-semibold rounded-xl hover:bg-brand-amber-dark transition-colors text-sm"
                  >
                    Book Online
                  </a>
                )}
                {isClaimed && (listing.website && (
                  <a
                    href={listing.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-brand-cyan transition-colors text-sm"
                  >
                    <Globe className="w-4 h-4 text-brand-cyan flex-shrink-0" aria-label="Website" />
                    <span className="text-brand-cyan font-medium truncate">Visit Website</span>
                  </a>
                ))}
              </div>

              {listing.address && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" aria-label="Address" />
                    <span>{listing.address}, {listing.city}, {listing.state}{listing.zip ? ` ${listing.zip}` : ''}</span>
                  </div>
                </div>
              )}

              {/* Upgrade CTA for verified/free */}
              {listing.is_claimed && listing.listing_tier === 'free' && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">Clinic owner? Upgrade to show pricing & get priority placement.</p>
                  <form action="/api/upgrade" method="post">
                    <input type="hidden" name="listing_id" value={listing.id} />
                    <input type="hidden" name="tier" value="verified" />
                    <button type="submit" className="w-full py-2 text-sm font-semibold text-brand-cyan border border-brand-cyan rounded-lg hover:bg-brand-cyan hover:text-white transition-colors">
                      Upgrade — $99/yr
                    </button>
                  </form>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Nearby */}
        {nearby.length > 0 && (
          <section className="mt-10">
            <h2 className="section-heading mb-6">More IV Therapy Clinics in {cityName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {nearby.map((nearby) => (
                <NearbyCard key={nearby.id} listing={nearby} stateParam={state} cityParam={city} />
              ))}
            </div>
            <div className="mt-6">
              <Link href={`/iv-therapy-clinics/${state}/${city}`} className="btn-secondary">
                View All {cityName} Clinics →
              </Link>
            </div>
          </section>
        )}
        <ViewTracker listingId={String(listing.id)} directorySlug='iv-therapy-clinics' />
      </div>
    </div>
  )
}

function NearbyCard({ listing, stateParam, cityParam }: { listing: IvTherapyListing; stateParam: string; cityParam: string }) {
  return (
    <Link
      href={`/iv-therapy-clinics/${stateParam}/${cityParam}/${listing.slug}`}
      className="card p-4 block hover:border-brand-cyan"
    >
      <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">{listing.name}</h3>
      {listing.services_offered && listing.services_offered.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {listing.services_offered.slice(0, 2).map(s => (
            <span key={s} className="badge-treatment">{s}</span>
          ))}
        </div>
      )}
      {listing.listing_tier !== 'free' && (
        <span className={listing.listing_tier === 'featured' ? 'badge-featured' : 'badge-verified'}>
          {listing.listing_tier === 'featured' ? 'Featured' : 'Verified'}
        </span>
      )}
    </Link>
  )
}
