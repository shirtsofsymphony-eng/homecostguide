// ============================================================
// CORE DATA: Metros, Services, Cost Ranges
// This is the heart of the programmatic SEO engine.
// Every combination of service + metro generates pages.
// ============================================================

export const SITE_NAME = "HomeCostGuide";
export const SITE_URL = "https://www.homecostguide.com"; // Update after domain purchase
export const SITE_DESCRIPTION = "Accurate, local home improvement cost data for every major US metro. Find what projects really cost in your area.";

// ============================================================
// TARGET METROS (Start with 20, expand to 50)
// Selected for: population growth, construction activity,
// search volume for home improvement queries, and RPM potential
// ============================================================
export const metros = [
  { slug: "houston-tx", city: "Houston", state: "TX", stateCode: "TX", lat: 29.7604, lng: -95.3698, pop: 2300000, costIndex: 0.95 },
  { slug: "dallas-tx", city: "Dallas", state: "TX", stateCode: "TX", lat: 32.7767, lng: -96.7970, pop: 1340000, costIndex: 0.97 },
  { slug: "phoenix-az", city: "Phoenix", state: "AZ", stateCode: "AZ", lat: 33.4484, lng: -112.0740, pop: 1680000, costIndex: 0.93 },
  { slug: "san-antonio-tx", city: "San Antonio", state: "TX", stateCode: "TX", lat: 29.4241, lng: -98.4936, pop: 1530000, costIndex: 0.88 },
  { slug: "austin-tx", city: "Austin", state: "TX", stateCode: "TX", lat: 30.2672, lng: -97.7431, pop: 1020000, costIndex: 1.02 },
  { slug: "fort-myers-fl", city: "Fort Myers", state: "FL", stateCode: "FL", lat: 26.6406, lng: -81.8723, pop: 92000, costIndex: 0.96 },
  { slug: "charlotte-nc", city: "Charlotte", state: "NC", stateCode: "NC", lat: 35.2271, lng: -80.8431, pop: 900000, costIndex: 0.94 },
  { slug: "nashville-tn", city: "Nashville", state: "TN", stateCode: "TN", lat: 36.1627, lng: -86.7816, pop: 690000, costIndex: 0.96 },
  { slug: "raleigh-nc", city: "Raleigh", state: "NC", stateCode: "NC", lat: 35.7796, lng: -78.6382, pop: 480000, costIndex: 0.95 },
  { slug: "boise-id", city: "Boise", state: "ID", stateCode: "ID", lat: 43.6150, lng: -116.2023, pop: 240000, costIndex: 0.92 },
  { slug: "tampa-fl", city: "Tampa", state: "FL", stateCode: "FL", lat: 27.9506, lng: -82.4572, pop: 400000, costIndex: 0.95 },
  { slug: "denver-co", city: "Denver", state: "CO", stateCode: "CO", lat: 39.7392, lng: -104.9903, pop: 715000, costIndex: 1.05 },
  { slug: "atlanta-ga", city: "Atlanta", state: "GA", stateCode: "GA", lat: 33.7490, lng: -84.3880, pop: 500000, costIndex: 0.97 },
  { slug: "orlando-fl", city: "Orlando", state: "FL", stateCode: "FL", lat: 28.5383, lng: -81.3792, pop: 310000, costIndex: 0.94 },
  { slug: "jacksonville-fl", city: "Jacksonville", state: "FL", stateCode: "FL", lat: 30.3322, lng: -81.6557, pop: 950000, costIndex: 0.91 },
  { slug: "las-vegas-nv", city: "Las Vegas", state: "NV", stateCode: "NV", lat: 36.1699, lng: -115.1398, pop: 650000, costIndex: 0.98 },
  { slug: "salt-lake-city-ut", city: "Salt Lake City", state: "UT", stateCode: "UT", lat: 40.7608, lng: -111.8910, pop: 200000, costIndex: 0.96 },
  { slug: "columbus-oh", city: "Columbus", state: "OH", stateCode: "OH", lat: 39.9612, lng: -82.9988, pop: 900000, costIndex: 0.90 },
  { slug: "indianapolis-in", city: "Indianapolis", state: "IN", stateCode: "IN", lat: 39.7684, lng: -86.1581, pop: 880000, costIndex: 0.89 },
  { slug: "san-diego-ca", city: "San Diego", state: "CA", stateCode: "CA", lat: 32.7157, lng: -117.1611, pop: 1420000, costIndex: 1.18 },
];

// ============================================================
// SERVICE CATEGORIES (30 categories)
// Each has: base national cost range, unit, and search keywords
// Local costs are calculated by multiplying by metro costIndex
// ============================================================
export const services = [
  {
    slug: "roof-replacement",
    name: "Roof Replacement",
    category: "Roofing",
    baseLow: 5500,
    baseHigh: 12000,
    baseAvg: 8500,
    unit: "per project",
    searchTerms: ["roof replacement", "new roof", "reroof", "roofing"],
    description: "Complete tear-off and installation of new roofing materials including shingles, underlayment, and flashing.",
    factors: ["Roof size (square footage)", "Material choice (asphalt, metal, tile)", "Roof pitch and complexity", "Number of layers to remove", "Local permit costs", "Time of year"],
    faqs: [
      { q: "How long does a roof replacement take?", a: "Most residential roof replacements take 1-3 days for a standard single-family home. Complex roofs with multiple slopes or premium materials like tile may take 5-7 days." },
      { q: "How often should a roof be replaced?", a: "Asphalt shingle roofs typically last 20-30 years. Metal roofs can last 40-70 years. Tile roofs may last 50-100 years. Inspect annually and replace when you see widespread damage or aging." },
      { q: "Does homeowner insurance cover roof replacement?", a: "Insurance typically covers roof damage from sudden events like storms or fallen trees. It generally does not cover replacement due to normal wear and aging. Check your specific policy." },
    ],
  },
  {
    slug: "kitchen-remodel",
    name: "Kitchen Remodel",
    category: "Remodeling",
    baseLow: 15000,
    baseHigh: 50000,
    baseAvg: 28000,
    unit: "per project",
    searchTerms: ["kitchen remodel", "kitchen renovation", "kitchen upgrade"],
    description: "Full kitchen renovation including cabinets, countertops, flooring, appliances, and potentially layout changes.",
    factors: ["Kitchen size", "Cabinet quality (stock vs. custom)", "Countertop material (laminate, granite, quartz)", "Appliance tier", "Layout changes requiring plumbing/electrical", "Permit requirements"],
    faqs: [
      { q: "How long does a kitchen remodel take?", a: "A minor remodel takes 4-6 weeks. A major renovation with layout changes can take 3-6 months including design, permits, and construction." },
      { q: "What is the most expensive part of a kitchen remodel?", a: "Cabinets typically account for 30-40% of the total budget, followed by labor (20-30%) and countertops (10-15%)." },
      { q: "Does a kitchen remodel increase home value?", a: "On average, a kitchen remodel recoups 50-80% of its cost in added home value. Minor remodels tend to have a higher ROI than major gut renovations." },
    ],
  },
  {
    slug: "bathroom-remodel",
    name: "Bathroom Remodel",
    category: "Remodeling",
    baseLow: 6000,
    baseHigh: 25000,
    baseAvg: 12500,
    unit: "per project",
    searchTerms: ["bathroom remodel", "bathroom renovation", "bath remodel"],
    description: "Renovation of bathroom including fixtures, tile, vanity, and potentially tub/shower replacement.",
    factors: ["Bathroom size", "Fixture quality", "Tile selection and coverage area", "Plumbing changes", "Accessibility features", "Ventilation upgrades"],
    faqs: [
      { q: "How long does a bathroom remodel take?", a: "A basic update takes 2-3 weeks. A full gut renovation with layout changes typically takes 4-8 weeks." },
      { q: "Can I remodel a bathroom for $5,000?", a: "Yes, with a cosmetic refresh: new paint, updated fixtures, a new vanity, and reglazing the tub. Major changes like moving plumbing will exceed this budget." },
      { q: "What adds the most value in a bathroom remodel?", a: "Updated vanity and fixtures, modern tile work, and improved lighting offer the best ROI. Adding a second bathroom is one of the highest-value home improvements." },
    ],
  },
  {
    slug: "hvac-installation",
    name: "HVAC Installation",
    category: "HVAC",
    baseLow: 4000,
    baseHigh: 12000,
    baseAvg: 7500,
    unit: "per system",
    searchTerms: ["hvac installation", "new ac unit", "furnace replacement", "hvac system"],
    description: "Installation of a new heating and cooling system including equipment, ductwork modifications, and thermostat.",
    factors: ["Home square footage", "System type (central, heat pump, mini-split)", "SEER rating / efficiency", "Ductwork condition", "Number of zones", "Brand selection"],
    faqs: [
      { q: "How long does an HVAC system last?", a: "A well-maintained central AC unit lasts 15-20 years. Furnaces typically last 15-25 years. Heat pumps average 10-15 years." },
      { q: "What size HVAC system do I need?", a: "A general rule is 1 ton of cooling per 500 square feet, but factors like insulation, climate, ceiling height, and window exposure affect sizing. Always get a professional load calculation." },
      { q: "Is a heat pump worth it?", a: "In moderate climates, heat pumps can save 30-50% on heating costs compared to electric furnaces. They are less effective in extreme cold without a supplemental heat source." },
    ],
  },
  {
    slug: "plumbing-repair",
    name: "Plumbing Repair",
    category: "Plumbing",
    baseLow: 150,
    baseHigh: 5000,
    baseAvg: 800,
    unit: "per job",
    searchTerms: ["plumber", "plumbing repair", "plumbing service", "pipe repair"],
    description: "General plumbing repairs including leak fixes, drain cleaning, pipe replacement, and fixture installation.",
    factors: ["Type of repair", "Pipe accessibility", "Parts needed", "Emergency vs. scheduled", "Permit requirements for major work"],
    faqs: [
      { q: "How much does a plumber charge per hour?", a: "Most plumbers charge $75-150 per hour, with a typical service call minimum of $100-200. Emergency and after-hours rates are typically 1.5-2x the standard rate." },
      { q: "When should I call a plumber vs. DIY?", a: "DIY is fine for simple tasks like replacing a faucet aerator or unclogging a drain with a plunger. Call a professional for anything involving main lines, water heaters, gas lines, or persistent leaks." },
      { q: "How much does it cost to repipe a house?", a: "A full repipe typically costs $4,000-15,000 depending on home size, pipe material, and accessibility. This is a major project that usually takes 3-7 days." },
    ],
  },
  {
    slug: "electrical-work",
    name: "Electrical Work",
    category: "Electrical",
    baseLow: 150,
    baseHigh: 5000,
    baseAvg: 1200,
    unit: "per job",
    searchTerms: ["electrician", "electrical repair", "wiring", "electrical panel"],
    description: "Electrical services including panel upgrades, outlet installation, wiring repairs, and lighting.",
    factors: ["Scope of work", "Panel capacity needed", "Wire accessibility", "Code compliance requirements", "Permit costs"],
    faqs: [
      { q: "How much does an electrician charge per hour?", a: "Electricians typically charge $80-150 per hour. Master electricians and emergency calls may be higher at $100-200+ per hour." },
      { q: "How much does a panel upgrade cost?", a: "Upgrading from a 100-amp to 200-amp panel typically costs $1,500-4,000 including permits and inspection." },
      { q: "Do I need a permit for electrical work?", a: "Most jurisdictions require permits for new circuits, panel work, and major wiring changes. Minor repairs like replacing outlets or switches typically do not need permits." },
    ],
  },
  {
    slug: "interior-painting",
    name: "Interior Painting",
    category: "Painting",
    baseLow: 1500,
    baseHigh: 6000,
    baseAvg: 3500,
    unit: "per project",
    searchTerms: ["interior painting", "house painting", "room painting", "painters"],
    description: "Professional interior painting including walls, ceilings, trim, and preparation work.",
    factors: ["Total square footage", "Number of rooms", "Ceiling height", "Surface condition and prep needed", "Paint quality", "Number of coats"],
    faqs: [
      { q: "How much does it cost to paint a room?", a: "A single room (12x12) typically costs $300-800 for professional painting. This includes prep, two coats, and cleanup." },
      { q: "How long does interior paint last?", a: "Quality interior paint in normal conditions lasts 5-10 years. High-traffic areas like hallways and kids rooms may need repainting every 3-5 years." },
      { q: "Should I paint or replace trim?", a: "If trim is structurally sound, painting is much more cost-effective at $1-3 per linear foot versus $5-15 for replacement with labor." },
    ],
  },
  {
    slug: "flooring-installation",
    name: "Flooring Installation",
    category: "Flooring",
    baseLow: 2000,
    baseHigh: 12000,
    baseAvg: 5500,
    unit: "per project",
    searchTerms: ["flooring installation", "new floors", "hardwood floors", "tile installation"],
    description: "Installation of new flooring including material, subfloor preparation, and transitions.",
    factors: ["Material type (hardwood, LVP, tile, carpet)", "Total square footage", "Subfloor condition", "Pattern complexity", "Removal of existing flooring", "Furniture moving"],
    faqs: [
      { q: "What is the cheapest flooring to install?", a: "Vinyl plank (LVP) and laminate are the most affordable at $2-5 per sq ft installed. Carpet is also budget-friendly at $3-6 per sq ft installed." },
      { q: "How long does flooring installation take?", a: "A typical 500 sq ft room takes 1-2 days for LVP or laminate, 2-3 days for hardwood, and 3-5 days for tile." },
      { q: "What flooring has the best resale value?", a: "Hardwood flooring consistently provides the highest resale value, with homeowners typically recouping 70-80% of costs. Quality LVP is increasingly accepted as well." },
    ],
  },
  {
    slug: "fence-installation",
    name: "Fence Installation",
    category: "Fencing",
    baseLow: 1500,
    baseHigh: 8000,
    baseAvg: 4200,
    unit: "per project",
    searchTerms: ["fence installation", "new fence", "fencing", "fence builder"],
    description: "Installation of a new fence including posts, panels, gates, and hardware.",
    factors: ["Linear footage", "Material (wood, vinyl, aluminum, chain link)", "Fence height", "Terrain and slope", "Gate count and size", "Local HOA requirements"],
    faqs: [
      { q: "How much does fencing cost per foot?", a: "Chain link runs $10-20/ft, wood privacy fence $15-35/ft, vinyl $20-40/ft, and aluminum $25-50/ft — all installed." },
      { q: "Do I need a permit for a fence?", a: "Most cities require a permit for fences over 6 feet. Many require permits for any fence in a front yard. Always check local codes before building." },
      { q: "How long does a wood fence last?", a: "A pressure-treated wood fence typically lasts 15-20 years with proper maintenance. Cedar can last 20-25 years. Without staining or sealing, lifespan drops to 10-12 years." },
    ],
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    category: "Landscaping",
    baseLow: 1000,
    baseHigh: 15000,
    baseAvg: 5000,
    unit: "per project",
    searchTerms: ["landscaping", "landscape design", "yard work", "landscaper"],
    description: "Professional landscape design and installation including plants, hardscaping, grading, and irrigation.",
    factors: ["Yard size", "Design complexity", "Plant selection", "Hardscaping elements", "Irrigation needs", "Drainage requirements", "Soil conditions"],
    faqs: [
      { q: "How much does basic landscaping cost?", a: "Basic cleanup and planting runs $500-3,000. A full landscape design with installation for a typical yard costs $5,000-15,000." },
      { q: "What is the cheapest landscaping option?", a: "Mulch beds with native plants and seed grass are the most budget-friendly. Expect $1,000-3,000 for a basic front yard makeover." },
      { q: "Does landscaping increase home value?", a: "Good landscaping can increase property value by 5-12%. A well-maintained lawn and mature trees have the highest impact on curb appeal." },
    ],
  },
  // --- Additional services with shorter definitions ---
  { slug: "concrete-paving", name: "Concrete & Paving", category: "Concrete", baseLow: 2000, baseHigh: 10000, baseAvg: 5500, unit: "per project", searchTerms: ["concrete driveway", "paving", "concrete work"], description: "Concrete work including driveways, patios, walkways, and foundations.", factors: ["Square footage", "Concrete thickness", "Reinforcement", "Finish type", "Site prep"], faqs: [{ q: "How much does a concrete driveway cost?", a: "A standard 2-car concrete driveway costs $3,000-7,000 for basic finish. Stamped or colored concrete adds 30-50% to the cost." }, { q: "How long does concrete last?", a: "A properly installed and maintained concrete driveway lasts 25-50 years." }] },
  { slug: "window-replacement", name: "Window Replacement", category: "Windows", baseLow: 300, baseHigh: 1500, baseAvg: 750, unit: "per window", searchTerms: ["window replacement", "new windows", "window installation"], description: "Replacement of existing windows with new energy-efficient units.", factors: ["Window size", "Frame material", "Glass type", "Number of windows", "Accessibility"], faqs: [{ q: "How many windows can be replaced in a day?", a: "A crew can typically replace 8-15 windows in a day for standard installations." }, { q: "Are replacement windows worth it?", a: "Energy-efficient windows can reduce heating/cooling costs by 10-25% and improve comfort and noise reduction." }] },
  { slug: "siding-installation", name: "Siding Installation", category: "Siding", baseLow: 5000, baseHigh: 18000, baseAvg: 11000, unit: "per project", searchTerms: ["siding installation", "new siding", "vinyl siding", "siding replacement"], description: "Installation of new exterior siding including removal of old material.", factors: ["Home size", "Material choice", "Stories", "Trim work", "Insulation"], faqs: [{ q: "What is the cheapest siding option?", a: "Vinyl siding is the most affordable at $3-8 per sq ft installed." }, { q: "How long does siding last?", a: "Vinyl lasts 20-40 years, fiber cement 30-50 years, and wood 15-30 years with maintenance." }] },
  { slug: "gutter-installation", name: "Gutter Installation", category: "Gutters", baseLow: 800, baseHigh: 4000, baseAvg: 2000, unit: "per project", searchTerms: ["gutter installation", "new gutters", "seamless gutters"], description: "Installation of rain gutters and downspouts.", factors: ["Linear footage", "Material", "Stories", "Gutter guards"], faqs: [{ q: "How much do gutters cost per foot?", a: "Aluminum gutters cost $6-12 per linear foot installed. Seamless gutters run $8-15 per foot." }] },
  { slug: "insulation", name: "Insulation", category: "Insulation", baseLow: 1000, baseHigh: 5000, baseAvg: 2500, unit: "per project", searchTerms: ["insulation", "attic insulation", "spray foam insulation"], description: "Installation of home insulation in attics, walls, and crawl spaces.", factors: ["Area to insulate", "Insulation type", "R-value needed", "Accessibility"], faqs: [{ q: "What insulation has the best R-value?", a: "Spray foam offers the highest R-value per inch at R-6 to R-7. Fiberglass batts offer R-3 to R-4 per inch." }] },
  { slug: "solar-panel-installation", name: "Solar Panel Installation", category: "Solar", baseLow: 12000, baseHigh: 30000, baseAvg: 20000, unit: "per system", searchTerms: ["solar panels", "solar installation", "solar energy"], description: "Installation of residential solar panel system including panels, inverter, and mounting.", factors: ["System size (kW)", "Panel efficiency", "Roof condition", "Shading", "Local incentives"], faqs: [{ q: "How much do solar panels save?", a: "A typical system saves $100-200/month on electricity. Payback period is usually 7-12 years." }] },
  { slug: "pool-construction", name: "Pool Construction", category: "Pool", baseLow: 25000, baseHigh: 65000, baseAvg: 40000, unit: "per project", searchTerms: ["pool construction", "inground pool", "swimming pool builder"], description: "Construction of an inground swimming pool including excavation, shell, and equipment.", factors: ["Pool size", "Pool type (concrete, fiberglass, vinyl)", "Features", "Decking", "Fencing"], faqs: [{ q: "How long does pool construction take?", a: "Fiberglass pools take 2-4 weeks. Concrete pools take 8-16 weeks." }] },
  { slug: "deck-construction", name: "Deck Construction", category: "Deck", baseLow: 4000, baseHigh: 15000, baseAvg: 8500, unit: "per project", searchTerms: ["deck construction", "new deck", "deck builder", "patio"], description: "Construction of a wood or composite deck including framing, decking, and railing.", factors: ["Square footage", "Material", "Height", "Railing style", "Features"], faqs: [{ q: "How much does a deck cost per square foot?", a: "Pressure-treated wood decks cost $15-25/sq ft. Composite decks run $25-45/sq ft, both installed." }] },
  { slug: "garage-door", name: "Garage Door Installation", category: "Garage", baseLow: 800, baseHigh: 4000, baseAvg: 2200, unit: "per door", searchTerms: ["garage door", "garage door installation", "garage door replacement"], description: "Installation of a new garage door including tracks, springs, and opener.", factors: ["Door size", "Material", "Insulation", "Opener type", "Windows"], faqs: [{ q: "How long does a garage door last?", a: "A quality garage door lasts 15-30 years. Springs typically need replacement every 7-12 years." }] },
  { slug: "water-heater", name: "Water Heater Installation", category: "Plumbing", baseLow: 800, baseHigh: 3500, baseAvg: 1800, unit: "per unit", searchTerms: ["water heater", "water heater installation", "tankless water heater"], description: "Installation of a new water heater including removal of old unit and connections.", factors: ["Type (tank vs. tankless)", "Fuel type", "Capacity", "Efficiency rating"], faqs: [{ q: "Tank or tankless — which is better?", a: "Tankless costs more upfront ($2,000-4,500 vs $800-2,000) but saves 20-30% on energy and lasts 20+ years vs 10-15 for tank models." }] },
  { slug: "foundation-repair", name: "Foundation Repair", category: "Foundation", baseLow: 2000, baseHigh: 15000, baseAvg: 5500, unit: "per project", searchTerms: ["foundation repair", "foundation crack", "foundation leveling"], description: "Repair of structural foundation issues including cracks, settling, and waterproofing.", factors: ["Severity of damage", "Repair method", "Foundation type", "Access"], faqs: [{ q: "How do I know if I need foundation repair?", a: "Signs include: doors/windows that stick, cracks in walls wider than 1/4 inch, uneven floors, and gaps between walls and ceiling." }] },
  { slug: "tree-service", name: "Tree Service", category: "Tree Service", baseLow: 200, baseHigh: 3000, baseAvg: 900, unit: "per tree", searchTerms: ["tree removal", "tree trimming", "tree service", "arborist"], description: "Tree trimming, removal, stump grinding, and emergency services.", factors: ["Tree size", "Location", "Complexity", "Stump removal", "Emergency timing"], faqs: [{ q: "How much does tree removal cost?", a: "Small trees (under 30 ft) cost $200-500. Medium trees $500-1,000. Large trees $1,000-3,000+." }] },
  { slug: "pest-control", name: "Pest Control", category: "Pest Control", baseLow: 100, baseHigh: 1000, baseAvg: 350, unit: "per treatment", searchTerms: ["pest control", "exterminator", "termite treatment", "bug spray"], description: "Professional pest treatment and prevention for common household pests.", factors: ["Pest type", "Infestation severity", "Home size", "Treatment method", "Ongoing plan"], faqs: [{ q: "How often should I get pest control?", a: "Quarterly treatments are standard for general prevention. Monthly may be needed in high-pest areas or for active infestations." }] },
  { slug: "pressure-washing", name: "Pressure Washing", category: "Cleaning", baseLow: 150, baseHigh: 800, baseAvg: 350, unit: "per job", searchTerms: ["pressure washing", "power washing", "house washing"], description: "Professional pressure washing of driveways, siding, decks, and patios.", factors: ["Surface area", "Surface type", "Stain severity", "Height"], faqs: [{ q: "How often should I pressure wash my house?", a: "Most homes benefit from annual pressure washing. Driveways and patios may need it every 1-2 years." }] },
  { slug: "drywall-repair", name: "Drywall Repair", category: "Drywall", baseLow: 200, baseHigh: 2000, baseAvg: 600, unit: "per job", searchTerms: ["drywall repair", "drywall installation", "drywall contractor"], description: "Drywall installation, repair, and finishing including patches, water damage repair, and texturing.", factors: ["Area size", "Damage type", "Texture matching", "Height", "Finishing level"], faqs: [{ q: "Can drywall be repaired or does it need replacement?", a: "Small holes and cracks can be patched for $100-300. Water-damaged or moldy drywall must be cut out and replaced." }] },
  { slug: "stucco-repair", name: "Stucco Repair", category: "Stucco", baseLow: 500, baseHigh: 5000, baseAvg: 2000, unit: "per project", searchTerms: ["stucco repair", "stucco contractor", "stucco patch"], description: "Repair and restoration of exterior stucco including crack filling, patching, and color matching.", factors: ["Damage extent", "Wall height", "Color matching", "Underlying issues"], faqs: [{ q: "Why does stucco crack?", a: "Stucco cracks from foundation settling, temperature changes, moisture intrusion, and improper original installation." }] },
  { slug: "tile-installation", name: "Tile Installation", category: "Tile", baseLow: 1000, baseHigh: 5000, baseAvg: 2500, unit: "per project", searchTerms: ["tile installation", "tile contractor", "tile flooring"], description: "Installation of ceramic, porcelain, or natural stone tile for floors, walls, and backsplashes.", factors: ["Square footage", "Tile type", "Pattern complexity", "Substrate prep", "Grout selection"], faqs: [{ q: "How much does tile installation cost per square foot?", a: "Labor runs $5-15 per sq ft. Total installed cost including material is typically $10-30 per sq ft." }] },
  { slug: "cabinet-refacing", name: "Cabinet Refacing", category: "Cabinets", baseLow: 4000, baseHigh: 12000, baseAvg: 7500, unit: "per kitchen", searchTerms: ["cabinet refacing", "kitchen cabinets", "cabinet refinishing"], description: "Refacing or refinishing existing kitchen cabinets with new doors, drawer fronts, and veneer.", factors: ["Kitchen size", "Door style", "Material choice", "Hardware", "Soft-close upgrades"], faqs: [{ q: "Refacing vs. replacing cabinets — which is better?", a: "Refacing costs 40-60% less than full replacement and takes 3-5 days vs 3-5 weeks. Choose replacement only if the cabinet boxes are damaged or you want a new layout." }] },
  { slug: "home-addition", name: "Home Addition", category: "Addition", baseLow: 20000, baseHigh: 80000, baseAvg: 45000, unit: "per project", searchTerms: ["home addition", "room addition", "house extension"], description: "Construction of new living space added to an existing home.", factors: ["Square footage", "Foundation type", "Finishes", "Plumbing/electrical", "Permits", "Roof tie-in"], faqs: [{ q: "How much does a home addition cost per square foot?", a: "Basic additions run $80-200/sq ft. High-end additions with kitchens or bathrooms can reach $200-400+/sq ft." }] },
  { slug: "demolition", name: "Demolition", category: "Demolition", baseLow: 1000, baseHigh: 15000, baseAvg: 5000, unit: "per project", searchTerms: ["demolition", "demo contractor", "structure removal"], description: "Partial or full demolition of structures including debris removal and site clearing.", factors: ["Structure size", "Material type", "Hazardous materials", "Access", "Disposal costs"], faqs: [{ q: "How much does it cost to demolish a house?", a: "Full house demolition typically costs $5,000-25,000 depending on size, material, and local disposal fees." }] },
];

// Helper: calculate local cost for a service in a metro
export function getLocalCost(service, metro) {
  const idx = metro.costIndex || 1.0;
  return {
    low: Math.round(service.baseLow * idx),
    high: Math.round(service.baseHigh * idx),
    avg: Math.round(service.baseAvg * idx),
  };
}

// Generate all page paths for static generation
export function getAllCostGuideParams() {
  const params = [];
  for (const metro of metros) {
    for (const service of services) {
      params.push({
        metro: metro.slug,
        service: service.slug,
      });
    }
  }
  return params;
}

export function getAllDirectoryParams() {
  const params = [];
  for (const metro of metros) {
    for (const service of services) {
      params.push({
        metro: metro.slug,
        category: service.slug,
      });
    }
  }
  return params;
}

export function getAllMetroParams() {
  return metros.map(m => ({ metro: m.slug }));
}
