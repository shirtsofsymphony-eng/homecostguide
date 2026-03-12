// ============================================================
// AffiliateDisclosure — Reusable FTC-compliant disclosure notice
// Include on pages with affiliate links.
// ============================================================

export default function AffiliateDisclosure() {
  return (
    <div className="text-xs text-gray-400 border-t border-gray-100 pt-3 mt-6">
      <p>
        <strong>Affiliate Disclosure:</strong> Some product links on this page are affiliate links. If you purchase through these links, we may earn a small commission at no additional cost to you. This helps support our free cost guides. We only link to retailers we trust.
        {' '}<a href="/methodology/" className="text-blue-500 hover:underline">Learn more about our methodology</a>.
      </p>
    </div>
  );
}
