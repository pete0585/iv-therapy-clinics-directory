import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { getFeaturedListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best IV Therapy Clinics in Houston, TX — Top IV Drip Services',
  description: 'The best IV therapy clinics in Houston, TX. From Medical Center IV clinics to Galleria concierge drip services, Myers\' Cocktail, NAD+, and mobile IV delivery across the greater Houston metro.',
  alternates: { canonical: 'https://www.ivtherapyclinicfinder.com/best/iv-therapy-clinics-in-houston-tx' },
}

export const revalidate = 86400

export default async function BestIVTherapyHoustonPage() {
  const featuredListings = await getFeaturedListingsByCity('TX', 'houston').catch(() => [])

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <nav className="flex items-center gap-1.5 text-sm text-brand-steel mb-6">
          <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-brand-teal transition-colors">IV Therapy Clinics</Link>
          <span>/</span>
          <Link href="/iv-therapy-clinics/tx/houston" className="hover:text-brand-teal transition-colors">Houston</Link>
          <span>/</span>
          <span className="text-brand-navy">Best Of</span>
        </nav>

        <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
          <Star className="h-4 w-4 fill-brand-teal" />
          <span>Top picks</span>
        </div>

        <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
          Find IV Therapy Clinics in Houston, TX
        </h1>
        <p className="text-brand-steel mb-10 max-w-2xl">
          Houston's Texas Medical Center — the world's largest medical complex — gives the city an unusually sophisticated medical context for IV therapy. The city's oil and gas industry, large professional population, and extreme heat climate drive strong demand for hydration and energy IV drips year-round. The Galleria, Montrose, and River Oaks corridors have concentrations of IV therapy clinics.
        </p>

        <div className="bg-brand-teal-light rounded-xl p-6 border border-brand-teal/20 mb-10">
          <h2 className="font-bold text-brand-navy mb-3">Houston IV Therapy Market</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-brand-slate">
            <div>
              <p className="font-semibold mb-1">Medical Center proximity raises standards</p>
              <p className="text-brand-steel">Being adjacent to the world\'s largest medical complex means Houston\'s IV therapy market has higher baseline clinical expectations. Many Houston IV clinic medical directors are affiliated with TMC-area hospitals or hold academic medical appointments. This doesn\'t guarantee quality, but the competitive pressure from high-caliber local medicine is visible.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Heat and humidity drive hydration demand</p>
              <p className="text-brand-steel">Houston\'s subtropical climate — with hot, humid summers lasting six months — creates year-round demand for hydration and electrolyte IVs. Athletes, outdoor workers, and professionals working in Houston\'s heat are a consistent market segment. Sports event IVs and post-outdoor-event recovery are more common in Houston than in northern city markets.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Energy industry drives corporate IV demand</p>
              <p className="text-brand-steel">Houston\'s oil and gas industry creates a corporate wellness market — energy executives seeking NAD+ and performance optimization IVs, and field workers seeking post-shift recovery. Some Houston IV services specialize in corporate wellness programs and on-site IV services for large employers.</p>
            </div>
          </div>
        </div>

        {featuredListings && featuredListings.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-brand-navy mb-6">Featured Houston IV Therapy Clinics</h2>
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
            <p className="text-brand-steel mb-4">Browse all Houston IV therapy clinics below:</p>
            <Link
              href="/listings?state=TX"
              className="bg-brand-navy text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-navy-dark transition-colors inline-block"
            >
              Browse TX IV Clinics
            </Link>
          </div>
        )}

        <div className="space-y-4 mb-12">
          <h2 className="text-xl font-bold text-brand-navy mb-4">Houston IV Therapy Questions</h2>
          {[
            { q: 'Are there IV therapy clinics near the Texas Medical Center in Houston?', a: 'Yes. The Texas Medical Center and surrounding neighborhoods — Museum District, Midtown, and Upper Kirby — have several IV therapy clinics that benefit from proximity to Houston\'s medical establishment. TMC-adjacent clinics often have stronger medical director credentials than average. The Galleria and River Oaks areas also have high-end IV therapy and wellness practices serving Houston\'s affluent west side.' },
            { q: 'What IV drips are popular in Houston?', a: 'Houston\'s most popular IV drips include: hydration and electrolyte IVs (high demand given the heat), Myers\' Cocktail (energy and immunity), NAD+ (cognitive performance and longevity, popular in the business community), hangover recovery (active weekend market in Midtown and Montrose), vitamin C immune support, and glutathione brightening push. Post-athletic event recovery IVs have grown with Houston\'s Bayou City road race and triathlon community.' },
            { q: 'Do Houston IV clinics require a doctor\'s prescription?', a: 'Texas law requires IV therapy to be prescribed and administered under physician supervision. IV clinics in Houston must have a licensed Texas physician as medical director who reviews protocols and supervises administration. Some Houston IV clinics operate with nurse practitioners or physician assistants handling day-to-day care under physician oversight. Always confirm the medical director\'s credentials and Texas licensure before booking.' },
            { q: 'How do I find a mobile IV service in Houston?', a: 'Houston\'s sprawling geography — Sugar Land, Katy, The Woodlands, Pearland, and Pearland are all significant distances from the city center — makes mobile IV services practical. Several Houston mobile IV companies serve the full metro, offering home, hotel, and office delivery within a 30–60 minute response time. Mobile services typically charge $50–$150 more than in-clinic pricing. Use this directory to search Houston-area mobile IV providers.' },
          ].map((item) => (
            <div key={item.q} className="bg-white rounded-xl border border-brand-light-2 p-5">
              <h3 className="font-semibold text-brand-navy mb-2">{item.q}</h3>
              <p className="text-brand-steel text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-navy rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-white mb-2">IV therapy clinic in Houston?</h2>
          <p className="text-gray-300 mb-4 text-sm">List your clinic and reach patients searching for IV drip services in Houston.</p>
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
