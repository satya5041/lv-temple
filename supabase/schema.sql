-- ============================================================
-- Lakshmi Venkateswara Temple (LV Temple) - Supabase Schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE user_role AS ENUM ('devotee', 'volunteer', 'priest', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE registration_status AS ENUM ('registered', 'waitlisted', 'cancelled', 'attended');
CREATE TYPE volunteer_status AS ENUM ('active', 'inactive', 'pending');
CREATE TYPE payment_method AS ENUM ('credit_card', 'debit_card', 'ach', 'zelle', 'venmo', 'cash', 'check', 'other');

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================

CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL UNIQUE,
  full_name   TEXT,
  first_name  TEXT,
  last_name   TEXT,
  phone       TEXT,
  role        user_role NOT NULL DEFAULT 'devotee',
  gotra       TEXT,                         -- family lineage (optional)
  nakshatra   TEXT,                         -- birth star (optional)
  avatar_url  TEXT,
  address     TEXT,
  city        TEXT,
  state       TEXT,
  zip         TEXT,
  membership_tier TEXT DEFAULT NULL,        -- NULL, 'devotee', 'silver', 'gold'
  membership_expires_at TIMESTAMPTZ,
  newsletter_subscribed BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- EVENTS
-- ============================================================

CREATE TABLE events (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title                 TEXT NOT NULL,
  description           TEXT,
  category              TEXT NOT NULL,       -- Festival, Pooja, Cultural, Community Service
  event_date            DATE NOT NULL,
  start_time            TIME NOT NULL,
  end_time              TIME,
  location              TEXT NOT NULL,
  capacity              INTEGER DEFAULT 100,
  fee                   DECIMAL(10,2) DEFAULT 0,
  sponsorship_available BOOLEAN DEFAULT FALSE,
  image_url             TEXT,
  tags                  TEXT[],
  is_active             BOOLEAN DEFAULT TRUE,
  created_by            UUID REFERENCES profiles(id),
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- View: events with registration counts
CREATE VIEW events_with_counts AS
  SELECT
    e.*,
    COUNT(r.id) FILTER (WHERE r.status = 'registered') AS registered_count
  FROM events e
  LEFT JOIN registrations r ON r.event_id = e.id
  GROUP BY e.id;

-- ============================================================
-- REGISTRATIONS (event sign-ups)
-- ============================================================

CREATE TABLE registrations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id        UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status          registration_status NOT NULL DEFAULT 'registered',
  qr_code         TEXT UNIQUE,              -- QR code token for check-in
  guest_count     INTEGER DEFAULT 1,
  special_notes   TEXT,
  checked_in_at   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(event_id, user_id)                -- one registration per user per event
);

-- Auto-generate QR code on insert
CREATE OR REPLACE FUNCTION generate_qr_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.qr_code IS NULL THEN
    NEW.qr_code = 'QR-' || UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 8));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER registrations_qr_code
  BEFORE INSERT ON registrations
  FOR EACH ROW EXECUTE FUNCTION generate_qr_code();

-- ============================================================
-- SERVICES (pooja types)
-- ============================================================

CREATE TABLE services (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug                TEXT UNIQUE NOT NULL,  -- e.g., 'archana', 'abhishekam'
  name                TEXT NOT NULL,
  description         TEXT,
  duration            TEXT,                  -- e.g., '45–60 min'
  suggested_donation  DECIMAL(10,2),
  availability        TEXT,                  -- e.g., 'Daily 7AM–12PM'
  image_url           TEXT,
  is_active           BOOLEAN DEFAULT TRUE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- BOOKINGS (service reservations)
-- ============================================================

CREATE TABLE bookings (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id          UUID NOT NULL REFERENCES services(id),
  user_id             UUID NOT NULL REFERENCES profiles(id),
  booking_date        DATE NOT NULL,
  booking_time        TIME,
  special_intentions  TEXT,                  -- what the devotee is praying for
  devotee_name        TEXT,                  -- name to be recited (may differ from account)
  nakshatra           TEXT,                  -- for archana
  gotra               TEXT,                  -- for archana
  amount_paid         DECIMAL(10,2),
  payment_method      payment_method,
  status              booking_status NOT NULL DEFAULT 'pending',
  qr_code             TEXT UNIQUE,
  notes               TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER bookings_qr_code
  BEFORE INSERT ON bookings
  FOR EACH ROW EXECUTE FUNCTION generate_qr_code();

-- ============================================================
-- CAMPAIGNS (donation campaigns)
-- ============================================================

CREATE TABLE campaigns (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT NOT NULL,
  description   TEXT,
  goal_amount   DECIMAL(12,2) NOT NULL,
  raised_amount DECIMAL(12,2) DEFAULT 0,
  category      TEXT,                        -- Infrastructure, Operations, Community, Education
  is_active     BOOLEAN DEFAULT TRUE,
  is_urgent     BOOLEAN DEFAULT FALSE,
  image_url     TEXT,
  end_date      DATE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- DONATIONS
-- ============================================================

CREATE TABLE donations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES profiles(id),        -- NULL for anonymous donations
  campaign_id     UUID REFERENCES campaigns(id),       -- NULL for general fund
  amount          DECIMAL(10,2) NOT NULL CHECK (amount > 0),
  payment_method  payment_method,
  payment_ref     TEXT,                                -- Stripe/Zelle transaction ID
  donor_name      TEXT,                               -- for anonymous or in-honor-of donations
  donor_email     TEXT,
  in_honor_of     TEXT,
  receipt_number  TEXT UNIQUE,
  receipt_sent    BOOLEAN DEFAULT FALSE,
  receipt_sent_at TIMESTAMPTZ,
  tax_year        INTEGER,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-generate receipt number
CREATE OR REPLACE FUNCTION generate_receipt_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.receipt_number IS NULL THEN
    NEW.receipt_number = 'RCP-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('receipt_seq')::TEXT, 6, '0');
    NEW.tax_year = EXTRACT(YEAR FROM NOW())::INTEGER;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE IF NOT EXISTS receipt_seq START 1;

CREATE TRIGGER donations_receipt_number
  BEFORE INSERT ON donations
  FOR EACH ROW EXECUTE FUNCTION generate_receipt_number();

-- Auto-update campaign raised_amount
CREATE OR REPLACE FUNCTION update_campaign_raised()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.campaign_id IS NOT NULL THEN
    UPDATE campaigns
    SET raised_amount = (
      SELECT COALESCE(SUM(amount), 0)
      FROM donations
      WHERE campaign_id = NEW.campaign_id
    )
    WHERE id = NEW.campaign_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER donations_update_campaign
  AFTER INSERT OR UPDATE OR DELETE ON donations
  FOR EACH ROW EXECUTE FUNCTION update_campaign_raised();

-- ============================================================
-- VOLUNTEER GROUPS
-- ============================================================

CREATE TABLE volunteer_groups (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        TEXT UNIQUE NOT NULL,          -- e.g., 'kitchen', 'it'
  name        TEXT NOT NULL,
  description TEXT,
  icon        TEXT,
  color       TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- VOLUNTEERS
-- ============================================================

CREATE TABLE volunteers (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  group_id        UUID REFERENCES volunteer_groups(id),
  status          volunteer_status NOT NULL DEFAULT 'pending',
  availability    TEXT,                       -- 'weekends', 'weekdays', 'both', 'events'
  skills          TEXT,
  notes           TEXT,
  approved_by     UUID REFERENCES profiles(id),
  approved_at     TIMESTAMPTZ,
  joined_at       TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, group_id)
);

-- ============================================================
-- ANNOUNCEMENTS
-- ============================================================

CREATE TABLE announcements (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  body        TEXT NOT NULL,
  category    TEXT DEFAULT 'general',
  is_pinned   BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at  TIMESTAMPTZ,
  created_by  UUID REFERENCES profiles(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Helper function: check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- PROFILES policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE
  USING (is_admin());

-- EVENTS policies (public read)
CREATE POLICY "Anyone can view active events"
  ON events FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage events"
  ON events FOR ALL
  USING (is_admin());

-- REGISTRATIONS policies
CREATE POLICY "Users can view their own registrations"
  ON registrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can register for events"
  ON registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can cancel their own registrations"
  ON registrations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all registrations"
  ON registrations FOR ALL
  USING (is_admin());

-- SERVICES policies (public read)
CREATE POLICY "Anyone can view active services"
  ON services FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage services"
  ON services FOR ALL
  USING (is_admin());

-- BOOKINGS policies
CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
  ON bookings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all bookings"
  ON bookings FOR ALL
  USING (is_admin());

-- CAMPAIGNS policies (public read)
CREATE POLICY "Anyone can view active campaigns"
  ON campaigns FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage campaigns"
  ON campaigns FOR ALL
  USING (is_admin());

-- DONATIONS policies
CREATE POLICY "Users can view their own donations"
  ON donations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create donations"
  ON donations FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Admins can view all donations"
  ON donations FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can manage donations"
  ON donations FOR ALL
  USING (is_admin());

-- VOLUNTEER_GROUPS policies (public read)
CREATE POLICY "Anyone can view volunteer groups"
  ON volunteer_groups FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage volunteer groups"
  ON volunteer_groups FOR ALL
  USING (is_admin());

-- VOLUNTEERS policies
CREATE POLICY "Users can view their own volunteer record"
  ON volunteers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can apply to volunteer"
  ON volunteers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all volunteers"
  ON volunteers FOR ALL
  USING (is_admin());

-- ANNOUNCEMENTS policies (public read)
CREATE POLICY "Anyone can view published announcements"
  ON announcements FOR SELECT
  USING (published_at <= NOW() AND (expires_at IS NULL OR expires_at > NOW()));

CREATE POLICY "Admins can manage announcements"
  ON announcements FOR ALL
  USING (is_admin());

-- ============================================================
-- INDEXES for performance
-- ============================================================

CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_registrations_event_id ON registrations(event_id);
CREATE INDEX idx_registrations_user_id ON registrations(user_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_donations_user_id ON donations(user_id);
CREATE INDEX idx_donations_campaign_id ON donations(campaign_id);
CREATE INDEX idx_donations_created_at ON donations(created_at);
CREATE INDEX idx_volunteers_user_id ON volunteers(user_id);
CREATE INDEX idx_volunteers_group_id ON volunteers(group_id);

-- ============================================================
-- SEED DATA (volunteer groups)
-- ============================================================

INSERT INTO volunteer_groups (slug, name, description, icon, color) VALUES
  ('kitchen', 'Kitchen & Prasadam', 'Help prepare and serve prasadam for weekly poojas and events', 'ChefHat', 'orange'),
  ('pooja-prep', 'Pooja Preparation', 'Arrange flowers and materials for daily and special rituals', 'Flower2', 'purple'),
  ('priest-assist', 'Priest Assistance', 'Support priests during major poojas and festivals', 'BookOpen', 'blue'),
  ('prasadam-stock', 'Prasadam Stock Mgmt', 'Manage inventory of pooja materials and supplies', 'Package', 'green'),
  ('events', 'Events & Hospitality', 'Organize and manage temple events and guest hospitality', 'Users', 'yellow'),
  ('it', 'IT & Media', 'Manage live streams, website, social media, and AV equipment', 'Monitor', 'gray');

-- ============================================================
-- SEED DATA (services)
-- ============================================================

INSERT INTO services (slug, name, description, duration, suggested_donation, availability) VALUES
  ('archana', 'Archana', 'Personal flower offering to the deity with recitation of 108 names. Available for all presiding deities.', '15–20 min', 21.00, 'Daily 8AM – 8PM'),
  ('abhishekam', 'Abhishekam', 'Sacred bath ceremony for the deity with milk, curd, honey, and other sacred substances accompanied by Vedic chanting.', '45–60 min', 108.00, 'Daily 7AM – 12PM'),
  ('homam', 'Homam (Havan)', 'Sacred fire ritual conducted for specific blessings — health, prosperity, marriage, children.', '2–3 hours', 501.00, 'Weekends & Special Days'),
  ('wedding', 'Hindu Wedding Ceremony', 'Complete Vedic wedding ceremony officiated by our priests. Includes pre-booking consultation and all rituals.', '3–4 hours', 1001.00, 'By Appointment'),
  ('gruhapravesam', 'Gruhapravesam (Home Blessing)', 'Vedic housewarming ceremony to bless your new home.', '2–3 hours', 351.00, 'By Appointment'),
  ('epuja', 'E-Puja (Virtual Archana)', 'Our priests perform archana on your behalf and send you a video recording and prasadam by mail.', 'Online', 51.00, 'Daily');
