import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How Much Does IV Therapy Cost? 2026 Pricing Guide by Treatment Type',
  description: 'IV therapy costs range from $100 to $1,000+ per session. Here\'s an honest breakdown by treatment type, location, and what drives the price difference between clinics.',
}

const FAQ = [
  {
    q: 'How much does IV therapy cost on average?',
    a: 'The average IV therapy session in the US costs between $150 and $300 for the most common treatments (Myers Cocktail, basic hydration, hangover recovery). NAD+ therapy is significantly more expensive at $300-1,000 per session due to the required slow infusion and higher cost of the compound. High-dose vitamin C protocols for immune or cancer support run $200-500. Mobile IV delivery adds $25-75 for the in-home or hotel service.',
  },
  {
    q: 'Why do IV therapy prices vary so much between clinics?',
    a: 'Four factors drive the price spread: (1) Ingredient quality — pharmaceutical-grade vitamin C from an FDA-registered compounding pharmacy costs more than bulk-sourced alternatives; (2) Medical oversight — clinics with on-site physicians or nurse practitioners have higher overhead than nurse-only operations; (3) Location — a Beverly Hills clinic charging $400 for a Myers Cocktail has different rent than a suburban Phoenix clinic charging $175 for the same formula; (4) Service model — luxury concierge IV (house calls, full setup, personalized protocol) costs more than walk-in spa-style treatment.',
  },
  {
    q: 'Is a cheaper IV clinic worse than an expensive one?',
    a: 'Not necessarily. Price is not a reliable proxy for safety or quality. The things that matter — RN administering the IV, physician medical oversight, FDA-registered compounding pharmacy as the ingredient source, proper health intake screening — can exist at a $150 clinic and be absent at a $400 clinic. Evaluate clinics on their medical credentials and transparency, not their pricing.',
  },
  {
    q: 'Are IV therapy memberships worth it?',
    a: 'If you plan to get IV therapy once a month or more, memberships typically save 30-50% per session. A clinic charging $225 per Myers Cocktail might offer a $150/month membership that includes one session per month — saving $75/session or $900/year. Evaluate memberships based on the specific treatment you\'ll use most, cancellation terms, and whether the clinic charges extra for add-ons. Some memberships cover only a base drip with add-ons billed separately.',
  },
  {
    q: 'Does insurance cover IV therapy?',
    a: 'Standard wellness IV therapy is not covered by health insurance. It\'s a cash-pay elective service. FSA (Flexible Spending Account) and HSA (Health Savings Account) funds may be applicable if you have a Letter of Medical Necessity from a physician, but this is clinic-dependent and not universally accepted. IV therapy for documented medical conditions (severe dehydration requiring hospitalization, IV antibiotics) is a different category and is covered, but that\'s hospital-administered care, not wellness clinics.',
  },
  {
    q: 'How can I reduce the cost of IV therapy?',
    a: 'Five ways to lower your cost: (1) Buy a membership if you\'ll go monthly or more; (2) Group bookings — many mobile IV services offer 20-30% discounts when a nurse comes for 4+ people at the same location; (3) Ask about package deals for therapeutic protocols (10-session NAD+ programs often have bulk pricing); (4) Compare clinics in your area — price spreads can be significant for the same formula; (5) Consider IV clinics at non-luxury locations — a clinic in a medical office park rather than a spa district often charges 30-40% less for the same service.',
  },
]

const PRICING_TABLE = [
  { treatment: 'Basic Hydration (saline only)', low: 100, high: 175, notes: 'Electrolytes, no vitamins' },
  { treatment: 'Myers Cocktail', low: 150, high: 275, notes: 'B vitamins, vitamin C, magnesium, calcium' },
  { treatment: 'Hangover Recovery', low: 150, high: 350, notes: 'Higher end includes Zofran + Toradol' },
  { treatment: 'Immune Boost (7.5-15g Vitamin C)', low: 150, high: 300, notes: 'Zinc and B vitamins included' },
  { treatment: 'High-Dose Vitamin C (25-50g)', low: 200, high: 500, notes: 'Requires G6PD screening' },
  { treatment: 'Athletic Recovery', low: 150, high: 400, notes: 'Amino acids push cost higher' },
  { treatment: 'NAD+ Therapy (250mg)', low: 300, high: 500, notes: 'Requires 2-3 hour slow infusion' },
  { treatment: 'NAD+ Therapy (500mg)', low: 500, high: 1000, notes: '3-4 hour session' },
  { treatment: 'Glutathione push (add-on)', low: 30, high: 75, notes: 'Added to end of existing drip' },
  { treatment: 'Mobile IV premium', low: 25, high: 75, notes: 'Added to any in-home delivery' },
]

export default function IVTherapyCostPage() {
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
            <Link href="/listings" className="hover:text-brand-teal transition-colors">Directory</Link>
            <span>/</span>
            <span className="text-brand-navy">Guides</span>
            <span>/</span>
            <span className="text-brand-navy">IV Therapy Cost</span>
          </nav>

          <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
            <BookOpen className="h-4 w-4" />
            <span>Resource guide</span>
          </div>

          <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
            How Much Does IV Therapy Cost?
          </h1>
          <p className="text-brand-steel text-sm mb-8">
            A realistic 2026 pricing breakdown — by treatment type, by what drives the price difference, and how to avoid overpaying.
          </p>

          {/* Pricing table */}
          <div className="bg-white rounded-xl border border-brand-light-2 overflow-hidden mb-10">
            <div className="px-6 py-4 border-b border-brand-light-2 bg-slate-50">
              <h2 className="font-bold text-brand-navy text-sm">IV Therapy Pricing by Treatment (US Average, 2026)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-brand-light-2">
                    <th className="px-4 py-3 text-left text-brand-slate font-semibold">Treatment</th>
                    <th className="px-4 py-3 text-left text-brand-slate font-semibold">Range</th>
                    <th className="px-4 py-3 text-left text-brand-slate font-semibold hidden sm:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_TABLE.map(({ treatment, low, high, notes }) => (
                    <tr key={treatment} className="border-b border-brand-light-2 last:border-0">
                      <td className="px-4 py-3 text-brand-navy">{treatment}</td>
                      <td className="px-4 py-3 text-brand-teal font-medium whitespace-nowrap">${low}–${high}</td>
                      <td className="px-4 py-3 text-brand-steel hidden sm:table-cell">{notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="prose-guide">
            <h2>What drives the price difference between clinics</h2>
            <p>
              You can pay $150 for a Myers Cocktail at one clinic and $400 for the same formula at another.
              Understanding the difference matters for evaluating value.
            </p>
            <ul>
              <li><strong>Ingredient sourcing</strong> — pharmaceutical-grade IV compounds from FDA-registered compounding pharmacies cost more than alternatives. Ask where the clinic gets its IV solutions.</li>
              <li><strong>Medical oversight</strong> — clinics with on-site physicians or NPs have higher operating costs than mobile nurses working independently under a remote standing order.</li>
              <li><strong>Location</strong> — Beverly Hills clinic vs. Phoenix medical-office-park clinic. Same formula, different rent, different price.</li>
              <li><strong>Service model</strong> — luxury lounge setting with personalized protocol, Netflix during the drip, and a follow-up call costs more than a stripped-down walk-in model. This is mostly aesthetics, not clinical value.</li>
            </ul>
            <p>
              The things that matter for safety (RN administering, physician oversight, FDA-registered pharmacy) don&apos;t require premium pricing. You can find both at $150 clinics and miss both at $400 clinics.
            </p>

            <h2>The membership math</h2>
            <p>
              Most IV clinics offer memberships ranging from $100-250/month for one session per month plus discounts on additional sessions. If you&apos;re going more than once, do the math. A clinic charging $200/session with a $130/month membership breaks even at one session — anything above that is profit for you.
            </p>
            <p>
              Read the cancellation terms before signing. Some memberships lock you in for 3-6 months or charge cancellation fees. Month-to-month with 30-day notice is the cleanest structure.
            </p>

            <h2>What &quot;good value&quot; looks like in IV therapy</h2>
            <p>
              Good value in IV therapy is not the cheapest session — it&apos;s the right formula, administered safely, at a fair market rate for your area. A Myers Cocktail that actually contains therapeutic doses of each ingredient (400mg vitamin C, 600mg magnesium, full B-complex) at $185 is better value than a "Myers Cocktail" with token doses at $125. Ask for the formula card before booking. Reputable clinics can tell you exactly what&apos;s in the bag.
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
            <h2 className="text-xl font-bold text-white mb-3">Compare IV Clinics in Your City</h2>
            <p className="text-teal-100 mb-6 text-sm">
              Browse the directory to find and compare IV therapy clinics near you.
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
