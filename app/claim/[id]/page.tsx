import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle, Shield, Star, Droplets } from 'lucide-react'
import { getListingById } from '@/lib/data'
import ClaimForm from './ClaimForm'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ token?: string; verified?: string }>
}

export const metadata: Metadata = {
  title: 'Claim Your IV Therapy Clinic Listing',
  description: 'Claim your IV therapy clinic listing on IVTherapyClinicFinder to add treatment details, pricing, and photos.',
  robots: { index: false },
}

export default async function ClaimPage({ params, searchParams }: PageProps) {
  const { id } = await params
  const { token, verified } = await searchParams

  const listing = await getListingById(id).catch(() => null)
  if (!listing) notFound()

  // Token verification flow
  if (token) {
    return <TokenVerifyPage id={id} token={token} listingName={listing.name} />
  }

  // Already verified — show upgrade options
  if (verified === 'true' && listing.is_claimed) {
    const { createServiceClient: createSvc } = await import('@/lib/supabase/server')
    const svcClient = await createSvc()
    const mStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
    const { count: vc } = await svcClient.from('listing_views').select('*', { count: 'exact', head: true })
      .eq('directory_slug', 'iv-therapy-clinics').eq('listing_id', String(listing.id)).gte('viewed_at', mStart)
    return <UpgradePage listing={listing} monthlyViews={vc ?? 0} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-navy text-white py-10">
        <div className="page-container">
          <div className="flex items-center gap-2 text-brand-cyan mb-2">
            <Droplets className="w-5 h-5" aria-label="" />
            <span className="text-sm font-semibold">Claim Your Listing</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Claim: {listing.name}</h1>
          <p className="text-gray-300">{listing.city}, {listing.state}</p>
        </div>
      </div>

      <div className="page-container py-10">
        <div className="max-w-2xl">
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="font-bold text-brand-navy text-lg mb-4">Why claim your listing?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <BenefitCard icon="📋" title="Full Treatment Menu" description="Show patients exactly what you offer" />
              <BenefitCard icon="💰" title="Pricing Display" description="Show price ranges — converts searchers to callers" />
              <BenefitCard icon="📈" title="Priority Placement" description="Verified clinics appear above free listings" />
            </div>
          </div>

          <ClaimForm listingId={id} listingName={listing.name} />
        </div>
      </div>
    </div>
  )
}

async function TokenVerifyPage({ id, token, listingName }: { id: string; token: string; listingName: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ivtherapyclinicfinder.com'}/api/claim/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ listing_id: id, token }),
    cache: 'no-store',
  }).catch(() => null)

  const success = res?.ok

  if (!success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl border border-gray-200 p-10 shadow-sm">
            <div className="text-5xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Verification Failed</h1>
            <p className="text-gray-600 mb-6">
              This verification link has expired or is invalid. Please request a new claim link.
            </p>
            <Link href={`/claim/${id}`} className="btn-primary">Request New Link</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-10 shadow-sm">
          <div className="w-16 h-16 bg-brand-emerald-light rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-brand-emerald" aria-label="Success" />
          </div>
          <h1 className="text-2xl font-bold text-brand-navy mb-3">Listing Claimed!</h1>
          <p className="text-gray-600 mb-6">
            You&apos;ve successfully claimed <strong>{listingName}</strong>. Your listing is now active.
          </p>
          <div className="bg-brand-amber-light rounded-xl p-4 mb-6">
            <p className="text-sm font-semibold text-gray-800 mb-1">Upgrade to Verified ($99/yr)</p>
            <p className="text-xs text-gray-600">Show your treatment menu, pricing, and photos — get priority placement above free listings.</p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href={`/claim/${id}?verified=true`} className="btn-primary w-full justify-center">
              Upgrade My Listing
            </Link>
            <Link href="/" className="btn-secondary w-full justify-center">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function UpgradePage({ listing, monthlyViews }: { listing: { id: string; name: string; listing_tier: string }; monthlyViews: number }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-navy text-white py-10">
        <div className="page-container">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Upgrade {listing.name}</h1>
          <p className="text-gray-300">Your listing is claimed. Upgrade to get more visibility.</p>
        </div>
      </div>
      <div className="page-container py-10">
        <div className="max-w-2xl">
          <div className='text-center mb-6'>
            <div className='text-5xl font-bold text-gray-900'>{monthlyViews ?? 0}</div>
            <div className='text-gray-500 mt-1'>people viewed your profile this month</div>
            <div className='mt-3 text-red-600 font-semibold'>0 could contact you — your phone and website are hidden</div>
          </div>
          <div className='space-y-3 mb-6 text-left'>
            {[['Your phone number visible to searchers','They can call you directly'],['Your website linked','Drive traffic to your practice site'],['Your full bio displayed','Build trust before they reach out'],['Verified badge','Stand out from unclaimed profiles']].map(([title, sub]) => (
              <div key={title} className='flex items-start gap-3'>
                <span className='text-green-500 text-lg'>✓</span>
                <div><div className='font-medium'>{title}</div><div className='text-sm text-gray-500'>{sub}</div></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Verified */}
            <div className="bg-white rounded-xl border-2 border-brand-cyan p-6">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-brand-cyan" aria-label="Verified" />
                <span className="font-bold text-brand-navy text-xl">Verified</span>
              </div>
              <div className="text-3xl font-black text-brand-navy mb-4">$99<span className="text-base font-normal text-gray-500">/yr</span></div>
              <ul className="space-y-2 mb-6">
                {['Full treatment menu display', 'Pricing range field', 'Up to 5 photos', 'Verified badge', 'Analytics dashboard', 'Priority placement'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-brand-emerald flex-shrink-0" aria-label="" />
                    {f}
                  </li>
                ))}
              </ul>
              <form action="/api/upgrade" method="post">
                <input type="hidden" name="listing_id" value={listing.id} />
                <input type="hidden" name="tier" value="verified" />
                <button type="submit" className="btn-primary w-full justify-center">
                  Upgrade to Verified
                </button>
              </form>
            </div>

            {/* Featured */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-brand-amber" aria-label="Featured" />
                <span className="font-bold text-brand-navy text-xl">Featured</span>
              </div>
              <div className="text-3xl font-black text-brand-navy mb-4">$199<span className="text-base font-normal text-gray-500">/yr</span></div>
              <ul className="space-y-2 mb-6">
                {['Top 3 city placement', 'Highlighted card design', 'Unlimited photos', 'Promo offer field', 'Monthly performance report', 'All Verified features'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-brand-emerald flex-shrink-0" aria-label="" />
                    {f}
                  </li>
                ))}
              </ul>
              <form action="/api/upgrade" method="post">
                <input type="hidden" name="listing_id" value={listing.id} />
                <input type="hidden" name="tier" value="featured" />
                <button type="submit" className="btn-secondary w-full justify-center">
                  Upgrade to Featured
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BenefitCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="text-center p-4 bg-brand-navy-light rounded-xl">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="font-semibold text-brand-navy text-sm mb-1">{title}</div>
      <div className="text-xs text-gray-500">{description}</div>
    </div>
  )
}
