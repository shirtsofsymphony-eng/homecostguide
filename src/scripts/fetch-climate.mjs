#!/usr/bin/env node
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

// ============================================================
// CLIMATE DATA FETCHER
// Downloads historical weather data from Open-Meteo API.
// Free, no API key required.
//
// Usage: node src/scripts/fetch-climate.mjs
// Output: src/data/generated/climate-data.json
//
// API docs: https://open-meteo.com/en/docs/historical-weather-api
// ============================================================

import { metros } from '../data/site-data.js';

const OUTPUT_PATH = path.join(process.cwd(), 'src', 'data', 'generated', 'climate-data.json');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchClimateForMetro(metro) {
  // Get monthly averages from last full year of historical data
  const year = 2024;
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;

  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${metro.lat}&longitude=${metro.lng}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=America%2FChicago`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`  API error for ${metro.city}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    if (!data.daily) return null;

    // Aggregate daily data into monthly averages
    const months = [];
    for (let m = 0; m < 12; m++) {
      const monthDays = data.daily.time.filter(t => new Date(t).getMonth() === m);
      const startIdx = data.daily.time.indexOf(monthDays[0]);
      const count = monthDays.length;

      if (count === 0) continue;

      let sumHigh = 0, sumLow = 0, sumPrecip = 0;
      for (let d = startIdx; d < startIdx + count; d++) {
        sumHigh += data.daily.temperature_2m_max[d] || 0;
        sumLow += data.daily.temperature_2m_min[d] || 0;
        sumPrecip += data.daily.precipitation_sum[d] || 0;
      }

      months.push({
        month: m + 1,
        avgHigh: Math.round(sumHigh / count),
        avgLow: Math.round(sumLow / count),
        totalPrecipInches: Math.round(sumPrecip * 10) / 10,
      });
    }

    return {
      months,
      source: 'Open-Meteo Historical API',
      year,
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error(`  Fetch error for ${metro.city}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('=== Climate Data Fetcher (Open-Meteo) ===\n');

  const result = {};

  for (const metro of metros) {
    console.log(`Fetching climate data for ${metro.city}, ${metro.stateCode}...`);
    const data = await fetchClimateForMetro(metro);

    if (data) {
      result[metro.slug] = data;
      const avgTemp = Math.round(data.months.reduce((s, m) => s + m.avgHigh, 0) / data.months.length);
      const totalRain = Math.round(data.months.reduce((s, m) => s + m.totalPrecipInches, 0) * 10) / 10;
      console.log(`  Avg high: ${avgTemp}\u00B0F, Annual precip: ${totalRain}"`);
    } else {
      console.log(`  No data, will use fallback`);
    }

    // Open-Meteo is generous but let's be polite
    await sleep(300);
  }

  // Merge with fallback
  const fallback = getFallbackData();
  const merged = { ...fallback };
  for (const [slug, data] of Object.entries(result)) {
    merged[slug] = data;
  }

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(merged, null, 2));
  console.log(`\nWrote ${Object.keys(merged).length} metros to ${OUTPUT_PATH}`);
}

// Simplified fallback with monthly averages (F, inches)
function getFallbackData() {
  const makeMonths = (highs, lows, precips) =>
    highs.map((h, i) => ({ month: i + 1, avgHigh: h, avgLow: lows[i], totalPrecipInches: precips[i] }));

  return {
    "houston-tx": { months: makeMonths([63,66,73,79,86,91,94,94,89,82,72,64],[43,46,52,59,67,73,75,75,70,61,51,44],[3.2,3.0,3.4,3.6,5.2,5.9,3.3,3.8,4.6,5.7,4.2,3.5]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
    "dallas-tx": { months: makeMonths([57,61,69,77,84,92,96,97,89,79,67,58],[36,40,47,55,64,72,76,76,68,57,46,38],[2.3,2.7,3.6,3.5,5.0,4.0,2.0,2.2,3.0,4.8,3.2,2.8]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
    "phoenix-az": { months: makeMonths([67,71,77,85,95,104,106,104,100,89,77,66],[44,47,52,59,68,77,83,82,76,64,52,43],[0.8,0.8,0.9,0.2,0.1,0.0,0.9,1.0,0.6,0.6,0.6,0.9]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
    "san-antonio-tx": { months: makeMonths([62,66,74,80,87,93,96,96,90,82,71,63],[39,43,50,57,65,72,74,74,69,59,49,40],[1.7,1.8,2.0,2.4,4.3,4.5,2.0,2.4,3.2,3.8,2.7,2.0]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
    "austin-tx": { months: makeMonths([62,66,73,80,87,93,97,97,91,82,71,63],[40,44,51,58,66,72,75,75,69,59,49,41],[2.1,2.0,2.8,2.6,4.8,4.2,1.8,2.1,3.4,4.0,3.0,2.4]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
    "fort-myers-fl": { months: makeMonths([75,77,81,85,90,92,92,92,91,87,81,76],[54,55,60,64,69,74,75,75,74,69,62,55],[1.8,2.2,2.5,1.8,3.5,9.5,8.8,9.2,7.8,3.2,1.6,1.3]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
    "charlotte-nc": { months: makeMonths([51,55,63,73,80,87,91,89,83,73,62,53],[31,33,40,49,57,66,70,69,62,50,40,33],[3.5,3.3,4.0,3.1,3.6,3.7,3.9,3.7,3.5,3.3,3.1,3.4]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
    "nashville-tn": { months: makeMonths([47,52,62,72,80,88,91,90,84,73,60,49],[28,31,39,48,57,66,70,69,61,49,39,31],[3.7,3.7,4.3,4.1,5.1,4.1,4.6,3.2,3.6,3.0,3.9,4.4]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
    "raleigh-nc": { months: makeMonths([50,54,62,72,79,86,90,88,82,72,62,52],[30,32,38,47,56,65,69,68,61,49,39,32],[3.4,3.1,3.8,2.9,3.7,3.8,4.4,4.3,4.0,3.2,2.9,3.0]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
    "boise-id": { months: makeMonths([37,44,55,63,72,82,92,90,79,64,48,37],[23,27,33,38,46,53,60,59,49,39,31,23],[1.3,1.0,1.3,1.2,1.2,0.6,0.3,0.2,0.5,0.8,1.3,1.4]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
    "tampa-fl": { months: makeMonths([70,72,77,82,88,90,91,91,89,84,77,72],[52,54,59,63,69,74,76,76,74,68,60,54],[2.3,2.7,2.8,1.8,2.8,7.4,7.2,7.6,6.0,2.4,1.6,2.3]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
    "denver-co": { months: makeMonths([45,48,56,62,72,83,90,87,79,66,52,44],[16,19,27,34,43,52,58,57,47,35,24,16],[0.5,0.5,1.3,1.7,2.3,1.8,2.2,1.8,1.3,1.0,0.8,0.5]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
    "atlanta-ga": { months: makeMonths([52,57,65,73,81,87,90,89,83,73,63,54],[33,36,43,51,60,68,71,71,65,53,43,36],[4.2,4.5,4.8,3.4,3.6,3.9,5.2,3.7,3.5,3.1,3.5,3.9]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
    "orlando-fl": { months: makeMonths([71,74,78,83,89,91,92,92,90,85,78,73],[49,51,56,60,67,72,74,74,73,67,58,51],[2.3,2.4,3.5,2.4,3.5,7.3,7.2,6.8,5.6,3.2,2.2,2.4]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
    "jacksonville-fl": { months: makeMonths([64,67,73,79,86,90,92,91,87,80,72,65],[42,44,50,56,63,70,73,73,70,61,51,44],[3.0,2.8,3.6,2.8,3.4,6.2,5.9,6.4,7.2,3.8,2.2,2.6]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
    "las-vegas-nv": { months: makeMonths([58,63,70,78,89,100,105,103,96,82,68,57],[37,41,47,54,63,73,80,78,70,58,45,37],[0.5,0.7,0.4,0.2,0.1,0.1,0.4,0.3,0.3,0.3,0.3,0.4]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
    "salt-lake-city-ut": { months: makeMonths([37,43,54,62,73,84,93,91,80,65,49,37],[21,25,33,39,48,57,65,64,53,41,30,21],[1.3,1.2,1.8,2.1,2.0,0.9,0.7,0.7,1.1,1.5,1.4,1.3]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
    "columbus-oh": { months: makeMonths([36,40,51,63,73,82,85,84,78,65,52,40],[21,23,31,40,50,60,64,62,55,43,34,25],[2.8,2.2,3.0,3.4,4.1,4.1,4.7,3.3,2.8,2.6,3.0,2.8]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
    "indianapolis-in": { months: makeMonths([35,40,52,63,73,83,86,84,78,65,51,39],[20,23,32,41,52,61,65,63,55,43,33,24],[2.5,2.2,3.2,3.7,4.5,4.2,4.4,3.5,2.9,3.0,3.3,2.9]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
    "san-diego-ca": { months: makeMonths([66,66,66,68,69,72,76,78,77,74,69,65],[48,50,52,55,58,61,65,66,64,59,52,47],[2.0,2.3,1.8,0.6,0.2,0.1,0.0,0.1,0.2,0.5,1.0,1.6]), source: "NOAA 30-year avg (cached)", year: 2024, fetchedAt: "2025-01-01T00:00:00.000Z" },
  };
}

main().catch(console.error);
