import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NAD+ IV Therapy — What It Is, How It Works, and How to Find a Clinic',
  description: 'NAD+ IV therapy delivers nicotinamide adenine dinucleotide directly into the bloodstream for cellular energy, cognitive clarity, and anti-aging. Find a clinic near you.',
}

const FAQ = [
  {
    q: 'What is NAD+ IV therapy?',
    a: 'NAD+ (nicotinamide adenine dinucleotide) is a coenzyme found in every cell of your body that drives cellular energy production and DNA repair. IV delivery bypasses the gut entirely, achieving blood levels far higher than any oral supplement. NAD+ declines with age — by your 60s you have roughly half the NAD+ of your 20s — which is why IV therapy has attracted interest in anti-aging and longevity medicine.',
  },
  {
    q: 'What are the benefits of NAD+ IV therapy?',
    a: 'Reported benefits include improved cognitive clarity and focus ("brain fog" resolution), sustained energy without the crash of stimulants, enhanced athletic performance and faster recovery, improved mood and reduced anxiety, cellular repair support, and support for addiction recovery. NAD+ is used in some addiction medicine clinics as a detox support — it appears to reduce withdrawal symptoms and cravings, though it is not a standalone treatment for addiction.',
  },
  {
    q: 'How long does a NAD+ IV infusion take?',
    a: 'NAD+ must be infused slowly — typically over 2 to 4 hours per session. Infusing it too fast causes chest tightness, nausea, and a characteristic uncomfortable sensation (often described as a "tightening" feeling). Most clinics start at 250mg over 2-3 hours and adjust based on tolerance. A full loading protocol is often 250-500mg/day for 4-10 consecutive days, especially for first-time users or addiction recovery applications.',
  },
  {
    q: 'How much does NAD+ IV therapy cost?',
    a: 'NAD+ IV therapy is the most expensive common IV treatment — typically $300 to $1,000 per session depending on the dose and clinic. A 250mg session runs $300-500 at most clinics. A 500mg session runs $500-1,000. Loading protocols (4-10 sessions) often have package pricing that reduces the per-session cost. Membership models at some clinics bring monthly maintenance sessions to $200-350.',
  },
  {
    q: 'How does NAD+ IV compare to oral NMN or NR supplements?',
    a: 'Oral NMN (nicotinamide mononucleotide) and NR (nicotinamide riboside) are NAD+ precursors — the body converts them to NAD+. Absorption from oral supplements is significant but limited by gut capacity and first-pass metabolism. IV NAD+ delivers the compound directly, achieving much higher blood levels immediately. The practical difference: IV NAD+ is faster and more potent; oral supplements are cheaper and more convenient for long-term maintenance.',
  },
  {
    q: 'Who should not get NAD+ IV therapy?',
    a: 'People with active cancer should consult an oncologist before NAD+ therapy — NAD+ supports cellular growth, which is a consideration in cancer care. People with severe kidney disease, heart arrhythmias, or low blood pressure should discuss with a physician first. The slow infusion requirement means this is not suitable for people who cannot sit still for 2-4 hours.',
  },
]

export default function NADPlusPage() {
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
            <span className="text-brand-navy">NAD+ Therapy</span>
          </nav>

          <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
            <Zap className="h-4 w-4" />
            <span>Treatment guide</span>
          </div>

          <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
            NAD+ IV Therapy
          </h1>
          <p className="text-brand-steel text-sm mb-8">
            The longevity community&apos;s IV drip of choice — delivering cellular fuel directly into the bloodstream for energy, brain clarity, and anti-aging support.
          </p>

          <div className="prose-guide">
            <h2>What is NAD+ and why does it matter?</h2>
            <p>
              NAD+ (nicotinamide adenine dinucleotide) is a coenzyme present in every cell in your body. It&apos;s
              the central player in cellular energy production — your mitochondria can&apos;t make ATP without it.
              Beyond energy, NAD+ activates sirtuins (proteins linked to longevity), supports DNA repair
              enzymes (PARPs), and regulates circadian rhythms.
            </p>
            <p>
              The problem: NAD+ levels decline significantly with age. By your mid-40s, you have roughly
              half the NAD+ of your 20s. This decline is linked to fatigue, cognitive fog, slower recovery,
              and the general sense of "slowing down." NAD+ IV therapy is one way to replenish those levels
              rapidly.
            </p>

            <h2>How NAD+ IV therapy is different from oral supplements</h2>
            <p>
              Oral NMN and NR supplements are legitimate NAD+ precursors — the body converts them to NAD+ after
              absorption. But gut absorption is the bottleneck: even at 1,000mg doses, the conversion is
              partial and varies by individual. IV NAD+ delivers the compound directly into the bloodstream
              at concentrations that oral supplementation simply cannot achieve. For clinical applications
              (addiction recovery, neurological support, post-illness recovery), IV is the only delivery
              method with enough potency to matter.
            </p>

            <h2>The slow-infusion requirement</h2>
            <p>
              NAD+ has one well-known quirk: it causes side effects when infused too quickly. Most people
              experience chest tightness, nausea, muscle cramping, or a general feeling of discomfort when the
              infusion rate is too fast. This is not dangerous — it resolves immediately when the nurse slows
              the drip — but it&apos;s uncomfortable. This is why NAD+ sessions take 2-4 hours, not 30 minutes.
            </p>
            <p>
              Any clinic offering "30-minute NAD+ IVs" is either under-dosing (100mg or less, which is largely
              symbolic) or infusing dangerously fast. Ask the clinic for the dose in milligrams and the planned
              infusion duration before booking.
            </p>

            <h2>What NAD+ IV therapy is used for</h2>
            <ul>
              <li><strong>Cognitive performance</strong> — the most common reason; many users report improved focus and reduced brain fog after a series</li>
              <li><strong>Anti-aging and longevity</strong> — activates sirtuins and supports DNA repair</li>
              <li><strong>Athletic recovery</strong> — supports muscle repair and mitochondrial function</li>
              <li><strong>Addiction recovery</strong> — reduces withdrawal symptoms; used in some MAT-adjacent programs</li>
              <li><strong>Post-COVID recovery</strong> — emerging use; some clinics report benefit for long COVID fatigue</li>
              <li><strong>Neurological support</strong> — early research in Parkinson&apos;s and Alzheimer&apos;s prevention contexts</li>
            </ul>

            <h2>What a NAD+ protocol looks like</h2>
            <p>
              For first-time users or those seeking significant therapeutic effect, most providers recommend
              a loading protocol: 4-10 consecutive daily sessions at 250-500mg each. After the loading phase,
              monthly maintenance sessions maintain elevated levels. For general wellness (not therapeutic), some
              people do quarterly sessions. Your provider should customize based on your goals and labs.
            </p>
          </div>

          {/* FAQ */}
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

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-brand-teal p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-3">Find a NAD+ IV Clinic Near You</h2>
            <p className="text-teal-100 mb-6 text-sm">
              Browse clinics that offer NAD+ therapy with proper dosing protocols and medical supervision.
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
