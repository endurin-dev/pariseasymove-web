-- ================================================================
--  Paris Easy Move — Full Schema
--  Run: psql -U parisadmin -d pariseasymove -f schema.sql
-- ================================================================

-- Drop all tables if re-running (order matters due to foreign keys)
DROP TABLE IF EXISTS bookings             CASCADE;
DROP TABLE IF EXISTS rates               CASCADE;
DROP TABLE IF EXISTS locations           CASCADE;
DROP TABLE IF EXISTS location_categories CASCADE;
DROP TABLE IF EXISTS vehicles            CASCADE;
DROP TABLE IF EXISTS features            CASCADE;

-- ── 1. Location Categories ────────────────────────────────────
CREATE TABLE location_categories (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  icon       TEXT NOT NULL DEFAULT '📍',
  sort_order INT  NOT NULL DEFAULT 0,
  active     BOOLEAN NOT NULL DEFAULT true
);

-- ── 2. Locations ──────────────────────────────────────────────
CREATE TABLE locations (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  category_id TEXT REFERENCES location_categories(id) ON DELETE SET NULL,
  active      BOOLEAN NOT NULL DEFAULT true
);

-- ── 3. Vehicles ───────────────────────────────────────────────
CREATE TABLE vehicles (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  model           TEXT NOT NULL DEFAULT '',
  max_passengers  INT  NOT NULL DEFAULT 4,
  max_luggage     INT  NOT NULL DEFAULT 4,
  img             TEXT NOT NULL DEFAULT '/images/car.png',
  price           INT  NOT NULL DEFAULT 80,
  tag             TEXT NOT NULL DEFAULT '',
  special         TEXT NOT NULL DEFAULT '',
  active          BOOLEAN NOT NULL DEFAULT true,
  sort_order      INT  NOT NULL DEFAULT 0
);

-- ── 4. Features ───────────────────────────────────────────────
CREATE TABLE features (
  id         TEXT PRIMARY KEY,
  text       TEXT NOT NULL,
  active     BOOLEAN NOT NULL DEFAULT true,
  sort_order INT  NOT NULL DEFAULT 0
);

-- ── 5. Rates ──────────────────────────────────────────────────
CREATE TABLE rates (
  id          TEXT PRIMARY KEY,
  from_loc_id TEXT NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  to_loc_id   TEXT NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  vehicle_id  TEXT NOT NULL REFERENCES vehicles(id)  ON DELETE CASCADE,
  price       INT,
  on_demand   BOOLEAN NOT NULL DEFAULT false,
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(from_loc_id, to_loc_id, vehicle_id)
);

CREATE INDEX IF NOT EXISTS idx_rates_from    ON rates(from_loc_id);
CREATE INDEX IF NOT EXISTS idx_rates_to      ON rates(to_loc_id);
CREATE INDEX IF NOT EXISTS idx_rates_vehicle ON rates(vehicle_id);

-- ── 6. Bookings ───────────────────────────────────────────────
CREATE TABLE bookings (
  id           TEXT PRIMARY KEY,
  from_loc_id  TEXT REFERENCES locations(id) ON DELETE SET NULL,
  to_loc_id    TEXT REFERENCES locations(id) ON DELETE SET NULL,
  date         TEXT NOT NULL,
  time         TEXT NOT NULL,
  passengers   INT  NOT NULL DEFAULT 1,
  kids         INT  NOT NULL DEFAULT 0,
  bags         INT  NOT NULL DEFAULT 1,
  vehicle_id   TEXT REFERENCES vehicles(id) ON DELETE SET NULL,
  name         TEXT NOT NULL,
  country      TEXT NOT NULL DEFAULT '',
  whatsapp     TEXT NOT NULL DEFAULT '',
  email        TEXT NOT NULL DEFAULT '',
  notes        TEXT NOT NULL DEFAULT '',
  status       TEXT NOT NULL DEFAULT 'new'
                CHECK (status IN ('new','confirmed','cancelled')),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_status     ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);

-- ── Grant permissions ─────────────────────────────────────────
GRANT ALL ON ALL TABLES    IN SCHEMA public TO parisadmin;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO parisadmin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES    TO parisadmin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO parisadmin;

-- ================================================================
--  SEED DATA
-- ================================================================

-- Location Categories
INSERT INTO location_categories (id, name, icon, sort_order, active) VALUES
  ('cat1', 'Airport',    '✈️',  1, true),
  ('cat2', 'City',       '🏙️', 2, true),
  ('cat3', 'Attraction', '🎡', 3, true),
  ('cat4', 'Hotel',      '🏨', 4, true),
  ('cat5', 'Station',    '🚉', 5, true);

-- Locations
INSERT INTO locations (id, name, category_id, active) VALUES
  ('l1',  'Charles de Gaulle (CDG)',      'cat1', true),
  ('l2',  'Orly Airport',                 'cat1', true),
  ('l3',  'Beauvais–Tillé Airport',       'cat1', true),
  ('l4',  'Paris City Centre',            'cat2', true),
  ('l5',  'Disneyland Paris',             'cat3', true),
  ('l6',  'Versailles Palace',            'cat3', true),
  ('l7',  'Montmartre',                   'cat2', true),
  ('l8',  'Eiffel Tower Area',            'cat2', true),
  ('l9',  'Paris Gares (Train Stations)', 'cat5', true),
  ('l10', 'Paris Hotels & Apartments',    'cat4', true),
  ('l11', 'Parc Astérix',                 'cat3', true);

-- Vehicles
INSERT INTO vehicles (id, name, model, max_passengers, max_luggage, img, price, tag, special, active, sort_order) VALUES
  ('sedan',   'BUSINESS CLASS CAR', 'Mercedes-Benz E-Class or similar',   3,  2,  '/images/car.png', 80,  'Most Popular',    '',                                                  true, 1),
  ('van',     'BUSINESS CLASS VAN', 'Mercedes-Benz V-Class or similar',   8,  8,  '/images/car.png', 80,  'Best for Groups', 'Can accommodate your stroller',                     true, 2),
  ('suv',     'LUXURY SUV',         'Mercedes-Benz GLE or similar',       5,  5,  '/images/car.png', 110, 'Premium',         '',                                                  true, 3),
  ('minibus', 'MINIBUS',            'Mercedes-Benz Sprinter or similar',  16, 16, '/images/car.png', 150, 'Large Groups',    'Can accommodate multiple strollers & wheelchairs',  true, 4);

-- Features
INSERT INTO features (id, text, active, sort_order) VALUES
  ('f1', 'Meet & Greet included',       true, 1),
  ('f2', 'Door-to-door',                true, 2),
  ('f3', 'Porter service',              true, 3),
  ('f4', 'Free child seats & boosters', true, 4),
  ('f5', 'Flight tracking included',    true, 5),
  ('f6', 'Fixed price guaranteed',      true, 6);

-- Rates (from_loc_id, to_loc_id, vehicle_id, price)
INSERT INTO rates (id, from_loc_id, to_loc_id, vehicle_id, price, on_demand, active) VALUES
  -- CDG → Paris Hotels
  ('r_l1_l10_sedan',   'l1','l10','sedan',    80,  false, true),
  ('r_l1_l10_van',     'l1','l10','van',       95,  false, true),
  ('r_l1_l10_suv',     'l1','l10','suv',      110,  false, true),
  ('r_l1_l10_minibus', 'l1','l10','minibus',  150,  false, true),
  -- CDG → Paris Gares
  ('r_l1_l9_sedan',    'l1','l9','sedan',      80,  false, true),
  ('r_l1_l9_van',      'l1','l9','van',        95,  false, true),
  ('r_l1_l9_suv',      'l1','l9','suv',       110,  false, true),
  ('r_l1_l9_minibus',  'l1','l9','minibus',   150,  false, true),
  -- CDG → Orly
  ('r_l1_l2_sedan',    'l1','l2','sedan',     100,  false, true),
  ('r_l1_l2_van',      'l1','l2','van',       120,  false, true),
  ('r_l1_l2_suv',      'l1','l2','suv',       135,  false, true),
  ('r_l1_l2_minibus',  'l1','l2','minibus',   185,  false, true),
  -- CDG → Disney
  ('r_l1_l5_sedan',    'l1','l5','sedan',      70,  false, true),
  ('r_l1_l5_van',      'l1','l5','van',        90,  false, true),
  ('r_l1_l5_suv',      'l1','l5','suv',       100,  false, true),
  ('r_l1_l5_minibus',  'l1','l5','minibus',   150,  false, true),
  -- CDG → Beauvais
  ('r_l1_l3_sedan',    'l1','l3','sedan',     140,  false, true),
  ('r_l1_l3_van',      'l1','l3','van',       165,  false, true),
  ('r_l1_l3_suv',      'l1','l3','suv',       190,  false, true),
  ('r_l1_l3_minibus',  'l1','l3','minibus',   260,  false, true),
  -- CDG → Parc Asterix
  ('r_l1_l11_sedan',   'l1','l11','sedan',     80,  false, true),
  ('r_l1_l11_van',     'l1','l11','van',        95,  false, true),
  ('r_l1_l11_suv',     'l1','l11','suv',       110,  false, true),
  ('r_l1_l11_minibus', 'l1','l11','minibus',   150,  false, true),
  -- Orly → CDG
  ('r_l2_l1_sedan',    'l2','l1','sedan',     100,  false, true),
  ('r_l2_l1_van',      'l2','l1','van',       120,  false, true),
  ('r_l2_l1_suv',      'l2','l1','suv',       135,  false, true),
  ('r_l2_l1_minibus',  'l2','l1','minibus',   185,  false, true),
  -- Orly → Paris Hotels
  ('r_l2_l10_sedan',   'l2','l10','sedan',     75,  false, true),
  ('r_l2_l10_van',     'l2','l10','van',        90,  false, true),
  ('r_l2_l10_suv',     'l2','l10','suv',       100,  false, true),
  ('r_l2_l10_minibus', 'l2','l10','minibus',   140,  false, true),
  -- Orly → Paris Gares
  ('r_l2_l9_sedan',    'l2','l9','sedan',      75,  false, true),
  ('r_l2_l9_van',      'l2','l9','van',         90,  false, true),
  ('r_l2_l9_suv',      'l2','l9','suv',        100,  false, true),
  ('r_l2_l9_minibus',  'l2','l9','minibus',    140,  false, true),
  -- Orly → Disney
  ('r_l2_l5_sedan',    'l2','l5','sedan',      75,  false, true),
  ('r_l2_l5_van',      'l2','l5','van',         90,  false, true),
  ('r_l2_l5_suv',      'l2','l5','suv',        105,  false, true),
  ('r_l2_l5_minibus',  'l2','l5','minibus',    155,  false, true),
  -- Orly → Beauvais
  ('r_l2_l3_sedan',    'l2','l3','sedan',     170,  false, true),
  ('r_l2_l3_van',      'l2','l3','van',       200,  false, true),
  ('r_l2_l3_suv',      'l2','l3','suv',       230,  false, true),
  ('r_l2_l3_minibus',  'l2','l3','minibus',   315,  false, true),
  -- Orly → Parc Asterix
  ('r_l2_l11_sedan',   'l2','l11','sedan',    100,  false, true),
  ('r_l2_l11_van',     'l2','l11','van',       120,  false, true),
  ('r_l2_l11_suv',     'l2','l11','suv',       135,  false, true),
  ('r_l2_l11_minibus', 'l2','l11','minibus',   185,  false, true),
  -- Paris → CDG
  ('r_l4_l1_sedan',    'l4','l1','sedan',      80,  false, true),
  ('r_l4_l1_van',      'l4','l1','van',         95,  false, true),
  ('r_l4_l1_suv',      'l4','l1','suv',        110,  false, true),
  ('r_l4_l1_minibus',  'l4','l1','minibus',    150,  false, true),
  -- Paris → Orly
  ('r_l4_l2_sedan',    'l4','l2','sedan',      75,  false, true),
  ('r_l4_l2_van',      'l4','l2','van',         90,  false, true),
  ('r_l4_l2_suv',      'l4','l2','suv',        100,  false, true),
  ('r_l4_l2_minibus',  'l4','l2','minibus',    140,  false, true),
  -- Paris → Disney
  ('r_l4_l5_sedan',    'l4','l5','sedan',      80,  false, true),
  ('r_l4_l5_van',      'l4','l5','van',         95,  false, true),
  ('r_l4_l5_suv',      'l4','l5','suv',        110,  false, true),
  ('r_l4_l5_minibus',  'l4','l5','minibus',    150,  false, true),
  -- Paris → Beauvais
  ('r_l4_l3_sedan',    'l4','l3','sedan',     150,  false, true),
  ('r_l4_l3_van',      'l4','l3','van',        175,  false, true),
  ('r_l4_l3_suv',      'l4','l3','suv',        200,  false, true),
  ('r_l4_l3_minibus',  'l4','l3','minibus',    280,  false, true),
  -- Paris → Versailles
  ('r_l4_l6_sedan',    'l4','l6','sedan',      80,  false, true),
  ('r_l4_l6_van',      'l4','l6','van',         95,  false, true),
  ('r_l4_l6_suv',      'l4','l6','suv',        110,  false, true),
  ('r_l4_l6_minibus',  'l4','l6','minibus',    150,  false, true),
  -- Paris → Parc Asterix
  ('r_l4_l11_sedan',   'l4','l11','sedan',     80,  false, true),
  ('r_l4_l11_van',     'l4','l11','van',        95,  false, true),
  ('r_l4_l11_suv',     'l4','l11','suv',       110,  false, true),
  ('r_l4_l11_minibus', 'l4','l11','minibus',   150,  false, true),
  -- Disney → Orly
  ('r_l5_l2_sedan',    'l5','l2','sedan',      75,  false, true),
  ('r_l5_l2_van',      'l5','l2','van',         90,  false, true),
  ('r_l5_l2_suv',      'l5','l2','suv',        105,  false, true),
  ('r_l5_l2_minibus',  'l5','l2','minibus',    155,  false, true),
  -- Disney → CDG
  ('r_l5_l1_sedan',    'l5','l1','sedan',      75,  false, true),
  ('r_l5_l1_van',      'l5','l1','van',         90,  false, true),
  ('r_l5_l1_suv',      'l5','l1','suv',        105,  false, true),
  ('r_l5_l1_minibus',  'l5','l1','minibus',    155,  false, true),
  -- Disney → Beauvais
  ('r_l5_l3_sedan',    'l5','l3','sedan',     150,  false, true),
  ('r_l5_l3_van',      'l5','l3','van',        175,  false, true),
  ('r_l5_l3_suv',      'l5','l3','suv',        200,  false, true),
  ('r_l5_l3_minibus',  'l5','l3','minibus',    280,  false, true),
  -- Disney → Paris
  ('r_l5_l4_sedan',    'l5','l4','sedan',      80,  false, true),
  ('r_l5_l4_van',      'l5','l4','van',         95,  false, true),
  ('r_l5_l4_suv',      'l5','l4','suv',        110,  false, true),
  ('r_l5_l4_minibus',  'l5','l4','minibus',    150,  false, true),
  -- Disney → Parc Asterix (on demand)
  ('r_l5_l11_sedan',   'l5','l11','sedan',    NULL, true,  true),
  ('r_l5_l11_van',     'l5','l11','van',       NULL, true,  true),
  ('r_l5_l11_suv',     'l5','l11','suv',       NULL, true,  true),
  ('r_l5_l11_minibus', 'l5','l11','minibus',   NULL, true,  true),
  -- Versailles → Paris
  ('r_l6_l4_sedan',    'l6','l4','sedan',      80,  false, true),
  ('r_l6_l4_van',      'l6','l4','van',         95,  false, true),
  ('r_l6_l4_suv',      'l6','l4','suv',        110,  false, true),
  ('r_l6_l4_minibus',  'l6','l4','minibus',    150,  false, true),
  -- Versailles → CDG
  ('r_l6_l1_sedan',    'l6','l1','sedan',     130,  false, true),
  ('r_l6_l1_van',      'l6','l1','van',        155,  false, true),
  ('r_l6_l1_suv',      'l6','l1','suv',        175,  false, true),
  ('r_l6_l1_minibus',  'l6','l1','minibus',    240,  false, true),
  -- Versailles → Orly
  ('r_l6_l2_sedan',    'l6','l2','sedan',      80,  false, true),
  ('r_l6_l2_van',      'l6','l2','van',         95,  false, true),
  ('r_l6_l2_suv',      'l6','l2','suv',        110,  false, true),
  ('r_l6_l2_minibus',  'l6','l2','minibus',    150,  false, true),
  -- Versailles → Parc Asterix (on demand)
  ('r_l6_l11_sedan',   'l6','l11','sedan',    NULL, true,  true),
  ('r_l6_l11_van',     'l6','l11','van',       NULL, true,  true),
  ('r_l6_l11_suv',     'l6','l11','suv',       NULL, true,  true),
  ('r_l6_l11_minibus', 'l6','l11','minibus',   NULL, true,  true)
ON CONFLICT DO NOTHING;

-- Verify counts
SELECT 'location_categories' AS tbl, COUNT(*) FROM location_categories
UNION ALL SELECT 'locations',  COUNT(*) FROM locations
UNION ALL SELECT 'vehicles',   COUNT(*) FROM vehicles
UNION ALL SELECT 'features',   COUNT(*) FROM features
UNION ALL SELECT 'rates',      COUNT(*) FROM rates
UNION ALL SELECT 'bookings',   COUNT(*) FROM bookings;