#!/usr/bin/env node
import 'dotenv/config';

// ============================================================
// INDEXNOW — Instantly notify Bing/Yandex of new pages
//
// Usage: npm run ping-indexnow
// Run after every build/deploy to ping search engines
//
// Setup:
//   1. Generate a key: any UUID works (e.g., from uuidgenerator.net)
//   2. Set INDEXNOW_KEY in .env
//   3. Place a file named {key}.txt in your /public folder
//      containing just the key itself
// ============================================================

import { metros, services } from '../data/site-data.js';

const SITE_URL = process.env.SITE_URL || 'https://www.homecostguide.com';
const INDEXNOW_KEY = process.env.INDEXNOW_KEY;

if (!INDEXNOW_KEY) {
  console.error('ERROR: Set INDEXNOW_KEY in .env');
  console.log('Generate one at: https://www.uuidgenerator.net/');
  process.exit(1);
}

async function pingIndexNow() {
  // Generate all page URLs
  const urls = [];

  // Homepage
  urls.push(`${SITE_URL}/`);

  // Cost guide pages
  for (const metro of metros) {
    for (const service of services) {
      urls.push(`${SITE_URL}/cost/${service.slug}/${metro.slug}/`);
    }
  }

  // Directory pages
  for (const metro of metros) {
    for (const service of services) {
      urls.push(`${SITE_URL}/directory/${service.slug}/${metro.slug}/`);
    }
  }

  // City hub pages
  for (const metro of metros) {
    urls.push(`${SITE_URL}/city/${metro.slug}/`);
  }

  console.log(`Pinging IndexNow with ${urls.length} URLs...`);

  // IndexNow accepts batches of up to 10,000 URLs
  const BATCH_SIZE = 10000;

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);

    try {
      const response = await fetch('https://api.indexnow.org/IndexNow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: new URL(SITE_URL).hostname,
          key: INDEXNOW_KEY,
          keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
          urlList: batch,
        }),
      });

      if (response.ok || response.status === 202) {
        console.log(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} URLs submitted successfully`);
      } else {
        console.error(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.error(`  Batch error: ${err.message}`);
    }
  }

  console.log('\nIndexNow ping complete!');
  console.log('Bing and Yandex will crawl these pages within hours.');
}

pingIndexNow().catch(console.error);
