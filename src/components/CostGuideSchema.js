// ============================================================
// CostGuideSchema — Server component
// Generates JSON-LD structured data for cost guide pages:
// - Service schema with AggregateOffer
// - BreadcrumbList schema
// - FAQPage schema
// ============================================================

export default function CostGuideSchema({ service, metro, cost, faqs = [] }) {
  const baseUrl = 'https://www.homecostguide.com';
  const pageUrl = `${baseUrl}/cost/${service.slug}/${metro.slug}/`;

  const schemas = [];

  // Service + AggregateOffer
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} in ${metro.city}, ${metro.stateCode}`,
    description: service.description,
    url: pageUrl,
    areaServed: {
      '@type': 'City',
      name: metro.city,
      addressRegion: metro.stateCode,
      addressCountry: 'US',
    },
    provider: {
      '@type': 'Organization',
      name: 'HomeCostGuide',
      url: baseUrl,
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: cost.low,
      highPrice: cost.high,
      priceCurrency: 'USD',
      unitText: service.unit,
    },
  });

  // BreadcrumbList
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: service.name, item: `${baseUrl}/cost/${service.slug}/` },
      { '@type': 'ListItem', position: 3, name: `${metro.city}, ${metro.stateCode}`, item: pageUrl },
    ],
  });

  // FAQPage
  if (faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    });
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
