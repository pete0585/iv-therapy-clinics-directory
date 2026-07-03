import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'IV Therapy for Hangovers: Does It Actually Work? | IVTherapyClinicFinder.com',
  description:
    'IV hangover drips deliver hydration, B vitamins, and anti-nausea medication faster than oral supplements. Here is what is in them, what the evidence says, and what to expect.',
  openGraph: {
    title: 'IV Therapy for Hangovers: Does It Actually Work?',
    description:
      'IV hangover drips are popular — but do they work? Here is what the ingredients actually do and when IV hydration makes sense.',
  },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'What is in a hangover IV drip?',
    a: `A hangover IV drip typically contains: 1 liter of normal saline or lactated Ringer's solution (for hydration), B-complex vitamins (B1, B2, B3, B5, B6) and/or B12, magnesium sulfate (for headache and muscle tension), vitamin C, and optional add-ons like ondansetron (Zofran) for nausea, ketorolac (Toradol) for pain, or glutathione for antioxidant support. The specific combination varies by clinic. Many clinics use a proprietary "Myers' Cocktail" base with modifications.`,
  },
  {
    q: 'Does IV therapy actually cure a hangover faster than drinking water?',
    a: 'IV hydration does deliver fluid faster than oral intake when you are actively vomiting or unable to keep fluids down. The speed advantage is real: IV fluid reaches your bloodstream immediately, while oral fluid takes 30–45 minutes to absorb. However, for people who can drink water without vomiting, the practical difference in recovery time is modest. The anti-nausea medications (if included) and the pain relief add-ons (Toradol) are often more impactful than the hydration itself for most people. There are no controlled trials specifically studying IV hangover therapy versus oral rehydration.',
  },
  {
    q: 'Is IV hangover therapy safe?',
    a: 'For most healthy adults, yes — when administered in a properly licensed clinical setting. Risks include: IV site bruising or infection, rare allergic reactions to vitamins or medications, and the risks associated with any IV catheter placement. The anti-nausea and pain medications carry their own side effect profiles. The key safety factor is setting: IV therapy in a licensed clinic with a registered nurse or paramedic, with medications prescribed by a licensed physician or NP, is a different risk profile than unlicensed mobile services with unverified credentials.',
  },
  {
    q: 'How much does a hangover IV drip cost?',
    a: 'Hangover IV drips typically cost $100–$300 depending on the clinic, location, and add-ons. A basic 1L saline drip with B vitamins runs $100–$150 at most clinics. Add-ons (Zofran, Toradol, glutathione) each add $20–$50. Mobile concierge IV services — where a nurse comes to your home or hotel — charge a premium, typically $150–$350+. Insurance does not cover hangover IV therapy; it is considered elective/cosmetic.',
  },
  {
    q: 'Can I get IV therapy without going to a clinic?',
    a: 'Yes — mobile IV therapy services send a registered nurse or paramedic to your location (home, hotel, event). These services typically charge $150–$350 per visit. When evaluating a mobile service, ask: Are all staff licensed RNs or paramedics? Is there a supervising physician? Are medications (Zofran, Toradol) prescribed and dispensed by a licensed provider? Reputable mobile IV services can provide documentation of medical oversight. Services without licensed clinical supervision carry significantly higher risk.',
  },
]

const INGREDIENTS = [
  { name: 'Normal Saline (1L)', purpose: `Fluid replacement — replaces the hydration lost to alcohol's diuretic effect and any vomiting`, evidence: 'Established' },
  { name: 'B-Complex Vitamins', purpose: 'Replenishes B vitamins depleted by alcohol metabolism; supports liver enzyme function', evidence: 'Theoretical; commonly included' },
  { name: 'B12', purpose: 'Energy support; often marketed as "energy boost" — effect is primarily noticeable in deficient individuals', evidence: 'Modest in non-deficient' },
  { name: 'Magnesium', purpose: 'Headache relief; alcohol depletes magnesium', evidence: 'Some evidence for headache' },
  { name: 'Vitamin C', purpose: 'Antioxidant support', evidence: 'Theoretical' },
  { name: 'Ondansetron (Zofran)', purpose: 'Anti-nausea medication — prescription', evidence: 'Well-established for nausea' },
  { name: 'Ketorolac (Toradol)', purpose: 'NSAID pain relief — prescription', evidence: 'Well-established for headache/pain' },
  { name: 'Glutathione', purpose: 'Antioxidant; liver support marketing claim', evidence: 'Limited clinical evidence' },
]

export default function IVTherapyHangoverPage() {
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
            <span>IV Therapy for Hangovers</span>
          </nav>

          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              IV Therapy for Hangovers: Does It Actually Work?
            </h1>
            <p className="text-brand-steel text-lg leading-relaxed">
              IV hangover drips are popular for fast recovery — but what is actually in them,
              and which ingredients have real evidence? Here is the breakdown.
            </p>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">What Is in a Hangover Drip</h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-teal text-white">
                      <th className="text-left p-3 font-semibold">Ingredient</th>
                      <th className="text-left p-3 font-semibold">Purpose</th>
                      <th className="text-left p-3 font-semibold">Evidence Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INGREDIENTS.map((row, i) => (
                      <tr key={row.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 font-medium text-gray-800">{row.name}</td>
                        <td className="p-3 text-gray-600">{row.purpose}</td>
                        <td className="p-3 text-gray-600">{row.evidence}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">When IV Therapy Makes Sense for a Hangover</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                  <h3 className="font-bold text-gray-800 mb-3">Good candidates</h3>
                  <ul className="space-y-2">
                    {[
                      "Active vomiting (can't keep oral fluids down)",
                      'Severe dehydration symptoms (dizziness, confusion)',
                      'Significant work or event within a few hours',
                      'History of hangover-triggered migraines',
                    ].map((item) => (
                      <li key={item} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-brand-teal font-bold">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-100 rounded-xl p-5">
                  <h3 className="font-bold text-gray-800 mb-3">Probably fine with oral hydration</h3>
                  <ul className="space-y-2">
                    {[
                      'Able to drink water without vomiting',
                      'Headache manageable with OTC pain relief',
                      'No significant time pressure',
                      'General fatigue and mild nausea',
                    ].map((item) => (
                      <li key={item} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-gray-500">→</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
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
                Search our directory for licensed IV therapy clinics and mobile services in your area.
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
                <Link href="/guides/myers-cocktail-iv-therapy" className="text-sm text-brand-teal hover:underline font-medium">Myers' Cocktail Guide →</Link>
                <Link href="/guides/iv-therapy-cost" className="text-sm text-brand-teal hover:underline font-medium">IV Therapy Cost Guide →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
