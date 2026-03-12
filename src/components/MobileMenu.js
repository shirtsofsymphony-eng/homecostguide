'use client';
import { useState } from 'react';
import { MenuIcon, CloseIcon, HomeIcon, DollarIcon, SearchIcon, WrenchIcon } from './icons';

const navLinks = [
  { href: '/cost/', label: 'Cost Guides', icon: DollarIcon },
  { href: '/directory/', label: 'Find Contractors', icon: SearchIcon },
  { href: '/methodology/', label: 'Methodology', icon: WrenchIcon },
  { href: '/blog/', label: 'Blog', icon: HomeIcon },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-600 hover:text-blue-600 transition"
        aria-label="Open menu"
      >
        <MenuIcon />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl"
            style={{ animation: 'slideInFromRight 0.3s ease-out' }}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-bold text-blue-700">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>
            <nav className="p-4">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 py-4 px-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition border-b border-gray-50 last:border-0"
                >
                  <Icon className="w-5 h-5 text-blue-500" />
                  <span className="text-lg font-medium">{label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInFromRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
