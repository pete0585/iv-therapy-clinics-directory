-- IV Therapy Clinic Finder — Initial Schema
-- Shared Directories Supabase project: fbuqrnzofktepkzyfmhy

-- ============================================================
-- iv_therapy_listings
-- ============================================================
CREATE TABLE IF NOT EXISTS iv_therapy_listings (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                    varchar UNIQUE NOT NULL,
  business_name           varchar NOT NULL,
  address                 varchar,
  city                    varchar NOT NULL,
  state                   varchar(2) NOT NULL,
  zip                     varchar,
  phone                   varchar,
  website                 varchar,
  email                   varchar,
  email_source            varchar,         -- 'dataforseo', 'manual', 'self', 'scraped'
  description             text,
  photos                  text[],
  -- Service type flags
  is_mobile               boolean NOT NULL DEFAULT false,
  is_clinic               boolean NOT NULL DEFAULT true,
  is_franchise            boolean NOT NULL DEFAULT false,
  franchise_name          varchar,         -- 'Prime IV Hydration', 'Restore Hyper Wellness', etc.
  -- Medical oversight
  medical_oversight       varchar,         -- 'md_supervised', 'np_led', 'rn_administered', 'unknown'
  -- Treatments offered (standardized list)
  services_offered        text[],
  -- Pricing
  price_low               integer,         -- per session USD
  price_high              integer,
  -- Booking
  booking_url             varchar,
  hours_text              text,
  -- Listing tier
  listing_tier            varchar NOT NULL DEFAULT 'free',  -- 'free', 'verified', 'featured'
  listing_tier_rank       integer NOT NULL DEFAULT 0,
  tier_expires_at         timestamptz,
  -- Status
  is_active               boolean NOT NULL DEFAULT true,
  is_approved             boolean NOT NULL DEFAULT true,
  do_not_email            boolean NOT NULL DEFAULT false,
  -- Stripe
  stripe_customer_id      varchar,
  stripe_subscription_id  varchar,
  -- Claim state
  is_claimed              boolean NOT NULL DEFAULT false,
  claimed_at              timestamptz,
  -- Outreach
  outreach_step           integer NOT NULL DEFAULT 0,
  outreach_e1_sent_at     timestamptz,
  outreach_e2_sent_at     timestamptz,
  outreach_e3_sent_at     timestamptz,
  -- Timestamps
  created_at              timestamptz NOT NULL DEFAULT now(),
  updated_at              timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS iv_therapy_listings_city ON iv_therapy_listings(city);
CREATE INDEX IF NOT EXISTS iv_therapy_listings_state ON iv_therapy_listings(state);
CREATE INDEX IF NOT EXISTS iv_therapy_listings_slug ON iv_therapy_listings(slug);
CREATE INDEX IF NOT EXISTS iv_therapy_listings_tier ON iv_therapy_listings(listing_tier);
CREATE INDEX IF NOT EXISTS iv_therapy_listings_mobile ON iv_therapy_listings(is_mobile) WHERE is_mobile = true;
CREATE INDEX IF NOT EXISTS iv_therapy_listings_franchise ON iv_therapy_listings(is_franchise, franchise_name);
CREATE INDEX IF NOT EXISTS iv_therapy_listings_city_state ON iv_therapy_listings(city, state);
CREATE INDEX IF NOT EXISTS iv_therapy_listings_outreach ON iv_therapy_listings(outreach_step, outreach_e1_sent_at) WHERE is_claimed = false AND do_not_email = false;

-- Full text search
ALTER TABLE iv_therapy_listings ADD COLUMN IF NOT EXISTS search_vector tsvector;
CREATE INDEX IF NOT EXISTS iv_therapy_listings_search ON iv_therapy_listings USING GIN(search_vector);

CREATE OR REPLACE FUNCTION iv_therapy_listings_tsvector_trigger()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.business_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.city, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.state, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(array_to_string(NEW.services_offered, ' '), '')), 'C') ||
    setweight(to_tsvector('english', coalesce(NEW.description, '')), 'D');
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS iv_therapy_listings_tsvector ON iv_therapy_listings;
CREATE TRIGGER iv_therapy_listings_tsvector
  BEFORE INSERT OR UPDATE ON iv_therapy_listings
  FOR EACH ROW EXECUTE FUNCTION iv_therapy_listings_tsvector_trigger();

CREATE OR REPLACE FUNCTION update_iv_therapy_listings_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS iv_therapy_listings_updated_at ON iv_therapy_listings;
CREATE TRIGGER iv_therapy_listings_updated_at
  BEFORE UPDATE ON iv_therapy_listings
  FOR EACH ROW EXECUTE FUNCTION update_iv_therapy_listings_updated_at();

-- ============================================================
-- iv_therapy_claims
-- ============================================================
CREATE TABLE IF NOT EXISTS iv_therapy_claims (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id    uuid NOT NULL REFERENCES iv_therapy_listings(id) ON DELETE CASCADE,
  email         text NOT NULL,
  token         text UNIQUE NOT NULL,
  verified      boolean NOT NULL DEFAULT false,
  verified_at   timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now(),
  expires_at    timestamptz NOT NULL,
  nudge_sent_at timestamptz
);

CREATE INDEX IF NOT EXISTS iv_therapy_claims_listing ON iv_therapy_claims(listing_id);
CREATE INDEX IF NOT EXISTS iv_therapy_claims_token ON iv_therapy_claims(token);

-- ============================================================
-- iv_therapy_payments
-- ============================================================
CREATE TABLE IF NOT EXISTS iv_therapy_payments (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id              uuid NOT NULL REFERENCES iv_therapy_listings(id) ON DELETE CASCADE,
  stripe_session_id       varchar,
  stripe_customer_id      varchar,
  stripe_subscription_id  varchar,
  amount                  integer NOT NULL DEFAULT 0,
  currency                varchar NOT NULL DEFAULT 'usd',
  tier                    varchar NOT NULL,
  status                  varchar NOT NULL,
  created_at              timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS iv_therapy_payments_listing ON iv_therapy_payments(listing_id);

-- ============================================================
-- RLS Policies
-- ============================================================
ALTER TABLE iv_therapy_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE iv_therapy_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE iv_therapy_payments ENABLE ROW LEVEL SECURITY;

-- Public read for active, approved listings
CREATE POLICY "iv_therapy_listings_public_read"
  ON iv_therapy_listings FOR SELECT
  USING (is_active = true AND is_approved = true);

CREATE POLICY "iv_therapy_listings_service_write"
  ON iv_therapy_listings FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "iv_therapy_claims_service"
  ON iv_therapy_claims FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "iv_therapy_payments_service"
  ON iv_therapy_payments FOR ALL
  USING (true)
  WITH CHECK (true);

-- Grants
GRANT ALL ON iv_therapy_listings TO service_role, anon, authenticated;
GRANT ALL ON iv_therapy_claims TO service_role, anon, authenticated;
GRANT ALL ON iv_therapy_payments TO service_role, anon, authenticated;
