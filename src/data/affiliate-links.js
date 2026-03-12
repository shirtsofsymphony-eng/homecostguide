// ============================================================
// AFFILIATE LINKS — Maps material categories to retailer URLs
// Update these with your actual affiliate tracking links.
// Categories match the affiliateCategory field in cost-breakdowns.js.
// ============================================================

export const affiliateLinks = {
  "roofing-materials": {
    label: "Shop Roofing Materials",
    url: "https://www.homedepot.com/b/Building-Materials-Roofing/N-5yc1vZar4v",
    retailer: "Home Depot",
  },
  "kitchen-cabinets": {
    label: "Shop Kitchen Cabinets",
    url: "https://www.homedepot.com/b/Kitchen-Kitchen-Cabinets/N-5yc1vZas87",
    retailer: "Home Depot",
  },
  "countertops": {
    label: "Shop Countertops",
    url: "https://www.homedepot.com/b/Kitchen-Countertops/N-5yc1vZar4x",
    retailer: "Home Depot",
  },
  "flooring": {
    label: "Shop Flooring",
    url: "https://www.homedepot.com/b/Flooring/N-5yc1vZaq7r",
    retailer: "Home Depot",
  },
  "appliances": {
    label: "Shop Appliances",
    url: "https://www.homedepot.com/b/Appliances/N-5yc1vZbv09",
    retailer: "Home Depot",
  },
  "plumbing-fixtures": {
    label: "Shop Plumbing Fixtures",
    url: "https://www.homedepot.com/b/Bath-Bathroom-Faucets/N-5yc1vZbzcd",
    retailer: "Home Depot",
  },
  "lighting": {
    label: "Shop Lighting",
    url: "https://www.homedepot.com/b/Lighting/N-5yc1vZbvn5",
    retailer: "Home Depot",
  },
  "tile": {
    label: "Shop Tile",
    url: "https://www.homedepot.com/b/Flooring-Tile/N-5yc1vZaq7t",
    retailer: "Home Depot",
  },
  "bathroom-vanities": {
    label: "Shop Bathroom Vanities",
    url: "https://www.homedepot.com/b/Bath-Bathroom-Vanities/N-5yc1vZbrp4",
    retailer: "Home Depot",
  },
  "bath-fixtures": {
    label: "Shop Bath Fixtures",
    url: "https://www.homedepot.com/b/Bath/N-5yc1vZbzb3",
    retailer: "Home Depot",
  },
  "hvac-equipment": {
    label: "Shop HVAC Systems",
    url: "https://www.homedepot.com/b/Heating-Venting-Cooling/N-5yc1vZc4k8",
    retailer: "Home Depot",
  },
  "thermostats": {
    label: "Shop Thermostats",
    url: "https://www.homedepot.com/b/Heating-Venting-Cooling-Thermostats/N-5yc1vZc4m1",
    retailer: "Home Depot",
  },
  "water-heaters": {
    label: "Shop Water Heaters",
    url: "https://www.homedepot.com/b/Plumbing-Water-Heaters/N-5yc1vZbqp2",
    retailer: "Home Depot",
  },
  "paint": {
    label: "Shop Paint",
    url: "https://www.homedepot.com/b/Paint/N-5yc1vZbqm7",
    retailer: "Home Depot",
  },
  "siding": {
    label: "Shop Siding",
    url: "https://www.homedepot.com/b/Building-Materials-Siding/N-5yc1vZar4p",
    retailer: "Home Depot",
  },
  "windows": {
    label: "Shop Windows",
    url: "https://www.homedepot.com/b/Doors-Windows-Windows/N-5yc1vZar1i",
    retailer: "Home Depot",
  },
  "doors": {
    label: "Shop Doors",
    url: "https://www.homedepot.com/b/Doors-Windows/N-5yc1vZaq1t",
    retailer: "Home Depot",
  },
  "insulation": {
    label: "Shop Insulation",
    url: "https://www.homedepot.com/b/Building-Materials-Insulation/N-5yc1vZaqy3",
    retailer: "Home Depot",
  },
  "fencing": {
    label: "Shop Fencing",
    url: "https://www.homedepot.com/b/Lumber-Composites-Fencing/N-5yc1vZbqpf",
    retailer: "Home Depot",
  },
  "decking": {
    label: "Shop Decking",
    url: "https://www.homedepot.com/b/Lumber-Composites-Decking/N-5yc1vZbqp0",
    retailer: "Home Depot",
  },
  "garage-doors": {
    label: "Shop Garage Doors",
    url: "https://www.homedepot.com/b/Doors-Windows-Garage-Doors/N-5yc1vZar5d",
    retailer: "Home Depot",
  },
  "gutters": {
    label: "Shop Gutters",
    url: "https://www.homedepot.com/b/Building-Materials-Gutter-Systems/N-5yc1vZaqox",
    retailer: "Home Depot",
  },
  "concrete": {
    label: "Shop Concrete",
    url: "https://www.homedepot.com/b/Building-Materials-Concrete-Cement-Masonry/N-5yc1vZaqp0",
    retailer: "Home Depot",
  },
  "electrical": {
    label: "Shop Electrical",
    url: "https://www.homedepot.com/b/Electrical/N-5yc1vZbm09",
    retailer: "Home Depot",
  },
  "drywall": {
    label: "Shop Drywall",
    url: "https://www.homedepot.com/b/Building-Materials-Drywall/N-5yc1vZar3t",
    retailer: "Home Depot",
  },
  "landscaping": {
    label: "Shop Landscaping",
    url: "https://www.homedepot.com/b/Outdoors-Garden-Center/N-5yc1vZbx41",
    retailer: "Home Depot",
  },
  "solar": {
    label: "Shop Solar Panels",
    url: "https://www.homedepot.com/b/Electrical-Renewable-Energy-Solar-Panels/N-5yc1vZ1z18kqe",
    retailer: "Home Depot",
  },
};

export function getAffiliateLink(category) {
  return affiliateLinks[category] || null;
}
