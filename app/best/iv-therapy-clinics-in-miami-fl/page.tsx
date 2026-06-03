import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { getFeaturedListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best IV Therapy Clinics in Miami, FL — Top-Rated IV Drip Services',
  description: 'The best IV therapy clinics in Miami, Florida — covering Brickell, South Beach, Wynwood, Coral Gables, and mobile IV services serving the greater Miami area.',
}

export default async function BestIVTherapyMiamiPage() {
  const featuredListings = await getFeaturedListingsByCity('FL', 'miami')

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-brand-steel mb-6">
          <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-brand-teal transition-colors">IV Therapy Clinics</Link>
          <span>/</span>
          <Link href="/iv-therapy-clinics/fl/miami" className="hover:text-brand-teal transition-colors">Miami, FL</Link>
          <span>/</span>
          <span className="text-brand-navy">Best Of</span>
        </nav>

        <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
          <Star className="h-4 w-4 fill-brand-teal" />
          <span>Top picks</span>
        </div>

        <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
          Best IV Therapy Clinics in Miami, FL
        </h1>
        <p className="text-brand-steel mb-10 max-w-2xl">
          Miami has one of the most active IV therapy markets in the US — fueled by the city&apos;s wellness culture,
          South Beach nightlife, and a high concentration of biohackers in Brickell and Wynwood. Here are the
          top-rated options covering every part of the city, including mobile IV services for in-hotel delivery.
        </p>

        {/* Miami market context */}
        <div className="bg-brand-teal-light rounded-xl p-6 border border-brand-teal/20 mb-10">
          <h2 className="font-bold text-brand-navy mb-3">Why Miami&apos;s IV Therapy Market Is Exceptional</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-brand-slate">
            <div>
              <p className="font-semibold mb-1">Year-round wellness culture</p>
              <p className="text-brand-steel">Miami&apos;s health-conscious population drives demand beyond just hangover recovery — NAD+, athletic recovery, and aesthetic treatments are high-demand year-round.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Hotel & mobile access</p>
              <p className="text-brand-steel">Multiple mobile IV services operate throughout Miami-Dade with rapid response times — many hotels have relationships with specific services for guest requests.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Medical grade providers</p>
              <p className="text-brand-steel">Miami&apos;s large healthcare workforce and medical tourism infrastructure means a high proportion of IV clinics with strong medical supervision credentials.</p>
            </div>
          </div>
        </div>

        {/* Featured listings */}
        {featuredListings && featuredListings.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-brand-navy mb-6">Featured Miami IV Therapy Clinics</h2>
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
                      href={`/iv-therapy-clinics/fl/miami/${listing.slug}`}
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
            <h2 className="text-xl font-bold text-brand-navy mb-6">Miami IV Therapy Clinics</h2>
            <div className="bg-white rounded-xl border border-brand-light-2 p-8 text-center">
              <p className="text-brand-steel mb-4">Miami clinic listings are being added — check back soon or browse all available listings.</p>
              <Link
                href="/iv-therapy-clinics/fl/miami"
                className="inline-flex items-center gap-2 text-brand-teal font-medium hover:underline text-sm"
              >
                Browse all Miami IV clinics <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Neighborhood guide */}
        <div className="bg-white rounded-xl border border-brand-light-2 p-6 mb-10">
          <h2 className="font-bold text-brand-navy mb-4">IV Therapy by Miami Neighborhood</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-brand-slate mb-1">Brickell / Downtown</h3>
              <p className="text-brand-steel">The financial district concentration means high demand for executive wellness — NAD+ and Myers Cocktails for the midday energy crowd. Clinics here often serve professionals on lunch breaks.</p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-slate mb-1">South Beach / Miami Beach</h3>
              <p className="text-brand-steel">Highest concentration of hangover-recovery demand in the city. Multiple mobile IV services specialize in hotel delivery on Ocean Drive and Collins Ave. Weekend booking fills fast.</p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-slate mb-1">Wynwood / Midtown</h3>
              <p className="text-brand-steel">Miami&apos;s creative and biohacker hub. Clinics here tend toward the full spectrum — NAD+, athletic recovery, and aesthetic glutathione — serving a younger wellness-forward crowd.</p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-slate mb-1">Coral Gables / Coconut Grove</h3>
              <p className="text-brand-steel">Upscale family and professional neighborhoods with demand for concierge wellness, immune support, and anti-aging protocols. Clinics in this area often have higher medical oversight credentials.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-brand-navy text-white rounded-xl p-8 text-center">
          <h2 className="font-bold text-xl mb-2">See All IV Therapy Clinics in Miami</h2>
          <p className="text-blue-200 text-sm mb-5">
            Browse every listed clinic in Miami, FL — filter by treatment, mobile service availability, and medical oversight level.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/iv-therapy-clinics/fl/miami"
              className="inline-block bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              Browse Miami Clinics →
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
