import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, HeartPulse } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Immune Boost IV Therapy — High-Dose Vitamin C and Zinc Infusions | Find a Clinic',
  description: 'Immune boost IV therapy delivers high-dose vitamin C, zinc, and B vitamins directly to your immune cells. Find same-day immune support IV clinics near you.',
}

const FAQ = [
  {
    q: 'What is in an immune boost IV drip?',
    a: 'A standard immune boost IV contains: high-dose vitamin C (7.5-25 grams — far above what oral supplements can deliver), zinc sulfate (immune cell function and anti-viral activity), B-complex vitamins (energy for immune cell replication), magnesium, and often glutathione (antioxidant support for immune cells under stress). Some clinics add selenium (antioxidant enzyme cofactor) or lysine (anti-viral, especially for herpes family viruses).',
  },
  {
    q: 'What does high-dose vitamin C IV do for immunity?',
    a: 'At oral doses (up to ~200mg absorbed), vitamin C is a solid antioxidant with modest immune benefits. At IV doses of 7.5-50 grams, vitamin C generates hydrogen peroxide in tissue, which has a selective cytotoxic effect on infected or dysfunctional cells while leaving healthy cells intact. It also dramatically boosts production of interferon (anti-viral signaling protein), collagen synthesis (skin as physical barrier), and white blood cell function. High-dose IV C has been studied for cancer support, severe infections, and post-viral syndrome.',
  },
  {
    q: 'When should I get an immune boost IV?',
    a: 'The three most common scenarios: (1) At the first sign of illness — getting an IV in the first 24-48 hours of symptoms often shortens duration significantly; (2) Pre-travel or pre-event — loading your immune system before international travel, a wedding, a marathon, or other high-stakes events where illness would be catastrophic; (3) Post-illness recovery — after a significant viral infection, rebuilding immune reserves to avoid the secondary infection that often follows.',
  },
  {
    q: 'Is immune boost IV therapy safe?',
    a: 'High-dose IV vitamin C requires a G6PD (glucose-6-phosphate dehydrogenase) deficiency screening before the first session at doses above 25g — G6PD deficiency can cause hemolysis (red blood cell destruction) with high-dose C. Any reputable high-dose C clinic will screen for this. Below 10g, the risk is minimal and no screening is typically required. Zinc at therapeutic IV doses is safe for short courses. The overall safety profile is excellent when properly administered.',
  },
  {
    q: 'How much does immune boost IV therapy cost?',
    a: 'Basic immune IV therapy (7.5-10g vitamin C, B vitamins, zinc) runs $150-250 per session. High-dose vitamin C protocols (25-50g) run $200-400 per session depending on dose and clinic. Pre-travel or pre-event packages (2-3 sessions over a week) often come with a discount. Single sessions during acute illness are typically the full price.',
  },
  {
    q: 'How many immune IV sessions do I need?',
    a: 'For acute illness: 1-3 sessions over the first week is the standard protocol — daily for 3 days at the peak of illness, then once more a week later. For preventive loading before travel or events: 1-2 sessions in the week before the event. For chronic immune support (frequent illness, post-cancer treatment, immunocompromised): monthly maintenance sessions, protocol determined by your supervising provider.',
  },
]

export default function ImmuneBoostPage() {
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
          <nav className="flex items-center gap-1.5 text-sm text-brand-steel mb-6">
            <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/listings" className="hover:text-brand-teal transition-colors">IV Therapy Clinics</Link>
            <span>/</span>
            <span className="text-brand-navy">Immune Boost</span>
          </nav>

          <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
            <HeartPulse className="h-4 w-4" />
            <span>Treatment guide</span>
          </div>

          <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
            Immune Boost IV Therapy
          </h1>
          <p className="text-brand-steel text-sm mb-8">
            High-dose vitamin C and immune-critical nutrients delivered IV — the fastest way to load your immune system at the first sign of illness or before a high-stakes event.
          </p>

          <div className="prose-guide">
            <h2>Why high-dose vitamin C matters for immunity</h2>
            <p>
              The maximum vitamin C absorption from oral supplementation is roughly 200mg — everything above that
              either stays in the gut or is excreted. At oral doses, vitamin C is a useful antioxidant. At IV
              doses of 7.5-50 grams, something different happens: blood plasma concentrations reach levels that
              generate hydrogen peroxide in tissue at concentrations high enough to selectively damage infected
              cells and cancer cells, while healthy cells with functional catalase enzymes are protected.
            </p>
            <p>
              At high IV doses, vitamin C also dramatically boosts interferon production (your body&apos;s primary
              anti-viral signaling system), supercharges white blood cell function, and supports the production
              of collagen needed for physical barrier integrity. This is a fundamentally different mechanism than
              what oral C does — which is why the research on IV vitamin C for severe infections is promising
              in ways that oral trials have not been.
            </p>

            <h2>The zinc factor</h2>
            <p>
              Zinc is the other workhorse of immune IV therapy. Zinc is required for the development and
              activation of T-lymphocytes (killer T-cells), natural killer cell function, and the production of
              anti-inflammatory cytokines. It also has direct anti-viral activity against several virus families.
              Zinc deficiency — common in athletes, people under chronic stress, and the elderly — significantly
              impairs immune response. IV zinc sulfate delivers zinc directly to immune cells faster than oral
              supplementation.
            </p>

            <h2>When immune IV is most effective</h2>
            <p>
              The window matters. IV immune therapy is most effective in the first 24-48 hours of illness onset.
              Once a viral infection is in full swing (days 3-5), the benefit shifts toward supporting recovery
              rather than fighting the pathogen. Coming in on day one with symptoms gets you a significantly
              different outcome than waiting to see if you get better on your own.
            </p>
            <p>
              Pre-travel loading is underrated. Getting an immune IV 2-3 days before international travel,
              especially long-haul flights, loads your immune reserves at the exact time they&apos;re about to be
              tested by a 12-hour recirculated-air cabin environment followed by time zone disruption and a
              compromised sleep schedule.
            </p>

            <h2>Finding a clinic for immune IV therapy</h2>
            <p>
              Most IV therapy clinics offer some form of immune drip. For basic 5-10g vitamin C with zinc and
              B vitamins, most wellness IV clinics are equipped. For high-dose vitamin C protocols (25-50g),
              look for clinics that mention high-dose C specifically — it requires G6PD screening and a longer
              infusion time than basic drips. Not all clinics stock the pharmaceutical-grade vitamin C at those
              concentrations.
            </p>
          </div>

          <section className="mt-16">
            <h2 className="text-2xl font-bold text-brand-navy mb-8">Frequently Asked Questions</h2>
            <div className="space-y-5">
              {FAQ.map(({ q, a }) => (
                <div key={q} className="bg-white rounded-xl border border-brand-light-2 p-6">
                  <h3 className="font-bold text-brand-navy mb-3">{q}</h3>
                  <p className="text-brand-steel leading-relaxed text-sm">{a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12 rounded-2xl bg-brand-teal p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-3">Find an Immune IV Clinic Near You</h2>
            <p className="text-teal-100 mb-6 text-sm">
              Same-day IV therapy clinics available in most major cities.
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
