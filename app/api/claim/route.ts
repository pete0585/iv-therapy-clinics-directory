import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { listing_id, email, name, role } = body as {
    listing_id?: string
    email?: string
    name?: string
    role?: string
  }

  if (!listing_id || !email || !name) {
    return NextResponse.json({ error: 'listing_id, email, and name are required' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const { data: listing } = await supabase
    .from('iv_therapy_clinics_listings')
    .select('id, name, city, state, slug, is_claimed')
    .eq('id', listing_id)
    .single()

  if (!listing) return NextResponse.json({ error: 'Listing not found' }, { status: 404 })

  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString()

  await supabase.from('iv_therapy_claims').insert({
    listing_id,
    email,
    token,
    expires_at: expiresAt,
    verified: false,
  })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ivtherapyclinicfinder.com'
  const verifyUrl = `${siteUrl}/claim/${listing_id}?token=${token}`

  // Send via Resend API using curl (Python urllib blocked by Cloudflare)
  const emailPayload = JSON.stringify({
    from: `IVTherapyClinicFinder <noreply@ivtherapyclinicfinder.com>`,
    to: [email],
    subject: `Verify your claim: ${listing.name}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <div style="background: #0D2137; padding: 20px 24px; border-radius: 12px 12px 0 0;">
          <span style="color: #00B4D8; font-weight: 900; font-size: 20px;">IV</span>
          <span style="color: white; font-weight: bold; font-size: 14px; margin-left: 4px;">Therapy Clinic Finder</span>
        </div>
        <div style="background: white; border: 1px solid #e5e7eb; border-top: 0; padding: 32px 24px; border-radius: 0 0 12px 12px;">
          <h2 style="color: #0D2137; margin: 0 0 16px;">Hi ${name},</h2>
          <p style="color: #4b5563; margin: 0 0 20px;">
            Click the button below to verify your ownership of <strong>${listing.name}</strong> in ${listing.city}, ${listing.state}.
          </p>
          <a href="${verifyUrl}" style="display: inline-block; background: #F59E0B; color: white; font-weight: 600; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-size: 16px;">
            Verify My Listing
          </a>
          <p style="color: #9ca3af; font-size: 13px; margin: 24px 0 0;">
            This link expires in 72 hours. If you didn&apos;t request this, you can safely ignore it.
          </p>
        </div>
      </div>
    `,
  })

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: emailPayload,
  }).catch(() => null) // Non-blocking — token is already stored

  return NextResponse.json({ success: true })
}
