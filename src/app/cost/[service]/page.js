import { metros, services, getLocalCost, SITE_NAME } from '../../../data/site-data';
import { costBreakdowns } from '../../../data/cost-breakdowns';
import { HomeIcon, ChevronRightIcon, getServiceIcon } from '../../../components/icons';

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
  const ServiceIcon = getServiceIcon(service.slug);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="flex flex-wrap items-center gap-1.5 mb-6">
        <a href="/" className="breadcrumb-pill"><HomeIcon className="w-3.5 h-3.5" />Home</a>
        <ChevronRightIcon className="w-3 h-3 text-gray-300" />
        <span className="breadcrumb-pill bg-blue-50 text-blue-700">{service.name} Cost Guide</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <ServiceIcon className="w-8 h-8 text-blue-600" />
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
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="table-pro w-full text-sm">
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
        {metros.map((metro, i) => {
          const cost = getLocalCost(service, metro);
          const LocationPinIcon = ({ className }) => (
            <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
          );
          return (
            <a key={metro.slug} href={`/cost/${service.slug}/${metro.slug}/`}
              className="card-elevated rounded-xl p-4 hover:border-blue-300 transition flex justify-between items-center animate-on-scroll"
              style={{ transitionDelay: `${i * 0.03}s` }}>
              <div className="flex items-center gap-2">
                <LocationPinIcon className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="font-medium text-gray-900">{metro.city}, {metro.stateCode}</div>
                  <div className="text-xs text-gray-400">{service.unit}</div>
                </div>
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
