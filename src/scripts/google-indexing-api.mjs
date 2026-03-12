#!/usr/bin/env node
import 'dotenv/config';

// ============================================================
// GOOGLE INDEXING API — Submit URLs directly to Google
//
// Usage: npm run submit-indexing-api
//
// Setup (one-time):
//   1. Go to Google Cloud Console → APIs & Services
//   2. Enable "Web Search Indexing API"
//   3. Create a Service Account → Download JSON key
//   4. In Google Search Console, add the service account
//      email as an owner of your property
//   5. Save the JSON key file as google-service-account.json
//      in your project root
//   6. Set GOOGLE_SERVICE_ACCOUNT_PATH in .env
//
// Limit: 200 URLs per day
// Strategy: Submit highest-value pages first
// ============================================================

import fs from 'fs';
import { metros, services, SITE_URL } from '../data/site-data.js';

const SERVICE_ACCOUNT_PATH = process.env.GOOGLE_SERVICE_ACCOUNT_PATH || './google-service-account.json';
const DAILY_LIMIT = 200;

async function getAccessToken() {
  // Load service account credentials
  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error(`Service account file not found: ${SERVICE_ACCOUNT_PATH}`);
    console.log('\nSetup instructions:');
    console.log('1. Go to Google Cloud Console → APIs & Services');
    console.log('2. Enable "Web Search Indexing API"');
    console.log('3. Create Service Account → Download JSON key');
    console.log('4. Save as google-service-account.json in project root');
    console.log('5. In Search Console, add the service account email as owner');
    process.exit(1);
  }

  const creds = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf-8'));

  // Create JWT for authentication
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: creds.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })).toString('base64url');

  // Note: In production, use a proper JWT library
  // For now, use Google's Node.js auth library
  console.log('NOTE: For production use, install googleapis:');
  console.log('  npm install googleapis');
  console.log('  Then use google.auth.GoogleAuth for proper JWT signing\n');

  return null; // Placeholder — see instructions below
}

async function submitUrl(url, accessToken) {
  const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      url: url,
      type: 'URL_UPDATED',
    }),
  });

  if (response.ok) {
    return { success: true, url };
  } else {
    const error = await response.text();
    return { success: false, url, error };
  }
}

async function main() {
  console.log('=== Google Indexing API Submitter ===\n');

  // Priority order for URL submission:
  // 1. Homepage
  // 2. Most popular service pages (highest search volume services)
  // 3. Biggest metros first
  // 4. City hub pages
  // 5. Directory pages

  const priorityUrls = [];

  // Homepage
  priorityUrls.push(`${SITE_URL}/`);

  // Cost index
  priorityUrls.push(`${SITE_URL}/cost/`);

  // High-value cost guide pages — top 5 services × all metros
  const topServices = services.slice(0, 5); // Roofing, Kitchen, Bath, HVAC, Plumbing
  const bigMetros = [...metros].sort((a, b) => b.pop - a.pop);

  for (const service of topServices) {
    for (const metro of bigMetros) {
      priorityUrls.push(`${SITE_URL}/cost/${service.slug}/${metro.slug}/`);
    }
  }

  // City hubs
  for (const metro of bigMetros) {
    priorityUrls.push(`${SITE_URL}/city/${metro.slug}/`);
  }

  // Service index pages
  for (const service of services) {
    priorityUrls.push(`${SITE_URL}/cost/${service.slug}/`);
  }

  // Trim to daily limit
  const todaysUrls = priorityUrls.slice(0, DAILY_LIMIT);

  console.log(`Prepared ${todaysUrls.length} URLs for submission (daily limit: ${DAILY_LIMIT})`);
  console.log(`Total URLs in queue: ${priorityUrls.length}`);
  console.log(`Days needed to submit all: ${Math.ceil(priorityUrls.length / DAILY_LIMIT)}\n`);

  // Save the URL list for manual or automated submission
  const outPath = './indexing-urls-today.txt';
  fs.writeFileSync(outPath, todaysUrls.join('\n'));
  console.log(`URL list saved to: ${outPath}`);

  console.log('\n--- MANUAL ALTERNATIVE ---');
  console.log('If you prefer, use Google Search Console URL Inspection:');
  console.log('1. Go to Search Console → URL Inspection');
  console.log('2. Paste each URL and click "Request Indexing"');
  console.log('3. Limit: ~10-20 URLs per day via manual method');

  // If we have a valid access token, submit programmatically
  // const token = await getAccessToken();
  // if (token) {
  //   for (const url of todaysUrls) {
  //     const result = await submitUrl(url, token);
  //     console.log(result.success ? `✓ ${url}` : `✗ ${url}: ${result.error}`);
  //     await new Promise(r => setTimeout(r, 100)); // Rate limit
  //   }
  // }
}

main().catch(console.error);
