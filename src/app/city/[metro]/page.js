import { metros, services, getLocalCost } from '../../../data/site-data';
import { metroData } from '../../../data/metro-data';
import blsWages from '../../../data/generated/bls-wages.json';
import buildingPermits from '../../../data/generated/building-permits.json';
import { HomeIcon, ChevronRightIcon, LocationPinIcon, getServiceIcon } from '../../../components/icons';
import AdUnit from '../../../components/AdUnit';

export function generateStaticParams() {
  return metros.map(m => ({ metro: m.slug }));
}

export function generateMetadata({ params }) {
  const metro = metros.find(m => m.slug === params.metro);
  if (!metro) return {};
  return {
    title: `Home Improvement Costs in ${metro.city}, ${metro.stateCode} (2026) — All Services`,
    description: `Complete guide to home improvement costs in ${metro.city}, ${metro.stateCode}. See prices for ${services.length} services from roofing to remodeling. Find local contractors.`,
  };
}

export default function CityHubPage({ params }) {
  const metro = metros.find(m => m.slug === params.metro);
  if (!metro) return <div>Not found</div>;

  const otherMetros = metros.filter(m => m.slug !== metro.slug).slice(0, 10);

  const enrichment = metroData?.[metro.slug];
  const wages = blsWages?.[metro.slug];
  const permits = buildingPermits?.[metro.slug];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="flex flex-wrap items-center gap-1.5 mb-6">
        <a href="/" className="breadcrumb-pill"><HomeIcon className="w-3.5 h-3.5" />Home</a>
        <ChevronRightIcon className="w-3 h-3 text-gray-300" />
        <span className="breadcrumb-pill bg-blue-50 text-blue-700">{metro.city}, {metro.stateCode}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <LocationPinIcon className="w-8 h-8 text-blue-600" />
        Home Improvement Costs in {metro.city}, {metro.stateCode}
      </h1>
      <p className="text-gray-600 mb-2">
        {metro.city}&apos;s cost index is {metro.costIndex < 1 ? `${Math.round((1 - metro.costIndex) * 100)}% below` : metro.costIndex > 1 ? `${Math.round((metro.costIndex - 1) * 100)}% above` : 'at'} the national average.
      </p>
      <p className="text-gray-500 text-sm mb-8">Updated March 2026 &middot; {services.length} services tracked</p>

      <AdUnit slot="top" />

      {/* ── City Overview / Enrichment Section ── */}
      {(enrichment || wages || permits) && (
        <section className="mt-8 mb-8 rounded-xl border border-gray-200 p-6 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{metro.city} Construction Market Overview</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Climate Zone */}
            {enrichment?.climateZone && (
              <div className="card-elevated rounded-xl p-4">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Climate Zone</div>
                <div className="text-lg font-bold text-gray-900">{enrichment.climateZone}</div>
                {enrichment?.climateLabel && (
                  <div className="text-sm text-gray-500">{enrichment.climateLabel}</div>
                )}
              </div>
            )}

            {/* Building Permits */}
            {permits?.totalPermits && (
              <div className="card-elevated rounded-xl p-4">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Building Permits</div>
                <div className="text-lg font-bold text-gray-900">{permits.totalPermits.toLocaleString()}</div>
                <div className="text-sm text-gray-500">residential permits issued in {permits.year}</div>
              </div>
            )}

            {/* BLS Wage */}
            {wages?.avgHourlyWage && (
              <div className="card-elevated rounded-xl p-4">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Avg Construction Wage</div>
                <div className="text-lg font-bold text-gray-900">${wages.avgHourlyWage.toFixed(2)}/hr</div>
                <div className="text-sm text-gray-500">BLS average for construction trades</div>
              </div>
            )}

            {/* Sales Tax */}
            {enrichment?.salesTaxRate != null && (
              <div className="card-elevated rounded-xl p-4">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Sales Tax on Materials</div>
                <div className="text-lg font-bold text-gray-900">{(enrichment.salesTaxRate * 100).toFixed(2)}%</div>
                <div className="text-sm text-gray-500">applied to material purchases</div>
              </div>
            )}
          </div>

          {/* Licensing Info */}
          {enrichment?.licensing && (
            <div className="mt-4 card-elevated rounded-xl p-4">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">State Contractor Licensing</div>
              <p className="text-sm text-gray-700 mb-2">{enrichment.licensing.description}</p>
              {enrichment.licensing.lookupUrl && (
                <a
                  href={enrichment.licensing.lookupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Look up a license at {enrichment.licensing.board || 'state licensing board'} &rarr;
                </a>
              )}
            </div>
          )}
        </section>
      )}

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">All Services in {metro.city}</h2>
      <div className="space-y-2">
        {services.map((service, i) => {
          const cost = getLocalCost(service, metro);
          const ServiceIcon = getServiceIcon(service.slug);
          return (
            <a key={service.slug} href={`/cost/${service.slug}/${metro.slug}/`}
              className="card-elevated rounded-xl flex justify-between items-center px-4 py-3 hover:border-blue-300 transition animate-on-scroll"
              style={{ transitionDelay: `${i * 0.03}s` }}>
              <div className="flex items-center gap-3">
                <ServiceIcon className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="font-medium text-gray-900">{service.name}</div>
                  <div className="text-xs text-gray-400">{service.category} &middot; {service.unit}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-700">${cost.avg.toLocaleString()}</div>
                <div className="text-xs text-gray-400">${cost.low.toLocaleString()} &ndash; ${cost.high.toLocaleString()}</div>
              </div>
            </a>
          );
        })}
      </div>

      <AdUnit slot="mid" className="mt-8" />

      <section className="mt-8 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Compare Other Cities</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {otherMetros.map((m, i) => (
            <a key={m.slug} href={`/city/${m.slug}/`}
              className="card-elevated rounded-xl px-3 py-2 text-center hover:border-blue-300 transition animate-on-scroll"
              style={{ transitionDelay: `${i * 0.03}s` }}>
              <div className="font-medium text-sm text-gray-900">{m.city}</div>
              <div className="text-xs text-gray-400">{m.stateCode}</div>
            </a>
          ))}
        </div>
      </section>

      <AdUnit slot="bottom" className="mt-8" />
    </div>
  );
}
