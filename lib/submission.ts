import { z } from 'zod'
import { createHash } from 'node:crypto'
import { TREATMENT_CATEGORIES } from './types'

const text = (n: number) => z.string().trim().max(n).refine(v => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(v))
const optional = (n: number) => text(n).nullish().transform(v => v || null)
const url = optional(500).refine(v => { if (!v) return true; try { const u = new URL(v); return ['http:', 'https:'].includes(u.protocol) && !u.username && !u.password } catch { return false } }, 'Use an http(s) website URL')
const states = 'AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY DC'.split(' ')
export const submissionSchema = z.object({
  name: text(160).pipe(z.string().min(2)), email: text(254).pipe(z.string().email()).transform(v => v.toLowerCase()),
  city: text(100).pipe(z.string().min(2)), state: z.string().refine(v => states.includes(v), 'Choose a valid state'),
  address: optional(200), zip: optional(10).refine(v => !v || /^\d{5}(-\d{4})?$/.test(v)),
  phone: optional(40).refine(v => !v || (/^[+\d().\s\-xX#]{7,40}$/.test(v) && v.replace(/\D/g, '').length >= 7)),
  website: url, booking_url: url, description: optional(1000),
  is_mobile: z.boolean().default(false), is_clinic: z.boolean().default(true),
  medical_oversight: z.enum(['md_supervised', 'np_led', 'rn_administered', 'unknown', '']).nullish().transform(v => v || null),
  price_low: z.number().int().min(0).max(100000).nullish().transform(v => v ?? null),
  price_high: z.number().int().min(0).max(100000).nullish().transform(v => v ?? null),
  services_offered: z.array(z.enum(TREATMENT_CATEGORIES)).max(TREATMENT_CATEGORIES.length).default([]),
  contact_fax: z.string().max(200).optional(),
}).strict().refine(v => v.price_low === null || v.price_high === null || v.price_high >= v.price_low, { path: ['price_high'], message: 'Maximum price must not be below minimum' })

export function buildListingRow(input: z.infer<typeof submissionSchema>) {
  const { contact_fax: _fax, ...fields } = input
  const identity = [input.email, input.name.toLowerCase().replace(/\s+/g, ' '), input.city.toLowerCase().replace(/\s+/g, ' '), input.state]
  const suffix = createHash('sha256').update(JSON.stringify(identity)).digest('hex').slice(0,32)
  const base = `${input.name}-${input.city}-${input.state}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0,90)
  return { ...fields, services_offered: [...new Set(fields.services_offered)].sort(), slug: `${base}-${suffix}`, listing_tier: 'free', listing_tier_rank: 0, is_active: true, is_approved: false, claimed: false, verified: false, email_source: 'self_submission_pending' }
}
export type ListingRow = ReturnType<typeof buildListingRow>
export type SavedRow = Record<string, unknown>
export interface SubmissionStore {
  insert(row: ListingRow): Promise<{ error: null | { code?: string } }>
  read(slug: string): Promise<{ error: unknown; data: SavedRow | null }>
}
const message = 'We could not confirm your submission. Your entries are unchanged. Retry the same submission; it will not create a second listing.'
export async function persistSubmission(store: SubmissionStore, row: ListingRow) {
  const result = await store.insert(row)
  if (result.error && result.error.code !== '23505') return { status: 503, body: { error: message } }
  const saved = await store.read(row.slug)
  if (saved.error || !saved.data) return { status: 503, body: { error: message } }
  // Verify saved values, not only the existence of an id. A changed retry must never overwrite a human edit.
  const matches = Object.entries(row).every(([key, value]) => JSON.stringify(saved.data![key]) === JSON.stringify(value))
  if (!matches) return { status: result.error ? 409 : 503, body: { error: result.error ? 'A submission for this practice already exists with different details. Please use the contact link to request a correction; no changes were made.' : message } }
  return { status: 200, body: { success: true, status: 'pending_review', duplicate: Boolean(result.error) } }
}
