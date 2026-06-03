import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, AlertTriangle, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Is IV Therapy Safe? Medical Oversight, Risks, and Red Flags to Know',
  description: 'IV therapy is safe when administered correctly. Learn what credentials to look for, who should not get IV therapy, and the red flags that signal a clinic to avoid.',
}

const FAQ = [
  {
    q: 'Is IV therapy safe?',
    a: 'IV therapy administered by a licensed RN under physician or NP medical supervision, using ingredients from an FDA-registered compounding pharmacy, after a proper health intake screening, is very safe. Serious adverse events are rare. The risks that do exist — vein irritation, rare allergic reactions, fluid overload in susceptible patients — are manageable by qualified medical personnel and screened for in advance. The concern is with poorly run operations that skip intake screening, use unqualified personnel, or source ingredients from unverified suppliers.',
  },
  {
    q: 'Who should not get IV therapy?',
    a: 'IV therapy carries elevated risk for: people with kidney disease or kidney failure (who cannot clear IV fluids at a normal rate), people with congestive heart failure or pulmonary edema (fluid overload risk), people with severe electrolyte abnormalities (sodium, potassium, calcium), people with known allergies to IV ingredients, and pregnant women (elective IV treatment is not appropriate during pregnancy). High-dose vitamin C therapy specifically requires G6PD deficiency screening — this enzyme deficiency causes hemolysis (red blood cell destruction) with high IV vitamin C doses.',
  },
  {
    q: 'What credentials should an IV therapy clinic have?',
    a: 'The minimum standard: a licensed RN placing and monitoring the IV, and a physician or nurse practitioner with an active medical license serving as the medical director and authorizing treatment protocols. The IV solutions should come from an FDA-registered compounding pharmacy (they can provide a Certificate of Analysis). The clinic should hold appropriate state business licenses. Some states regulate IV wellness clinics specifically; others apply general healthcare facility rules. Asking to see the medical director\'s name and credentials is completely reasonable.',
  },
  {
    q: 'What are the risks of IV therapy?',
    a: 'Common, minor risks: bruising or soreness at the insertion site (resolves in 1-3 days), mild warmth or flushing during magnesium infusion (resolved by slowing the drip), metallic taste during certain infusions (normal, temporary). Less common: phlebitis (vein irritation or inflammation, treated with warm compress and rest). Rare: allergic reaction to IV ingredients (managed by stopping the infusion and treating the reaction). Very rare with proper screening: fluid overload in patients with cardiac or renal conditions. The overall safety profile is comparable to any other elective medical procedure.',
  },
  {
    q: 'Can untrained people give IV therapy?',
    a: 'They can attempt to — and that is the problem. Not all IV therapy operations are properly credentialed. Some wellness clinics operate in regulatory gray zones, with personnel who have minimal training and no supervising physician. This is not safe. An improperly placed catheter causes infiltration (fluid leaking into surrounding tissue) or phlebitis. An air bubble in the line — rare but real — causes an air embolism. These are manageable risks when qualified personnel are present; they become serious risks without them.',
  },
  {
    q: 'What are the red flags of a bad IV therapy clinic?',
    a: 'Red flags: no health intake form before your first session, inability to name the supervising physician or medical director, no information about where IV solutions are sourced, personnel who cannot explain the ingredients in your drip or why they are included, no protocol for handling adverse reactions (no crash cart or epinephrine available), extremely low prices that don\'t make economic sense for proper operations, and marketing that makes unfounded medical claims ("cure your autoimmune disease" or "cancer treatment"). A good IV clinic is a boring, professional medical operation — not a sales pitch.',
  },
]

export default function IsIVTherapySafePage() {
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
            <span className="text-brand-navy">Is IV Therapy Safe</span>
          </nav>

          <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
            <BookOpen className="h-4 w-4" />
            <span>Resource guide</span>
          </div>

          <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
            Is IV Therapy Safe?
          </h1>
          <p className="text-brand-steel text-sm mb-8">
            The honest answer is: it depends on who is doing it and how. Here&apos;s what to look for and what to avoid.
          </p>

          <div className="prose-guide">
            <h2>When IV therapy is safe</h2>
            <p>
              IV therapy has an excellent safety record when delivered by qualified personnel. Registered nurses
              place tens of thousands of peripheral IV catheters every day in hospitals across the country — it
              is a routine skill for an RN. Adding vitamins and minerals to a saline base and infusing them at
              a controlled rate is a simple, low-risk procedure when the person doing it knows what they are
              doing, the patient has been properly screened, and the ingredients are pharmaceutical grade.
            </p>
            <p>
              The safety data from the IV therapy industry reflects this: serious adverse events are rare and
              typically occur when one of those three conditions is missing — untrained personnel, inadequate
              screening, or unverified ingredients.
            </p>

            <h2>The credentials that matter</h2>
            <p>
              Three things you need to confirm before your first session at any IV clinic:
            </p>
            <ol>
              <li>
                <strong>Who is placing the IV?</strong> It should be a licensed registered nurse (RN) at minimum.
                In some states, nurse practitioners (NP) or physicians also perform infusions. Medical assistants
                and wellness coaches placing IVs is not acceptable — regardless of how much training a clinic
                claims to provide.
              </li>
              <li>
                <strong>Who is the medical director?</strong> A licensed physician or nurse practitioner should
                be the medical director of any IV therapy operation — signing off on patient protocols, available
                for escalation if something goes wrong, and responsible for the standing orders under which
                the nurses work. Ask for their name and credentials. If the clinic can&apos;t or won&apos;t tell you,
                that&apos;s a red flag.
              </li>
              <li>
                <strong>Where do the ingredients come from?</strong> IV solutions should come from an
                FDA-registered 503B compounding pharmacy or a licensed pharmaceutical manufacturer. This ensures
                sterility, accurate potency, and lot traceability. The clinic should be able to name their
                pharmacy supplier and ideally provide a Certificate of Analysis for current batch products.
              </li>
            </ol>

            {/* Red flags and green flags */}
            <h2>Red flags and green flags</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 my-8">
            <div className="bg-red-50 rounded-xl border border-red-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <h3 className="font-bold text-red-700 text-sm">Red flags — avoid</h3>
              </div>
              <ul className="space-y-2 text-sm text-red-600">
                <li>No health intake form before your first session</li>
                <li>Can&apos;t name the supervising physician or medical director</li>
                <li>Vague answers about ingredient sourcing</li>
                <li>Personnel can&apos;t explain what&apos;s in your drip</li>
                <li>No protocol for handling allergic reactions</li>
                <li>Prices far below market without explanation</li>
                <li>Unfounded medical claims in marketing</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-xl border border-green-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <h3 className="font-bold text-green-700 text-sm">Green flags — good signs</h3>
              </div>
              <ul className="space-y-2 text-sm text-green-700">
                <li>Health intake form completed before treatment</li>
                <li>Named medical director with verifiable credentials</li>
                <li>Compounding pharmacy named on request</li>
                <li>Nurse explains the formula and asks about contraindications</li>
                <li>Emergency medication (epinephrine) available on-site</li>
                <li>Realistic claims — wellness support, not medical cures</li>
                <li>G6PD screening offered before high-dose Vitamin C</li>
              </ul>
            </div>
          </div>

          <div className="prose-guide">
            <h2>Who should consult a physician before IV therapy</h2>
            <p>
              Most healthy adults can get a standard wellness IV without a physician visit first — the clinic&apos;s
              intake process is designed to screen for the people who should not. But if you have any of these
              conditions, talk to your doctor before booking:
            </p>
            <ul>
              <li>Kidney disease (any stage of chronic kidney disease or acute kidney injury)</li>
              <li>Congestive heart failure or any condition requiring fluid restriction</li>
              <li>History of pulmonary edema</li>
              <li>Severe calcium, sodium, or potassium abnormalities</li>
              <li>G6PD deficiency (if considering high-dose vitamin C)</li>
              <li>Active cancer or ongoing cancer treatment</li>
              <li>Current pregnancy</li>
            </ul>
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
            <h2 className="text-xl font-bold text-white mb-3">Find a Properly Credentialed IV Clinic</h2>
            <p className="text-teal-100 mb-6 text-sm">
              Browse IV therapy clinics in your city. All listings show medical oversight level.
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
