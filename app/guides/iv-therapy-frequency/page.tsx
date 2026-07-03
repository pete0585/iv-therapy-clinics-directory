import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How Often Should You Get IV Therapy? | IVTherapyClinicFinder.com',
  description:
    'IV therapy frequency depends on why you are getting it. One-time hydration, monthly wellness protocols, and chronic condition support all have different cadences. Here is what to know.',
  openGraph: {
    title: 'How Often Should You Get IV Therapy?',
    description:
      'IV therapy frequency varies by goal — from one-time hangover recovery to weekly immune support. Here is the guidance from IV therapy providers.',
  },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'Is it safe to get IV therapy every week?',
    a: 'For most healthy adults, weekly IV vitamin drips are considered low-risk in a properly supervised clinical setting. The key risk factors to watch for: IV site rotation (the same vein should not be used repeatedly — rotate sites and allow healing between sessions), signs of fluid overload (rare in healthy individuals with normal kidney and heart function — more of a concern for people with CHF or kidney disease), and the cumulative dose of fat-soluble vitamins, particularly vitamin D and A, which can accumulate to toxic levels with very frequent dosing. For standard water-soluble vitamin IV protocols, weekly frequency is within the range most providers consider safe.',
  },
  {
    q: 'How often do most people get IV therapy?',
    a: 'The most common patterns: once-per-event (hangover recovery, post-travel, before or after athletic competition), monthly (general wellness maintenance, immune support), biweekly (active optimization protocols or specific health goals), and weekly (high-stress periods, chronic deficiency management, athletic performance). Daily or near-daily IV therapy is generally reserved for medically supervised settings (hospital, infusion center for cancer support, chronic illness management). Recreational weekly IV therapy is increasingly common but not medically standardized.',
  },
  {
    q: 'What happens if you get IV therapy too often?',
    a: 'Too-frequent IV therapy can cause: vein damage (phlebitis — inflammation and scarring from repeated catheter placement), infection risk at insertion sites, and in rare cases with very high-dose vitamin C protocols, kidney strain. The biggest practical risk with frequent IV therapy is the cost — at $100–$300+ per session, weekly sessions add up to $400–$1,200/month. For most wellness goals, identifying the right frequency (not always the most frequent) is part of working with a qualified IV therapy provider.',
  },
  {
    q: 'Do I need a doctor's order to get IV therapy?',
    a: 'This depends on your state. In most states, IV therapy clinics operate under a medical director who writes standing orders for standard wellness protocols — you don't need a separate doctor's appointment. However, if you want IV therapy for a specific medical condition, you should discuss it with your primary care provider. Individuals with kidney disease, heart disease, or diabetes should always consult their physician before starting IV therapy, as these conditions affect how your body handles fluids and vitamins.',
  },
  {
    q: 'Does IV therapy frequency differ for athletes?',
    a: 'Many athletes and fitness enthusiasts use IV therapy more aggressively than the general wellness population — some before major events, some in the 24–48 hours after competition or heavy training. Common athletic protocols include high-dose vitamin C (for antioxidant recovery support), B-complex and magnesium (for energy metabolism and muscle function), and saline hydration (for electrolyte replacement). There is no established medical consensus on optimal frequency for athletic performance — it is an area where evidence is limited and much of the practice is experience-based from sports medicine providers.',
  },
]

FREQUENCY_ROWS = [
  { goal: 'Hangover / acute recovery', frequency: 'As needed (single session)', notes: 'One-time per event; no scheduled protocol needed' },
  { goal: 'Pre/post travel recovery', frequency: 'As needed', notes: 'Jet lag, immune support during travel' },
  { goal: 'General wellness maintenance', frequency: 'Monthly', notes: 'Most common wellness protocol frequency' },
  { goal: 'Immune support (cold/flu season)', frequency: 'Biweekly during peak season', notes: 'Higher-dose vitamin C protocols' },
  { goal: 'Athletic performance', frequency: 'Before or after major events + 1–2x/month', notes: 'Varies by sport and training load' },
  { goal: 'Chronic fatigue / energy', frequency: 'Weekly initially, then biweekly', notes: 'Should involve medical oversight' },
  { goal: 'Vitamin deficiency (B12, etc.)', frequency: 'Per medical protocol', notes: 'Should be directed by lab values and physician' },
]

export default function IVTherapyFrequencyPage() {
  const faqLd = {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <nav className="flex items-center gap-1.5 text-sm text-brand-steel mb-6">
            <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/listings" className="hover:text-brand-teal transition-colors">Directory</Link>
            <span className="text-gray-300">/</span>
            <span>IV Therapy Frequency</span>
          </nav>

          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              How Often Should You Get IV Therapy?
            </h1>
            <p className="text-brand-steel text-lg leading-relaxed">
              Frequency depends entirely on why you are getting IV therapy. One-time hangover recovery,
              monthly wellness maintenance, and medical-protocol deficiency management all have different cadences.
            </p>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequency by Goal</h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-teal text-white">
                      <th className="text-left p-3 font-semibold">Goal</th>
                      <th className="text-left p-3 font-semibold">Typical Frequency</th>
                      <th className="text-left p-3 font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FREQUENCY_ROWS.map((row, i) => (
                      <tr key={row.goal} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 font-medium text-gray-800">{row.goal}</td>
                        <td className="p-3 text-gray-600">{row.frequency}</td>
                        <td className="p-3 text-gray-500 text-xs">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What to Ask Your IV Therapy Provider</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <ul className="space-y-2">
                  {[
                    'What frequency do you recommend for my specific goals?',
                    'Do you have lab-based protocols — or is the drip the same for everyone?',
                    'How do you track my results over time?',
                    'Are there any signs I should watch for between sessions?',
                    'When would you recommend stopping or reducing frequency?',
                  ].map((q) => (
                    <li key={q} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-brand-teal font-bold mt-0.5">→</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              {FAQ.map((faq) => (
                <div key={faq.q} className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-800 mb-2">{faq.q}</h3>
                  <p className="text-sm text-brand-steel leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </section>

            <div className="bg-brand-teal rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-3">Find an IV Therapy Clinic Near You</h2>
              <p className="text-white/80 mb-6 text-sm">
                Browse licensed IV therapy clinics by location. Compare services, pricing, and medical oversight.
              </p>
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 bg-white text-brand-teal font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                Find a Clinic <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-bold text-gray-800 mb-3">Related Guides</h3>
              <div className="flex flex-wrap gap-3">
                <Link href="/guides/what-is-iv-therapy" className="text-sm text-brand-teal hover:underline font-medium">What Is IV Therapy? →</Link>
                <Link href="/guides/iv-therapy-cost" className="text-sm text-brand-teal hover:underline font-medium">IV Therapy Cost Guide →</Link>
                <Link href="/guides/is-iv-therapy-safe" className="text-sm text-brand-teal hover:underline font-medium">Is IV Therapy Safe? →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
