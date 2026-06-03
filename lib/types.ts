export type ListingTier = 'free' | 'verified' | 'featured'

export type MedicalOversight = 'md_supervised' | 'np_led' | 'rn_administered' | 'unknown'

export interface IvTherapyListing {
  id: string
  slug: string
  name: string
  address?: string | null
  city: string
  state: string
  zip?: string | null
  phone?: string | null
  website?: string | null
  email?: string | null
  email_source?: string | null
  description?: string | null
  photos?: string[] | null
  is_mobile: boolean
  is_clinic: boolean
  is_franchise: boolean
  franchise_name?: string | null
  medical_oversight?: MedicalOversight | null
  services_offered?: string[] | null
  price_low?: number | null
  price_high?: number | null
  booking_url?: string | null
  hours_text?: string | null
  listing_tier: ListingTier
  listing_tier_rank: number
  tier_expires_at?: string | null
  is_active: boolean
  is_approved: boolean
  do_not_email: boolean
  stripe_customer_id?: string | null
  stripe_subscription_id?: string | null
  is_claimed: boolean
  claimed_at?: string | null
  outreach_step: number
  outreach_e1_sent_at?: string | null
  outreach_e2_sent_at?: string | null
  outreach_e3_sent_at?: string | null
  created_at: string
  updated_at: string
}

export interface IvTherapyClaim {
  id: string
  listing_id: string
  email: string
  token: string
  verified: boolean
  verified_at?: string | null
  created_at: string
  expires_at: string
  nudge_sent_at?: string | null
}

export interface IvTherapyPayment {
  id: string
  listing_id: string
  stripe_session_id?: string | null
  stripe_customer_id?: string | null
  stripe_subscription_id?: string | null
  amount: number
  currency: string
  tier: string
  status: string
  created_at: string
}

export interface BrowseFilters {
  q?: string
  state?: string
  city?: string
  treatment?: string
  mobile?: boolean
  franchise?: boolean
  tier?: string
  page?: number
}

export const TREATMENT_CATEGORIES = [
  'Myers Cocktail',
  'NAD+ Therapy',
  'Vitamin C',
  'Glutathione',
  'Hydration / Saline',
  'Hangover Recovery',
  'Immune Boost',
  'Athletic Recovery',
  'Energy Boost',
  'Weight Loss',
  'Beauty / Skin',
  'Migraine Relief',
  'Detox',
  'Custom / Personalized',
] as const

export type TreatmentCategory = (typeof TREATMENT_CATEGORIES)[number]

export const TREATMENT_SLUGS: Record<string, string> = {
  'myers-cocktail': 'Myers Cocktail',
  'nad-plus-therapy': 'NAD+ Therapy',
  'vitamin-c': 'Vitamin C',
  'glutathione': 'Glutathione',
  'hydration-saline': 'Hydration / Saline',
  'hangover-recovery': 'Hangover Recovery',
  'immune-boost': 'Immune Boost',
  'athletic-recovery': 'Athletic Recovery',
  'energy-boost': 'Energy Boost',
  'weight-loss': 'Weight Loss',
  'beauty-skin': 'Beauty / Skin',
  'migraine-relief': 'Migraine Relief',
  'detox': 'Detox',
  'custom-personalized': 'Custom / Personalized',
}

export const TREATMENT_DESCRIPTIONS: Record<string, string> = {
  'myers-cocktail': 'The gold standard IV drip — magnesium, B vitamins, vitamin C, and calcium. Boosts energy, reduces fatigue, and supports immune function.',
  'nad-plus-therapy': 'Nicotinamide adenine dinucleotide (NAD+) IV therapy for cellular energy, cognitive clarity, and longevity. Popular with biohackers.',
  'vitamin-c': 'High-dose vitamin C IV for immune support, antioxidant protection, and skin health.',
  'glutathione': 'The "master antioxidant" — supports detoxification, skin brightness, and cellular protection.',
  'hydration-saline': 'Rapid rehydration with IV saline. Fast recovery from dehydration, illness, or athletic exertion.',
  'hangover-recovery': 'Electrolytes, B vitamins, anti-nausea medication, and hydration to eliminate hangover symptoms fast.',
  'immune-boost': 'High-dose vitamin C, zinc, and immune-supporting nutrients to fight illness or boost immune defenses.',
  'athletic-recovery': 'Amino acids, electrolytes, and anti-inflammatory nutrients to accelerate muscle recovery post-workout.',
  'energy-boost': 'B-complex vitamins, magnesium, and energy-supporting nutrients for sustained mental and physical energy.',
  'weight-loss': 'Lipotropic compounds, B12, and metabolism-supporting nutrients to complement weight loss efforts.',
  'beauty-skin': 'Glutathione, biotin, and antioxidants for skin brightness, hair health, and anti-aging benefits.',
  'migraine-relief': 'Magnesium, B vitamins, and anti-inflammatory compounds for rapid migraine and headache relief.',
  'detox': 'Antioxidants and liver-supporting nutrients to accelerate detoxification and clear toxins.',
  'custom-personalized': 'Customized IV formulations tailored to your specific health goals and bloodwork.',
}
