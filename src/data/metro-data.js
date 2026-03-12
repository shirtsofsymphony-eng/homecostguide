// ============================================================
// METRO DATA — Per-city enrichment data
// Licensing, sales tax, climate zones, seasonal notes,
// and API codes for BLS/Census data fetching.
// ============================================================

export const metroData = {
  "houston-tx": {
    salesTaxRate: 0.0825,
    licensing: {
      requiresStateLicense: false,
      threshold: null,
      description: "Texas does not require a state-level general contractor license. Some cities like Houston require registration. Specialty trades (plumbing, electrical, HVAC) require state licenses.",
      lookupUrl: "https://www.tdlr.texas.gov/",
      board: "Texas Department of Licensing and Regulation",
    },
    climateZone: "2A",
    climateLabel: "Hot-Humid",
    bestMonths: [10, 11, 12, 1, 2, 3],
    worstMonths: [6, 7, 8],
    seasonalNote: "Houston summers are extreme (95\u00B0F+ with high humidity), making outdoor work difficult June through September. Fall through early spring offers the best conditions for exterior projects. Hurricane season (June-November) can delay roofing and exterior work.",
    blsMsaCode: "26420",
    censusPlaceCode: "4835000",
  },

  "dallas-tx": {
    salesTaxRate: 0.0825,
    licensing: {
      requiresStateLicense: false,
      threshold: null,
      description: "Texas does not require a state-level general contractor license. Dallas requires general contractor registration. Specialty trades require state licenses.",
      lookupUrl: "https://www.tdlr.texas.gov/",
      board: "Texas Department of Licensing and Regulation",
    },
    climateZone: "3A",
    climateLabel: "Mixed-Humid",
    bestMonths: [3, 4, 5, 10, 11],
    worstMonths: [7, 8],
    seasonalNote: "Dallas has hot summers (100\u00B0F+) but milder winters than northern cities. Spring and fall are ideal for most projects. Severe storms and hail in spring can create urgent roofing demand.",
    blsMsaCode: "19100",
    censusPlaceCode: "4819000",
  },

  "phoenix-az": {
    salesTaxRate: 0.056,
    licensing: {
      requiresStateLicense: true,
      threshold: 1000,
      description: "Arizona requires a contractor license from the Registrar of Contractors for any project over $1,000 including labor and materials. Dual licensing for residential and commercial.",
      lookupUrl: "https://roc.az.gov/",
      board: "Arizona Registrar of Contractors",
    },
    climateZone: "2B",
    climateLabel: "Hot-Dry",
    bestMonths: [10, 11, 12, 1, 2, 3],
    worstMonths: [6, 7, 8],
    seasonalNote: "Phoenix summers exceed 110\u00B0F, making outdoor work dangerous June through September. Concrete pours require special timing to avoid rapid curing. Winter and early spring are peak construction season.",
    blsMsaCode: "38060",
    censusPlaceCode: "0455000",
  },

  "san-antonio-tx": {
    salesTaxRate: 0.08125,
    licensing: {
      requiresStateLicense: false,
      threshold: null,
      description: "Texas does not require a state-level general contractor license. San Antonio requires contractor registration. Specialty trades require state licenses.",
      lookupUrl: "https://www.tdlr.texas.gov/",
      board: "Texas Department of Licensing and Regulation",
    },
    climateZone: "2A",
    climateLabel: "Hot-Humid",
    bestMonths: [10, 11, 3, 4, 5],
    worstMonths: [7, 8],
    seasonalNote: "San Antonio has mild winters and hot, humid summers. Outdoor projects are best scheduled for fall or spring. Flash flooding is common May through October.",
    blsMsaCode: "41700",
    censusPlaceCode: "4865000",
  },

  "austin-tx": {
    salesTaxRate: 0.0825,
    licensing: {
      requiresStateLicense: false,
      threshold: null,
      description: "Texas does not require a state-level general contractor license. Austin requires contractor registration for work over $10,000. Specialty trades require state licenses.",
      lookupUrl: "https://www.tdlr.texas.gov/",
      board: "Texas Department of Licensing and Regulation",
    },
    climateZone: "2A",
    climateLabel: "Hot-Humid",
    bestMonths: [3, 4, 5, 10, 11],
    worstMonths: [7, 8],
    seasonalNote: "Austin's booming construction market means contractor availability can be tight year-round. Spring and fall offer the best weather. Summer heat regularly exceeds 100\u00B0F.",
    blsMsaCode: "12420",
    censusPlaceCode: "4805000",
  },

  "fort-myers-fl": {
    salesTaxRate: 0.065,
    licensing: {
      requiresStateLicense: true,
      threshold: 0,
      description: "Florida requires state-level contractor licensing through the DBPR for all construction work. Certified and registered license categories. Local competency cards also required in some counties.",
      lookupUrl: "https://www.myfloridalicense.com/",
      board: "Florida Department of Business and Professional Regulation",
    },
    climateZone: "1A",
    climateLabel: "Very Hot-Humid",
    bestMonths: [11, 12, 1, 2, 3, 4],
    worstMonths: [6, 7, 8, 9],
    seasonalNote: "Fort Myers has year-round warm temperatures but intense summer heat and humidity, plus hurricane season (June-November). Dry season (November-April) is ideal for exterior work. Post-hurricane demand can spike prices significantly.",
    blsMsaCode: "15980",
    censusPlaceCode: "1224125",
  },

  "charlotte-nc": {
    salesTaxRate: 0.0725,
    licensing: {
      requiresStateLicense: true,
      threshold: 30000,
      description: "North Carolina requires a general contractor license for projects over $30,000. Licensed through the NC Licensing Board for General Contractors. Specialty trades have separate licensing.",
      lookupUrl: "https://www.nclbgc.org/",
      board: "NC Licensing Board for General Contractors",
    },
    climateZone: "3A",
    climateLabel: "Mixed-Humid",
    bestMonths: [4, 5, 9, 10, 11],
    worstMonths: [1, 2, 7],
    seasonalNote: "Charlotte has four distinct seasons with mild winters and warm summers. Spring and fall are ideal for most projects. Brief winter freezes can delay concrete and masonry work.",
    blsMsaCode: "16740",
    censusPlaceCode: "3712000",
  },

  "nashville-tn": {
    salesTaxRate: 0.0975,
    licensing: {
      requiresStateLicense: true,
      threshold: 25000,
      description: "Tennessee requires a contractor license for projects over $25,000. Licensed through the Board for Licensing Contractors. Home improvement contractors need a separate registration.",
      lookupUrl: "https://www.tn.gov/commerce/regboards/contractor.html",
      board: "Tennessee Board for Licensing Contractors",
    },
    climateZone: "4A",
    climateLabel: "Mixed-Humid",
    bestMonths: [4, 5, 9, 10],
    worstMonths: [1, 2, 7, 8],
    seasonalNote: "Nashville has hot, humid summers and cool winters. Spring and fall offer ideal conditions. Nashville's rapid growth means strong contractor demand year-round.",
    blsMsaCode: "34980",
    censusPlaceCode: "4752006",
  },

  "raleigh-nc": {
    salesTaxRate: 0.0725,
    licensing: {
      requiresStateLicense: true,
      threshold: 30000,
      description: "North Carolina requires a general contractor license for projects over $30,000. Licensed through the NC Licensing Board for General Contractors.",
      lookupUrl: "https://www.nclbgc.org/",
      board: "NC Licensing Board for General Contractors",
    },
    climateZone: "4A",
    climateLabel: "Mixed-Humid",
    bestMonths: [4, 5, 9, 10, 11],
    worstMonths: [1, 7, 8],
    seasonalNote: "Raleigh-Durham enjoys a moderate climate with four seasons. Spring and fall are best for exterior work. Summer humidity affects paint drying and concrete curing times.",
    blsMsaCode: "39580",
    censusPlaceCode: "3755000",
  },

  "boise-id": {
    salesTaxRate: 0.06,
    licensing: {
      requiresStateLicense: true,
      threshold: 0,
      description: "Idaho requires contractor registration through the Idaho Contractor Board for all construction work. Public works projects require additional licensing.",
      lookupUrl: "https://icb.idaho.gov/",
      board: "Idaho Contractors Board",
    },
    climateZone: "5B",
    climateLabel: "Cool-Dry",
    bestMonths: [5, 6, 7, 8, 9],
    worstMonths: [12, 1, 2],
    seasonalNote: "Boise has cold, snowy winters and dry summers. The construction season is compressed to May through October. Winter temperatures regularly drop below freezing, stopping exterior work.",
    blsMsaCode: "14260",
    censusPlaceCode: "1608830",
  },

  "tampa-fl": {
    salesTaxRate: 0.075,
    licensing: {
      requiresStateLicense: true,
      threshold: 0,
      description: "Florida requires state-level contractor licensing through the DBPR for all construction work. Both certified and registered license categories are available.",
      lookupUrl: "https://www.myfloridalicense.com/",
      board: "Florida Department of Business and Professional Regulation",
    },
    climateZone: "2A",
    climateLabel: "Hot-Humid",
    bestMonths: [11, 12, 1, 2, 3, 4],
    worstMonths: [6, 7, 8, 9],
    seasonalNote: "Tampa has warm weather year-round but intense summer heat, afternoon thunderstorms, and hurricane season (June-November). Dry season (November-April) is best for exterior projects.",
    blsMsaCode: "45300",
    censusPlaceCode: "1271000",
  },

  "denver-co": {
    salesTaxRate: 0.0877,
    licensing: {
      requiresStateLicense: false,
      threshold: null,
      description: "Colorado does not require a state-level general contractor license. Denver and most jurisdictions require local contractor licensing. Plumbing, electrical, and mechanical trades require state licenses.",
      lookupUrl: "https://dpo.colorado.gov/",
      board: "Colorado Department of Regulatory Agencies",
    },
    climateZone: "5B",
    climateLabel: "Cool-Dry",
    bestMonths: [5, 6, 7, 8, 9],
    worstMonths: [12, 1, 2],
    seasonalNote: "Denver has cold winters with snow and dry, sunny summers. The building season is May through October. Spring snowstorms can delay early-season projects. High altitude affects concrete curing.",
    blsMsaCode: "19740",
    censusPlaceCode: "0820000",
  },

  "atlanta-ga": {
    salesTaxRate: 0.0890,
    licensing: {
      requiresStateLicense: true,
      threshold: 2500,
      description: "Georgia requires residential and general contractor licensing for projects over $2,500. Licensed through the Secretary of State's office. Specialty trades (plumbing, electrical, HVAC) require separate licenses.",
      lookupUrl: "https://sos.ga.gov/PLB/",
      board: "Georgia Secretary of State - Professional Licensing Board",
    },
    climateZone: "3A",
    climateLabel: "Mixed-Humid",
    bestMonths: [3, 4, 5, 10, 11],
    worstMonths: [7, 8],
    seasonalNote: "Atlanta has hot, humid summers and mild winters. Spring and fall are ideal for construction. Winter rarely gets cold enough to stop work entirely, making Atlanta a strong year-round market.",
    blsMsaCode: "12060",
    censusPlaceCode: "1304000",
  },

  "orlando-fl": {
    salesTaxRate: 0.065,
    licensing: {
      requiresStateLicense: true,
      threshold: 0,
      description: "Florida requires state-level contractor licensing through the DBPR for all construction work. Certified and registered license categories available.",
      lookupUrl: "https://www.myfloridalicense.com/",
      board: "Florida Department of Business and Professional Regulation",
    },
    climateZone: "2A",
    climateLabel: "Hot-Humid",
    bestMonths: [11, 12, 1, 2, 3],
    worstMonths: [6, 7, 8, 9],
    seasonalNote: "Orlando has subtropical weather with hot, humid summers and mild winters. Hurricane season (June-November) can disrupt exterior projects. Dry winter months are best for major work.",
    blsMsaCode: "36740",
    censusPlaceCode: "1253000",
  },

  "jacksonville-fl": {
    salesTaxRate: 0.075,
    licensing: {
      requiresStateLicense: true,
      threshold: 0,
      description: "Florida requires state-level contractor licensing through the DBPR for all construction work. Jacksonville also accepts locally registered contractors.",
      lookupUrl: "https://www.myfloridalicense.com/",
      board: "Florida Department of Business and Professional Regulation",
    },
    climateZone: "2A",
    climateLabel: "Hot-Humid",
    bestMonths: [10, 11, 12, 3, 4],
    worstMonths: [6, 7, 8],
    seasonalNote: "Jacksonville has warm year-round weather with hot, humid summers. Fall through spring is ideal for outdoor projects. As the largest city by area in the contiguous US, travel time affects contractor pricing.",
    blsMsaCode: "27260",
    censusPlaceCode: "1235000",
  },

  "las-vegas-nv": {
    salesTaxRate: 0.0838,
    licensing: {
      requiresStateLicense: true,
      threshold: 0,
      description: "Nevada requires all contractors to be licensed through the Nevada State Contractors Board. Monetary limits are set by license classification. A separate business license is also required.",
      lookupUrl: "https://www.nscb.nv.gov/",
      board: "Nevada State Contractors Board",
    },
    climateZone: "3B",
    climateLabel: "Hot-Dry",
    bestMonths: [3, 4, 5, 10, 11],
    worstMonths: [6, 7, 8],
    seasonalNote: "Las Vegas summers exceed 110\u00B0F, making outdoor work dangerous. Spring and fall are ideal. The desert climate means no rain delays but UV exposure degrades some materials faster. Winter is mild enough for year-round interior work.",
    blsMsaCode: "29820",
    censusPlaceCode: "3240000",
  },

  "salt-lake-city-ut": {
    salesTaxRate: 0.0685,
    licensing: {
      requiresStateLicense: true,
      threshold: 0,
      description: "Utah requires contractor licensing through the Division of Professional Licensing (DOPL). General contractors, specialty contractors, and handyman exemptions for projects under $3,000.",
      lookupUrl: "https://dopl.utah.gov/contractor/",
      board: "Utah Division of Professional Licensing",
    },
    climateZone: "5B",
    climateLabel: "Cool-Dry",
    bestMonths: [5, 6, 7, 8, 9],
    worstMonths: [12, 1, 2],
    seasonalNote: "Salt Lake City has cold, snowy winters and warm, dry summers. Construction season runs May through October. Winter ground freezing stops foundation and excavation work. The inversion season (winter smog) can delay some exterior finishing.",
    blsMsaCode: "41620",
    censusPlaceCode: "4967000",
  },

  "columbus-oh": {
    salesTaxRate: 0.075,
    licensing: {
      requiresStateLicense: false,
      threshold: null,
      description: "Ohio does not require a state-level general contractor license. Columbus requires local contractor registration. Specialty trades (plumbing, electrical, HVAC) require state licensing.",
      lookupUrl: "https://com.ohio.gov/divisions-and-programs/industrial-compliance/boards-and-commissions",
      board: "Ohio Department of Commerce - Industrial Compliance",
    },
    climateZone: "4A",
    climateLabel: "Mixed-Humid",
    bestMonths: [5, 6, 9, 10],
    worstMonths: [12, 1, 2],
    seasonalNote: "Columbus has four distinct seasons with cold, snowy winters and warm summers. Spring through fall is the primary building season. Winter ground freezing affects foundation work and excavation.",
    blsMsaCode: "18140",
    censusPlaceCode: "3918000",
  },

  "indianapolis-in": {
    salesTaxRate: 0.07,
    licensing: {
      requiresStateLicense: false,
      threshold: null,
      description: "Indiana does not require a state-level general contractor license. Local jurisdictions may require registration. Plumbing, electrical, and HVAC trades require state licensing.",
      lookupUrl: "https://www.in.gov/pla/",
      board: "Indiana Professional Licensing Agency",
    },
    climateZone: "4A",
    climateLabel: "Mixed-Humid",
    bestMonths: [5, 6, 9, 10],
    worstMonths: [12, 1, 2],
    seasonalNote: "Indianapolis has cold winters and warm, humid summers. Spring and fall are best for exterior projects. Winter temperatures regularly drop below freezing, limiting outdoor work from December through February.",
    blsMsaCode: "26900",
    censusPlaceCode: "1836003",
  },

  "san-diego-ca": {
    salesTaxRate: 0.0775,
    licensing: {
      requiresStateLicense: true,
      threshold: 500,
      description: "California requires a contractor license from the CSLB for any project over $500 including labor and materials. One of the most regulated states for construction. Owner-builder permits available for homeowners.",
      lookupUrl: "https://www.cslb.ca.gov/",
      board: "California Contractors State License Board",
    },
    climateZone: "3B",
    climateLabel: "Warm-Dry",
    bestMonths: [3, 4, 5, 6, 9, 10, 11],
    worstMonths: [],
    seasonalNote: "San Diego has near-perfect year-round construction weather with mild temperatures and minimal rain. Construction can happen any month. However, this drives high demand and higher labor costs compared to national averages.",
    blsMsaCode: "41740",
    censusPlaceCode: "0666000",
  },
};

// Helper: get month name from number
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function getMonthName(num) {
  return monthNames[num - 1] || '';
}

export function getBestMonthsText(metroSlug) {
  const data = metroData[metroSlug];
  if (!data || !data.bestMonths.length) return 'Year-round';
  return data.bestMonths.map(m => getMonthName(m)).join(', ');
}

export function getWorstMonthsText(metroSlug) {
  const data = metroData[metroSlug];
  if (!data || !data.worstMonths.length) return 'None';
  return data.worstMonths.map(m => getMonthName(m)).join(', ');
}
