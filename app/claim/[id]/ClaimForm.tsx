'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle } from 'lucide-react'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  name: z.string().min(2, 'Name is required'),
  role: z.string().min(1, 'Select your role'),
})

type FormData = z.infer<typeof schema>

export default function ClaimForm({ listingId, listingName }: { listingId: string; listingName: string }) {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listing_id: listingId, ...data }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error ?? 'Failed to send verification email')
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
      <div className="bg-white rounded-xl border border-brand-emerald p-6 text-center">
        <div className="w-12 h-12 bg-brand-emerald-light rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-6 h-6 text-brand-emerald" aria-label="Success" />
        </div>
        <h3 className="font-bold text-brand-navy text-lg mb-2">Check Your Email</h3>
        <p className="text-gray-600 text-sm">
          We&apos;ve sent a verification link to your email. Click it to complete the claim for <strong>{listingName}</strong>.
        </p>
        <p className="text-xs text-gray-400 mt-3">Link expires in 72 hours.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="font-bold text-brand-navy text-lg mb-5">Verify Your Ownership</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">{error}</div>
        )}
        <div>
          <label className="form-label" htmlFor="name">Your Full Name *</label>
          <input id="name" {...register('name')} className="input-field" placeholder="Jane Smith" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="form-label" htmlFor="email">Business Email *</label>
          <input id="email" {...register('email')} className="input-field" placeholder="you@yourclinic.com" type="email" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="form-label" htmlFor="role">Your Role *</label>
          <select id="role" {...register('role')} className="select-field">
            <option value="">Select your role</option>
            <option value="owner">Owner</option>
            <option value="manager">Manager</option>
            <option value="medical_director">Medical Director</option>
            <option value="other">Other</option>
          </select>
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
        </div>
        <button type="submit" disabled={isLoading} className="btn-primary w-full justify-center py-3 disabled:opacity-60">
          {isLoading ? 'Sending...' : 'Send Verification Email'}
        </button>
        <p className="text-xs text-gray-400 text-center">
          We&apos;ll send a verification link to confirm you own this clinic. Free to claim.
        </p>
      </form>
    </div>
  )
}
