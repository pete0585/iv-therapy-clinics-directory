import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getCityListings } from '@/lib/data'
import { getStateName, US_STATES } from '@/lib/utils'

interface PageProps {
  params: Promise<{ state: string; city: string }>
}

const TOP_CITIES: { state: string; city: string }[] = [
  { state: 'fl', city: 'miami' },
  { state: 'fl', city: 'orlando' },
  { state: 'fl', city: 'tampa' },
  { state: 'ca', city: 'los-angeles' },
  { state: 'ca', city: 'san-diego' },
  { state: 'ca', city: 'san-francisco' },
  { state: 'nv', city: 'las-vegas' },
  { state: 'tx', city: 'houston' },
  { state: 'tx', city: 'dallas' },
  { state: 'tx', city: 'austin' },
  { state: 'az', city: 'phoenix' },
  { state: 'az', city: 'scottsdale' },
  { state: 'il', city: 'chicago' },
  { state: 'ny', city: 'new-york' },
  { state: 'ga', city: 'atlanta' },
  { state: 'co', city: 'denver' },
  { state: 'wa', city: 'seattle' },
  { state: 'nc', city: 'charlotte' },
  { state: 'tn', city: 'nashville' },
  { state: 'oh', city: 'columbus' },
]

export async function generateStaticParams() {
  return TOP_CITIES
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city } = await params
  const stateAbbr = state.toUpperCase()
  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  const stateName = getStateName(stateAbbr)

  return {
    title: `IV Therapy Clinics in ${cityName}, ${stateName} — Find IV Drip Clinics Near You`,
    description: `Browse IV therapy clinics in ${cityName}, ${stateName}. Compare Myers Cocktail, NAD+, hangover recovery, and mobile IV services. Find a medically supervised clinic near you.`,
    openGraph: {
      url: `https://ivtherapyclinicfinder.com/iv-therapy-clinics/${state}/${city}`,
    },
  }
}

export default async function CityPage({ params }: PageProps) {
  const { state, city } = await params
  const stateAbbr = state.toUpperCase()

  if (!US_STATES[stateAbbr]) notFound()

  const listings = await getCityListings(stateAbbr, city)
  const stateName = getStateName(stateAbbr)
  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How much does IV therapy cost in ${cityName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `IV therapy in ${cityName} typically ranges from $100 to $350 per session depending on the treatment. Basic hydration drips start around $100-150. Myers Cocktails run $150-250. NAD+ therapy is the most expensive at $300-600+ due to the longer infusion time. Mobile IV services add a convenience fee of $25-75 on top of the drip price.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is IV therapy safe in ${cityName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `IV therapy is generally safe when administered by trained medical professionals. In ${cityName}, look for clinics with a registered nurse (RN) performing infusions and a physician or nurse practitioner on-site or on-call. Any reputable IV clinic will conduct a health intake before your first session to screen for contraindications like kidney disease, heart failure, or medication interactions.`,
        },
      },
      {
        '@type': 'Question',
        name: `Do I need a prescription to get IV therapy in ${cityName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Most wellness IV therapy does not require a prescription — clinics use a physician-standing-order model where a supervising MD or NP reviews your intake form and authorizes treatment. Some treatments (like high-dose Vitamin C above 25g or prescription medications added to the drip like Toradol or Zofran) require a medical evaluation. Clinics in ${cityName} will walk you through what applies to your chosen treatment.`,
        },
      },
      {
        '@type': 'Question',
        name: `How long does an IV therapy session take in ${cityName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Session length depends on the treatment. Standard hydration and Myers Cocktail drips take 30-60 minutes. High-dose Vitamin C infusions run 60-90 minutes. NAD+ therapy takes 2-4 hours because it must be infused slowly to avoid side effects. Mobile IV services in ${cityName} typically arrive within 45-90 minutes of booking.`,
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-brand-steel mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-teal">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/listings" className="hover:text-brand-teal">IV Therapy Clinics</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/iv-therapy-clinics/${state.toLowerCase()}`} className="hover:text-brand-teal">{stateName}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-brand-navy font-medium">{cityName}</span>
        </nav>

        <h1 className="text-3xl font-bold text-brand-navy mb-2">
          IV Therapy Clinics in {cityName}, {stateName}
        </h1>
        <p className="text-brand-steel mb-8 max-w-2xl">
          {listings.length > 0
            ? `${listings.length} IV therapy ${listings.length === 1 ? 'clinic' : 'clinics'} listed in ${cityName}. Compare treatments, pricing, and medical oversight before you book.`
            : `No IV therapy clinics listed in ${cityName} yet. Know a clinic? Add it free below.`}
        </p>

        {/* Treatment quick links */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['Myers Cocktail', 'NAD+', 'Hangover Recovery', 'Athletic Recovery', 'Immune Boost', 'Glutathione'].map(t => (
            <span key={t} className="px-3 py-1 bg-brand-teal-light text-brand-teal text-xs font-medium rounded-full border border-brand-teal/20">
              {t}
            </span>
          ))}
        </div>

        {/* Listings */}
        {listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-brand-light-2 p-12 text-center mb-12">
            <p className="text-brand-steel mb-2">No clinics listed in {cityName} yet.</p>
            <Link
              href="/submit"
              className="inline-block mt-2 px-6 py-2.5 bg-brand-teal text-white font-semibold rounded-lg hover:bg-brand-teal-dark transition-colors text-sm"
            >
              Add Your Clinic Free →
            </Link>
          </div>
        )}

        {/* FAQ */}
        <div className="bg-white rounded-xl border border-brand-light-2 p-6 mb-8">
          <h2 className="font-bold text-brand-navy text-lg mb-5">
            IV Therapy in {cityName} — Common Questions
          </h2>
          <div className="space-y-5 text-sm">
            <div>
              <h3 className="font-semibold text-brand-slate">How much does IV therapy cost in {cityName}?</h3>
              <p className="text-brand-steel mt-1">
                Prices in {cityName} range from $100 for basic hydration to $350+ for NAD+ therapy. Myers Cocktails typically run $150-250. Mobile IV services add $25-75 for in-home delivery.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-slate">Is IV therapy medically supervised in {cityName}?</h3>
              <p className="text-brand-steel mt-1">
                Reputable clinics in {cityName} operate under a physician or nurse practitioner who signs off on each patient&apos;s protocol. Look for clinics that do a health intake before your first session — this is required at any properly run IV clinic.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-slate">Can I get IV therapy delivered to my hotel or home in {cityName}?</h3>
              <p className="text-brand-steel mt-1">
                Yes. Mobile IV services are widely available in {cityName} — a nurse comes to your location within 45-90 minutes. Ideal for hangover recovery, post-event rehydration, or if you prefer the convenience of in-home treatment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-slate">How long does an IV drip take in {cityName}?</h3>
              <p className="text-brand-steel mt-1">
                Standard drips (hydration, Myers Cocktail) take 30-60 minutes. NAD+ therapy takes 2-4 hours due to the slow infusion requirement. Most clinics in {cityName} let you relax in a comfortable chair during the session.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-brand-navy text-white rounded-xl p-8 text-center">
          <h2 className="font-bold text-xl mb-2">Own an IV Therapy Clinic in {cityName}?</h2>
          <p className="text-blue-200 text-sm mb-5">
            Get listed free and start reaching patients in {cityName} who are actively searching for IV therapy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/submit"
              className="inline-block bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              Add Free Listing →
            </Link>
            <Link
              href="/listings"
              className="inline-block border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              Browse All Clinics
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
