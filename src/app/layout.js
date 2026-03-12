import './globals.css';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, metros, services } from '../data/site-data';

export const metadata = {
  title: {
    default: `${SITE_NAME} — Accurate Home Improvement Cost Data`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: 'pLES44HF1yzVMBt7lsQm0LKpS0V-wwvCN4PJ7kiDiHI',
  },
};

// Pick a few popular combos for footer links
const footerCostGuides = [
  { service: 'roof-replacement', metro: 'houston-tx', label: 'Roof Replacement — Houston' },
  { service: 'kitchen-remodel', metro: 'phoenix-az', label: 'Kitchen Remodel — Phoenix' },
  { service: 'hvac-installation', metro: 'dallas-tx', label: 'HVAC Installation — Dallas' },
  { service: 'bathroom-remodel', metro: 'tampa-fl', label: 'Bathroom Remodel — Tampa' },
  { service: 'flooring-installation', metro: 'denver-co', label: 'Flooring — Denver' },
];

const footerCities = metros.slice(0, 5);
const footerServices = services.slice(0, 5);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Ezoic / Mediavine ad script will go here */}
        {/* <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> */}
      </head>
      <body className="min-h-screen flex flex-col">
        {/* HEADER */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-blue-700">
              {SITE_NAME}
            </a>
            <nav className="hidden md:flex gap-6 text-sm text-gray-600">
              <a href="/cost/" className="hover:text-blue-600 transition">Cost Guides</a>
              <a href="/directory/" className="hover:text-blue-600 transition">Find Contractors</a>
              <a href="/methodology/" className="hover:text-blue-600 transition">Methodology</a>
              <a href="/blog/" className="hover:text-blue-600 transition">Blog</a>
            </nav>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Popular Cost Guides</h3>
                <ul className="space-y-2 text-gray-500">
                  {footerCostGuides.map(item => (
                    <li key={item.label}>
                      <a href={`/cost/${item.service}/${item.metro}/`} className="hover:text-blue-600">{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Top Cities</h3>
                <ul className="space-y-2 text-gray-500">
                  {footerCities.map(m => (
                    <li key={m.slug}>
                      <a href={`/city/${m.slug}/`} className="hover:text-blue-600">{m.city}, {m.stateCode}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Services</h3>
                <ul className="space-y-2 text-gray-500">
                  {footerServices.map(s => (
                    <li key={s.slug}>
                      <a href={`/cost/${s.slug}/`} className="hover:text-blue-600">{s.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">{SITE_NAME}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-3">
                  Free, accurate home improvement cost data for every major US metro.
                  Our cost guides help homeowners budget smarter and find qualified contractors.
                </p>
                <ul className="space-y-1 text-gray-500 text-xs">
                  <li><a href="/methodology/" className="hover:text-blue-600">How We Calculate Costs</a></li>
                  <li><a href="/cost/" className="hover:text-blue-600">All Cost Guides</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
              <p>
                &copy; {new Date().getFullYear()} {SITE_NAME}. Cost data is estimated and may vary.
                Always get multiple quotes from licensed contractors.
              </p>
              <p className="mt-1">
                Some links on this site are affiliate links. <a href="/methodology/" className="hover:text-blue-500 underline">Learn more</a>.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
