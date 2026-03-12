// ============================================================
// DATABASE SCHEMA — Run this in Supabase SQL Editor
// This creates all tables needed for the contractor directory
// ============================================================
//
// Go to: https://supabase.com/dashboard → Your Project → SQL Editor
// Paste the SQL below and click "Run"
//

const SCHEMA_SQL = `
-- ============================================================
-- CONTRACTORS TABLE
-- Stores all scraped contractor/business data
-- ============================================================
CREATE TABLE IF NOT EXISTS contractors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  google_place_id TEXT UNIQUE,
  name TEXT NOT NULL,
  slug TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  phone TEXT,
  website TEXT,
  google_rating DECIMAL(2,1),
  review_count INTEGER DEFAULT 0,
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  categories TEXT[], -- array of service slugs
  metro_slug TEXT,
  google_maps_url TEXT,
  business_hours JSONB,
  claimed BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by metro + category
CREATE INDEX IF NOT EXISTS idx_contractors_metro ON contractors(metro_slug);
CREATE INDEX IF NOT EXISTS idx_contractors_categories ON contractors USING GIN(categories);
CREATE INDEX IF NOT EXISTS idx_contractors_metro_categories ON contractors(metro_slug, categories);
CREATE INDEX IF NOT EXISTS idx_contractors_place_id ON contractors(google_place_id);

-- ============================================================
-- COST DATA TABLE
-- Stores localized cost data per service per metro
-- Can be updated with real data over time
-- ============================================================
CREATE TABLE IF NOT EXISTS cost_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_slug TEXT NOT NULL,
  metro_slug TEXT NOT NULL,
  cost_low INTEGER,
  cost_high INTEGER,
  cost_avg INTEGER,
  unit TEXT DEFAULT 'per project',
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  source TEXT DEFAULT 'estimated',
  UNIQUE(service_slug, metro_slug)
);

CREATE INDEX IF NOT EXISTS idx_cost_data_lookup ON cost_data(service_slug, metro_slug);

-- ============================================================
-- GENERATED CONTENT TABLE
-- Stores AI-generated content for cost guide pages
-- ============================================================
CREATE TABLE IF NOT EXISTS page_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_type TEXT NOT NULL, -- 'cost_guide', 'city_hub', 'blog'
  service_slug TEXT,
  metro_slug TEXT,
  title TEXT,
  meta_description TEXT,
  content TEXT, -- Full HTML/markdown content
  faqs JSONB, -- Array of {q, a} objects
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_type, service_slug, metro_slug)
);

-- ============================================================
-- BLOG POSTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_description TEXT,
  content TEXT,
  category TEXT,
  metro_slug TEXT, -- NULL for national posts
  service_slug TEXT, -- NULL for general posts
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published, published_at DESC);
`;

console.log("=== SUPABASE DATABASE SCHEMA ===");
console.log("Copy the SQL below and run it in your Supabase SQL Editor:");
console.log("https://supabase.com/dashboard → Your Project → SQL Editor");
console.log("================================================================\n");
console.log(SCHEMA_SQL);

// Also export for use elsewhere
export default SCHEMA_SQL;
