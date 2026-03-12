import { SITE_NAME } from '../../data/site-data';

export const metadata = {
  title: `How We Calculate Costs — ${SITE_NAME} Methodology`,
  description: 'Learn how HomeCostGuide calculates home improvement costs using BLS wage data, Census building permits, climate data, and local cost indexes.',
};

export default function MethodologyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-400 mb-6">
        <a href="/" className="hover:text-blue-600">Home</a>
        <span className="mx-2">&rsaquo;</span>
        <span className="text-gray-600">Methodology</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How We Calculate Costs</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated March 2026</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Approach</h2>
          <p>
            HomeCostGuide provides localized home improvement cost estimates by combining multiple authoritative data sources. Every cost figure on our site is calculated using a transparent methodology that accounts for regional labor rates, material costs, and local market conditions.
          </p>
          <p className="mt-3">
            We believe homeowners deserve honest, data-backed cost information before they start a project. Our goal is to help you budget accurately and make informed decisions &mdash; not to sell leads or push you toward specific contractors.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Data Sources</h2>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-1">Bureau of Labor Statistics (BLS)</h3>
              <p className="text-sm">
                We use the Occupational Employment and Wage Statistics (OEWS) program to obtain actual hourly wage data for construction trades in each metro area. This includes electricians, plumbers, roofers, carpenters, HVAC technicians, and other key trades. BLS data is updated annually.
              </p>
              <p className="text-xs text-gray-500 mt-2">Source: BLS OEWS &middot; bls.gov/oes</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-1">U.S. Census Bureau</h3>
              <p className="text-sm">
                Building permit data from the Census Bureau&apos;s Building Permits Survey tells us how active each local construction market is. Markets with high permit volume tend to have busier (and sometimes pricier) contractors. We use annual residential permit counts by city.
              </p>
              <p className="text-xs text-gray-500 mt-2">Source: Census Building Permits Survey &middot; census.gov</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-1">Open-Meteo Historical Weather</h3>
              <p className="text-sm">
                Climate data helps us recommend the best and worst times of year for specific projects. Monthly temperature and precipitation averages inform our seasonal pricing guidance &mdash; outdoor projects in extreme heat or cold often cost more due to reduced productivity.
              </p>
              <p className="text-xs text-gray-500 mt-2">Source: Open-Meteo Historical API &middot; open-meteo.com</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-1">Industry Research &amp; Material Pricing</h3>
              <p className="text-sm">
                Base material costs and line-item breakdowns are compiled from manufacturer pricing, retailer data, and industry cost databases. We update these figures regularly to reflect current material market conditions.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">How Local Costs Are Calculated</h2>
          <p>Each metro area has a <strong>cost index</strong> that reflects how local prices compare to the national average:</p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>A cost index of <strong>1.0</strong> means costs match the national average</li>
            <li>A cost index of <strong>0.90</strong> means costs are about 10% below average</li>
            <li>A cost index of <strong>1.15</strong> means costs are about 15% above average</li>
          </ul>
          <p className="mt-3">
            Cost indexes are derived from BLS wage differentials, regional material pricing surveys, and local permit/fee structures. We apply this multiplier to national base costs to produce localized estimates.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Cost Breakdown Tiers</h2>
          <p>For each service, we provide three pricing tiers:</p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li><strong>Budget</strong> &mdash; Economy materials, standard installation, minimal customization</li>
            <li><strong>Mid-Range</strong> &mdash; Quality materials, professional installation, moderate customization</li>
            <li><strong>Premium</strong> &mdash; High-end materials, specialist installation, full customization</li>
          </ul>
          <p className="mt-3">
            Each tier applies a multiplier to the base cost. Most homeowners fall in the mid-range tier, which is what our default estimates reflect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Data Freshness</h2>
          <p>
            We refresh our data sources on a regular schedule:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>BLS wage data: Updated annually (latest available year)</li>
            <li>Census building permits: Updated annually</li>
            <li>Climate data: Updated annually from historical records</li>
            <li>Material costs and line items: Reviewed quarterly</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Important Disclaimers</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 text-sm">
            <ul className="list-disc pl-5 space-y-2">
              <li>Our estimates are for informational purposes only and should not replace professional quotes from licensed contractors.</li>
              <li>Actual project costs can vary significantly based on specific site conditions, material choices, project complexity, and contractor pricing.</li>
              <li>We recommend getting at least three written quotes from licensed, insured contractors before starting any project.</li>
              <li>Permit costs, HOA requirements, and local code requirements are not always included in our estimates and vary by jurisdiction.</li>
              <li>HomeCostGuide is not a contractor, does not perform any work, and does not guarantee any pricing.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Questions?</h2>
          <p>
            If you have questions about our methodology or notice a data issue, please reach out. We&apos;re committed to providing the most accurate cost information possible.
          </p>
        </section>
      </div>
    </article>
  );
}
