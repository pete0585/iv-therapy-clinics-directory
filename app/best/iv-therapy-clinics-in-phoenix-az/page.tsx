import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { getFeaturedListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best IV Therapy Clinics in Phoenix, AZ — Top IV Drip Services',
  description: 'The best IV therapy clinics in Phoenix and Scottsdale, AZ. From Scottsdale wellness centers to Phoenix hydration lounges, Myers\' Cocktail, NAD+, and mobile IV delivery across the Valley.',
  alternates: { canonical: 'https://www.ivtherapyclinicfinder.com/best/iv-therapy-clinics-in-phoenix-az' },
}

export const revalidate = 86400

export default async function BestIVTherapyPhoenixPage() {
  const featuredListings = await getFeaturedListingsByCity('AZ', 'phoenix').catch(() => [])

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <nav className="flex items-center gap-1.5 text-sm text-brand-steel mb-6">
          <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-brand-teal transition-colors">IV Therapy Clinics</Link>
          <span>/</span>
          <Link href="/iv-therapy-clinics/az/phoenix" className="hover:text-brand-teal transition-colors">Phoenix</Link>
          <span>/</span>
          <span className="text-brand-navy">Best Of</span>
        </nav>

        <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
          <Star className="h-4 w-4 fill-brand-teal" />
          <span>Top picks</span>
        </div>

        <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
          Find IV Therapy Clinics in Phoenix, AZ
        </h1>
        <p className="text-brand-steel mb-10 max-w-2xl">
          Phoenix and Scottsdale have one of the highest per-capita IV therapy clinic densities in the country. The Valley's extreme heat, dry climate, wellness tourism draw, and large retiree and snowbird population create year-round demand for hydration, NAD+, and recovery IVs. Scottsdale Old Town and North Scottsdale have the highest clinic density, serving both residents and the Valley's robust medical tourism market.
        </p>

        <div className="bg-brand-teal-light rounded-xl p-6 border border-brand-teal/20 mb-10">
          <h2 className="font-bold text-brand-navy mb-3">Phoenix-Scottsdale IV Therapy Market</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-brand-slate">
            <div>
              <p className="font-semibold mb-1">Heat and dehydration drive year-round demand</p>
              <p className="text-brand-steel">Phoenix\'s desert heat — with summers routinely exceeding 115°F — makes hydration IVs a genuine medical need, not just a wellness luxury. Local athletes, outdoor workers, and visitors acclimating to the heat represent a meaningful demand segment. IV clinic foot traffic peaks in summer months when heat-related dehydration and exhaustion are at their highest.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Scottsdale wellness and medical tourism hub</p>
              <p className="text-brand-steel">Scottsdale is Arizona\'s primary destination for medical tourism, wellness retreats, and high-end health experiences. Old Town Scottsdale and North Scottsdale have a dense concentration of IV clinics, longevity centers, and integrative medicine practices serving both locals and out-of-state visitors.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Snowbird and retiree population</p>
              <p className="text-brand-steel">The Valley\'s large seasonal and permanent retiree population drives demand for immune support IVs, vitamin D optimization, and anti-aging protocols. Many Phoenix-area IV clinics have developed senior-focused menus alongside standard wellness drips.</p>
            </div>
          </div>
        </div>

        {featuredListings && featuredListings.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-brand-navy mb-6">Featured Phoenix IV Therapy Clinics</h2>
            <div className="space-y-4">
              {featuredListings.map((listing: any, index: number) => (
                <div key={listing.id} className="bg-white rounded-xl border border-brand-light-2 p-6 flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-brand-teal text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-bold text-brand-navy mb-1">{listing.name}</h3>
                    <p className="text-brand-steel text-sm mb-2">{listing.city}, {listing.state}</p>
                    <Link href={`/clinic/${listing.slug}`} className="text-brand-teal text-sm font-medium hover:underline">
                      View Profile &#x2192;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-brand-light-2 rounded-xl p-8 text-center mb-10">
            <p className="text-brand-steel mb-4">Browse all Phoenix IV therapy clinics below:</p>
            <Link
              href="/listings?state=AZ"
              className="bg-brand-navy text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-navy-dark transition-colors inline-block"
            >
              Browse AZ IV Clinics
            </Link>
          </div>
        )}

        <div className="space-y-4 mb-12">
          <h2 className="text-xl font-bold text-brand-navy mb-4">Phoenix IV Therapy Questions</h2>
          {[
            { q: 'What makes the Scottsdale IV therapy market different from Phoenix?', a: 'Scottsdale commands premium pricing and targets a higher-income wellness consumer — Old Town Scottsdale and North Scottsdale have luxury IV lounges and concierge services with more premium formulations (higher-dose NAD+, exosome add-ons, peptide protocols). Phoenix proper has a more price-competitive market with a wider range of clinic tiers. Both markets are well-regulated under Arizona medical board oversight.' },
            { q: 'Does Arizona regulate IV therapy?', a: 'Yes. Arizona requires IV therapy to be prescribed and administered under Arizona physician supervision. The Arizona Medical Board regulates physician medical directors and the Arizona State Board of Nursing regulates RN/NP administration. Arizona has been active in clarifying IV therapy regulations, and the Valley\'s competitive market means standards are generally high. Arizona also licenses Naturopathic Doctors who can supervise IV therapy under their broad scope of practice.' },
            { q: 'What IV drips are most popular in Phoenix?', a: 'Phoenix IV therapy favorites include: hydration and electrolyte IVs (highest demand in summer), NAD+ (popular in Scottsdale\'s longevity market), Myers\' Cocktail (energy and immunity year-round), hangover recovery IVs (active after Scottsdale\'s nightlife), immune support with high-dose vitamin C, and glutathione brightening push. Altitude adjustment IVs are also offered by some Phoenix clinics for visitors coming from sea level who experience fatigue in the dry desert environment.' },
            { q: 'Are there mobile IV services in the Phoenix metro?', a: 'Yes. Mobile IV services are widely available throughout the Phoenix-Scottsdale metro, including Tempe, Mesa, Chandler, Gilbert, Peoria, and Surprise. Many Valley mobile IV companies offer hotel service to Scottsdale\'s resort corridor and Phoenix Sky Harbor area for arriving/departing travelers. Response times are typically 45–90 minutes within core Valley areas.' },
          ].map((item) => (
            <div key={item.q} className="bg-white rounded-xl border border-brand-light-2 p-5">
              <h3 className="font-semibold text-brand-navy mb-2">{item.q}</h3>
              <p className="text-brand-steel text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-navy rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-white mb-2">IV therapy clinic in Phoenix?</h2>
          <p className="text-gray-300 mb-4 text-sm">List your clinic and reach patients searching for IV drip services in Phoenix.</p>
          <Link
            href="/submit"
            className="bg-brand-teal text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-teal/90 transition-colors inline-block"
          >
            List Your Clinic Free
          </Link>
        </div>
      </div>
    </div>
  )
}
