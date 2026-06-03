'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, Droplets } from 'lucide-react'
import { TREATMENT_CATEGORIES } from '@/lib/types'

const schema = z.object({
  name: z.string().min(2, 'Business name is required'),
  address: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().length(2, 'Select a state'),
  zip: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url('Enter a valid URL').optional().or(z.literal('')),
  email: z.string().email('Enter a valid email'),
  description: z.string().max(1000).optional(),
  is_mobile: z.boolean().optional(),
  is_clinic: z.boolean().optional(),
  medical_oversight: z.string().optional(),
  price_low: z.string().optional(),
  price_high: z.string().optional(),
  services_offered: z.array(z.string()).optional(),
  booking_url: z.string().url('Enter a valid URL').optional().or(z.literal('')),
})

type FormData = z.infer<typeof schema>

const US_STATES = [
  ['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'], ['CA', 'California'],
  ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'], ['FL', 'Florida'], ['GA', 'Georgia'],
  ['HI', 'Hawaii'], ['ID', 'Idaho'], ['IL', 'Illinois'], ['IN', 'Indiana'], ['IA', 'Iowa'],
  ['KS', 'Kansas'], ['KY', 'Kentucky'], ['LA', 'Louisiana'], ['ME', 'Maine'], ['MD', 'Maryland'],
  ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'], ['MS', 'Mississippi'], ['MO', 'Missouri'],
  ['MT', 'Montana'], ['NE', 'Nebraska'], ['NV', 'Nevada'], ['NH', 'New Hampshire'], ['NJ', 'New Jersey'],
  ['NM', 'New Mexico'], ['NY', 'New York'], ['NC', 'North Carolina'], ['ND', 'North Dakota'], ['OH', 'Ohio'],
  ['OK', 'Oklahoma'], ['OR', 'Oregon'], ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'], ['SC', 'South Carolina'],
  ['SD', 'South Dakota'], ['TN', 'Tennessee'], ['TX', 'Texas'], ['UT', 'Utah'], ['VT', 'Vermont'],
  ['VA', 'Virginia'], ['WA', 'Washington'], ['WV', 'West Virginia'], ['WI', 'Wisconsin'], ['WY', 'Wyoming'],
  ['DC', 'Washington D.C.'],
]

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { is_clinic: true, services_offered: [] },
  })

  const selectedTreatments = watch('services_offered') ?? []

  function toggleTreatment(treatment: string) {
    const current = selectedTreatments
    if (current.includes(treatment)) {
      setValue('services_offered', current.filter(t => t !== treatment))
    } else {
      setValue('services_offered', [...current, treatment])
    }
  }

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          price_low: data.price_low ? parseInt(data.price_low) : null,
          price_high: data.price_high ? parseInt(data.price_high) : null,
        }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error ?? 'Submission failed')
      }
      setSubmitted(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl border border-gray-200 p-10 shadow-sm">
            <div className="w-16 h-16 bg-brand-emerald-light rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-brand-emerald" aria-label="Success" />
            </div>
            <h1 className="text-2xl font-bold text-brand-navy mb-3">Listing Submitted!</h1>
            <p className="text-gray-600 mb-6">
              Your clinic has been submitted and will appear in our directory shortly. Check your email for a link to claim and manage your listing.
            </p>
            <Link href="/" className="btn-primary">Back to Home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-navy text-white py-10">
        <div className="page-container">
          <div className="flex items-center gap-3 mb-3">
            <Droplets className="w-6 h-6 text-brand-cyan" aria-label="" />
            <span className="text-brand-cyan font-semibold text-sm">Add Your Clinic</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">List Your IV Therapy Clinic</h1>
          <p className="text-gray-300">Free to add. Reach patients searching for IV therapy near them.</p>
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" className="py-8 bg-brand-cyan-light border-b border-brand-cyan/20">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PricingTier
              name="Free"
              price="$0"
              features={['Name, city, phone, website', 'Up to 3 treatment tags', 'Mobile/clinic badge', 'Standard placement']}
            />
            <PricingTier
              name="Verified"
              price="$99/yr"
              highlighted
              features={['Full treatment menu', 'Pricing range display', 'Photos (up to 5)', 'Verified badge', 'Analytics dashboard', 'Priority placement']}
            />
            <PricingTier
              name="Featured"
              price="$199/yr"
              features={['Top 3 placement in city', 'Highlighted card UI', 'Unlimited photos', 'Promo offer field', 'Monthly performance report', 'All Verified features']}
            />
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="page-container py-10">
        <div className="max-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-brand-navy text-lg mb-5">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="form-label" htmlFor="name">Clinic Name *</label>
                  <input id="name" {...register('name')} className="input-field" placeholder="Your IV Therapy Clinic" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="form-label" htmlFor="address">Street Address</label>
                  <input id="address" {...register('address')} className="input-field" placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label" htmlFor="city">City *</label>
                    <input id="city" {...register('city')} className="input-field" placeholder="Miami" />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                  </div>
                  <div>
                    <label className="form-label" htmlFor="state">State *</label>
                    <select id="state" {...register('state')} className="select-field">
                      <option value="">Select state</option>
                      {US_STATES.map(([abbrev, name]) => (
                        <option key={abbrev} value={abbrev}>{name}</option>
                      ))}
                    </select>
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="form-label" htmlFor="zip">ZIP Code</label>
                  <input id="zip" {...register('zip')} className="input-field" placeholder="33101" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-brand-navy text-lg mb-5">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="form-label" htmlFor="phone">Phone Number</label>
                  <input id="phone" {...register('phone')} className="input-field" placeholder="(555) 555-5555" type="tel" />
                </div>
                <div>
                  <label className="form-label" htmlFor="website">Website URL</label>
                  <input id="website" {...register('website')} className="input-field" placeholder="https://yoursite.com" type="url" />
                  {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>}
                </div>
                <div>
                  <label className="form-label" htmlFor="email">Your Email * (for claim verification)</label>
                  <input id="email" {...register('email')} className="input-field" placeholder="you@yoursite.com" type="email" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="form-label" htmlFor="booking_url">Online Booking URL</label>
                  <input id="booking_url" {...register('booking_url')} className="input-field" placeholder="https://booking.yoursite.com" type="url" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-brand-navy text-lg mb-5">Clinic Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="form-label">Service Type</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" {...register('is_clinic')} className="w-4 h-4 text-brand-cyan rounded" />
                      <span className="text-sm">Fixed Location / Clinic</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" {...register('is_mobile')} className="w-4 h-4 text-brand-cyan rounded" />
                      <span className="text-sm">Mobile IV Service</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="form-label" htmlFor="medical_oversight">Medical Oversight Level</label>
                  <select id="medical_oversight" {...register('medical_oversight')} className="select-field">
                    <option value="">Select level</option>
                    <option value="md_supervised">MD Supervised</option>
                    <option value="np_led">NP-Led</option>
                    <option value="rn_administered">RN Administered</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label" htmlFor="price_low">Price Per Session (low)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                      <input id="price_low" {...register('price_low')} className="input-field pl-7" placeholder="99" type="number" min="0" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="price_high">Price Per Session (high)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                      <input id="price_high" {...register('price_high')} className="input-field pl-7" placeholder="350" type="number" min="0" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="form-label" htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    {...register('description')}
                    className="input-field"
                    rows={4}
                    placeholder="Tell patients about your clinic, specialties, and what makes you different..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-brand-navy text-lg mb-2">Treatments Offered</h2>
              <p className="text-sm text-gray-500 mb-4">Select all that apply</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TREATMENT_CATEGORIES.map((treatment) => (
                  <button
                    key={treatment}
                    type="button"
                    onClick={() => toggleTreatment(treatment)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors border ${
                      selectedTreatments.includes(treatment)
                        ? 'bg-brand-cyan text-white border-brand-cyan'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-brand-cyan'
                    }`}
                  >
                    {treatment}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60">
              {isLoading ? 'Submitting...' : 'Submit Your Clinic — Free'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function PricingTier({ name, price, features, highlighted = false }: {
  name: string
  price: string
  features: string[]
  highlighted?: boolean
}) {
  return (
    <div className={`rounded-xl border p-5 ${highlighted ? 'border-brand-cyan bg-white shadow-md' : 'border-gray-200 bg-white'}`}>
      {highlighted && <div className="text-xs font-bold text-brand-cyan mb-2 uppercase tracking-wide">Most Popular</div>}
      <div className="font-bold text-brand-navy text-lg">{name}</div>
      <div className="text-2xl font-black text-brand-navy my-2">{price}</div>
      <ul className="space-y-1.5 mt-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
            <CheckCircle className="w-3.5 h-3.5 text-brand-emerald flex-shrink-0 mt-0.5" aria-label="" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}
