import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Grid3X3, 
  Download, 
  Code, 
  Check, 
  Layers
} from 'lucide-react';
import { CanvasTheme, NeedleStyle, LockupVariant, BRAND_COLORS } from '../types/logo';
import { downloadSvgFile, downloadPngImage, copySvgCodeToClipboard } from '../utils/exportUtils';

interface StudioControlsProps {
  theme: CanvasTheme;
  onChangeTheme: (theme: CanvasTheme) => void;
  needleStyle: NeedleStyle;
  onChangeNeedleStyle: (style: NeedleStyle) => void;
  showGuides: boolean;
  onToggleGuides: () => void;
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  svgElementId: string;
  currentVariant: LockupVariant;
}

export const StudioControls: React.FC<StudioControlsProps> = ({
  theme,
  onChangeTheme,
  needleStyle,
  onChangeNeedleStyle,
  showGuides,
  onToggleGuides,
  scale,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  svgElementId,
  currentVariant,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleCopyHex = (hex: string, label: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(label);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const handleQuickCopySvg = async () => {
    const svgEl = document.getElementById(svgElementId) as SVGSVGElement | null;
    if (!svgEl) return;
    const ok = await copySvgCodeToClipboard(svgEl);
    if (ok) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleQuickSvgDownload = () => {
    const svgEl = document.getElementById(svgElementId) as SVGSVGElement | null;
    if (!svgEl) return;
    downloadSvgFile(svgEl, `shifa-clothing-${currentVariant}.svg`);
  };

  const handleQuickPngDownload = async () => {
    const svgEl = document.getElementById(svgElementId) as SVGSVGElement | null;
    if (!svgEl) return;
    setIsExporting(true);
    try {
      await downloadPngImage(svgEl, `shifa-clothing-${currentVariant}-4k.png`, 4000);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <footer className="w-full bg-[#FAF6EE] border-t border-[#C9A24B]/20 py-3.5 px-6 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Left: Needle & Curve Refinement + Background Canvas */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Needle & Thread Motif Selector */}
          <div className="flex items-center gap-1.5 text-xs text-[#1F4D3A]">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-[#1F4D3A]/60 mr-1">
              Needle Motif:
            </span>
            <div className="flex items-center gap-1 p-1 bg-[#1F4D3A]/5 rounded-lg border border-[#C9A24B]/20">
              <button
                onClick={() => onChangeNeedleStyle('couture-arc')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  needleStyle === 'couture-arc'
                    ? 'bg-white text-[#1F4D3A] shadow-xs font-semibold'
                    : 'text-[#1F4D3A]/70 hover:text-[#1F4D3A]'
                }`}
                title="Bespoke Couture Needle Arc"
              >
                Couture Arc
              </button>
              <button
                onClick={() => onChangeNeedleStyle('tailor-loop')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  needleStyle === 'tailor-loop'
                    ? 'bg-white text-[#1F4D3A] shadow-xs font-semibold'
                    : 'text-[#1F4D3A]/70 hover:text-[#1F4D3A]'
                }`}
                title="Master Tailor Horizontal Needle with Silk Loop"
              >
                Tailor Loop
              </button>
              <button
                onClick={() => onChangeNeedleStyle('symmetrical')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  needleStyle === 'symmetrical'
                    ? 'bg-white text-[#1F4D3A] shadow-xs font-semibold'
                    : 'text-[#1F4D3A]/70 hover:text-[#1F4D3A]'
                }`}
                title="Symmetrical Balance Cradle"
              >
                Symmetrical
              </button>
            </div>
          </div>

          {/* Canvas Tone Selector */}
          <div className="flex items-center gap-1.5 text-xs text-[#1F4D3A]">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-[#1F4D3A]/60 mr-1">
              Canvas:
            </span>
            <div className="flex items-center gap-1 p-1 bg-[#1F4D3A]/5 rounded-lg border border-[#C9A24B]/20">
              <button
                onClick={() => onChangeTheme('ivory')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  theme === 'ivory'
                    ? 'bg-white text-[#1F4D3A] shadow-xs font-semibold'
                    : 'text-[#1F4D3A]/70 hover:text-[#1F4D3A]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#FAF6EE] border border-[#1F4D3A]/30" />
                <span>Ivory Canvas</span>
              </button>
              <button
                onClick={() => onChangeTheme('inverted')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  theme === 'inverted'
                    ? 'bg-white text-[#1F4D3A] shadow-xs font-semibold'
                    : 'text-[#1F4D3A]/70 hover:text-[#1F4D3A]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#1F4D3A]" />
                <span>Emerald Reserve</span>
              </button>
              <button
                onClick={() => onChangeTheme('transparent')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  theme === 'transparent'
                    ? 'bg-white text-[#1F4D3A] shadow-xs font-semibold'
                    : 'text-[#1F4D3A]/70 hover:text-[#1F4D3A]'
                }`}
              >
                <Layers className="w-3 h-3 text-[#1F4D3A]/70" />
                <span>Transparent</span>
              </button>
            </div>
          </div>
        </div>

        {/* Center/Right: Grid Guides + Zoom Scale + Fast Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Symmetry & Alignment Guides Toggle */}
          <button
            onClick={onToggleGuides}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
              showGuides
                ? 'bg-[#1F4D3A] text-white border-[#1F4D3A]'
                : 'bg-white text-[#1F4D3A] border-[#C9A24B]/30 hover:bg-[#C9A24B]/10'
            }`}
            title="Toggle Symmetrical Construction Geometry Grid"
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>Vector Guides</span>
          </button>

          {/* Scale Stepper */}
          <div className="flex items-center p-1 bg-[#1F4D3A]/5 rounded-lg border border-[#C9A24B]/20">
            <button
              onClick={onZoomOut}
              disabled={scale <= 0.6}
              aria-label="Zoom out"
              className="p-1 text-[#1F4D3A]/70 hover:text-[#1F4D3A] disabled:opacity-30 cursor-pointer"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onResetZoom}
              title="Reset Zoom to 100%"
              className="px-2 text-xs font-mono font-medium text-[#1F4D3A] cursor-pointer"
            >
              {Math.round(scale * 100)}%
            </button>
            <button
              onClick={onZoomIn}
              disabled={scale >= 2.2}
              aria-label="Zoom in"
              className="p-1 text-[#1F4D3A]/70 hover:text-[#1F4D3A] disabled:opacity-30 cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onResetZoom}
              aria-label="Fit to canvas"
              title="Fit to view"
              className="p-1 ml-1 text-[#1F4D3A]/70 hover:text-[#1F4D3A] border-l border-[#C9A24B]/20 cursor-pointer"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>

          {/* Palette Swatches with click to copy */}
          <div className="hidden lg:flex items-center gap-1.5 pl-2 border-l border-[#C9A24B]/20 text-xs">
            <button
              onClick={() => handleCopyHex(BRAND_COLORS.emerald, 'emerald')}
              className="group flex items-center gap-1 px-2 py-1 rounded bg-white border border-[#C9A24B]/20 hover:border-[#1F4D3A] text-[11px] font-mono text-[#1F4D3A] cursor-pointer transition-colors"
              title="Click to copy Deep Emerald hex"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#1F4D3A]" />
              <span>{copiedHex === 'emerald' ? 'Copied!' : '#1F4D3A'}</span>
            </button>
            <button
              onClick={() => handleCopyHex(BRAND_COLORS.gold, 'gold')}
              className="group flex items-center gap-1 px-2 py-1 rounded bg-white border border-[#C9A24B]/20 hover:border-[#C9A24B] text-[11px] font-mono text-[#1F4D3A] cursor-pointer transition-colors"
              title="Click to copy Artisanal Gold hex"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#C9A24B]" />
              <span>{copiedHex === 'gold' ? 'Copied!' : '#C9A24B'}</span>
            </button>
            <button
              onClick={() => handleCopyHex(BRAND_COLORS.ivory, 'ivory')}
              className="group flex items-center gap-1 px-2 py-1 rounded bg-white border border-[#C9A24B]/20 hover:border-[#1F4D3A] text-[11px] font-mono text-[#1F4D3A] cursor-pointer transition-colors"
              title="Click to copy Silk Ivory hex"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#FAF6EE] border border-[#1F4D3A]/20" />
              <span>{copiedHex === 'ivory' ? 'Copied!' : '#FAF6EE'}</span>
            </button>
          </div>

          {/* Fast 1-Click Action Buttons */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#C9A24B]/20">
            <button
              onClick={handleQuickCopySvg}
              className="p-1.5 rounded-lg bg-white border border-[#C9A24B]/30 hover:bg-[#C9A24B]/10 text-[#1F4D3A] transition-colors cursor-pointer text-xs flex items-center gap-1"
              title="Quick copy SVG code to clipboard"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Code className="w-3.5 h-3.5" />}
              <span className="hidden xl:inline">{copiedCode ? 'Copied' : 'SVG XML'}</span>
            </button>
            <button
              onClick={handleQuickSvgDownload}
              className="p-1.5 rounded-lg bg-[#FAF6EE] border border-[#C9A24B]/40 hover:bg-[#C9A24B]/15 text-[#1F4D3A] transition-colors cursor-pointer text-xs flex items-center gap-1"
              title="Direct SVG download"
            >
              <Download className="w-3.5 h-3.5 text-[#1F4D3A]" />
              <span className="hidden xl:inline">.SVG</span>
            </button>
            <button
              onClick={handleQuickPngDownload}
              disabled={isExporting}
              className="p-1.5 rounded-lg bg-[#1F4D3A] text-white hover:bg-[#1F4D3A]/90 transition-colors cursor-pointer text-xs flex items-center gap-1 disabled:opacity-50"
              title="Direct 4K PNG export"
            >
              <Download className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span className="hidden xl:inline">4K PNG</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
