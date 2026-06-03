import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, Zap, Shield, Star, ChevronRight, Droplets, Activity } from 'lucide-react'
import { getFeaturedListings, getTotalCount, getTopCities, getStateCounts } from '@/lib/data'
import { formatPhone, stateAbbrevToName, stateSlug, citySlug, formatPriceRange } from '@/lib/utils'
import type { IvTherapyListing } from '@/lib/types'
import { TREATMENT_SLUGS } from '@/lib/types'

export const metadata: Metadata = {
  title: 'IV Therapy Clinic Finder — Find IV Drip Clinics Near You',
  description: 'Find IV therapy and IV hydration clinics near you. Compare treatments, pricing, and medical oversight. Myers Cocktail, NAD+, hangover recovery, and more — free to search.',
  openGraph: {
    title: 'Find an IV Therapy Clinic Near You | IVTherapyClinicFinder',
    description: 'The most complete directory of IV therapy clinics in the US. Compare treatments, pricing, and find medically supervised providers.',
  },
}

export const revalidate = 3600

const FEATURED_TREATMENTS = [
  { slug: 'myers-cocktail', name: 'Myers Cocktail', emoji: '⚡', tagline: 'The OG energy drip' },
  { slug: 'nad-plus-therapy', name: 'NAD+ Therapy', emoji: '🧬', tagline: 'Cellular energy & longevity' },
  { slug: 'hangover-recovery', name: 'Hangover Recovery', emoji: '🌅', tagline: 'Fast hangover relief' },
  { slug: 'glutathione', name: 'Glutathione', emoji: '✨', tagline: 'Master antioxidant' },
  { slug: 'athletic-recovery', name: 'Athletic Recovery', emoji: '🏋️', tagline: 'Post-workout repair' },
  { slug: 'immune-boost', name: 'Immune Boost', emoji: '🛡️', tagline: 'Fight illness fast' },
]

export default async function HomePage() {
  const [totalCount, topCities, stateCounts, featuredListings] = await Promise.all([
    getTotalCount().catch(() => 0),
    getTopCities(24).catch(() => []),
    getStateCounts().catch(() => ({})),
    getFeaturedListings(6).catch(() => []),
  ])

  const stateList = Object.entries(stateCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-navy to-brand-cyan-dark text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-brand-cyan blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand-amber blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-cyan/20 text-brand-cyan px-3 py-1 rounded-full text-sm font-medium mb-6">
              <Droplets className="w-4 h-4" aria-label="IV drip" />
              {totalCount > 0 ? `${totalCount.toLocaleString()}+` : 'Hundreds of'} clinics listed across the US
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Find IV Therapy<br className="hidden md:block" />
              <span className="text-brand-cyan"> That Works for You</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Compare treatments, pricing, and medical oversight. Myers Cocktail, NAD+, hangover recovery — find the right drip clinic near you.
            </p>
            <SearchHero />
            <div className="flex flex-wrap gap-2 mt-5">
              <QuickFilter href="/iv-therapy-clinics?mobile=true" emoji="🚐" label="Mobile IV Service" />
              <QuickFilter href="/iv-therapy/nad-plus-therapy" emoji="🧬" label="NAD+ Therapy" />
              <QuickFilter href="/iv-therapy/hangover-recovery" emoji="🌅" label="Hangover Recovery" />
              <QuickFilter href="/iv-therapy/myers-cocktail" emoji="⚡" label="Myers Cocktail" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-brand-cyan text-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" aria-label="Verified" />
              Treatment-specific filtering
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" aria-label="Activity" />
              Pricing transparency
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" aria-label="Star" />
              Medical oversight levels
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" aria-label="Zap" />
              Mobile IV services included
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Treatment */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-2">Browse by Treatment</h2>
          <p className="text-gray-600 mb-8">Find clinics that offer the specific IV therapy you&apos;re looking for</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {FEATURED_TREATMENTS.map(({ slug, name, emoji, tagline }) => (
              <Link
                key={slug}
                href={`/iv-therapy/${slug}`}
                className="card p-4 text-center hover:border-brand-cyan hover:shadow-md transition-all group"
              >
                <div className="text-3xl mb-2">{emoji}</div>
                <div className="font-semibold text-sm text-gray-900 group-hover:text-brand-cyan leading-tight">{name}</div>
                <div className="text-xs text-gray-500 mt-1">{tagline}</div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/iv-therapy-clinics" className="text-brand-cyan hover:underline text-sm font-medium">
              Browse all treatments →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      {featuredListings.length > 0 && (
        <section className="py-12 bg-brand-navy-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="section-heading">Featured Clinics</h2>
                <p className="text-gray-600 text-sm mt-1">Verified providers with full treatment menus</p>
              </div>
              <Link href="/iv-therapy-clinics" className="text-brand-cyan hover:underline text-sm font-medium flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" aria-label="" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Browse by City */}
      {topCities.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-heading mb-2">Browse by City</h2>
            <p className="text-gray-600 mb-8">Find IV therapy clinics in your metro area</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {topCities.map(({ city, state, count }) => (
                <Link
                  key={`${city}-${state}`}
                  href={`/iv-therapy-clinics/${stateSlug(state)}/${citySlug(city)}`}
                  className="card p-3 text-center hover:border-brand-cyan transition-all group"
                >
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-cyan flex-shrink-0" aria-label="" />
                    <span className="font-semibold text-sm text-gray-900 group-hover:text-brand-cyan truncate">{city}</span>
                  </div>
                  <div className="text-xs text-gray-500">{state} · {count} clinics</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Browse by State */}
      {stateList.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-heading mb-2">Browse by State</h2>
            <p className="text-gray-600 mb-8">IV therapy clinics in every state</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {stateList.map(([state, count]) => (
                <Link
                  key={state}
                  href={`/iv-therapy-clinics/${stateSlug(state)}`}
                  className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-white hover:border-brand-cyan hover:bg-brand-cyan-light transition-all group"
                >
                  <span className="font-medium text-sm text-gray-900 group-hover:text-brand-cyan-dark">
                    {stateAbbrevToName(state)}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{count}</span>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/iv-therapy-clinics" className="btn-secondary inline-flex">
                View All Clinics
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why use us */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-heading mb-3">Why IVTherapyClinicFinder?</h2>
            <p className="text-gray-600">
              Most IV therapy directories show you a name and a phone number. We show you everything you need to book confidently.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon="💊"
              title="Treatment-Specific Search"
              description="Search by Myers Cocktail, NAD+, Glutathione, hangover recovery, and 10+ more treatments. Find clinics that offer exactly what you need."
            />
            <FeatureCard
              icon="💰"
              title="Pricing Transparency"
              description="See price ranges before you call. Verified clinics display their session rates — no more calling five clinics to compare prices."
            />
            <FeatureCard
              icon="🩺"
              title="Medical Oversight Level"
              description="Know if a clinic is MD-supervised, NP-led, or RN-administered before you book. The #1 trust question first-timers ask — answered upfront."
            />
          </div>
        </div>
      </section>

      {/* CTA for clinic owners */}
      <section className="py-14 bg-brand-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Own an IV therapy clinic?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            At $100-350/session with clients coming back 1-4x/month, one new patient from your listing pays for years of membership. Claim your clinic for free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/submit" className="btn-primary text-base px-8 py-4">
              Add Your Clinic — Free
            </Link>
            <Link
              href="/iv-therapy-clinics"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-xl border border-white/30 hover:border-white/60 transition-colors text-base"
            >
              Find Your Listing
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <span>✓ Free basic listing</span>
            <span>✓ Verified tier — $99/yr</span>
            <span>✓ Featured placement — $199/yr</span>
          </div>
        </div>
      </section>

      {/* Treatment overview */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8">All IV Therapy Treatments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(TREATMENT_SLUGS).map(([slug, name]) => (
              <Link
                key={slug}
                href={`/iv-therapy/${slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-brand-cyan transition-all group"
              >
                <span className="font-medium text-sm text-gray-900 group-hover:text-brand-cyan">{name}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-cyan" aria-label="" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function SearchHero() {
  return (
    <form action="/iv-therapy-clinics" method="get" className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1 relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-label="Location" />
        <input
          type="text"
          name="q"
          placeholder="City, state, or clinic name..."
          className="w-full pl-10 pr-4 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 border-0 focus:outline-none focus:ring-2 focus:ring-brand-cyan text-base shadow-lg"
        />
      </div>
      <button
        type="submit"
        className="px-8 py-4 bg-brand-amber text-white font-bold rounded-xl hover:bg-brand-amber-dark transition-colors text-base shadow-lg whitespace-nowrap"
      >
        Find Clinics
      </button>
    </form>
  )
}

function QuickFilter({ href, emoji, label }: { href: string; emoji: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors border border-white/20"
    >
      <span>{emoji}</span>
      {label}
    </Link>
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
          <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-2">{listing.name}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-label="Location" />
            <span>{listing.city}, {listing.state}</span>
          </div>
        </div>
        {listing.listing_tier === 'featured' && (
          <span className="badge-featured flex-shrink-0">Featured</span>
        )}
        {listing.listing_tier === 'verified' && (
          <span className="badge-verified flex-shrink-0">Verified</span>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {listing.is_mobile && <span className="badge-mobile">Mobile Service</span>}
        {listing.is_franchise && listing.franchise_name && (
          <span className="badge-franchise">{listing.franchise_name}</span>
        )}
        {listing.services_offered?.slice(0, 2).map((s) => (
          <span key={s} className="badge-treatment">{s}</span>
        ))}
      </div>
      {price && (
        <div className="text-sm font-semibold text-brand-emerald mb-2">{price}</div>
      )}
      {listing.phone && (
        <div className="flex items-center gap-2 text-sm text-brand-cyan font-medium">
          <Phone className="w-4 h-4" aria-label="Phone" />
          {formatPhone(listing.phone)}
        </div>
      )}
    </Link>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-bold text-brand-navy text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
