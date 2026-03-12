import { SITE_NAME } from '../../data/site-data';

export const metadata = {
  title: `Home Improvement Tips & Guides | ${SITE_NAME} Blog`,
  description: 'Expert home improvement advice, cost-saving tips, and project planning guides to help you make smarter decisions.',
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Home Improvement Blog
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Expert advice, cost-saving tips, and project planning guides.
      </p>

      <div className="border border-gray-200 rounded-lg p-8 text-center">
        <div className="text-4xl mb-3">📝</div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Articles Coming Soon</h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
          We&apos;re working on in-depth guides to help you plan your next home improvement project.
          Check back soon for expert advice and cost-saving tips.
        </p>
        <a href="/cost/" className="inline-block bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 transition">
          Browse Cost Guides
        </a>
      </div>
    </div>
  );
}
