# IV Therapy Clinic Finder

**Domain:** ivtherapyclinicfinder.com  
**Stack:** Next.js 15, Tailwind CSS, Supabase, Stripe, Vercel  
**Database:** Shared Directories Supabase project (`fbuqrnzofktepkzyfmhy`)

---

## Local Development

### Prerequisites
- Node.js 18+
- A Supabase account with the Directories project accessible
- Stripe account with products set up

### Setup

```bash
cd builds/iv-therapy-clinics
npm install
cp .env.example .env.local
# Fill in your env vars in .env.local
npm run dev
```

### Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://fbuqrnzofktepkzyfmhy.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | From Supabase project settings |
| `SUPABASE_SERVICE_ROLE_KEY` | From Supabase project settings (keep secret) |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | From Stripe webhook settings |
| `STRIPE_VERIFIED_PRICE_ID` | Stripe price ID for $99/yr Verified plan |
| `STRIPE_FEATURED_PRICE_ID` | Stripe price ID for $199/yr Featured plan |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `NEXT_PUBLIC_SITE_URL` | `https://www.ivtherapyclinicfinder.com` |
| `ADMIN_PASSWORD` | Password to access /admin |
| `RESEND_API_KEY` | Resend API key for claim verification emails |

---

## Database Setup

Run the migration against the shared Directories Supabase project:

```bash
# Via Supabase CLI
supabase db push --db-url postgresql://postgres:<password>@db.fbuqrnzofktepkzyfmhy.supabase.co:5432/postgres

# Or apply via Supabase Dashboard SQL Editor
# Paste contents of supabase/migrations/001_initial_schema.sql
```

**Tables created:**
- `iv_therapy_listings` — main directory data
- `iv_therapy_claims` — claim verification tokens
- `iv_therapy_payments` — Stripe payment records

---

## Seed Data

```bash
NEXT_PUBLIC_SUPABASE_URL=https://fbuqrnzofktepkzyfmhy.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=<service_role_key> \
npx tsx scripts/seed.ts
```

This seeds 35 sample listings. The data-seeder agent will run full DataForSEO Maps seeding (400-600 listings) at launch.

---

## Vercel Deployment

The project is already linked to a Vercel project. Env vars are set via the bootstrap agent.

```bash
# Deploy via git push (auto-deploy on push to main)
git push origin main

# Or deploy manually
vercel --prod
```

### After deployment:
1. Add Stripe webhook endpoint: `https://www.ivtherapyclinicfinder.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.deleted`, `invoice.payment_failed`
2. Configure Resend inbound webhook: `https://www.ivtherapyclinicfinder.com/api/inbound-email`
   - **Use www subdomain** — Resend doesn't follow 307 redirects from non-www
3. Submit sitemap to Google Search Console: `https://www.ivtherapyclinicfinder.com/sitemap.xml`

---

## URL Structure

```
/                                              — Homepage
/iv-therapy-clinics                            — Browse all (with filter)
/iv-therapy-clinics/[state]                    — State page (e.g. /iv-therapy-clinics/florida)
/iv-therapy-clinics/[state]/[city]             — City page (e.g. /iv-therapy-clinics/florida/miami)
/iv-therapy-clinics/[state]/[city]/[slug]      — Individual clinic listing
/iv-therapy/[treatment]                        — Treatment-specific pages (myers-cocktail, nad-plus-therapy, etc.)
/submit                                        — Add a clinic
/claim/[id]                                    — Claim a listing
/admin                                         — Admin panel (password protected)
```

---

## Revenue Model

- **Free:** Name, city, phone, up to 3 treatment tags
- **Verified ($99/yr):** Full menu, pricing, photos, verified badge, analytics, priority placement
- **Featured ($199/yr):** Top 3 placement, highlighted card, promo offer field, monthly reports

---

## Architecture Notes

- All pages use Next.js App Router with server components
- Data fetching uses `createStaticClient()` (service role, no cookie context needed)
- Admin panel uses simple password-based auth via httpOnly cookie
- Stripe webhooks are signature-verified before processing
- Inbound email route reads Svix envelope format (`payload.data` when `payload.type === 'email.received'`)
- `/api/upgrade` is the canonical Stripe checkout entry point (also wired from listing detail page form)
