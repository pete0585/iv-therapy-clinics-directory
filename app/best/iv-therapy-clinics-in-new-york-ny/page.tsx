import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { getFeaturedListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best IV Therapy Clinics in New York, NY — Top IV Drip Services in NYC',
  description: 'The best IV therapy clinics in New York, NY. From SoHo walk-in IV lounges to Midtown concierge services, NAD+, Myers\' Cocktail, and mobile IV delivery across all five boroughs.',
  alternates: { canonical: 'https://www.ivtherapyclinicfinder.com/best/iv-therapy-clinics-in-new-york-ny' },
}

export const revalidate = 86400

export default async function BestIVTherapyNewYorkPage() {
  const featuredListings = await getFeaturedListingsByCity('NY', 'new-york').catch(() => [])

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-brand-steel mb-6">
          <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-brand-teal transition-colors">IV Therapy Clinics</Link>
          <span>/</span>
          <Link href="/iv-therapy-clinics/ny/new-york" className="hover:text-brand-teal transition-colors">New York, NY</Link>
          <span>/</span>
          <span className="text-brand-navy">Best Of</span>
        </nav>

        <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
          <Star className="h-4 w-4 fill-brand-teal" />
          <span>Top picks</span>
        </div>

        <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
          Find IV Therapy Clinics in New York, NY
        </h1>
        <p className="text-brand-steel mb-10 max-w-2xl">
          New York City has the highest concentration of IV therapy locations of any US city — 100+ clinics
          across all five boroughs. From walk-in IV lounges in SoHo to concierge mobile services serving
          Midtown finance executives and the Hamptons crowd, the market is vast. Here&apos;s how to navigate it.
        </p>

        {/* NYC market context */}
        <div className="bg-brand-teal-light rounded-xl p-6 border border-brand-teal/20 mb-10">
          <h2 className="font-bold text-brand-navy mb-3">What Makes the NYC IV Therapy Market Different</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-brand-slate">
            <div>
              <p className="font-semibold mb-1">Highest clinic density in the US</p>
              <p className="text-brand-steel">New York City has more IV therapy locations per capita than any other US city. Major franchises like Drip Bar, Hydreight, and Reset IV operate multiple Manhattan locations, alongside dozens of independent medical spas and concierge practices.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Finance and fashion industries drive demand</p>
              <p className="text-brand-steel">SoHo and Midtown have the densest concentration of walk-in IV lounges in the city, serving the fashion, finance, and media industries. Jet lag recovery, pre-meeting energy protocols, and post-event recovery are common use cases in these neighborhoods.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Weekend hangover and Hamptons concierge</p>
              <p className="text-brand-steel">Post-party and hangover IV services are popular Friday through Sunday in Manhattan. A separate concierge mobile IV market serves the Hamptons corridor — summer weekend demand in the Hamptons rivals major metro markets.</p>
            </div>
          </div>
        </div>

        {/* Featured listings */}
        {featuredListings && featuredListings.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-brand-navy mb-6">Featured New York IV Therapy Clinics</h2>
            <div className="space-y-4">
              {featuredListings.map((listing, index) => (
                <div key={listing.id} className="bg-white rounded-xl border border-brand-light-2 p-6 flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-brand-teal text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-bold text-brand-navy mb-1">{listing.name}</h3>
                    <p className="text-brand-steel text-sm mb-2">{listing.address}, {listing.city}, {listing.state}</p>
                    {listing.services_offered && listing.services_offered.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {listing.services_offered.slice(0, 4).map((s: string) => (
                          <span key={s} className="px-2 py-0.5 bg-slate-100 text-brand-steel text-xs rounded-full">{s}</span>
                        ))}
                      </div>
                    )}
                    <Link
                      href={`/iv-therapy-clinics/ny/new-york/${listing.slug}`}
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
            <h2 className="text-xl font-bold text-brand-navy mb-6">New York IV Therapy Clinics</h2>
            <div className="bg-white rounded-xl border border-brand-light-2 p-8 text-center">
              <p className="text-brand-steel mb-4">New York City clinic listings are being added. Browse all available listings now.</p>
              <Link
                href="/iv-therapy-clinics/ny/new-york"
                className="inline-flex items-center gap-2 text-brand-teal font-medium hover:underline text-sm"
              >
                Browse all NYC IV clinics <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Neighborhood guide */}
        <div className="bg-white rounded-xl border border-brand-light-2 p-6 mb-10">
          <h2 className="font-bold text-brand-navy mb-4">IV Therapy by NYC Neighborhood</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-brand-slate mb-1">SoHo / Tribeca / Flatiron</h3>
              <p className="text-brand-steel">The highest density of walk-in IV lounges in NYC. Fashion week demand, media industry clients, and influencer culture have made this corridor a hub for same-day IV appointments. Drip Bar and multiple boutique IV spas operate here — expect walk-in availability during business hours.</p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-slate mb-1">Midtown / Upper East Side</h3>
              <p className="text-brand-steel">Finance and corporate executive market. Midtown clinics skew toward performance and productivity protocols — NAD+, Myers Cocktail, and high-dose vitamin C are popular. The Upper East Side has concierge-style practices with physician medical directors on-site.</p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-slate mb-1">Brooklyn (Williamsburg, Park Slope)</h3>
              <p className="text-brand-steel">Health-conscious demographic drives steady demand for wellness IV therapy — immune support, beauty glutathione, and athletic recovery. Mobile IV services are particularly popular in Brooklyn given the density of residential neighborhoods without easy clinic access.</p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-slate mb-1">Mobile / Concierge (All Boroughs)</h3>
              <p className="text-brand-steel">Multiple mobile IV services serve all five boroughs and extend to the Hamptons on summer weekends. Average response time in Manhattan is 45-90 minutes. Expect to pay a premium of $50-100 over in-clinic pricing for the convenience of home or hotel delivery.</p>
            </div>
          </div>
        </div>

        {/* Questions to ask */}
        <div className="bg-white rounded-xl border border-brand-light-2 p-6 mb-10">
          <h2 className="font-bold text-brand-navy mb-4">Questions to Ask Any NYC IV Clinic Before Booking</h2>
          <ul className="space-y-2 text-sm text-brand-steel">
            <li>✓ Is the administering nurse a licensed RN with an active New York State license?</li>
            <li>✓ Who is the medical director, and are they licensed to practice in New York?</li>
            <li>✓ What compounding pharmacy do you source your IV solutions from?</li>
            <li>✓ Do you do an intake screening before every session, or only the first one?</li>
            <li>✓ What is your protocol if a patient has an adverse reaction during infusion?</li>
          </ul>
        </div>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-brand-navy mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'How much does IV therapy cost in New York City?',
                a: 'IV therapy in NYC typically ranges from $125 to $400 per session depending on the treatment and location. Basic hydration drips start around $125-175 in most walk-in clinics. Myers Cocktail runs $175-350. NAD+ therapy ranges from $300-700 or more. Midtown and Upper East Side clinics tend to run 20-30% higher than outer borough or New Jersey options. Mobile/concierge services add a travel premium of $50-100 to in-clinic rates.',
              },
              {
                q: 'Are there 24-hour IV therapy services in NYC?',
                a: 'Several mobile IV therapy services in New York City operate outside standard business hours, including late-night and weekend service for hangover recovery and event recovery. Same-day appointment availability is common in Manhattan during peak hours. Call ahead for after-hours and weekend bookings to confirm availability.',
              },
              {
                q: 'Do IV therapy clinics in New York need a license to operate?',
                a: 'Yes. In New York State, IV therapy must be administered by a licensed registered nurse (RN) or other licensed clinical professional, under physician or nurse practitioner supervision. New York State has specific regulations around compounding pharmacies and nursing scope of practice. Any IV clinic operating in NYC should be able to name their medical director and confirm their RN staff hold active NYS licenses — you can verify this on the NYS Health Department Professions Online Services portal.',
              },
              {
                q: 'What IV drip is most popular in NYC?',
                a: 'The Myers\' Cocktail remains the most popular IV drip in NYC — magnesium, B vitamins, vitamin C, and calcium in a saline base. NAD+ therapy is the fastest-growing category, particularly in Midtown and the Upper East Side among high-performing professionals and biohackers. Glutathione push (often added to a base Myers\') is popular for skin brightening and detox. Hangover recovery drips (saline, B vitamins, anti-nausea medication) dominate weekend demand.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl border border-brand-light-2 p-6">
                <h3 className="font-bold text-brand-navy mb-2">{q}</h3>
                <p className="text-brand-steel text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-brand-navy text-white rounded-xl p-8 text-center">
          <h2 className="font-bold text-xl mb-2">See All IV Therapy Clinics in New York City</h2>
          <p className="text-blue-200 text-sm mb-5">
            Browse every listed clinic in New York, NY — filter by neighborhood, treatment, and mobile service availability.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/iv-therapy-clinics/ny/new-york"
              className="inline-block bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              Browse NYC Clinics →
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
