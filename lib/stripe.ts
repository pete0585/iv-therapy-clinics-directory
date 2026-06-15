import Stripe from 'stripe'

// Build-time fallback: placeholder keeps Stripe from throwing during `next build`
// when env vars aren't present in CI. Real key is always set in Vercel at runtime.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'placeholder_key_for_build', {
  apiVersion: '2025-02-24.acacia',
})
