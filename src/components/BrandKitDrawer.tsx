import React, { useState } from 'react';
import { X, Check, Copy, Palette, Type, Compass, ShieldCheck } from 'lucide-react';
import { BRAND_PALETTE, BRAND_COLORS } from '../types/logo';

interface BrandKitDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandKitDrawer: React.FC<BrandKitDrawerProps> = ({ isOpen, onClose }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(label);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg h-full bg-[#FAF6EE] border-l border-[#C9A24B]/30 flex flex-col shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="brand-kit-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#C9A24B]/20 bg-[#FAF6EE]">
          <div>
            <h2 id="brand-kit-title" className="text-xl font-bold font-brand-serif tracking-wide text-[#1F4D3A]">
              Brand Identity & Specs
            </h2>
            <p className="text-xs text-[#1F4D3A]/70 mt-0.5 tracking-wider uppercase font-medium">
              Shifa Clothing Atelier Guidelines
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close brand kit"
            className="p-2 rounded-lg text-[#1F4D3A]/70 hover:text-[#1F4D3A] hover:bg-[#C9A24B]/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {/* Brand Philosophy Section */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C9A24B]">
              <Compass className="w-4 h-4" />
              <span>Etymology & Symbolism</span>
            </div>
            <div className="p-4 rounded-xl bg-white/70 border border-[#C9A24B]/20 space-y-2.5">
              <p className="text-sm text-[#1F4D3A] leading-relaxed">
                <strong className="font-semibold text-[#1F4D3A]">Shifa (شفاء)</strong> is an Arabic concept denoting profound healing, restoration, purity, and wholeness.
              </p>
              <p className="text-xs text-[#1F4D3A]/80 leading-relaxed">
                The emblem marries the <strong>stylized healing leaf</strong> (symbol of botanical purity and organic renewal) with an understated <strong>needle-and-thread arc</strong> (representing master craftsmanship, bespoke tailoring, and conscious textile artistry).
              </p>
            </div>
          </section>

          {/* Color Palette Section */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C9A24B]">
              <Palette className="w-4 h-4" />
              <span>Strict 3-Color Palette</span>
            </div>
            <p className="text-xs text-[#1F4D3A]/70">
              In accordance with brand principles, the palette is strictly restrained to three regal, enduring tones with zero gradients.
            </p>

            <div className="space-y-3 pt-1">
              {BRAND_PALETTE.map((color) => (
                <div
                  key={color.hex}
                  className="p-3.5 rounded-xl bg-white/80 border border-[#C9A24B]/20 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className="w-10 h-10 rounded-lg shrink-0 border border-black/10 shadow-xs"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#1F4D3A] truncate">{color.name}</p>
                      <p className="text-xs text-[#1F4D3A]/60 truncate">{color.role}</p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-[#1F4D3A]/75">
                        <span className="font-bold">{color.hex}</span>
                        <span aria-hidden="true">·</span>
                        <span>RGB: {color.rgb}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(color.hex, color.hex)}
                    className="p-2 rounded-lg bg-[#FAF6EE] hover:bg-[#C9A24B]/15 text-[#1F4D3A] border border-[#C9A24B]/30 transition-all text-xs font-medium flex items-center gap-1.5 shrink-0 cursor-pointer"
                    title={`Copy ${color.hex}`}
                  >
                    {copiedHex === color.hex ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#1F4D3A]/70" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Typography System */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C9A24B]">
              <Type className="w-4 h-4" />
              <span>Typography System</span>
            </div>

            <div className="p-4 rounded-xl bg-white/80 border border-[#C9A24B]/20 space-y-4">
              <div>
                <p className="text-xs text-[#1F4D3A]/60 uppercase tracking-wider font-semibold">Primary Brand Wordmark</p>
                <p className="text-2xl font-bold font-brand-serif tracking-[0.3em] text-[#1F4D3A] mt-1">
                  SHIFA
                </p>
                <p className="text-xs text-[#1F4D3A]/70 mt-1 font-mono">
                  Playfair Display · Bold 700 · Tracking +0.34em · Uppercase
                </p>
              </div>

              <div className="pt-3 border-t border-[#C9A24B]/15">
                <p className="text-xs text-[#1F4D3A]/60 uppercase tracking-wider font-semibold">Secondary Category Label</p>
                <p className="text-sm font-semibold tracking-[0.52em] text-[#C9A24B] mt-1 uppercase font-brand-sans">
                  CLOTHING
                </p>
                <p className="text-xs text-[#1F4D3A]/70 mt-1 font-mono">
                  Plus Jakarta Sans · SemiBold 600 · Tracking +0.52em · Solid Gold
                </p>
              </div>
            </div>
          </section>

          {/* Design Constitution / Rules */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C9A24B]">
              <ShieldCheck className="w-4 h-4" />
              <span>Brand Directives</span>
            </div>

            <ul className="space-y-2 text-xs text-[#1F4D3A]/80">
              <li className="flex items-start gap-2">
                <span className="text-[#C9A24B] font-bold">✓</span>
                <span><strong>Pure Flat Vector:</strong> Never apply drop shadows, 3D embossing, blur effects, or multi-tone gradients to the mark.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A24B] font-bold">✓</span>
                <span><strong>Mathematical Symmetry:</strong> The central gold leaf and needle-thread retain an exact central axis of symmetry.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A24B] font-bold">✓</span>
                <span><strong>Clear Space:</strong> Maintain a minimum clear boundary equal to the height of the letter "S" around all lockup perimeters.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A24B] font-bold">✓</span>
                <span><strong>Palette Discipline:</strong> Use only Emerald Green (#1F4D3A), Gold (#C9A24B), and Ivory (#FAF6EE).</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#C9A24B]/20 bg-[#FAF6EE] flex items-center justify-between">
          <span className="text-xs text-[#1F4D3A]/60">Shifa Clothing Brand Kit v1.0</span>
          <button
            onClick={() => handleCopy(`/* Shifa Clothing Design Tokens */\n--shifa-emerald: #1F4D3A;\n--shifa-gold: #C9A24B;\n--shifa-ivory: #FAF6EE;\n--font-brand-serif: 'Playfair Display', Georgia, serif;\n--font-brand-sans: 'Plus Jakarta Sans', sans-serif;`, 'css-tokens')}
            className="px-3 py-1.5 rounded-lg bg-[#1F4D3A] text-white hover:bg-[#1F4D3A]/90 transition-colors text-xs font-medium flex items-center gap-1.5 cursor-pointer"
          >
            {copiedHex === 'css-tokens' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Tokens Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy CSS Tokens</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
