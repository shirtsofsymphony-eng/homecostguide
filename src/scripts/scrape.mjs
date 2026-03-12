#!/usr/bin/env node
import 'dotenv/config';

// ============================================================
// SCRAPING SCRIPT — Pulls contractor data from Google Maps
//
// Usage: node src/scripts/scrape.mjs
//
// Prerequisites:
//   1. Sign up at https://outscraper.com
//   2. Get your API key from the dashboard
//   3. Set OUTSCRAPER_API_KEY in your .env file
//
// Cost: ~$25-35 for initial scrape of 20 metros
// ============================================================

import fs from 'fs';
import path from 'path';

const API_KEY = process.env.OUTSCRAPER_API_KEY;
const BASE_URL = 'https://api.app.outscraper.com/maps/search-v3';

// Define what to scrape per metro
const SEARCH_QUERIES = [
  "general contractor",
  "roofing contractor",
  "plumber",
  "electrician",
  "HVAC contractor",
  "painter",
  "landscaper",
  "kitchen remodeler",
  "bathroom remodeler",
  "flooring contractor",
  "fence installer",
  "concrete contractor",
  "window installer",
  "pest control",
  "tree service",
  "handyman",
  "pool builder",
  "solar installer",
  "pressure washing",
];

const METROS = [
  { name: "Houston, TX", slug: "houston-tx" },
  { name: "Dallas, TX", slug: "dallas-tx" },
  { name: "Phoenix, AZ", slug: "phoenix-az" },
  { name: "San Antonio, TX", slug: "san-antonio-tx" },
  { name: "Austin, TX", slug: "austin-tx" },
  { name: "Fort Myers, FL", slug: "fort-myers-fl" },
  { name: "Charlotte, NC", slug: "charlotte-nc" },
  { name: "Nashville, TN", slug: "nashville-tn" },
  { name: "Raleigh, NC", slug: "raleigh-nc" },
  { name: "Boise, ID", slug: "boise-id" },
  { name: "Tampa, FL", slug: "tampa-fl" },
  { name: "Denver, CO", slug: "denver-co" },
  { name: "Atlanta, GA", slug: "atlanta-ga" },
  { name: "Orlando, FL", slug: "orlando-fl" },
  { name: "Jacksonville, FL", slug: "jacksonville-fl" },
  { name: "Las Vegas, NV", slug: "las-vegas-nv" },
  { name: "Salt Lake City, UT", slug: "salt-lake-city-ut" },
  { name: "Columbus, OH", slug: "columbus-oh" },
  { name: "Indianapolis, IN", slug: "indianapolis-in" },
  { name: "San Diego, CA", slug: "san-diego-ca" },
];

async function scrapeMetro(metro) {
  console.log(`\nScraping: ${metro.name}...`);
  const allResults = [];

  for (const query of SEARCH_QUERIES) {
    const searchQuery = `${query} ${metro.name}`;
    console.log(`  Searching: "${searchQuery}"`);

    try {
      const params = new URLSearchParams({
        query: searchQuery,
        limit: 20, // Top 20 results per query
        async: false,
      });

      const response = await fetch(`${BASE_URL}?${params}`, {
        headers: {
          'X-API-KEY': API_KEY,
        },
      });

      if (!response.ok) {
        console.error(`  Error: ${response.status} ${response.statusText}`);
        continue;
      }

      const data = await response.json();

      if (data.data && data.data[0]) {
        for (const biz of data.data[0]) {
          allResults.push({
            google_place_id: biz.place_id || '',
            name: biz.name || '',
            address: biz.full_address || '',
            city: metro.name.split(',')[0].trim(),
            state: metro.name.split(',')[1]?.trim() || '',
            zip: biz.postal_code || '',
            phone: biz.phone || '',
            website: biz.site || '',
            google_rating: biz.rating || null,
            review_count: biz.reviews || 0,
            latitude: biz.latitude || null,
            longitude: biz.longitude || null,
            categories: mapCategories(biz.category || '', biz.subtypes || []),
            metro_slug: metro.slug,
            google_maps_url: biz.google_maps_url || '',
            business_hours: biz.working_hours || null,
          });
        }
      }

      // Rate limiting — be respectful
      await sleep(1000);
    } catch (err) {
      console.error(`  Failed: ${err.message}`);
    }
  }

  // Deduplicate by google_place_id
  const unique = dedup(allResults);
  console.log(`  Found ${unique.length} unique businesses in ${metro.name}`);
  return unique;
}

function mapCategories(mainCategory, subtypes) {
  // Map Google Maps categories to our service slugs
  const categoryMap = {
    'roofing contractor': 'roof-replacement',
    'roofer': 'roof-replacement',
    'plumber': 'plumbing-repair',
    'plumbing service': 'plumbing-repair',
    'electrician': 'electrical-work',
    'electrical contractor': 'electrical-work',
    'hvac contractor': 'hvac-installation',
    'heating contractor': 'hvac-installation',
    'air conditioning contractor': 'hvac-installation',
    'painter': 'interior-painting',
    'painting contractor': 'interior-painting',
    'landscaper': 'landscaping',
    'landscaping company': 'landscaping',
    'general contractor': 'home-addition',
    'kitchen remodeler': 'kitchen-remodel',
    'bathroom remodeler': 'bathroom-remodel',
    'flooring contractor': 'flooring-installation',
    'flooring store': 'flooring-installation',
    'fence contractor': 'fence-installation',
    'concrete contractor': 'concrete-paving',
    'window installer': 'window-replacement',
    'pest control service': 'pest-control',
    'tree service': 'tree-service',
    'handyman': 'drywall-repair',
    'pool contractor': 'pool-construction',
    'solar energy contractor': 'solar-panel-installation',
    'pressure washing service': 'pressure-washing',
    'gutter cleaning service': 'gutter-installation',
  };

  const all = [mainCategory.toLowerCase(), ...subtypes.map(s => s.toLowerCase())];
  const mapped = new Set();

  for (const cat of all) {
    for (const [key, slug] of Object.entries(categoryMap)) {
      if (cat.includes(key)) {
        mapped.add(slug);
      }
    }
  }

  // Default to general contractor if nothing mapped
  if (mapped.size === 0) mapped.add('home-addition');

  return Array.from(mapped);
}

function dedup(results) {
  const seen = new Map();
  for (const r of results) {
    const key = r.google_place_id || `${r.name}-${r.address}`;
    if (!seen.has(key)) {
      seen.set(key, r);
    } else {
      // Merge categories
      const existing = seen.get(key);
      const merged = new Set([...existing.categories, ...r.categories]);
      existing.categories = Array.from(merged);
    }
  }
  return Array.from(seen.values());
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  if (!API_KEY) {
    console.error('ERROR: Set OUTSCRAPER_API_KEY in your .env file');
    console.log('\nTo get an API key:');
    console.log('1. Sign up at https://outscraper.com');
    console.log('2. Go to Dashboard → API');
    console.log('3. Copy your API key');
    console.log('4. Add to .env: OUTSCRAPER_API_KEY=your_key_here');
    process.exit(1);
  }

  console.log('=== HomeCostGuide Data Scraper ===');
  console.log(`Scraping ${METROS.length} metros × ${SEARCH_QUERIES.length} queries`);

  const allData = [];

  for (const metro of METROS) {
    const results = await scrapeMetro(metro);
    allData.push(...results);

    // Save incrementally
    const outPath = path.join(process.cwd(), 'src', 'data', 'scraped-contractors.json');
    fs.writeFileSync(outPath, JSON.stringify(allData, null, 2));
    console.log(`  Saved ${allData.length} total contractors to ${outPath}`);
  }

  console.log(`\n=== COMPLETE ===`);
  console.log(`Total unique contractors: ${allData.length}`);
  console.log(`Data saved to: src/data/scraped-contractors.json`);
  console.log(`\nNext step: npm run import-data`);
}

main().catch(console.error);
