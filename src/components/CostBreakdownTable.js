import { costBreakdowns, calculateBreakdown } from '../data/cost-breakdowns';
import { getAffiliateLink } from '../data/affiliate-links';
import { ExternalLinkIcon } from './icons';
import AffiliateDisclosure from './AffiliateDisclosure';

export default function CostBreakdownTable({ serviceSlug, costIndex = 1.0, tier = 'mid' }) {
  const breakdown = costBreakdowns[serviceSlug];
  if (!breakdown) return null;

  const calculated = calculateBreakdown(serviceSlug, costIndex, breakdown.defaultProjectSize.value, tier);
  if (!calculated) return null;

  const tierLabel = tier === 'budget' ? 'Budget' : tier === 'premium' ? 'Premium' : 'Mid-Range';
  const hasAffiliateLinks = calculated.items.some(item => item.affiliateCategory && getAffiliateLink(item.affiliateCategory));

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Itemized Cost Breakdown</h2>
      <p className="text-sm text-gray-500 mb-4">
        Estimated for {breakdown.defaultProjectSize.label}: {breakdown.defaultProjectSize.value.toLocaleString()} {breakdown.defaultProjectSize.unit} &middot; {tierLabel} tier &middot; Local cost index: {costIndex}x
      </p>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="table-pro w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Line Item</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Low</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Mid</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">High</th>
            </tr>
          </thead>
          <tbody>
            {calculated.items.map((item, i) => {
              const affiliate = item.affiliateCategory ? getAffiliateLink(item.affiliateCategory) : null;
              return (
                <tr key={i} className={`border-b border-gray-100 transition-colors hover:bg-blue-50/40 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{item.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                    {affiliate && (
                      <a
                        href={affiliate.url}
                        className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 mt-1 transition"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        {affiliate.label}
                        <ExternalLinkIcon className="w-3 h-3" />
                      </a>
                    )}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-600 whitespace-nowrap">
                    ${item.low.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-4 font-medium text-gray-800 whitespace-nowrap">
                    ${item.mid.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-600 whitespace-nowrap">
                    ${item.high.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-300 bg-gradient-to-r from-blue-50 to-white">
              <td className="py-3 px-4 font-bold text-gray-900">Total Estimated Cost</td>
              <td className="text-right py-3 px-4 font-bold text-gray-700">
                ${calculated.totalLow.toLocaleString()}
              </td>
              <td className="text-right py-3 px-4 font-bold text-blue-700 text-lg">
                ${calculated.totalMid.toLocaleString()}
              </td>
              <td className="text-right py-3 px-4 font-bold text-gray-700">
                ${calculated.totalHigh.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-2">
        Costs adjusted for local market conditions. Actual prices vary based on project specifics, contractor, and material choices.
      </p>

      {hasAffiliateLinks && <AffiliateDisclosure />}
    </div>
  );
}
