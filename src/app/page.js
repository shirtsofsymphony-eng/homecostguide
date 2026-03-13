import { metros, services, SITE_NAME } from '../data/site-data';
import { getServiceIcon, LocationPinIcon, CheckIcon, ArrowRightIcon } from '../components/icons';
import AnimatedStats from '../components/AnimatedStats';
import AdUnit from '../components/AdUnit';

export default function HomePage() {
  const featuredServices = services.slice(0, 8);
  const featuredMetros = metros.slice(0, 10);

  return (
    <>
      {/* HERO */}
      <section className="hero-pattern bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 text-center relative">
          <div className="inline-block bg-blue-700/40 rounded-full px-4 py-1.5 text-sm text-blue-200 mb-6 border border-blue-600/30">
            Trusted cost data for {metros.length} US metros
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
            How Much Does It{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Really</span>{' '}
            Cost?
          </h1>
          <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Accurate, local home improvement costs backed by BLS wage data and industry research.
            Stop guessing — see real price ranges before you hire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#services" className="bg-white text-blue-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-50 hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-900/30">
              Browse Cost Guides
            </a>
            <a href="#cities" className="border border-blue-400/50 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-200">
              Find Your City
            </a>
          </div>
          <AnimatedStats />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        <AdUnit slot="top" />
      </div>

      {/* POPULAR COST GUIDES */}
      <section id="services" className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Cost Guides</h2>
          <p className="text-gray-500">See what homeowners are paying in your area</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredServices.map((service, i) => {
            const Icon = getServiceIcon(service.slug);
            return (
              <a key={service.slug} href={`/cost/${service.slug}/`}
                className="card-elevated p-5 group animate-on-scroll"
                style={{ transitionDelay: `${i * 0.05}s` }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{service.category}</span>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-3 transition">{service.name}</h3>
                <div className="text-xl font-bold text-blue-700">
                  ${service.baseLow.toLocaleString()} — ${service.baseHigh.toLocaleString()}
                </div>
                <p className="text-xs text-gray-400 mt-1">National avg {service.unit}</p>
              </a>
            );
          })}
        </div>
        <div className="mt-10 pt-6 border-t border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-4">All {services.length} Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-sm">
            {services.map((s) => (
              <a key={s.slug} href={`/cost/${s.slug}/`} className="text-blue-600 hover:text-blue-800 hover:underline transition flex items-center gap-1">
                <ArrowRightIcon className="w-3 h-3" />
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">
        <AdUnit slot="mid" />
      </div>

      {/* CITIES */}
      <section id="cities" className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Browse by City</h2>
          <p className="text-gray-500">Local costs and contractors in {metros.length} metros</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {metros.map((metro, i) => (
            <a key={metro.slug} href={`/city/${metro.slug}/`}
              className="card-elevated px-4 py-4 text-center group animate-on-scroll"
              style={{ transitionDelay: `${i * 0.03}s` }}>
              <div className="flex justify-center mb-2">
                <LocationPinIcon className="w-5 h-5 text-blue-400 group-hover:text-blue-600 transition" />
              </div>
              <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition">{metro.city}</div>
              <div className="text-xs text-gray-400 mt-0.5">{metro.stateCode}</div>
              <div className="text-xs text-gray-500 mt-2">
                {metro.costIndex > 1 ? `${Math.round((metro.costIndex - 1) * 100)}% above avg` :
                 metro.costIndex < 1 ? `${Math.round((1 - metro.costIndex) * 100)}% below avg` :
                 'National average'}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">How We Calculate Costs</h2>
            <p className="text-gray-500">Transparent methodology backed by real data</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200" />
            {[
              { step: '1', title: 'National Baseline', desc: 'We compile data from BLS wage statistics, contractor surveys, and public project records to establish national cost ranges.' },
              { step: '2', title: 'Local Adjustment', desc: 'Each city has a cost index applied to reflect local labor rates, material costs, and permit fees.' },
              { step: '3', title: 'Regular Updates', desc: 'Cost data is refreshed using the latest BLS and Census data to reflect market changes and seasonal trends.' },
            ].map((item, i) => (
              <div key={item.step} className="text-center relative animate-on-scroll" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg shadow-blue-600/20 relative z-10">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-on-scroll">
          {[
            { title: 'BLS Wage Data', desc: 'Local construction wages from the Bureau of Labor Statistics' },
            { title: 'Census Building Permits', desc: 'Real permit activity data shows local market conditions' },
            { title: 'Climate-Adjusted', desc: 'Seasonal recommendations based on local weather patterns' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="mt-0.5">
                <CheckIcon className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CROSS-LINKS MATRIX */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cost Guides by City</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="table-pro w-full text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-4 text-gray-500 font-semibold">Service</th>
                {featuredMetros.slice(0, 6).map((m) => (
                  <th key={m.slug} className="text-left py-3 px-3 text-gray-500 font-semibold">{m.city}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featuredServices.map((s) => (
                <tr key={s.slug} className="border-t border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-700">{s.name}</td>
                  {featuredMetros.slice(0, 6).map((m) => (
                    <td key={m.slug} className="py-3 px-3">
                      <a href={`/cost/${s.slug}/${m.slug}/`} className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
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
        <AdUnit slot="bottom" />
      </div>
    </>
  );
}
