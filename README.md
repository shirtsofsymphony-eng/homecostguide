# HomeCostGuide — Deployment Guide

## What You're Deploying

A static Next.js site with 1,800+ pages generated at build time:
- 600 cost guide pages (30 services x 20 metros) — your money pages
- 600 directory pages (30 services x 20 metros) — contractor listings
- 30 service index pages — national cost overview per service
- 20 city hub pages — all services for one metro
- 1 homepage with full internal linking

All pages are pre-rendered HTML. No server needed. Sub-second load times.

---

## Step-by-Step Launch

### 1. Register Domain (~2 min)
Go to Cloudflare Registrar: https://dash.cloudflare.com
Recommended: homecostguide.com — Cost: ~$10/year

### 2. Create Accounts (~5 min)

SUPABASE (free): https://supabase.com
- Create project, go to Settings > API
- Copy Project URL, anon key, and service_role key

VERCEL (free): https://vercel.com
- Sign up with GitHub

OUTSCRAPER (pay-per-use): https://outscraper.com
- Add ~$30 credits, copy API key

### 3. Set Up Database (~2 min)
- In Supabase > SQL Editor
- Copy SQL from src/scripts/schema.mjs and run it

### 4. Deploy to Vercel (~5 min)
- Push project to GitHub
- Vercel > New Project > Import repo
- Set framework to Next.js
- Add env variables from .env.example
- Deploy

### 5. Connect Domain (~3 min)
- Vercel > Settings > Domains > Add domain
- Cloudflare > DNS > Add CNAME from Vercel
- SSL is automatic

### 6. Run Data Scripts
```
cp .env.example .env.local   # Fill in your keys
npm run scrape               # ~20-30 min
npm run import-data          # Load into Supabase
node src/scripts/generate-sitemap.mjs
```

### 7. Submit to Search Engines (~5 min)
- Google Search Console: verify domain, submit sitemap.xml
- Run: npm run ping-indexnow

---

## Revenue Timeline

Month 1-2: $25-80/mo (Ezoic, 5K-10K sessions)
Month 3-4: $120-360/mo (Ezoic, 15K-30K sessions)
Month 5-6: $720-1,500/mo (Mediavine, 40K-60K sessions)
Month 7-9: $1,760-4,500/mo (Mediavine, 80K-150K sessions)
Month 10-12: $3,750-10,500/mo (Raptive, 150K-300K sessions)

The sooner this is live, the sooner the clock starts.
