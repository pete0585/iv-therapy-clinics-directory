import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Myers Cocktail vs NAD+: Which IV Drip Is Right for You?',
  description: 'Myers Cocktail and NAD+ are the two most popular IV treatments, but they work differently and suit different goals. Here\'s how to choose.',
}

const FAQ = [
  {
    q: 'What is the main difference between a Myers Cocktail and NAD+ IV therapy?',
    a: 'The Myers Cocktail is a vitamin and mineral infusion — magnesium, calcium, B-complex vitamins, and vitamin C — focused on nutritional repletion, energy, and immune support. NAD+ (nicotinamide adenine dinucleotide) is a cellular coenzyme that drives mitochondrial energy production and DNA repair, focused on deep cellular function, cognitive performance, and longevity. They work through completely different mechanisms and are often used together in a protocol rather than instead of each other.',
  },
  {
    q: 'Which is better for energy — Myers Cocktail or NAD+?',
    a: 'Both improve energy, but through different pathways. A Myers Cocktail typically produces noticeable energy improvement within a few hours — you feel the B vitamins. The effect peaks quickly and fades over a few days. NAD+ energy improvement is deeper and longer-lasting — many people report a sustained increase in energy and mental clarity that builds over a series of sessions and lasts weeks. For quick energy (tonight, this week), Myers Cocktail. For sustained performance optimization, NAD+ with a loading protocol.',
  },
  {
    q: 'Which one is better for hangover recovery?',
    a: 'Myers Cocktail (or a dedicated hangover recovery drip) is far better for acute hangover treatment. The hydration, B vitamins, and optional anti-nausea medication work fast and address exactly what a hangover is — dehydration, B vitamin depletion, and acetaldehyde toxicity. NAD+ is too slow (2-4 hours) and too expensive for a hangover fix. It\'s the wrong tool for that job.',
  },
  {
    q: 'Can you get Myers Cocktail and NAD+ in the same session?',
    a: 'Yes. Many clinics offer combo protocols where the Myers Cocktail runs first (45-60 minutes), followed by a NAD+ infusion (2-4 hours) in the same appointment. Some add a glutathione push at the end. This is a half-day commitment but gives you the nutritional benefits of the Myers and the cellular optimization benefits of NAD+ in one visit. Expect to spend $450-1,200 for a combination session.',
  },
  {
    q: 'Which should a first-timer try?',
    a: 'Myers Cocktail is the better first IV therapy experience. It takes 30-60 minutes, costs less, and gives you a clear sense of how IV therapy feels and affects your energy. You\'ll know within a day whether IV therapy is something you want to pursue further. NAD+ as a first session is a bigger time and financial commitment — better once you\'ve decided IV therapy is worth it for you.',
  },
  {
    q: 'How much more expensive is NAD+ than Myers Cocktail?',
    a: 'A Myers Cocktail typically costs $150-275 per session. NAD+ therapy starts at $300 for a 250mg session and goes to $500-1,000 for a 500mg session. A loading protocol (4-10 consecutive daily sessions) runs $1,500-5,000 total, though package pricing reduces the per-session cost. NAD+ is 2-5x more expensive than a Myers Cocktail for the same session count.',
  },
]

const COMPARISON = [
  { category: 'Primary mechanism', myers: 'Vitamin & mineral repletion', nad: 'Cellular coenzyme / mitochondrial fuel' },
  { category: 'Session duration', myers: '30–60 minutes', nad: '2–4 hours (slow infusion required)' },
  { category: 'Typical cost per session', myers: '$150–275', nad: '$300–1,000' },
  { category: 'Energy effect', myers: 'Quick, noticeable, fades in 1–3 days', nad: 'Builds over series, lasts weeks' },
  { category: 'Cognitive effect', myers: 'Mild / secondary', nad: 'Primary benefit, significant for many' },
  { category: 'Best for acute recovery', myers: 'Yes — hangover, illness, fatigue', nad: 'No — wrong tool for acute use' },
  { category: 'Best for longevity / anti-aging', myers: 'Partial (nutritional support)', nad: 'Primary use case' },
  { category: 'Addiction recovery support', myers: 'Limited', nad: 'Yes — established clinical use' },
  { category: 'Good first IV therapy choice', myers: 'Yes — start here', nad: 'After you\'ve tried Myers first' },
  { category: 'Can combine both?', myers: 'Yes — many clinics offer combo sessions', nad: 'Yes — Myers first, then NAD+' },
]

export default function MyersCocktailVsNADPage() {
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
            <span className="text-brand-navy">Myers Cocktail vs NAD+</span>
          </nav>

          <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
            <BookOpen className="h-4 w-4" />
            <span>Comparison guide</span>
          </div>

          <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
            Myers Cocktail vs NAD+: Which IV Drip Is Right for You?
          </h1>
          <p className="text-brand-steel text-sm mb-8">
            The two most popular IV treatments in the US work through completely different mechanisms. Here&apos;s how to choose — or why you might use both.
          </p>

          {/* Comparison table */}
          <div className="bg-white rounded-xl border border-brand-light-2 overflow-hidden mb-10">
            <div className="px-6 py-4 border-b border-brand-light-2 bg-slate-50">
              <h2 className="font-bold text-brand-navy text-sm">Side-by-Side Comparison</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-brand-light-2">
                    <th className="px-4 py-3 text-left text-brand-slate font-semibold w-2/5"></th>
                    <th className="px-4 py-3 text-left text-brand-teal font-semibold">Myers Cocktail</th>
                    <th className="px-4 py-3 text-left text-brand-navy font-semibold">NAD+ Therapy</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map(({ category, myers, nad }) => (
                    <tr key={category} className="border-b border-brand-light-2 last:border-0">
                      <td className="px-4 py-3 text-brand-slate font-medium">{category}</td>
                      <td className="px-4 py-3 text-brand-steel">{myers}</td>
                      <td className="px-4 py-3 text-brand-steel">{nad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="prose-guide">
            <h2>Who should choose Myers Cocktail</h2>
            <p>
              Myers Cocktail is the right choice if: you want to try IV therapy for the first time and want a
              short session at a reasonable cost; you&apos;re recovering from illness, a hard workout, or a rough
              night; you have chronic fatigue, fibromyalgia, or recurrent migraines (there&apos;s published evidence
              for Myers in these conditions); you want nutritional repletion (filling gaps in your diet); or you
              want something you can do monthly without a major time or financial commitment.
            </p>

            <h2>Who should choose NAD+ therapy</h2>
            <p>
              NAD+ is the right choice if: cognitive performance is your primary goal; you&apos;re explicitly
              pursuing longevity and anti-aging applications; you&apos;re using it as part of an addiction recovery
              protocol (NAD+ has well-documented use in this context); you&apos;re experiencing significant
              post-viral fatigue or long COVID symptoms; or you&apos;re a serious biohacker who has already
              incorporated Myers Cocktails and is ready to go deeper. NAD+ requires more time and money —
              which is the right investment for the right person with the right goals.
            </p>

            <h2>Why many people use both</h2>
            <p>
              Myers Cocktail and NAD+ are complementary, not competing. Myers provides the nutritional foundation
              (vitamins, minerals, electrolytes) while NAD+ works at the mitochondrial and DNA repair level.
              A common high-performance protocol: weekly Myers Cocktails for nutritional maintenance, monthly
              NAD+ sessions for cellular optimization. The two operate in entirely different lanes.
            </p>
            <p>
              Many clinics offer a "Myers + NAD+" session where both are run back-to-back in the same appointment.
              Budget 3-5 hours and $400-1,200 for a combination session — the total time and cost of each
              combined. This is an efficient way to get both done in a single trip.
            </p>

            <h2>The honest bottom line</h2>
            <p>
              Start with Myers Cocktail. It&apos;s shorter, cheaper, and gives you real data on how IV therapy
              affects your body before committing to a more intensive NAD+ protocol. If you feel a noticeable
              difference and want to go deeper — into the cellular optimization, anti-aging, and cognitive
              performance territory — NAD+ is the next step. Neither is a replacement for the basics
              (sleep, diet, exercise) and both are best used as amplifiers of an already solid health foundation.
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
            <h2 className="text-xl font-bold text-white mb-3">Find a Clinic That Offers Both</h2>
            <p className="text-teal-100 mb-6 text-sm">
              Browse the directory to find IV therapy clinics near you that offer Myers Cocktail, NAD+, and combo protocols.
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
