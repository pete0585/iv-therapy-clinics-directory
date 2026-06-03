import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Glutathione IV Therapy — The Master Antioxidant Explained | Find a Clinic',
  description: 'Glutathione IV therapy delivers the body\'s most powerful antioxidant directly into the bloodstream for skin brightening, detox, immune support, and liver health.',
}

const FAQ = [
  {
    q: 'What is glutathione and why do people get it via IV?',
    a: 'Glutathione is a tripeptide (three amino acids: glycine, cysteine, and glutamic acid) produced naturally by every cell in your body. It\'s the most abundant antioxidant in human cells — neutralizing free radicals, regenerating other antioxidants (like vitamins C and E), and supporting liver detoxification. The problem with oral glutathione is poor bioavailability: stomach acid breaks it down before it reaches the bloodstream. IV delivery achieves systemic blood levels that oral supplementation cannot.',
  },
  {
    q: 'What are glutathione IV therapy benefits?',
    a: 'Clinically documented and commonly reported benefits include: liver detoxification support (used in hospitals IV for acetaminophen overdose), skin brightening (reduces melanin production, which is why it\'s popular in the aesthetic medicine space), immune system support, antioxidant replenishment after illness or intense training, hangover recovery (glutathione neutralizes acetaldehyde, the main hangover toxin), and anti-aging support at the cellular level.',
  },
  {
    q: 'Does glutathione IV therapy lighten skin?',
    a: 'Glutathione has a documented skin-brightening effect at consistent IV doses — it inhibits tyrosinase, the enzyme required for melanin production. This is why it\'s widely used in aesthetic medicine, particularly in Asian and South Asian markets where skin brightening is a significant market. The effect requires consistent treatment (weekly sessions for 4-8 weeks) and is not permanent without maintenance. It is not a skin bleaching agent — it evens tone rather than bleaching.',
  },
  {
    q: 'How much does glutathione IV therapy cost?',
    a: 'Glutathione is often added as an "add-on" to an existing drip (Myers Cocktail or saline base) for $30-75 extra. As a standalone push or infusion, glutathione typically costs $75-200 per session. A 15-minute glutathione push (1,000-2,000mg) at the end of another infusion is the most common delivery method. Standalone aesthetic courses for skin brightening run 8-12 sessions at $75-150 each.',
  },
  {
    q: 'Is glutathione IV push or drip?',
    a: 'Glutathione can be delivered as either an IV push (injected slowly over 2-5 minutes via syringe into the IV line) or mixed into a drip bag and infused over 15-30 minutes. The push is faster and commonly used when glutathione is added to the end of another infusion. The drip is preferred for higher doses or when glutathione is the primary treatment. Both are effective; the push is faster and slightly less comfortable.',
  },
  {
    q: 'Who should not get glutathione IV therapy?',
    a: 'Glutathione is very well tolerated. People with known sulfur sensitivity or allergy should avoid it. There is theoretical concern in some cancers (glutathione can protect cancer cells from chemotherapy-induced oxidative stress), so active cancer patients should consult their oncologist. Pregnant women should avoid elective IV treatments generally. Otherwise, contraindications are rare.',
  },
]

export default function GlutathionePage() {
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
            <span className="text-brand-navy">Glutathione</span>
          </nav>

          <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
            <Shield className="h-4 w-4" />
            <span>Treatment guide</span>
          </div>

          <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
            Glutathione IV Therapy
          </h1>
          <p className="text-brand-steel text-sm mb-8">
            The master antioxidant — your body makes it, but production declines with age, stress, and illness. IV delivery is the only way to restore cellular levels fast.
          </p>

          <div className="prose-guide">
            <h2>Glutathione: your body&apos;s primary antioxidant</h2>
            <p>
              Every cell in your body produces glutathione from three amino acids: glycine, cysteine, and glutamic
              acid. It&apos;s the foundation of your antioxidant defense system — neutralizing reactive oxygen species,
              regenerating vitamins C and E back to their active forms, and binding toxins for elimination through
              the liver. The liver itself runs on glutathione; glutathione depletion is the mechanism behind
              acetaminophen liver toxicity, and IV glutathione (or N-acetylcysteine, its precursor) is the
              antidote used in hospitals.
            </p>
            <p>
              Glutathione production declines with age, chronic stress, poor diet, heavy alcohol use, and
              environmental toxin exposure. When levels drop, antioxidant protection weakens, liver detox slows,
              and cellular aging accelerates.
            </p>

            <h2>Why IV instead of oral glutathione?</h2>
            <p>
              Oral glutathione supplements have historically had a bioavailability problem: the tripeptide breaks
              down in the stomach and intestines before absorption. Newer liposomal formulations improve this,
              but IV delivery still achieves blood levels significantly higher than any oral supplement. For acute
              applications (post-illness recovery, liver support after heavy alcohol exposure, aesthetic
              courses), IV is the effective route.
            </p>
            <p>
              N-acetylcysteine (NAC) is the most bioavailable oral precursor to glutathione and is a legitimate
              alternative for maintenance — many people combine IV glutathione for periodic therapeutic loading
              with daily oral NAC for maintenance.
            </p>

            <h2>What glutathione IV is used for</h2>
            <ul>
              <li><strong>Liver support and detoxification</strong> — the most clinically validated application</li>
              <li><strong>Skin brightening</strong> — inhibits melanin production; requires consistent sessions</li>
              <li><strong>Hangover recovery</strong> — neutralizes acetaldehyde, the primary hangover toxin</li>
              <li><strong>Immune support</strong> — critical for lymphocyte function and immune cell activity</li>
              <li><strong>Athletic recovery</strong> — reduces exercise-induced oxidative damage</li>
              <li><strong>Post-illness replenishment</strong> — viral infections deplete glutathione rapidly</li>
              <li><strong>Anti-aging</strong> — protects mitochondria from oxidative stress</li>
            </ul>

            <h2>Push vs. drip — how glutathione is delivered</h2>
            <p>
              Most IV clinics add glutathione as a "push" at the end of another infusion — a syringe slowly
              injected into the IV line over 2-5 minutes. This is the fastest delivery method and is effective
              at doses of 600-2,000mg. For higher doses or standalone treatments, glutathione is diluted into
              a 250mL saline bag and dripped over 15-30 minutes. Both are effective; the push is more
              convenient. Avoid clinics that push glutathione too fast — rapid infusion can cause chest tightness
              and shortness of breath.
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

          <div className="mt-12 rounded-2xl bg-brand-teal p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-3">Find a Glutathione IV Clinic Near You</h2>
            <p className="text-teal-100 mb-6 text-sm">
              Browse the directory to find IV clinics that offer glutathione as a standalone or add-on treatment.
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
