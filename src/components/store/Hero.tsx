import React from 'react';
import { ArrowRight, Sparkles, Feather, ShieldCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative bg-[#FAF6EE] border-b border-[#C9A24B]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            {/* Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A24B]">
              <span className="w-6 h-[1.5px] bg-[#C9A24B]" />
              <span>Autumn / Winter Bespoke Atelier</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-brand-serif tracking-tight text-[#1F4D3A] leading-[1.12] text-balance">
              Healing in Every Thread. <br />
              <span className="italic font-normal text-[#C9A24B]">Pure Natural Luxury.</span>
            </h1>

            {/* Description */}
            <p className="text-base text-[#1F4D3A]/80 leading-relaxed max-w-xl">
              Inspired by the Arabic philosophy of <strong>Shifa (شفاء)</strong>—restoration, purity, and whole-body harmony. We craft haute couture garments using unadulterated Mulberry raw silk, organic French flax linen, and handcrafted gold needlework. Free from synthetic irritation.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#collections"
                className="px-6 py-3.5 rounded-xl bg-[#1F4D3A] text-white hover:bg-[#1F4D3A]/90 transition-all font-semibold text-xs tracking-wider uppercase flex items-center gap-2.5 shadow-sm group cursor-pointer"
              >
                <span>Explore The Atelier</span>
                <ArrowRight className="w-4 h-4 text-[#C9A24B] group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#story"
                className="px-6 py-3.5 rounded-xl bg-white border border-[#C9A24B]/40 text-[#1F4D3A] hover:bg-[#C9A24B]/10 transition-colors font-semibold text-xs tracking-wider uppercase cursor-pointer"
              >
                The Shifa Philosophy
              </a>
            </div>

            {/* Key Craftsmanship Pillars */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#C9A24B]/20">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#C9A24B]">
                  <Feather className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F4D3A]">100% Organic</span>
                </div>
                <p className="text-[11px] text-[#1F4D3A]/60">Mulberry silk & Normandy flax</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#C9A24B]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F4D3A]">Artisanal Gold</span>
                </div>
                <p className="text-[11px] text-[#1F4D3A]/60">Hand-guided needle & zari</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#C9A24B]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F4D3A]">Hypoallergenic</span>
                </div>
                <p className="text-[11px] text-[#1F4D3A]/60">Therapeutic natural dyes</p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Editorial Fashion Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#C9A24B]/30 shadow-xl bg-[#FAF6EE]">
              <img
                src="/src/assets/images/hero_shifa_fashion_editorial_1794118736580.jpg"
                alt="Shifa Clothing Emerald Silk Tunic Editorial"
                className="w-full h-full object-cover object-center max-h-[560px] hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Bottom Scrim & Caption */}
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#1F4D3A]/90 via-[#1F4D3A]/40 to-transparent flex items-end justify-between text-white">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C9A24B]">
                    Featured Editorial
                  </span>
                  <p className="text-lg font-brand-serif font-bold tracking-wide mt-0.5">
                    The Emerald Sovereign Tunic & Gold Placket
                  </p>
                  <p className="text-xs text-white/80">Tailored on demand in Lahore & Dubai Ateliers</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#C9A24B] bg-black/40 px-2.5 py-1 rounded backdrop-blur-xs">
                  Edition 2026
                </span>
              </div>
            </div>

            {/* Corner Decorative Seal */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-[#1F4D3A] border-2 border-[#C9A24B] flex items-center justify-center text-center shadow-lg pointer-events-none hidden sm:flex">
              <span className="text-[9px] font-brand-serif font-bold text-[#C9A24B] leading-tight uppercase tracking-wider">
                Pure<br />Shifa
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
