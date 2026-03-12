import './globals.css';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, metros, services } from '../data/site-data';
import Header from '../components/Header';
import ScrollAnimator from '../components/ScrollAnimator';
import ScrollToTop from '../components/ScrollToTop';

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
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3292877774103361" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header siteName={SITE_NAME} />

        <main className="flex-1">
          {children}
        </main>

        {/* Gradient border above footer */}
        <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-600" />

        <footer className="bg-gray-900 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
              <div>
                <h3 className="font-semibold text-white mb-3">Popular Cost Guides</h3>
                <ul className="space-y-2">
                  {footerCostGuides.map(item => (
                    <li key={item.label}>
                      <a href={`/cost/${item.service}/${item.metro}/`} className="text-gray-400 hover:text-white transition">{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-3">Top Cities</h3>
                <ul className="space-y-2">
                  {footerCities.map(m => (
                    <li key={m.slug}>
                      <a href={`/city/${m.slug}/`} className="text-gray-400 hover:text-white transition">{m.city}, {m.stateCode}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-3">Services</h3>
                <ul className="space-y-2">
                  {footerServices.map(s => (
                    <li key={s.slug}>
                      <a href={`/cost/${s.slug}/`} className="text-gray-400 hover:text-white transition">{s.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-3">{SITE_NAME}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-3">
                  Free, accurate home improvement cost data for every major US metro.
                  Our cost guides help homeowners budget smarter and find qualified contractors.
                </p>
                <ul className="space-y-1 text-xs">
                  <li><a href="/methodology/" className="text-gray-400 hover:text-white transition">How We Calculate Costs</a></li>
                  <li><a href="/cost/" className="text-gray-400 hover:text-white transition">All Cost Guides</a></li>
                  <li><a href="/compare/roof-replacement/" className="text-gray-400 hover:text-white transition">Compare Cities</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
              <p>
                &copy; {new Date().getFullYear()} {SITE_NAME}. Cost data is estimated and may vary.
                Always get multiple quotes from licensed contractors.
              </p>
              <p className="mt-1">
                Some links on this site are affiliate links. <a href="/methodology/" className="hover:text-white underline transition">Learn more</a>.
              </p>
            </div>
          </div>
        </footer>

        <ScrollAnimator />
        <ScrollToTop />
      </body>
    </html>
  );
}
