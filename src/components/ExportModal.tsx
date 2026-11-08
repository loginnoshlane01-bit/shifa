import React, { useState } from 'react';
import { X, Download, Code, Check, Sparkles, Image as ImageIcon, FileText } from 'lucide-react';
import { downloadSvgFile, copySvgCodeToClipboard, downloadPngImage } from '../utils/exportUtils';
import { LockupVariant } from '../types/logo';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  svgElementId: string;
  currentVariant: LockupVariant;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  svgElementId,
  currentVariant,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const getSvgElement = (): SVGSVGElement | null => {
    return document.getElementById(svgElementId) as SVGSVGElement | null;
  };

  const handleDownloadSvg = () => {
    const svgEl = getSvgElement();
    if (!svgEl) return;
    setIsExporting(true);
    setStatusMessage('Generating vector SVG asset...');
    try {
      const filename = `shifa-clothing-logo-${currentVariant}.svg`;
      downloadSvgFile(svgEl, filename);
      setStatusMessage('Vector SVG downloaded successfully.');
      setTimeout(() => {
        setIsExporting(false);
        setStatusMessage(null);
      }, 1500);
    } catch (err) {
      console.error(err);
      setStatusMessage('Failed to download SVG.');
      setIsExporting(false);
    }
  };

  const handleCopySvgCode = async () => {
    const svgEl = getSvgElement();
    if (!svgEl) return;
    const success = await copySvgCodeToClipboard(svgEl);
    if (success) {
      setCopiedCode(true);
      setStatusMessage('Raw SVG XML copied to clipboard.');
      setTimeout(() => {
        setCopiedCode(false);
        setStatusMessage(null);
      }, 2500);
    }
  };

  const handleDownloadPng = async (dimension: number, label: string) => {
    const svgEl = getSvgElement();
    if (!svgEl) return;
    setIsExporting(true);
    setStatusMessage(`Rasterizing ${label} PNG (${dimension}×${dimension})...`);
    try {
      const filename = `shifa-clothing-logo-${currentVariant}-${label.toLowerCase()}.png`;
      await downloadPngImage(svgEl, filename, dimension);
      setStatusMessage(`${label} PNG exported successfully.`);
      setTimeout(() => {
        setIsExporting(false);
        setStatusMessage(null);
      }, 1500);
    } catch (err) {
      console.error(err);
      setStatusMessage('Failed to generate PNG image.');
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-[#FAF6EE] border border-[#C9A24B]/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#C9A24B]/20">
          <div>
            <h3 id="export-modal-title" className="text-lg font-bold font-brand-serif text-[#1F4D3A] tracking-wide">
              Export High-Resolution Assets
            </h3>
            <p className="text-xs text-[#1F4D3A]/70 mt-0.5">
              Production-ready flat vector SVG & high-fidelity raster formats
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close export modal"
            className="p-1.5 rounded-lg text-[#1F4D3A]/60 hover:text-[#1F4D3A] hover:bg-[#C9A24B]/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="py-5 space-y-3">
          {/* Vector SVG Option */}
          <div className="p-4 rounded-xl bg-white/90 border border-[#C9A24B]/25 flex items-center justify-between gap-4 hover:border-[#C9A24B] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1F4D3A] text-[#C9A24B] flex items-center justify-center shrink-0">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-[#1F4D3A]">Scalable Vector Graphics (SVG)</h4>
                  <span className="text-[10px] font-bold text-[#1F4D3A] bg-[#C9A24B]/20 px-1.5 py-0.5 rounded">Vector</span>
                </div>
                <p className="text-xs text-[#1F4D3A]/65 mt-0.5">
                  Resolution-independent master file for embroidery, signage, & UI
                </p>
              </div>
            </div>
            <button
              onClick={handleDownloadSvg}
              disabled={isExporting}
              className="px-3.5 py-2 rounded-lg bg-[#1F4D3A] text-white hover:bg-[#1F4D3A]/90 transition-colors text-xs font-medium flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>

          {/* 4K Ultra-Res PNG */}
          <div className="p-4 rounded-xl bg-white/90 border border-[#C9A24B]/25 flex items-center justify-between gap-4 hover:border-[#C9A24B] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C9A24B]/15 text-[#1F4D3A] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[#C9A24B]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-[#1F4D3A]">4K Ultra-High Resolution PNG</h4>
                  <span className="text-[10px] font-mono text-[#1F4D3A]/70">4000×4000 px</span>
                </div>
                <p className="text-xs text-[#1F4D3A]/65 mt-0.5">
                  Crisp flat rasterization with exact ivory background tone
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDownloadPng(4000, '4K')}
              disabled={isExporting}
              className="px-3.5 py-2 rounded-lg bg-[#1F4D3A] text-white hover:bg-[#1F4D3A]/90 transition-colors text-xs font-medium flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>4K PNG</span>
            </button>
          </div>

          {/* 2K High-Res PNG */}
          <div className="p-4 rounded-xl bg-white/90 border border-[#C9A24B]/25 flex items-center justify-between gap-4 hover:border-[#C9A24B] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C9A24B]/15 text-[#1F4D3A] flex items-center justify-center shrink-0">
                <ImageIcon className="w-5 h-5 text-[#1F4D3A]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-[#1F4D3A]">2K High Resolution PNG</h4>
                  <span className="text-[10px] font-mono text-[#1F4D3A]/70">2000×2000 px</span>
                </div>
                <p className="text-xs text-[#1F4D3A]/65 mt-0.5">
                  Optimized for social media, digital branding & presentations
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDownloadPng(2000, '2K')}
              disabled={isExporting}
              className="px-3.5 py-2 rounded-lg bg-[#FAF6EE] text-[#1F4D3A] border border-[#C9A24B]/40 hover:bg-[#C9A24B]/15 transition-colors text-xs font-medium flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>2K PNG</span>
            </button>
          </div>

          {/* Copy SVG Code directly */}
          <div className="p-4 rounded-xl bg-white/90 border border-[#C9A24B]/25 flex items-center justify-between gap-4 hover:border-[#C9A24B] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C9A24B]/15 text-[#1F4D3A] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-[#1F4D3A]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#1F4D3A]">Copy Clean SVG Code</h4>
                <p className="text-xs text-[#1F4D3A]/65 mt-0.5">
                  Copy raw XML markup to paste directly into Figma, code, or Adobe Illustrator
                </p>
              </div>
            </div>
            <button
              onClick={handleCopySvgCode}
              className="px-3.5 py-2 rounded-lg bg-[#FAF6EE] text-[#1F4D3A] border border-[#C9A24B]/40 hover:bg-[#C9A24B]/15 transition-colors text-xs font-medium flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Code className="w-3.5 h-3.5" />
                  <span>Copy XML</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status / Feedback Banner */}
        {statusMessage && (
          <div className="mb-3 px-3 py-2 rounded-lg bg-[#1F4D3A]/10 border border-[#1F4D3A]/20 text-xs text-[#1F4D3A] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C9A24B]" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-3 border-t border-[#C9A24B]/20 flex items-center justify-between text-xs text-[#1F4D3A]/60">
          <span>Target lockup: {currentVariant}</span>
          <button
            onClick={onClose}
            className="text-xs text-[#1F4D3A] hover:underline cursor-pointer"
          >
            Close window
          </button>
        </div>
      </div>
    </div>
  );
};
