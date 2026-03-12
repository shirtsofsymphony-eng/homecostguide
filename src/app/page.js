import { metros, services, SITE_NAME } from '../data/site-data';

export default function HomePage() {
  const featuredServices = services.slice(0, 8);
  const featuredMetros = metros.slice(0, 10);

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            How Much Does It <em>Really</em> Cost?
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Accurate, local home improvement costs for {metros.length} major US metros.
            Stop guessing — see real price ranges before you hire.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#services" className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition">
              Browse Cost Guides
            </a>
            <a href="#cities" className="border border-blue-300 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-800 transition">
              Find Your City
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="ad-slot" data-ad-slot="top-of-content">Ad Space</div>
      </div>

      {/* POPULAR COST GUIDES */}
      <section id="services" className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Popular Cost Guides</h2>
        <p className="text-gray-500 mb-8">See what homeowners are paying in your area</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredServices.map((service) => (
            <a key={service.slug} href={`/cost/${service.slug}/`}
              className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition group">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">{service.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{service.category}</p>
              <div className="text-lg font-bold text-blue-700">
                ${service.baseLow.toLocaleString()} — ${service.baseHigh.toLocaleString()}
              </div>
              <p className="text-xs text-gray-400 mt-1">National average {service.unit}</p>
            </a>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-3">All {services.length} Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-sm">
            {services.map((s) => (
              <a key={s.slug} href={`/cost/${s.slug}/`} className="text-blue-600 hover:underline">{s.name}</a>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">
        <div className="ad-slot" data-ad-slot="mid-content">Ad Space</div>
      </div>

      {/* CITIES */}
      <section id="cities" className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse by City</h2>
        <p className="text-gray-500 mb-8">Local costs and contractors in {metros.length} metros</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {metros.map((metro) => (
            <a key={metro.slug} href={`/city/${metro.slug}/`}
              className="border border-gray-200 rounded-lg px-4 py-3 text-center hover:border-blue-300 hover:shadow-sm transition">
              <div className="font-semibold text-gray-900">{metro.city}</div>
              <div className="text-xs text-gray-400">{metro.stateCode}</div>
            </a>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How We Calculate Costs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">1</div>
              <h3 className="font-semibold mb-2">National Baseline</h3>
              <p className="text-sm text-gray-500">We compile data from industry sources, contractor surveys, and public project records to establish national cost ranges.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">2</div>
              <h3 className="font-semibold mb-2">Local Adjustment</h3>
              <p className="text-sm text-gray-500">Each city has a cost index applied to reflect local labor rates, material costs, and permit fees.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">3</div>
              <h3 className="font-semibold mb-2">Regular Updates</h3>
              <p className="text-sm text-gray-500">Cost data is refreshed monthly to reflect market changes, material prices, and seasonal trends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CROSS-LINKS MATRIX */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Cost Guides by City</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">Service</th>
                {featuredMetros.slice(0, 6).map((m) => (
                  <th key={m.slug} className="text-left py-2 px-2 text-gray-500 font-medium">{m.city}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featuredServices.map((s) => (
                <tr key={s.slug} className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium text-gray-700">{s.name}</td>
                  {featuredMetros.slice(0, 6).map((m) => (
                    <td key={m.slug} className="py-2 px-2">
                      <a href={`/cost/${s.slug}/${m.slug}/`} className="text-blue-600 hover:underline">
                        ${Math.round(s.baseAvg * m.costIndex).toLocaleString()}
                      </a>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="ad-slot" data-ad-slot="bottom-content">Ad Space</div>
      </div>
    </>
  );
}
