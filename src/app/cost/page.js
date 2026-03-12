import { services, SITE_NAME } from '../../data/site-data';
import { HomeIcon, ChevronRightIcon, getServiceIcon } from '../../components/icons';

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
      <nav className="flex flex-wrap items-center gap-1.5 mb-6">
        <a href="/" className="breadcrumb-pill">
          <HomeIcon className="w-3.5 h-3.5" />
          Home
        </a>
        <ChevronRightIcon className="w-3 h-3 text-gray-300" />
        <span className="breadcrumb-pill bg-blue-50 text-blue-700">Cost Guides</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Home Improvement Cost Guides
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Accurate, local cost data for {services.length} home improvement services. Select a service
        to see pricing in your city.
      </p>

      {Object.entries(categories).map(([catName, catServices]) => (
        <div key={catName} className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{catName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {catServices.map((s, i) => {
              const Icon = getServiceIcon(s.slug);
              return (
                <a
                  key={s.slug}
                  href={`/cost/${s.slug}/`}
                  className="card-elevated flex items-center gap-4 p-4 group animate-on-scroll"
                  style={{ transitionDelay: `${i * 0.03}s` }}
                >
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 group-hover:text-blue-600 transition">{s.name}</div>
                    <div className="text-sm text-gray-500 mt-0.5 truncate">{s.description.slice(0, 80)}&hellip;</div>
                  </div>
                  <div className="text-right ml-4 shrink-0">
                    <div className="font-semibold text-blue-700">${s.baseAvg.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">national avg</div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
