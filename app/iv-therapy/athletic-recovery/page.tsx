import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Activity } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Athletic Recovery IV Therapy — Performance Drips for Serious Athletes | Find a Clinic',
  description: 'Athletic recovery IV therapy replenishes electrolytes, amino acids, and micronutrients lost during intense training. Find performance-focused IV clinics near you.',
}

const FAQ = [
  {
    q: 'What is in an athletic recovery IV drip?',
    a: 'Athletic recovery IVs vary by clinic but typically include: isotonic saline or lactated Ringer\'s (electrolyte replacement), magnesium (muscle function and cramp prevention), B-complex vitamins (energy metabolism), high-dose vitamin C (antioxidant defense against exercise-induced oxidative stress), amino acids (leucine, isoleucine, valine BCAAs for muscle repair), and glutathione (reducing post-exercise oxidative damage). Some performance-focused clinics add zinc, CoQ10, or carnitine.',
  },
  {
    q: 'How does IV therapy help athletic recovery?',
    a: 'Intense exercise depletes electrolytes through sweat, creates oxidative stress that damages muscle tissue, depletes micronutrients consumed by energy metabolism, and causes muscle micro-tears that require amino acids for repair. IV delivery replaces these losses faster than oral supplementation — especially important in the 60-minute post-exercise recovery window. Athletes report faster return to full performance, reduced delayed-onset muscle soreness (DOMS), and faster adaptation between training sessions.',
  },
  {
    q: 'When should athletes get IV therapy?',
    a: 'For single-session recovery: within 60-90 minutes post-competition or post-training. Many athletes schedule IVs immediately after events (races, fights, games) at on-site mobile services. For chronic training load: weekly maintenance sessions during heavy training blocks support sustained performance. Some athletes do a loading protocol (3-5 sessions in a week) before major competitions. Post-illness return to training is another common use — illness depletes everything IV therapy replenishes.',
  },
  {
    q: 'Is IV therapy better than sports drinks and protein shakes?',
    a: 'IV therapy and oral nutrition serve different purposes and are not competing. Oral nutrition (protein, carbs, electrolytes) remains the foundation of athletic recovery — you cannot out-IV a poor diet. Where IV excels: it bypasses a compromised gut (post-endurance event, gut blood flow is reduced), it delivers nutrients at doses not achievable orally without GI side effects, and it hydrates faster when severe dehydration has occurred. Think of IV therapy as a tool in the recovery stack, not a replacement for eating.',
  },
  {
    q: 'Do professional athletes use IV therapy?',
    a: 'Yes, widely. IV therapy is common in professional sports — NFL, NBA, MLS, combat sports, and Olympic programs. WADA (World Anti-Doping Agency) permits IV therapy with a medical exemption but bans IV injections above 100mL except for genuine medical treatment or clinical investigation. Most standard recovery IVs (500mL-1L) require a medical use exemption (TUE) for athletes subject to WADA rules. If you are a competitive athlete, confirm your sport\'s anti-doping rules before getting IV therapy.',
  },
  {
    q: 'How much does athletic recovery IV therapy cost?',
    a: 'Performance recovery IVs typically range from $150 to $400 per session depending on the formula and add-ons. Basic electrolyte drips are on the lower end; full recovery protocols with amino acids, NAD+, and glutathione are on the higher end. Many IV clinics offer athlete membership programs that provide discounted weekly sessions — often $100-150 per session for members versus $175-275 per session for one-off visits.',
  },
]

export default function AthleticRecoveryPage() {
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
            <span className="text-brand-navy">Athletic Recovery</span>
          </nav>

          <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
            <Activity className="h-4 w-4" />
            <span>Treatment guide</span>
          </div>

          <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
            Athletic Recovery IV Therapy
          </h1>
          <p className="text-brand-steel text-sm mb-8">
            Targeted post-training nutrition delivered directly to your bloodstream — for faster muscle repair, electrolyte restoration, and reduced recovery time between sessions.
          </p>

          <div className="prose-guide">
            <h2>Why recovery is where performance is built</h2>
            <p>
              Training is the stimulus. Recovery is where adaptation happens. You don&apos;t get stronger during
              the workout — you get stronger in the 24-72 hours after, when your body repairs the micro-tears,
              synthesizes new mitochondria, and adapts to the training load. Everything that supports that
              recovery window supports performance gains.
            </p>
            <p>
              The challenge: intense training creates a temporary state of gut compromise. During hard
              endurance efforts, blood is shunted away from the gut to working muscles — which means post-exercise
              absorption of oral nutrition is slower than usual. IV delivery bypasses this entirely, delivering
              electrolytes, B vitamins, and amino acids at full bioavailability within minutes.
            </p>

            <h2>The performance recovery IV formula</h2>
            <p>
              A proper athletic recovery IV includes:
            </p>
            <ul>
              <li><strong>Isotonic saline or lactated Ringer&apos;s</strong> — electrolyte replacement matching what&apos;s lost in sweat</li>
              <li><strong>Magnesium</strong> — the mineral most depleted by endurance training; critical for muscle function, sleep quality, and over 300 enzymatic reactions</li>
              <li><strong>B-complex vitamins</strong> — fuels ATP production; B1 and B6 are especially critical for athletes</li>
              <li><strong>High-dose vitamin C</strong> — reduces exercise-induced oxidative stress; supports collagen synthesis for connective tissue repair</li>
              <li><strong>Amino acids (BCAAs)</strong> — leucine, isoleucine, and valine drive muscle protein synthesis post-exercise</li>
              <li><strong>Glutathione</strong> — the primary antioxidant defense against exercise-induced free radical production</li>
              <li><strong>Zinc</strong> — immune support (intense training temporarily suppresses immune function)</li>
            </ul>

            <h2>Who uses athletic recovery IVs</h2>
            <p>
              The range is broader than you&apos;d expect. The biggest categories: endurance athletes (marathoners,
              triathletes, cyclists) who deplete enormously through long events; CrossFit and HIIT athletes
              doing high-volume weekly training; combat sports athletes managing weight cuts and post-fight
              recovery; and recreational athletes who work demanding jobs and need faster recovery to maintain
              their training schedule without burning out.
            </p>
            <p>
              Mobile IV services have become common at race finish lines, fight venues, and CrossFit competitions
              — the nurse sets up near the exit and athletes stop for a 45-minute drip before heading home.
            </p>

            <h2>What to ask your IV clinic about performance protocols</h2>
            <p>
              Not all IV clinics are equally equipped for athletic performance applications. Look for clinics
              that: can customize your formula based on your sport and training volume, offer amino acid infusions
              (not all stock them), have a supervising physician familiar with performance medicine, and can
              explain why they chose each ingredient in your protocol. A clinic that just offers a one-size-fits-all
              "Performance Drip" with a fixed formula is limiting your results.
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
            <h2 className="text-xl font-bold text-white mb-3">Find an Athletic Recovery IV Clinic Near You</h2>
            <p className="text-teal-100 mb-6 text-sm">
              Browse performance-focused IV therapy clinics in your city.
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
