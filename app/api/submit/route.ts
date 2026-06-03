import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const {
    name, address, city, state, zip, phone, website, email,
    description, is_mobile, is_clinic, medical_oversight,
    price_low, price_high, services_offered, booking_url,
  } = body as Record<string, unknown>

  if (!name || !city || !state || !email) {
    return NextResponse.json({ error: 'name, city, state, and email are required' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  // Generate unique slug
  const baseSlug = slugify(`${name as string} ${city as string} ${state as string}`)
  let slug = baseSlug
  let suffix = 0

  while (true) {
    const { data: existing } = await supabase
      .from('iv_therapy_clinics_listings')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()
    if (!existing) break
    suffix++
    slug = `${baseSlug}-${suffix}`
  }

  const { data: listing, error } = await supabase
    .from('iv_therapy_clinics_listings')
    .insert({
      slug,
      name: name as string,
      address: address as string | null,
      city: city as string,
      state: (state as string).toUpperCase(),
      zip: zip as string | null,
      phone: phone as string | null,
      website: website as string | null,
      email: email as string,
      email_source: 'self',
      description: description as string | null,
      is_mobile: Boolean(is_mobile),
      is_clinic: Boolean(is_clinic) || !is_mobile,
      medical_oversight: medical_oversight as string | null,
      price_low: price_low ? Number(price_low) : null,
      price_high: price_high ? Number(price_high) : null,
      services_offered: Array.isArray(services_offered) ? services_offered : [],
      booking_url: booking_url as string | null,
      listing_tier: 'free',
      listing_tier_rank: 0,
      is_active: true,
      is_approved: true,
    })
    .select('id')
    .single()

  if (error || !listing) {
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 })
  }

  // Auto-create claim token
  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString()
  await supabase.from('iv_therapy_claims').insert({
    listing_id: listing.id,
    email: email as string,
    token,
    expires_at: expiresAt,
    verified: false,
  })

  return NextResponse.json({ success: true, listing_id: listing.id })
}
