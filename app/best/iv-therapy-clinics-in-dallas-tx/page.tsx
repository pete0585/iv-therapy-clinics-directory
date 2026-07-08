import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { getFeaturedListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best IV Therapy Clinics in Dallas, TX — Top IV Drip Services',
  description: 'The best IV therapy clinics in Dallas, TX. From Uptown IV lounges to Plano concierge drip services, Myers\' Cocktail, NAD+, and mobile IV delivery across DFW.',
  alternates: { canonical: 'https://www.ivtherapyclinicfinder.com/best/iv-therapy-clinics-in-dallas-tx' },
}

export const revalidate = 86400

export default async function BestIVTherapyDallasPage() {
  const featuredListings = await getFeaturedListingsByCity('TX', 'dallas').catch(() => [])

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <nav className="flex items-center gap-1.5 text-sm text-brand-steel mb-6">
          <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-brand-teal transition-colors">IV Therapy Clinics</Link>
          <span>/</span>
          <Link href="/iv-therapy-clinics/tx/dallas" className="hover:text-brand-teal transition-colors">Dallas</Link>
          <span>/</span>
          <span className="text-brand-navy">Best Of</span>
        </nav>

        <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
          <Star className="h-4 w-4 fill-brand-teal" />
          <span>Top picks</span>
        </div>

        <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
          Find IV Therapy Clinics in Dallas, TX
        </h1>
        <p className="text-brand-steel mb-10 max-w-2xl">
          Dallas has one of the fastest-growing IV therapy markets in Texas. The city's affluent, health-conscious professional population in Uptown, Highland Park, and Frisco drives strong demand for wellness IV drips. The Dallas market is characterized by a mix of franchise IV bars (Drip Bar, Reset IV) and independent high-end concierge practices, with mobile IV services covering all of DFW.
        </p>

        <div className="bg-brand-teal-light rounded-xl p-6 border border-brand-teal/20 mb-10">
          <h2 className="font-bold text-brand-navy mb-3">Dallas IV Therapy Market</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-brand-slate">
            <div>
              <p className="font-semibold mb-1">Uptown and Highland Park concentration</p>
              <p className="text-brand-steel">Dallas\'s Uptown corridor and Highland Park/University Park neighborhoods have the highest density of IV therapy locations in DFW. Walk-in IV lounges in Uptown coexist with medical spa add-on services and concierge house-call practices serving Old Preston Hollow and Park Cities.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Growing Plano and Frisco suburban market</p>
              <p className="text-brand-steel">The DFW suburbs — Plano, Frisco, Allen, and McKinney — have rapidly growing IV therapy markets driven by the North Dallas tech and financial services corridor. Multiple IV clinics have opened in the Legacy West and Star development areas serving the Collin County professional market.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Sports and athletic recovery demand</p>
              <p className="text-brand-steel">Dallas\'s active outdoor culture and sport-watching culture (Cowboys, Rangers, Mavs, Stars games) drive pre- and post-event IV demand. Athletic recovery IVs and hangover recovery after game-day events are consistent market segments across DFW.</p>
            </div>
          </div>
        </div>

        {featuredListings && featuredListings.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-brand-navy mb-6">Featured Dallas IV Therapy Clinics</h2>
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
            <p className="text-brand-steel mb-4">Browse all Dallas IV therapy clinics below:</p>
            <Link
              href="/listings?state=TX"
              className="bg-brand-navy text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-navy-dark transition-colors inline-block"
            >
              Browse TX IV Clinics
            </Link>
          </div>
        )}

        <div className="space-y-4 mb-12">
          <h2 className="text-xl font-bold text-brand-navy mb-4">Dallas IV Therapy Questions</h2>
          {[
            { q: 'What are the best IV therapy clinics in Dallas?', a: 'The Dallas IV therapy market includes national franchise locations (Drip Bar, The IV Doc, Reset IV) and independent high-end practices in Uptown, Highland Park, and Frisco. When comparing clinics, look for: MD or DO medical director (not just a nurse), transparent ingredient lists and dosing, clean facility with proper medical-grade IV equipment, and pricing that reflects quality (suspiciously cheap IVs sometimes use lower-quality formulations).' },
            { q: 'Can I get mobile IV therapy in the DFW suburbs?', a: 'Yes. Mobile IV services are widely available across DFW, covering Plano, Frisco, Southlake, Allen, McKinney, and the far North Dallas suburbs. Most DFW mobile IV companies offer response times of 60–90 minutes within the metro. Corporate wellness IV services are also active in the Plano/Frisco tech corridor for office events and team wellness programs.' },
            { q: 'What IV drips are popular in Dallas?', a: 'Popular Dallas IV drips include: Myers\' Cocktail (energy and immunity, year-round), hangover recovery IVs (very active Saturday/Sunday in Uptown), NAD+ (cognitive performance and longevity, popular with Dallas business executives), athletic recovery drips (active in the Southlake, Flower Mound cycling and running community), and immune support IVs. High-dose vitamin C protocols are offered by some Dallas integrative medicine practices for chronic illness support.' },
            { q: 'Does Texas regulate IV therapy differently than other states?', a: 'Texas requires IV therapy to be prescribed and administered under physician supervision, as with most states. The Texas Medical Board regulates physician medical directors, and the State Board of Nursing regulates RNs and NPs administering IVs. Texas has relatively clear IV therapy regulations compared to some other states. Any Dallas IV clinic that operates without a licensed Texas physician as medical director is operating outside state guidelines — always verify credentials.' },
          ].map((item) => (
            <div key={item.q} className="bg-white rounded-xl border border-brand-light-2 p-5">
              <h3 className="font-semibold text-brand-navy mb-2">{item.q}</h3>
              <p className="text-brand-steel text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-navy rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-white mb-2">IV therapy clinic in Dallas?</h2>
          <p className="text-gray-300 mb-4 text-sm">List your clinic and reach patients searching for IV drip services in Dallas.</p>
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
