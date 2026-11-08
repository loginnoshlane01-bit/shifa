import React from 'react';
import { LockupVariant } from '../types/logo';

interface TopBarProps {
  currentVariant: LockupVariant;
  onSelectVariant: (variant: LockupVariant) => void;
  onOpenExport: () => void;
  onOpenBrandKit: () => void;
  onReturnToStore?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentVariant,
  onSelectVariant,
  onOpenExport,
  onOpenBrandKit,
  onReturnToStore,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-[#C9A24B]/20 bg-[#FAF6EE] sticky top-0 z-30">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a 
          href="#stage" 
          className="text-lg font-bold font-brand-serif tracking-[0.12em] text-[#1F4D3A] whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          SHIFA CLOTHING
        </a>
      </div>

      {/* Zone 2: 4 concise single-line nav / lockup switcher links */}
      <nav className="hidden md:flex items-center gap-1 p-1 bg-[#1F4D3A]/5 rounded-lg border border-[#C9A24B]/15">
        <button
          onClick={() => onSelectVariant('vertical')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
            currentVariant === 'vertical'
              ? 'bg-[#1F4D3A] text-white shadow-xs'
              : 'text-[#1F4D3A]/70 hover:text-[#1F4D3A]'
          }`}
        >
          Vertical Lockup
        </button>
        <button
          onClick={() => onSelectVariant('horizontal')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
            currentVariant === 'horizontal'
              ? 'bg-[#1F4D3A] text-white shadow-xs'
              : 'text-[#1F4D3A]/70 hover:text-[#1F4D3A]'
          }`}
        >
          Horizontal
        </button>
        <button
          onClick={() => onSelectVariant('emblem')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
            currentVariant === 'emblem'
              ? 'bg-[#1F4D3A] text-white shadow-xs'
              : 'text-[#1F4D3A]/70 hover:text-[#1F4D3A]'
          }`}
        >
          Emblem Seal
        </button>
        <button
          onClick={() => onSelectVariant('wordmark')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
            currentVariant === 'wordmark'
              ? 'bg-[#1F4D3A] text-white shadow-xs'
              : 'text-[#1F4D3A]/70 hover:text-[#1F4D3A]'
          }`}
        >
          Wordmark
        </button>
      </nav>

      {/* Zone 3: Actions (Storefront Return, Brand Specs & Primary Export CTA) */}
      <div className="flex items-center gap-3 shrink-0">
        {onReturnToStore && (
          <button
            onClick={onReturnToStore}
            className="px-3.5 py-2 text-xs font-semibold text-[#1F4D3A] bg-[#C9A24B]/20 border border-[#C9A24B]/40 rounded-lg hover:bg-[#C9A24B]/30 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            ← View Full Storefront
          </button>
        )}
        <button
          onClick={onOpenBrandKit}
          className="hidden sm:inline-flex px-3 py-2 text-xs font-medium text-[#1F4D3A] border border-[#C9A24B]/35 rounded-lg hover:bg-[#C9A24B]/10 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Brand Specs
        </button>
        <button
          onClick={onOpenExport}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#1F4D3A] rounded-lg hover:bg-[#1F4D3A]/90 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Export Logo
        </button>
      </div>
    </header>
  );
};
