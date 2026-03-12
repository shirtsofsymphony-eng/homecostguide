'use client';
import { useState, useEffect } from 'react';
import { ArrowUpIcon } from './icons';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-blue-700 hover:shadow-xl ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUpIcon />
    </button>
  );
}
