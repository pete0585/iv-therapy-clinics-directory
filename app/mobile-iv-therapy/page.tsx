import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mobile IV Therapy Near Me — Find a Nurse Who Comes to You',
  description: 'Mobile IV therapy services come to your home, hotel, or office. Find licensed mobile IV nurses in your city — most arrive within 60-90 minutes of booking.',
}

const TOP_MOBILE_CITIES = [
  { city: 'Miami', state: 'FL', slug: 'fl/miami', note: '24-hour mobile available' },
  { city: 'Las Vegas', state: 'NV', slug: 'nv/las-vegas', note: 'Hotel delivery specialists' },
  { city: 'Los Angeles', state: 'CA', slug: 'ca/los-angeles', note: 'Wide coverage across LA metro' },
  { city: 'New York', state: 'NY', slug: 'ny/new-york', note: 'All 5 boroughs covered' },
  { city: 'Houston', state: 'TX', slug: 'tx/houston', note: 'Large metro, multiple services' },
  { city: 'Phoenix', state: 'AZ', slug: 'az/phoenix', note: 'Scottsdale & Phoenix metro' },
  { city: 'Nashville', state: 'TN', slug: 'tn/nashville', note: 'High weekend demand' },
  { city: 'Atlanta', state: 'GA', slug: 'ga/atlanta', note: 'In-town + Buckhead coverage' },
  { city: 'Denver', state: 'CO', slug: 'co/denver', note: 'Active outdoor/athlete market' },
  { city: 'Chicago', state: 'IL', slug: 'il/chicago', note: 'Downtown & North Shore' },
]

export default function MobileIVTherapyPage() {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-brand-steel mb-6">
          <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-brand-teal transition-colors">IV Therapy Clinics</Link>
          <span>/</span>
          <span className="text-brand-navy">Mobile IV Therapy</span>
        </nav>

        <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
          <MapPin className="h-4 w-4" />
          <span>Mobile services</span>
        </div>

        <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
          Mobile IV Therapy Near Me
        </h1>
        <p className="text-brand-steel mb-10 max-w-2xl">
          A licensed nurse comes to your home, hotel room, or office with everything needed to run a full IV drip. Same treatment as a clinic, in your own space, without having to go anywhere.
        </p>

        {/* How it works */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { step: '1', title: 'Book online or by phone', desc: 'Choose your treatment, give your location, and select a time. Most services confirm within minutes.' },
            { step: '2', title: 'Nurse arrives in 60-90 min', desc: 'A licensed RN arrives with all equipment — IV supplies, prepared solution bag, and emergency medication.' },
            { step: '3', title: 'IV runs for 30-90 minutes', desc: 'You relax in your bed, couch, or chair. The nurse monitors you and removes the catheter when the bag is done.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="bg-white rounded-xl border border-brand-light-2 p-5">
              <span className="inline-block w-8 h-8 bg-brand-teal text-white rounded-full text-sm font-bold flex items-center justify-center mb-3">{step}</span>
              <h3 className="font-bold text-brand-navy text-sm mb-2">{title}</h3>
              <p className="text-brand-steel text-sm">{desc}</p>
            </div>
          ))}
        </div>

        {/* Treatments available via mobile */}
        <div className="bg-white rounded-xl border border-brand-light-2 p-6 mb-10">
          <h2 className="font-bold text-brand-navy mb-4">Treatments Available for Mobile IV Delivery</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { treatment: 'Hangover Recovery', desc: 'Saline, B vitamins, Zofran, Toradol, Glutathione. Most common mobile request.' },
              { treatment: 'Myers Cocktail', desc: 'Full vitamin and mineral formula. 45-60 minute session via mobile.' },
              { treatment: 'Immune Boost', desc: 'High-dose vitamin C, zinc, B vitamins. Great for first signs of illness.' },
              { treatment: 'Hydration / Saline', desc: 'Basic electrolyte rehydration. Fast, inexpensive.' },
              { treatment: 'Athletic Recovery', desc: 'Electrolytes, amino acids, glutathione. Post-race or post-game.' },
              { treatment: 'Glutathione', desc: 'As a push or add-on to any drip. Available at most mobile services.' },
            ].map(({ treatment, desc }) => (
              <div key={treatment} className="flex gap-3 p-3 rounded-lg bg-slate-50">
                <span className="text-brand-teal mt-0.5 flex-shrink-0">✓</span>
                <div>
                  <p className="font-semibold text-brand-navy text-sm">{treatment}</p>
                  <p className="text-brand-steel text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-brand-steel text-xs mt-4">
            Note: NAD+ therapy (2-4 hour infusion) is available from select mobile services only. Confirm before booking.
          </p>
        </div>

        {/* Top mobile cities */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-brand-navy mb-6">Find Mobile IV Services by City</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {TOP_MOBILE_CITIES.map(({ city, state, slug, note }) => (
              <Link
                key={slug}
                href={`/iv-therapy-clinics/${slug}`}
                className="flex items-center justify-between bg-white rounded-xl border border-brand-light-2 px-5 py-4 hover:border-brand-teal hover:shadow-sm transition-all group"
              >
                <div>
                  <p className="font-semibold text-brand-navy group-hover:text-brand-teal text-sm">{city}, {state}</p>
                  <p className="text-brand-steel text-xs">{note}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-brand-steel group-hover:text-brand-teal flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Safety note */}
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-5 mb-10">
          <h2 className="font-bold text-amber-800 mb-2 text-sm">Verify any mobile IV service before booking</h2>
          <ul className="space-y-1.5 text-sm text-amber-700">
            <li>• Confirm the nurse administering your IV is a licensed RN (ask for their license number)</li>
            <li>• Confirm a supervising physician or NP is the medical director of the service</li>
            <li>• Confirm IV solutions come from an FDA-registered compounding pharmacy</li>
            <li>• Confirm the nurse carries emergency medication (epinephrine) on every call</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-brand-navy text-white rounded-xl p-8 text-center">
          <h2 className="font-bold text-xl mb-2">Browse All IV Therapy Clinics</h2>
          <p className="text-blue-200 text-sm mb-5">
            Find clinics and mobile services near you. Many listings show whether mobile delivery is available.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/listings"
              className="inline-block bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              Browse IV Therapy Clinics →
            </Link>
            <Link
              href="/guides/mobile-iv-therapy-guide"
              className="inline-block border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              Read the Mobile IV Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
