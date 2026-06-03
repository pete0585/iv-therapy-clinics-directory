import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Phone, ChevronRight } from 'lucide-react'
import { getListingsByTreatment, getTotalCount } from '@/lib/data'
import { stateSlug, citySlug, formatPriceRange, formatPhone } from '@/lib/utils'
import { TREATMENT_SLUGS, TREATMENT_DESCRIPTIONS } from '@/lib/types'
import type { IvTherapyListing } from '@/lib/types'

interface PageProps {
  params: Promise<{ treatment: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { treatment } = await params
  const treatmentName = TREATMENT_SLUGS[treatment]
  if (!treatmentName) return { title: 'IV Therapy Treatment | IVTherapyClinicFinder' }

  return {
    title: `${treatmentName} IV Therapy Near Me — Find Clinics`,
    description: `Find ${treatmentName} IV therapy clinics near you. ${TREATMENT_DESCRIPTIONS[treatment]?.slice(0, 120) ?? ''} Compare clinics, pricing, and medical oversight.`,
    openGraph: {
      title: `${treatmentName} IV Therapy Clinics | IVTherapyClinicFinder`,
      description: `Find ${treatmentName} IV therapy clinics nationwide. Compare pricing and medical oversight.`,
    },
  }
}

export default async function TreatmentPage({ params }: PageProps) {
  const { treatment } = await params
  const treatmentName = TREATMENT_SLUGS[treatment]
  if (!treatmentName) notFound()

  const description = TREATMENT_DESCRIPTIONS[treatment] ?? ''

  const [listings, totalCount] = await Promise.all([
    getListingsByTreatment(treatmentName, 24).catch(() => []),
    getTotalCount().catch(() => 0),
  ])

  const siteUrl = 'https://www.ivtherapyclinicfinder.com'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'IV Therapy Clinics', item: `${siteUrl}/iv-therapy-clinics` },
      { '@type': 'ListItem', position: 3, name: `${treatmentName} IV Therapy` },
    ],
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <section className="bg-gradient-to-br from-brand-navy to-brand-cyan-dark text-white py-12">
        <div className="page-container">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-brand-cyan">Home</Link>
            <ChevronRight className="w-4 h-4" aria-label="" />
            <Link href="/iv-therapy-clinics" className="hover:text-brand-cyan">IV Therapy Clinics</Link>
            <ChevronRight className="w-4 h-4" aria-label="" />
            <span className="text-white">{treatmentName}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {treatmentName} IV Therapy Near Me
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">{description}</p>
          {listings.length > 0 && (
            <p className="text-brand-cyan mt-4 font-semibold">
              {listings.length}+ clinics offering {treatmentName} nationwide
            </p>
          )}
        </div>
      </section>

      {/* Clinics */}
      <section className="py-10">
        <div className="page-container">
          {listings.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">💧</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No clinics found for {treatmentName}</h2>
              <p className="text-gray-600 mb-6">
                We&apos;re continuously adding new clinics. Try browsing all IV therapy clinics near you.
              </p>
              <Link href="/iv-therapy-clinics" className="btn-primary">Browse All Clinics</Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="section-heading">Clinics Offering {treatmentName}</h2>
                <Link href={`/iv-therapy-clinics?treatment=${encodeURIComponent(treatmentName)}`} className="text-brand-cyan hover:underline text-sm font-medium">
                  Filter by state →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {listings.map((listing) => (
                  <TreatmentListingCard key={listing.id} listing={listing} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href={`/iv-therapy-clinics?treatment=${encodeURIComponent(treatmentName)}`}
                  className="btn-primary"
                >
                  Browse All {treatmentName} Clinics
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Educational content */}
      <section className="py-10 bg-gray-50">
        <div className="page-container">
          <div className="max-w-3xl">
            <h2 className="section-heading mb-4">About {treatmentName} IV Therapy</h2>
            <div className="prose prose-gray text-gray-600 text-sm space-y-3">
              <p>{description}</p>
              <p>
                {treatmentName} IV therapy delivers nutrients directly into your bloodstream, bypassing the digestive system for near-100% absorption.
                This makes IV delivery significantly more effective than oral supplements for the same compounds.
              </p>
              <p>
                Always verify that your chosen clinic has licensed medical professionals on staff.
                Look for MD-supervised clinics or NP/RN-administered services with physician oversight.
                Your health history and current medications should be reviewed before starting any IV therapy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other treatments */}
      <section className="py-10 bg-white">
        <div className="page-container">
          <h2 className="section-heading mb-6">Other IV Therapy Treatments</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Object.entries(TREATMENT_SLUGS)
              .filter(([slug]) => slug !== treatment)
              .slice(0, 8)
              .map(([slug, name]) => (
                <Link
                  key={slug}
                  href={`/iv-therapy/${slug}`}
                  className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-white hover:border-brand-cyan transition-all group"
                >
                  <span className="font-medium text-sm text-gray-900 group-hover:text-brand-cyan">{name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-cyan" aria-label="" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Directory CTA */}
      <section className="py-10 bg-brand-navy text-white">
        <div className="page-container text-center">
          <h2 className="text-2xl font-bold mb-3">Can&apos;t find {treatmentName} near you?</h2>
          <p className="text-gray-300 mb-6">Browse {totalCount > 0 ? totalCount.toLocaleString() : 'hundreds of'} IV therapy clinics by city or state.</p>
          <Link href="/iv-therapy-clinics" className="btn-primary text-base px-8 py-4">
            Browse All IV Therapy Clinics
          </Link>
        </div>
      </section>
    </div>
  )
}

function TreatmentListingCard({ listing }: { listing: IvTherapyListing }) {
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
        {listing.listing_tier === 'featured' && <span className="badge-featured flex-shrink-0">Featured</span>}
        {listing.listing_tier === 'verified' && <span className="badge-verified flex-shrink-0">Verified</span>}
      </div>
      {listing.services_offered && listing.services_offered.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {listing.services_offered.slice(0, 3).map(s => (
            <span key={s} className="badge-treatment">{s}</span>
          ))}
        </div>
      )}
      {price && <div className="text-xs font-semibold text-brand-emerald mb-2">{price}</div>}
      {listing.phone && (
        <div className="flex items-center gap-1.5 text-xs text-brand-cyan font-medium">
          <Phone className="w-3 h-3" aria-label="Phone" />
          {formatPhone(listing.phone)}
        </div>
      )}
    </Link>
  )
}
