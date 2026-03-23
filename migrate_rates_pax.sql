-- ================================================================
--  Migration: replace single price column with p1–p8 per-pax prices
--  Run on VPS: psql -U parisadmin -d pariseasymove -h localhost -f migrate_rates_pax.sql
-- ================================================================

-- Drop old rates table and recreate with p1–p8
DROP TABLE IF EXISTS rates CASCADE;

CREATE TABLE rates (
  id          TEXT PRIMARY KEY,
  from_loc_id TEXT NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  to_loc_id   TEXT NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  vehicle_id  TEXT NOT NULL REFERENCES vehicles(id)  ON DELETE CASCADE,
  p1  INT,  -- 1 pax price
  p2  INT,  -- 2 pax price
  p3  INT,  -- 3 pax price
  p4  INT,  -- 4 pax price
  p5  INT,  -- 5 pax price
  p6  INT,  -- 6 pax price
  p7  INT,  -- 7 pax price
  p8  INT,  -- 8 pax price  (9+ = p8 * 2, calculated in code)
  on_demand   BOOLEAN NOT NULL DEFAULT false,
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(from_loc_id, to_loc_id, vehicle_id)
);

CREATE INDEX IF NOT EXISTS idx_rates_from    ON rates(from_loc_id);
CREATE INDEX IF NOT EXISTS idx_rates_to      ON rates(to_loc_id);
CREATE INDEX IF NOT EXISTS idx_rates_vehicle ON rates(vehicle_id);

GRANT ALL ON TABLE rates TO parisadmin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO parisadmin;

-- Re-seed with per-pax prices (CDG → Disney example pricing)
-- Format: p1=p2=p3 (solo/couple same price), then increases per pax
INSERT INTO rates (id,from_loc_id,to_loc_id,vehicle_id,p1,p2,p3,p4,p5,p6,p7,p8,on_demand,active) VALUES
  -- CDG → Paris Hotels
  ('r_l1_l10_sedan',   'l1','l10','sedan',   80,80,80,85,90,95,100,110,false,true),
  ('r_l1_l10_van',     'l1','l10','van',      95,95,95,100,105,110,115,130,false,true),
  ('r_l1_l10_suv',     'l1','l10','suv',     110,110,110,115,120,125,130,145,false,true),
  ('r_l1_l10_minibus', 'l1','l10','minibus', 150,150,150,155,160,165,170,190,false,true),
  -- CDG → Disney
  ('r_l1_l5_sedan',    'l1','l5','sedan',    70,70,70,75,80,85,90,100,false,true),
  ('r_l1_l5_van',      'l1','l5','van',      90,90,90,95,100,105,110,120,false,true),
  ('r_l1_l5_suv',      'l1','l5','suv',     100,100,100,105,110,115,120,135,false,true),
  ('r_l1_l5_minibus',  'l1','l5','minibus', 150,150,150,155,160,165,170,190,false,true),
  -- CDG → Orly
  ('r_l1_l2_sedan',    'l1','l2','sedan',   100,100,100,110,110,120,120,140,false,true),
  ('r_l1_l2_van',      'l1','l2','van',     120,120,120,130,130,140,140,160,false,true),
  ('r_l1_l2_suv',      'l1','l2','suv',     135,135,135,145,145,155,155,175,false,true),
  ('r_l1_l2_minibus',  'l1','l2','minibus', 185,185,185,195,195,205,205,225,false,true),
  -- CDG → Beauvais
  ('r_l1_l3_sedan',    'l1','l3','sedan',   140,140,140,150,150,160,170,180,false,true),
  ('r_l1_l3_van',      'l1','l3','van',     165,165,165,175,175,185,195,210,false,true),
  ('r_l1_l3_suv',      'l1','l3','suv',     190,190,190,200,200,210,220,240,false,true),
  ('r_l1_l3_minibus',  'l1','l3','minibus', 260,260,260,270,270,280,290,310,false,true),
  -- CDG → Paris Gares
  ('r_l1_l9_sedan',    'l1','l9','sedan',    80,80,80,85,90,95,100,110,false,true),
  ('r_l1_l9_van',      'l1','l9','van',      95,95,95,100,105,110,115,130,false,true),
  ('r_l1_l9_suv',      'l1','l9','suv',     110,110,110,115,120,125,130,145,false,true),
  ('r_l1_l9_minibus',  'l1','l9','minibus', 150,150,150,155,160,165,170,190,false,true),
  -- CDG → Parc Asterix
  ('r_l1_l11_sedan',   'l1','l11','sedan',   80,80,80,90,90,100,100,110,false,true),
  ('r_l1_l11_van',     'l1','l11','van',      95,95,95,105,105,115,115,130,false,true),
  ('r_l1_l11_suv',     'l1','l11','suv',     110,110,110,120,120,130,130,145,false,true),
  ('r_l1_l11_minibus', 'l1','l11','minibus', 150,150,150,160,160,170,170,190,false,true),
  -- Orly → CDG
  ('r_l2_l1_sedan',    'l2','l1','sedan',   100,100,100,110,110,120,120,140,false,true),
  ('r_l2_l1_van',      'l2','l1','van',     120,120,120,130,130,140,140,160,false,true),
  ('r_l2_l1_suv',      'l2','l1','suv',     135,135,135,145,145,155,155,175,false,true),
  ('r_l2_l1_minibus',  'l2','l1','minibus', 185,185,185,195,195,205,205,225,false,true),
  -- Orly → Paris Hotels
  ('r_l2_l10_sedan',   'l2','l10','sedan',   75,75,75,80,85,90,95,100,false,true),
  ('r_l2_l10_van',     'l2','l10','van',      90,90,90,95,100,105,110,120,false,true),
  ('r_l2_l10_suv',     'l2','l10','suv',     100,100,100,105,110,115,120,135,false,true),
  ('r_l2_l10_minibus', 'l2','l10','minibus', 140,140,140,145,150,155,160,175,false,true),
  -- Orly → Disney
  ('r_l2_l5_sedan',    'l2','l5','sedan',    75,75,75,80,85,90,90,100,false,true),
  ('r_l2_l5_van',      'l2','l5','van',      90,90,90,95,100,105,105,120,false,true),
  ('r_l2_l5_suv',      'l2','l5','suv',     105,105,105,110,115,120,120,135,false,true),
  ('r_l2_l5_minibus',  'l2','l5','minibus', 155,155,155,160,165,170,170,190,false,true),
  -- Orly → Beauvais
  ('r_l2_l3_sedan',    'l2','l3','sedan',   170,170,170,180,180,190,190,200,false,true),
  ('r_l2_l3_van',      'l2','l3','van',     200,200,200,210,210,220,220,240,false,true),
  ('r_l2_l3_suv',      'l2','l3','suv',     230,230,230,240,240,250,250,270,false,true),
  ('r_l2_l3_minibus',  'l2','l3','minibus', 315,315,315,325,325,335,335,355,false,true),
  -- Orly → Parc Asterix
  ('r_l2_l11_sedan',   'l2','l11','sedan',  100,100,100,110,110,120,120,130,false,true),
  ('r_l2_l11_van',     'l2','l11','van',    120,120,120,130,130,140,140,155,false,true),
  ('r_l2_l11_suv',     'l2','l11','suv',    135,135,135,145,145,155,155,170,false,true),
  ('r_l2_l11_minibus', 'l2','l11','minibus',185,185,185,195,195,205,205,225,false,true),
  -- Paris → CDG
  ('r_l4_l1_sedan',    'l4','l1','sedan',    80,80,80,85,90,95,100,110,false,true),
  ('r_l4_l1_van',      'l4','l1','van',      95,95,95,100,105,110,115,130,false,true),
  ('r_l4_l1_suv',      'l4','l1','suv',     110,110,110,115,120,125,130,145,false,true),
  ('r_l4_l1_minibus',  'l4','l1','minibus', 150,150,150,155,160,165,170,190,false,true),
  -- Paris → Orly
  ('r_l4_l2_sedan',    'l4','l2','sedan',    75,75,75,80,85,90,95,100,false,true),
  ('r_l4_l2_van',      'l4','l2','van',      90,90,90,95,100,105,110,120,false,true),
  ('r_l4_l2_suv',      'l4','l2','suv',     100,100,100,105,110,115,120,135,false,true),
  ('r_l4_l2_minibus',  'l4','l2','minibus', 140,140,140,145,150,155,160,175,false,true),
  -- Paris → Disney
  ('r_l4_l5_sedan',    'l4','l5','sedan',    80,80,80,85,85,90,95,105,false,true),
  ('r_l4_l5_van',      'l4','l5','van',      95,95,95,100,100,105,110,120,false,true),
  ('r_l4_l5_suv',      'l4','l5','suv',     110,110,110,115,115,120,125,140,false,true),
  ('r_l4_l5_minibus',  'l4','l5','minibus', 150,150,150,155,155,160,165,185,false,true),
  -- Paris → Beauvais
  ('r_l4_l3_sedan',    'l4','l3','sedan',   150,150,150,160,160,170,170,180,false,true),
  ('r_l4_l3_van',      'l4','l3','van',     175,175,175,185,185,195,195,210,false,true),
  ('r_l4_l3_suv',      'l4','l3','suv',     200,200,200,210,210,220,220,240,false,true),
  ('r_l4_l3_minibus',  'l4','l3','minibus', 280,280,280,290,290,300,300,320,false,true),
  -- Paris → Versailles
  ('r_l4_l6_sedan',    'l4','l6','sedan',    80,80,80,90,90,100,100,110,false,true),
  ('r_l4_l6_van',      'l4','l6','van',      95,95,95,105,105,115,115,130,false,true),
  ('r_l4_l6_suv',      'l4','l6','suv',     110,110,110,120,120,130,130,145,false,true),
  ('r_l4_l6_minibus',  'l4','l6','minibus', 150,150,150,160,160,170,170,190,false,true),
  -- Paris → Parc Asterix
  ('r_l4_l11_sedan',   'l4','l11','sedan',   80,80,80,90,90,100,100,110,false,true),
  ('r_l4_l11_van',     'l4','l11','van',      95,95,95,105,105,115,115,130,false,true),
  ('r_l4_l11_suv',     'l4','l11','suv',     110,110,110,120,120,130,130,145,false,true),
  ('r_l4_l11_minibus', 'l4','l11','minibus', 150,150,150,160,160,170,170,190,false,true),
  -- Disney → Orly
  ('r_l5_l2_sedan',    'l5','l2','sedan',    75,75,75,80,85,90,90,100,false,true),
  ('r_l5_l2_van',      'l5','l2','van',      90,90,90,95,100,105,105,120,false,true),
  ('r_l5_l2_suv',      'l5','l2','suv',     105,105,105,110,115,120,120,135,false,true),
  ('r_l5_l2_minibus',  'l5','l2','minibus', 155,155,155,160,165,170,170,190,false,true),
  -- Disney → CDG
  ('r_l5_l1_sedan',    'l5','l1','sedan',    75,75,75,80,80,85,90,100,false,true),
  ('r_l5_l1_van',      'l5','l1','van',      90,90,90,95,95,100,105,120,false,true),
  ('r_l5_l1_suv',      'l5','l1','suv',     105,105,105,110,110,115,120,135,false,true),
  ('r_l5_l1_minibus',  'l5','l1','minibus', 155,155,155,160,160,165,170,190,false,true),
  -- Disney → Beauvais
  ('r_l5_l3_sedan',    'l5','l3','sedan',   150,150,150,160,160,170,170,180,false,true),
  ('r_l5_l3_van',      'l5','l3','van',     175,175,175,185,185,195,195,210,false,true),
  ('r_l5_l3_suv',      'l5','l3','suv',     200,200,200,210,210,220,220,240,false,true),
  ('r_l5_l3_minibus',  'l5','l3','minibus', 280,280,280,290,290,300,300,320,false,true),
  -- Disney → Paris
  ('r_l5_l4_sedan',    'l5','l4','sedan',    80,80,80,85,85,90,95,105,false,true),
  ('r_l5_l4_van',      'l5','l4','van',      95,95,95,100,100,105,110,120,false,true),
  ('r_l5_l4_suv',      'l5','l4','suv',     110,110,110,115,115,120,125,140,false,true),
  ('r_l5_l4_minibus',  'l5','l4','minibus', 150,150,150,155,155,160,165,185,false,true),
  -- Disney → Parc Asterix (on demand)
  ('r_l5_l11_sedan',   'l5','l11','sedan',   NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,true,true),
  ('r_l5_l11_van',     'l5','l11','van',     NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,true,true),
  ('r_l5_l11_suv',     'l5','l11','suv',     NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,true,true),
  ('r_l5_l11_minibus', 'l5','l11','minibus', NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,true,true),
  -- Versailles → Paris
  ('r_l6_l4_sedan',    'l6','l4','sedan',    80,80,80,90,90,100,100,110,false,true),
  ('r_l6_l4_van',      'l6','l4','van',      95,95,95,105,105,115,115,130,false,true),
  ('r_l6_l4_suv',      'l6','l4','suv',     110,110,110,120,120,130,130,145,false,true),
  ('r_l6_l4_minibus',  'l6','l4','minibus', 150,150,150,160,160,170,170,190,false,true),
  -- Versailles → CDG
  ('r_l6_l1_sedan',    'l6','l1','sedan',   130,130,130,140,140,150,150,160,false,true),
  ('r_l6_l1_van',      'l6','l1','van',     155,155,155,165,165,175,175,195,false,true),
  ('r_l6_l1_suv',      'l6','l1','suv',     175,175,175,185,185,195,195,215,false,true),
  ('r_l6_l1_minibus',  'l6','l1','minibus', 240,240,240,250,250,260,260,285,false,true),
  -- Versailles → Orly
  ('r_l6_l2_sedan',    'l6','l2','sedan',    80,80,80,90,90,100,100,110,false,true),
  ('r_l6_l2_van',      'l6','l2','van',      95,95,95,105,105,115,115,130,false,true),
  ('r_l6_l2_suv',      'l6','l2','suv',     110,110,110,120,120,130,130,145,false,true),
  ('r_l6_l2_minibus',  'l6','l2','minibus', 150,150,150,160,160,170,170,190,false,true),
  -- Versailles → Parc Asterix (on demand)
  ('r_l6_l11_sedan',   'l6','l11','sedan',   NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,true,true),
  ('r_l6_l11_van',     'l6','l11','van',     NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,true,true),
  ('r_l6_l11_suv',     'l6','l11','suv',     NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,true,true),
  ('r_l6_l11_minibus', 'l6','l11','minibus', NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,true,true)
ON CONFLICT DO NOTHING;

SELECT 'rates' AS tbl, COUNT(*) FROM rates;