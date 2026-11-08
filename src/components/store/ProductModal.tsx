import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, Shield, Ruler, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ProductModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, formatPrice } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [bespokeNotes, setBespokeNotes] = useState<string>('');
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  if (!selectedProduct) return null;

  // Initialize defaults if not set
  const currentSize = selectedSize || selectedProduct.sizes[0];
  const currentColor = selectedColor || selectedProduct.colors[0].name;

  const handleAdd = () => {
    addToCart(selectedProduct, currentSize, currentColor, quantity, bespokeNotes);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      setSelectedProduct(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl max-h-[90vh] bg-[#FAF6EE] border border-[#C9A24B]/40 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-title"
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#1F4D3A] shadow-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="md:w-1/2 relative bg-[#FAF6EE] min-h-[300px] md:min-h-full">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-full object-cover object-center max-h-[480px] md:max-h-none"
            referrerPolicy="no-referrer"
          />
          {selectedProduct.badge && (
            <div className="absolute top-4 left-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F4D3A] bg-[#FAF6EE] border border-[#C9A24B]/50 px-2.5 py-1 rounded shadow-xs">
                {selectedProduct.badge}
              </span>
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between text-xs text-[#1F4D3A]/70 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[#C9A24B]">
                {selectedProduct.categoryLabel}
              </span>
              <div className="flex items-center gap-1 font-medium text-[#1F4D3A]">
                <Star className="w-3.5 h-3.5 fill-[#C9A24B] text-[#C9A24B]" />
                <span>{selectedProduct.rating}</span>
                <span className="text-[#1F4D3A]/50">({selectedProduct.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 id="product-title" className="text-2xl font-bold font-brand-serif text-[#1F4D3A]">
              {selectedProduct.name}
            </h2>

            <p className="text-lg font-bold font-mono text-[#1F4D3A] mt-2">
              {formatPrice(selectedProduct.priceUSD, selectedProduct.pricePKR, selectedProduct.priceAED)}
            </p>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#1F4D3A]/80 leading-relaxed">
            {selectedProduct.description}
          </p>

          {/* Shifa Healing Property Highlight */}
          <div className="p-3.5 rounded-xl bg-[#1F4D3A]/10 border border-[#1F4D3A]/20 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-[#1F4D3A] uppercase tracking-wider">
                Therapeutic Fiber Benefit
              </p>
              <p className="text-xs text-[#1F4D3A]/80 mt-0.5">
                {selectedProduct.healingProperties}
              </p>
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#1F4D3A] block">
              Color Tone: <span className="text-[#C9A24B]">{currentColor}</span>
            </label>
            <div className="flex items-center gap-2.5">
              {selectedProduct.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                    currentColor === c.name
                      ? 'bg-white border-[#1F4D3A] shadow-xs text-[#1F4D3A]'
                      : 'bg-[#FAF6EE] border-[#C9A24B]/30 text-[#1F4D3A]/70 hover:border-[#1F4D3A]'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection & Size Guide */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#1F4D3A]">
                Select Size: <span className="text-[#C9A24B]">{currentSize}</span>
              </label>
              <button
                type="button"
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="text-[11px] font-semibold text-[#1F4D3A] hover:text-[#C9A24B] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Ruler className="w-3 h-3 text-[#C9A24B]" />
                <span>{showSizeGuide ? 'Hide Measurements' : 'Size Guide'}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedProduct.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    currentSize === s
                      ? 'bg-[#1F4D3A] text-white border-[#1F4D3A] shadow-xs'
                      : 'bg-white text-[#1F4D3A] border-[#C9A24B]/30 hover:border-[#1F4D3A]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Interactive Size Guide Accordion */}
            {showSizeGuide && (
              <div className="p-3 bg-white/90 rounded-xl border border-[#C9A24B]/30 text-[11px] text-[#1F4D3A] animate-in fade-in duration-150 space-y-2">
                <p className="font-bold text-[#1F4D3A] uppercase tracking-wider">Garment Measurements (Inches):</p>
                <div className="grid grid-cols-4 gap-2 text-center font-mono">
                  <div className="p-1.5 bg-[#FAF6EE] rounded"><strong>XS:</strong> Chest 38</div>
                  <div className="p-1.5 bg-[#FAF6EE] rounded"><strong>S:</strong> Chest 40</div>
                  <div className="p-1.5 bg-[#FAF6EE] rounded"><strong>M:</strong> Chest 42</div>
                  <div className="p-1.5 bg-[#FAF6EE] rounded"><strong>L:</strong> Chest 44</div>
                </div>
                <p className="text-[10px] text-[#1F4D3A]/60 italic">
                  Select "Custom Bespoke" to submit your exact tailor measurements below.
                </p>
              </div>
            )}
          </div>

          {/* Bespoke Custom Measurements / Notes Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#1F4D3A] block">
              Bespoke Notes / Custom Measurements (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Chest 41.5, Shoulder 18.5, Sleeve 25, Kurta Length 43"
              value={bespokeNotes}
              onChange={(e) => setBespokeNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A] focus:outline-none focus:border-[#1F4D3A]"
            />
          </div>

          {/* Quantity and Add to Bag */}
          <div className="pt-2 flex items-center gap-3">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-[#C9A24B]/40 rounded-xl bg-white px-2 py-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 py-1 text-sm font-bold text-[#1F4D3A] hover:opacity-70 cursor-pointer"
              >
                -
              </button>
              <span className="px-3 text-xs font-mono font-bold text-[#1F4D3A]">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 py-1 text-sm font-bold text-[#1F4D3A] hover:opacity-70 cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Add to Bag CTA */}
            <button
              onClick={handleAdd}
              className="flex-1 py-3 px-5 rounded-xl bg-[#1F4D3A] text-white hover:bg-[#1F4D3A]/90 transition-all font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              {addedToast ? (
                <>
                  <Check className="w-4 h-4 text-[#C9A24B]" />
                  <span>Added to Atelier Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#C9A24B]" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>

          {/* Trust Guarantee */}
          <div className="pt-2 flex items-center gap-2 text-[11px] text-[#1F4D3A]/60">
            <Shield className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Handcrafted on pure natural looms · 14-Day Bespoke Exchange Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};
