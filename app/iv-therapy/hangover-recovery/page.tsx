import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Hangover IV Therapy — Fast Recovery Drips and Mobile IV Services Near You',
  description: 'Hangover IV therapy delivers rehydration, B vitamins, and anti-nausea medication directly into your bloodstream. Find same-day or mobile IV hangover services near you.',
}

const FAQ = [
  {
    q: 'What is in a hangover IV drip?',
    a: 'A standard hangover recovery IV contains: 1 liter of isotonic saline or lactated Ringer\'s (for rapid rehydration), B-complex vitamins (B1, B2, B3, B6 — depleted by alcohol metabolism), vitamin B12 (energy), glutathione (neutralizes acetaldehyde, the primary hangover toxin), and often prescription medications as add-ons: ondansetron (Zofran) for nausea and ketorolac (Toradol) for headache pain. Some clinics also add magnesium, zinc, or vitamin C.',
  },
  {
    q: 'How fast does hangover IV therapy work?',
    a: 'Most people feel significantly better within 30-45 minutes of starting the infusion — often before the bag is finished. The saline rehydrates quickly, B vitamins restore energy metabolism, and the anti-nausea medication (if included) takes effect within 20-30 minutes. Glutathione helps clear acetaldehyde throughout the session. Most patients report feeling 80-90% recovered by the end of the 45-60 minute session.',
  },
  {
    q: 'Is hangover IV therapy available the same day?',
    a: 'Yes. Most IV clinics offer same-day appointments, and mobile IV services typically arrive within 45-90 minutes of booking — many operate 7 days a week, including weekends and holidays when demand spikes. Some mobile services in Las Vegas, Miami, and Nashville offer 24-hour availability for exactly this reason.',
  },
  {
    q: 'How much does a hangover IV drip cost?',
    a: 'Hangover recovery IVs typically range from $150 to $350 per session. Basic hydration with B vitamins runs $150-200. Full recovery packages with anti-nausea medication, Toradol, and glutathione push run $200-350. Mobile IV services add $25-75 for in-home or hotel delivery. Group rates (bachelor/bachelorette parties) are often discounted.',
  },
  {
    q: 'Can I get a hangover IV delivered to my hotel room?',
    a: 'Yes — mobile hangover IV is one of the most common use cases. A registered nurse comes to your hotel room, administers the drip in your bed or on the couch, and you can sleep or watch TV during the 45-60 minute session. This is especially common in Las Vegas, Nashville, Miami, New Orleans, and other high-traffic party destinations. Book through a mobile IV service; typical wait time is 45-90 minutes from booking to nurse arrival.',
  },
  {
    q: 'Is hangover IV therapy safe?',
    a: 'Yes, when administered by a registered nurse. The IV fluids and nutrients are the same used in hospitals for dehydration treatment. The add-on medications (Zofran, Toradol) require a medical order from a supervising physician or NP — reputable clinics have this in place. The main risks are: mild bruising at the insertion site, and extremely rare allergic reactions. Anyone with kidney disease, severe heart failure, or certain drug allergies should consult a physician before IV therapy.',
  },
]

export default function HangoverRecoveryPage() {
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
            <span className="text-brand-navy">Hangover Recovery</span>
          </nav>

          <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
            <Clock className="h-4 w-4" />
            <span>Treatment guide</span>
          </div>

          <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
            Hangover Recovery IV Therapy
          </h1>
          <p className="text-brand-steel text-sm mb-8">
            The fastest hangover cure available. IV rehydration, B vitamins, and anti-nausea medication directly into your bloodstream — most people feel 80% better before the bag is finished.
          </p>

          <div className="prose-guide">
            <h2>Why IV works better than water and Gatorade</h2>
            <p>
              A hangover is three things happening simultaneously: dehydration, inflammation, and acetaldehyde
              toxicity. Oral rehydration takes hours because the gut absorbs water at about 1 liter per hour
              under ideal conditions — and a hangover gut is inflamed and sluggish. IV saline bypasses the gut
              entirely, delivering a full liter of fluids directly into the bloodstream in 30-45 minutes.
            </p>
            <p>
              Alcohol metabolism depletes B vitamins rapidly — especially B1 (thiamine), which is why chronic
              heavy drinkers develop neurological complications. Replacing B vitamins IV restores the metabolic
              machinery your cells need to clear the remaining alcohol metabolites. Glutathione directly
              neutralizes acetaldehyde, the compound that makes hangovers feel like food poisoning.
            </p>

            <h2>What a hangover IV session includes</h2>
            <ul>
              <li><strong>1L isotonic saline</strong> — rapid rehydration without gut involvement</li>
              <li><strong>B-complex vitamins</strong> — B1, B2, B3, B5, B6 to restore metabolism</li>
              <li><strong>Vitamin B12</strong> — energy and neurological support</li>
              <li><strong>Glutathione push</strong> — acetaldehyde neutralization</li>
              <li><strong>Ondansetron (Zofran)</strong> — anti-nausea medication (add-on, requires medical order)</li>
              <li><strong>Ketorolac (Toradol)</strong> — IV anti-inflammatory for headache (add-on, requires medical order)</li>
              <li><strong>Magnesium</strong> — muscle cramps and headache</li>
            </ul>
            <p>
              The prescription add-ons (Zofran, Toradol) make a significant difference for severe hangovers.
              Look for clinics that have a supervising physician or NP who can authorize these — not all IV
              clinics are set up for it.
            </p>

            <h2>Mobile hangover IV: the nurse comes to you</h2>
            <p>
              Mobile hangover IV services are widely available in most major cities and party destinations.
              Book online or by phone, give your hotel room or address, and a registered nurse arrives
              within 45-90 minutes. You stay horizontal. You don&apos;t have to dress, drive, or sit in a waiting
              room when you&apos;re barely functional. Most mobile services operate 7 days a week; some in Las
              Vegas and Miami are 24-hour operations.
            </p>
            <p>
              Group bookings for bachelor parties, bachelorette weekends, and post-event recovery are common
              and often discounted. A nurse can typically do 4-6 patients per visit in the same location.
            </p>

            <h2>When to go to a clinic vs. use mobile IV</h2>
            <p>
              Use a clinic if: you can function well enough to get there, you want to add NAD+ (which requires
              a longer session better suited to a chair), or you want to combine hangover recovery with a full
              wellness treatment. Use mobile IV if: you genuinely cannot move, you&apos;re in a hotel, or you
              prefer the convenience. Price-wise, mobile adds $25-75 for the travel — worth it when the
              alternative is a cab ride while nauseous.
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
            <h2 className="text-xl font-bold text-white mb-3">Find a Hangover IV Clinic Near You</h2>
            <p className="text-teal-100 mb-6 text-sm">
              Browse clinics and mobile IV services in your city — many offer same-day booking.
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
