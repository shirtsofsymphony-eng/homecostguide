import { metros, services, getLocalCost, SITE_NAME } from '../../../data/site-data';
import { HomeIcon, ChevronRightIcon, LocationPinIcon, getServiceIcon } from '../../../components/icons';
import blsWages from '../../../data/generated/bls-wages.json';
import buildingPermits from '../../../data/generated/building-permits.json';
import AdUnit from '../../../components/AdUnit';

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

  const ServiceIcon = getServiceIcon(service.slug);

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
      {/* Breadcrumbs */}
      <nav className="flex flex-wrap items-center gap-1.5 mb-6">
        <a href="/" className="breadcrumb-pill">
          <HomeIcon className="w-3.5 h-3.5" />
          Home
        </a>
        <ChevronRightIcon className="w-3 h-3 text-gray-300" />
        <a href={`/cost/${service.slug}/`} className="breadcrumb-pill">{service.name}</a>
        <ChevronRightIcon className="w-3 h-3 text-gray-300" />
        <span className="breadcrumb-pill bg-blue-50 text-blue-700">Compare Cities</span>
      </nav>

      <div className="flex items-start gap-3 mb-4">
        <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 mt-1">
          <ServiceIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {service.name} Cost Comparison: {metros.length} Cities
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Updated March 2026 &middot; Prices adjusted for local market conditions
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-on-scroll">
        <div className="card-elevated p-4 text-center" style={{ '--tw-ring-color': '#22c55e' }}>
          <div className="inline-block bg-green-50 rounded-full px-3 py-1 text-xs text-green-600 font-medium mb-2">Cheapest</div>
          <div className="text-lg font-bold text-gray-900">{cheapest.metro.city}, {cheapest.metro.stateCode}</div>
          <div className="text-green-700 font-bold text-xl">${cheapest.cost.avg.toLocaleString()}</div>
        </div>
        <div className="card-elevated p-4 text-center">
          <div className="inline-block bg-blue-50 rounded-full px-3 py-1 text-xs text-blue-600 font-medium mb-2">Average ({metros.length} cities)</div>
          <div className="text-lg font-bold text-gray-900">National</div>
          <div className="text-blue-700 font-bold text-xl">${avgAll.toLocaleString()}</div>
        </div>
        <div className="card-elevated p-4 text-center">
          <div className="inline-block bg-red-50 rounded-full px-3 py-1 text-xs text-red-600 font-medium mb-2">Most Expensive</div>
          <div className="text-lg font-bold text-gray-900">{mostExpensive.metro.city}, {mostExpensive.metro.stateCode}</div>
          <div className="text-red-700 font-bold text-xl">${mostExpensive.cost.avg.toLocaleString()}</div>
        </div>
      </div>

      {/* Visual bar chart */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Cost by City (Average)</h2>
        <div className="space-y-2">
          {metrosCosts.map(({ metro, cost }, i) => {
            const pct = Math.round((cost.avg / maxCost) * 100);
            return (
              <div key={metro.slug} className="flex items-center gap-3 animate-on-scroll" style={{ transitionDelay: `${i * 0.04}s` }}>
                <a href={`/cost/${service.slug}/${metro.slug}/`} className="w-36 sm:w-44 text-sm text-gray-700 hover:text-blue-600 truncate shrink-0 transition">
                  {metro.city}, {metro.stateCode}
                </a>
                <div className="flex-1 bg-gray-100 rounded-full h-7 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-end px-2 bar-animate"
                    style={{ '--bar-width': `${pct}%`, animationDelay: `${i * 0.06}s`, minWidth: '60px' }}
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
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="table-pro w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
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
                <tr key={metro.slug} className={`border-b border-gray-100 transition-colors hover:bg-blue-50/40 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                  <td className="py-3 px-3">
                    <a href={`/cost/${service.slug}/${metro.slug}/`} className="font-medium text-blue-600 hover:underline">
                      {metro.city}, {metro.stateCode}
                    </a>
                  </td>
                  <td className="text-right py-3 px-3 text-gray-600">${cost.low.toLocaleString()}</td>
                  <td className="text-right py-3 px-3 font-bold text-gray-900">${cost.avg.toLocaleString()}</td>
                  <td className="text-right py-3 px-3 text-gray-600">${cost.high.toLocaleString()}</td>
                  <td className="text-right py-3 px-3 text-gray-600">
                    {wages ? `$${wages.avgHourlyWage}/hr` : '\u2014'}
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
          {services.filter(s => s.slug !== service.slug).slice(0, 8).map(s => {
            const Icon = getServiceIcon(s.slug);
            return (
              <a key={s.slug} href={`/compare/${s.slug}/`} className="card-elevated p-3 text-center group">
                <div className="flex justify-center mb-1.5">
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition" />
                </div>
                <div className="font-medium text-sm text-gray-900 group-hover:text-blue-600 transition">{s.name}</div>
              </a>
            );
          })}
        </div>
      </section>

      <AdUnit slot="bottom" className="mt-8" />
    </article>
  );
}
