import React from 'react';
import { Sparkles, HeartHandshake, Leaf, Compass } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-16 md:py-24 bg-[#FAF6EE] border-b border-[#C9A24B]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A24B]">
            <Compass className="w-4 h-4" />
            <span>The Shifa Doctrine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-brand-serif text-[#1F4D3A] text-balance">
            Why What Touches Your Skin <br />
            <span className="italic font-normal text-[#C9A24B]">Should Heal Your Soul.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#1F4D3A]/80 leading-relaxed">
            In Arabic and Eastern medicine, <strong>Shifa (شفاء)</strong> is the holistic restoration of wellness. In a world inundated by synthetic polyester and toxic chemical dyes that suffocate the skin, Shifa Clothing returns to ancient botanical sanctity.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 rounded-2xl bg-white border border-[#C9A24B]/25 space-y-4 relative overflow-hidden group hover:border-[#C9A24B] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#1F4D3A] text-[#C9A24B] flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-brand-serif text-[#1F4D3A]">
              01. Biocompatible Fibers
            </h3>
            <p className="text-xs text-[#1F4D3A]/75 leading-relaxed">
              Our 100% pure Mulberry raw silk is composed of 18 essential amino acids with an identical pH to human skin. It naturally regulates body temperature, preventing inflammation and microscopic dermal irritation.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-2xl bg-white border border-[#C9A24B]/25 space-y-4 relative overflow-hidden group hover:border-[#C9A24B] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#1F4D3A] text-[#C9A24B] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-brand-serif text-[#1F4D3A]">
              02. Artisanal Needle & Gold
            </h3>
            <p className="text-xs text-[#1F4D3A]/75 leading-relaxed">
              Symbolized by the needle-and-thread curve on our emblem, each seam is hand-guided by generational master tailors. We refuse automated sweatshop methods, ensuring mindful dignity in every stitch.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-2xl bg-white border border-[#C9A24B]/25 space-y-4 relative overflow-hidden group hover:border-[#C9A24B] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#1F4D3A] text-[#C9A24B] flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-brand-serif text-[#1F4D3A]">
              03. Zero Chemical Residue
            </h3>
            <p className="text-xs text-[#1F4D3A]/75 leading-relaxed">
              All emerald pigments and gold threads are formulated without heavy metals, toxic fixatives, or endocrine disruptors. Pure natural fabrics softened with organic botanical aloe washes.
            </p>
          </div>
        </div>

        {/* Brand Quote Card */}
        <div className="mt-12 p-8 rounded-2xl bg-[#1F4D3A] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A24B]">
              Handcrafted in Lahore, Dubai & London Ateliers
            </p>
            <p className="text-xl sm:text-2xl font-brand-serif font-bold text-[#FAF6EE]">
              "We do not make seasonal disposable trends. We weave heirlooms of healing."
            </p>
          </div>

          <a
            href="#collections"
            className="px-6 py-3 rounded-xl bg-[#FAF6EE] text-[#1F4D3A] hover:bg-[#C9A24B] hover:text-[#1F4D3A] transition-colors font-semibold text-xs uppercase tracking-wider whitespace-nowrap shrink-0 cursor-pointer"
          >
            Explore The Collection
          </a>
        </div>
      </div>
    </section>
  );
};
