import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mobile IV Therapy: How It Works, What to Expect, and How to Find a Service',
  description: 'Mobile IV therapy delivers drips to your home, hotel, or office within 60-90 minutes. Learn how it works, what it costs, and how to verify a mobile IV service is legitimate.',
}

const FAQ = [
  {
    q: 'What is mobile IV therapy?',
    a: 'Mobile IV therapy is IV treatment delivered to your location — home, hotel room, office, or event venue — by a registered nurse. The nurse brings all equipment: IV supplies, the prepared solution bag, gloves, sharps disposal container, and emergency medications. The service is identical to what you\'d receive at a brick-and-mortar IV clinic, just in your own space. Session length is the same (30-90 minutes depending on treatment); the only difference is the nurse comes to you.',
  },
  {
    q: 'How fast does mobile IV therapy arrive?',
    a: 'In most major cities, mobile IV services arrive within 60-90 minutes of booking. High-demand times (weekend mornings, post-event Sundays, holidays) may extend wait times to 2 hours. In Las Vegas and a few other 24-hour markets, some services advertise 45-minute response times. Booking in advance — the night before for a morning appointment — eliminates any wait.',
  },
  {
    q: 'Is mobile IV therapy safe?',
    a: 'Mobile IV therapy is safe when the service employs licensed RNs with proper medical supervision (a supervising physician or NP). The safety requirements are identical to a clinic setting — the location doesn\'t change the medical credentials required. The risk with mobile services is that they are less regulated than brick-and-mortar clinics in some states, making it easier for unqualified operators to enter the market. Ask for the nurse\'s license number and the medical director\'s name before booking.',
  },
  {
    q: 'How much does mobile IV therapy cost?',
    a: 'Mobile IV therapy typically costs $25-75 more than the same treatment at a clinic, to cover the nurse\'s travel time and the convenience. A Myers Cocktail that costs $175 at a clinic runs $200-250 via mobile service. Hangover IVs run $175-350 via mobile. Group bookings (3+ people at the same location) often reduce the per-person cost significantly, since the travel fee is shared and many services discount group bookings.',
  },
  {
    q: 'Can I get mobile IV therapy at a hotel?',
    a: 'Yes. Hotel rooms are one of the most common mobile IV settings. The nurse sets up a portable IV pole, places your catheter, and runs the drip while you sit or lie in bed. Many Las Vegas, Miami, and Nashville services specialize in hotel delivery specifically for post-event recovery. Inform the front desk if they need to know about a medical service visitor — some hotels appreciate the heads-up, though nurses are not unusual guests in those markets.',
  },
  {
    q: 'What treatments are available for mobile IV delivery?',
    a: 'Most mobile IV services offer the same treatment menu as clinics: hangover recovery, Myers Cocktail, immune boost, vitamin C, glutathione, hydration, and athletic recovery drips. NAD+ therapy is available from some mobile services but less common — the 2-4 hour infusion time requires the nurse to be stationary for longer than a typical mobile visit. High-dose vitamin C protocols requiring G6PD screening are also available from some specialized mobile services.',
  },
]

export default function MobileIVTherapyGuidePage() {
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
            <span className="text-brand-navy">Mobile IV Therapy</span>
          </nav>

          <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
            <BookOpen className="h-4 w-4" />
            <span>Resource guide</span>
          </div>

          <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
            Mobile IV Therapy: The Complete Guide
          </h1>
          <p className="text-brand-steel text-sm mb-8">
            How the nurse-comes-to-you model works, when it makes sense vs. going to a clinic, and how to find a legitimate mobile IV service.
          </p>

          <div className="prose-guide">
            <h2>What mobile IV therapy actually is</h2>
            <p>
              Mobile IV therapy is a registered nurse arriving at your location with all the equipment needed to
              run an IV drip. The nurse brings: a portable IV pole, the prepared solution bag (made at a
              compounding pharmacy, same as a clinic), all IV supplies (catheter, tubing, tape, gloves), and
              emergency medications in case of an adverse reaction. You receive the same IV treatment you would
              at a clinic, in your living room or hotel room, without having to go anywhere.
            </p>
            <p>
              The market for mobile IV therapy has grown alongside the overall IV therapy industry. Major cities
              now have multiple competing mobile services; Las Vegas, Miami, Nashville, and New York have
              some of the highest concentrations of mobile operators due to heavy tourism and nightlife activity
              driving hangover-recovery demand.
            </p>

            <h2>When mobile IV makes sense</h2>
            <p>
              Mobile is the right choice in four situations:
            </p>
            <ul>
              <li>
                <strong>You genuinely cannot move.</strong> The hangover use case is obvious — when you feel
                like you might not survive a cab ride, the nurse coming to you is the only realistic option.
                Same applies to acute illness, post-surgery recovery at home, or severe fatigue.
              </li>
              <li>
                <strong>You&apos;re traveling and staying in a hotel.</strong> You don&apos;t know the area, you don&apos;t
                have a car, and you need to be functional for a 2pm meeting. Mobile IV services know hotel
                delivery and typically arrive in under 90 minutes.
              </li>
              <li>
                <strong>You want group treatment.</strong> Bachelor/bachelorette parties, sports teams,
                post-race recovery events — getting 4-8 people an IV in the same location in the same morning
                is only practical with mobile service. Most services offer group rate discounts.
              </li>
              <li>
                <strong>You value convenience and time.</strong> If your time is worth more than the $50
                premium, not having to drive, park, wait, and drive back is worth it. Executive clients and
                high performers on tight schedules account for significant mobile IV demand.
              </li>
            </ul>

            <h2>When to go to a clinic instead</h2>
            <p>
              Clinics are better for NAD+ therapy (2-4 hours in a specialized chair or bed with monitoring
              equipment), high-dose vitamin C protocols requiring lab screening, first-time visits where you
              want to see the facility and assess the operation before committing, or any situation where you
              can easily drive there and want to avoid the convenience premium.
            </p>

            <h2>How to verify a mobile IV service is legitimate</h2>
            <p>
              The mobile IV space has more variation in quality than brick-and-mortar clinics, because mobile
              operations are sometimes run by individual nurses operating independently — without a medical
              director. That&apos;s a problem. Before booking any mobile service:
            </p>
            <ul>
              <li><strong>Ask for the nurse&apos;s license number</strong> — verifiable through your state nursing board</li>
              <li><strong>Ask who the medical director is</strong> — a supervising physician or NP should be authorizing the standing orders under which the nurse operates</li>
              <li><strong>Ask where the IV solutions come from</strong> — should be an FDA-registered 503B compounding pharmacy</li>
              <li><strong>Confirm they carry emergency medication</strong> — epinephrine for anaphylaxis at minimum</li>
            </ul>
            <p>
              Reputable mobile services answer these questions without hesitation. Services that push back on
              basic safety questions should be avoided.
            </p>

            <h2>The group booking advantage</h2>
            <p>
              Mobile IV services are uniquely positioned for group recovery events. A nurse can typically
              treat 4-6 patients in the same location in a 3-4 hour window — staggering IV start times by
              20-30 minutes. Most services offer 15-30% group discounts when 3+ people book together at
              the same address. For a bachelorette party of 6 getting hangover IVs, the per-person cost
              with group discount often approaches what a clinic would charge without the travel premium.
            </p>

            <div className="not-prose bg-brand-teal-light rounded-xl p-5 border border-brand-teal/20 mt-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-brand-teal flex-shrink-0" />
                <span className="font-semibold text-brand-navy text-sm">Finding mobile IV services near you</span>
              </div>
              <p className="text-brand-steel text-sm">
                Use the directory to find IV therapy clinics in your city — many offer mobile delivery as an option
                alongside their clinic location. Filter by your city and look for the mobile service badge.
              </p>
            </div>
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
            <h2 className="text-xl font-bold text-white mb-3">Find a Mobile IV Service Near You</h2>
            <p className="text-teal-100 mb-6 text-sm">
              Browse the directory to find IV clinics and mobile services in your city.
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
