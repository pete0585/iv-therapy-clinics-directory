import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { getFeaturedListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best IV Therapy Clinics in Los Angeles, CA — Top IV Drip Services in LA',
  description: 'The best IV therapy clinics in Los Angeles, CA — covering Beverly Hills, West Hollywood, Santa Monica, Venice, and mobile IV services across the LA metro.',
}

export default async function BestIVTherapyLosAngelesPage() {
  const featuredListings = await getFeaturedListingsByCity('CA', 'los-angeles')

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-brand-steel mb-6">
          <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-brand-teal transition-colors">IV Therapy Clinics</Link>
          <span>/</span>
          <Link href="/iv-therapy-clinics/ca/los-angeles" className="hover:text-brand-teal transition-colors">Los Angeles, CA</Link>
          <span>/</span>
          <span className="text-brand-navy">Best Of</span>
        </nav>

        <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
          <Star className="h-4 w-4 fill-brand-teal" />
          <span>Top picks</span>
        </div>

        <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
          Best IV Therapy Clinics in Los Angeles, CA
        </h1>
        <p className="text-brand-steel mb-10 max-w-2xl">
          Los Angeles has the largest and most varied IV therapy market in the US. From budget-friendly clinics in the Valley
          to $600-session concierge house calls in Bel Air, the range is enormous — and so is the quality variance.
          Here&apos;s how to navigate it.
        </p>

        {/* LA market context */}
        <div className="bg-brand-teal-light rounded-xl p-6 border border-brand-teal/20 mb-10">
          <h2 className="font-bold text-brand-navy mb-3">What Makes the LA IV Therapy Market Different</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-brand-slate">
            <div>
              <p className="font-semibold mb-1">Celebrity-driven demand</p>
              <p className="text-brand-steel">LA&apos;s entertainment industry creates outsized demand for high-performance treatments — NAD+, glutathione for skin, and anti-aging protocols are significantly higher-demand here than in other markets.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Silicon Beach biohackers</p>
              <p className="text-brand-steel">The tech concentration in Venice, Playa Vista, and Santa Monica drives strong demand for performance optimization IVs. NAD+ and Myers Cocktail memberships are common in this demographic.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Wide price range</p>
              <p className="text-brand-steel">LA has the widest price spread of any US IV therapy market — $100 basic hydration clinics coexist with $600 concierge house calls. The quality isn&apos;t always correlated to the price.</p>
            </div>
          </div>
        </div>

        {/* Featured listings */}
        {featuredListings && featuredListings.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-brand-navy mb-6">Featured Los Angeles IV Therapy Clinics</h2>
            <div className="space-y-4">
              {featuredListings.map((listing, index) => (
                <div key={listing.id} className="bg-white rounded-xl border border-brand-light-2 p-6 flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-brand-teal text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-bold text-brand-navy mb-1">{listing.business_name}</h3>
                    <p className="text-brand-steel text-sm mb-2">{listing.address}, {listing.city}, {listing.state}</p>
                    {listing.services_offered && listing.services_offered.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {listing.services_offered.slice(0, 4).map((s: string) => (
                          <span key={s} className="px-2 py-0.5 bg-slate-100 text-brand-steel text-xs rounded-full">{s}</span>
                        ))}
                      </div>
                    )}
                    <Link
                      href={`/iv-therapy-clinics/ca/los-angeles/${listing.slug}`}
                      className="text-brand-teal text-sm font-medium hover:underline"
                    >
                      View full listing →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-brand-navy mb-6">Los Angeles IV Therapy Clinics</h2>
            <div className="bg-white rounded-xl border border-brand-light-2 p-8 text-center">
              <p className="text-brand-steel mb-4">Los Angeles clinic listings are being added. Browse all available listings now.</p>
              <Link
                href="/iv-therapy-clinics/ca/los-angeles"
                className="inline-flex items-center gap-2 text-brand-teal font-medium hover:underline text-sm"
              >
                Browse all LA IV clinics <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Neighborhood guide */}
        <div className="bg-white rounded-xl border border-brand-light-2 p-6 mb-10">
          <h2 className="font-bold text-brand-navy mb-4">IV Therapy by LA Neighborhood</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-brand-slate mb-1">Beverly Hills / Bel Air</h3>
              <p className="text-brand-steel">The luxury tier of LA&apos;s IV therapy market. Concierge house-call services dominate here — $300-600 per session, but with physician-on-site levels of oversight and fully personalized protocols. High concentration of NAD+ and aesthetic glutathione demand.</p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-slate mb-1">West Hollywood / Hollywood</h3>
              <p className="text-brand-steel">Entertainment industry demand — actors, musicians, and production crews use IV therapy heavily during shoots. Same-day booking and mobile services are common. Hangover recovery and energy drips dominate on weekends; performance protocols during production weeks.</p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-slate mb-1">Santa Monica / Venice / Silicon Beach</h3>
              <p className="text-brand-steel">Tech-and-wellness crossover. This is where NAD+ membership programs and biohacking-focused clinics are most concentrated. Strong athletic recovery demand from the beach fitness culture and cycling community.</p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-slate mb-1">The Valley (Encino, Sherman Oaks, Studio City)</h3>
              <p className="text-brand-steel">More family-oriented market with lower price points than the Westside. Good clinics at $150-200 per Myers Cocktail. Less celebrity pressure means more straightforward, professional medical oversight.</p>
            </div>
          </div>
        </div>

        {/* Questions to ask */}
        <div className="bg-white rounded-xl border border-brand-light-2 p-6 mb-10">
          <h2 className="font-bold text-brand-navy mb-4">Questions to Ask Any LA IV Clinic Before Booking</h2>
          <ul className="space-y-2 text-sm text-brand-steel">
            <li>✓ Who is the medical director, and are they a licensed physician or NP?</li>
            <li>✓ What compounding pharmacy do you source your IV solutions from?</li>
            <li>✓ What credentials does the nurse administering my IV have?</li>
            <li>✓ What do you do if a patient has an adverse reaction during infusion?</li>
            <li>✓ Can you provide a breakdown of what&apos;s in the formula I&apos;m choosing?</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-brand-navy text-white rounded-xl p-8 text-center">
          <h2 className="font-bold text-xl mb-2">See All IV Therapy Clinics in Los Angeles</h2>
          <p className="text-blue-200 text-sm mb-5">
            Browse every listed clinic in Los Angeles, CA — filter by neighborhood, treatment, and mobile service availability.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/iv-therapy-clinics/ca/los-angeles"
              className="inline-block bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              Browse LA Clinics →
            </Link>
            <Link
              href="/submit"
              className="inline-block border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              Add Your Clinic
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
