import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { getFeaturedListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best IV Therapy Clinics in Chicago, IL — Top IV Drip Services',
  description: 'The best IV therapy clinics in Chicago, IL. From River North IV lounges to Loop concierge drip services, Myers' Cocktail, NAD+, and mobile IV delivery across Chicagoland.',
  alternates: { canonical: 'https://www.ivtherapyclinicfinder.com/best/iv-therapy-clinics-in-chicago-il' },
}

export const revalidate = 86400

export default async function BestIVTherapyChicagoPage() {
  const featuredListings = await getFeaturedListingsByCity('IL', 'chicago').catch(() => [])

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <nav className="flex items-center gap-1.5 text-sm text-brand-steel mb-6">
          <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-brand-teal transition-colors">IV Therapy Clinics</Link>
          <span>/</span>
          <Link href="/iv-therapy-clinics/il/chicago" className="hover:text-brand-teal transition-colors">Chicago</Link>
          <span>/</span>
          <span className="text-brand-navy">Best Of</span>
        </nav>

        <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
          <Star className="h-4 w-4 fill-brand-teal" />
          <span>Top picks</span>
        </div>

        <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
          Find IV Therapy Clinics in Chicago, IL
        </h1>
        <p className="text-brand-steel mb-10 max-w-2xl">
          Chicago is one of the Midwest's largest IV therapy markets. The city's dense professional population in the Loop and River North has driven a competitive IV lounge market, while South Loop and Lincoln Park have a mix of medical spa and concierge IV services. Chicago's harsh winters make immunity-boosting and vitamin IV drips particularly popular November through March.
        </p>

        <div className="bg-brand-teal-light rounded-xl p-6 border border-brand-teal/20 mb-10">
          <h2 className="font-bold text-brand-navy mb-3">Chicago IV Therapy Market</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-brand-slate">
            <div>
              <p className="font-semibold mb-1">Strong corporate and events market</p>
              <p className="text-brand-steel">Chicago\'s Loop and River North have a large corporate meeting and events industry. Pre-event energy IVs, post-conference recovery, and NAD+ for executives are common Chicago use cases. Several IV services specifically target Chicago\'s financial district and convention center corridor.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Medical spa concentration in River North</p>
              <p className="text-brand-steel">River North, the Gold Coast, and Old Town have the highest density of IV therapy locations in the city. Walk-in IV lounges coexist with medical spa add-on services and home concierge services across Chicago\'s north neighborhoods.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Telehealth and mobile IV growing outside the Loop</p>
              <p className="text-brand-steel">Chicago\'s suburban sprawl — Naperville, Evanston, Schaumburg, Oak Park — makes mobile IV services and telehealth wellness consultations practical. Mobile IV services now cover most of the Chicagoland area without requiring a commute to the city.</p>
            </div>
          </div>
        </div>

        {featuredListings && featuredListings.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-brand-navy mb-6">Featured Chicago IV Therapy Clinics</h2>
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
            <p className="text-brand-steel mb-4">Browse all Chicago IV therapy clinics below:</p>
            <Link
              href="/listings?state=IL"
              className="bg-brand-navy text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-navy-dark transition-colors inline-block"
            >
              Browse IL IV Clinics
            </Link>
          </div>
        )}

        <div className="space-y-4 mb-12">
          <h2 className="text-xl font-bold text-brand-navy mb-4">Chicago IV Therapy Questions</h2>
          {[
            { q: 'Are IV therapy clinics in Chicago medically supervised?', a: 'Chicago IV therapy clinics vary in medical oversight. The highest standard — and what patients should look for — is a medical director who is an MD or DO licensed in Illinois, with nurse practitioners or RNs administering drips under physician protocols. Illinois requires IV therapy to be administered by licensed nurses under physician supervision. Ask any Chicago IV clinic who their medical director is and who will be administering your drip.' },
            { q: 'What are the most popular IV drips in Chicago?', a: 'Chicago\'s most common IV infusions include: Myers\' Cocktail (vitamin C, B vitamins, magnesium — popular for energy and immunity), NAD+ (longevity and cognitive performance — common in Chicago\'s finance community), hangover recovery IVs (high weekend demand in River North), glutathione push (antioxidant and skin brightening), and high-dose vitamin C (immune support, especially during Chicago winters). Mobile hangover recovery IVs are particularly active Friday through Sunday in Chicago\'s entertainment districts.' },
            { q: 'Does health insurance cover IV therapy in Chicago?', a: 'No. Wellness IV therapy is not covered by health insurance in Illinois or nationally. IV therapy at this level is elective and cash-pay. Some HSA/FSA plans may cover IV therapy when prescribed for a specific medical condition by a physician — ask your benefits administrator. Chicago\'s competitive IV market means pricing is often transparent and negotiable, particularly for membership packages.' },
            { q: 'What is the difference between a Chicago IV lounge and a concierge mobile IV service?', a: 'IV lounges — fixed-location walk-in clinics in River North, the Loop, and Lincoln Park — offer scheduled appointments in a lounge setting, typically with a menu of standardized formulas. Mobile concierge IV services come to you (home, hotel, or office) and charge a travel premium. Mobile services are popular for post-event recovery, hotel stays, and corporate wellness events. Price and wait time favor IV lounges; convenience and privacy favor mobile services.' },
          ].map((item) => (
            <div key={item.q} className="bg-white rounded-xl border border-brand-light-2 p-5">
              <h3 className="font-semibold text-brand-navy mb-2">{item.q}</h3>
              <p className="text-brand-steel text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-navy rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-white mb-2">IV therapy clinic in Chicago?</h2>
          <p className="text-gray-300 mb-4 text-sm">List your clinic and reach patients searching for IV drip services in Chicago.</p>
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
