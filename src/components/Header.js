'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { HomeIcon } from './icons';
import MobileMenu from './MobileMenu';

const navLinks = [
  { href: '/cost/', label: 'Cost Guides' },
  { href: '/directory/', label: 'Find Contractors' },
  { href: '/methodology/', label: 'Methodology' },
  { href: '/blog/', label: 'Blog' },
];

export default function Header({ siteName }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md'
          : 'bg-white border-b border-gray-200'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 bg-blue-600 rounded-lg text-white group-hover:bg-blue-700 transition">
            <HomeIcon className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition">
            {siteName}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive(href)
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
