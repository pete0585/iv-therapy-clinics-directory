import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { getFeaturedListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best IV Therapy Clinics in Denver, CO — Top IV Drip Services',
  description: 'The best IV therapy clinics in Denver, CO. From LoDo hydration lounges to Cherry Creek concierge IV services, Myers' Cocktail, altitude adjustment IVs, and mobile drip delivery across the Front Range.',
  alternates: { canonical: 'https://www.ivtherapyclinicfinder.com/best/iv-therapy-clinics-in-denver-co' },
}

export const revalidate = 86400

export default async function BestIVTherapyDenverPage() {
  const featuredListings = await getFeaturedListingsByCity('CO', 'denver').catch(() => [])

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <nav className="flex items-center gap-1.5 text-sm text-brand-steel mb-6">
          <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-brand-teal transition-colors">IV Therapy Clinics</Link>
          <span>/</span>
          <Link href="/iv-therapy-clinics/co/denver" className="hover:text-brand-teal transition-colors">Denver</Link>
          <span>/</span>
          <span className="text-brand-navy">Best Of</span>
        </nav>

        <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
          <Star className="h-4 w-4 fill-brand-teal" />
          <span>Top picks</span>
        </div>

        <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
          Find IV Therapy Clinics in Denver, CO
        </h1>
        <p className="text-brand-steel mb-10 max-w-2xl">
          Denver's unique combination of high altitude, extreme outdoor activity, and health-conscious culture has created a distinctive IV therapy market. Altitude adjustment IVs — helping visitors acclimate to 5,280 feet — are a Denver-specific product found nowhere else at this scale. Athletic recovery drips for skiers, climbers, marathoners, and triathletes are year-round business. Cherry Creek, LoDo, and RiNo have the highest concentration of IV clinics.
        </p>

        <div className="bg-brand-teal-light rounded-xl p-6 border border-brand-teal/20 mb-10">
          <h2 className="font-bold text-brand-navy mb-3">Denver IV Therapy Market</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-brand-slate">
            <div>
              <p className="font-semibold mb-1">Altitude adjustment IVs are Denver-specific</p>
              <p className="text-brand-steel">Denver is the only major US market with a robust altitude adjustment IV category. Visitors and newcomers who experience altitude sickness — headaches, fatigue, nausea, shortness of breath — are a significant IV clinic customer segment. Most Denver IV clinics offer altitude-specific formulas beyond standard hydration, and some serve ski resort visitors heading to higher elevations.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Outdoor athlete recovery market</p>
              <p className="text-brand-steel">Denver\'s outdoor culture — skiing, cycling, trail running, climbing — drives strong demand for athletic recovery IVs. Race weekends (Colfax Marathon, Bolder Boulder), ski weekends, and endurance events bring consistent IV therapy demand. Many Denver IV clinics partner with athletic events for on-site recovery services.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Cherry Creek and LoDo concentration</p>
              <p className="text-brand-steel">Cherry Creek has the highest density of IV therapy locations in Denver — a mix of standalone IV lounges and medical spa add-ons in the shopping district. LoDo and RiNo attract the younger professional market with more casual walk-in IV lounge concepts.</p>
            </div>
          </div>
        </div>

        {featuredListings && featuredListings.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-brand-navy mb-6">Featured Denver IV Therapy Clinics</h2>
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
            <p className="text-brand-steel mb-4">Browse all Denver IV therapy clinics below:</p>
            <Link
              href="/listings?state=CO"
              className="bg-brand-navy text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-navy-dark transition-colors inline-block"
            >
              Browse CO IV Clinics
            </Link>
          </div>
        )}

        <div className="space-y-4 mb-12">
          <h2 className="text-xl font-bold text-brand-navy mb-4">Denver IV Therapy Questions</h2>
          {[
            { q: 'Are Denver IV therapy clinics regulated by Colorado?', a: 'Yes. Colorado requires IV therapy to be prescribed and administered under physician supervision. The Colorado Medical Board regulates physician medical directors and the Colorado Nursing Board regulates RN/NP administration. Colorado has active IV therapy regulations and the competitive Denver market maintains generally high standards. Always verify a Denver IV clinic\'s medical director is licensed with the Colorado Medical Board.' },
            { q: 'What altitude adjustment IVs does Denver offer?', a: 'Denver IV clinics typically offer altitude-specific formulations combining hydration (1–2L saline or LR), B vitamins (particularly B12 and B complex), magnesium, and sometimes anti-nausea medication (Zofran or Phenergan) for acute symptoms. Some clinics add extra vitamin C or glutathione. Altitude adjustment IVs run $150–$300 in Denver clinics and are most popular with out-of-state visitors and new residents in their first weeks.' },
            { q: 'What other IV drips are popular in Denver?', a: 'Athletic recovery IVs (saline, B vitamins, amino acids, anti-inflammatory agents) are Denver\'s most distinctive category alongside altitude IVs. Year-round popular drips include: Myers\' Cocktail, NAD+ (popular with Denver\'s outdoor performance community), immune support IVs during ski season, hangover recovery (active in LoDo after Rockies and Nuggets games), and vitamin C protocols. Pre-ski-trip \'performance boost\' IVs are marketed heavily October through April.' },
            { q: 'Can I get an IV drip delivered to a ski resort near Denver?', a: 'Some Denver mobile IV services extend to nearby ski resorts — Breckenridge, Vail, and Keystone are within 60–90 minutes of Denver. Specific resort-area IV services also operate locally in Summit County and Eagle County. For visitors staying on the mountain, local resort-area IV services may be faster than sourcing from Denver. Search this directory by city to find IV services in specific Colorado mountain towns.' },
          ].map((item) => (
            <div key={item.q} className="bg-white rounded-xl border border-brand-light-2 p-5">
              <h3 className="font-semibold text-brand-navy mb-2">{item.q}</h3>
              <p className="text-brand-steel text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-navy rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-white mb-2">IV therapy clinic in Denver?</h2>
          <p className="text-gray-300 mb-4 text-sm">List your clinic and reach patients searching for IV drip services in Denver.</p>
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
