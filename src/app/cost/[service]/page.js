import { metros, services, getLocalCost, SITE_NAME } from '../../../data/site-data';
import { costBreakdowns } from '../../../data/cost-breakdowns';

export function generateStaticParams() {
  return services.map(s => ({ service: s.slug }));
}

export function generateMetadata({ params }) {
  const service = services.find(s => s.slug === params.service);
  if (!service) return {};
  return {
    title: `${service.name} Cost by City (2026) — National Price Guide`,
    description: `How much does ${service.name.toLowerCase()} cost? See average prices in ${metros.length} US cities. National average: $${service.baseLow.toLocaleString()}–$${service.baseHigh.toLocaleString()} ${service.unit}.`,
  };
}

export default function ServicePage({ params }) {
  const service = services.find(s => s.slug === params.service);
  if (!service) return <div>Not found</div>;

  const breakdown = costBreakdowns?.[service.slug];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-400 mb-6">
        <a href="/" className="hover:text-blue-600">Home</a>
        <span className="mx-2">›</span>
        <span className="text-gray-600">{service.name} Cost Guide</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {service.name} Cost in {metros.length} US Cities (2026)
      </h1>
      <p className="text-gray-600 mb-8">{service.description}</p>

      <div className="cost-highlight mb-8">
        <div className="text-sm text-blue-600 font-medium mb-2">National Average ({service.unit})</div>
        <div className="flex items-end gap-6">
          <div><div className="text-xs text-gray-500">Low</div><div className="text-2xl font-bold text-gray-700">${service.baseLow.toLocaleString()}</div></div>
          <div><div className="text-xs text-gray-500">Average</div><div className="text-3xl font-bold text-blue-700">${service.baseAvg.toLocaleString()}</div></div>
          <div><div className="text-xs text-gray-500">High</div><div className="text-2xl font-bold text-gray-700">${service.baseHigh.toLocaleString()}</div></div>
        </div>
      </div>

      <div className="ad-slot" data-ad-slot="top">Ad Space</div>

      {/* National Cost Breakdown Summary */}
      {breakdown?.items && (
        <section className="mt-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{service.name} Cost Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Item</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Description</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-700">Low</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-700">High</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Unit</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.items.map((item, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-medium text-gray-900">{item.label}</td>
                    <td className="px-4 py-3 text-gray-500">{item.description}</td>
                    <td className="px-4 py-3 text-right text-gray-700">${item.lowPerUnit.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-gray-700">${item.highPerUnit.toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-500">{item.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            * These are national average costs. Actual prices vary by city — select a metro below for local estimates.
          </p>
        </section>
      )}

      {/* Service Description */}
      <p className="text-gray-600 mb-8">{service.description}</p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{service.name} Cost by City</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {metros.map((metro) => {
          const cost = getLocalCost(service, metro);
          return (
            <a key={metro.slug} href={`/cost/${service.slug}/${metro.slug}/`}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition flex justify-between items-center">
              <div>
                <div className="font-medium text-gray-900">{metro.city}, {metro.stateCode}</div>
                <div className="text-xs text-gray-400">{service.unit}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-700">${cost.avg.toLocaleString()}</div>
                <div className="text-xs text-gray-400">${cost.low.toLocaleString()}–${cost.high.toLocaleString()}</div>
              </div>
            </a>
          );
        })}
      </div>

      <div className="ad-slot mt-8" data-ad-slot="bottom">Ad Space</div>
    </div>
  );
}
