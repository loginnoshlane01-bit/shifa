import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { useStore } from '../../context/StoreContext';
import { SlidersHorizontal, Search, RotateCcw } from 'lucide-react';

export const CollectionsGrid: React.FC = () => {
  const { products, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useStore();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'emerald-heritage', label: 'Emerald Heritage' },
    { id: 'organic-linen', label: 'Organic Linen Atelier' },
    { id: 'silk-atelier', label: 'Silk Atelier & Abayas' },
    { id: 'accessories', label: 'Artisanal Accessories' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesSearch =
          !searchQuery.trim() ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
        if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="collections" className="py-16 bg-[#FAF6EE] border-b border-[#C9A24B]/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A24B] block mb-1">
              Pure Silk & Organic Linen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-brand-serif text-[#1F4D3A]">
              The Atelier Catalog
            </h2>
          </div>

          {/* Sort & Quick Filter Bar */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-[#1F4D3A]/70">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span className="hidden sm:inline">Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 text-xs bg-white border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A] focus:outline-none focus:border-[#1F4D3A] cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Tabs (Segmented control) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1F4D3A] text-white shadow-xs'
                  : 'bg-white/80 border border-[#C9A24B]/30 text-[#1F4D3A]/70 hover:text-[#1F4D3A] hover:bg-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Count and Active Filter Indicators */}
        <div className="flex items-center justify-between text-xs text-[#1F4D3A]/60 mb-6">
          <span>
            Displaying <strong>{filteredProducts.length}</strong> mastercraft garments
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="flex items-center gap-1 text-[#C9A24B] hover:text-[#1F4D3A] font-medium cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear search "{searchQuery}"</span>
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/70 rounded-2xl border border-[#C9A24B]/20 p-8 space-y-3">
            <Search className="w-8 h-8 text-[#C9A24B] mx-auto" />
            <h3 className="text-lg font-bold font-brand-serif text-[#1F4D3A]">No garments match your search</h3>
            <p className="text-xs text-[#1F4D3A]/70 max-w-sm mx-auto">
              We couldn't find anything matching "{searchQuery}". Try searching for "silk", "linen", "abaya", or "kurta".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-2 px-4 py-2 rounded-lg bg-[#1F4D3A] text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
