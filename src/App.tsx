import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/store/Navbar';
import { Hero } from './components/store/Hero';
import { CollectionsGrid } from './components/store/CollectionsGrid';
import { StorySection } from './components/store/StorySection';
import { ReviewsSection } from './components/store/ReviewsSection';
import { Footer } from './components/store/Footer';
import { ProductModal } from './components/store/ProductModal';
import { CartDrawer } from './components/store/CartDrawer';
import { OrderTrackerModal } from './components/store/OrderTrackerModal';
import { TopBar } from './components/TopBar';
import { ShifaLogoVector } from './components/ShifaLogoVector';
import { StudioControls } from './components/StudioControls';
import { BrandKitDrawer } from './components/BrandKitDrawer';
import { ExportModal } from './components/ExportModal';
import { LockupVariant, CanvasTheme, NeedleStyle } from './types/logo';
import { Palette, Sparkles } from 'lucide-react';

function MainStorefront() {
  const { setViewMode } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE] text-[#1F4D3A] font-brand-sans selection:bg-[#C9A24B]/30">
      {/* Storefront Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Collections Catalog Grid with Category Filtering & Sorting */}
      <CollectionsGrid />

      {/* The Shifa Philosophy & Natural Healing Fibers */}
      <StorySection />

      {/* Verified Patron Testimonials */}
      <ReviewsSection />

      {/* Atelier Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <OrderTrackerModal />

      {/* Floating Logo Studio Switcher Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setViewMode('logo-studio')}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#1F4D3A] text-white border border-[#C9A24B]/50 shadow-xl hover:bg-[#1F4D3A]/95 hover:scale-105 transition-all cursor-pointer"
          title="Open Shifa Clothing Brand Identity & Vector Logo Studio"
        >
          <div className="w-5 h-5 rounded-full bg-[#C9A24B] flex items-center justify-center text-[#1F4D3A]">
            <Palette className="w-3 h-3" />
          </div>
          <span className="text-xs font-semibold tracking-wider font-brand-serif">
            Brand Logo Suite
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#C9A24B] group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function LogoStudioView() {
  const { setViewMode } = useStore();
  const [variant, setVariant] = useState<LockupVariant>('vertical');
  const [theme, setTheme] = useState<CanvasTheme>('ivory');
  const [needleStyle, setNeedleStyle] = useState<NeedleStyle>('couture-arc');
  const [showGuides, setShowGuides] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isBrandKitOpen, setIsBrandKitOpen] = useState<boolean>(false);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.15, 2.2));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.15, 0.5));
  const handleResetZoom = () => setScale(1);

  const stageBackgroundClass = theme === 'inverted' 
    ? 'bg-[#1F4D3A]' 
    : theme === 'transparent' 
      ? 'bg-[linear-gradient(45deg,#f0ece3_25%,transparent_25%),linear-gradient(-45deg,#f0ece3_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f0ece3_75%),linear-gradient(-45deg,transparent_75%,#f0ece3_75%)] bg-[size:24px_24px] bg-[position:0_0,0_12px,12px_-12px,-12px_0] bg-[#FAF6EE]'
      : 'bg-[#FAF6EE]';

  const getContainerDimensions = () => {
    switch (variant) {
      case 'vertical':
        return 'max-w-[720px] max-h-[800px] aspect-[800/840]';
      case 'horizontal':
        return 'max-w-[950px] max-h-[460px] aspect-[1000/420]';
      case 'emblem':
        return 'max-w-[500px] max-h-[500px] aspect-square';
      case 'wordmark':
        return 'max-w-[760px] max-h-[360px] aspect-[800/340]';
      default:
        return 'max-w-[720px] max-h-[800px] aspect-[800/840]';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE] text-[#1F4D3A] font-brand-sans selection:bg-[#C9A24B]/30 select-none">
      <TopBar
        currentVariant={variant}
        onSelectVariant={setVariant}
        onOpenExport={() => setIsExportModalOpen(true)}
        onOpenBrandKit={() => setIsBrandKitOpen(true)}
        onReturnToStore={() => setViewMode('storefront')}
      />

      <main 
        id="stage"
        className={`flex-1 flex items-center justify-center relative p-6 sm:p-10 md:p-14 overflow-hidden transition-colors duration-200 ${stageBackgroundClass}`}
      >
        <div 
          className="w-full flex items-center justify-center transition-transform duration-150 ease-out"
          style={{ transform: `scale(${scale})` }}
        >
          <div className={`w-full ${getContainerDimensions()} flex items-center justify-center drop-shadow-none`}>
            <ShifaLogoVector
              id="shifa-clothing-master-svg"
              variant={variant}
              theme={theme}
              needleStyle={needleStyle}
              showGuides={showGuides}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {showGuides && (
          <div className="absolute top-4 left-6 text-[11px] font-mono uppercase tracking-wider text-[#C9A24B] bg-[#1F4D3A] px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]" />
            <span>Symmetry & Construction Guides Active</span>
          </div>
        )}
      </main>

      <StudioControls
        theme={theme}
        onChangeTheme={setTheme}
        needleStyle={needleStyle}
        onChangeNeedleStyle={setNeedleStyle}
        showGuides={showGuides}
        onToggleGuides={() => setShowGuides(!showGuides)}
        scale={scale}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={handleResetZoom}
        svgElementId="shifa-clothing-master-svg"
        currentVariant={variant}
      />

      <BrandKitDrawer
        isOpen={isBrandKitOpen}
        onClose={() => setIsBrandKitOpen(false)}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        svgElementId="shifa-clothing-master-svg"
        currentVariant={variant}
      />
    </div>
  );
}

function AppContent() {
  const { viewMode } = useStore();
  return viewMode === 'logo-studio' ? <LogoStudioView /> : <MainStorefront />;
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
