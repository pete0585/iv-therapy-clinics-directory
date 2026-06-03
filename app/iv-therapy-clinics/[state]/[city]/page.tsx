import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Phone, ChevronRight, Globe } from 'lucide-react'
import { getCityListings } from '@/lib/data'
import { stateAbbrevToName, stateNameToAbbrev, titleCase, stateSlug, formatPriceRange, formatMedicalOversight } from '@/lib/utils'
import type { IvTherapyListing } from '@/lib/types'

interface PageProps {
  params: Promise<{ state: string; city: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city } = await params
  const stateAbbrev = stateNameToAbbrev(state.replace(/-/g, ' '))
  const stateName = stateAbbrevToName(stateAbbrev)
  const cityName = titleCase(city.replace(/-/g, ' '))

  return {
    title: `IV Therapy Clinics in ${cityName}, ${stateAbbrev} — Find IV Drips Near You`,
    description: `Find IV therapy and IV hydration clinics in ${cityName}, ${stateName}. Compare Myers Cocktail, NAD+, hangover recovery, and more. View pricing and medical oversight.`,
    openGraph: {
      title: `IV Therapy Clinics in ${cityName}, ${stateAbbrev} | IVTherapyClinicFinder`,
      description: `Browse ${cityName} IV therapy clinics. Compare treatments, pricing, and medical oversight.`,
    },
  }
}

export default async function CityPage({ params }: PageProps) {
  const { state, city } = await params
  const stateAbbrev = stateNameToAbbrev(state.replace(/-/g, ' '))
  const stateName = stateAbbrevToName(stateAbbrev)
  const cityName = titleCase(city.replace(/-/g, ' '))

  if (!stateAbbrev || stateAbbrev.length !== 2) notFound()

  const listings = await getCityListings(stateAbbrev, city).catch(() => [])
  if (listings.length === 0) notFound()

  const mobileClinics = listings.filter(l => l.is_mobile)
  const siteUrl = 'https://www.ivtherapyclinicfinder.com'

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'IV Therapy Clinics', item: `${siteUrl}/iv-therapy-clinics` },
        { '@type': 'ListItem', position: 3, name: stateName, item: `${siteUrl}/iv-therapy-clinics/${state}` },
        { '@type': 'ListItem', position: 4, name: cityName },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `How much does IV therapy cost in ${cityName}, ${stateName}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `IV therapy in ${cityName} typically ranges from $99 to $350 per session depending on the treatment type. Basic hydration drips start around $100-150, while premium treatments like NAD+ therapy can range from $200-500+. Many clinics offer membership pricing for regular clients.`,
          },
        },
        {
          '@type': 'Question',
          name: `Is IV therapy safe in ${cityName}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `IV therapy administered by licensed medical professionals in ${cityName} is generally safe. Look for clinics with MD supervision, NP-led or RN-administered services with physician oversight. Always verify credentials and discuss your health history before starting IV therapy.`,
          },
        },
        {
          '@type': 'Question',
          name: `Are there mobile IV therapy services in ${cityName}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: mobileClinics.length > 0
              ? `Yes — there ${mobileClinics.length === 1 ? 'is' : 'are'} ${mobileClinics.length} mobile IV therapy ${mobileClinics.length === 1 ? 'service' : 'services'} in ${cityName} that come to your home, hotel, or office.`
              : `Mobile IV therapy services may be available in the ${cityName} area. Check our listings for mobile service providers or contact clinics to ask about home visit options.`,
          },
        },
      ],
    },
  ]

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <section className="bg-brand-navy text-white py-10">
        <div className="page-container">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4 flex-wrap">
            <Link href="/" className="hover:text-brand-cyan">Home</Link>
            <ChevronRight className="w-4 h-4" aria-label="" />
            <Link href="/iv-therapy-clinics" className="hover:text-brand-cyan">IV Therapy Clinics</Link>
            <ChevronRight className="w-4 h-4" aria-label="" />
            <Link href={`/iv-therapy-clinics/${state}`} className="hover:text-brand-cyan">{stateName}</Link>
            <ChevronRight className="w-4 h-4" aria-label="" />
            <span className="text-white">{cityName}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            IV Therapy Clinics in {cityName}, {stateAbbrev}
          </h1>
          <p className="text-gray-300">
            {listings.length} IV therapy {listings.length === 1 ? 'clinic' : 'clinics'} in {cityName}
            {mobileClinics.length > 0 && ` · ${mobileClinics.length} mobile service${mobileClinics.length > 1 ? 's' : ''}`}
          </p>
        </div>
      </section>

      {/* Listings */}
      <section className="py-10">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map((listing) => (
              <CityListingCard key={listing.id} listing={listing} stateParam={state} cityParam={city} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-10 bg-gray-50">
        <div className="page-container">
          <div className="max-w-3xl">
            <h2 className="section-heading mb-6">
              Frequently Asked Questions About IV Therapy in {cityName}
            </h2>
            <div className="space-y-5">
              <FaqItem
                question={`How much does IV therapy cost in ${cityName}, ${stateName}?`}
                answer={`IV therapy in ${cityName} typically ranges from $99 to $350 per session. Basic saline hydration and hangover recovery drips start around $100-150. Myers Cocktail sessions are typically $150-250. NAD+ IV therapy is the most expensive, ranging from $200-500+ per session. Many clinics offer membership packages at 10-20% off for regular clients.`}
              />
              <FaqItem
                question={`Is IV therapy safe?`}
                answer={`IV therapy administered by licensed medical professionals is generally considered safe for healthy adults. Always book at clinics with verified medical credentials — look for MD-supervised or NP/RN-led practices. Disclose any medications, allergies, or health conditions before your session. The procedure should always use sterile, single-use IV sets.`}
              />
              <FaqItem
                question={`How long does an IV therapy session take in ${cityName}?`}
                answer={`Most IV therapy sessions take 30-60 minutes. Basic hydration drips can be as fast as 20-30 minutes. Larger vitamin cocktails or NAD+ therapy may take 45-90 minutes. Mobile IV services typically take the same time but come to your location.`}
              />
              {mobileClinics.length > 0 && (
                <FaqItem
                  question={`Are there mobile IV therapy services in ${cityName}?`}
                  answer={`Yes — there ${mobileClinics.length === 1 ? 'is' : 'are'} ${mobileClinics.length} mobile IV therapy ${mobileClinics.length === 1 ? 'service' : 'services'} listed in ${cityName}. Mobile IV therapy comes to your home, hotel room, or office — ideal for post-event recovery, busy professionals, or anyone who prefers treatment in their own environment.`}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Back links */}
      <section className="py-8 bg-white">
        <div className="page-container">
          <div className="flex flex-wrap gap-3">
            <Link href={`/iv-therapy-clinics/${state}`} className="btn-secondary">
              ← All {stateName} Clinics
            </Link>
            <Link href="/iv-therapy-clinics" className="btn-secondary">
              ← Browse All Clinics
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function CityListingCard({ listing, stateParam, cityParam }: { listing: IvTherapyListing; stateParam: string; cityParam: string }) {
  const price = formatPriceRange(listing.price_low, listing.price_high)
  const oversight = listing.medical_oversight ? formatMedicalOversight(listing.medical_oversight) : null

  return (
    <Link
      href={`/iv-therapy-clinics/${stateParam}/${cityParam}/${listing.slug}`}
      className="card p-5 block hover:border-brand-cyan"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-2">{listing.name}</h3>
          {listing.address && (
            <div className="flex items-start gap-1 text-xs text-gray-500 mt-1">
              <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" aria-label="Address" />
              <span className="line-clamp-1">{listing.address}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          {listing.listing_tier === 'featured' && <span className="badge-featured">Featured</span>}
          {listing.listing_tier === 'verified' && <span className="badge-verified">Verified</span>}
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {listing.is_mobile && <span className="badge-mobile">Mobile</span>}
        {listing.medical_oversight && listing.medical_oversight !== 'unknown' && (
          <span className={listing.medical_oversight === 'md_supervised' ? 'badge-md' :
                          listing.medical_oversight === 'np_led' ? 'badge-np' : 'badge-rn'}>
            {oversight}
          </span>
        )}
        {listing.services_offered?.slice(0, 2).map(s => (
          <span key={s} className="badge-treatment">{s}</span>
        ))}
      </div>

      {price && <div className="text-sm font-semibold text-brand-emerald mb-2">{price}</div>}

      <div className="flex flex-col gap-1">
        {listing.phone && (
          <div className="flex items-center gap-1.5 text-sm text-brand-cyan font-medium">
            <Phone className="w-3.5 h-3.5" aria-label="Phone" />
            {listing.phone}
          </div>
        )}
        {listing.website && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Globe className="w-3 h-3" aria-label="Website" />
            <span className="truncate">{listing.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
          </div>
        )}
      </div>
    </Link>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-brand-navy mb-2">{question}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
    </div>
  )
}
