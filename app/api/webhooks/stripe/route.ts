import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const HANDLED_EVENTS = new Set(['checkout.session.completed'])
  if (!HANDLED_EVENTS.has(event.type)) { return NextResponse.json({ received: true }) }

  const supabase = await createServiceClient()

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const listingId = session.metadata?.listing_id
    const tier = session.metadata?.tier

    if (!listingId || !tier) return NextResponse.json({ received: true })

    await supabase
      .from('iv_therapy_listings')
      .update({
        listing_tier: tier,
        listing_tier_rank: tier === 'featured' ? 1 : 2,
        tier_expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
      })
      .eq('id', listingId)

    await supabase.from('iv_therapy_payments').insert({
      listing_id: listingId,
      stripe_session_id: session.id,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: session.subscription as string,
      amount: session.amount_total ?? 0,
      currency: session.currency ?? 'usd',
      tier,
      status: 'active',
    })
  }

  if (event.type === 'customer.subscription.deleted' || event.type === 'customer.subscription.paused') {
    const subscription = event.data.object as Stripe.Subscription
    const listingId = subscription.metadata?.listing_id
    if (listingId) {
      await supabase
        .from('iv_therapy_listings')
        .update({ listing_tier: 'free', listing_tier_rank: 0 })
        .eq('id', listingId)
    }
  }

  if (event.type === 'invoice.payment_failed') {
    const invoice = event.data.object as Stripe.Invoice
    const subId = invoice.subscription as string | undefined
    if (subId) {
      await supabase
        .from('iv_therapy_listings')
        .update({ listing_tier: 'free', listing_tier_rank: 0 })
        .eq('stripe_subscription_id', subId)
    }
  }

  return NextResponse.json({ received: true })
}
