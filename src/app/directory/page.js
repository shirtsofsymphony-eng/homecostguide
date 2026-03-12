import { metros, services, SITE_NAME } from '../../data/site-data';

export const metadata = {
  title: `Find Home Improvement Contractors (2026) | ${SITE_NAME}`,
  description: `Browse top-rated contractors in ${metros.length} US cities for ${services.length} home improvement services. Compare reviews and get quotes.`,
};

export default function DirectoryIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Find Home Improvement Contractors
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Browse top-rated contractors in {metros.length} US cities. Select a city to see local pros.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by City</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
        {metros.map((metro) => (
          <a key={metro.slug} href={`/city/${metro.slug}/`}
            className="border border-gray-200 rounded-lg px-4 py-3 text-center hover:border-blue-300 hover:shadow-sm transition">
            <div className="font-medium text-gray-900">{metro.city}</div>
            <div className="text-xs text-gray-400">{metro.stateCode}</div>
          </a>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by Service</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {services.map((service) => (
          <div key={service.slug} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">{service.name}</h3>
            <div className="flex flex-wrap gap-2">
              {metros.slice(0, 5).map((metro) => (
                <a key={metro.slug} href={`/directory/${service.slug}/${metro.slug}/`}
                  className="text-xs text-blue-600 hover:underline">
                  {metro.city}
                </a>
              ))}
              <span className="text-xs text-gray-400">+ {metros.length - 5} more</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
