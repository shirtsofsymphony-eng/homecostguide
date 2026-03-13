import { metros, services, getLocalCost } from '../../../../data/site-data';
import AdUnit from '../../../../components/AdUnit';

export function generateStaticParams() {
  const params = [];
  for (const metro of metros) {
    for (const service of services) {
      params.push({ category: service.slug, metro: metro.slug });
    }
  }
  return params;
}

export function generateMetadata({ params }) {
  const service = services.find(s => s.slug === params.category);
  const metro = metros.find(m => m.slug === params.metro);
  if (!service || !metro) return {};
  return {
    title: `Best ${service.name} Contractors in ${metro.city}, ${metro.stateCode} (2026)`,
    description: `Find top-rated ${service.name.toLowerCase()} contractors in ${metro.city}, ${metro.stateCode}. Compare reviews, get quotes, and see local pricing.`,
  };
}

export default function DirectoryPage({ params }) {
  const service = services.find(s => s.slug === params.category);
  const metro = metros.find(m => m.slug === params.metro);
  if (!service || !metro) return <div>Not found</div>;

  const cost = getLocalCost(service, metro);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-400 mb-6">
        <a href="/" className="hover:text-blue-600">Home</a>
        <span className="mx-2">›</span>
        <a href={`/city/${metro.slug}/`} className="hover:text-blue-600">{metro.city}</a>
        <span className="mx-2">›</span>
        <span className="text-gray-600">{service.name} Contractors</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Best {service.name} Contractors in {metro.city}, {metro.stateCode}
      </h1>
      <p className="text-gray-500 mb-6">
        Compare top-rated local contractors · Average cost: ${cost.avg.toLocaleString()} {service.unit}
      </p>

      {/* Cost reference */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6 flex justify-between items-center">
        <div>
          <div className="text-sm font-medium text-blue-700">{metro.city} {service.name} Cost</div>
          <div className="text-xs text-gray-500">${cost.low.toLocaleString()} – ${cost.high.toLocaleString()} {service.unit}</div>
        </div>
        <a href={`/cost/${service.slug}/${metro.slug}/`} className="text-sm text-blue-600 hover:underline font-medium">
          Full Cost Guide →
        </a>
      </div>

      <AdUnit slot="top" />

      {/* Contractor directory — populated after data scrape */}
      <div className="mt-6">
        <div className="border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Contractor Listings Coming Soon</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
            We&apos;re compiling a list of top-rated {service.name.toLowerCase()} contractors in {metro.city}, {metro.stateCode}.
            Listings will include Google ratings, reviews, and contact info.
          </p>
          <a href={`/cost/${service.slug}/${metro.slug}/`} className="inline-block bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 transition">
            View {service.name} Cost Guide
          </a>
        </div>
      </div>

      <AdUnit slot="bottom" className="mt-8" />

      {/* Tips section to add SEO value even before contractor data */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How to Choose a {service.name} Contractor in {metro.city}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 text-sm">
          <li>Get at least 3 written quotes from licensed contractors</li>
          <li>Verify licensing and insurance in {metro.stateCode}</li>
          <li>Check Google reviews and ask for local references</li>
          <li>Confirm the quote includes permits, materials, and cleanup</li>
          <li>Avoid contractors who demand full payment upfront</li>
        </ul>
      </section>
    </div>
  );
}
