import { metros, services, SITE_URL } from '../data/site-data';

export default function sitemap() {
  const baseUrl = SITE_URL;
  const now = new Date().toISOString();

  const urls = [];

  // Homepage
  urls.push({
    url: `${baseUrl}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  // Cost guide index
  urls.push({
    url: `${baseUrl}/cost/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  });

  // Methodology page
  urls.push({
    url: `${baseUrl}/methodology/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  });

  // Service index pages
  for (const service of services) {
    urls.push({
      url: `${baseUrl}/cost/${service.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // Comparison pages (one per service)
  for (const service of services) {
    urls.push({
      url: `${baseUrl}/compare/${service.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // City hub pages
  for (const metro of metros) {
    urls.push({
      url: `${baseUrl}/city/${metro.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // Cost guide pages — HIGHEST VALUE (money pages)
  for (const service of services) {
    for (const metro of metros) {
      urls.push({
        url: `${baseUrl}/cost/${service.slug}/${metro.slug}/`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    }
  }

  // Directory pages
  for (const service of services) {
    for (const metro of metros) {
      urls.push({
        url: `${baseUrl}/directory/${service.slug}/${metro.slug}/`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return urls;
}
