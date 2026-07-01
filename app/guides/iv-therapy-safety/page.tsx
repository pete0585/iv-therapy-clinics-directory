import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Is IV Therapy Safe? What to Know Before Your First Drip',
  description: 'The honest patient guide to IV therapy safety — risks, side effects, who should not get IV therapy, red flags at IV clinics, and how to verify a clinic is legitimate.',
  alternates: { canonical: 'https://www.ivtherapyclinicfinder.com/guides/iv-therapy-safety' },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'What are the risks of IV therapy?',
    a: 'The most common risks are minor: bruising or soreness at the IV insertion site, and mild vein irritation during infusion (often from pH or osmolarity of the solution). Rare but more serious risks include air embolism (prevented by proper technique), infection at the insertion site (prevented by sterile technique and single-use equipment), electrolyte imbalance (prevented by intake screening), and allergic reactions to specific ingredients (B vitamins, preservatives). Serious complications are uncommon in properly supervised clinical settings. They are more likely in settings with inadequate medical oversight or improperly trained staff.',
  },
  {
    q: 'Who should not get IV therapy?',
    a: 'People with severe kidney disease or kidney failure should not receive standard IV therapy without physician supervision — kidneys regulate how fluids clear the body, and compromised kidney function changes this equation significantly. People with congestive heart failure or pulmonary edema are at risk of fluid overload. G6PD deficiency (a genetic enzyme deficiency) is a contraindication for high-dose IV vitamin C — this is one reason high-dose vitamin C protocols require labs before treatment. People with known hemochromatosis (iron overload disorder) should be careful with some IV formulas. Pregnant women should avoid elective IV wellness treatments. Any person with significant medical conditions should consult their physician before starting IV therapy.',
  },
  {
    q: 'Does IV therapy require a prescription or medical supervision in the US?',
    a: 'Yes and no. IV therapy must be administered by a licensed RN or other licensed clinical professional — this is a legal requirement across all states. What varies is the degree of physician involvement required. Some states require a physician or NP to order and supervise each IV treatment. Others allow broader RN practice authority. Medspa-style IV lounges still legally require a physician or NP medical director, even if that physician is not physically present for every infusion. The intake process — reviewing your medical history and screening for contraindications — is a legal and medical requirement, not optional paperwork.',
  },
  {
    q: 'How do I verify that an IV clinic is legitimate?',
    a: 'Ask for the name of the medical director and verify their license on your state\'s medical board website. Ask the nurse who will place your IV for their full name and RN license number — you can verify active licensure on most state nursing board websites. Ask where the clinic sources its IV solutions (answer should be an FDA-registered compounding pharmacy, not a vague supplier). Confirm that an intake medical screening happens before every session, not just the first. Legitimate clinics welcome these questions; evasive answers are a red flag.',
  },
]

export default function IVTherapySafetyPage() {
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
            <span className="text-brand-navy">IV Therapy Safety</span>
          </nav>

          <div className="flex items-center gap-2 text-brand-teal text-sm font-medium mb-3">
            <BookOpen className="h-4 w-4" />
            <span>Resource guide</span>
          </div>

          <h1 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
            Is IV Therapy Safe? What to Know Before Your First Drip
          </h1>
          <p className="text-brand-steel text-sm mb-8">
            IV therapy administered by licensed professionals in a properly supervised setting is safe for most people. The key phrase: properly supervised. Here&apos;s what that means, what the real risks are, and how to tell a legitimate clinic from one you should avoid.
          </p>

          <div className="prose-guide">
            <h2>Is IV therapy regulated?</h2>
            <p>
              Yes. IV therapy in the United States must be administered by a licensed registered nurse (RN)
              or another licensed clinical professional such as a nurse practitioner (NP) or physician. This
              is not optional — placing an IV catheter and administering intravenous medications is a
              controlled clinical act under state nurse practice acts.
            </p>
            <p>
              Medspa-style IV lounges — the walk-in IV bars you see in strip malls and wellness centers —
              are still medical practices. They are legally required to have a physician or NP serving as
              medical director, responsible for protocols, training, and clinical oversight. The degree of
              physician presence varies by state: some states require a physician or NP to be on-site during
              infusions; others allow remote medical director oversight. But the absence of a white coat in
              the room does not mean the absence of medical supervision requirements.
            </p>
            <p>
              IV solutions sourced from compounding pharmacies are also regulated. FDA-registered compounding
              pharmacies must meet specific sterility, testing, and quality standards. Reputable IV clinics
              source from registered compounders and can provide batch Certificates of Analysis on request.
            </p>

            <h2>Risks and side effects: what actually happens</h2>
            <p>
              Most people who receive IV therapy experience no adverse effects beyond mild soreness at the
              insertion site. The full risk landscape, ranked by frequency:
            </p>
            <ul>
              <li><strong>Bruising at the insertion site</strong> — common, minor, resolves within days. More likely in people on blood thinners or with delicate veins.</li>
              <li><strong>Vein irritation during infusion</strong> — a mild burning or aching sensation along the vein, usually caused by solution pH or infusion rate. Tell your nurse immediately — adjusting the drip rate or diluting the solution usually resolves it.</li>
              <li><strong>Transient sensations from specific ingredients</strong> — magnesium can cause a brief warm or flushing sensation; B vitamins can produce a mild garlic-like taste during infusion. Both are harmless and typically last only minutes.</li>
              <li><strong>Hypotension (low blood pressure)</strong> — rare; can occur with rapid infusion rates. Prevented by appropriate drip rate management by your nurse.</li>
              <li><strong>Electrolyte imbalance</strong> — rare with proper intake screening and standard formulas. Risk increases in people with kidney disease, heart conditions, or abnormal baseline labs.</li>
              <li><strong>Infection at insertion site</strong> — rare with sterile technique and single-use equipment. A sign of substandard practice if it occurs.</li>
              <li><strong>Allergic reaction</strong> — uncommon; B vitamins (particularly in high doses) and preservatives like benzyl alcohol can cause reactions in sensitive individuals. Your intake screening should flag known allergies.</li>
              <li><strong>Air embolism</strong> — extremely rare with proper IV technique; prevented by appropriate line management. A serious complication that underscores why proper RN training is non-negotiable.</li>
            </ul>

            <h2>Who should NOT get IV therapy</h2>
            <p>
              Several medical conditions make standard IV therapy either contraindicated or requiring physician
              clearance before proceeding:
            </p>
            <ul>
              <li><strong>Severe kidney disease or renal failure</strong> — kidneys regulate fluid and electrolyte clearance; impaired kidney function changes how IV fluids and minerals are processed. Do not get IV therapy without your nephrologist&apos;s explicit approval.</li>
              <li><strong>Congestive heart failure</strong> — fluid overload risk. The heart cannot handle the additional fluid volume that IV therapy delivers. Contraindicated without physician supervision and modified protocols.</li>
              <li><strong>Pulmonary edema (fluid in the lungs)</strong> — active pulmonary edema is a contraindication to additional IV fluids of any kind.</li>
              <li><strong>G6PD deficiency</strong> — a genetic enzyme deficiency that makes red blood cells vulnerable to oxidative damage. High-dose IV vitamin C (above 10g) can trigger hemolytic anemia in people with G6PD deficiency. Reputable clinics screen for this before high-dose vitamin C protocols.</li>
              <li><strong>Hemochromatosis (iron overload)</strong> — some IV formulas contain iron. People with iron overload disorders should confirm any IV formula is iron-free before treatment.</li>
              <li><strong>Pregnancy</strong> — elective IV wellness treatment is not recommended during pregnancy. Hospital IV treatment under obstetric supervision is a different matter.</li>
            </ul>

            <h2>Red flags at an IV clinic</h2>
            <p>
              Not all IV clinics operate to the same standard. These are warning signs that a clinic may not
              be providing appropriate medical oversight:
            </p>
            <ul>
              <li><strong>No registered nurse present</strong> — if the person placing your IV is not a licensed RN (or NP/physician), leave. This is non-negotiable.</li>
              <li><strong>No physician or NP medical director</strong> — ask directly who the medical director is. An evasive answer or &ldquo;we have a doctor on call&rdquo; without a name is a red flag.</li>
              <li><strong>No intake medical history</strong> — every session, especially the first, should include a health screening. A clinic that skips this is not practicing safe IV therapy.</li>
              <li><strong>Claims to cure or treat specific diseases</strong> — IV therapy clinics are not licensed to treat medical conditions. A clinic claiming their drip &ldquo;cures&rdquo; cancer, reverses autoimmune disease, or replaces medical treatment is making illegal and dangerous claims.</li>
              <li><strong>Extremely low pricing with no apparent medical oversight</strong> — $40 &ldquo;IV therapy&rdquo; without any intake process or nurse presence should raise questions about what you&apos;re actually receiving and under what conditions.</li>
              <li><strong>Cannot name their compounding pharmacy</strong> — legitimate clinics know exactly where their IV solutions come from and can name the pharmacy. &ldquo;We use a supplier&rdquo; is not an adequate answer.</li>
            </ul>

            <h2>How to verify a clinic is legitimate</h2>
            <p>
              Before your first visit, do a 10-minute check:
            </p>
            <ul>
              <li>Search the medical director&apos;s name on your state&apos;s medical board license verification website. Confirm their license is active and in good standing.</li>
              <li>Ask the nurse who will administer your IV for their full name and license number. Verify active RN licensure on your state nursing board&apos;s website.</li>
              <li>Ask where the clinic sources its IV solutions — the answer should be a named FDA-registered compounding pharmacy.</li>
              <li>Confirm the intake process. A medical history form and clinical screening before your first session is a minimum standard.</li>
            </ul>
            <p>
              Legitimate clinics welcome these questions. They&apos;re a sign of a patient who takes their health
              seriously, which is exactly the kind of patient a well-run IV clinic wants to serve.
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
            <h2 className="text-xl font-bold text-white mb-3">Ready to find a vetted IV therapy clinic?</h2>
            <p className="text-teal-100 mb-6 text-sm">
              Browse our directory of medically supervised IV clinics with verified profiles and real location data.
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
