import React from 'react';
import { ShoppingBag, Search, Compass, Package, Palette } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Currency } from '../../types/store';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    currency,
    setCurrency,
    setIsTrackingOpen,
    setViewMode,
    searchQuery,
    setSearchQuery,
  } = useStore();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#C9A24B]/25">
      {/* Announcement Bar */}
      <div className="bg-[#1F4D3A] text-[#FAF6EE] text-[11px] py-1.5 px-4 text-center tracking-wider font-medium flex items-center justify-center gap-3">
        <span>Complimentary Express Delivery on all bespoke orders</span>
        <span aria-hidden="true" className="text-[#C9A24B]">·</span>
        <span className="text-[#C9A24B]">Pure Mulberry Silk & Organic Linen</span>
        <span aria-hidden="true" className="text-[#C9A24B]">·</span>
        <span>Cash on Delivery Available</span>
      </div>

      {/* Main Top Bar Contract */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Brand Wordmark with Emblem Seal */}
        <div className="flex items-center gap-3.5 shrink-0">
          <a
            href="#hero"
            className="flex items-center gap-2.5 group cursor-pointer"
            title="Shifa Clothing Home"
          >
            {/* Miniature Vector Logo Emblem */}
            <svg
              className="w-9 h-9 shrink-0 transition-transform group-hover:scale-105 duration-200"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="48" fill="#1F4D3A" />
              <circle cx="50" cy="50" r="43.5" stroke="#C9A24B" strokeWidth="1.5" fill="none" />
              {/* Symmetrical Leaf */}
              <path
                d="M 50 24 C 42 32, 35 44, 35 55 C 35 63, 42 70, 50 74 C 58 70, 65 63, 65 55 C 65 44, 58 32, 50 24 Z"
                fill="#C9A24B"
              />
              <line x1="50" y1="24" x2="50" y2="74" stroke="#1F4D3A" strokeWidth="1.5" />
              {/* Needle Arc */}
              <path
                d="M 36 78 C 44 83, 56 83, 64 78"
                stroke="#C9A24B"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Wordmark */}
            <div className="flex flex-col">
              <span className="text-xl font-bold font-brand-serif tracking-[0.24em] text-[#1F4D3A] leading-none">
                SHIFA
              </span>
              <span className="text-[9.5px] font-semibold tracking-[0.46em] text-[#C9A24B] uppercase mt-1 leading-none font-brand-sans">
                CLOTHING
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase text-[#1F4D3A]/80">
          <a
            href="#collections"
            className="hover:text-[#1F4D3A] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-[#C9A24B]"
          >
            Collections
          </a>
          <a
            href="#story"
            className="hover:text-[#1F4D3A] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-[#C9A24B]"
          >
            The Healing Concept
          </a>
          <a
            href="#atelier"
            className="hover:text-[#1F4D3A] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-[#C9A24B]"
          >
            Atelier Craft
          </a>
          <button
            onClick={() => setIsTrackingOpen(true)}
            className="flex items-center gap-1.5 hover:text-[#1F4D3A] transition-colors whitespace-nowrap shrink-0 cursor-pointer uppercase font-semibold text-xs"
          >
            <Package className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Track Order</span>
          </button>
          <button
            onClick={() => setViewMode('logo-studio')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1F4D3A]/10 text-[#1F4D3A] hover:bg-[#1F4D3A] hover:text-white transition-all whitespace-nowrap shrink-0 cursor-pointer text-[11px] font-medium"
            title="Inspect Brand Identity & Download Vector Logo"
          >
            <Palette className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Logo Studio</span>
          </button>
        </nav>

        {/* Zone 3: Search, Currency & Shopping Bag */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Quick Search */}
          <div className="hidden sm:flex items-center relative">
            <Search className="w-3.5 h-3.5 text-[#1F4D3A]/50 absolute left-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search silk, linen, abaya..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-white/70 border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A] placeholder-[#1F4D3A]/40 focus:outline-none focus:border-[#1F4D3A] focus:bg-white w-44 transition-all"
            />
          </div>

          {/* Currency Selector */}
          <div className="flex items-center p-0.5 bg-[#1F4D3A]/5 rounded-lg border border-[#C9A24B]/25">
            {(['PKR', 'USD', 'AED'] as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-2 py-1 text-[11px] font-semibold rounded transition-colors cursor-pointer ${
                  currency === curr
                    ? 'bg-[#1F4D3A] text-white shadow-xs'
                    : 'text-[#1F4D3A]/70 hover:text-[#1F4D3A]'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>

          {/* Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-[#1F4D3A] text-white hover:bg-[#1F4D3A]/90 transition-all flex items-center justify-center cursor-pointer shadow-xs"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#C9A24B]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C9A24B] text-[#1F4D3A] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-[#FAF6EE] shadow-xs animate-in zoom-in-50">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
