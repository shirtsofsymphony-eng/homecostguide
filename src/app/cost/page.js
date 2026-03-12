import { services, SITE_NAME } from '../../data/site-data';

export const metadata = {
  title: `All Home Improvement Cost Guides (2026) | ${SITE_NAME}`,
  description: `Browse ${services.length} home improvement cost guides with local pricing for 20+ US metros. Roofing, remodeling, HVAC, plumbing, and more.`,
};

export default function CostIndexPage() {
  const categories = {};
  for (const s of services) {
    if (!categories[s.category]) categories[s.category] = [];
    categories[s.category].push(s);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Home Improvement Cost Guides
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Accurate, local cost data for {services.length} home improvement services. Select a service
        to see pricing in your city.
      </p>

      {Object.entries(categories).map(([catName, catServices]) => (
        <div key={catName} className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{catName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {catServices.map(s => (
              <a
                key={s.slug}
                href={`/cost/${s.slug}/`}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition"
              >
                <div>
                  <div className="font-medium text-gray-900">{s.name}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{s.description.slice(0, 80)}…</div>
                </div>
                <div className="text-right ml-4 shrink-0">
                  <div className="font-semibold text-gray-900">${s.baseAvg.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">national avg</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
