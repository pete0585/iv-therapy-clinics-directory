import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Phone, Globe, CheckCircle, Star, ArrowLeft, Clock, Droplets } from 'lucide-react'
import { getListingBySlug } from '@/lib/data'
import { formatPhone, stateAbbrevToName } from '@/lib/utils'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListingBySlug(slug).catch(() => null)
  if (!listing) return { title: 'IV Therapy Clinic | IVTherapyClinicFinder' }

  return {
    title: `${listing.name} — IV Therapy in ${listing.city}, ${listing.state}`,
    description: `${listing.name} offers IV therapy in ${listing.city}, ${listing.state}.${listing.services_offered?.length ? ` Treatments: ${listing.services_offered.slice(0, 3).join(', ')}.` : ''} View pricing, hours, and contact info.`,
    alternates: { canonical: `/listings/${slug}` },
    openGraph: {
      title: `${listing.name} | IV Therapy Clinic in ${listing.city}, ${listing.state}`,
      description: `IV therapy services in ${listing.city}, ${listing.state}. ${listing.services_offered?.join(', ') ?? ''}`,
    },
  }
}

export default async function ListingPage({ params }: PageProps) {
  const { slug } = await params
  const listing = await getListingBySlug(slug).catch(() => null)
  if (!listing) notFound()

  const isClaimed = (listing.listing_tier as string | null) !== 'unclaimed' && listing.listing_tier != null
  const stateName = stateAbbrevToName(listing.state)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: listing.name,
    description: listing.bio ?? undefined,
    telephone: isClaimed ? (listing.phone ?? undefined) : undefined,
    url: isClaimed ? (listing.website ?? undefined) : undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address ?? undefined,
      addressLocality: listing.city,
      addressRegion: listing.state,
      postalCode: listing.zip ?? undefined,
      addressCountry: 'US',
    },
    medicalSpecialty: 'IV Therapy',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/listings"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-teal transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to directory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{listing.name}</h1>
                    {listing.listing_tier === 'featured' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800 rounded-full">
                        <Star className="w-3 h-3" /> Featured
                      </span>
                    )}
                    {listing.listing_tier === 'verified' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-teal-100 text-teal-800 rounded-full">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{listing.city}, {listing.state} — {stateName}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {listing.is_mobile && (
                  <span className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">Mobile IV</span>
                )}
                {listing.accepts_insurance && (
                  <span className="px-2.5 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-full">Insurance Accepted</span>
                )}
                {listing.medical_oversight && (
                  <span className="px-2.5 py-1 text-xs font-medium bg-purple-50 text-purple-700 rounded-full">Medical Oversight</span>
                )}
              </div>
            </div>

            {isClaimed && listing.bio && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-teal-500" />
                  About This Clinic
                </h2>
                <p className="text-gray-700 leading-relaxed">{listing.bio}</p>
              </div>
            )}

            {listing.services_offered && listing.services_offered.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">IV Treatments Offered</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.services_offered.map((s: string) => (
                    <span key={s} className="px-3 py-1.5 text-sm bg-teal-50 text-teal-800 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {!isClaimed && (
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
                <p className="font-semibold text-teal-800 mb-1">Is this your clinic?</p>
                <p className="text-sm text-teal-600 mb-3">
                  Claim your free listing to add contact info, pricing, and a verified badge.
                </p>
                <Link href={`/claim/${listing.id}`} className="btn-primary text-sm">
                  Claim Listing
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 mb-4">Contact</h2>
              {isClaimed ? (
                <div className="space-y-3">
                  {listing.phone && (
                    <a
                      href={`tel:${listing.phone}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      {formatPhone(listing.phone)}
                    </a>
                  )}
                  {listing.website && (
                    <a
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:border-teal-500 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      Visit Website
                    </a>
                  )}
                </div>
              ) : (
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                  <p className="text-sm text-gray-500">Contact info visible after listing is claimed.</p>
                  <a href={`/claim/${listing.id}`} className="mt-2 inline-block text-sm font-medium text-teal-600 hover:underline">
                    Claim your profile →
                  </a>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 mb-3 text-sm">Location</h2>
              {listing.address && <p className="text-sm text-gray-700 mb-1">{listing.address}</p>}
              <p className="text-sm text-gray-700">{listing.city}, {listing.state} {listing.zip ?? ''}</p>
              {listing.address && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${listing.name} ${listing.address ?? ''} ${listing.city} ${listing.state}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-teal-600 hover:underline"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
              )}
            </div>

            {listing.hours && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h2 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Hours
                </h2>
                <p className="text-sm text-gray-700 whitespace-pre-line">{listing.hours}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
