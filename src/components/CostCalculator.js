'use client';

import { useState } from 'react';
import { ChevronDownIcon } from './icons';

export default function CostCalculator({ serviceSlug, costIndex = 1.0, breakdownData }) {
  if (!breakdownData) return null;

  const { items, defaultProjectSize, tiers } = breakdownData;

  const [projectSize, setProjectSize] = useState(defaultProjectSize.value);
  const [tier, setTier] = useState('mid');

  const tierMultiplier = tiers[tier] || 1.0;

  // Sensible bounds for the slider
  const minSize = Math.max(1, Math.round(defaultProjectSize.value * 0.2));
  const maxSize = Math.round(defaultProjectSize.value * 3);

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
    <div className="my-8 card-elevated p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Cost Calculator</h2>
      <p className="text-sm text-gray-500 mb-5">Adjust project size and material tier to estimate your cost.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {/* Project size input with slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {defaultProjectSize.label}
          </label>
          <input
            type="number"
            value={projectSize}
            onChange={(e) => setProjectSize(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
            min="1"
          />
          <input
            type="range"
            min={minSize}
            max={maxSize}
            value={Math.min(Math.max(projectSize, minSize), maxSize)}
            onChange={(e) => setProjectSize(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{minSize.toLocaleString()}</span>
            <span>{maxSize.toLocaleString()}</span>
          </div>
        </div>

        {/* Tier selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Material Tier</label>
          <div className="flex gap-2">
            {[
              { key: 'budget', label: 'Budget' },
              { key: 'mid', label: 'Mid-Range' },
              { key: 'premium', label: 'Premium' },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setTier(t.key)}
                className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  tier === t.key
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result summary */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5 mb-5">
        <div className="text-sm text-gray-500 mb-2">Your Estimated Cost</div>
        <div className="flex items-end gap-6">
          <div>
            <div className="text-xs text-gray-400">Low</div>
            <div className="text-xl font-bold text-gray-600">${totalLow.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Average</div>
            <div key={totalMid} className="text-3xl font-bold text-blue-700 animate-count-pulse">
              ${totalMid.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">High</div>
            <div className="text-xl font-bold text-gray-600">${totalHigh.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Itemized breakdown */}
      <details className="group">
        <summary className="flex items-center gap-1 cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700 mb-3">
          View itemized breakdown
          <ChevronDownIcon className="w-4 h-4 faq-chevron" />
        </summary>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="table-pro w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-2.5 px-3 text-gray-600 font-semibold">Item</th>
                <th className="text-right py-2.5 px-3 text-gray-600 font-semibold">Low</th>
                <th className="text-right py-2.5 px-3 text-gray-600 font-semibold">High</th>
              </tr>
            </thead>
            <tbody>
              {calculatedItems.map((item, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="py-2.5 px-3 text-gray-800">{item.label}</td>
                  <td className="text-right py-2.5 px-3 text-gray-600">${item.totalLow.toLocaleString()}</td>
                  <td className="text-right py-2.5 px-3 text-gray-600">${item.totalHigh.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300 bg-gradient-to-r from-blue-50 to-white font-bold">
                <td className="py-2.5 px-3 text-gray-900">Total</td>
                <td className="text-right py-2.5 px-3 text-gray-700">${totalLow.toLocaleString()}</td>
                <td className="text-right py-2.5 px-3 text-gray-700">${totalHigh.toLocaleString()}</td>
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
