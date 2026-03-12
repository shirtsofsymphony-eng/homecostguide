'use client';

// ============================================================
// CostCalculator — Interactive client component
// Lets users adjust project size and tier to see estimated costs.
// Pure client-side math — no API calls.
// ============================================================

import { useState } from 'react';

export default function CostCalculator({ serviceSlug, costIndex = 1.0, breakdownData }) {
  if (!breakdownData) return null;

  const { items, defaultProjectSize, tiers } = breakdownData;

  const [projectSize, setProjectSize] = useState(defaultProjectSize.value);
  const [tier, setTier] = useState('mid');

  const tierMultiplier = tiers[tier] || 1.0;

  // Calculate costs
  let totalLow = 0;
  let totalHigh = 0;
  const calculatedItems = items.map(item => {
    let itemLow, itemHigh;
    if (item.unit === 'flat') {
      itemLow = Math.round(item.lowPerUnit * costIndex * tierMultiplier);
      itemHigh = Math.round(item.highPerUnit * costIndex * tierMultiplier);
    } else {
      itemLow = Math.round(item.lowPerUnit * projectSize * costIndex * tierMultiplier);
      itemHigh = Math.round(item.highPerUnit * projectSize * costIndex * tierMultiplier);
    }
    totalLow += itemLow;
    totalHigh += itemHigh;
    return { ...item, totalLow: itemLow, totalHigh: itemHigh };
  });

  const totalMid = Math.round((totalLow + totalHigh) / 2);

  return (
    <div className="my-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Cost Calculator</h2>
      <p className="text-sm text-gray-500 mb-5">Adjust project size and material tier to estimate your cost.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Project size input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {defaultProjectSize.label}
          </label>
          <input
            type="number"
            value={projectSize}
            onChange={(e) => setProjectSize(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
          />
        </div>

        {/* Tier selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Material Tier</label>
          <div className="flex gap-2">
            {[
              { key: 'budget', label: 'Budget' },
              { key: 'mid', label: 'Mid-Range' },
              { key: 'premium', label: 'Premium' },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setTier(t.key)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
                  tier === t.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 mb-5">
        <div className="text-sm text-gray-500 mb-1">Your Estimated Cost</div>
        <div className="flex items-end gap-6">
          <div>
            <div className="text-xs text-gray-400">Low</div>
            <div className="text-xl font-bold text-gray-600">${totalLow.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Average</div>
            <div className="text-3xl font-bold text-blue-700">${totalMid.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">High</div>
            <div className="text-xl font-bold text-gray-600">${totalHigh.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Itemized breakdown */}
      <details className="group">
        <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700 mb-3">
          View itemized breakdown
        </summary>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-gray-600 font-medium">Item</th>
                <th className="text-right py-2 px-3 text-gray-600 font-medium">Low</th>
                <th className="text-right py-2 px-3 text-gray-600 font-medium">High</th>
              </tr>
            </thead>
            <tbody>
              {calculatedItems.map((item, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-2 px-3 text-gray-800">{item.label}</td>
                  <td className="text-right py-2 px-3 text-gray-600">${item.totalLow.toLocaleString()}</td>
                  <td className="text-right py-2 px-3 text-gray-600">${item.totalHigh.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300 font-bold">
                <td className="py-2 px-3 text-gray-900">Total</td>
                <td className="text-right py-2 px-3 text-gray-700">${totalLow.toLocaleString()}</td>
                <td className="text-right py-2 px-3 text-gray-700">${totalHigh.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </details>

      <p className="text-xs text-gray-400 mt-3">
        Estimates based on local cost data. Get quotes from licensed contractors for accurate pricing.
      </p>
    </div>
  );
}
