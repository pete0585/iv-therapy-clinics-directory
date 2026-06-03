import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { listing_id, token } = body as { listing_id?: string; token?: string }
  if (!listing_id || !token) {
    return NextResponse.json({ error: 'listing_id and token required' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const { data: claim } = await supabase
    .from('iv_therapy_claims')
    .select('id, verified, expires_at')
    .eq('listing_id', listing_id)
    .eq('token', token)
    .eq('verified', false)
    .single()

  if (!claim) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
  }

  if (new Date(claim.expires_at) < new Date()) {
    return NextResponse.json({ error: 'Token expired' }, { status: 400 })
  }

  const now = new Date().toISOString()

  await supabase
    .from('iv_therapy_claims')
    .update({ verified: true, verified_at: now })
    .eq('id', claim.id)

  await supabase
    .from('iv_therapy_clinics_listings')
    .update({ is_claimed: true, claimed_at: now })
    .eq('id', listing_id)

  return NextResponse.json({ success: true })
}
