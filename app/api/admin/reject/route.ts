import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { adminAuthorized } from '@/lib/admin-authorization'

export async function POST(req: NextRequest) {
  if (!adminAuthorized(req)) return NextResponse.json({ error: 'Owner sign-in required.' }, { status: 401 })
  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
  const id = body && typeof body === 'object' && 'id' in body ? body.id : null
  if (typeof id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return NextResponse.json({ error: 'Valid id required.' }, { status: 400 })
  const supabase = await createServiceClient()
  const { data, error } = await supabase.from('iv_therapy_clinics_listings').update({ is_approved: false, is_active: false }).eq('id', id).select('id,is_approved,is_active').maybeSingle()
  if (error) return NextResponse.json({ error: 'Update could not be confirmed.' }, { status: 503 })
  if (!data) return NextResponse.json({ error: 'Listing not found.' }, { status: 404 })
  if (data.is_approved !== false || data.is_active !== false) return NextResponse.json({ error: 'Update could not be confirmed.' }, { status: 503 })
  return NextResponse.json({ success: true })
}
