import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Droplets } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Myers Cocktail IV Therapy — What It Is, What\'s In It, and Where to Find a Clinic',
  description: 'The Myers Cocktail is the most popular IV drip in the US. Learn what\'s in it, what it treats, how much it costs, and how to find a clinic near you.',
}

const FAQ = [
  {
    q: 'What is in a Myers Cocktail IV drip?',
    a: 'A standard Myers Cocktail contains magnesium chloride, calcium gluconate, B-complex vitamins (B1, B2, B3, B5, B6), vitamin B12, and high-dose vitamin C — all dissolved in sterile saline or lactated Ringer\'s solution. Some clinics add extra nutrients like zinc, selenium, or glutathione. The exact formulation varies by clinic, so ask for the ingredient list before booking.',
  },
  {
    q: 'What does a Myers Cocktail treat?',
    a: 'The Myers Cocktail is commonly used for: chronic fatigue, fibromyalgia, migraines and cluster headaches, seasonal allergies, upper respiratory infections, athletic recovery, and general energy and immune support. It was originally developed by Dr. John Myers, a Baltimore physician, in the 1960s. A 2009 pilot study in the Journal of Alternative and Complementary Medicine found benefit for fibromyalgia patients. Most evidence is anecdotal, though the nutrient profile is well-established.',
  },
  {
    q: 'How much does a Myers Cocktail cost?',
    a: 'Myers Cocktail IV drips typically cost $150-250 per session at a clinic. Mobile IV delivery adds $25-75 for in-home or hotel service. Membership plans (available at many IV clinics) bring the per-session cost down to $100-150. High-end concierge services in cities like New York, Miami, or Beverly Hills charge $250-400.',
  },
  {
    q: 'How long does a Myers Cocktail IV take?',
    a: 'A Myers Cocktail infusion takes 30-60 minutes at a standard drip rate. Some clinics offer a faster push (15-20 minutes), though this is not recommended — magnesium infused too quickly causes flushing, warmth, and a metallic taste. A 45-minute slow drip is the standard protocol.',
  },
  {
    q: 'How often should I get a Myers Cocktail?',
    a: 'For acute illness or recovery, one session is often enough. For chronic conditions like fibromyalgia or migraines, weekly sessions for 4-8 weeks followed by monthly maintenance is common. For general wellness and energy, most people do monthly sessions. Your provider should tailor frequency to your goals.',
  },
  {
    q: 'Is a Myers Cocktail safe?',
    a: 'Yes, when administered by a registered nurse under medical supervision. The nutrients are water-soluble and the body excretes what it doesn\'t use. The main risks are: needle site bruising, magnesium-related warmth or flushing (managed by slowing the drip), and rare allergic reactions to specific ingredients. Anyone with kidney disease, heart failure, or severe calcium abnormalities should consult their physician first.',
  },
]

export default function MyersCocktailPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-brand-steel mb-6">
            <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/listings" className="hover:text-brand-teal transition-colors">IV Therapy Clinics</Link>
            <span>/</span>
            <span className="text-brand-navy">Myers Cocktail</span>
          </nav>

          <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
            <Droplets className="h-4 w-4" />
            <span>Treatment guide</span>
          </div>

          <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
            Myers Cocktail IV Therapy
          </h1>
          <p className="text-brand-steel text-sm mb-8">
            The most popular IV drip in the US — a targeted blend of vitamins, minerals, and electrolytes that bypasses the gut for 100% absorption.
          </p>

          <div className="prose-guide">
            <h2>What is the Myers Cocktail?</h2>
            <p>
              The Myers Cocktail is a specific IV formulation developed by Dr. John Myers, a Baltimore internist
              who treated patients with it from the 1960s through the early 1980s. After his death, Dr. Alan
              Gaby continued the research and published the first peer-reviewed case series in 2002. Today it&apos;s
              the most commonly offered IV therapy at wellness clinics across the US.
            </p>
            <p>
              The core formula: magnesium, calcium, B-complex vitamins (B1 through B6), vitamin B12, and high-dose
              vitamin C in a sterile saline or lactated Ringer&apos;s base. Most clinics offer add-ons like glutathione,
              zinc, or amino acids for an additional cost.
            </p>

            <h2>Why IV instead of oral supplements?</h2>
            <p>
              The gut caps how much of most vitamins you can absorb. Oral vitamin C, for example, maxes out at
              around 200mg of absorption — anything above that is excreted or causes GI distress. IV vitamin C
              can deliver 25-50 grams directly into the bloodstream with 100% bioavailability. The same applies
              to magnesium, B12, and other nutrients in the cocktail. For people with gut absorption issues
              (IBS, celiac, Crohn&apos;s, or just chronic low stomach acid), IV delivery is especially valuable.
            </p>

            <h2>What the Myers Cocktail is commonly used for</h2>
            <ul>
              <li><strong>Chronic fatigue and fibromyalgia</strong> — the most studied application; multiple case series report improvement</li>
              <li><strong>Migraines and cluster headaches</strong> — magnesium IV is a well-established acute migraine treatment</li>
              <li><strong>Athletic recovery</strong> — replenishes electrolytes and micronutrients depleted by training</li>
              <li><strong>Immune support</strong> — high-dose vitamin C and zinc during illness or cold season</li>
              <li><strong>Hangover recovery</strong> — rehydration plus B vitamins depleted by alcohol metabolism</li>
              <li><strong>Seasonal allergies</strong> — vitamin C has antihistamine properties at high doses</li>
              <li><strong>General wellness</strong> — the most common reason: feeling run down and wanting a reset</li>
            </ul>

            <h2>What to expect during a session</h2>
            <p>
              At a reputable clinic, you&apos;ll fill out a health intake form before your first session. A registered
              nurse places an IV catheter (usually in the forearm), connects the bag, and sets the drip rate. The
              full infusion takes 30-60 minutes. You may feel a warm sensation or a slight metallic taste from
              the magnesium — that&apos;s normal and managed by slowing the drip slightly.
            </p>
            <p>
              Bring something to do. Most people scroll their phone, read, or watch something. You can&apos;t use
              that arm much during the infusion, but you can use your phone with the other hand.
            </p>

            <h2>How to find a Myers Cocktail clinic near you</h2>
            <p>
              When searching for a clinic, prioritize these three things: medical supervision (a physician or NP
              should be signing off on your protocol, not just any staff member), RN-administered infusions
              (not a medical assistant or tech), and transparent ingredients (the clinic should tell you exactly
              what&apos;s in the bag and where it&apos;s sourced from). Reputable clinics use FDA-registered compounding
              pharmacies.
            </p>
          </div>

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-brand-navy mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-5">
              {FAQ.map(({ q, a }) => (
                <div key={q} className="bg-white rounded-xl border border-brand-light-2 p-6">
                  <h3 className="font-bold text-brand-navy mb-3">{q}</h3>
                  <p className="text-brand-steel leading-relaxed text-sm">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-brand-teal p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-3">
              Find a Myers Cocktail Clinic Near You
            </h2>
            <p className="text-teal-100 mb-6 text-sm">
              Browse the directory to find a medically supervised IV clinic in your city.
            </p>
            <Link
              href="/listings"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-brand-teal hover:bg-slate-50 transition-colors"
            >
              Browse IV Therapy Clinics <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
