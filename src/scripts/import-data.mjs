#!/usr/bin/env node
import 'dotenv/config';

// ============================================================
// IMPORT SCRIPT — Loads scraped contractor data into Supabase
//
// Usage: npm run import-data
//
// Prerequisites:
//   1. Run schema.mjs SQL in Supabase first
//   2. Run scrape.mjs to get contractor data
//   3. Set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env
// ============================================================

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY; // Use service key for writes

if (!supabaseUrl || !supabaseKey) {
  console.error('ERROR: Set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function importContractors() {
  const dataPath = path.join(process.cwd(), 'src', 'data', 'scraped-contractors.json');

  if (!fs.existsSync(dataPath)) {
    console.error('ERROR: No scraped data found. Run "npm run scrape" first.');
    process.exit(1);
  }

  const contractors = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  console.log(`Importing ${contractors.length} contractors into Supabase...`);

  // Generate slugs
  const withSlugs = contractors.map(c => ({
    ...c,
    slug: slugify(`${c.name}-${c.city}-${c.state}`),
  }));

  // Batch insert (Supabase supports upsert)
  const BATCH_SIZE = 100;
  let imported = 0;

  for (let i = 0; i < withSlugs.length; i += BATCH_SIZE) {
    const batch = withSlugs.slice(i, i + BATCH_SIZE);

    const { error } = await supabase
      .from('contractors')
      .upsert(batch, {
        onConflict: 'google_place_id',
        ignoreDuplicates: false,
      });

    if (error) {
      console.error(`Batch ${Math.floor(i / BATCH_SIZE) + 1} error:`, error.message);
    } else {
      imported += batch.length;
      console.log(`  Imported ${imported}/${withSlugs.length}`);
    }
  }

  console.log(`\nContractor import complete: ${imported} records`);
}

async function importCostData() {
  // Import from the site-data.js service definitions
  // This seeds the cost_data table with estimated costs per metro
  const { metros, services, getLocalCost } = await import('../data/site-data.js');

  console.log(`\nGenerating cost data for ${services.length} services × ${metros.length} metros...`);

  const costRows = [];
  for (const metro of metros) {
    for (const service of services) {
      const local = getLocalCost(service, metro);
      costRows.push({
        service_slug: service.slug,
        metro_slug: metro.slug,
        cost_low: local.low,
        cost_high: local.high,
        cost_avg: local.avg,
        unit: service.unit,
        source: 'estimated',
      });
    }
  }

  const BATCH_SIZE = 200;
  let imported = 0;

  for (let i = 0; i < costRows.length; i += BATCH_SIZE) {
    const batch = costRows.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from('cost_data')
      .upsert(batch, { onConflict: 'service_slug,metro_slug' });

    if (error) {
      console.error(`Cost data batch error:`, error.message);
    } else {
      imported += batch.length;
    }
  }

  console.log(`Cost data import complete: ${imported} records`);
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 100);
}

async function main() {
  console.log('=== HomeCostGuide Data Importer ===\n');
  await importContractors();
  await importCostData();
  console.log('\n=== ALL IMPORTS COMPLETE ===');
  console.log('Next step: npm run generate-content');
}

main().catch(console.error);
