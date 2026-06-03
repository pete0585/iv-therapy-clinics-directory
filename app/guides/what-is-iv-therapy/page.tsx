import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'What Is IV Therapy? A Complete Guide to IV Hydration and Vitamin Drips',
  description: 'What is IV therapy and how does it work? Learn what happens during a session, who should (and shouldn\'t) get it, and what to look for in a reputable IV clinic.',
}

const FAQ = [
  {
    q: 'What is IV therapy?',
    a: 'IV therapy (intravenous therapy) is the direct delivery of fluids, vitamins, minerals, amino acids, or medications into the bloodstream via a vein. Unlike oral supplements that must be absorbed through the digestive system, IV delivery achieves 100% bioavailability — every nutrient goes directly into circulation. IV therapy at wellness clinics is a cash-pay service distinct from hospital IV treatment; it uses the same medical equipment and technique but is delivered in a spa-style setting for wellness, recovery, and performance optimization.',
  },
  {
    q: 'What happens during an IV therapy session?',
    a: 'After completing a health intake form, a registered nurse inserts a small IV catheter into a vein (typically in the forearm or the back of the hand). The catheter is connected to a bag of fluid — usually 500mL to 1 liter — containing the chosen nutrient formula. The fluid drips in over 30-90 minutes depending on the treatment. You sit or recline comfortably during the session. After the bag is finished, the nurse removes the catheter and applies a bandage. Most people drive themselves home immediately.',
  },
  {
    q: 'Is IV therapy safe?',
    a: 'IV therapy is safe when administered by a registered nurse under proper medical supervision. The main risks are minimal: bruising at the insertion site, rare vein irritation, and very rare allergic reactions to specific ingredients. More serious risks exist for people with kidney disease, heart failure, or severe electrolyte abnormalities — which is why health intake screening before the first session is non-negotiable. Any reputable IV clinic screens for contraindications before treatment.',
  },
  {
    q: 'How is IV therapy different from getting a drip at a hospital?',
    a: 'The technique and equipment are identical — same catheter, same tubing, same IV bags. The difference is the clinical context. Hospital IVs are for acute medical treatment: severe dehydration, medication delivery, post-surgical recovery. Wellness IV clinics use the same delivery system for elective nutrient optimization — energy, recovery, immune support, anti-aging. The nursing skills and safety standards should be the same; what differs is the setting (spa vs. hospital) and the reason for treatment.',
  },
  {
    q: 'Who should not get IV therapy?',
    a: 'People with kidney disease or kidney failure (kidneys process IV fluid; reduced kidney function changes how quickly fluids clear), congestive heart failure (fluid overload risk), pulmonary edema, or known allergies to specific IV ingredients should consult their physician before IV therapy. Pregnant women should avoid elective IV treatments. People on certain blood thinners should mention this during intake. Most IV clinics screen for these conditions — the intake form is not just paperwork.',
  },
  {
    q: 'How often can I get IV therapy?',
    a: 'For maintenance wellness: monthly is the most common frequency. The body excretes water-soluble vitamins (B and C) within 24-72 hours, so more frequent sessions don\'t accumulate to dangerous levels. For therapeutic protocols (fibromyalgia, migraines, illness recovery): weekly sessions for 4-8 weeks is a common loading approach. For athletic performance: post-competition or weekly during heavy training blocks. Your provider should tailor frequency to your goals.',
  },
]

export default function WhatIsIVTherapyPage() {
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
            <span className="text-brand-navy">What Is IV Therapy</span>
          </nav>

          <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
            <BookOpen className="h-4 w-4" />
            <span>Resource guide</span>
          </div>

          <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
            What Is IV Therapy? A Complete Guide
          </h1>
          <p className="text-brand-steel text-sm mb-8">
            For anyone who has seen IV therapy clinics popping up and wants to understand what actually happens, what it does, and whether it&apos;s worth it.
          </p>

          <div className="prose-guide">
            <h2>The basics</h2>
            <p>
              IV therapy is the direct delivery of fluids, vitamins, minerals, or medications into a vein.
              Intravenous delivery bypasses the digestive system entirely — whatever goes in the IV bag reaches
              your bloodstream at 100% bioavailability. Compare that to oral supplementation, where your gut,
              liver metabolism, and absorption capacity determine how much of any nutrient actually makes it
              into circulation.
            </p>
            <p>
              For most water-soluble vitamins (B vitamins, vitamin C), the gut caps absorption well below what
              IV can deliver. Oral vitamin C maxes out at roughly 200mg of absorbed dose — IV vitamin C can
              deliver 25 grams directly. This isn&apos;t just a quantitative difference; at high IV concentrations,
              some nutrients behave differently than at oral doses.
            </p>

            <h2>Who uses IV therapy and why</h2>
            <p>
              The people walking into IV therapy clinics fall into a few distinct groups:
            </p>
            <ul>
              <li><strong>Acute recovery seekers</strong> — the person who drank too much last night or caught a virus and wants to feel human again by 3pm</li>
              <li><strong>Biohackers and performance optimizers</strong> — athletes, executives, and high performers doing NAD+ and Myers Cocktails on a weekly schedule as a cornerstone of their recovery and longevity stack</li>
              <li><strong>First-timers exploring wellness options</strong> — curious people who want to try it and see what the data says when they actually feel it</li>
              <li><strong>People with chronic conditions</strong> — fibromyalgia, migraines, chronic fatigue, and post-viral syndrome patients who have found IV therapy more effective than oral supplementation for their specific situation</li>
            </ul>

            <h2>What IV therapy is not</h2>
            <p>
              IV therapy is not a substitute for medical care. If you have a serious infection, that&apos;s an
              emergency room. If you have a chronic deficiency, that requires labs and a physician, not a
              wellness clinic intake form. IV therapy works best as a complement to a solid health foundation —
              good sleep, adequate nutrition, regular exercise — not as a workaround for ignoring all of those.
            </p>
            <p>
              It&apos;s also not magic. The vitamin C going into the bag is the same vitamin C in your food — it&apos;s
              the delivery mechanism that changes what it can do. Realistic expectations matter: IV therapy
              typically produces noticeable effects on energy, hydration, and acute symptom relief. It is not
              a cure for complex diseases.
            </p>

            <h2>What to look for in an IV therapy clinic</h2>
            <p>
              Medical oversight is the non-negotiable. A physician or nurse practitioner should be signing off
              on each patient&apos;s protocol — not just a wellness coordinator who took a course. The nurse
              administering the IV should be a licensed RN; in some states, this is a legal requirement, in
              others it is a best-practice standard. Ask directly: "Who supervises this clinic medically?" and
              "What credentials does the nurse who will place my IV have?"
            </p>
            <p>
              Ingredient transparency is the other filter. Ask where the clinic sources its IV solutions — the
              answer should be an FDA-registered compounding pharmacy, not a vague "our supplier." Reputable
              clinics can name their pharmacy and show you the Certificate of Analysis for the batch.
            </p>

            <h2>What to expect at your first appointment</h2>
            <p>
              Most IV clinics walk you through the same basic flow: you arrive and fill out a health intake
              form covering your medical history, current medications, and any known allergies. A nurse reviews
              your intake and confirms you are appropriate for the selected treatment. They walk you to a
              treatment chair (or come to you, if mobile), place the IV catheter, connect the bag, and set
              the drip rate. You sit for 30-90 minutes depending on the treatment. The nurse checks in,
              adjusts the drip if you feel any discomfort, and removes the catheter when the bag is finished.
              You drive or walk out.
            </p>

            <h2>The cost picture</h2>
            <p>
              IV therapy is cash-pay. Most insurance plans do not cover elective IV wellness treatments. Expect
              to pay $100-200 for basic hydration, $150-300 for a Myers Cocktail, and $300-1,000 for NAD+
              therapy. Many clinics offer membership models ($100-200/month for one session per month) that
              reduce the per-session cost significantly if you plan to go regularly.
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
            <h2 className="text-xl font-bold text-white mb-3">Ready to find an IV therapy clinic?</h2>
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
