/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Generates static HTML at build time for all pages
  // This is key — every page is pre-rendered HTML, loads instantly
};

module.exports = nextConfig;
