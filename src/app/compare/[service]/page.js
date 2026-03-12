import { metros, services, getLocalCost, SITE_NAME } from '../../../data/site-data';
import blsWages from '../../../data/generated/bls-wages.json';
import buildingPermits from '../../../data/generated/building-permits.json';

export function generateStaticParams() {
  return services.map(s => ({ service: s.slug }));
}

export function generateMetadata({ params }) {
  const service = services.find(s => s.slug === params.service);
  if (!service) return {};
  return {
    title: `${service.name} Cost Comparison — ${metros.length} Cities | ${SITE_NAME}`,
    description: `Compare ${service.name.toLowerCase()} costs across ${metros.length} US cities. See which metro areas are cheapest and most expensive for your project.`,
  };
}

export default function CompareServicePage({ params }) {
  const service = services.find(s => s.slug === params.service);
  if (!service) return <div className="max-w-5xl mx-auto px-4 py-12">Service not found</div>;

  // Calculate costs for all metros and sort by average
  const metrosCosts = metros.map(m => {
    const cost = getLocalCost(service, m);
    const wages = blsWages[m.slug];
    const permits = buildingPermits[m.slug];
    return { metro: m, cost, wages, permits };
  }).sort((a, b) => a.cost.avg - b.cost.avg);

  const cheapest = metrosCosts[0];
  const mostExpensive = metrosCosts[metrosCosts.length - 1];
  const avgAll = Math.round(metrosCosts.reduce((s, mc) => s + mc.cost.avg, 0) / metrosCosts.length);

  // For bar chart widths
  const maxCost = mostExpensive.cost.high;

  return (
    <article className="max-w-5xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-400 mb-6">
        <a href="/" className="hover:text-blue-600">Home</a>
        <span className="mx-2">&rsaquo;</span>
        <a href={`/cost/${service.slug}/`} className="hover:text-blue-600">{service.name}</a>
        <span className="mx-2">&rsaquo;</span>
        <span className="text-gray-600">Compare Cities</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {service.name} Cost Comparison: {metros.length} Cities
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        Updated March 2026 &middot; Prices adjusted for local market conditions
      </p>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-xs text-green-600 font-medium mb-1">Cheapest</div>
          <div className="text-lg font-bold text-gray-900">{cheapest.metro.city}, {cheapest.metro.stateCode}</div>
          <div className="text-green-700 font-bold">${cheapest.cost.avg.toLocaleString()}</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="text-xs text-blue-600 font-medium mb-1">Average ({metros.length} cities)</div>
          <div className="text-lg font-bold text-gray-900">National</div>
          <div className="text-blue-700 font-bold">${avgAll.toLocaleString()}</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <div className="text-xs text-red-600 font-medium mb-1">Most Expensive</div>
          <div className="text-lg font-bold text-gray-900">{mostExpensive.metro.city}, {mostExpensive.metro.stateCode}</div>
          <div className="text-red-700 font-bold">${mostExpensive.cost.avg.toLocaleString()}</div>
        </div>
      </div>

      {/* Visual bar chart */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Cost by City (Average)</h2>
        <div className="space-y-2">
          {metrosCosts.map(({ metro, cost }) => {
            const pct = Math.round((cost.avg / maxCost) * 100);
            return (
              <div key={metro.slug} className="flex items-center gap-3">
                <a href={`/cost/${service.slug}/${metro.slug}/`} className="w-36 sm:w-44 text-sm text-gray-700 hover:text-blue-600 truncate shrink-0">
                  {metro.city}, {metro.stateCode}
                </a>
                <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-end px-2"
                    style={{ width: `${pct}%`, minWidth: '60px' }}
                  >
                    <span className="text-xs font-bold text-white">${cost.avg.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Detailed comparison table */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Detailed Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-3 font-semibold text-gray-700">City</th>
                <th className="text-right py-3 px-3 font-semibold text-gray-700">Low</th>
                <th className="text-right py-3 px-3 font-semibold text-gray-700">Average</th>
                <th className="text-right py-3 px-3 font-semibold text-gray-700">High</th>
                <th className="text-right py-3 px-3 font-semibold text-gray-700">Avg Wage</th>
                <th className="text-right py-3 px-3 font-semibold text-gray-700">Cost Index</th>
              </tr>
            </thead>
            <tbody>
              {metrosCosts.map(({ metro, cost, wages }, i) => (
                <tr key={metro.slug} className={`border-b border-gray-100 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                  <td className="py-3 px-3">
                    <a href={`/cost/${service.slug}/${metro.slug}/`} className="font-medium text-blue-600 hover:underline">
                      {metro.city}, {metro.stateCode}
                    </a>
                  </td>
                  <td className="text-right py-3 px-3 text-gray-600">${cost.low.toLocaleString()}</td>
                  <td className="text-right py-3 px-3 font-bold text-gray-900">${cost.avg.toLocaleString()}</td>
                  <td className="text-right py-3 px-3 text-gray-600">${cost.high.toLocaleString()}</td>
                  <td className="text-right py-3 px-3 text-gray-600">
                    {wages ? `$${wages.avgHourlyWage}/hr` : '—'}
                  </td>
                  <td className="text-right py-3 px-3 text-gray-600">{metro.costIndex}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Related comparisons */}
      <section className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Compare Other Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {services.filter(s => s.slug !== service.slug).slice(0, 8).map(s => (
            <a key={s.slug} href={`/compare/${s.slug}/`} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition text-center">
              <div className="font-medium text-sm text-gray-900">{s.name}</div>
            </a>
          ))}
        </div>
      </section>

      <div className="ad-slot mt-8" data-ad-slot="bottom-compare">Ad Space</div>
    </article>
  );
}
