import React from 'react';
import { ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../../types/store';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { formatPrice, addToCart, setSelectedProduct } = useStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to first size and first color
    addToCart(product, product.sizes[0], product.colors[0].name, 1);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group flex flex-col bg-white rounded-2xl border border-[#C9A24B]/20 overflow-hidden hover:border-[#C9A24B] hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-[4/3] bg-[#FAF6EE] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.badge && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F4D3A] bg-[#FAF6EE] border border-[#C9A24B]/40 px-2 py-0.5 rounded shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Quick Actions Hover Overlay */}
        <div className="absolute inset-0 bg-[#1F4D3A]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-4">
          <button
            onClick={handleQuickAdd}
            className="px-3 py-2 rounded-lg bg-[#1F4D3A] text-white hover:bg-black transition-colors text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Quick Bag</span>
          </button>
          <button
            onClick={() => setSelectedProduct(product)}
            className="p-2 rounded-lg bg-white text-[#1F4D3A] hover:bg-[#FAF6EE] transition-colors shadow-md cursor-pointer"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#1F4D3A]/60 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-[#C9A24B]">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-medium text-[#1F4D3A]">
              <Star className="w-3 h-3 fill-[#C9A24B] text-[#C9A24B]" />
              <span>{product.rating}</span>
              <span className="text-[#1F4D3A]/40">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-base font-bold font-brand-serif text-[#1F4D3A] group-hover:text-[#C9A24B] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Fabric */}
          <p className="text-xs text-[#1F4D3A]/70 mt-1 line-clamp-1">
            {product.fabric}
          </p>
        </div>

        {/* Footer: Color Swatches & Price */}
        <div className="pt-3 border-t border-[#C9A24B]/15 flex items-center justify-between">
          {/* Colors */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="w-3 h-3 rounded-full border border-black/15 shadow-2xs"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>

          {/* Price */}
          <div className="text-right">
            <span className="text-sm font-bold font-mono text-[#1F4D3A]">
              {formatPrice(product.priceUSD, product.pricePKR, product.priceAED)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
