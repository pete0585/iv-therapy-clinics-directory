import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const supabase = await createServiceClient()
  await supabase.from('iv_therapy_clinics_listings').update({ is_approved: true, is_active: true }).eq('id', id)
  return NextResponse.json({ success: true })
}
