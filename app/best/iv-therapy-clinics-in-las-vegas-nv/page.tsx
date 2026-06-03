import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { getFeaturedListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best IV Therapy Clinics in Las Vegas, NV — Top-Rated Hangover Drips & More',
  description: 'The best IV therapy clinics in Las Vegas, NV. 24-hour mobile services, hangover recovery, NAD+, and hotel delivery for the Strip and beyond.',
}

export default async function BestIVTherapyLasVegasPage() {
  const featuredListings = await getFeaturedListingsByCity('NV', 'las-vegas')

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-brand-steel mb-6">
          <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-brand-teal transition-colors">IV Therapy Clinics</Link>
          <span>/</span>
          <Link href="/iv-therapy-clinics/nv/las-vegas" className="hover:text-brand-teal transition-colors">Las Vegas, NV</Link>
          <span>/</span>
          <span className="text-brand-navy">Best Of</span>
        </nav>

        <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
          <Star className="h-4 w-4 fill-brand-teal" />
          <span>Top picks</span>
        </div>

        <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
          Best IV Therapy Clinics in Las Vegas, NV
        </h1>
        <p className="text-brand-steel mb-10 max-w-2xl">
          Las Vegas is the hangover recovery capital of the US. The city&apos;s IV therapy market has evolved to match
          its nightlife — 24-hour mobile services, hotel delivery in under 90 minutes, and clinics that specialize
          in rapid recovery for visitors who need to be functional by afternoon. Here&apos;s what you need to know.
        </p>

        {/* Las Vegas market context */}
        <div className="bg-brand-teal-light rounded-xl p-6 border border-brand-teal/20 mb-10">
          <h2 className="font-bold text-brand-navy mb-3">Las Vegas IV Therapy: What Makes This Market Unique</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-brand-slate">
            <div>
              <p className="font-semibold mb-1">24-hour availability</p>
              <p className="text-brand-steel">Several mobile IV services in Las Vegas operate around the clock — because 4am hangover recovery is a real market need. Most can have a nurse at your door within 60-90 minutes regardless of time.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Hotel delivery expertise</p>
              <p className="text-brand-steel">Mobile IV nurses in Las Vegas have served every major hotel on the Strip. They know the check-in processes, elevator systems, and often have established relationships with hotel security.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Group recovery specialists</p>
              <p className="text-brand-steel">Bachelor and bachelorette groups account for a significant share of Las Vegas IV demand. Look for services that explicitly offer group booking with multiple nurses for large parties.</p>
            </div>
          </div>
        </div>

        {/* Featured listings */}
        {featuredListings && featuredListings.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-brand-navy mb-6">Featured Las Vegas IV Therapy Clinics</h2>
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
                      href={`/iv-therapy-clinics/nv/las-vegas/${listing.slug}`}
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
            <h2 className="text-xl font-bold text-brand-navy mb-6">Las Vegas IV Therapy Clinics</h2>
            <div className="bg-white rounded-xl border border-brand-light-2 p-8 text-center">
              <p className="text-brand-steel mb-4">Las Vegas clinic listings are being added. Browse all available listings now.</p>
              <Link
                href="/iv-therapy-clinics/nv/las-vegas"
                className="inline-flex items-center gap-2 text-brand-teal font-medium hover:underline text-sm"
              >
                Browse all Las Vegas IV clinics <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        {/* What to know in Vegas */}
        <div className="bg-white rounded-xl border border-brand-light-2 p-6 mb-10">
          <h2 className="font-bold text-brand-navy mb-4">What to Know Before Booking IV Therapy in Las Vegas</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-brand-slate">Book in advance on weekends</h3>
              <p className="text-brand-steel mt-1">Friday and Saturday morning mobile IV demand in Las Vegas is intense. Services fill up quickly between 8am and noon. If you know you&apos;re going out Saturday night, book your Sunday morning IV before you go out — same-day availability can be limited on peak weekends.</p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-slate">Add the anti-nausea medication</h3>
              <p className="text-brand-steel mt-1">Las Vegas hangover IVs are worth adding Zofran (ondansetron) to your drip if nausea is a symptom. It requires a medical order, which reputable Las Vegas IV services have in place. The difference between an IV with and without anti-nausea medication in a severe hangover is significant.</p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-slate">Group rates are real</h3>
              <p className="text-brand-steel mt-1">Las Vegas mobile IV services are accustomed to group bookings. A party of 4-8 at the same hotel room location gets a nurse (or multiple nurses) who sequences the IVs over 3-4 hours. Per-person cost often drops 20-30% for groups. Ask specifically — many services don&apos;t advertise group pricing prominently.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-brand-navy text-white rounded-xl p-8 text-center">
          <h2 className="font-bold text-xl mb-2">See All IV Therapy Clinics in Las Vegas</h2>
          <p className="text-blue-200 text-sm mb-5">
            Browse every listed clinic and mobile IV service in Las Vegas, NV.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/iv-therapy-clinics/nv/las-vegas"
              className="inline-block bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              Browse Las Vegas Clinics →
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
