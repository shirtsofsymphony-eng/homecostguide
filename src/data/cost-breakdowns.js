// ============================================================
// COST BREAKDOWNS — Detailed line-item data for every service
// Each service has itemized costs, a default project size for
// the calculator, and tier multipliers (budget/mid/premium).
// Local costs are calculated by applying metro costIndex.
// ============================================================

export const costBreakdowns = {
  "roof-replacement": {
    items: [
      { label: "Asphalt shingles", description: "Architectural asphalt shingles with 30-year warranty", lowPerUnit: 1.50, highPerUnit: 4.50, unit: "per sqft", affiliateCategory: "roofing-materials" },
      { label: "Underlayment", description: "Synthetic felt underlayment for moisture barrier", lowPerUnit: 0.40, highPerUnit: 0.90, unit: "per sqft", affiliateCategory: "roofing-materials" },
      { label: "Flashing & drip edge", description: "Metal flashing around penetrations, valleys, and edges", lowPerUnit: 0.30, highPerUnit: 0.70, unit: "per sqft", affiliateCategory: "roofing-materials" },
      { label: "Ridge vents & ventilation", description: "Ridge vent and soffit vent installation", lowPerUnit: 150, highPerUnit: 500, unit: "flat", affiliateCategory: "roofing-materials" },
      { label: "Labor", description: "Professional roofing crew (tear-off, install, cleanup)", lowPerUnit: 2.00, highPerUnit: 4.50, unit: "per sqft", affiliateCategory: null },
      { label: "Old roof tear-off & disposal", description: "Removal of existing shingles and dumpster fees", lowPerUnit: 0.50, highPerUnit: 1.50, unit: "per sqft", affiliateCategory: null },
      { label: "Permits & inspection", description: "Local building permit and inspection fees", lowPerUnit: 200, highPerUnit: 600, unit: "flat", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 2000, unit: "sqft", label: "Roof area (sq ft)" },
    tiers: { budget: 0.80, mid: 1.0, premium: 1.40 },
  },

  "kitchen-remodel": {
    items: [
      { label: "Cabinets", description: "Stock to semi-custom kitchen cabinets", lowPerUnit: 4000, highPerUnit: 18000, unit: "flat", affiliateCategory: "kitchen-cabinets" },
      { label: "Countertops", description: "Laminate, granite, or quartz countertops installed", lowPerUnit: 1500, highPerUnit: 6000, unit: "flat", affiliateCategory: "countertops" },
      { label: "Flooring", description: "Tile, LVP, or hardwood for kitchen area", lowPerUnit: 1000, highPerUnit: 4000, unit: "flat", affiliateCategory: "flooring" },
      { label: "Appliances", description: "Refrigerator, range, dishwasher, microwave package", lowPerUnit: 2000, highPerUnit: 8000, unit: "flat", affiliateCategory: "appliances" },
      { label: "Plumbing fixtures", description: "Sink, faucet, garbage disposal, supply lines", lowPerUnit: 400, highPerUnit: 1500, unit: "flat", affiliateCategory: "plumbing-fixtures" },
      { label: "Electrical & lighting", description: "Under-cabinet lighting, outlets, circuit upgrades", lowPerUnit: 500, highPerUnit: 2000, unit: "flat", affiliateCategory: "lighting" },
      { label: "Backsplash", description: "Tile or stone backsplash material and installation", lowPerUnit: 600, highPerUnit: 2500, unit: "flat", affiliateCategory: "tile" },
      { label: "Labor", description: "General contractor, plumber, electrician labor", lowPerUnit: 4000, highPerUnit: 12000, unit: "flat", affiliateCategory: null },
      { label: "Permits", description: "Building, plumbing, and electrical permits", lowPerUnit: 300, highPerUnit: 1500, unit: "flat", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 1, unit: "project", label: "Kitchen (standard 10x12)" },
    tiers: { budget: 0.70, mid: 1.0, premium: 1.50 },
  },

  "bathroom-remodel": {
    items: [
      { label: "Vanity & sink", description: "Vanity cabinet with countertop and sink basin", lowPerUnit: 300, highPerUnit: 2500, unit: "flat", affiliateCategory: "bathroom-vanities" },
      { label: "Tub/shower", description: "Bathtub or shower pan/surround replacement", lowPerUnit: 500, highPerUnit: 4000, unit: "flat", affiliateCategory: "bath-fixtures" },
      { label: "Tile work", description: "Floor and wall tile material and installation", lowPerUnit: 800, highPerUnit: 4000, unit: "flat", affiliateCategory: "tile" },
      { label: "Toilet", description: "New toilet with installation", lowPerUnit: 200, highPerUnit: 800, unit: "flat", affiliateCategory: "bath-fixtures" },
      { label: "Plumbing fixtures", description: "Faucet, shower valve, supply lines, drain fittings", lowPerUnit: 200, highPerUnit: 1000, unit: "flat", affiliateCategory: "plumbing-fixtures" },
      { label: "Lighting & exhaust fan", description: "Vanity lights, recessed lighting, ventilation fan", lowPerUnit: 200, highPerUnit: 800, unit: "flat", affiliateCategory: "lighting" },
      { label: "Labor", description: "Plumber, tile setter, general contractor labor", lowPerUnit: 2500, highPerUnit: 8000, unit: "flat", affiliateCategory: null },
      { label: "Permits", description: "Plumbing and building permits", lowPerUnit: 150, highPerUnit: 500, unit: "flat", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 1, unit: "project", label: "Bathroom (standard 5x8)" },
    tiers: { budget: 0.70, mid: 1.0, premium: 1.55 },
  },

  "hvac-installation": {
    items: [
      { label: "HVAC equipment", description: "Central AC condenser and air handler/furnace unit", lowPerUnit: 2000, highPerUnit: 6000, unit: "flat", affiliateCategory: "hvac-equipment" },
      { label: "Thermostat", description: "Programmable or smart thermostat", lowPerUnit: 50, highPerUnit: 350, unit: "flat", affiliateCategory: "thermostats" },
      { label: "Ductwork modifications", description: "Duct sealing, new runs, or duct replacement", lowPerUnit: 300, highPerUnit: 2000, unit: "flat", affiliateCategory: null },
      { label: "Refrigerant & line set", description: "Refrigerant charge and copper line set", lowPerUnit: 200, highPerUnit: 600, unit: "flat", affiliateCategory: null },
      { label: "Electrical hookup", description: "Disconnect, wiring, and breaker for new system", lowPerUnit: 200, highPerUnit: 500, unit: "flat", affiliateCategory: null },
      { label: "Labor", description: "Licensed HVAC technician installation (1-2 days)", lowPerUnit: 1500, highPerUnit: 4000, unit: "flat", affiliateCategory: null },
      { label: "Permits & inspection", description: "Mechanical permit and HVAC inspection", lowPerUnit: 150, highPerUnit: 400, unit: "flat", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 1, unit: "system", label: "HVAC system (2,000 sq ft home)" },
    tiers: { budget: 0.80, mid: 1.0, premium: 1.45 },
  },

  "plumbing-repair": {
    items: [
      { label: "Parts & materials", description: "Pipes, fittings, valves, seals, and hardware", lowPerUnit: 30, highPerUnit: 500, unit: "flat", affiliateCategory: "plumbing-fixtures" },
      { label: "Diagnostic/service fee", description: "Trip charge and initial diagnosis", lowPerUnit: 75, highPerUnit: 200, unit: "flat", affiliateCategory: null },
      { label: "Labor", description: "Licensed plumber hourly rate", lowPerUnit: 75, highPerUnit: 200, unit: "per hour", affiliateCategory: null },
      { label: "Specialized equipment", description: "Camera inspection, hydro jetting, pipe locator rental", lowPerUnit: 0, highPerUnit: 500, unit: "flat", affiliateCategory: null },
      { label: "Permits", description: "Required for major plumbing changes (if applicable)", lowPerUnit: 0, highPerUnit: 300, unit: "flat", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 3, unit: "hours", label: "Service time (hours)" },
    tiers: { budget: 0.85, mid: 1.0, premium: 1.30 },
  },

  "electrical-work": {
    items: [
      { label: "Materials & components", description: "Wire, outlets, switches, breakers, boxes, conduit", lowPerUnit: 50, highPerUnit: 800, unit: "flat", affiliateCategory: "electrical-supplies" },
      { label: "Diagnostic/service fee", description: "Trip charge and electrical assessment", lowPerUnit: 75, highPerUnit: 200, unit: "flat", affiliateCategory: null },
      { label: "Labor", description: "Licensed electrician hourly rate", lowPerUnit: 80, highPerUnit: 200, unit: "per hour", affiliateCategory: null },
      { label: "Panel upgrade (if needed)", description: "100A to 200A panel upgrade with new breakers", lowPerUnit: 0, highPerUnit: 2500, unit: "flat", affiliateCategory: null },
      { label: "Permits & inspection", description: "Electrical permit and code inspection", lowPerUnit: 50, highPerUnit: 400, unit: "flat", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 4, unit: "hours", label: "Service time (hours)" },
    tiers: { budget: 0.85, mid: 1.0, premium: 1.35 },
  },

  "interior-painting": {
    items: [
      { label: "Paint", description: "Premium interior latex paint (2 coats)", lowPerUnit: 0.40, highPerUnit: 1.20, unit: "per sqft", affiliateCategory: "paint" },
      { label: "Primer", description: "Stain-blocking primer for prep", lowPerUnit: 0.10, highPerUnit: 0.30, unit: "per sqft", affiliateCategory: "paint" },
      { label: "Supplies", description: "Tape, drop cloths, caulk, sandpaper, rollers", lowPerUnit: 50, highPerUnit: 200, unit: "flat", affiliateCategory: "paint-supplies" },
      { label: "Surface preparation", description: "Patching holes, sanding, caulking gaps", lowPerUnit: 0.20, highPerUnit: 0.60, unit: "per sqft", affiliateCategory: null },
      { label: "Labor", description: "Professional painters (walls, ceilings, trim)", lowPerUnit: 1.00, highPerUnit: 3.00, unit: "per sqft", affiliateCategory: null },
      { label: "Trim & detail work", description: "Baseboards, crown molding, window casings", lowPerUnit: 0.20, highPerUnit: 0.80, unit: "per sqft", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 1500, unit: "sqft", label: "Wall area (sq ft)" },
    tiers: { budget: 0.75, mid: 1.0, premium: 1.40 },
  },

  "flooring-installation": {
    items: [
      { label: "Flooring material", description: "LVP, laminate, hardwood, or tile", lowPerUnit: 2.00, highPerUnit: 10.00, unit: "per sqft", affiliateCategory: "flooring" },
      { label: "Underlayment/adhesive", description: "Foam underlayment or thinset mortar", lowPerUnit: 0.30, highPerUnit: 1.00, unit: "per sqft", affiliateCategory: "flooring" },
      { label: "Transitions & trim", description: "Door transitions, baseboards, quarter round", lowPerUnit: 100, highPerUnit: 500, unit: "flat", affiliateCategory: "flooring" },
      { label: "Subfloor preparation", description: "Leveling, repair, and moisture barrier", lowPerUnit: 0.25, highPerUnit: 1.50, unit: "per sqft", affiliateCategory: null },
      { label: "Old flooring removal", description: "Tear-out and disposal of existing floor", lowPerUnit: 0.50, highPerUnit: 2.00, unit: "per sqft", affiliateCategory: null },
      { label: "Labor", description: "Professional flooring installer", lowPerUnit: 2.00, highPerUnit: 5.00, unit: "per sqft", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 500, unit: "sqft", label: "Floor area (sq ft)" },
    tiers: { budget: 0.75, mid: 1.0, premium: 1.50 },
  },

  "fence-installation": {
    items: [
      { label: "Fence panels/boards", description: "Wood, vinyl, or aluminum fence material", lowPerUnit: 8, highPerUnit: 30, unit: "per linear ft", affiliateCategory: "fencing" },
      { label: "Posts", description: "4x4 or 6x6 pressure-treated or metal posts", lowPerUnit: 3, highPerUnit: 10, unit: "per linear ft", affiliateCategory: "fencing" },
      { label: "Concrete", description: "Concrete mix for post footings", lowPerUnit: 1, highPerUnit: 3, unit: "per linear ft", affiliateCategory: "concrete" },
      { label: "Hardware", description: "Screws, brackets, hinges, post caps", lowPerUnit: 1, highPerUnit: 3, unit: "per linear ft", affiliateCategory: "fencing" },
      { label: "Gates", description: "Single or double gate with hardware", lowPerUnit: 150, highPerUnit: 600, unit: "flat", affiliateCategory: "fencing" },
      { label: "Labor", description: "Fence crew installation", lowPerUnit: 5, highPerUnit: 15, unit: "per linear ft", affiliateCategory: null },
      { label: "Permits", description: "Fence permit (if required)", lowPerUnit: 50, highPerUnit: 300, unit: "flat", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 150, unit: "linear ft", label: "Fence length (linear ft)" },
    tiers: { budget: 0.75, mid: 1.0, premium: 1.45 },
  },

  "landscaping": {
    items: [
      { label: "Plants & trees", description: "Shrubs, perennials, ornamental trees, ground cover", lowPerUnit: 300, highPerUnit: 5000, unit: "flat", affiliateCategory: "plants-garden" },
      { label: "Mulch & soil", description: "Mulch, topsoil, compost, and amendments", lowPerUnit: 100, highPerUnit: 800, unit: "flat", affiliateCategory: "plants-garden" },
      { label: "Sod or seed", description: "New lawn installation (sod or seed)", lowPerUnit: 200, highPerUnit: 2000, unit: "flat", affiliateCategory: "plants-garden" },
      { label: "Hardscaping", description: "Pavers, edging, retaining walls, stone features", lowPerUnit: 0, highPerUnit: 5000, unit: "flat", affiliateCategory: "hardscape" },
      { label: "Irrigation", description: "Sprinkler system or drip irrigation install", lowPerUnit: 0, highPerUnit: 3000, unit: "flat", affiliateCategory: null },
      { label: "Grading & drainage", description: "Soil grading and drainage improvements", lowPerUnit: 200, highPerUnit: 1500, unit: "flat", affiliateCategory: null },
      { label: "Labor", description: "Landscape crew and design fees", lowPerUnit: 500, highPerUnit: 4000, unit: "flat", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 1, unit: "project", label: "Landscape project" },
    tiers: { budget: 0.65, mid: 1.0, premium: 1.60 },
  },

  "concrete-paving": {
    items: [
      { label: "Concrete", description: "Ready-mix concrete delivered and poured", lowPerUnit: 3.00, highPerUnit: 6.00, unit: "per sqft", affiliateCategory: "concrete" },
      { label: "Reinforcement", description: "Rebar, wire mesh, or fiber reinforcement", lowPerUnit: 0.30, highPerUnit: 1.00, unit: "per sqft", affiliateCategory: "concrete" },
      { label: "Gravel base", description: "Compacted gravel sub-base preparation", lowPerUnit: 0.50, highPerUnit: 1.50, unit: "per sqft", affiliateCategory: null },
      { label: "Forms & finishing", description: "Forming, finishing, joints, and curing compound", lowPerUnit: 0.50, highPerUnit: 2.00, unit: "per sqft", affiliateCategory: null },
      { label: "Decorative finish", description: "Stamping, coloring, or exposed aggregate (optional)", lowPerUnit: 0, highPerUnit: 4.00, unit: "per sqft", affiliateCategory: null },
      { label: "Labor", description: "Concrete crew (forming, pouring, finishing)", lowPerUnit: 3.00, highPerUnit: 6.00, unit: "per sqft", affiliateCategory: null },
      { label: "Demolition (if replacing)", description: "Break-out and haul-off of old concrete", lowPerUnit: 0, highPerUnit: 3.00, unit: "per sqft", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 400, unit: "sqft", label: "Concrete area (sq ft)" },
    tiers: { budget: 0.80, mid: 1.0, premium: 1.50 },
  },

  "window-replacement": {
    items: [
      { label: "Window unit", description: "Double-hung or casement vinyl/wood window", lowPerUnit: 150, highPerUnit: 800, unit: "per window", affiliateCategory: "windows" },
      { label: "Low-E glass upgrade", description: "Energy-efficient low-emissivity coating", lowPerUnit: 25, highPerUnit: 75, unit: "per window", affiliateCategory: null },
      { label: "Trim & casing", description: "Interior and exterior trim around window", lowPerUnit: 20, highPerUnit: 100, unit: "per window", affiliateCategory: null },
      { label: "Insulation & flashing", description: "Spray foam insulation and weatherproof flashing", lowPerUnit: 15, highPerUnit: 40, unit: "per window", affiliateCategory: null },
      { label: "Labor", description: "Window installer (removal and installation)", lowPerUnit: 100, highPerUnit: 300, unit: "per window", affiliateCategory: null },
      { label: "Permits", description: "Building permit if required for window changes", lowPerUnit: 0, highPerUnit: 200, unit: "flat", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 8, unit: "windows", label: "Number of windows" },
    tiers: { budget: 0.80, mid: 1.0, premium: 1.50 },
  },

  "siding-installation": {
    items: [
      { label: "Siding material", description: "Vinyl, fiber cement, or wood siding panels", lowPerUnit: 2.00, highPerUnit: 8.00, unit: "per sqft", affiliateCategory: "siding" },
      { label: "House wrap", description: "Weather-resistant barrier (Tyvek or similar)", lowPerUnit: 0.20, highPerUnit: 0.50, unit: "per sqft", affiliateCategory: "siding" },
      { label: "Trim & accessories", description: "J-channel, corner posts, fascia, soffits", lowPerUnit: 0.50, highPerUnit: 2.00, unit: "per sqft", affiliateCategory: "siding" },
      { label: "Insulation board", description: "Rigid foam insulation under siding (optional)", lowPerUnit: 0, highPerUnit: 1.50, unit: "per sqft", affiliateCategory: null },
      { label: "Old siding removal", description: "Tear-off and disposal of existing siding", lowPerUnit: 0.50, highPerUnit: 1.50, unit: "per sqft", affiliateCategory: null },
      { label: "Labor", description: "Siding installation crew", lowPerUnit: 2.00, highPerUnit: 5.00, unit: "per sqft", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 1500, unit: "sqft", label: "Exterior wall area (sq ft)" },
    tiers: { budget: 0.80, mid: 1.0, premium: 1.45 },
  },

  "gutter-installation": {
    items: [
      { label: "Gutters", description: "5-inch or 6-inch seamless aluminum gutters", lowPerUnit: 4, highPerUnit: 10, unit: "per linear ft", affiliateCategory: "gutters" },
      { label: "Downspouts", description: "Downspouts with elbows and brackets", lowPerUnit: 4, highPerUnit: 12, unit: "per downspout", affiliateCategory: "gutters" },
      { label: "Gutter guards", description: "Leaf guards or micro-mesh screens (optional)", lowPerUnit: 0, highPerUnit: 8, unit: "per linear ft", affiliateCategory: "gutters" },
      { label: "Hangers & hardware", description: "Hidden hangers, end caps, miters, sealant", lowPerUnit: 1, highPerUnit: 3, unit: "per linear ft", affiliateCategory: null },
      { label: "Fascia repair", description: "Repair rotted fascia board (if needed)", lowPerUnit: 0, highPerUnit: 5, unit: "per linear ft", affiliateCategory: null },
      { label: "Labor", description: "Gutter installation crew", lowPerUnit: 3, highPerUnit: 7, unit: "per linear ft", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 150, unit: "linear ft", label: "Gutter length (linear ft)" },
    tiers: { budget: 0.80, mid: 1.0, premium: 1.40 },
  },

  "insulation": {
    items: [
      { label: "Insulation material", description: "Fiberglass batts, blown-in, or spray foam", lowPerUnit: 0.50, highPerUnit: 3.50, unit: "per sqft", affiliateCategory: "insulation" },
      { label: "Vapor barrier", description: "Polyethylene sheeting for moisture control", lowPerUnit: 0.10, highPerUnit: 0.30, unit: "per sqft", affiliateCategory: "insulation" },
      { label: "Air sealing", description: "Caulking and foam sealing around penetrations", lowPerUnit: 100, highPerUnit: 500, unit: "flat", affiliateCategory: null },
      { label: "Old insulation removal", description: "Removal and disposal of existing insulation", lowPerUnit: 0, highPerUnit: 1.50, unit: "per sqft", affiliateCategory: null },
      { label: "Labor", description: "Insulation installer crew", lowPerUnit: 0.50, highPerUnit: 2.50, unit: "per sqft", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 1000, unit: "sqft", label: "Insulation area (sq ft)" },
    tiers: { budget: 0.80, mid: 1.0, premium: 1.50 },
  },

  "solar-panel-installation": {
    items: [
      { label: "Solar panels", description: "Monocrystalline solar panels (350-400W each)", lowPerUnit: 4000, highPerUnit: 12000, unit: "flat", affiliateCategory: "solar" },
      { label: "Inverter", description: "String inverter or microinverters", lowPerUnit: 1000, highPerUnit: 4000, unit: "flat", affiliateCategory: "solar" },
      { label: "Mounting & racking", description: "Roof-mount racking system and hardware", lowPerUnit: 1000, highPerUnit: 3000, unit: "flat", affiliateCategory: null },
      { label: "Electrical", description: "Wiring, conduit, disconnect, and meter work", lowPerUnit: 1000, highPerUnit: 3000, unit: "flat", affiliateCategory: null },
      { label: "Monitoring system", description: "Production monitoring hardware and software", lowPerUnit: 0, highPerUnit: 500, unit: "flat", affiliateCategory: null },
      { label: "Labor", description: "Solar installation crew (2-3 days)", lowPerUnit: 3000, highPerUnit: 6000, unit: "flat", affiliateCategory: null },
      { label: "Permits & interconnection", description: "Building permit, electrical permit, utility interconnection", lowPerUnit: 500, highPerUnit: 2000, unit: "flat", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 1, unit: "system", label: "Solar system (6kW typical)" },
    tiers: { budget: 0.80, mid: 1.0, premium: 1.35 },
  },

  "pool-construction": {
    items: [
      { label: "Pool shell", description: "Fiberglass, vinyl liner, or gunite/concrete pool shell", lowPerUnit: 10000, highPerUnit: 30000, unit: "flat", affiliateCategory: null },
      { label: "Excavation", description: "Digging, hauling dirt, and site prep", lowPerUnit: 2000, highPerUnit: 8000, unit: "flat", affiliateCategory: null },
      { label: "Plumbing & filtration", description: "Pump, filter, heater, and plumbing lines", lowPerUnit: 2000, highPerUnit: 5000, unit: "flat", affiliateCategory: null },
      { label: "Electrical", description: "Subpanel, pump wiring, lighting, GFCI protection", lowPerUnit: 1500, highPerUnit: 4000, unit: "flat", affiliateCategory: null },
      { label: "Decking/coping", description: "Pool deck surface and coping around pool edge", lowPerUnit: 2000, highPerUnit: 8000, unit: "flat", affiliateCategory: null },
      { label: "Safety fencing", description: "Required pool safety fence with self-closing gate", lowPerUnit: 1000, highPerUnit: 3000, unit: "flat", affiliateCategory: "fencing" },
      { label: "Permits", description: "Pool construction, electrical, and plumbing permits", lowPerUnit: 500, highPerUnit: 2000, unit: "flat", affiliateCategory: null },
      { label: "Labor", description: "Pool builder crew (several weeks)", lowPerUnit: 5000, highPerUnit: 12000, unit: "flat", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 1, unit: "project", label: "Pool (12x24 avg)" },
    tiers: { budget: 0.75, mid: 1.0, premium: 1.50 },
  },

  "deck-construction": {
    items: [
      { label: "Decking boards", description: "Pressure-treated wood or composite decking", lowPerUnit: 3, highPerUnit: 15, unit: "per sqft", affiliateCategory: "decking" },
      { label: "Framing lumber", description: "Joists, beams, ledger board, and posts", lowPerUnit: 2, highPerUnit: 5, unit: "per sqft", affiliateCategory: "lumber" },
      { label: "Concrete footings", description: "Poured or precast concrete pier footings", lowPerUnit: 1, highPerUnit: 3, unit: "per sqft", affiliateCategory: "concrete" },
      { label: "Railing", description: "Wood, composite, or metal railing system", lowPerUnit: 2, highPerUnit: 10, unit: "per sqft", affiliateCategory: "decking" },
      { label: "Stairs", description: "Deck staircase with stringers and treads", lowPerUnit: 200, highPerUnit: 800, unit: "flat", affiliateCategory: null },
      { label: "Hardware", description: "Joist hangers, post brackets, screws, and bolts", lowPerUnit: 1, highPerUnit: 2, unit: "per sqft", affiliateCategory: null },
      { label: "Labor", description: "Deck builder crew", lowPerUnit: 5, highPerUnit: 15, unit: "per sqft", affiliateCategory: null },
      { label: "Permits", description: "Building permit for deck construction", lowPerUnit: 100, highPerUnit: 500, unit: "flat", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 300, unit: "sqft", label: "Deck area (sq ft)" },
    tiers: { budget: 0.75, mid: 1.0, premium: 1.50 },
  },

  "garage-door": {
    items: [
      { label: "Garage door", description: "Single or double insulated steel garage door", lowPerUnit: 400, highPerUnit: 2500, unit: "flat", affiliateCategory: "garage-doors" },
      { label: "Garage door opener", description: "Belt or chain drive opener with remote", lowPerUnit: 150, highPerUnit: 500, unit: "flat", affiliateCategory: "garage-doors" },
      { label: "Tracks & hardware", description: "Track system, springs, cables, rollers", lowPerUnit: 100, highPerUnit: 300, unit: "flat", affiliateCategory: null },
      { label: "Weatherstripping", description: "Bottom seal and side weatherstrip", lowPerUnit: 25, highPerUnit: 75, unit: "flat", affiliateCategory: null },
      { label: "Old door removal", description: "Removal and disposal of existing door", lowPerUnit: 50, highPerUnit: 200, unit: "flat", affiliateCategory: null },
      { label: "Labor", description: "Garage door installer (3-5 hours)", lowPerUnit: 200, highPerUnit: 600, unit: "flat", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 1, unit: "door", label: "Garage door (standard 2-car)" },
    tiers: { budget: 0.80, mid: 1.0, premium: 1.45 },
  },

  "water-heater": {
    items: [
      { label: "Water heater unit", description: "Tank (40-50 gal) or tankless unit", lowPerUnit: 400, highPerUnit: 2500, unit: "flat", affiliateCategory: "water-heaters" },
      { label: "Expansion tank", description: "Thermal expansion tank (code requirement)", lowPerUnit: 30, highPerUnit: 100, unit: "flat", affiliateCategory: "plumbing-fixtures" },
      { label: "Supply lines & fittings", description: "Flex connectors, shut-off valves, fittings", lowPerUnit: 30, highPerUnit: 100, unit: "flat", affiliateCategory: "plumbing-fixtures" },
      { label: "Venting", description: "Flue pipe or power vent (gas units)", lowPerUnit: 0, highPerUnit: 400, unit: "flat", affiliateCategory: null },
      { label: "Old unit removal", description: "Drain, disconnect, and haul away old heater", lowPerUnit: 50, highPerUnit: 200, unit: "flat", affiliateCategory: null },
      { label: "Labor", description: "Licensed plumber installation (3-5 hours)", lowPerUnit: 300, highPerUnit: 800, unit: "flat", affiliateCategory: null },
      { label: "Permits", description: "Plumbing permit for water heater replacement", lowPerUnit: 0, highPerUnit: 150, unit: "flat", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 1, unit: "unit", label: "Water heater (40-50 gal)" },
    tiers: { budget: 0.80, mid: 1.0, premium: 1.50 },
  },

  "foundation-repair": {
    items: [
      { label: "Piers/pilings", description: "Steel push piers or helical piers installed", lowPerUnit: 800, highPerUnit: 2000, unit: "per pier", affiliateCategory: null },
      { label: "Crack repair", description: "Epoxy injection or carbon fiber strap repair", lowPerUnit: 200, highPerUnit: 800, unit: "per crack", affiliateCategory: null },
      { label: "Waterproofing", description: "Interior or exterior waterproofing membrane", lowPerUnit: 0, highPerUnit: 5000, unit: "flat", affiliateCategory: null },
      { label: "Drainage system", description: "French drain or sump pump installation", lowPerUnit: 0, highPerUnit: 3000, unit: "flat", affiliateCategory: null },
      { label: "Excavation", description: "Digging around foundation for access", lowPerUnit: 500, highPerUnit: 3000, unit: "flat", affiliateCategory: null },
      { label: "Labor", description: "Foundation specialist crew", lowPerUnit: 1000, highPerUnit: 5000, unit: "flat", affiliateCategory: null },
      { label: "Engineering report", description: "Structural engineer assessment", lowPerUnit: 300, highPerUnit: 800, unit: "flat", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 6, unit: "piers", label: "Number of piers (typical repair)" },
    tiers: { budget: 0.80, mid: 1.0, premium: 1.40 },
  },

  "tree-service": {
    items: [
      { label: "Tree removal/trimming", description: "Cutting, lowering limbs, and cleanup", lowPerUnit: 150, highPerUnit: 2000, unit: "per tree", affiliateCategory: null },
      { label: "Stump grinding", description: "Grind stump 6-12 inches below grade", lowPerUnit: 75, highPerUnit: 300, unit: "per stump", affiliateCategory: null },
      { label: "Debris hauling", description: "Chipping branches and hauling away wood", lowPerUnit: 50, highPerUnit: 300, unit: "per tree", affiliateCategory: null },
      { label: "Crane rental", description: "Crane for large or difficult-access trees", lowPerUnit: 0, highPerUnit: 1500, unit: "flat", affiliateCategory: null },
      { label: "Labor", description: "Arborist and ground crew", lowPerUnit: 200, highPerUnit: 1000, unit: "per tree", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 1, unit: "tree", label: "Number of trees" },
    tiers: { budget: 0.80, mid: 1.0, premium: 1.35 },
  },

  "pest-control": {
    items: [
      { label: "Initial treatment", description: "First application of pesticide/bait treatment", lowPerUnit: 100, highPerUnit: 500, unit: "flat", affiliateCategory: null },
      { label: "Follow-up treatments", description: "Recurring monthly or quarterly applications", lowPerUnit: 50, highPerUnit: 200, unit: "per visit", affiliateCategory: null },
      { label: "Termite treatment", description: "Liquid barrier or bait station system (if needed)", lowPerUnit: 0, highPerUnit: 2000, unit: "flat", affiliateCategory: null },
      { label: "Exclusion work", description: "Sealing entry points, installing screens", lowPerUnit: 0, highPerUnit: 500, unit: "flat", affiliateCategory: null },
      { label: "Inspection fee", description: "Initial pest inspection and assessment", lowPerUnit: 0, highPerUnit: 150, unit: "flat", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 1, unit: "treatment", label: "Initial treatment" },
    tiers: { budget: 0.80, mid: 1.0, premium: 1.30 },
  },

  "pressure-washing": {
    items: [
      { label: "Equipment & chemicals", description: "Pressure washer, hoses, detergent, surface cleaner", lowPerUnit: 0.05, highPerUnit: 0.15, unit: "per sqft", affiliateCategory: "pressure-washers" },
      { label: "Driveway/patio", description: "Concrete or paver surface cleaning", lowPerUnit: 0.15, highPerUnit: 0.40, unit: "per sqft", affiliateCategory: null },
      { label: "House siding", description: "Soft wash or pressure wash of exterior walls", lowPerUnit: 0.20, highPerUnit: 0.50, unit: "per sqft", affiliateCategory: null },
      { label: "Deck/fence", description: "Wood surface cleaning with appropriate pressure", lowPerUnit: 0.25, highPerUnit: 0.60, unit: "per sqft", affiliateCategory: null },
      { label: "Labor", description: "Pressure washing technician (2-4 hours typical)", lowPerUnit: 100, highPerUnit: 300, unit: "flat", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 1000, unit: "sqft", label: "Total area to wash (sq ft)" },
    tiers: { budget: 0.80, mid: 1.0, premium: 1.30 },
  },

  "drywall-repair": {
    items: [
      { label: "Drywall sheets", description: "1/2-inch or 5/8-inch gypsum board panels", lowPerUnit: 0.30, highPerUnit: 0.80, unit: "per sqft", affiliateCategory: "drywall" },
      { label: "Joint compound & tape", description: "Mud, paper tape, and mesh tape", lowPerUnit: 0.10, highPerUnit: 0.30, unit: "per sqft", affiliateCategory: "drywall" },
      { label: "Texture matching", description: "Matching existing wall texture (knockdown, orange peel, etc.)", lowPerUnit: 0.20, highPerUnit: 0.80, unit: "per sqft", affiliateCategory: null },
      { label: "Primer & paint", description: "Primer coat and paint to match existing walls", lowPerUnit: 0.20, highPerUnit: 0.50, unit: "per sqft", affiliateCategory: "paint" },
      { label: "Labor", description: "Drywall finisher (hang, tape, mud, sand, texture)", lowPerUnit: 1.00, highPerUnit: 3.00, unit: "per sqft", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 200, unit: "sqft", label: "Drywall area (sq ft)" },
    tiers: { budget: 0.80, mid: 1.0, premium: 1.35 },
  },

  "stucco-repair": {
    items: [
      { label: "Stucco mix", description: "Base coat and finish coat stucco material", lowPerUnit: 1.00, highPerUnit: 3.00, unit: "per sqft", affiliateCategory: "stucco" },
      { label: "Metal lath & mesh", description: "Reinforcement mesh for stucco application", lowPerUnit: 0.30, highPerUnit: 0.80, unit: "per sqft", affiliateCategory: "stucco" },
      { label: "Color matching", description: "Pigment matching and blending to existing finish", lowPerUnit: 100, highPerUnit: 400, unit: "flat", affiliateCategory: null },
      { label: "Moisture barrier repair", description: "Paper or membrane behind stucco (if compromised)", lowPerUnit: 0, highPerUnit: 2.00, unit: "per sqft", affiliateCategory: null },
      { label: "Scaffolding", description: "Scaffolding rental for upper-story work", lowPerUnit: 0, highPerUnit: 500, unit: "flat", affiliateCategory: null },
      { label: "Labor", description: "Stucco mason (prep, apply, finish, cure)", lowPerUnit: 3.00, highPerUnit: 8.00, unit: "per sqft", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 200, unit: "sqft", label: "Repair area (sq ft)" },
    tiers: { budget: 0.80, mid: 1.0, premium: 1.40 },
  },

  "tile-installation": {
    items: [
      { label: "Tile material", description: "Ceramic, porcelain, or natural stone tile", lowPerUnit: 2.00, highPerUnit: 15.00, unit: "per sqft", affiliateCategory: "tile" },
      { label: "Thinset & grout", description: "Modified thinset mortar and sanded/unsanded grout", lowPerUnit: 0.50, highPerUnit: 1.50, unit: "per sqft", affiliateCategory: "tile" },
      { label: "Backer board", description: "Cement backer board for wet areas", lowPerUnit: 0.30, highPerUnit: 0.80, unit: "per sqft", affiliateCategory: "tile" },
      { label: "Waterproofing membrane", description: "Liquid or sheet membrane for showers/wet areas", lowPerUnit: 0, highPerUnit: 2.00, unit: "per sqft", affiliateCategory: null },
      { label: "Trim & transitions", description: "Bullnose tile, Schluter strips, transition pieces", lowPerUnit: 0.30, highPerUnit: 1.50, unit: "per sqft", affiliateCategory: "tile" },
      { label: "Substrate preparation", description: "Floor leveling, crack isolation, membrane", lowPerUnit: 0.25, highPerUnit: 1.00, unit: "per sqft", affiliateCategory: null },
      { label: "Labor", description: "Tile setter (layout, cut, set, grout, seal)", lowPerUnit: 4.00, highPerUnit: 10.00, unit: "per sqft", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 150, unit: "sqft", label: "Tile area (sq ft)" },
    tiers: { budget: 0.75, mid: 1.0, premium: 1.50 },
  },

  "cabinet-refacing": {
    items: [
      { label: "New doors & drawer fronts", description: "Replacement cabinet doors and drawer faces", lowPerUnit: 2000, highPerUnit: 6000, unit: "flat", affiliateCategory: "kitchen-cabinets" },
      { label: "Veneer/laminate", description: "Veneer or laminate covering for cabinet boxes", lowPerUnit: 500, highPerUnit: 2000, unit: "flat", affiliateCategory: "kitchen-cabinets" },
      { label: "Hardware", description: "New hinges, pulls, knobs, and soft-close hardware", lowPerUnit: 200, highPerUnit: 800, unit: "flat", affiliateCategory: "cabinet-hardware" },
      { label: "Molding & trim", description: "Crown molding, light rail, filler strips", lowPerUnit: 100, highPerUnit: 500, unit: "flat", affiliateCategory: null },
      { label: "Labor", description: "Cabinet refacing specialist (3-5 days)", lowPerUnit: 1500, highPerUnit: 4000, unit: "flat", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 1, unit: "kitchen", label: "Kitchen (20-30 doors typical)" },
    tiers: { budget: 0.75, mid: 1.0, premium: 1.45 },
  },

  "home-addition": {
    items: [
      { label: "Foundation", description: "Slab, crawlspace, or basement foundation", lowPerUnit: 10, highPerUnit: 30, unit: "per sqft", affiliateCategory: null },
      { label: "Framing", description: "Walls, roof tie-in, headers, and sheathing", lowPerUnit: 12, highPerUnit: 25, unit: "per sqft", affiliateCategory: "lumber" },
      { label: "Roofing", description: "New roof section tied into existing roof", lowPerUnit: 5, highPerUnit: 15, unit: "per sqft", affiliateCategory: "roofing-materials" },
      { label: "Exterior finish", description: "Siding, windows, and exterior trim to match", lowPerUnit: 8, highPerUnit: 20, unit: "per sqft", affiliateCategory: null },
      { label: "Electrical", description: "New circuits, outlets, lighting, panel capacity", lowPerUnit: 5, highPerUnit: 15, unit: "per sqft", affiliateCategory: null },
      { label: "Plumbing (if applicable)", description: "Water/drain lines for bath or kitchen addition", lowPerUnit: 0, highPerUnit: 25, unit: "per sqft", affiliateCategory: null },
      { label: "HVAC extension", description: "Duct runs and tonnage increase for new space", lowPerUnit: 3, highPerUnit: 10, unit: "per sqft", affiliateCategory: null },
      { label: "Interior finish", description: "Drywall, paint, flooring, trim, doors", lowPerUnit: 10, highPerUnit: 30, unit: "per sqft", affiliateCategory: null },
      { label: "Permits & engineering", description: "Building permit, structural engineering, plan review", lowPerUnit: 1000, highPerUnit: 5000, unit: "flat", affiliateCategory: null },
      { label: "General contractor overhead", description: "Project management, coordination, insurance", lowPerUnit: 8, highPerUnit: 20, unit: "per sqft", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 300, unit: "sqft", label: "Addition size (sq ft)" },
    tiers: { budget: 0.75, mid: 1.0, premium: 1.55 },
  },

  "demolition": {
    items: [
      { label: "Structural demolition", description: "Tear-down of walls, floors, roof structure", lowPerUnit: 2.00, highPerUnit: 8.00, unit: "per sqft", affiliateCategory: null },
      { label: "Hazmat abatement", description: "Asbestos, lead paint testing and removal (if present)", lowPerUnit: 0, highPerUnit: 5000, unit: "flat", affiliateCategory: null },
      { label: "Dumpster rental", description: "Roll-off dumpster for debris (20-40 yard)", lowPerUnit: 300, highPerUnit: 800, unit: "flat", affiliateCategory: null },
      { label: "Hauling & disposal", description: "Trucking debris to landfill, disposal fees", lowPerUnit: 1.00, highPerUnit: 4.00, unit: "per sqft", affiliateCategory: null },
      { label: "Utility disconnection", description: "Disconnect gas, electric, water, sewer", lowPerUnit: 200, highPerUnit: 800, unit: "flat", affiliateCategory: null },
      { label: "Site cleanup & grading", description: "Final grading and debris cleanup", lowPerUnit: 0.50, highPerUnit: 2.00, unit: "per sqft", affiliateCategory: null },
      { label: "Labor", description: "Demo crew with equipment", lowPerUnit: 2.00, highPerUnit: 6.00, unit: "per sqft", affiliateCategory: null },
      { label: "Permits", description: "Demolition permit from city", lowPerUnit: 100, highPerUnit: 500, unit: "flat", affiliateCategory: null },
    ],
    defaultProjectSize: { value: 1000, unit: "sqft", label: "Demo area (sq ft)" },
    tiers: { budget: 0.80, mid: 1.0, premium: 1.35 },
  },
};

// Helper: calculate total cost for a service breakdown adjusted by costIndex and tier
export function calculateBreakdown(serviceSlug, costIndex = 1.0, projectSize = null, tier = 'mid') {
  const breakdown = costBreakdowns[serviceSlug];
  if (!breakdown) return null;

  const size = projectSize || breakdown.defaultProjectSize.value;
  const tierMultiplier = breakdown.tiers[tier] || 1.0;

  const items = breakdown.items.map(item => {
    const isFlat = item.unit === 'flat';
    const isPerUnit = !isFlat;

    const low = Math.round((isPerUnit ? item.lowPerUnit * size : item.lowPerUnit) * costIndex * tierMultiplier);
    const high = Math.round((isPerUnit ? item.highPerUnit * size : item.highPerUnit) * costIndex * tierMultiplier);
    const mid = Math.round((low + high) / 2);

    return { ...item, low, mid, high };
  });

  const totalLow = items.reduce((sum, i) => sum + i.low, 0);
  const totalHigh = items.reduce((sum, i) => sum + i.high, 0);
  const totalMid = Math.round((totalLow + totalHigh) / 2);

  return { items, totalLow, totalMid, totalHigh, projectSize: size, tier, unit: breakdown.defaultProjectSize.unit };
}
