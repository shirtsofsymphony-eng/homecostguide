import { metros, services, getLocalCost, SITE_NAME } from '../../../../data/site-data';
import { costBreakdowns } from '../../../../data/cost-breakdowns';
import { metroData, getBestMonthsText, getWorstMonthsText } from '../../../../data/metro-data';
import CostBreakdownTable from '../../../../components/CostBreakdownTable';
import CostCalculator from '../../../../components/CostCalculator';
import CostGuideSchema from '../../../../components/CostGuideSchema';

// Generated data (fallbacks baked into JSON files)
import blsWages from '../../../../data/generated/bls-wages.json';
import buildingPermits from '../../../../data/generated/building-permits.json';
import climateData from '../../../../data/generated/climate-data.json';

export function generateStaticParams() {
  const params = [];
  for (const metro of metros) {
    for (const service of services) {
      params.push({ service: service.slug, metro: metro.slug });
    }
  }
  return params;
}

export function generateMetadata({ params }) {
  const service = services.find(s => s.slug === params.service);
  const metro = metros.find(m => m.slug === params.metro);
  if (!service || !metro) return {};
  const cost = getLocalCost(service, metro);
  return {
    title: `${service.name} Cost in ${metro.city}, ${metro.stateCode} (2026) — $${cost.low.toLocaleString()}–$${cost.high.toLocaleString()}`,
    description: `How much does ${service.name.toLowerCase()} cost in ${metro.city}, ${metro.stateCode}? Average cost is $${cost.avg.toLocaleString()} ${service.unit}. See detailed price breakdown, local wage data, and cost calculator.`,
  };
}

export default function CostGuidePage({ params }) {
  const service = services.find(s => s.slug === params.service);
  const metro = metros.find(m => m.slug === params.metro);
  if (!service || !metro) return <div className="max-w-3xl mx-auto px-4 py-12">Page not found</div>;

  const cost = getLocalCost(service, metro);
  const otherMetros = metros.filter(m => m.slug !== metro.slug).slice(0, 8);
  const relatedServices = services.filter(s => s.slug !== service.slug).slice(0, 6);

  // Enrichment data
  const mData = metroData[metro.slug] || {};
  const wages = blsWages[metro.slug] || null;
  const permits = buildingPermits[metro.slug] || null;
  const climate = climateData[metro.slug] || null;
  const breakdown = costBreakdowns[service.slug] || null;

  // National average wage for comparison
  const allWages = Object.values(blsWages);
  const nationalAvgWage = allWages.length > 0
    ? Math.round(allWages.reduce((s, w) => s + (w.avgHourlyWage || 0), 0) / allWages.length * 100) / 100
    : 22.50;
  const wageAboveBelow = wages
    ? Math.round(((wages.avgHourlyWage - nationalAvgWage) / nationalAvgWage) * 100)
    : 0;

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-400 mb-6">
        <a href="/" className="hover:text-blue-600">Home</a>
        <span className="mx-2">&rsaquo;</span>
        <a href={`/cost/${service.slug}/`} className="hover:text-blue-600">{service.name}</a>
        <span className="mx-2">&rsaquo;</span>
        <span className="text-gray-600">{metro.city}, {metro.stateCode}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        How Much Does {service.name} Cost in {metro.city}, {metro.stateCode}?
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        Updated March 2026 &middot; {metro.city} metro area
        {wages ? ` · Based on BLS wage data and local market costs` : ''}
      </p>

      {/* Cost highlight box */}
      <div className="cost-highlight mb-8">
        <div className="text-sm text-blue-600 font-medium mb-2">{metro.city} Average Cost ({service.unit})</div>
        <div className="flex items-end gap-6 mb-4">
          <div><div className="text-xs text-gray-500">Low</div><div className="text-2xl font-bold text-gray-700">${cost.low.toLocaleString()}</div></div>
          <div><div className="text-xs text-gray-500">Average</div><div className="text-3xl font-bold text-blue-700">${cost.avg.toLocaleString()}</div></div>
          <div><div className="text-xs text-gray-500">High</div><div className="text-2xl font-bold text-gray-700">${cost.high.toLocaleString()}</div></div>
        </div>
        <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: `${Math.min(((cost.avg - cost.low) / (cost.high - cost.low)) * 100, 100)}%` }} />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Budget</span><span>Mid-Range</span><span>Premium</span></div>
      </div>

      <div className="ad-slot" data-ad-slot="after-cost-box">Ad Space</div>

      {/* Itemized cost breakdown table */}
      {breakdown && (
        <CostBreakdownTable serviceSlug={service.slug} costIndex={metro.costIndex} tier="mid" />
      )}

      {/* Interactive calculator */}
      {breakdown && (
        <CostCalculator
          serviceSlug={service.slug}
          costIndex={metro.costIndex}
          breakdownData={breakdown}
        />
      )}

      {/* What drives cost in this city */}
      <div className="mt-8 space-y-6 text-gray-700 leading-relaxed">
        <h2 className="text-2xl font-bold text-gray-900">What Drives {service.name} Cost in {metro.city}?</h2>

        <p>The average cost of {service.name.toLowerCase()} in {metro.city}, {metro.stateCode} is <strong>${cost.avg.toLocaleString()}</strong> {service.unit}. Most homeowners pay between ${cost.low.toLocaleString()} and ${cost.high.toLocaleString()}, depending on the scope of work, materials selected, and contractor experience.</p>

        <p>{service.description}</p>

        {/* BLS wage context */}
        {wages && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Local Labor Costs</h3>
            <p className="text-sm">
              Construction workers in {metro.city} earn an average of <strong>${wages.avgHourlyWage}/hr</strong> &mdash;{' '}
              {wageAboveBelow > 0
                ? `${wageAboveBelow}% above the national average`
                : wageAboveBelow < 0
                  ? `${Math.abs(wageAboveBelow)}% below the national average`
                  : 'right at the national average'
              }. Labor typically accounts for 40-60% of total project cost.
              {wages.occupations && wages.occupations.length > 0 && (
                <> Key trades: {wages.occupations.slice(0, 4).map(o => `${o.name} ($${o.hourlyMean}/hr)`).join(', ')}.</>
              )}
            </p>
          </div>
        )}

        {/* Sales tax */}
        {mData.salesTaxRate > 0 && (
          <p>
            Materials in {metro.stateCode} are subject to <strong>{(mData.salesTaxRate * 100).toFixed(2)}% sales tax</strong>, which adds to the overall project cost. For a ${cost.avg.toLocaleString()} project, expect roughly ${Math.round(cost.avg * 0.4 * mData.salesTaxRate).toLocaleString()} in tax on materials alone.
          </p>
        )}

        {/* Permit activity */}
        {permits && (
          <p>
            {metro.city} issued approximately <strong>{permits.totalPermits.toLocaleString()} residential building permits</strong> in {permits.year}, putting it in the{' '}
            {permits.totalPermits > 25000 ? 'busiest tier of US construction markets' :
             permits.totalPermits > 15000 ? 'upper range of US construction markets' :
             permits.totalPermits > 8000 ? 'mid-range of US construction markets' :
             'smaller but active construction markets'}.
            High permit activity can mean busier contractors and longer wait times for scheduling.
          </p>
        )}

        <h2 className="text-2xl font-bold text-gray-900">Factors That Affect Cost</h2>
        <ul className="list-disc pl-6 space-y-1">
          {service.factors.map((f, i) => <li key={i}><strong>{f}</strong></li>)}
          <li><strong>Contractor experience</strong> &mdash; Established contractors with strong reviews may charge 10-20% more</li>
          <li><strong>Local cost of living</strong> &mdash; {metro.city}&apos;s cost index is {metro.costIndex}x the national baseline</li>
        </ul>
      </div>

      {/* Best time for this service */}
      {(climate || mData.bestMonths) && (
        <section className="mt-8 space-y-4 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-gray-900">Best Time for {service.name} in {metro.city}</h2>

          {mData.seasonalNote && <p>{mData.seasonalNote}</p>}

          {mData.bestMonths && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 text-sm mb-1">Best Months</h3>
                <p className="text-sm text-green-700">{getBestMonthsText(metro.slug)}</p>
                <p className="text-xs text-green-600 mt-1">Lower demand often means better pricing and faster scheduling.</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 text-sm mb-1">Peak Season (Higher Prices)</h3>
                <p className="text-sm text-red-700">{getWorstMonthsText(metro.slug)}</p>
                <p className="text-xs text-red-600 mt-1">High demand can add 10-20% to project costs.</p>
              </div>
            </div>
          )}

          {/* Monthly climate chart */}
          {climate && climate.months && climate.months.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Monthly Weather in {metro.city}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="py-2 px-2 text-left text-gray-600">Month</th>
                      {climate.months.map(m => (
                        <th key={m.month} className="py-2 px-2 text-center text-gray-600">
                          {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m.month - 1]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-1.5 px-2 text-gray-600">Avg High</td>
                      {climate.months.map(m => (
                        <td key={m.month} className={`py-1.5 px-2 text-center ${m.avgHigh >= 90 ? 'text-red-600 font-medium' : m.avgHigh <= 40 ? 'text-blue-600' : 'text-gray-700'}`}>
                          {m.avgHigh}&deg;
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-1.5 px-2 text-gray-600">Avg Low</td>
                      {climate.months.map(m => (
                        <td key={m.month} className={`py-1.5 px-2 text-center ${m.avgLow <= 32 ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                          {m.avgLow}&deg;
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2 text-gray-600">Rain (in)</td>
                      {climate.months.map(m => (
                        <td key={m.month} className={`py-1.5 px-2 text-center ${m.totalPrecipInches >= 5 ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                          {m.totalPrecipInches}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-1">Source: Open-Meteo historical data ({climate.year})</p>
            </div>
          )}
        </section>
      )}

      <div className="ad-slot mt-8" data-ad-slot="mid-article">Ad Space</div>

      {/* Licensing & permits */}
      {mData.licensing && (
        <section className="mt-8 space-y-3 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-gray-900">Licensing &amp; Permits in {metro.stateCode}</h2>
          <p>{mData.licensing.description}</p>
          {mData.licensing.lookupUrl && (
            <p className="text-sm">
              Verify a contractor&apos;s license at{' '}
              <a href={mData.licensing.lookupUrl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {mData.licensing.board}
              </a>.
            </p>
          )}
          {mData.licensing.threshold && (
            <p className="text-sm bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              In {metro.stateCode}, a contractor license is required for projects over <strong>${mData.licensing.threshold.toLocaleString()}</strong>. Always verify before hiring.
            </p>
          )}
        </section>
      )}

      {/* How to save money */}
      <section className="mt-8 space-y-3 text-gray-700 leading-relaxed">
        <h2 className="text-2xl font-bold text-gray-900">How to Save Money on {service.name}</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Get at least 3 quotes from licensed contractors in {metro.city}</li>
          {mData.bestMonths && <li>Schedule during off-peak months ({getBestMonthsText(metro.slug)}) for lower prices</li>}
          <li>Clarify permit costs upfront &mdash; they vary by jurisdiction</li>
          <li>Consider mid-range materials for the best value-to-quality ratio</li>
          {mData.licensing && <li>Verify contractor licensing through {mData.licensing.board || `your state licensing board`}</li>}
          <li>Ask about material package deals or contractor supplier discounts</li>
        </ul>
      </section>

      {/* FAQs */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {service.faqs.map((faq, i) => (
            <details key={i} className="border border-gray-200 rounded-lg">
              <summary className="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">{faq.q}</summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Schema markup */}
      <CostGuideSchema service={service} metro={metro} cost={cost} faqs={service.faqs} />

      {/* Compare other cities */}
      <section className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{service.name} Cost in Other Cities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {otherMetros.map((m) => {
            const c = getLocalCost(service, m);
            return (
              <a key={m.slug} href={`/cost/${service.slug}/${m.slug}/`} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition text-center">
                <div className="font-medium text-sm text-gray-900">{m.city}, {m.stateCode}</div>
                <div className="text-blue-700 font-bold">${c.avg.toLocaleString()}</div>
              </a>
            );
          })}
        </div>
        <div className="mt-3 text-center">
          <a href={`/compare/${service.slug}/`} className="text-sm text-blue-600 hover:underline">
            Compare all {metros.length} cities &rarr;
          </a>
        </div>
      </section>

      {/* Related services */}
      <section className="mt-8 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Other Costs in {metro.city}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {relatedServices.map((s) => {
            const c = getLocalCost(s, metro);
            return (
              <a key={s.slug} href={`/cost/${s.slug}/${metro.slug}/`} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition">
                <div className="font-medium text-sm text-gray-900">{s.name}</div>
                <div className="text-blue-700 font-bold">${c.avg.toLocaleString()}</div>
              </a>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to Get Quotes?</h3>
        <p className="text-sm text-gray-600 mb-4">Browse top-rated {metro.city} contractors</p>
        <a href={`/directory/${service.slug}/${metro.slug}/`} className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Find Contractors
        </a>
      </section>

      <div className="ad-slot mt-8" data-ad-slot="bottom-article">Ad Space</div>
    </article>
  );
}
